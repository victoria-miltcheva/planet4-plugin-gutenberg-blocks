import { renderSelectedVars } from './renderSelectedVars';
import { getMatchingVars } from './getMatchingVars';
import { dragElement } from './dragElement';

const style = document.createElement('link')

// todo: load these conditionally when logged in + permission.
style.href = 'https://www.planet4.test/wp-includes/css/dist/components/style.css?ver=5.4.1';
style.attributes.href = 'https://www.planet4.test/wp-includes/css/dist/components/style.css?ver=5.4.1';
style.rel = 'stylesheet';

document.head.appendChild(style)

const getVars = async (url) => {
  const response = await fetch(
    url );
  const raw = await response.text();
  const data = JSON.parse( raw );
  console.log( data );
  return data;
}

const editorRoot = document.createElement( 'div' );
editorRoot.id = 'theme-editor-root';
document.body.appendChild( editorRoot );
dragElement( editorRoot );

const setup = async () => {
  try {
    const blockVarsPromise = getVars('https://www.planet4.test/wp-content/plugins/planet4-plugin-gutenberg-blocks/assets/build/css_vars_merged.json')
    const themeVarsPromise = getVars('https://www.planet4.test/wp-content/themes/planet4-master-theme/assets/build/css_vars_merged.json')

    const blockVars = await blockVarsPromise;
    const themeVars = await themeVarsPromise;

    const cssVars = [];

    [ ...blockVars, ...themeVars ].forEach( cssVar => {
      if ( cssVars.includes( cssVar.name ) ) {
        return;
      }
      const canHaveDuplicates = cssVar.usages.map( usage => usage.selector );
      // Create a set from the array.
      const uniqueSelectors= [ ...new Set( canHaveDuplicates ) ];
      // const selectors = uniqueSelectors.filter( selector => !selector.match( /^body(\.[\w_-]+)*$/ ) );

      cssVars.push({
        ...cssVar,
        uniqueSelectors,
      });

    } );

    document.addEventListener( 'click', async event => {
      if ( !event.altKey ) {
        return;
      }
      event.preventDefault();

      const matchedVars = await getMatchingVars( { cssVars, event } );

      renderSelectedVars( editorRoot, matchedVars );
    } );

  } catch ( e ) {
    console.log( e );
  }
};

export const wysiwygCssVars = () => {
  document.addEventListener( 'DOMContentLoaded', setup );
};
