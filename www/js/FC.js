// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);

var FC_Answer;
var FC_time = new Date();
var FC_starttime;
$("#FC_Confirm_btn").css('display','none');

$('#FC').on("pageshow",function(){
	if (app.now_testname !="FC")
	{
		app.VP_list.FC.score=0;
		app.VP_list.FC.time=0;
		app.now_q=1;
		app.now_testname="FC";
	}
	else
	{
		if (app.now_q!=1)
		{
			app.now_q--;
		};
	}
	
	app.addHiddenBack();
	app.CreateFile("FC");
	FC_next_Qusetion();
});

var FC_myArray = ['1.png','2.png','3.png','4.png'];

function FC_next_Qusetion() {

	if (app.now_q==16)
	{
		app.VP_list.FC.time = app.VP_list.FC.time/(app.now_q-1);
		app.Tests_finished.FC = true;
		// $.mobile.changePage("Section_endPage.html", "slideup");
		$.mobile.pageContainer.pagecontainer('change', "Section_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		$("#FC_Confirm_btn").css('display','none');
		$('#FC_Option').css('display','none');
		FC_starttime = FC_time.getTime();
		window.plugins.directoryList.getList("www/img/FC/"+app.now_q+"/que",FC_onDirectoryReadSuccess,FC_onDirectoryReadError);
		window.plugins.directoryList.getList("www/img/FC/"+app.now_q+"/ans",FC_ans_onDirectoryReadSuccess,FC_ans_onDirectoryReadError)
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
	FC_time= new Date();
	var Time_tmp = FC_time.getTime() - FC_starttime;

	app.thingstowrite = (FC_Answer === element.src.slice(-5,-4)) +"," + Time_tmp + "," + element.src.slice(-5,-4)+"\n";


	if ((FC_Answer === element.src.slice(-5,-4)))
	{
		app.VP_list.FC.score++;

	}
	app.VP_list.FC.time = app.VP_list.FC.time + Time_tmp;


	app.WriteFile();
	app.now_q++;
	FC_next_Qusetion();
	//$("#FC_Confirm_btn").css('display','block');
}

function FC_onDirectoryReadSuccess(directoryList) {
    $('#FC_Q_img').attr('src', 'img/FC/'+app.now_q.toString()+'/que/'+directoryList[0]);
	$('#FC_1_img').attr('src', 'img/FC/'+app.now_q.toString()+'/opt/'+FC_myArray[0]);
	$('#FC_2_img').attr('src', 'img/FC/'+app.now_q.toString()+'/opt/'+FC_myArray[1]);
	$('#FC_3_img').attr('src', 'img/FC/'+app.now_q.toString()+'/opt/'+FC_myArray[2]);
	$('#FC_4_img').attr('src', 'img/FC/'+app.now_q.toString()+'/opt/'+FC_myArray[3]);

	//disapear	
	FC_myArray.sort(function(){ return Math.random()-0.5; }); 
}

// onError Callback if directory does not exists or it is empty
//
function FC_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}

function FC_ans_onDirectoryReadSuccess (directoryList) {
	// body...
	console.log('img/FC/'+app.now_q.toString()+'/ans/'+directoryList[0]);
	FC_Answer = directoryList[0].slice(-5,-4);
}

function FC_ans_onDirectoryReadError (error) {
	// body...
	alert('Directory Read error \n' + 'message: ' + error);
}