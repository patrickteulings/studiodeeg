

//
// MAINNAVIGATION.JS
// CONTROLS ALL ACTIONS FOR STICKY HEADER NAVIGATION
//

MainNavigation = (function(){

    var obj = {};

    var currentScrollTop = 0;

    obj.init = function(){        
        obj.addEvents();
    };


    //
    // ADD EVENTS
    //


    obj.addEvents = function(){
        $('#categoriesToggle').on('click',function(){
            obj.openRightHandMenu();
            obj.setActiveMenuItem($(this));
            CategorySlideOutMenu.init();
        });


        $('#addMnemonicToggle').on('click',function(){            
            if(Utilities.laravelBuild === false || Utilities.laravelBuild === true){
                AddMnemonic.init();
            }
            obj.setActiveMenuItem($(this));            
        });  


        $('#profileToggle').on('click',function(){            
            obj.setActiveMenuItem($(this));            
        });  


        $('#explanationToggle').on('click',function(){
            obj.setActiveMenuItem();
            obj.toggleLeftHandMenu();            
        });

        $('#searchToggle').on('click',function(){
            obj.toggleSearchBar();            
        });

        $('#slideNavigationRight .close').on('click',function(){            
            obj.closeRightHandMenu();            
        });

        $('#slideNavigationLeft .close').on('click',function(){
            obj.closeLeftHandMenu();            
        });

        $(window).on('resize',function(){
            obj.resizeNavigationContainers();
        }).resize();

        var inertiaTimeout = 0;

        $(window).on('scroll',function(){
            var scrollPos = $(this).scrollTop();
            obj.checkNavPosition(scrollPos);
            
            clearTimeout(inertiaTimeout);
            inertiaTimeout = setTimeout(function(){ obj.resetScroll(scrollPos); },2000);
        }).scroll();        
    };


    //
    // RESET CURRENTSCROLLTOP AFTER 2 SECONDS
    //


    obj.resetScroll =  function(_scroll){
        currentScrollTop = _scroll;
        
    };


    //
    // CHECK SCROLL POSITION TO SEE IF WE SHOULD SHOW / HIDE THE NAV
    //


    var inertiaBlocker;

    obj.checkNavPosition = function(_scroll){
        var minScrollDistance = 100;        

        if(Utilities.winWidth > 992){
            return false;
        }

        // FIX FOR APPLE'S INERTIA STUFF

        if(_scroll <= 0){
            clearTimeout(inertiaBlocker);            
            inertiaBlocker = setTimeout(function(){
                obj.checkNavPosition(_scroll);                
            },2000);
            return false;
        }

        // Show or hide the header if user has scrolled more than x-pixels

        if(_scroll > currentScrollTop){
            
            if((_scroll - currentScrollTop) > minScrollDistance){
                if(!$('nav').hasClass('navHidden')){
                    TweenLite.to($('nav'),0.5,{top:-200,ease:Power4.easeIn});        
                    $('nav').addClass('navHidden');        
                }
                currentScrollTop = _scroll;
            }
        }
        else{
            if((currentScrollTop - _scroll ) > minScrollDistance){
                if($('nav').hasClass('navHidden')){
                    TweenLite.to($('nav'),0.5,{top:0,ease:Power4.easeOut});                
                    $('nav').removeClass('navHidden');
                }
                currentScrollTop = _scroll;                
            }
        }
    };    



    // 
    //  SETTING ACTIVE MENU ITEMS
    //


    obj.setActiveMenuItem = function(_el){
        $('.menuToggleButton').removeClass('active');    

        if(_el || _el !== undefined){
            $(_el).addClass('active');
        }
    };


    //
    // RIGHT HAND MENU
    //


    obj.openRightHandMenu = function(){
        $('#slideNavigationRight').addClass('open');
        obj.showOverlay();
    };


    obj.closeRightHandMenu = function(){
        $('#slideNavigationRight').removeClass('open');

        // ONLY HIDE OVERLAY IF BOTH SLIDENAVIGATIONS ARE CLOSED        
        if(!$('#slideNavigationLeft').hasClass('open')) obj.hideOverlay();
    };


    obj.toggleRightHandMenu = function(){
        if($('#slideNavigationRight').hasClass('open')){
            obj.closeRightHandMenu();
        }
        else{
            obj.openRightHandMenu();
        }
    };


    //
    // LEFT HAND MENU
    //


    obj.openLeftHandMenu = function(){
        $('#slideNavigationLeft').addClass('open');
        obj.showOverlay();
    };


    obj.closeLeftHandMenu = function(){
        $('#slideNavigationLeft').removeClass('open');

        // ONLY HIDE OVERLAY IF BOTH SLIDENAVIGATIONS ARE CLOSED
        if(!$('#slideNavigationRight').hasClass('open')) obj.hideOverlay();
        
    };


    obj.toggleLeftHandMenu = function(){
        if($('#slideNavigationLeft').hasClass('open')){
            obj.closeLeftHandMenu();
        }
        else{
            obj.openLeftHandMenu();
        }
    };    


    //
    // NAVIGATION OVERLAY - SHOW / HIDE
    //

    obj.showOverlay = function(){
        $('#navigationOverlay').addClass('show');

        $('#navigationOverlay').on('click',function(){
            obj.closeLeftHandMenu();
            obj.closeRightHandMenu();
        });

        // PREVENT BODY SCROLLING
        $('body').addClass('hideOverflow');        
        
    };


    obj.hideOverlay = function(){
        $('#navigationOverlay').removeClass('show');
        $('#navigationOverlay').unbind('click');        
        
        $('body').removeClass('hideOverflow');
    };


    //
    // TOGGLE SEARCHBAR - ONLY BELOW LANDSCAPE TABLET
    //


    obj.toggleSearchBar = function(){
        $('#searchContainer').css('display','block');
    };


    //
    // RESIZE SLIDENAVIGATION CONTAINERS BECAUSE WE NEED A PIXELHEIGHT FOR THE INNER SCROLLBAR
    //


    obj.resizeNavigationContainers = function(){        

        var winHeight = (typeof window.outerHeight != 'undefined') ? Math.max(window.outerHeight, $(window).height()) : $(window).height();        

        if(Utilities.winWidth > 480){
            $('#slideNavigationRight .view').css('height',$(window).height() - ($('#slideNavigationRight .view').offset().top - $(window).scrollTop()));
            $('#slideNavigationLeft .explanationContainer').css('height',$(window).height() - ($('#slideNavigationLeft .view').offset().top - $(window).scrollTop()));
            
        }
        else{
            $('#slideNavigationRight .view').css('height',$(window).innerHeight() - ($('#slideNavigationRight .view').offset().top));
            $('#slideNavigationRight').css('height',$(window).height());
        }

    };


    return obj;

})();







