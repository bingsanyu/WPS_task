# 第五次

1. 自己创建一个钉钉企业，然后将钉钉的组织机构以及用户数据按照mid.sql的格式采集到中间表中。

**要求**
  - 使用ts+mysql进行开发
  - 支持手动执行采集（通过暴露接口的方式），也支持每天晚上23点59分定时执行任务
  - 能够进行区分每次采集的数据
  - 一个时间段内，只能进行一次采集。多次手动执行采集时，需要提示采集任务进行中
  - 需验证部门新增、挪动、修改、删除等情况
  - 需验证用户新增、挪动、修改、删除等情况


2. 将中间表的数据同步至云文档中

**要求**
  - 使用ts+mysql进行开发
  - 采集完成后，立即执行同步
  - 一个时间段内，只能进行一次同步任务
  - 需验证部门新增、挪动、修改、删除等情况
  - 需验证用户新增、挪动、修改、删除等情况
