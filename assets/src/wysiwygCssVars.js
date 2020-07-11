import { Fragment, Component } from '@wordpress/element';
import { ColorPicker, ColorPalette, TextControl } from '@wordpress/components';
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

const colorPickerRoot = document.createElement( 'div' );
colorPickerRoot.id = 'colorpickerroot';

colorPickerRoot.style.display = 'none';
colorPickerRoot.style.position = 'fixed';
colorPickerRoot.style.top = 0;
colorPickerRoot.style.bottom = '0';
colorPickerRoot.style.width = '300px';
colorPickerRoot.style.overflowY = 'auto';
colorPickerRoot.style.overflowX = 'hidden';
colorPickerRoot.style.zIndex = 99999999;
colorPickerRoot.style.background = 'white';
document.body.appendChild( colorPickerRoot );
var activeVars = [];

const readProperty = name => {
  const value = document.documentElement.style.getPropertyValue( name )
  console.log( value );
  return value;
};

class VarPicker extends Component {
  constructor(props) {
    super(props);
    const { initialOpen = true } = props;
    this.state = {
      open: initialOpen,
      changingPropertyTo: null,
    };
    this.setProperty = this.setProperty.bind( this );
  }

  setProperty( name, value ) {
    console.log( `Setting property \`${ name }\` to \`${ value }\`` );
    document.documentElement.style.setProperty( name, value );
    this.setState({ changingPropertyTo: null})
  }

  render() {
    const { selectedVars, onCloseClick = () => {}, targetElement } = this.props;

    selectedVars.forEach( ({name, usages}) => {
      console.log(name);
      console.log( readProperty( name ) );
      console.log( readProperty( name ), usages );
    } );

    return <div className={'var-picker'} >
      <ul>
        { selectedVars.map( cssVar => (
          <li key={cssVar.name} style={{position: 'relative'}}>
            <h4
              onClick={ () => this.setState( { open: !this.state.open } ) }
            >{cssVar.name}</h4>
            { this.state.open && (
              <Fragment>
                {/*<pre style={{fontSize: '9px', wordWrap: 'break-work'}}>{ [...new Set(cssVar.usages.map(usage=>usage.selector.replace(',', ',\n')))].join(' \n ') }</pre>*/}
                <ColorPicker
                  color={ this.state.changingPropertyTo || readProperty(cssVar.name) || cssVar.usages[0].defaultValue }
                  onChangeComplete={ value => this.setProperty( cssVar.name, value.hex ) }
                />
                <TextControl
                  value={ this.state.changingPropertyTo || readProperty(cssVar.name) || cssVar.usages[0].defaultValue}
                  onChange={ value => {
                    this.setState( { changingPropertyTo: value } );
                    this.setProperty( cssVar.name, value );
                  } }
                />
              </Fragment>
            )}
            <button
              style={ { position: 'absolute', top: 0, right: 0 } }
              onClick={onCloseClick}
            >
              close
            </button>
          </li>
        ) ) }
      </ul>
    </div>;
  }
}

const setup = async () => {
  try {
    const blockVarsPromise = getVars('https://www.planet4.test/wp-content/plugins/planet4-plugin-gutenberg-blocks/assets/build/css_vars_merged.json')
    const themeVarsPromise = getVars('https://www.planet4.test/wp-content/themes/planet4-master-theme/assets/build/css_vars_merged.json')

    const blockVars = await blockVarsPromise;
    const themeVars = await themeVarsPromise;

    const doneVars = [];

    [ ...blockVars, ...themeVars ].forEach( cssVar => {
      if ( doneVars.includes( cssVar.name ) ) {
        return;
      }
      doneVars.push( cssVar.name );
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


        if ( activeVars.includes( cssVar ) ) {
          console.log( `${ cssVar.name } is already opened` );
          return;
        }
        const selector = filteredSelectors.join();

        if ( !event.target.matches( `${selector}, ${selector} *` ) ) {
          return;
        }

        if (event.ctrlKey) {
          const randomColor = '#' + Math.floor( Math.random() * 16777215 ).toString( 16 );
          const propertyName = cssVar.usages[ 0 ].property;
          if ( ![ 'background' ].includes( propertyName ) && !propertyName.match( /color/ ) ) {
            return;
          }
          // const value = randomColor;
          document.documentElement.style.setProperty( cssVar.name, randomColor );
          return;
        }
        const wrapper = document.createElement( 'span' );
        colorPickerRoot.appendChild( wrapper );
        const close = () => {
          colorPickerRoot.removeChild( wrapper );
          activeVars = activeVars.filter( activeVar => activeVar !== cssVar );
          if ( activeVars.length === 0 ) {
            colorPickerRoot.style.display = 'none';
          }
        };
        activeVars.push( cssVar );
        colorPickerRoot.style.display = 'block';
        const initialOpen = activeVars.length === 1;

        wp.element.render(
          <VarPicker
            initialOpen={ initialOpen }
            selectedVars={ [ cssVar ] }
            targetElement={ event.target }
            onCloseClick={ close }
          />,
          wrapper
        );
      } );
    } );
  } catch ( e ) {
    console.log( e );
  }
};

export const wysiwygCssVars = () => {
  document.addEventListener( 'DOMContentLoaded', setup );
};
