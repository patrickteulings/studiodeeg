
//
// MnemonicItems.js
//




User = (function(){


    var obj = {};
    var partialsLoader;
    var userId;
    var userData = {};
    var loggedIn = true;

    obj.init = function(_userId){
        userId = _userId;

        if(Utilities.laravalBuild === true){
            $('#profileMenu .editIcon').on('click',function(){
                obj.initUserEdit();
            });
        }

        PartialsLoader.loadPartial('partials/profilemenu.html').done(function(data){            
            $('#fixedSidebar .view').html(data);
            obj.loadUserData();                
        });    
    };


    //
    // LOAD USER DATA
    //


    obj.loadUserData = function(){
        Factory.loadUser(userId).done(function(data){            
            userData = data;
            obj.buildProfileTile();
        });

        obj.buildProfileTile();
    };


    //
    // BUILD THE SMALL TILE AND MENU
    //


    obj.buildProfileTile = function(){        
        $('#profileMenu .name').html(userData.user.name);
        $('#profileMenu .profileImageContainer').append('<img class="customImage" src="images/' + userData.user.profilepicture + '">');
        
        // Add custom links to menu

        $('#favoritesLink').attr('href','#!/profiel/' + userData.user.name + '/favorieten');
        $('#mineLink').attr('href','#!/profiel/' + userData.user.name + '/mijn-ezelsbruggetjes');
        $('#likesLink').attr('href','#!/profiel/' + userData.user.name + '/likes');

        $('#profileMenu .editIcon').on('click',function(){
            obj.initUserEdit();
        });
    };


    //
    //  SHOW USER MNEMONICS
    //


    obj.showUserMnemonics = function(_path){
        obj.setActiveItem(_path);
        
        if(_path != 'likes'){
            $('#mnemonicContainer').html('');
        }
        
        // CHECK TO SEE IS WE HAVE DATA YET, OTHERWISE LOOP
        
        if(Utilities.isEmptyObject(userData)){
            setTimeout(function(){
                obj.showUserMnemonics(_path);
            });
            return false;
        }


        // GET TEMPLATE AND SHOW

        var item;        

        if(_path === 'favorieten'){

            $.each(userData.user.favorites,function(index,value){
                item = Templates.get({type:'mnemonic',data:value});
                $('#mnemonicContainer').append(item);
            });

        }
        if(_path === 'mijn-ezelsbruggetjes'){

            $.each(userData.user.mnemonics,function(index,value){
                item = Templates.get({type:'mnemonic',data:value});
                $('#mnemonicContainer').append(item);
            });

            // HIDE FAVORITES BUTTON, SINCE THEY ARE THE USERS OWN MNEMONICS
            $('#mnemonicContainer .favoriteButton').addClass('hidden');
        }


    };


    //
    //  ACTIVE USER MENU ITEM
    //


    obj.setActiveItem = function(_path){
        
        $('#profileMenu li').removeClass('active');
        if(_path === 'favorieten') $('.favorites').addClass('active');
        if(_path === 'mijn-ezelsbruggetjes') $('.mine').addClass('active');
        if(_path === 'likes') $('.likes').addClass('active');        
    };    



    //
    // ------------------ ALL TPE OF USER-EDIT-PROFILE FUNCTIONS
    //


    obj.initUserEdit = function(){
        
        console.log('initUserEdit');

        PartialsLoader.loadPartial('partials/edit-profile.html').done(function(data){            
            $('#slideNavigationLeft .view').html(data);
            $('#slideNavigationLeft .slideNavigationTitle h3').html('Profiel aanpassen');
            $('#slideNavigationLeft .view').css('background-image','url()');
            obj.addEditEvents();
        });        
    };


    obj.addEditEvents = function(){
        MainNavigation.openLeftHandMenu();

        $('#slideNavigationLeft .profileImageContainer').append('<img class="customImage" src="images/' + userData.user.profilepicture + '">');        

        $('#saveProfileInfo').on('click',function(){
            obj.updateUser();
        });

        $('.editIcon').on('click',function(){
            $('#uploadFile').trigger('click');
        });

        $('#uploadFile').on('change',function(){
            alert($(this).val());
            $('.customImage').attr('src',$(this).val());
        });
    };



    obj.updateUser = function(){
        var userEmail;
        var error = 0;

        if($('#editUserFirstName').val().length < 2){
            $('#editUserFirstName').addClass('error');
            $('.editUserFirstName .errorText').addClass('show');
            error = 1;
        } 

        if($('#editUserEmail').val().length < 2 || !Utilities.isValidEmail($('#editUserEmail').val())){
            $('#editUserEmail').addClass('error');
            $('.editUserEmail .errorText').addClass('show');
            error = 1;
        }

        if($('#editUserPassword').val().length < 2){
            $('#editUserPassword').addClass('error');
            $('.editUserPassword .errorText').addClass('show');
            error = 1;
        }

        if(error === 1){
            return false;
        }
        else{
            alert('make api-call');
        }       

    };     






    //
    //  LOGIN FUNCTIONS
    //

    obj.isLoggedIn = function(){
        return loggedIn;
    };


    return obj;



})();  