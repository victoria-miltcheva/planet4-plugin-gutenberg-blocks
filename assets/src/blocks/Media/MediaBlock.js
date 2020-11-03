import { MediaEditor } from './MediaEditor';
import { MediaFrontend } from './MediaFrontend';

const {__} = wp.i18n;

const BLOCK_NAME = 'planet4-blocks/media-video';

const attributes = {
  video_title: {
    type: 'string'
  },
  description: {
    type: 'string'
  },
  video_poster_img: {
    type: 'integer'
  },
};

// Old content didn't store the poster url and embed html in the props. For the frontend this is caught in the block's
// backend render method, where we setup a div to be frontend rendered by the same MediaFrontend component as is used for
// save.
export const lacksAttributes = attributes => {
  const lacksEmbedHtml = attributes.media_url && !attributes.media_url.endsWith('.mp4') && !attributes.embed_html;
  const lacksPosterUrl = attributes.video_poster_img && !attributes.poster_url;

  return lacksEmbedHtml || lacksPosterUrl;
};

export const registerMediaBlock = () => {
  const {registerBlockType} = wp.blocks;

  registerBlockType(BLOCK_NAME, {
    title: __('Media block', 'planet4-blocks-backend'),
    icon: 'format-video',
    category: 'planet4-blocks',
    attributes: {
      ...attributes,
      embed_html: {
        type: 'string',
        default: ''
      },
      media_url: {
        type: 'string'
      },
      poster_url: {
        type: 'string',
        default: ''
      },
    },
    save: ({ attributes }) => {
      if (lacksAttributes(attributes)) {
        return null;
      }

      return <MediaFrontend { ...attributes } />;
    },
    edit: MediaEditor,
    deprecated: [{
      attributes: {
        ...attributes,
        youtube_id: {
          type: 'string',
          default: ''
        },
      },
      isEligible({youtube_id}) {
        return !!youtube_id;
      },
      migrate( { youtube_id, ...attributes } ) {
        return {
          ...attributes,
          media_url: youtube_id,
        };
      },
      save: () => {
        return null
      }
    }],
  });
};
