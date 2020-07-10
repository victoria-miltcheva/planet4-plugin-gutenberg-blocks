const setup = async () => {
  try {
    const response = await fetch(
      'https://www.planet4.test/wp-content/plugins/planet4-plugin-gutenberg-blocks/assets/build/css_vars_merged.json' );
    const raw = await response.text();
    const data = JSON.parse( raw );
    console.log( data );
    data.forEach( cssVar => {
      const allSelectors = cssVar.usages.map( usage => usage.selector );
      const uniqueSelectors = [ ...new Set( allSelectors ) ];
      const filteredSelectors = uniqueSelectors.filter( selector => !selector.match( /^body(\.[\w_-]+)*$/ ) );

      if ( filteredSelectors.length === 0 ) {
        return;
      }

      document.addEventListener( 'click', ( event ) => {
        if ( ! event.altKey ) {
          return;
        }
        event.preventDefault();
        if ( event.target.matches( filteredSelectors.join() ) ) {
          console.log( cssVar );
          const randomColor = '#' + Math.floor( Math.random() * 16777215 ).toString( 16 );
          const propertyName = cssVar.usages[ 0 ].property;
          if ( ![ 'background' ].includes( propertyName ) && !propertyName.match( /color/ ) ) {
            return;
          }
          document.documentElement.style.setProperty( cssVar.name, randomColor );
        }
      } );
    } );
    console.log( data );
  } catch ( e ) {
    console.log( e );
  }
};

export const wysiwygCssVars = () => {
  document.addEventListener( 'DOMContentLoaded', setup );
};
