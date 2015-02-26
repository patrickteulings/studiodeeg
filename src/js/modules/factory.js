

var categories = {};

var latest = [];
latest[0] = {id:'1234321',title:'Paris je t\'aime',content:'de zaanse schans schranst',author:'jelle broekhuizen',likes:0,category:'french',categoryTitle:'Frans'};
latest[1] = {id:'1234322',title:'Tweede item',content:'de zaanse<br><br>schans schranst',author:'jelle broekhuizen',likes:20,category:'dutch',categoryTitle:'Nederlands'};
latest[2] = {id:'1234323',title:'Derde item met een lange titel',content:'de Uber<br><br>schans schranst<br>',author:'jelle broekhuizen',likes:20,category:'dutch',categoryTitle:'Nederlands'};


var popular = [];
popular[0] = {id:'1234321',title:'Super populair',content:'de zaanse schans schranst',author:'jelle broekhuizen',likes:0,category:'french',categoryTitle:'Frans'};
popular[1] = {id:'1234322',title:'Mega populair',content:'de zaanse<br><br>schans schranst',author:'jelle broekhuizen',likes:20,category:'dutch',categoryTitle:'Nederlands'};
popular[2] = {id:'1234323',title:'Heel coolr',content:'de Uber<br><br>schans schranst<br>',author:'jelle broekhuizen',likes:20,category:'dutch',categoryTitle:'Nederlands'};
popular[3] = {id:'1234324',title:'Super populair',content:'de zaanse schans schranst',author:'jelle broekhuizen',likes:0,category:'french',categoryTitle:'Frans'};
popular[4] = {id:'1234325',title:'Mega populair',content:'de zaanse<br><br>schans schranst',author:'jelle broekhuizen',likes:20,category:'dutch',categoryTitle:'Nederlands'};
popular[5] = {id:'1234326',title:'Heel coolr',content:'de Uber<br><br>schans schranst<br>',author:'jelle broekhuizen',likes:20,category:'dutch',categoryTitle:'Nederlands'};


var dutch = [];
dutch[0] = {id:'1234321',title:'Eerste item',content:'de zaanse schans schranst',author:'jelle broekhuizen',likes:0,category:'dutch',categoryTitle:'Nederlands'};
dutch[1] = {id:'1234322',title:'Tweede item',content:'de zaanse<br><br>schans schranst',author:'jelle broekhuizen',likes:20,category:'dutch',categoryTitle:'Nederlands'};
dutch[2] = {id:'1234323',title:'Derde item met een lange titel',content:'de Uber<br><br>schans schranst<br>',author:'jelle broekhuizen',likes:20,category:'dutch',categoryTitle:'Nederlands'};

var geography = [];
geography[0] = {id:'1234321',title:'Eerste item',content:'de zaanse schans schranst',author:'jelle broekhuizen',likes:0,category:'geography',categoryTitle:'Aardrijkskunde'};
geography[1] = {id:'1234322',title:'Tweede item',content:'de zaanse<br><br>schans schranst',author:'jelle broekhuizen',likes:20,category:'geography',categoryTitle:'Aardrijkskunde'};
geography[2] = {id:'1234323',title:'Derde item met een lange titel',content:'de Uber<br><br>schans schranst<br>',author:'jelle broekhuizen',likes:20,category:'geography',categoryTitle:'Aardrijkskunde'};



Factory= (function(){

    var obj = {};
    var categoriesLoaded = false;


    obj.get = function(_category){
        if(_category === 'latest'){
            return latest;
        }        
        if(_category === 'dutch'){
            return dutch;
        }
        if(_category === 'geography'){
            return geography;
        }
        if(_category === 'popular'){
            return popular;
        }

    };


    obj.getCategories = function(_callback){        
        if(Utilities.isEmptyObject(categories)) return false;
        return categories;
    };

    obj.setCategories = function(_categories){        
        categories = _categories;
    };    

    obj.loadCategories = function(_url){                
        var categoryListPost = $.ajax({ url: "data/categories.json" });
        return categoryListPost;
    };

    obj.loadMnemonics = function(_category){        
        var mnemonicPost = $.ajax({ url: "data/" + _category + ".json" });
        return mnemonicPost;
    };

    obj.loadUser = function(_username){
        var userPost = $.ajax({ url: "data/" + _username + ".json" });
        return userPost;
    };    


    //
    // ADD MNEMNOIC TO USER FAVOURITES IF LOGGED IN, OR SIMPLY ADD A 'LIKE' WHEN LOGGED OUT
    //


    obj.addAsFavourite = function(_elementID,_favourite){
        var postData = {};
        postData.id = _elementID;
        postData.favourite = _favourite;
        var addFavourite = $.ajax({ url: "data/categories.json", data: postData });
        return addFavourite;
    };



    return obj;


})();