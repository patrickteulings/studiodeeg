

// SOCIALS

Socials = (function(){

    
    var obj = {};




    obj.init = function(){
        $('.facebookShare').on('click',function(){
            obj.shareOnFacebook($(this).attr('data-facebooklink'));
        });
        $('.twitterShare').on('click',function(){
            obj.shareOnTwitter($(this).attr('data-twitterlink'));
        });        
    };


    //
    // TWITTER
    //

    obj.shareOnTwitter = function(_url){


        var title  = escape("example");

        // OPEN AND CENTER TWITTER DIALOGUE

        window.open('http://twitter.com/share?url=' + _url + '&text=' + title + '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

    };


    //
    // FACEBOOK
    //


    obj.shareOnFacebook = function(_url){
        


        FB.ui({
            method: 'feed',
            name: 'This is the content of the "name" field.',
            link: _url,
            picture: 'http://www.groupstudy.in/img/logo3.jpeg',
            caption: 'example',
            description: 'De omschrijving van het example',
            message: ''
        });
    };


    return obj;


})();