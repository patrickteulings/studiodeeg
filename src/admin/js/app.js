$(document).ready(function() {

    $.delete = function(url, data, callback, type){

        if ( $.isFunction(data) ){
            type = type || callback,
                callback = data,
                data = {}
        }

        return $.ajax({
            url: url,
            type: 'DELETE',
            success: callback,
            data: data,
            contentType: type
        });
    }

    App = (function () {
        var obj = {};

        obj.init = function () {
            $("#side-menu").metisMenu();

            $(".fade").fadeTo(2000, 300).slideUp(300, function(){
                $("alert-success").alert('close');
            });

            obj.initMnemonic();
        },

        obj.initMnemonic = function() {

            //delete mnemonic
            $('#btn-delete-mnemonic').confirm({
                text: 'Weet je zeker dat je dit ezelsbruggetje wilt verwijderen?',
                title: 'Verwijderen ezelsbruggetje',
                confirm: function(button) {
                    $.delete($(this).attr('href'), {"id": $(this).attr('data-id')}, function(data) {
                        if (data.status) {
                            location.href = $('#btn-delete-mnemonic').attr('data-redirect') + '?message=Ezelsbruggetje is verwijderd';
                        }
                    })
                },
                confirmButton: "Ja, verwijder",
                cancelButton: "Annuleer"
            });

            $("#search").on("submit", function( event ) {
                event.preventDefault();
                location.href = $(this).attr("action") + "?" + $( this ).serialize();
            });
        }

        obj.init();
        return obj;
    })();
});