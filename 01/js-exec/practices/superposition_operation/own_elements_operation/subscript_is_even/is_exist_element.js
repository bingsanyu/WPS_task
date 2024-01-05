'use strict';
let is_exist_element = function(collection,element){
    let result = collection.filter(function (item, index) {
        return index % 2 === 0;
    });
    return result.some(function (item) {
        return item === element;
    });
};
module.exports = is_exist_element;
