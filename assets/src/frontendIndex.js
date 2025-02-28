import { CounterFrontend } from './blocks/Counter/CounterFrontend';
import { ArticlesFrontend } from './blocks/Articles/ArticlesFrontend';
import { CookiesFrontend } from './blocks/Cookies/CookiesFrontend';
import { SplittwocolumnsFrontend } from "./blocks/Splittwocolumns/SplittwocolumnsFrontend";
import { HappypointFrontend } from './blocks/Happypoint/HappypointFrontend';
import { GalleryFrontend } from './blocks/Gallery/GalleryFrontend';
import { SubmenuFrontend } from './blocks/Submenu/SubmenuFrontend';
import { MediaFrontend } from './blocks/Media/MediaFrontend';
import { ColumnsFrontend } from './blocks/Columns/ColumnsFrontend';
import { GuestBookFrontend } from './blocks/GuestBook/GuestBookFrontend';
import { setupMediaElementJS } from './blocks/Media/setupMediaElementJS';
import { setupLightboxForImages } from './components/Lightbox/setupLightboxForImages';
import { ENFormFrontend } from './blocks/ENForm/ENFormFrontend';

// Render React components
const COMPONENTS = {
  'planet4-blocks/counter': CounterFrontend,
  'planet4-blocks/articles': ArticlesFrontend,
  'planet4-blocks/cookies': CookiesFrontend,
  'planet4-blocks/split-two-columns': SplittwocolumnsFrontend,
  'planet4-blocks/happypoint': HappypointFrontend,
  'planet4-blocks/gallery': GalleryFrontend,
  'planet4-blocks/submenu': SubmenuFrontend,
  'planet4-blocks/media-video': MediaFrontend,
  'planet4-blocks/columns': ColumnsFrontend,
  'planet4-blocks/guestbook': GuestBookFrontend,
  'planet4-blocks/enform': ENFormFrontend,
};

document.querySelectorAll( `[data-render]` ).forEach(
  blockNode => {
    const blockName = blockNode.dataset.render;
    if (!COMPONENTS[ blockName ]) {
      return;
    }

    const BlockFrontend = COMPONENTS[ blockName ];
    if (!BlockFrontend) {
      return;
    }
    const attributes = JSON.parse( blockNode.dataset.attributes );
    wp.element.render( <BlockFrontend { ...attributes.attributes } />, blockNode );
  }
);

setupMediaElementJS();
setupLightboxForImages();
