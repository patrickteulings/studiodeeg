
//
// HOME.js
//




Home = (function(){

    var obj = {};


    obj.init = function(_userId){

        TweenLite.to($('#view'),0.5,{opacity:0});        

        setTimeout(function(){obj.loadPartial();},500);
    };


    obj.loadPartial = function(){
        PartialsLoader.loadPartial('/partials/home.php').done(function(data){
            $('html,body').scrollTop(0);
            $('#view').html(data);
            $('body').removeClass().addClass('default');
            Utilities.captureHistoryLinks();
        });
        obj.loadImages();
    };

    //
    // HANDLES SINGLE FILE LOAD COMPLETION
    //


    obj.handleFileComplete = function(event){
        if(event.item.id === 'BG-01'){
            $('.hero').css('background-image','url(' + event.result.currentSrc + ')');
        }

        $('#'+event.item.id).css('background-image','url(' + event.result.currentSrc + ')');
        $('#'+event.item.id).animate({'height':200},200);

    };


    //
    // HANDLES OVERALL PROGRESS (eg ALL IMAGES)
    //


    obj.handleProgress = function(event){
        SmoothProgressBar.updateProgress(preload.progress);
    };


    //
    //  HANDLES COMPLETION OF ALL IMAGES
    //


    obj.handleComplete = function(event){        
        SmoothProgressBar.stopProgress();
        TweenLite.to($('#view'),1,{opacity:1,delay:2});
        if($('#whiteOverlay').length) $('#whiteOverlay').remove();
    };


    //
    //  HANDLES ERRORS
    //


    obj.handleFileError = function(event){
        SmoothProgressBar.stopProgress();
    };



    obj.loadImages = function() {
            
        // ADD LISTENERS

        preload = new createjs.LoadQueue();
        preload.addEventListener("fileload", obj.handleFileComplete);
        preload.addEventListener("progress", obj.handleProgress);
        preload.addEventListener("complete", obj.handleComplete);
        preload.addEventListener("error", obj.handleFileError);

        // ADD MANIFEST FOR MULTIPLE IMAGES

        var manifest = [{src:"/images/koen/jankoenlomans-landing.jpg", id:"BG-01"},{src:"/images/koen/JKL_0.jpg", id:"BG-02"},{src:"/images/koen/JKL_0.jpg", id:"BG-03"},{src:"/images/koen/JKL_0.jpg", id:"BG-04"}];

        // START PRELOAD

        preload.loadManifest(manifest);

        // START THE PROGRESS BAR

        SmoothProgressBar.startProgress();
    };


    return obj;



})();
