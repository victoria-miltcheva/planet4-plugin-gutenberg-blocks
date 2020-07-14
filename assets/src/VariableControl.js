import { Fragment, Component } from '@wordpress/element';
import { renderControl } from './renderControl';
import { IconButton } from '@wordpress/components';

const uniqueUsages = cssVar => {
  return [
    ...new Set(
      cssVar.usages.map(
        usage => usage.selector.replace( ',', ',\n' )
      )
    )
  ];
};

const uniqueProperties = cssVar => [ ...new Set( cssVar.usages.map( usage => usage.property ) ) ];

export class VariableControl extends Component {
  constructor(props) {
    super( props );
    this.state = {
      isOpen: false,
      showSelectors: false,
    };
    this.toggleSelectors = this.toggleSelectors.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleSelectors() {
    this.setState( { showSelectors: !this.state.showSelectors } )
  }

  previewValue() {
    const {value} = this.props;
    const size = '24px';

    if ( value.match( /(#[\da-fA-F]{3}|rgba?\()/ ) ) {
      return <span
        onClick={ this.toggleOpen }
        title={value}
        style={ {
          width: size,
          height: size,
          border: '1px solid black',
          borderRadius: '6px',
          backgroundColor: value,
          float: 'right',
          marginTop: '2px'
        } }/>;
    }
    return <span
      title={value}
      style={ {
        // width: size,
        fontSize: '9px',
        height: size,
        float: 'right',
        marginTop: '2px'
      } }
    >
      { value }
    </span>;
  }

  toggleOpen() {
    this.setState( { isOpen: !this.state.isOpen } )
  }

  render() {
    const {
      cssVar,
      value,
      onCloseClick,
      onChange,
    } = this.props;

    return <li key={ cssVar.name } style={ { position: 'relative', listStyleType: 'none' } }>
      <IconButton
        icon={ 'minus' }
        style={ { float: 'right', height: '29px' } }
        onClick={ () => onCloseClick( cssVar ) }
      />
      { this.previewValue() }
      <h5
        style={ { fontSize: '16px', padding: '4px 7px' } }
        onClick={ this.toggleOpen }
      >{ cssVar.name.replace( /^--/, '' ).replace( /[-_]/g, ' ' ) }</h5>
      { this.state.isOpen && (
        <Fragment>
            <pre
              style={ { float: 'right', fontSize: '11px', paddingLeft: '8px', backgroundColor: '#eae896' } }
            >
              { uniqueProperties( cssVar ).join( ', ' ) }
            </pre>
          <div
            style={ { position: 'relative' } }
          >
            <pre
              className={
                this.state.showSelectors ? 'usages-open' : 'usages-collapsed'
              }
              style={ {
                fontSize: '9px',
              } }
            >
              { uniqueUsages( cssVar ).join( '\n' ).replace( ',', ',\n' ) }
            </pre>
            <span
              onClick={ this.toggleSelectors  }
              style={ {
                fontSize: '8px',
                position: 'absolute',
                top: -12,
                left: 0
              } }
            >
              { uniqueUsages( cssVar ).length } selectors
            </span>
          </div>
          { renderControl( {
            cssVar,
            value,
            onChange
          } ) }
        </Fragment>
      ) }
    </li>;
  }
}
