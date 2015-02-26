

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

        menuContainer.find('li').css('margin-left','-200px');
    };


    // OPEN OR CLOSE MENU


    obj.toggleMenu = function(){

        $('#menuToggle').toggleClass('open');
    
        if(menuOpen === false){                       
            menuContainer.addClass('open');
            
            menuContainer.find('li').each(function(index,value){                
                TweenLite.to(value, 0.5 + (index/10), {marginLeft:40,delay:index/20, ease:Power4.easeOut});
            });

        }
        else{
            menuContainer.removeClass('open');
            menuContainer.find('li').each(function(index,value){                
                TweenLite.to(value, 0.5, {marginLeft:-200});
            });        

        }

        menuOpen = !menuOpen;

    };


    return obj;

})();







