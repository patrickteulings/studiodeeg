
//
// HOME.js
//




Home = (function(){

    var obj = {};


    obj.init = function(_userId){

        PartialsLoader.loadPartial('partials/home.html').done(function(data){
            $('#view').html(data);
        });
    };


    return obj;



})();
