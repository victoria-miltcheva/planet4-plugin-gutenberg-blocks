import { Fragment, Component } from '@wordpress/element';
import { renderControl } from './renderControl';
import { IconButton } from '@wordpress/components';
import classnames from 'classnames';

const uniqueUsages = cssVar => {
  return [
    ...new Set(
      cssVar.usages.map(
        usage => usage.selector.replace( ',', ',\n' )
      )
    )
  ];
};

const readProperty = name => {
  const value = document.documentElement.style.getPropertyValue( name )

  console.log( 'reading', value );

  return value;
};

export class VarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changingPropertyTo: null,
      activeVars: this.props.selectedVars,
      openVars: [  ],
      infoOpenVars: [],
    };
    this.setProperty = this.setProperty.bind( this );
  }

  componentWillReceiveProps( nextProps ) {
    const notYetActive = cssVar => !this.state.activeVars.map( active => active.name ).includes( cssVar.name );

    const newOnes = nextProps.selectedVars.filter( notYetActive );

    this.setState( {
      activeVars: [ ...this.state.activeVars, ...newOnes ],
    } );
  }

  deactivate( cssVar ) {
    const notBeingDeactivated = active => active.name !== cssVar.name;
    this.setState( {
      activeVars: this.state.activeVars.filter( notBeingDeactivated )
    } );
  }

  setProperty( name, value ) {
    this.setState( { changingPropertyTo: value } );

    console.log( `Setting property \`${ name }\` to \`${ value }\`` );

    document.documentElement.style.setProperty( name, value );

    this.setState({ changingPropertyTo: null})
  }

  toggleOpenVar( cssVar ) {
    const newOpened = this.isOpened( cssVar )
      ? this.state.openVars.filter( opened => opened !== cssVar.name )
      : [ ...this.state.openVars, cssVar.name ];

    if ( this.isOpened( cssVar ) && this.isInfoOpened( cssVar ) ) {
      this.toggleInfoOpenVar( cssVar );
    }

    this.setState({
      openVars: newOpened,
    })
  }

  toggleInfoOpenVar( cssVar ) {
    const newOpened = this.isInfoOpened( cssVar )
      ? this.state.infoOpenVars.filter( opened => opened !== cssVar.name )
      : [ ...this.state.infoOpenVars, cssVar.name ];
    this.setState({
      infoOpenVars: newOpened,
    })
  }

  isOpened( cssVar ) {
    return this.state.openVars.includes( cssVar.name );
  }

  isInfoOpened( cssVar) {
    return this.state.infoOpenVars.includes( cssVar.name );
  }

  render() {
    return <div className={'var-picker'} >
      <ul>
        { this.state.activeVars.map( cssVar => (
          <li key={cssVar.name} style={{position: 'relative', listStyleType: 'none'}}>
            <IconButton
              icon={ 'minus' }
              style={ { float: 'right' } }
              onClick={ event => this.deactivate( cssVar ) }
            />
            <h5
              onClick={ () => this.toggleOpenVar( cssVar ) }
            >{cssVar.name.replace(/^--/,'')}</h5>
            <pre
              style={{float: 'right', fontSize: '11px', paddingLeft: '8px', backgroundColor: '#eae896'}}
            >{ [ ...new Set( cssVar.usages.map( usage => usage.property ) ) ].join( ', ' ) }</pre>
            <div
              style={{ position: 'relative'}}
              onClick={ event => this.toggleInfoOpenVar( cssVar ) }
            >
                  <pre
                    className={  this.isInfoOpened( cssVar ) ? 'usages-open' : 'usages-collapsed'  }
                    style={ {
                      fontSize: '9px',
                    } }
                  >
                    { uniqueUsages(cssVar).join('\n').replace(',', ',\n') }
                  </pre>
              <span style={{fontSize: '8px', position: 'absolute', top: -12, left: 0}}>
                     {uniqueUsages(cssVar).length} selectors
                  </span>
            </div>
            { this.isOpened( cssVar ) && (
              <Fragment>
                { renderControl({
                  cssVar,
                  value:
                    this.state.changingPropertyTo
                    || readProperty( cssVar.name )
                    || cssVar.usages.find( usage => !!usage.defaultValue ).defaultValue,
                  onChange: value => {
                    this.setProperty( cssVar.name, value );
                  }
                })}
              </Fragment>
            )}
          </li>
        ) ) }
      </ul>
    </div>;
  }
}
