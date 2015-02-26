
//
// MnemonicItems.js
//




User = (function(){


    obj.init = function(_userId){


        PartialsLoader.loadPartial('partials/example.html').done(function(data){            
            $('#example').html(data);
            obj.loadUserData();                
        });    
    };




    return obj;



})();  