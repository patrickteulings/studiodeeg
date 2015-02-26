
//
// LOCALSTORAGE.JS
//

Localstorage = (function(){

    var obj = {};
    obj.pblc = {};
    var nrVisits;    


    obj.init = function(){
    
        nrVisits = Number(localStorage.getItem('numberOfVisits'));
    
        if(isNaN(nrVisits)){
            nrVisits = 0;        
        }

    };

    // STORE THE NUMBER OF TIMES SOMEONE HAS VISITED THE SITE

    obj.addVisit = function(){        
        nrVisits += 1;
        localStorage.setItem("numberOfVisits", nrVisits);
    };

    // RETURN THE NUMBER OF TIMES SOMEONE HAS VISITED THE SITE

    obj.getNumberOfVisits = function(){        
        return nrVisits;
    };


    obj.init();

    return obj;

})();    