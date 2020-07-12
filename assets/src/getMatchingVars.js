
const wasRejected =  result => 'rejected' === result.status;
const wasFulfilled = result => 'fulfilled' === result.status;

const matchVar = async(cssVar, selector, event) => {
  const isBodySelector =  !!selector.match( /^body(\.[\w-]*)?$/ );

  const shouldIncludeStar = !isBodySelector || event.target.tagName === 'p';

  const query = `${ selector }` + ( !shouldIncludeStar ? '' : `, ${ selector } *` );
  // Match also match descendants

  if ( event.target.matches( query ) ) {
    return [ cssVar ];
  }

  return [];
}

export const getMatchingVars = async ( { cssVars, event, excludedVars = [] } ) => {

  const notExcluded = cssVar => !excludedVars.includes( cssVar.name );

  const uniqueVars = cssVars.reduce((carry, cssVar) => {
    if ( !carry.some( collected => collected.name === cssVar.name ) ) {
      carry.push( cssVar );
    }
    return carry;
  }, [])

  const promises = uniqueVars.filter( notExcluded ).map( cssVar => {
    // Remove any pseudo elements that might not match the clicked element right now.
    const selector = cssVar.uniqueSelectors.join().replace( /:(active|focus|visited|hover)/g, '' );

    return matchVar( cssVar, selector, event );
  } );

  const results = await Promise.allSettled( promises );

  results.filter( wasRejected ).forEach( console.log );

  const arrays = results.filter( wasFulfilled ).map( result => result.value );

  return [].concat( ...arrays );
}

