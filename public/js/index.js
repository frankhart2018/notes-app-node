$(document).ready(() => {
    $("#register").click(() => {
        let data = {
            "name": ["empty"],
            "email": ["empty", "email"],
            "password": ["empty"],
            "cpassword": ["empty"],
        };
        validate_and_post("/register-user", data, swal_ajax_post_reload);
    });
});