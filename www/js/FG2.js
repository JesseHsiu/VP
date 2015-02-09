var FG2_ans= [];
var FG_StarPositionArray = [[220,330],[100,710],[320,500],[400,650],[440,200]];
var FG_TrianglePositionArray = [[170,230],[160,530],[255,420],[325,630],[360,380]];
var FG2_choosed_ans = [];
var FG2_time = new Date();
var FG2_starttime;
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
	app.CreateFile("FG2");

	FG2_next_Qusetion();
});

function FG2_next_Qusetion() {

	if (app.now_q==3)
	{
		app.Tests_finished.FG2 = true;
		$.mobile.pageContainer.pagecontainer('change', "Section_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		if (app.now_q==1)
		{
			$('#FG2_Q_img').attr('src', 'img/FG/'+(8+app.now_q)+'/FG'+(8+app.now_q)+'-noStars.png');
			$('#FG2_1_img').attr('src', "img/FG/"+(8+app.now_q)+"/FG"+(8+app.now_q)+'-Stars.png');//FG9-Stars	
		}
		else
		{
			$('#FG2_Q_img').attr('src', 'img/FG/'+(8+app.now_q)+'/FG'+(8+app.now_q)+'-noTriangle.png');
			$('#FG2_1_img').attr('src', "img/FG/"+(8+app.now_q)+"/FG"+(8+app.now_q)+'-Triangle.png');//FG9-Stars		
		}
		

		add_Answers(app.now_q);

		FG2_starttime = FG2_time.getTime();
		$("#FG2_Confirm_btn").css('display','none');
	}
}


$("#FG2_Confirm_btn").click(function () {

	if (app.now_q ==1)
	{
		var count = 0;
		$.each($(".StarsImg") , function (i, l) {
			if($(this).attr("data-clickstate") === "true")
			{
				count ++;
			}		
		});
		var is_same = false;
		if (count === 5)
		{
			is_same = true;
		}

		FG2_time= new Date();
		var Time_tmp = FG2_time.getTime() - FG2_starttime;

		app.thingstowrite = (is_same) +"," + Time_tmp + "," + count+"\n";
		app.WriteFile();

		$(".StarsImg").remove();
	}
	else
	{
		var count = 0;
		$.each($(".TriangleImg") , function (i, l) {
			if($(this).attr("data-clickstate") === "true")
			{
				count ++;
			}		
		});
		var is_same = false;
		if (count === 5)
		{
			is_same = true;
		}

		FG2_time= new Date();
		var Time_tmp = FG2_time.getTime() - FG2_starttime;

		app.thingstowrite = (is_same) +"," + Time_tmp + "," + count+"\n";
		app.WriteFile();

		$(".TriangleImg").remove();
	}

	

	app.now_q++;
	FG2_next_Qusetion();
});
function add_Answers (now_q) {
	if (now_q == 1)
	{
		for(var i = 0 ; i <5 ; i++)
		{
			$.mobile.activePage.append("<div class='StarsImg' style='background-image:url(img/FG/9/FG9-Stars.png);top:"+FG_StarPositionArray[i][0]+"px;left:"+FG_StarPositionArray[i][1]+"px;' data-clickstate='false' ></div>");

		}

		$(".StarsImg").click(function  () {
			if ($(this).attr("data-clickstate")==="false")
			{
				$(this).attr('data-clickstate', 'true');
				$(this).fadeTo( "slow", 0.33 );
			}
			$("#FG2_Confirm_btn").css("display","block");
		});

		
	}
	else
	{
		for(var i = 0 ; i <5 ; i++)
		{
			$.mobile.activePage.append("<div class='TriangleImg' style='background-image:url(img/FG/10/FG10-Triangle.png);top:"+FG_TrianglePositionArray[i][0]+"px;left:"+FG_TrianglePositionArray[i][1]+"px;' data-clickstate='false'' ></div>");

		}

		$(".TriangleImg").click(function  () {
			if ($(this).attr("data-clickstate")==="false")
			{
				$(this).attr('data-clickstate', 'true');
				$(this).fadeTo( "slow", 0.33 );
			}
			$("#FG2_Confirm_btn").css("display","block");
		});
	}




}
