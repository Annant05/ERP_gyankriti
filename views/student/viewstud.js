$(function () {

    // CREATE/POST
    $('#target').click(function (event) {
        // event.preventDefault();
        // alert('inside the js func');
        $.ajax({
            url: '/serverfunc',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({name: "Annant"}),
            success: function (response) {
                console.log(response);
                alert('success' + response.items[0].area.S);
            }
        })
        ;
    });

    // $("#mytable tr").click(function () {
    //     var a = $('td:first', $(this).parents('tr')).text();
    //
    //     $("#debug").text(a);
    //     alert(this.text);
    // });

    // $('table').on('click', '#view-button', function () {
    //     // var rowEl = $(this).closest('tr');
    //     // var id = rowEl.find('.id').text();
    //
    //     alert(rowEl + " " + id);
    //     //
    //     // $.ajax({
    //     //     url: '/products/' + id,
    //     //     method: 'DELETE',
    //     //     contentType: 'application/json',
    //     //     success: function (response) {
    //     //         console.log(response);
    //     //         $('#get-button').click();
    //     //     }
    //     // });
    // });
});