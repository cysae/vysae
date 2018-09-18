
export function numSharesFromIntvl(intvl) {
  return intvl.end - intvl.start + 1;
}

export function numSharesFromIntvls(intvls) {
  let numOfShares = 0
  for( const intvl of intvls) {
    numOfShares += intvl.end - intvl.start + 1;
  }
  return numOfShares
}

export function getCapital(intvls) {
  let capital = 0
  for(const intvl of intvls) {
    if(intvl.attributes && intvl.attributes.value)
      capital += intvl.attributes.value * numSharesFromIntvl(intvl)
  }
  return capital
}


/////////////////////////////////////////////////////////////////////////
// Interval Arithmetics
////////////////////////////////////////////////////////////////////////
export function hasIntvl(xIntvl, intvls) {
  for(const intvl of intvls) {
    return JSON.stringify(xIntvl) === JSON.stringify(intvl)
  }
  return false
}

export function isIntersection(intvlA, intvlB) {
  if(intvlB.start > intvlA.end || intvlA.start > intvlB.end) return false
  return true
}

//////////////////
// MergeTriplets
/////////////////

// const triplets = [
//     {num: 1, attr: {a: true}, isEnd: false},
//     {num: 10, attr: {a: true}, isEnd: true},
//     {num: 7, attr: {b: true}, isEnd: false},
//     {num: 12, attr: {b: true}, isEnd: true},
//     {num: 9, attr: {c: true}, isEnd: false},
//     {num: 15, attr: {c: true}, isEnd: true},
// ]

function sortBy(field1, field2) {
    return function(a, b) {
        if (a[field1] > b[field1]) {
            return 1
        } else if (a[field1] === b[field1]) {
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

function disjunctiveUnionOf(obj1, obj2) {
    Object.keys(obj1)
        .filter(key => Object.keys(obj2).includes(key))
        .forEach(key => delete obj1[key])
    return obj1
}

export function mergeTriplets(triplets) {
    const mergedIntervals = []
    let attr = {}

    const sortedTriplets = triplets.sort(sortBy('num', 'isEnd'));
    let lTriplet = sortedTriplets[0]

    for(let i=1; i<sortedTriplets.length; i++) {
        let rTriplet = sortedTriplets[i]
        let xStart, xEnd

        if(!lTriplet.isEnd) {
            attr = { ...attr, ...lTriplet.attr}
            xStart = lTriplet.num
        } else {
            attr = disjunctiveUnionOf(attr, lTriplet.attr)
            xStart = lTriplet.num+1
        }

        if(!rTriplet.isEnd) {
            xEnd = rTriplet.num-1
        } else {
            xEnd = rTriplet.num
        }

        if(xStart <= xEnd) {
            mergedIntervals.push({start: xStart, end: xEnd, attr: {...attr} })
        }
        lTriplet = rTriplet
    }
    return mergedIntervals
}
