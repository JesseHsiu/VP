$("#register_confirm_btn").click(function () {


    // console.log($("#User_id").val()+$("#User_sex").val()+$("#User_birth").val()+$("#User_grade").val()+$("#User_place").val());
    app.createUser({
        id : $("#User_id").val(),
        sex : $("#User_sex").val(),
        birth : $("#User_birth").val(),
        grade : $("#User_grade").val(),
        place : $("#User_place").val()

    });

});