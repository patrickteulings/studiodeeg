var PartialsLoader = (function () {

    function loadPartial(_html){
        var getting = $.get( _html, function( data ) {});
        return getting;
    }

    var arg = {};
    arg.filter = {'category_name':'work'};

    $.ajax({url:'http://www.jankoenlomans.com/wp-json/posts',data:arg}).done(function(data)  {
        console.log(data);
    });

    return {
        loadPartial: loadPartial
    };

})();