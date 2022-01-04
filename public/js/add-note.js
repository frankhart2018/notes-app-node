$(document).ready(() => {

    $("#add-note").click(() => {
        let data = {
            "note": ["empty"],
        };
        validate_and_post("/add-note", data, swal_ajax_post_redirect)
    });

});