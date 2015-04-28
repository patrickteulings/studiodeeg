

// SWITHCING TO HISTORY.JS

var State = History.getState();
var path;

console.log('history init', State.data, State.title, State.url);


path = State.url.split('/');

path.splice(0,3); // REMOVES HTTP and DOMAINNAME FROM PATH

console.log('path: ' + path.length);

buildPage();

if(path.length === 1){
    History.pushState({state:1,rand:Math.random()}, "home", '/home');
}

History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
    
    // Log the State
    var State = History.getState(); // Note: We are using History.getState() instead of event.state
    console.log('history');
    console.log(State.data);
    console.log(State.title);
    console.log(State.url);
    console.log('------------------');


    path = State.url.split('/');
    
    path.splice(0,3); // REMOVES HTTP and DOMAINNAME FROM PATH
    
    buildPage();
    //  *************************************************************** //
    //                                                                  
    // INIT OUR MODULES BASED ON OUR ROUTE
    //                                                                  
    //  **************************************************************  //    




});

function buildPage(){
    if(path[0] === 'werk'){
        Work.init(path);
    }

    if(path[0] === 'home'){
        Home.init(path);
    }
}



//setTimeout(function(){
//    History.pushState({state:1,rand:Math.random()}, "Uno", "/dist/werk/jan-koen-lomans/");
//},3000);
