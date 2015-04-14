

// CREATES A SMOOTH LOADING EXPERIENCE WITH REQUESTANIMATIONFRAME

SmoothProgressBar = (function(){

    var obj = {};


    var currentWidth = 0;
    var destinationWidth = 0;
    var diffWidth = 0;
    var request;
    var targetWidth = $(window).width();
    var stopped = false; // NEED A BOOLEAN TO FORCE THE CORRECT WIDTH


    //
    // CALL THIS ON EVERY CREATE JS PROGRESS EVENT
    //


    obj.updateProgress = function(_loaded){
        currentWidth = parseInt($('#progress').css('width'));
        destinationWidth = $(window).width() * _loaded;
    };


    //
    // THE PROGRESS BAR ANIMATION
    //


    obj.animate = function(){

        if(stopped === true) return false;

        // THE DIFFERENCE BETWEEN THE DESIRED CURRENT WIDTH AND THE ACTUAL WIDTH
        diffWidth = destinationWidth - currentWidth;

        // ADD A SMALL AMOUNT OF THE DIFFERENCE TO THE PROGRESS BAR
        var translateWidth = ((currentWidth + (diffWidth/20)));

        // SET ACTUAL WIDTH
        $('#progress').css('width',translateWidth );

        // RESET CURRENT WIDTH VAR SO WE CAN ADD A SMALL AMOUNT AGAIN
        currentWidth = parseInt($('#progress').css('width'));


        if(currentWidth >= targetWidth){
            obj.stopProgress();
        }

        //console.log('active: ' + currentWidth  + ' -- ' + $(window).width());

    };


    //
    // ADD REQUEST ANIMATION FRAME FOR SMOOTH ANIMATING
    //


    obj.startProgress = function(){
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
        })();

        (function animloop(){
            obj.animate();
            request = requestAnimFrame(animloop);

        })();
    };


    //
    // REMOVE ANIMATION FRAME WHEN DONE
    //


    obj.stopProgress = function(){
        setTimeout(function(){
            cancelRequestAnimFrame(request);
            $('#progress').css('width',targetWidth);
            stopped = true;
        }, 1*1000);

        TweenLite.to($('#progress'), 0.5, {height:0,delay:2, ease:Power4.easeOut});
        TweenLite.to($('#progress'), 0.5, {width:0,delay:3, ease:Power4.easeOut});
        TweenLite.to($('#progress'), 0.5, {height:10,delay:4, ease:Power4.easeOut});
    };


    //
    // REQUEST ANIMATION CANCEL
    //


    window.cancelRequestAnimFrame = ( function() {
        return window.cancelAnimationFrame          ||
            window.webkitCancelRequestAnimationFrame    ||
            window.mozCancelRequestAnimationFrame       ||
            window.oCancelRequestAnimationFrame     ||
            window.msCancelRequestAnimationFrame        ||
            clearTimeout;

    } )();


    return obj;


})();
