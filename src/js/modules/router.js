

// SWITHCING TO HISTORY.JS

var State = History.getState();
var path;

console.log('history init', State.data, State.title, State.url);



History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
    // Log the State
    var State = History.getState(); // Note: We are using History.getState() instead of event.state
    console.log('history');
    console.log(State.data);
    console.log(State.title);
    console.log(State.url);
    //History.log('statechange:', State.data, State.title, State.url);


    path = State.url.split('/').splice(4,5);

    if(path[1] === 'werk'){
        Work.init(path);
    }

});



//setTimeout(function(){
//    History.pushState({state:1,rand:Math.random()}, "Uno", "/dist/werk/jan-koen-lomans/");
//},3000);
