module.exports = (function analytics() {

  const isProduction = (process.env.NODE_ENV === 'production') ? true : false;
  const isBrowser = (typeof window !== 'undefined') ? true : false;

  function trackRoute(nextRoute) {
    if (isBrowser && isProduction) {
      const title = (nextRoute.length === 1) ? 'Dashboard' : 'Manage';
      window.ga('set', {page: nextRoute, title: title});
      window.ga('send', 'pageview');
    }
  }

  function trackEvent(eventObj) {
    if (isBrowser && isProduction) {
      window.ga('send', {
        hitType: 'event',
        eventCategory: eventObj.category,
        eventAction: eventObj.action,
        eventLabel: eventObj.label,
      });
    }
  }

  return {
    trackRoute: trackRoute,
    trackEvent: trackEvent,
  };

})();
