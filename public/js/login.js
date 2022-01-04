$(document).ready(() => {

    $("#login").click(() => {
        let data = {
            "email": ["empty", "email"],
            "password": ["empty"],
        }
        validate_and_post("/login-user", data, swal_ajax_post_reload);
    });

});