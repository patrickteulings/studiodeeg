
//
// HOME.js
//


var baseURL = "/dist";

Work = (function(){

    var obj = {};


    obj.init = function(_path){

        TweenLite.to($('#view'),0.5,{opacity:0});        

        var partialURL = (_path[1] === undefined || _path[1] === "") ? '/partials/werk.php' : '/partials/werk/' + _path[1] + '.php';

        PartialsLoader.loadPartial(partialURL).done(function(data){
            $('#view').html(data);
            $('html,body').scrollTop(0);
            Utilities.captureHistoryLinks();
            obj.loadImages();


        });

        
    };





    //
    // HANDLES SINGLE FILE LOAD COMPLETION
    //


    obj.handleFileComplete = function(event){
        console.log('handleFileComplete: ' + event);
        if(event.item.id === 'headerImage'){
            $('#headerImage').css('background-image','url(' + event.result.currentSrc + ')');
        }
        else{
            $('*[data-image="' + event.item.id + '"]').css('background-image','url(' + event.result.currentSrc + ')');
            console.log('probeer: ' + event.item.id);
        }

        //$('#'+event.item.id).css('background-image','url(' + event.result.currentSrc + ')');
        //$('#'+event.item.id).animate({'height':200},200);

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
        


        console.log($('#headerImage').attr('data-image'));
        console.log($('#headerImage').html());

        // ADD LISTENERS

        preload = new createjs.LoadQueue();
        preload.addEventListener("fileload", obj.handleFileComplete);
        preload.addEventListener("progress", obj.handleProgress);
        preload.addEventListener("complete", obj.handleComplete);
        preload.addEventListener("error", obj.handleFileError);

        // ADD MANIFEST FOR MULTIPLE IMAGES

        var manifest = [];

        $('*[data-image]').each(function(){
            var obj = {};
            obj.src = $(this).attr('data-image');
            if($(this).attr('id') !== undefined){
                obj.id = $(this).attr('id');
            }
            else{
                obj.id = obj.src;
            }
            manifest.push(obj);
            console.log('hier: ' + obj.id);
        });
        console.log(manifest);

        // START PRELOAD

        preload.loadManifest(manifest);

        // START THE PROGRESS BAR

        SmoothProgressBar.startProgress();
    };




    return obj;



})();
