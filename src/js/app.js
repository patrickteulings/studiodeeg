
// NEW HTTP://WWW.STUDIODEEG WEBSITE

$(document).ready(function(){    


    App = (function(){
        
        var obj = {};        
        var appState; // holds a string which we use in the router.js to avoid double loading


        // INIT THE ENTIRE APP

        obj.init = function(){

            MainNavigation.init();        

            Localstorage.addVisit();

            Utilities.replaceSVG();
        
            FastClick.attach(document.body);

        };

        // IT'S GO TIME

        obj.init();

        return obj;

    })();



});