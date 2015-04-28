var PartialsLoader = (function () {

    function loadPartial(_html){
        var getting = $.get( _html, function( data ) {});
        return getting;
    }

    $.ajax({url:'http://www.jankoenlomans.com/wp-json/posts'}).done(function(data){
        console.log(data);
    });

    return {
        loadPartial: loadPartial
    };

})();