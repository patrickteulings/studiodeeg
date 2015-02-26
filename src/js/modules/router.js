
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
            App.setState('home');
            
            // LOAD DEFAULT ITEMS
            
            $.address.value('categorie/nieuw');
            MnemonicItems.getMnemonics('latest');
            CategoryMenu.setActiveItem('latest');

        }

        //
        //  HOE WERKT HET UITSHUIFMENU
        //

        if(_path[0] === 'hoe-werkt-het'){
            MainNavigation.openLeftHandMenu();
        }


        //
        //  MNEMONICS OVERVIEW - DEFAULT VIEW
        //


        if(_path[0] === 'categorie'){                        
            
            var lc = _path[1].toLowerCase();
            var _category = Utilities.getEnglishCategoryName(lc);
            
            MnemonicItems.getMnemonics(_category);

            if(App.getState() !== 'mnemonics') CategoryMenu.init();            
            
            CategoryMenu.setActiveItem(_category);
            CategorySlideOutMenu.setActiveItem(_category);
            MainNavigation.closeRightHandMenu();

            App.setState('mnemonics');
        }


        //
        //  PROFILE PAGE - DEFAULT TO LOGIN IF NOT LOGGED IN
        //


        if(_path[0] === 'profiel'){

            if(App.getState() !== 'profile') User.init(_path[1]);
            
            if(_path[2] !== undefined){
                User.showUserMnemonics(_path[2]);
                User.setActiveItem(_path[2]);
            }
            else{
                User.showUserMnemonics('favorieten');                
            } 

            App.setState('profile');
        }


        //
        //  ADD MNEMONIC FLOW
        //

        if(_path[0] === 'ezelsbruggetje-toevoegen'){
            AddMnemonic.init();
        }

        if(_path[0] === 'login'){

            LoginFlow.init();
        } 

        //
        //  START LOGIN FLOW
        //


        if(_path[0] === 'login'){

            LoginFlow.init();
        }        
    };



    return obj;

})();


// INITIALIZING THE ROUTER

if(Utilities.laravelBuild === false){ 

$.address.init(function(event) {
    if($.address.value() === '/' || $.address.value() === undefined){
    }
}).bind('change', function(event) {    
    Router.update(event.pathNames);
});
 }

