define(function(require) {

    var Adapt = require('coreJS/adapt');
    var pageView = require('core/js/views/pageView');
    var introJs = require('./intro');

    // This should add/update progress on menuView

	Adapt.on("pageView:ready", function() {
		var intro = Adapt.course.attributes._intro;
        if(intro === undefined) return;
    	if($("#wrapper").hasClass("location-page") && intro._isEnabled && intro._steps[0] != null){
           for (i = 0; i < intro._steps.length; i++) { 
                assignTutorial(intro._steps[i]._element, intro._steps[i].text);
            }
    		introJs().start();
    	}
    });
});	

function assignTutorial(className, text){
    var h1 = document.getElementsByClassName(className)[0];
    if (h1 === undefined) return;
    var att = document.createAttribute("data-intro");
    att.value = text;
    h1.setAttributeNode(att);
}