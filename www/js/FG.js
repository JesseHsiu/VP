var FG_ans= [];
var FG_choosed_ans = [];
var FG_now_Q = 1;

var FG_myArray = ['1.png','2.png','3.png','4.png','5.png']
$('#FG').on("pageshow",function(){
	// window.plugins.directoryList.getList("www/img/FG/1/que",FG_onDirectoryReadSuccess,FG_onDirectoryReadError);
	// window.plugins.directoryList.getList("www/img/FG/1/ans",FG_ans_onDirectoryReadSuccess,FG_ans_onDirectoryReadError);
	FG_next_Qusetion();
});

// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);


function FG_next_Qusetion() {

	if (FG_now_Q==9)
	{
		// $.mobile.changePage("Section_endPage.html", "slideup");
		$.mobile.pageContainer.pagecontainer('change', "Section_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		FG_myArray.sort(function(){ return Math.random()-0.5; });
		$('#FG_Q_img').attr('src', 'img/FG/'+FG_now_Q+'/que/0.png');
		$('#FG_1_img').attr('src', "img/FG/"+FG_now_Q+"/opt/"+FG_myArray[0]);
		$('.FG_Imgs').attr('data-clickstate', 'false');
		$('.FG_Imgs').css("background-color","");
		
		$('#FG_2_img').attr('src', "img/FG/"+FG_now_Q+"/opt/"+FG_myArray[1]);
		$('#FG_3_img').attr('src', "img/FG/"+FG_now_Q+"/opt/"+FG_myArray[2]);
		$('#FG_4_img').attr('src', "img/FG/"+FG_now_Q+"/opt/"+FG_myArray[3]);
		$('#FG_5_img').attr('src', "img/FG/"+FG_now_Q+"/opt/"+FG_myArray[4]);



		$("#FG_Confirm_btn").css('display','none');
		// window.plugins.directoryList.getList("www/img/FG/"+FG_now_Q+"/que",FG_onDirectoryReadSuccess,FG_onDirectoryReadError);
		// window.plugins.directoryList.getList("www/img/FG/"+FG_now_Q+"/que",FG_onDirectoryReadSuccess,FG_onDirectoryReadError);
		window.plugins.directoryList.getList("www/img/FG/"+FG_now_Q+"/ans",FG_ans_onDirectoryReadSuccess,FG_ans_onDirectoryReadError);
		FG_now_Q++;
	}
}


$("#FG_Confirm_btn").click(function () {
	FG_next_Qusetion();
})


$('#FG_1').click(function(){
	console.log("FG_1 clicked " + $('#FG_1_img').attr('data-clickstate'));
	if($('#FG_1_img').attr('data-clickstate') === "false")
	{
		console.log("1");
		$('#FG_1_img').css("background-color","#D2E9FF");
		$('#FG_1_img').attr('data-clickstate', 'true');
	}
	else
	{
		console.log("2");
		$('#FG_1_img').css("background-color","");
		$('#FG_1_img').attr('data-clickstate', 'false');
	}
	FG_check_option();
});

$('#FG_2').click(function(){
	console.log("FG_2 clicked " + $('#FG_2_img').attr('data-clickstate'));
	if($('#FG_2_img').attr('data-clickstate') === "false")
	{
		console.log("1");
		$('#FG_2_img').css("background-color","#D2E9FF");
		$('#FG_2_img').attr('data-clickstate', 'true');
	}
	else
	{
		console.log("2");
		$('#FG_2_img').css("background-color","");
		$('#FG_2_img').attr('data-clickstate', 'false');
	}
	FG_check_option();
});
$('#FG_3').click(function(){
	console.log("FG_3 clicked " + $('#FG_3_img').attr('data-clickstate'));
	if($('#FG_3_img').attr('data-clickstate') === "false")
	{
		console.log("1");
		$('#FG_3_img').css("background-color","#D2E9FF");
		$('#FG_3_img').attr('data-clickstate', 'true');
	}
	else
	{
		console.log("2");
		$('#FG_3_img').css("background-color","");
		$('#FG_3_img').attr('data-clickstate', 'false');
	}
	FG_check_option();
});

$('#FG_4').click(function(){
	console.log("FG_4 clicked " + $('#FG_4_img').attr('data-clickstate'));
	if($('#FG_4_img').attr('data-clickstate') === "false")
	{
		console.log("1");
		$('#FG_4_img').css("background-color","#D2E9FF");
		$('#FG_4_img').attr('data-clickstate', 'true');
	}
	else
	{
		console.log("2");
		$('#FG_4_img').css("background-color","");
		$('#FG_4_img').attr('data-clickstate', 'false');
	}
	FG_check_option();
});

$('#FG_5').click(function(){
	console.log("FG_5 clicked " + $('#FG_5_img').attr('data-clickstate'));
	if($('#FG_5_img').attr('data-clickstate') === "false")
	{
		console.log("1");
		$('#FG_5_img').css("background-color","#D2E9FF");
		$('#FG_5_img').attr('data-clickstate', 'true');
	}
	else
	{
		console.log("2");
		$('#FG_5_img').css("background-color","");
		$('#FG_5_img').attr('data-clickstate', 'false');
	}
	FG_check_option();
});

function FG_check_option () {
	// body...
	//console.log(element.src.slice(-5,-4));
	FG_choosed_ans.length = 0;
	$.each($(".FG_Imgs") , function (i, l) {
		if($(this).attr("data-clickstate") === "true")
		{
			FG_choosed_ans.push($(this).attr("src").slice(-5,-4));
		}		
	});
	$("#FG_Confirm_btn").css("display","block");
	FG_choosed_ans = FG_choosed_ans.sort();

	var is_same = FG_choosed_ans.length == FG_ans.length && FG_choosed_ans.every(function(element, index) {
		    return element === FG_ans[index]; 
		});

	console.log(FG_choosed_ans);
	console.log(FG_ans);

//element.src.slice(-5,-4) == FG_ans.slice(-5,-4)
	if (is_same)
	{
		console.log("same");
	}
	else
	{
		console.log("not same");
	}
}


// function FG_onDirectoryReadSuccess(directoryList) {
//     // console.log('img/FG/1/que/'+directoryList[0]);
//     $('#FG_Q_img').attr('src', 'img/FG/'+FG_now_Q+'/que/0.png');
// }

// onError Callback if directory does not exists or it is empty
//
// function FG_onDirectoryReadError(error) {
//     alert('Directory Read error \n' + 'message: ' + error);
// }
function FG_ans_onDirectoryReadSuccess (directoryList) {
	FG_ans =  directoryList;
	

	$.each(FG_ans, function( index, value ) {
	  FG_ans[index] = value.slice(-5,-4);
	});
}

function FG_ans_onDirectoryReadError (error) {
	alert('Directory Read error \n' + 'message: ' + error);
}
