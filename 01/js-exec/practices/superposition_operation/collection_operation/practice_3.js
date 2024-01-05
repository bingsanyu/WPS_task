'use strict';

function hybrid_operation_to_uneven(collection) {
    return collection
        .filter(num => num % 2 !== 0)
        .map(num => num * 3 + 5)
        .reduce((sum, num) => sum + num, 0);
}

module.exports = hybrid_operation_to_uneven;

