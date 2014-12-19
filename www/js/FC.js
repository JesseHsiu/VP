// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);
var FC_now_q=1;
$("#FC_Confirm_btn").css('display','none');

$(document).on("pageshow","#FC",function(){
	FC_next_Qusetion();
});

// var Q_array = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];

var FC_myArray = ['1.png','2.png','3.png','4.png']

// console.log(myArray);



function FC_next_Qusetion() {

	if (FC_now_q==16)
	{
		$.mobile.changePage($("#Section_endPage"), "slideup");
	}
	else
	{
		$("#FC_Confirm_btn").css('display','none');
		$('#FC_Option').css('display','none');
		window.plugins.directoryList.getList("www/img/FC/"+FC_now_q+"/que",FC_onDirectoryReadSuccess,FC_onDirectoryReadError);
	}
}


$('#FC_1').on("click", function() {
	FC_check_option(document.getElementById("FC_1_img"));
});
$('#FC_2').on("click", function() {
	FC_check_option(document.getElementById("FC_2_img"));
});
$('#FC_3').on("click", function() {
	FC_check_option(document.getElementById("FC_3_img"));
});
$('#FC_4').on("click", function() {
	FC_check_option(document.getElementById("FC_4_img"));
});

$('#FC_Confirm_btn').on("click", function() {
	FC_next_Qusetion();
	// document.getElementById("VP_Confirm_btn").style.display="none";
});

//$("#id").css('display','block'); 

function FC_check_option (element) {
	// body...
	console.log(element.src.slice(-5,-4));
	$("#FC_Confirm_btn").css('display','block');
}

function FC_onDirectoryReadSuccess(directoryList) {
    console.log('img/FC/'+FC_now_q.toString()+'/ans/'+directoryList[0])
    $('#FC_Q_img').attr('src', 'img/FC/'+FC_now_q.toString()+'/que/'+directoryList[0]);
	$('#FC_1_img').attr('src', 'img/FC/'+FC_now_q.toString()+'/opt/'+FC_myArray[0]);
	$('#FC_2_img').attr('src', 'img/FC/'+FC_now_q.toString()+'/opt/'+FC_myArray[1]);
	$('#FC_3_img').attr('src', 'img/FC/'+FC_now_q.toString()+'/opt/'+FC_myArray[2]);
	$('#FC_4_img').attr('src', 'img/FC/'+FC_now_q.toString()+'/opt/'+FC_myArray[3]);
	
	//add number
	console.log(FC_now_q);
	FC_now_q++;

	//disapear
	
	FC_myArray.sort(function(){ return Math.random()-0.5; }); 
}

// onError Callback if directory does not exists or it is empty
//
function FC_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}