var PartialsLoader = (function () {

    function loadPartial(_html){
        var getting = $.get( _html, function( data ) {});
        return getting;
    }

    return {
        loadPartial: loadPartial
    };

})();