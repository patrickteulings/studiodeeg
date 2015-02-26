
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

console.log('*****************************************************************************************************');
console.log('');
console.log('Hi, checking out the code huh? Why not do it on github? https://github.com/patrickteulings/studiodeeg');
console.log('');
console.log('*****************************************************************************************************');