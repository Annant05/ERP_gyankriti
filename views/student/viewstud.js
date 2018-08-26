$(function () {

    // CREATE/POST
    $(".view-button").click(function () {
        var $item = $(this).closest("tr")   // Finds the closest row <tr>rs
            .find(".nr")     // Gets a descendant with class="nr"
            .text();         // Retrieves the text within <td>

        var $row = $(this).closest("tr");    // Find the row
        var $rolln = $row.find(".rolln").text(); // Find the text

        console.log("Roll no sent to server using post : " + $rolln);

        // setInterval(300);
        $.ajax({
            url: '/student/show',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({rolln: $rolln}),
            success: function (response) {
                console.log(response.items[0]);
                var $item = response.items[0];
                $(".name_modal").text($item.name + " " + $item.stud_last_name);
            }
        });
    });
});