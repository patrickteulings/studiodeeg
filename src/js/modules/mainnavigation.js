

//
// MAINNAVIGATION.JS
// CONTROLS ALL ACTIONS FOR STICKY HEADER NAVIGATION
//

MainNavigation = (function(){

    var obj = {};
    var menuOpen = false;
    var menuContainer = $('#navigationItems');
    var wrapper = $('#wrapper');
    var prefix = Utilities.getPrefix().css;
    var triangleLT = $('.header-triangle-top-left img');
    var Utils = Utilities;

    obj.init = function(){

        obj.addEvents();

    };


    // ADDS MAIN HANDLERS, CLICK EVENTS ETC.


    obj.addEvents = function(){
        $('#menuToggle').on('click',function(){
            obj.toggleMenu();
        });

        menuContainer.find('li:not(".social")').css('margin-left','400px');
        menuContainer.find('a').on('click',function(){
            obj.toggleMenu();
        });

        // RquestAnimationFrame

        // shim layer with setTimeout fallback
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
        })();


        // usage:
        // instead of setInterval(render, 16) ....

        (function animloop(){
            requestAnimFrame(animloop);
            obj.paralaxIt();
        })();        
    };


    // OPEN OR CLOSE MENU


    obj.toggleMenu = function(){

        $('#menuToggle').toggleClass('open');

        if(menuOpen === false){
            // TweenLite.to(menuContainer, 0.5, {width:300,ease:Power4.easeInOut});
            // TweenLite.to(wrapper, 0.5, {left:-100,ease:Power4.easeInOut});
            menuContainer.addClass('open');
            wrapper.addClass('open');

            menuContainer.find('li:not(".social")').each(function(index,value){
                TweenLite.to(value, 0.5 + (index/10), {marginLeft:40,delay:(index/20), ease:Power4.easeOut});
            });

        }
        else{
            // TweenLite.to(menuContainer, 0.5, {width:0,ease:Power4.easeOut});
            // TweenLite.to(wrapper, 0.5, {left:0,ease:Power4.easeOut});

            menuContainer.removeClass('open');
            wrapper.removeClass('open');
            menuContainer.find('li').each(function(index,value){
                TweenLite.to(value, 0.5, {marginLeft:400});
            });

        }

        menuOpen = !menuOpen;

    };


    // PARALLAX ACTIONS

    obj.paralaxIt = function(){
        var beyondHeader = false;

        // Dont show any css transition if the image is offscreen
        //if(Utils.getScrollTop() > 860){ 
            $('#brandMasked').css('height',$(window).scrollTop() - (860 - 51 - 70));
            $('#maskedToggle').css('height',$(window).scrollTop() - (860 - 51 - 70));            
        
        //}
        // else{
        //     if(beyondHeader === true){
        //         beyondHeader = false;
        //     }
        // }

        $(triangleLT).css(prefix + 'transform','translateY(' + Math.round((Utils.getScrollTop()/2)) + 'px)');
        $(triangleLT).css('opacity',1- (Utils.getScrollTop()/200));
    };


    return obj;

})();
