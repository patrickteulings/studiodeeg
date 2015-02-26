//
// TEMPLATES.JS
//

Templates = (function(){

    var obj = {};


    obj.get = function(_obj){        
        var item;
        if(_obj.type === 'mnemonic'){
            item = obj.getMnemonicTemplate(_obj.data);
        }
        
        return item;
    };



    obj.getMnemonicTemplate = function(_data){        
        var suffix = (Utilities.canUseSVG() === true) ? 'svg' : 'png';
        var html = '';

        html += '<div class="item col-sm-6">';
        html += '   <div class="mnemonicItem ' + _data.category + '" id="' + _data.id + '">  ';                          
        html += '       <div class="title"><h4><a href="' + _data.category + '/' + _data.id + '">' + _data.title + '</a></h4></div>';
        html += '       <div class="content">';
        html +=                 _data.content;
        html +=                 _data.author;
        html += '       </div>';
        html += '       <div class="author">';
        html += '           <span><a href="/profiel/' + _data.author + '">';
        html +=                _data.author;
        html += '           </a></span>';
        html += '           <span class=' + ((Number(_data.likes) > 0) ? "likes" : "noLikes") + '>';
        html +=                _data.likes;
        html += '           </span>';
        html += '           <span class=' + ((Number(_data.likes) > 0) ? "likesIcon" : "noLikes") + '>';
        html += '           <img src="images/icon-likes-count.' + suffix + '">';
        html += '           </span>';
        html += '       </div>';
        html += '       <div class="itemFooter">';
        html += '           <a href="#!/categorie/'+_data.categoryTitle+'" class="categoryTitle" title="Toon alle Ezelsbruggetjes over ' + _data.categoryTitle + '"><span class="categoryIcon"><img src="images/icon-mnemonic-default.svg"></span></span>' + _data.categoryTitle + '</span></a>';
        html += '           <a href="javascript:void(0);" class="favoriteButton" title="Voeg toe aan je favorieten"><img src="images/icon-mnemonic-' + ((_data.isFavourite) ? "liked" : "like") + '.svg" alt="Like of voeg toe aan je favorieten"></a>'; 
        html += '           <a href="javascript:void(0);" class="shareButton" title="Deel dit ezelsbruggetje"><img src="images/icon-mnemonic-share.svg" alt="Deel dit ezelsbruggetje"></a>';                               
        html += '       </div>';
        html += '    </div>';
        html += '</div>';

        return html;
        
    };


    // MNEMONIC SHARE OVERLAY 
    obj.getShareOverlay = function(data){
        var suffix = (Utilities.canUseSVG() === true) ? 'svg' : 'png';
        var html = '';

        html += '<div id="shareOverlay">';
        html += '   <div class="inner">';
        html += '<div class="shareOptions">';
        html += '<div class="title">';
        html += 'Delen';
        html += '            <i class="close"><img src="images/icon-close-dark.svg"></i>';
        html += '        </div>';
        html += '       <ul>';
        html += '            <li><a href="#"><span class="icon"><img src="images/icon-share-download.' + suffix + '"></span><span>Afbeelding opslaan</span></a></li>';
        html += '            <li class="facebook-share"><a href="javascript:void(0);"><span class="icon"><img src="images/icon-share-facebook.' + suffix + '"></span><span>Facebook</span></a></li>';
        html += '            <li class="twitter-share"><a href="javascript:void(0);"><span class="icon"><img src="images/icon-share-twitter.' + suffix + '"></span><span>Twitter</span></a></li>';
        html += '            <li><a href="mailto:test@example.com?subject=subject&body=body"><span class="icon"><img src="images/icon-share-mail.' + suffix + '"></span><span>E-mail</span></a></li>';
        html += '            <li><a href="javascript:void(0);" class="copyToClipBoard" data-clipboard-text="http://www.ezelsbruggetje.nl/2234/neplinkje"><span class="icon" ><img src="images/icon-share-clipboard.' + suffix + '"></span><span>Link kopiëren</span></a></li>';
        html += '        </ul>';
        html += '    </div>';
        html += '</div>';
        html += '</div>';


        return html;
    }; 

       // MNEMONIC FAVOURITES ADDED OVERLAY 
    obj.getFavouritedOverlay = function(data){
    
        var html = '';

        html += '<div id="favouriteOverlay">';
        html += '   <div class="inner">';
        html += '   <div class="cell">';        
        html += '       <div class="heart">';
        html += '       <img src="images/icon-mnemonic-liked.svg">';
        html += '        </div>';
        html += '       <div class="caption">';
        html += 'Toegevoegd aan jouw favorieten';
        html += '        </div>';
        html += '    </div>';
        html += '    </div>';
        html += '</div>';

        return html;
    };     

    // MAIN CATEGORY MENU THAT WE SEE ON THE HOMEPAGE, ON OUR LEFT HAND

    obj.getCategoryMenu = function(){
        var html = '';
        var categories = Factory.getCategories();
        
        html += '<ul id="categoryMenu" class="collapsed">';

        $.each(categories.categories,function(index,category){
            html += '<li class=" ' + category.english + ' ' + ((index > 5) ? "hidden" : "") + '">';
            html += '<a href="#!/categorie/' + category.dutch + ' ">';
            html += '<span class="icon">';
            html += '<img src="images/icon-menu-' + category.english + '.svg">';
            html += '</span>';
            html += '<span>';
            html += category.dutch;
            html += '</span>';
            html += '<span class="count">(';
            html += category.amount;
            html += ')</span>';
            html += '</a>';
            html += '</li>';
        });
        html += '   <li id="showAllCategoriesToggle">Toon alle categorieën</li>';    
        html += '   </ul>';

        return html;        
    };


    // CATEGORY MENU THAT APPEARS ON THE RIGHT HAND SLIDE MENU

    obj.getSlideOutCategoryMenu = function(){
        var html = '';
        var categories = Factory.getCategories();
        
        html += '<div class="categoriesContainer">';
        html += '<ul>';

        $.each(categories.categories,function(index,category){
            html += '<li class=" ' + category.english + '" data-category="' + category.english + '">';
            html += '<a href="#!/categorie/' + category.dutch + ' ">';
            html += '<span class="icon">';
            html += '<img src="images/icon-menu-' + category.english + '.svg">';
            html += '</span>';
            html += '<span>';
            html += category.dutch + ' <span class="cnt"> (' + category.amount + ')</span>';
            html += '</span>';
            html += '</a>';
            html += '</li>';
        });           
        html += '   </ul>';
        html += '</div>';
        return html;  
    };

    


    return obj;


})();