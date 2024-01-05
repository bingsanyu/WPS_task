'use strict';
let even_asc_odd_desc = function(collection){
    let even = collection.filter(function (item) {
        return item % 2 === 0;
    }).sort(function (a, b) {
        return a - b;
    });
    let odd = collection.filter(function (item) {
        return item % 2 !== 0;
    }).sort(function (a, b) {
        return b - a;
    });
    return even.concat(odd);
};
module.exports = even_asc_odd_desc;
