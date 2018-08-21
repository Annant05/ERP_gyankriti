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

    $(".view-button").click(function () {
        var $item = $(this).closest("tr")   // Finds the closest row <tr>
            .find(".nr")     // Gets a descendent with class="nr"
            .text();         // Retrieves the text within <td>

        var $row = $(this).closest("tr");    // Find the row
        var $rolln = $row.find(".rolln").text(); // Find the text

        console.log("Roll no sent to server using post : " + $rolln);

        $(".modal_rollno").text($rolln);

        // Let's test it out
        // alert($rolln);
        // setInterval(300);
        // $.ajax({
        //     url: '/tests/show',
        //     method: 'POST',
        //     contentType: 'application/json',
        //     data: JSON.stringify({rolln: $rolln}),
        //     success: function (response) {
        //         console.log(response.items[0]);
        //     }
        // });

    });

});