// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);
var VC_Answer;
var VC_time = new Date();
var VC_starttime;
$("#VC_Confirm_btn").css('display','none');

$('#VC').on("pageshow",function(){
	if (app.now_testname !="VC")
	{
		app.now_q=1;
		app.now_testname="VC";
	}
	else
	{
		app.now_q--;
	}
	app.addHiddenBack();
	app.CreateFile("VC");
	VC_next_Qusetion();
});

// var Q_array = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];

var VC_myArray = ['1.png','2.png','3.png','4.png']

// console.log(myArray);



function VC_next_Qusetion() {

	if (app.now_q==16)
	{
		app.Tests_finished.VC = true;
		// $.mobile.changePage("Section_endPage.html", "slideup");
		$.mobile.pageContainer.pagecontainer('change', "Section_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		$("#VC_Confirm_btn").css('display','none');
		$('#VC_Option').css('display','none');
		VC_starttime = VC_time.getTime();
		window.plugins.directoryList.getList("www/img/VC/"+app.now_q+"/que",VC_onDirectoryReadSuccess,VC_onDirectoryReadError);
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

	VC_time= new Date();
	var Time_tmp = VC_time.getTime() - VC_starttime;
	app.thingstowrite = (VC_Answer === element.src.slice(-5,-4)) +"," + Time_tmp + "," + element.src.slice(-5,-4)+"\n";
	app.WriteFile();

	VC_next_Qusetion();
	// $("#VC_Confirm_btn").css('display','block');
}

function VC_onDirectoryReadSuccess(directoryList) {
	VC_Answer = directoryList[0].slice(-5,-4);
    console.log('img/VC/'+app.now_q.toString()+'/ans/'+directoryList[0])
    $('#VC_Q_img').attr('src', 'img/VC/'+app.now_q.toString()+'/que/'+directoryList[0]);
	$('#VC_1_img').attr('src', 'img/VC/'+app.now_q.toString()+'/opt/'+VC_myArray[0]);
	$('#VC_2_img').attr('src', 'img/VC/'+app.now_q.toString()+'/opt/'+VC_myArray[1]);
	$('#VC_3_img').attr('src', 'img/VC/'+app.now_q.toString()+'/opt/'+VC_myArray[2]);
	$('#VC_4_img').attr('src', 'img/VC/'+app.now_q.toString()+'/opt/'+VC_myArray[3]);
	
	//add number
	console.log(app.now_q);
	app.now_q++;

	//disapear
	
	VC_myArray.sort(function(){ return Math.random()-0.5; }); 
}

// onError Callback if directory does not exists or it is empty
//
function VC_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}