// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);
var VC_now_q=1;
$("#VC_Confirm_btn").css('display','none');

$('#VC').on("pageshow",function(){
	console.log("pageshow");
	console.log("VC:"+VC_now_q);
	VC_next_Qusetion();
});

// var Q_array = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];

var VC_myArray = ['1.png','2.png','3.png','4.png']

// console.log(myArray);



function VC_next_Qusetion() {

	if (VC_now_q==16)
	{
		// $.mobile.changePage("Section_endPage.html", "slideup");
		$.mobile.pageContainer.pagecontainer('change', "Section_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		$("#VC_Confirm_btn").css('display','none');
		$('#VC_Option').css('display','none');
		window.plugins.directoryList.getList("www/img/VC/"+VC_now_q+"/que",VC_onDirectoryReadSuccess,VC_onDirectoryReadError);
	}
}

// $('button').on("click",function(ele){
// 	$("script[src=""]")
	
		
// })



$('#VC_1').on("click", function() {
	VC_check_option(document.getElementById("VC_1_img"));
});
$('#VC_2').on("click", function() {
	VC_check_option(document.getElementById("VC_2_img"));
});
$('#VC_3').on("click", function() {
	VC_check_option(document.getElementById("VC_3_img"));
});
$('#VC_4').on("click", function() {
	VC_check_option(document.getElementById("VC_4_img"));
});

$('#VC_Confirm_btn').on("click", function() {
	VC_next_Qusetion();
	// document.getElementById("VP_Confirm_btn").style.display="none";
});

//$("#id").css('display','block'); 

function VC_check_option (element) {
	// body...
	console.log(element.src.slice(-5,-4));
	$("#VC_Confirm_btn").css('display','block');
}

function VC_onDirectoryReadSuccess(directoryList) {
    console.log('img/VC/'+VC_now_q.toString()+'/ans/'+directoryList[0])
    $('#VC_Q_img').attr('src', 'img/VC/'+VC_now_q.toString()+'/que/'+directoryList[0]);
	$('#VC_1_img').attr('src', 'img/VC/'+VC_now_q.toString()+'/opt/'+VC_myArray[0]);
	$('#VC_2_img').attr('src', 'img/VC/'+VC_now_q.toString()+'/opt/'+VC_myArray[1]);
	$('#VC_3_img').attr('src', 'img/VC/'+VC_now_q.toString()+'/opt/'+VC_myArray[2]);
	$('#VC_4_img').attr('src', 'img/VC/'+VC_now_q.toString()+'/opt/'+VC_myArray[3]);
	
	//add number
	console.log(VC_now_q);
	VC_now_q++;

	//disapear
	
	VC_myArray.sort(function(){ return Math.random()-0.5; }); 
}

// onError Callback if directory does not exists or it is empty
//
function VC_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}