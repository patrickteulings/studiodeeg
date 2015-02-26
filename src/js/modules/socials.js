

// SOCIALS

Socials = (function(){

    // AIzaSyBx-Su80zi4ySOQNi2QBYggIMfOdvH7mog

    var obj = {};



    obj.getShortUrl = function(_data,_callback){
        var requestData = _data;

        var request = gapi.client.urlshortener.url.insert({
            'resource': {
                'longUrl': requestData.longURL
            }
        });

        request.execute(function(response){

            if(response.id !== null){
                requestData.shortURL = response.id;                
                _callback(requestData);
            } 
            else{
                // FAILED, USE UNSHORTENED URL
                requestData.shortURL = requestData.longURL;                
                _callback(requestData);
            }
        });

    };


    function initShortner() {
        gapi.client.setApiKey('AIzaSyBx-Su80zi4ySOQNi2QBYggIMfOdvH7mog');
        gapi.client.load('urlshortener', 'v1').then(function(){});
    }

    setTimeout(function(){
        initShortner();
    },2000);



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

    obj.shareOnTwitter = function(_data){

        var shareData = _data;
        shareData.longURL = 'http://ezelsbruggetje.nl/' + shareData.id;

        // GET THE SHORT URL
        
        if(_data.shortURL === undefined){
            obj.getShortUrl(shareData, obj.shareOnTwitter);    
            return;
        }
  
        // WE GET THE TITLE OF THE LINK

        var title  = escape("beschrijving bruggetje");

        // OPEN AND CENTER TWITTER DIALOGUE

        window.open('http://twitter.com/share?url=' + _data.shortURL + '&text=' + title + '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

    };


    //
    // FACEBOOK
    //


    obj.shareOnFacebook = function(_data){
        
        var shareData = _data;
        shareData.longURL = 'http://ezelsbruggetje.nl/' + shareData.id;

        // GET THE SHORT URL
        
        if(_data.shortURL === undefined){
            obj.getShortUrl(shareData, obj.shareOnFacebook);    
            return;
        }


        FB.ui({
            method: 'feed',
            name: 'This is the content of the "name" field.',
            link: shareData.shortURL,
            picture: 'http://www.groupstudy.in/img/logo3.jpeg',
            caption: 'Ezelsbruggetje.nl',
            description: 'De omschrijving van het bruggetje',
            message: ''
        });
    };


    return obj;


})();