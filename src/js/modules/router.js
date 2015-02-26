
//
// ROUTER.JS
// CONTROLS ALL HASH CHANGES
//

Router = (function(){

    var obj = {};
    

    obj.init = function(){

    };

    obj.update = function(_path){
        
        if(_path.length === 0){            
                        
            // LOAD DEFAULT ITEMS            
            $.address.value('home');                        
        }


        if(_path[0] === 'home'){
            Home.init();
        }

    };



    return obj;

})();


// INITIALIZING THE ROUTER



$.address.init(function(event) {
    if($.address.value() === '/' || $.address.value() === undefined){
    }
}).bind('change', function(event) {    
    Router.update(event.pathNames);
});


