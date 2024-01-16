import fs from 'fs';
import path from 'path';
import util from 'util';

import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import serve from 'koa-static';

import { v4 as uuidv4 } from 'uuid';

import { createPool } from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

import xlsx from 'xlsx';


const app = new Koa();
const router = new Router(); 

const _NULL = 'NULL_GuoYanbing';

app.use(serve(path.resolve(process.cwd(), './web')));
app.use(router.routes()).use(router.allowedMethods());

const pool = createPool({
  host: '192.168.137.234',
  port: 3306,
  user: 'root',
  password: '123',
  database: 'test'
});

// 执行 SQL 查询的函数，返回 RowDataPacket 数组
async function executeQuery(sql: string, params: any[] = []): Promise<RowDataPacket[]> {
  const [rows] = await pool.query<RowDataPacket[]>(sql, params);
  return rows;
}

// 从（多个） Excel 文件初始化数据库
async function initializeDatabaseFromExcelFiles() {
  // const createDatabaseSQL = 'CREATE DATABASE IF NOT EXISTS test';
  // await executeQuery(createDatabaseSQL);
  const files = await util.promisify(fs.readdir)('./data');
  for (const file of files) {
    await createDatabaseTableFromExcelFile(file);
  }
}

// 根据 Excel 文件创建数据库表
async function createDatabaseTableFromExcelFile(filename: string) {
  const workbook = await util.promisify(fs.readFile)(path.join('./data', filename));
  const worksheet = xlsx.read(workbook).Sheets[xlsx.read(workbook).SheetNames[0]];
  const headers = (xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0] as any[]).map(String);
  
  if (headers.length === 1 && headers[0] === 'ID') {
    return;
  }
  console.log(headers);
  const createTableSQL = generateSQLForTableCreation(filename.split('.')[0], headers);
  await executeQuery(createTableSQL);
  console.log(`加载表 ${filename.split('.')[0]} 成功！`);
}

// 生成创建表的 SQL 语句
function generateSQLForTableCreation(tableName: string, columns: string[]): string {
  const nonEmptyColumns = columns.filter(column => column.trim() !== '');
  const filteredColumns = nonEmptyColumns.filter(column => column !== 'ID');
  const columnDefinitions = filteredColumns.map(column => `\`${column}\` VARCHAR(255)`);
  columnDefinitions.unshift('`ID` INT AUTO_INCREMENT PRIMARY KEY');
  const createTableSQL = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (${columnDefinitions.join(', ')})`;
  return createTableSQL;
}

// 获取所有表的名称
router.get('/tables', async (ctx) => {
  const sql = 'SHOW TABLES';
  try {
    const rows = await executeQuery(sql);
    const tables = rows.map(row => Object.values(row)[0]);
    ctx.body = tables;
  } catch (error) {
    console.error('Error when show all tables:', error);
    ctx.status = 500;
    ctx.body = 'Internal server error';
  }
});

// 获取表的列名和数据
async function getTableColumnNames(tableName: string): Promise<string[]> {
  const sql = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? ORDER BY ORDINAL_POSITION`;
  const rows = await executeQuery(sql, [tableName]);
  return rows.map((row: any) => row.COLUMN_NAME);
}

// 获取表的列名和数据的路由
router.get('/table', async (ctx) => {
  try {
    const tableName = ctx.query.table as string;
    const headers = await getTableColumnNames(tableName);
    console.log('headers2:', headers);
    const sql_data = `SELECT * FROM ??`;
    const rows2 = await executeQuery(sql_data, [tableName]);
    const data = rows2.map(row => Object.values(row));
    ctx.body = { headers, data };
  } catch (error) {
    console.error('Error executing query:', error);
    ctx.status = 500;
    ctx.body = 'Internal server error';
  }
});

// 读取 Excel 文件并获取表头信息
async function readExcelFileAndGetHeaders(filePath: string): Promise<{ worksheet: xlsx.WorkSheet, headers: string[] }> {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = xlsx.utils.sheet_to_json(worksheet, {header: 1, defval: _NULL});
  const headers = json[0] as string[];
  return { worksheet, headers };
}

// 创建或更新数据库记录
async function createOrUpdateDatabaseRecords(tableName: string, columns: string[], worksheet: xlsx.WorkSheet): Promise<void> {
  const jsonData = xlsx.utils.sheet_to_json(worksheet, {header: 1, defval: _NULL}) as string[][];
  jsonData.shift();
  for (const row of jsonData) {
    let insertColumns = '';
    let insertValues = '';
    let updateSet = '';
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      let value = row[i];
      if (value === _NULL) {
        insertValues += `NULL, `;
        updateSet += `${column}=NULL, `;
      } else {
        insertValues += `'${value}', `;
        updateSet += `${column}='${value}', `;
      }
      insertColumns += `${column}, `;
    }
    insertColumns = insertColumns.slice(0, -2);
    insertValues = insertValues.slice(0, -2);
    updateSet = updateSet.slice(0, -2);
    const sql = `INSERT INTO ${tableName} (${insertColumns}) VALUES (${insertValues}) ON DUPLICATE KEY UPDATE ${updateSet};`;
    await executeQuery(sql);
  }
}

// 处理上传文件的路由
router.post('/upload', koaBody({ multipart: true, formidable: { maxFileSize: 200 * 1024 * 1024 }}), async (ctx, next) => {
  const file = ctx.request.files?.file as any;
  const tableName = ctx.request.body.table;
  if (file && file.originalFilename.split('.').pop() !== 'xlsx') {
    ctx.throw(400, '文件格式错误');
    return;
  }
  else if (!tableName) {
    ctx.throw(400, '未提供表名');
    return;
  }
  try {
    console.log('Processing upload:', file.originalFilename);
    console.log('file.path', file.filepath);
    const { worksheet, headers } = await readExcelFileAndGetHeaders(file.filepath);
    const tableColumns = await getTableColumnNames(tableName)
    const isMatch = tableColumns.every(column => headers.includes(column));
    if (!isMatch) {
      ctx.throw(400, '上传的文件和所选表格不匹配');
      return;
    }
    else if (!worksheet || !worksheet['!ref']) {
      ctx.throw(400, '工作表未定义或工作表范围未定义');
      return;
    }
    const rowCount = xlsx.utils.decode_range(worksheet['!ref']).e.r + 1;
    console.log('rowCount:', rowCount);
    if (rowCount === 1) {
      ctx.throw(400, '工作表为空');
      return;
    }
    createOrUpdateDatabaseRecords(tableName, headers, worksheet);
    const randomValue = uuidv4();
    ctx.body = { success: true, message: '文件上传成功', randomValue };
  } catch (error) {
    console.error('Error when upload:', error);
    ctx.throw(500, 'Internal Server Error', { originalError: error });
  } finally {
    await util.promisify(fs.unlink)(file.filepath);
  }
});

// 下载 Excel 文件的路由
router.get('/download', async (ctx) => {
  const tableName = ctx.query.table;
  if (!tableName) {
    ctx.throw(400, '缺少表名');
    return;
  }
  const filePath = path.join('./data', `${tableName}.xlsx`);
  ctx.attachment(filePath);
  ctx.body = await util.promisify(fs.readFile)(filePath);
});

// 主函数
async function main() {
  try {
    await initializeDatabaseFromExcelFiles();
    console.log('数据库加载完成！');
    app.listen(3000, () => {
      console.log('http://127.0.0.1:3000');
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // pool.end();
  }
}

main();
