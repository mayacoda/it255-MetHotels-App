(function($) {

    $('#from_date').datepicker({
        format: "dd.mm.yyyy"
    });

    $('#to_date').datepicker({
        format: "dd.mm.yyyy"
    });


    var $hotelSelect = $('#hotel_select');
    $($('.hotel-images')[parseInt($hotelSelect.val()) - 1]).show();
    
    $hotelSelect.on('change', function(e) {
        $('.hotel-images').hide();
        $($('.hotel-images')[parseInt(e.target.value) - 1]).show();
    });


    $('body').on('destroy', function() {
        $('#hotel_select').off('change');
    });


})(window.jQuery);