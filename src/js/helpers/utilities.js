//
// UTILITIES.JS
//

Utilities = (function(){

    var obj = {};

    obj.winWidth = 0;
    var imageSuffix = ($('.svg').length) ? true : false;
    var winScroll;

    //
    // Gets the browser css prefix
    //
    obj.getPrefix = function () {
        if(!window.getComputedStyle) return false;
        
        var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
        return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };
    };



    //
    // CHANGE ALL LINKS WITH A HISTURY ATTRIBUTE TO NOT LINK TO A PAGE BUT TO
    // FIRE A HISTORY PUSH
    //


    obj.captureHistoryLinks = function(){        
        $('a[data-history="true"]').each(function(e){            
            $(this).on('click',function(e){
                e.preventDefault();
                History.pushState({state:1,rand:Math.random()}, "Duo", $(this).attr('href'));
            });
        });
    };


    //
    // CHECK TO SEE IF AN OBJECT IS EMPTY
    //


    obj.isEmptyObject = function(_obj) {
        var name;
        for (name in _obj) {
            return false;
        }
        return true;
    };


    //
    // CONVENIENT GLOBAL ACCES TO WINDOW WIDTH
    //


    obj.getWindowWidth = function(){
        return obj.winWidth;
    };

    // YES SCROLLPOSITION

    $(window).on('scroll',function(){
        winScroll = $(window).scrollTop();
    });



    // YES - WINDOWS WIDTH


    $(window).on('resize',function(){
        obj.winWidth = $(window).width();
    }).resize();

    // CAN WE USE SVG IN OUR JS

    obj.canUseSVG = function(){
        return imageSuffix;
    };


    // GET SCROLLTOP

    obj.getScrollTop = function(){
        return winScroll;
    };

    // INITIALLY REPLACE ALL SVG WITH PNG

    obj.replaceSVG = function(){
        if (!Modernizr.svg) {
            $('img[src*=".svg"]').each(function() {
                //E.g replaces 'logo.svg' with 'logo.png'.
                $(this).attr('src', function() {
                    return $(this).attr('src').replace('.svg', '.png');
                });
            });
        }
    };

    obj.replaceSVG();


    //
    // Email validation
    //

    obj.isValidEmail = function(_emailString){
        var emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        return emailCheck.test(_emailString);
        // var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        // return filter.test(_emailString);
    };

    return obj;

})();
