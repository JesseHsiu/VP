var FG_Intro_ans= [];
var FG_Intro_choosed_ans = [];
$('#FG_intro').on("pageshow",function(){
	window.plugins.directoryList.getList("www/img/FG/1/que",FG_Intro_onDirectoryReadSuccess,FG_Intro_onDirectoryReadError);
	window.plugins.directoryList.getList("www/img/FG/1/ans",FG_Intro_ans_onDirectoryReadSuccess,FG_Intro_ans_onDirectoryReadError);
});

var FG_Intro_myArray = ['1.png','2.png','3.png','4.png','5.png']
FG_Intro_myArray.sort(function(){ return Math.random()-0.5; }); 

//Question

//Options
$('#FG_Intro_1_img').attr('src', 'img/FG/1/opt/'+FG_Intro_myArray[0]);
$('.FG_Intro_Imgs').attr('data-clickstate', 'false');
$('#FG_Intro_2_img').attr('src', 'img/FG/1/opt/'+FG_Intro_myArray[1]);
$('#FG_Intro_3_img').attr('src', 'img/FG/1/opt/'+FG_Intro_myArray[2]);
$('#FG_Intro_4_img').attr('src', 'img/FG/1/opt/'+FG_Intro_myArray[3]);
$('#FG_Intro_5_img').attr('src', 'img/FG/1/opt/'+FG_Intro_myArray[4]);

$('#FG_intro_1').click(function(){
	console.log("FG_intro_1 clicked " + $('#FG_Intro_1_img').attr('data-clickstate'));
	if($('#FG_Intro_1_img').attr('data-clickstate') === "false")
	{
		console.log("1");
		$('#FG_Intro_1_img').css("background-color","#D2E9FF");
		$('#FG_Intro_1_img').attr('data-clickstate', 'true');
	}
	else
	{
		console.log("2");
		$('#FG_Intro_1_img').css("background-color","");
		$('#FG_Intro_1_img').attr('data-clickstate', 'false');
	}
	FG_Intro_check_option();
});

$('#FG_intro_2').click(function(){
	console.log("FG_intro_2 clicked " + $('#FG_Intro_2_img').attr('data-clickstate'));
	if($('#FG_Intro_2_img').attr('data-clickstate') === "false")
	{
		console.log("1");
		$('#FG_Intro_2_img').css("background-color","#D2E9FF");
		$('#FG_Intro_2_img').attr('data-clickstate', 'true');
	}
	else
	{
		console.log("2");
		$('#FG_Intro_2_img').css("background-color","");
		$('#FG_Intro_2_img').attr('data-clickstate', 'false');
	}
	FG_Intro_check_option();
});
$('#FG_intro_3').click(function(){
	console.log("FG_intro_3 clicked " + $('#FG_Intro_3_img').attr('data-clickstate'));
	if($('#FG_Intro_3_img').attr('data-clickstate') === "false")
	{
		console.log("1");
		$('#FG_Intro_3_img').css("background-color","#D2E9FF");
		$('#FG_Intro_3_img').attr('data-clickstate', 'true');
	}
	else
	{
		console.log("2");
		$('#FG_Intro_3_img').css("background-color","");
		$('#FG_Intro_3_img').attr('data-clickstate', 'false');
	}
	FG_Intro_check_option();
});

$('#FG_intro_4').click(function(){
	console.log("FG_intro_4 clicked " + $('#FG_Intro_4_img').attr('data-clickstate'));
	if($('#FG_Intro_4_img').attr('data-clickstate') === "false")
	{
		console.log("1");
		$('#FG_Intro_4_img').css("background-color","#D2E9FF");
		$('#FG_Intro_4_img').attr('data-clickstate', 'true');
	}
	else
	{
		console.log("2");
		$('#FG_Intro_4_img').css("background-color","");
		$('#FG_Intro_4_img').attr('data-clickstate', 'false');
	}
	FG_Intro_check_option();
});

$('#FG_intro_5').click(function(){
	console.log("FG_intro_5 clicked " + $('#FG_Intro_5_img').attr('data-clickstate'));
	if($('#FG_Intro_5_img').attr('data-clickstate') === "false")
	{
		console.log("1");
		$('#FG_Intro_5_img').css("background-color","#D2E9FF");
		$('#FG_Intro_5_img').attr('data-clickstate', 'true');
	}
	else
	{
		console.log("2");
		$('#FG_Intro_5_img').css("background-color","");
		$('#FG_Intro_5_img').attr('data-clickstate', 'false');
	}
	FG_Intro_check_option();
});

function FG_Intro_check_option () {
	// body...
	//console.log(element.src.slice(-5,-4));
	FG_Intro_choosed_ans.length = 0;
	$.each($(".FG_Intro_Imgs") , function (i, l) {
		if($(this).attr("data-clickstate") === "true")
		{
			FG_Intro_choosed_ans.push($(this).attr("src").slice(-5,-4));
		}		
	});
	FG_Intro_choosed_ans = FG_Intro_choosed_ans.sort();

	var is_same = FG_Intro_choosed_ans.length == FG_Intro_ans.length && FG_Intro_choosed_ans.every(function(element, index) {
		    return element === FG_Intro_ans[index]; 
		});

	console.log(FG_Intro_choosed_ans);
	console.log(FG_Intro_ans);

//element.src.slice(-5,-4) == FG_Intro_ans.slice(-5,-4)
	if (is_same)
	{
		console.log("same");
		document.getElementById("FG_Intro_right").style.display="block";
		document.getElementById("FG_Intro_Next").style.display="block";
		document.getElementById("FG_Intro_wrong").style.display="none";
	}
	else
	{
		console.log("not same");
		document.getElementById("FG_Intro_right").style.display="none";
		document.getElementById("FG_Intro_Next").style.display="none";
		document.getElementById("FG_Intro_wrong").style.display="block";
	}
}


function FG_Intro_onDirectoryReadSuccess(directoryList) {
    // console.log('img/FG/1/que/'+directoryList[0]);
    $('#FG_Intro_Q_img').attr('src', 'img/FG/1/que/0.png');
}

// onError Callback if directory does not exists or it is empty
//
function FG_Intro_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}
function FG_Intro_ans_onDirectoryReadSuccess (directoryList) {
	FG_Intro_ans =  directoryList;
	

	$.each(FG_Intro_ans, function( index, value ) {
	  FG_Intro_ans[index] = value.slice(-5,-4);
	});
}

function FG_Intro_ans_onDirectoryReadError (error) {
	alert('Directory Read error \n' + 'message: ' + error);
}
