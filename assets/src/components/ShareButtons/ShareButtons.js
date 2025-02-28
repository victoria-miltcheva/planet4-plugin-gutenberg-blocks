import { SvgIcon } from './SvgIcon';
const { __ } = wp.i18n;

export const ShareButtons = ({social_params, social_accounts}) => {
  const {
    link = document.URL,
    title = document.title,
    description = '',
    utm_medium = '',
    utm_content = '',
    utm_campaign = '',
  } = social_params;

  const dataLayer = [];
  const share = (action, label) => {
    dataLayer.push({
      event: 'uaevent',
      eventCategory: 'Social Share',
      eventAction: action,
      eventLabel: label
    })
  }

  return (
    <div className="share-buttons">
      <a href={ `https://wa.me/?text=${encodeURIComponent(link)}&${utm('whatsapp', utm_medium, utm_content, utm_campaign)}` }
        onClick={() => {share('Whatsapp', link)}}
        target="_blank"
        className="share-btn whatsapp"
      >
        <SvgIcon {...{name: "whatsapp"}} />
        <span className="visually-hidden">{__( 'Share on', 'planet4-master-theme' )} Whatsapp</span>
      </a>

      <a href={ `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&${utm('facebook', utm_medium, utm_content, utm_campaign)}` }
        onClick={() => {share('Facebook', link)}}
        target="_blank"
        className="share-btn facebook"
      >
        <SvgIcon {...{name: "facebook-f"}} />
        <span className="visually-hidden">{__( 'Share on', 'planet4-master-theme' )} Facebook</span>
      </a>

      <a href={ `${twitterUrl(link, title, description, social_accounts.twitter)}&${utm('twitter', utm_medium, utm_content, utm_campaign)}` }
        onClick={() => {share('Twitter', link)}}
        target="_blank"
        className="share-btn twitter"
      >
        <SvgIcon {...{name: "twitter"}} />
        <span className="visually-hidden">{__( 'Share on', 'planet4-master-theme' )} Twitter</span>
      </a>

      <a href={ `mailto:?subject=${title}&body=${description ? encodeURIComponent(description) : ''}${link}&${utm('email', utm_medium, utm_content, utm_campaign)}` }
        onClick={() => {share('Email', link)}}
        target="_blank"
        className="share-btn email"
      >
        <SvgIcon {...{name: "envelope"}} />
        <span className="visually-hidden">{__( 'Share via', 'planet4-master-theme' )} Email</span>
      </a>
    </div>
  )
}

const twitterUrl = (link, title, description, account) => {
  return `https://twitter.com/share?url=${encodeURIComponent(link)}`
    + `&text=${encodeURIComponent(title)}`
    + (description ? ` - ${encodeURIComponent(description)}` : '')
    + (account ? ` via @${encodeURIComponent(account)}&related=${encodeURIComponent(account)}` : '');
}

const utm = (utm_source, utm_medium, utm_content, utm_campaign) => {
  return [
    utm_source ? `utm_source=${encodeURIComponent(utm_source)}` : null,
    utm_medium ? `utm_medium=${encodeURIComponent(utm_medium)}` : null,
    utm_content ? `utm_content=${encodeURIComponent(utm_content)}` : null,
    utm_campaign ? `utm_campaign=${encodeURIComponent(utm_campaign)}` : null,
  ].filter(x => x).join('&');
}
