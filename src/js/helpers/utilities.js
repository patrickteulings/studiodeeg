//
// UTILITIES.JS
// CONTROLS ALL HASH CHANGES
//

Utilities = (function(){

    var obj = {};

    obj.laravelBuild = true;
    var catNames = [{dutch:'populair',english:'popular'},{dutch:'aardrijkskunde',english:'geography'},{dutch:'nederlands',english:"dutch"},{dutch:'scheikunde',english:"chemistry"},{dutch:'Basisschool',english:"primary"}];
    obj.winWidth = 0;
    var imageSuffix = ($('.svg').length) ? true : false;

    //
    // translates dutch category names to english for DB-communication
    //

    obj.getEnglishCategoryName = function(_dutchName){
        var nm;
        var found = 0;
        $.each(catNames,function(index,value){
            if(value.dutch.toLowerCase() === _dutchName.toLowerCase()){                
                found = 1;
                nm = value.english;
            }
        });

        // RETURN THE DEFAULT 'NEW' CATEGORY IF NOTHING IS FOUND

        return (found === 1) ? nm : 'latest';
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


    // YES - WINDOWS WIDTH
    

    $(window).on('resize',function(){
        obj.winWidth = $(window).width();
    }).resize();

    // CAN WE USE SVG IN OUR JS

    obj.canUseSVG = function(){
        return imageSuffix;
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