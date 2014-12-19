
var VC_Intro_ans;
$('#VC_intro').on("pageshow",function(){
	window.plugins.directoryList.getList("www/img/VC/1/que",VC_Intro_onDirectoryReadSuccess,VC_Intro_onDirectoryReadError);
	window.plugins.directoryList.getList("www/img/VC/1/ans",VC_Intro_ans_onDirectoryReadSuccess,VC_Intro_ans_onDirectoryReadError);
});

// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);

var VC_Intro_myArray = ['1.png','2.png','3.png','4.png']
VC_Intro_myArray.sort(function(){ return Math.random()-0.5; }); 

//Question

//Options
$('#VC_Intro_1_img').attr('src', 'img/VC/1/opt/'+VC_Intro_myArray[0]);
$('#VC_Intro_2_img').attr('src', 'img/VC/1/opt/'+VC_Intro_myArray[1]);
$('#VC_Intro_3_img').attr('src', 'img/VC/1/opt/'+VC_Intro_myArray[2]);
$('#VC_Intro_4_img').attr('src', 'img/VC/1/opt/'+VC_Intro_myArray[3]);



$('#VC_Intro_1').on( "click", function() {
	VC_Intro_check_option(document.getElementById("VC_Intro_1_img"));
});
$('#VC_Intro_2').on( "click", function() {
	VC_Intro_check_option(document.getElementById("VC_Intro_2_img"));
});
$('#VC_Intro_3').on( "click", function() {
	VC_Intro_check_option(document.getElementById("VC_Intro_3_img"));
});
$('#VC_Intro_4').on( "click", function() {
	VC_Intro_check_option(document.getElementById("VC_Intro_4_img"));
});

function VC_Intro_check_option (element) {
	// body...
	console.log(element.src.slice(-5,-4));

	if (element.src.slice(-5,-4) == VC_Intro_ans.slice(-5,-4))
	{
		// $('#VP_1_intro_right').addClass('animated bounceOutLeft');
		document.getElementById("VC_Intro_right").style.display="block";
		document.getElementById("VC_Intro_Next").style.display="block";
		document.getElementById("VC_Intro_wrong").style.display="none";
	}
	else
	{
		document.getElementById("VC_Intro_right").style.display="none";
		document.getElementById("VC_Intro_Next").style.display="none";
		document.getElementById("VC_Intro_wrong").style.display="block";
	}
}


function VC_Intro_onDirectoryReadSuccess(directoryList) {
    console.log(directoryList)
    $('#VC_Intro_Q_img').attr('src', 'img/VC/1/que/'+directoryList[0]);
}

// onError Callback if directory does not exists or it is empty
//
function VC_Intro_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}
function VC_Intro_ans_onDirectoryReadSuccess (directoryList) {
	VC_Intro_ans =  directoryList[0];
}

function VC_Intro_ans_onDirectoryReadError (error) {
	alert('Directory Read error \n' + 'message: ' + error);
}
