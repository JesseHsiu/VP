var tmp_DirList;
var FC_Intro_ans;
$(document).on("pageshow","#FC_intro",function(){
	window.plugins.directoryList.getList("www/img/FC/1/que",FC_Intro_onDirectoryReadSuccess,FC_Intro_onDirectoryReadError);
	window.plugins.directoryList.getList("www/img/FC/1/ans",FC_Intro_ans_onDirectoryReadSuccess,FC_Intro_ans_onDirectoryReadError);
});

// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);

var FC_Intro_myArray = ['1.png','2.png','3.png','4.png']
FC_Intro_myArray.sort(function(){ return Math.random()-0.5; }); 

//Question

//Options
$('#FC_Intro_1_img').attr('src', 'img/FC/1/opt/'+FC_Intro_myArray[0]);
$('#FC_Intro_2_img').attr('src', 'img/FC/1/opt/'+FC_Intro_myArray[1]);
$('#FC_Intro_3_img').attr('src', 'img/FC/1/opt/'+FC_Intro_myArray[2]);
$('#FC_Intro_4_img').attr('src', 'img/FC/1/opt/'+FC_Intro_myArray[3]);



$('#FC_Intro_1').on( "click", function() {
	FC_Intro_check_option(document.getElementById("FC_Intro_1_img"));
});
$('#FC_Intro_2').on( "click", function() {
	FC_Intro_check_option(document.getElementById("FC_Intro_2_img"));
});
$('#FC_Intro_3').on( "click", function() {
	FC_Intro_check_option(document.getElementById("FC_Intro_3_img"));
});
$('#FC_Intro_4').on( "click", function() {
	FC_Intro_check_option(document.getElementById("FC_Intro_4_img"));
});

function FC_Intro_check_option (element) {
	// body...
	console.log(element.src.slice(-5,-4));

	if (element.src.slice(-5,-4) == FC_Intro_ans.slice(-5,-4))
	{
		// $('#VP_1_intro_right').addClass('animated bounceOutLeft');
		document.getElementById("FC_Intro_right").style.display="block";
		document.getElementById("FC_Intro_Next").style.display="block";
		document.getElementById("FC_Intro_wrong").style.display="none";
	}
	else
	{
		document.getElementById("FC_Intro_right").style.display="none";
		document.getElementById("FC_Intro_Next").style.display="none";
		document.getElementById("FC_Intro_wrong").style.display="block";
	}
}


function FC_Intro_onDirectoryReadSuccess(directoryList) {
    console.log(directoryList)
    $('#FC_Intro_Q_img').attr('src', 'img/FC/1/que/'+directoryList[0]);
}

// onError Callback if directory does not exists or it is empty
//
function FC_Intro_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}
function FC_Intro_ans_onDirectoryReadSuccess (directoryList) {
	FC_Intro_ans =  directoryList[0];
}

function FC_Intro_ans_onDirectoryReadError (error) {
	alert('Directory Read error \n' + 'message: ' + error);
}
