import { ArticlesEditor } from './ArticlesEditor';
import { ArticlesFrontend } from './ArticlesFrontend';

const BLOCK_NAME = 'planet4-blocks/articles';

const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

export const registerArticlesBlock = () => {
  registerBlockType(BLOCK_NAME, {
    apiVersion: 2,
    title: __('Articles', 'planet4-blocks-backend'),
    icon: 'excerpt-view',
    category: 'planet4-blocks',
    supports: {
      html: false, // Disable "Edit as HTMl" block option.
    },
    attributes: {
      article_heading: {
        type: 'string',
        default: __('Related Articles', 'planet4-blocks')
      },
      articles_description: {
        type: 'string',
      },
      article_count: {
        type: 'integer',
        default: 3
      },
      tags: {
        type: 'array',
        default: []
      },
      posts: {
        type: 'array',
        default: []
      },
      post_types: {
        type: 'array',
        default: []
      },
      read_more_text: {
        type: 'string',
        default: __('Load more', 'planet4-blocks')
      },
      read_more_link: {
        type: 'string',
        default: ''
      },
      button_link_new_tab: {
        type: 'boolean',
        default: false
      },
      ignore_categories: {
        type: 'boolean',
        default: false
      }
    },
    edit: props => (
      <div {...useBlockProps()}>
        <ArticlesEditor {...props} />
      </div>
    ),
    save: ({ attributes }) => (
      <div {...useBlockProps.save()}>
        <ArticlesFrontend {...attributes} />
      </div>
    ),
    deprecated: [
      {
        attributes: {
          article_heading: {
            type: 'string',
          },
          articles_description: {
            type: 'string',
          },
          article_count: {
            type: 'integer',
            default: 3
          },
          tags: {
            type: 'array',
            default: []
          },
          posts: {
            type: 'array',
            default: []
          },
          post_types: {
            type: 'array',
            default: []
          },
          read_more_text: {
            type: 'string',
          },
          read_more_link: {
            type: 'string',
            default: ''
          },
          button_link_new_tab: {
            type: 'boolean',
            default: false
          },
          ignore_categories: {
            type: 'boolean',
            default: false
          }
        },
        save() {
          return null;
        },
      }
    ],
  });
};


