define(['core/js/adapt'], function(Adapt) {

  Adapt.on("app:dataReady", function() {
    if (!Adapt.config.get('_googleAnalytics') || !Adapt.config.get('_googleAnalytics')._isEnabled)
      return;
    var gaIdentifier = Adapt.config.get('_googleAnalytics')._identifier;
    var GaTag = document.createElement("script");
    var GaScript = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', '" + gaIdentifier + "', 'auto');"
    GaTag.innerHTML = GaScript;
    document.head.appendChild(GaTag);
  });

  Adapt.on("pageView:ready menuView:ready", function() {
    if (!Adapt.config.get('_googleAnalytics') || !Adapt.config.get('_googleAnalytics')._isEnabled)
      return;
    ga('set', 'page', getUrl());
    ga('send', 'pageview');
    console.log('working');
    printPageListener();
  });

  function printPageListener() {
    if(Adapt.config.get('_googleAnalytics')._interactions._printPage) {

      $('body').on('click', '.printPage-icon', function() {
          console.log('print page fired');
          ga('send', 'event', 'Button', 'Click', 'Print page');
      });

    }
  }

  function getUrl() {
    return location.pathname + location.hash;
  }
});
