define(function(require) {

    var Adapt = require('coreJS/adapt');

	Adapt.on("app:dataReady", function() {
		var gaIdentifier = Adapt.config.attributes._googleAnalytics._identifier;
        var GaTag = document.createElement("script");
        var GaScript =  "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', '" + gaIdentifier + "', 'auto', {'name': 'siteLinker','allowLinker': true});ga('require', 'linker');ga('require', 'displayfeatures');ga('send', 'pageview');ga('siteLinker.send', 'pageview');"
        GaTag.innerHTML = GaScript;
        document.head.appendChild(GaTag);
    });

	Adapt.on("pageView:ready", function() {
        ga('set', 'page', getUrl());
		ga('send', 'pageview');
    });


	Adapt.on("menuView:ready", function() {
        ga('set', 'page', getUrl());
		ga('send', 'pageview');
    });
});

function getUrl() {
	return location.pathname + location.hash;
}