if (tarteaucitron) {
  tarteaucitron.init({
    "privacyUrl": "", /* Privacy policy url */

    "hashtag": "#tarteaucitron", /* Open the panel with this hashtag */
    "cookieName": "tartaucitron", /* Cookie name */

    "tarteaucitronForceLanguage": "en",

    "orientation": "bottom", /* Banner position (top - bottom) */
    "showAlertSmall": false, /* Show the small banner on bottom right */
    "cookieslist": true, /* Show the cookie list */

    "adblocker": false, /* Show a Warning if an adblocker is detected */
    "AcceptAllCta": true, /* Show the accept all button when highPrivacy on */
    "highPrivacy": false, /* Disable auto consent */
    "handleBrowserDNTRequest": false, /* If Do Not Track == 1, disallow all */

    "removeCredit": true, /* Remove credit link */
    "moreInfoLink": false, /* Show more info link */
    "useExternalCss": false /* If false, the tarteaucitron.css file will be loaded */

    //"cookieDomain": ".my-multisite-domaine.fr" /* Shared cookie for subdomain website */
  });

  tarteaucitron.user.googletagmanagerId = 'GTM-KNVNHK9';
  (tarteaucitron.job = tarteaucitron.job || []).push('googletagmanager');

}