var FG2_ans= [];
var FG2_choosed_ans = [];
var FG2_time = new Date();
var FG2_starttime;

var FG2_myArray = ['1.png','2.png','3.png','4.png','5.png']
$('#FG2').on("pageshow",function(){

	if (app.now_testname !="FG2")
	{
		app.now_q=1;
		app.now_testname="FG2";
	}
	else
	{
		if (app.now_q!=1)
		{
			app.now_q--;
		};
	}
	app.addHiddenBack();
	app.CreateFile("FG");

	FG2_next_Qusetion();
});

function FG2_next_Qusetion() {

	if (app.now_q==2)
	{
		app.Tests_finished.FG2 = true;
		$.mobile.pageContainer.pagecontainer('change', "Section_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		
		$('#FG2_Q_img').attr('src', 'img/FG/'+(8+app.now_q)+'/FG'+(8+app.now_q)+'-noStars.png');
		$('#FG2_1_img').attr('src', "img/FG/"+(8+app.now_q)+"/FG"+(8+app.now_q)+'-Stars.png');//FG9-Stars

		add_Answers(app.now_q);

		FG2_starttime = FG2_time.getTime();
		$("#FG2_Confirm_btn").css('display','none');
	}
}


$("#FG2_Confirm_btn").click(function () {


	var is_same = FG2_choosed_ans.length == FG2_ans.length && FG2_choosed_ans.every(function(element, index) {
		    return element === FG2_ans[index]; 
		});

	FG2_time= new Date();
	var Time_tmp = FG2_time.getTime() - FG2_starttime;

	app.thingstowrite = (is_same) +"," + Time_tmp + "," + FG2_choosed_ans+"\n";
	app.WriteFile();

	app.now_q++;
	FG2_next_Qusetion();
})

function FG2_check_option () {
	FG2_choosed_ans.length = 0;
	$.each($(".FG2_Imgs") , function (i, l) {
		if($(this).attr("data-clickstate") === "true")
		{
			FG2_choosed_ans.push($(this).attr("src").slice(-5,-4));
		}		
	});
	$("#FG2_Confirm_btn").css("display","block");
}
function add_Answers (now_q) {
	if (now_q == 1)
	{
		for(var i = 0 ; i <5 ; i++)
		{
			$.mobile.activePage.append("<div class='' style='background-image:url(img/FG/9/FG9-Stars.png)' ></div>");

		}
		
	}
	else
	{

	}




}
