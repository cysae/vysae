export function numSharesFromIntvl(intvl) {
  return intvl.end - intvl.start + 1;
}

export function numSharesFromIntvls(intvls) {
  let numOfShares = 0
  for( const intvl of intvls) {
    numOfShares = intvl.end - intvl.start + 1;
  }
  return numOfShares
}

export function getCapital(intvls) {
  let capital = 0
  for(const intvl of intvls) {
    if(intvl.attr.value)
      capital += intvl.attr.value * numSharesFromIntvl(intvl)
  }
  return capital
}
