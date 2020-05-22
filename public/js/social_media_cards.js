document.addEventListener( 'DOMContentLoaded', () => {

  function openPopup( url ) {
    let popup = window.open(
      url,
      'popup',
      'height=350,width=600'
    );

    if ( popup.focus ) {
      popup.focus();
    }
  }

  document.querySelectorAll( 'a.twitter-share' ).forEach( ( link ) => {
    link.addEventListener( 'click', ( event ) => {
      event.preventDefault();
      openPopup(
        `https://twitter.com/intent/tweet?text=${ encodeURIComponent( link.dataset.text ) }&url=${ encodeURIComponent( link.dataset.socialUrl ) }`
      );

      return false;
    } );
  } );

  document.querySelectorAll( 'a.facebook-share' ).forEach( ( link ) => {
    link.addEventListener( 'click', ( event ) => {
      event.preventDefault();

      openPopup( link.href );

      return false;
    } );
  } );

  function toDataURL( url ) {
    return fetch( url )
      .then( ( response ) => response.blob() )
      .then( ( blob ) => URL.createObjectURL( blob ) );
  }

  // Force the download button to always download the file instead of showing it in browser, even cross origin.
  document.querySelectorAll( 'a.link-should-download' ).forEach( ( link ) => {
    link.addEventListener( 'click', ( event ) => {
      event.preventDefault();
      let a = document.createElement( 'a' );
      toDataURL( link.href ).then( ( url ) => {
        a.href = url;
        a.download = '';
        document.body.appendChild( a );
        a.click();
        document.body.removeChild( a );
      } );
    } );
  } );

} );
