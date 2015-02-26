
//
//  FACTORY.JS
//


Factory= (function(){

    var obj = {};

    obj.example = function(_username){
        var examplePost = $.ajax({ url: "data/" + _username + ".json" });
        return examplePost;
    };    





    return obj;


})();