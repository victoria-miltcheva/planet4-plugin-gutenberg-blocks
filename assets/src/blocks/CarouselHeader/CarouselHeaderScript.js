// Hydratable components
import { CarouselHeaderFrontend } from './CarouselHeaderFrontend';

const BLOCK_NAME = 'planet4-blocks/carousel-header';

document.querySelectorAll( `[data-hydrate="${BLOCK_NAME}"]` ).forEach(
  blockNode => {
    const attributes = JSON.parse( blockNode.dataset.attributes );
    ReactDOM.hydrate( <CarouselHeaderFrontend attributes={ attributes.attributes } />, blockNode );
  }
);
