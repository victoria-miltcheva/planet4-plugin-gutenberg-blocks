export const mediaV1 = {
        transforms: {
          from: [
            {
              type: 'shortcode',
              // Shortcode tag can also be an array of shortcode aliases
              tag: 'shortcake_media_video',
              attributes: {
                video_title: {
                  type: 'string',
                  shortcode: ({named: {video_title = ''}}) => video_title,
                },
                description: {
                  type: 'string',
                  shortcode: ({named: {description = ''}}) => description,
                },
                youtube_id: {
                  type: 'string',
                  shortcode: ({named: {youtube_id = ''}}) => youtube_id,
                },
                video_poster_img: {
                  type: 'integer',
                  shortcode: ({named: {video_poster_img = ''}}) => video_poster_img,
                }
              },
            },
          ]
        },
        attributes: {
          video_title: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          youtube_id: {
            type: 'string'
          },
          video_poster_img: {
            type: 'integer'
          }
        },
        save() {
          return null;
        }
}
