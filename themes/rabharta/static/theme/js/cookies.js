(() => {

const { siteCookies } = window.greenLeft;
const cookieModal = document.getElementById('modal');
const privacySettingsLink = document.getElementById('privacy-settings');
privacySettingsLink.addEventListener('click', (evt) => {
    evt.preventDefault();
    siteCookies.createCookiePopup(
        document,
        document.getElementById('modal'),
        true
    );
});

siteCookies.createCookiePopup(document, cookieModal).then((cookiePreferences) => {
    // Load tracker if allowed
    if (cookiePreferences.get('matamo-id', false)) {
        if (window.greenLeft.baseConfig.environment === 'QA') {
            console.log('Not loading matomo on QA');
        } else {
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function () {
                var u = "//stats.anrabhartaglas.ie/";
                _paq.push(['setTrackerUrl', u + 'matomo.php']);
                _paq.push(['setSiteId', '1']);
                var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                g.type = 'text/javascript'; g.async = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s);
            })();
        }
    }
});

})();