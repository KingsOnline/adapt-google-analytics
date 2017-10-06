define(['core/js/adapt'], function(Adapt) {

  Adapt.on("app:dataReady", function() {
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
    var interactions = Adapt.config.get('_googleAnalytics')._interactions;
    console.log(interactions);
    setupPrintPage(interactions._printPage);
    setupBrightcove(interactions._brightcove);
    setupContents(interactions._contents);
    setupSearch(interactions._search);
  });

  Adapt.on("pageView:ready menuView:ready", function() {
    if (!Adapt.config.get('_googleAnalytics') || !Adapt.config.get('_googleAnalytics')._isEnabled)
      return;
    console.log('/' + location.hash);
    ga('set', 'page', '/' + location.hash);
  });

  function setupPrintPage(printPage) {
    if (!printPage) return;
    if (printPage._navigation) {
      $('body').on('click', '.printPage-icon', function() {
        console.log('print page fired');
        ga('send', 'event', 'printPage', 'navigation', Adapt.course.get('title'));
      });
    }
    if (printPage._bottomPage) {
      $('body').on('click', '.printPage-icon', function() {
        console.log('print page fired');
        ga('send', 'event', 'printPage', 'navigation', Adapt.course.get('title'));
      });
    }
  }

  function setupBrightcove(brightcove) {
    if (!brightcove) return;
    if (brightcove._transcriptOpened) {
      $('body').on('click', '.media-inline-transcript-button', function() {
        ga('send', 'event', 'Brightcove', 'transcript-opened', Adapt.course.get('title'));
      });
    }
    if (brightcove._transcriptDownloaded) {
      $('body').on('click', '.media-inline-transcript-button', function() {
        ga('send', 'event', 'Brightcove', 'transcript-downloaded', Adapt.course.get('title'));
      });
    }
  }

  function setupContents(contents) {
    if (!contents) return;
    if (contents._pageComplete) { // needs to be setup every page
      Adapt.on("contents:pageComplete", function() {
        ga('send', 'event', 'Contents', 'page-complete', '/' + location.hash);
      });
    }
    if (contents._articleClicked) {
      $('body').on('click', '.contents-article-title', function() {
        console.log('Article clicked');
        ga('send', 'event', 'Contents', 'article-clicked', Adapt.course.get('title'));
      });
    }
    if (contents._componentClicked) {
      console.log('cc cliced');
      $('body').on('click', '.contents-component-title', function() {
        console.log('component clicked');
        ga('send', 'event', 'Contents', 'component-clicked', Adapt.course.get('title'));
      });
    }
  }

  function setupSearch(search) {
    if (!search) return;
    if (search._iconClicked) {
      $('body').on('click', '.icon-search', function() {
        console.log('Searching');
        ga('send', 'event', 'Search', 'icon-clicked', Adapt.course.get('title'));
      });
    }
  }

  function getUrl() {
    return location.pathname + location.hash;
  }
});
