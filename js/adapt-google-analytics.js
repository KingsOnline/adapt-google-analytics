define(['core/js/adapt'], function(Adapt) {

  Adapt.on("adapt:start", function() {
    if (!Adapt.config.get('_googleAnalytics') || !Adapt.config.get('_googleAnalytics')._isEnabled)
      return;
    var gaIdentifier = Adapt.config.get('_googleAnalytics')._identifier;
    var GaTag = document.createElement("script");
    var GaScript = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', '" + gaIdentifier + "', 'auto');";
    GaTag.innerHTML = GaScript;
    document.head.appendChild(GaTag);
  });

  Adapt.once("pageView:ready", function() {
    if (!Adapt.config.get('_googleAnalytics') || !Adapt.config.get('_googleAnalytics')._isEnabled)
      return;
    ga('set', 'page', getUrl());
    ga('send', 'pageview');
    setupPrintPage();
    setupBrightcove();
    setupContents();
    setupSearch();
  });

  Adapt.on("pageView:ready menuView:ready", function() {
    if (!Adapt.config.get('_googleAnalytics') || !Adapt.config.get('_googleAnalytics')._isEnabled)
      return;
    Adapt.log.debug('/' + location.hash);
    ga('set', 'page', '/' + location.hash);
  });

  function setupPrintPage() {
    $('body').on('click', '.printPage-icon', function() {
      event.preventDefault();
      Adapt.log.debug('print page fired');
      ga('send', 'event', 'printPage', 'navigation', Adapt.course.get('title'));
    });
    $('body').on('click', '.printPage-icon', function() {
      event.preventDefault();
      Adapt.log.debug('print page fired');
      ga('send', 'event', 'printPage', 'navigation', Adapt.course.get('title'));
    });
  }

  function setupBrightcove() {
    $('body').on('click', '.media-inline-transcript-button', function() {
      event.preventDefault();
      var componentID = $(this).closest('.component').attr('data-adapt-id');
      ga('send', 'event', 'Brightcove-transcript-opened', getBCIDfromComponentID(componentID), Adapt.course.get('title'));
    });
    $('body').on('click', '.media-external-transcript-button', function(componentId) {
      event.preventDefault();
      var componentID = $(this).closest('.component').attr('data-adapt-id');
      ga('send', 'event', 'Brightcove-transcript-downloaded', getBCIDfromComponentID(componentID), Adapt.course.get('title'));
    });
  }

  function getBCIDfromComponentID(componentID) {
    return Adapt.findById(componentID).get('_videoId');
  }

  function setupContents() {
    Adapt.on("contents:pageComplete", function() {
      ga('send', 'event', 'Contents', 'page-complete', '/' + Adapt.contentObjects._byAdaptID[Adapt.location._currentId][0].get('title'));
    });
    $('body').on('click', '.contents-article-title', function() {
      Adapt.log.debug('Article clicked');
      ga('send', 'event', 'Contents', 'article-clicked', Adapt.course.get('title'));
    });
    $('body').on('click', '.contents-component-title', function() {
      Adapt.log.debug('component clicked');
      ga('send', 'event', 'Contents', 'component-clicked', Adapt.course.get('title'));
    });
  }

  function setupSearch(search) {
    $('body').on('click', '.icon-search', function() {
      Adapt.log.debug('Searching');
      ga('send', 'event', 'Search', 'icon-clicked', Adapt.course.get('title'));
    });
  }

  function getUrl() {
    return location.pathname + location.hash;
  }
});
