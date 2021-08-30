import { Fragment } from '@wordpress/element';
import { FrontendRichText } from '../../components/FrontendRichText/FrontendRichText';
import { removeCookie, useCookie, writeCookie, readCookie } from './useCookie';
import { useState, useEffect } from 'react';

const { __ } = wp.i18n;
const CONSENT_COOKIE = 'greenpeace';
const ONLY_NECESSARY = '1';
const ALL_COOKIES = '2';
const NECESSARY_ANALYTICAL = '3';
const NECESSARY_ANALYTICAL_MARKETING = '4';

// Planet4 settings(Planet4>>Cookies text>>Enable Analytical Cookies).
const ENABLE_ANALYTICAL_COOKIES = window.p4bk_vars.enable_analytical_cookies;

const showCookieNotice = () => {
  // the .cookie-notice element belongs to the P4 Master Theme
  const cookieElement = document.querySelector('#set-cookie');
  if (cookieElement) {
    cookieElement.classList.add('shown');
  }
}

const hideCookieNotice = () => {
  // the .cookie-notice element belongs to the P4 Master Theme
  const cookieElement = document.querySelector('#set-cookie');
  if (cookieElement) {
    cookieElement.classList.remove('shown');
  }
}

export const CookiesFrontend = props => {
  const {
    isSelected,
    title,
    description,
    necessary_cookies_name,
    necessary_cookies_description,
    analytical_cookies_name,
    analytical_cookies_description,
    all_cookies_name,
    all_cookies_description,
    isEditing,
    className,
    toAttribute = () => {},
  } = props;

  // Whether consent was revoked by the user since current page load.
  const [userRevokedNecessary, setUserRevokedNecessary] = useState(false);
  const [userRevokedAllCookies, setUserRevokedAllCookies] = useState(false);
  const [userRevokedAnalytical, setUserRevokedAnalytical] = useState(false);
  const [consentCookie, setConsentCookie, removeConsentCookie] = useCookie(CONSENT_COOKIE);
  const necessaryCookiesChecked = [ONLY_NECESSARY, NECESSARY_ANALYTICAL, ALL_COOKIES, NECESSARY_ANALYTICAL_MARKETING].includes(consentCookie);
  const analyticalCookiesChecked = [NECESSARY_ANALYTICAL, NECESSARY_ANALYTICAL_MARKETING].includes(consentCookie);
  const allCookiesChecked = ALL_COOKIES === consentCookie || NECESSARY_ANALYTICAL_MARKETING === consentCookie;
  const hasConsent = allCookiesChecked || necessaryCookiesChecked || analyticalCookiesChecked;

  const updateNoTrackCookie = () => {
    if (hasConsent) {
      removeCookie('no_track');
    } else if (userRevokedNecessary) {
      writeCookie('no_track', 'true');
    }
  };
  useEffect(updateNoTrackCookie, [hasConsent, userRevokedNecessary, userRevokedAnalytical]);

  const toggleCookieNotice = () => {
    if (hasConsent) {
      hideCookieNotice();
    } else {
      showCookieNotice();
    }
  };
  useEffect(toggleCookieNotice, [hasConsent]);

  const toggleHubSpotConsent = () => {
    if (!allCookiesChecked && userRevokedAllCookies) {
      const _hsp = window._hsp = window._hsp || [];
      _hsp.push(['revokeCookieConsent']);
    }
  }
  useEffect(toggleHubSpotConsent, [allCookiesChecked, userRevokedAllCookies])

  // Make the necessary cookies checked by default on user's first visit.
  // Here if the No cookies set(absence of 'greenpeace' & 'no_track' cookies) consider as first visit of user.
  if (!consentCookie && !readCookie('no_track') && !userRevokedNecessary) {
    setConsentCookie(ONLY_NECESSARY);
  }

  return <Fragment>
    <section className={`block cookies-block ${className ?? ''}`}>
      {(isEditing || title) &&
      <header>
        <FrontendRichText
          tagName="h2"
          className="page-section-header"
          placeholder={__('Enter title', 'planet4-blocks-backend')}
          value={title}
          onChange={toAttribute('title')}
          keepPlaceholderOnFocus={true}
          withoutInteractiveFormatting
          multiline="false"
          editable={isEditing}
          allowedFormats={[]}
        />
      </header>
      }
      {(isEditing || description) &&
      <FrontendRichText
        tagName="p"
        className="page-section-description"
        placeholder={__('Enter description', 'planet4-blocks-backend')}
        value={description}
        onChange={toAttribute('description')}
        keepPlaceholderOnFocus={true}
        withoutInteractiveFormatting
        editable={isEditing}
        allowedFormats={['core/bold', 'core/italic']}
      />
      }
      {(isEditing || (necessary_cookies_name && necessary_cookies_description)) &&
      <Fragment>
        <label className="custom-control"
               style={isSelected ? { pointerEvents: 'none' } : null}>
          <input
            type="checkbox"
            tabIndex={isSelected ? '-1' : null}
            name="necessary_cookies"
            onChange={ () => {
              if (necessaryCookiesChecked) {
                setUserRevokedNecessary(true);
                setUserRevokedAllCookies(true);
                removeConsentCookie();
              } else {
                if (ENABLE_ANALYTICAL_COOKIES && analyticalCookiesChecked) {
                  setConsentCookie(NECESSARY_ANALYTICAL);
                } else {
                  setConsentCookie(ONLY_NECESSARY);
                }
              }
            } }
            checked={necessaryCookiesChecked}
            className="p4-custom-control-input"
          />
          <FrontendRichText
            tagName="span"
            className="custom-control-description"
            placeholder={__('Enter necessary cookies name', 'planet4-blocks-backend')}
            value={necessary_cookies_name}
            onChange={toAttribute('necessary_cookies_name')}
            keepPlaceholderOnFocus={true}
            withoutInteractiveFormatting
            multiline="false"
            editable={isEditing}
            allowedFormats={[]}
          />
        </label>
        <FrontendRichText
          tagName="p"
          className="cookies-checkbox-description"
          placeholder={__('Enter necessary cookies description', 'planet4-blocks-backend')}
          value={necessary_cookies_description}
          onChange={toAttribute('necessary_cookies_description')}
          keepPlaceholderOnFocus={true}
          withoutInteractiveFormatting
          editable={isEditing}
          allowedFormats={['core/bold', 'core/italic']}
        />
      </Fragment>
      }
      {((ENABLE_ANALYTICAL_COOKIES) && (isEditing || (analytical_cookies_name && analytical_cookies_description))) &&
      <Fragment>
        <label className="custom-control"
              style={isSelected ? { pointerEvents: 'none' } : null}>
          <input
            type="checkbox"
            tabIndex={isSelected ? '-1' : null}
            name="analytical_cookies"
            onChange={ () => {
              if (analyticalCookiesChecked) {
                setUserRevokedAnalytical(true);
                setUserRevokedAllCookies(true);
                if (allCookiesChecked) {
                  setConsentCookie(ALL_COOKIES);
                } else {
                  setConsentCookie(ONLY_NECESSARY);
                }
              } else {
                if (allCookiesChecked) {
                  setConsentCookie(NECESSARY_ANALYTICAL_MARKETING);
                } else {
                  setConsentCookie(NECESSARY_ANALYTICAL);
                }
              }
            } }
            checked={analyticalCookiesChecked}
            className="p4-custom-control-input"
          />
          <FrontendRichText
            tagName="span"
            className="custom-control-description"
            placeholder={__('Enter analytical cookies name', 'planet4-blocks-backend')}
            value={analytical_cookies_name}
            onChange={toAttribute('analytical_cookies_name')}
            keepPlaceholderOnFocus={true}
            withoutInteractiveFormatting
            multiline="false"
            editable={isEditing}
            allowedFormats={[]}
          />
        </label>
        <FrontendRichText
          tagName="p"
          className="cookies-checkbox-description"
          placeholder={__('Enter analytical cookies description', 'planet4-blocks-backend')}
          value={analytical_cookies_description}
          onChange={toAttribute('analytical_cookies_description')}
          keepPlaceholderOnFocus={true}
          withoutInteractiveFormatting
          editable={isEditing}
          allowedFormats={['core/bold', 'core/italic']}
        />
      </Fragment>
      }
      {(isEditing || (all_cookies_name && all_cookies_description)) &&
      <Fragment>
        <label className="custom-control"
               style={isSelected ? { pointerEvents: 'none' } : null}>
          <input
            type="checkbox"
            tabIndex={isSelected ? '-1' : null}
            onChange={ () => {
              if (allCookiesChecked) {
                setUserRevokedAllCookies(true);
                if (ENABLE_ANALYTICAL_COOKIES && analyticalCookiesChecked) {
                  setConsentCookie(NECESSARY_ANALYTICAL);
                } else {
                  setConsentCookie(ONLY_NECESSARY);
                }
              } else {
                if (ENABLE_ANALYTICAL_COOKIES && analyticalCookiesChecked) {
                  setConsentCookie(NECESSARY_ANALYTICAL_MARKETING);
                } else {
                  setConsentCookie(ALL_COOKIES);
                }
              }
            } }
            name="all_cookies"
            checked={allCookiesChecked}
            className="p4-custom-control-input"
          />
          <FrontendRichText
            tagName="span"
            className="custom-control-description"
            placeholder={__('Enter all cookies name', 'planet4-blocks-backend')}
            value={all_cookies_name}
            onChange={toAttribute('all_cookies_name')}
            keepPlaceholderOnFocus={true}
            withoutInteractiveFormatting
            multiline="false"
            editable={isEditing}
            allowedFormats={[]}
          />
        </label>
        <FrontendRichText
          tagName="p"
          className="cookies-checkbox-description"
          placeholder={__('Enter all cookies description', 'planet4-blocks-backend')}
          value={all_cookies_description}
          onChange={toAttribute('all_cookies_description')}
          keepPlaceholderOnFocus={true}
          withoutInteractiveFormatting
          editable={isEditing}
          allowedFormats={['core/bold', 'core/italic']}
        />
      </Fragment>
      }
    </section>
  </Fragment>;
}
