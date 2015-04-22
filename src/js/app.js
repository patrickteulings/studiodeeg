
// NEW HTTP://WWW.STUDIODEEG WEBSITE

var baseURL = '/dist';


$(document).ready(function(){




    App = (function(){

        var obj = {};
        var appState; // holds a string which we use in the router.js to avoid double loading


        // INIT THE ENTIRE APP

        obj.init = function(){

            // WELL, QUITE OBVOUS WHTA THIS DOES
            MainNavigation.init();

            // KEEPING TRACK OF THE AMOUNT OF VISITS, SO WE CAN ///
            Localstorage.addVisit();

            // REPLACE SVG IMAGES IF NECCESSARY - 
            Utilities.replaceSVG();  

            // REMOVE 300 MS DELAY ON TOUCH DEVICES
            FastClick.attach(document.body);

            // CATCH INTERNAL PAGE-LINKS SO WE USE OUR ROUTER (VENDOR/HISTORY/HISTORY.JS, MODULES/ROUTER.JS)
            Utilities.captureHistoryLinks();

        };

        // IT'S GO TIME

        obj.init();

        return obj;

    })();

});

console.log('*****************************************************************************************************');
console.log('');
console.log('Hi, checking out the code huh? Why not do it on github? https://github.com/patrickteulings/studiodeeg');
console.log('');
console.log('*****************************************************************************************************');
