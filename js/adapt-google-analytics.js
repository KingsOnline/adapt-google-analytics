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

    var interactions = Adapt.config.get('_googleAnalytics')._interactions;
    setupPrintPage(interactions._printPage);
    setupBrightcove(interactions._brightcove);
    setupContents(interactions._contents);
    setupSearch(interactions._search);
  });

  function setupPrintPage(printPage) {
    if(!printPage) return;
      if(printPage._navigation) {
        $('body').on('click', '.printPage-icon', function() {
            console.log('print page fired');
            ga('send', 'event', 'Button', 'Click', 'Print page');
        });
      }
  }

  function setupBrightcove(brightcove) {
    if(!brightcove) return;
  }

  function setupContents(contents) {
    if(!contents) return;
  }

  function setupSearch(search) {
    if(!search) return;
  }



  function getUrl() {
    return location.pathname + location.hash;
  }
});
