

//
// MAINNAVIGATION.JS
// CONTROLS ALL ACTIONS FOR STICKY HEADER NAVIGATION
//

MainNavigation = (function(){

    var obj = {};
    var menuOpen = false;
    var menuContainer = $('#navigationItems');

    obj.init = function(){

        obj.addEvents();
    
    };


    // ADDS MAIN HANDLERS, CLICK EVENTS ETC.


    obj.addEvents = function(){
        $('#menuToggle').on('click',function(){            
            obj.toggleMenu();
        });
    };


    // OPEN OR CLOSE MENU


    obj.toggleMenu = function(){

        $('#menuToggle').toggleClass('open');
    
        if(menuOpen === false){                       
            menuContainer.addClass('open');
        }
        else{
            menuContainer.removeClass('open');
        }

        menuOpen = !menuOpen;

    };


    return obj;

})();







