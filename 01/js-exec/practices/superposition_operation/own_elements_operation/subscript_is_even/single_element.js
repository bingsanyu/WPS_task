'use strict';
let single_element = function(collection){
    let result = collection.filter(function (item, index) {
        return index % 2 !== 0;
    });
    let temp = [];
    result.forEach(function (item) {
        if (temp.indexOf(item) === -1) {
            temp.push(item);
        }
    });
    return temp.filter(function (item) {
        return result.indexOf(item) === result.lastIndexOf(item);
    });
};
module.exports = single_element;
