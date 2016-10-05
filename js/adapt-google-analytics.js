define(function(require) {

    var Adapt = require('coreJS/adapt');
    var pageView = require('core/js/views/pageView');

    // This should add/update progress on menuView

	Adapt.on("pageView:ready", function() {
		var gaIdentifier = Adapt.config.attributes._googleAnalytics;

        // Create the element
        var GaTag = document.createElement("script");
        var GaScript =  "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create'," + gaIdentifier + ", 'auto', {'name': 'siteLinker','allowLinker': true});ga('require', 'linker');ga('require', 'displayfeatures');ga('send', 'pageview');ga('siteLinker.send', 'pageview');"
        GaTag.innerHTML = GaScript;
        document.head.appendChild(GaTag);
    });
});