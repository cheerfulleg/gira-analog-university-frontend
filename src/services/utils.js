const transform = require('lodash.transform')
const isEqual = require('lodash.isequal')
const isArray = require('lodash.isarray')
const isObject = require('lodash.isobject')

function findNewCard(origObj, newObj) {
    function changes(newObj, origObj) {
        let arrayIndexCounter = 0
        return transform(newObj, function (result, value, key) {
            if (!isEqual(value, origObj[key])) {
                let resultKey = isArray(origObj) ? arrayIndexCounter++ : key
                result[resultKey] = (isObject(value) && isObject(origObj[key])) ? changes(value, origObj[key]) : value
            }
        })
    }

    const newCard = changes(newObj, origObj).columns[0].cards[0]
    return {title: newCard.title, description: newCard.description}
}


export default findNewCard
