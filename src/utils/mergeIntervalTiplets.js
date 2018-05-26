const triplets = [
    {start: 1, attr: {a: true}, isEnd: false},
    {start: 10, attr: {a: true}, isEnd: true},
    {start: 7, attr: {lol: 'lol'}, isEnd: true},
    {start: 7, attr: {b: true}, isEnd: false},
    {start: 12, attr: {b: true}, isEnd: true},
    {start: 9, attr: {c: true}, isEnd: false},
    {start: 15, attr: {c: true}, isEnd: true},
]

function sortBy(field1, field2) {
    return function(a, b) {
        if (a[field1] > b[field1]) {
            return 1
        } else if (a[field1] == b[field1]) {
            if (a[field2] > b[field2]) {
                return 1
            } else if (a[field2] < b[field2]) {
                return -1
            }
        } else if (a[field1] < b[field1]) {
            return -1
        }
        return 0
    }
}

function objectRemoveKeyIntersection(obj1, obj2) {
    Object.keys(obj1)
        .filter(key => !Object.keys(obj2).includes(key))
        .forEach(key => delete obj1[key])
    return obj1
}

function lexicalySortTriplets(triplets) {
    let sortedTriplets = []
    sortedTriplets = triplets.sort(sortBy('start', 'isEnd'));
    return sortedTriplets
}

export function mergeIntervalTriplets() {
    const mergedIntervals = []
    let lTriplet = triplets[0]
    let attr = {}
    console.log(lexicalySortTriplets(triplets))
    for(let i=1; i<triplets.length; i++) {
        let rTriplet = triplets[i]

        if(!lTriplet.isEnd) {
            attr = { ...attr, ...lTriplet.attr}
        } else {
        }
    }
}
