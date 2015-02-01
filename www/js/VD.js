var VD_now_q=1;
var VD_Answer;
var VD_time = new Date();
var VD_starttime;


$('#VP_1').on("pageshow",function(){
	app.CreateFile("VD");
	VD_next_Qusetion();
});

var myArray = ['1.png','2.png','3.png','4.png','5.png']

function VD_next_Qusetion() {
	if (VD_now_q==16)
	{
		$.mobile.pageContainer.pagecontainer('change', "Section_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		myArray.sort(function(){ return Math.random()-0.5; }); 
		VD_starttime = VD_time.getTime();
		window.plugins.directoryList.getList("www/img/VD/"+VD_now_q+"/ans",VD_onDirectoryReadSuccess,VD_onDirectoryReadError);

		$("#VP_1_Confirm_btn").css('display','none');
		
		//Question
		$('#VP_1_1_img').attr('src', 'img/VD/'+VD_now_q.toString()+'/opt/'+myArray[0]);
		$('#VP_1_2_img').attr('src', 'img/VD/'+VD_now_q.toString()+'/opt/'+myArray[1]);
		$('#VP_1_3_img').attr('src', 'img/VD/'+VD_now_q.toString()+'/opt/'+myArray[2]);
		$('#VP_1_4_img').attr('src', 'img/VD/'+VD_now_q.toString()+'/opt/'+myArray[3]);
		$('#VP_1_5_img').attr('src', 'img/VD/'+VD_now_q.toString()+'/opt/'+myArray[4]);
	}
}


$('#VP_1_1').on("click", function() {
	VP_check_option(document.getElementById("VP_1_1_img"));
});
$('#VP_1_2').on("click", function() {
	VP_check_option(document.getElementById("VP_1_2_img"));
});
$('#VP_1_3').on("click", function() {
	VP_check_option(document.getElementById("VP_1_3_img"));
});
$('#VP_1_4').on("click", function() {
	VP_check_option(document.getElementById("VP_1_4_img"));
});
$('#VP_1_5').on("click", function() {
	VP_check_option(document.getElementById("VP_1_5_img"));
});

// $('#VP_1_Confirm_btn').on("click", function() {
	
// 	// document.getElementById("VP_Confirm_btn").style.display="none";
// });

function VP_check_option (element) {

	console.log(element.src.slice(-5,-4));

	VD_time= new Date();
	var Time_tmp = VD_time.getTime() - VD_starttime
	app.thingstowrite = (VD_Answer === element.src.slice(-5,-4)) +"," + Time_tmp + "," + element.src.slice(-5,-4)+"\n";
	app.WriteFile();
	VD_next_Qusetion();
}

function VD_onDirectoryReadSuccess (directoryList) {
	VD_Answer = directoryList[0].slice(-5,-4);
	$('#VP_1_Q_img').attr('src', 'img/VD/'+VD_now_q.toString()+'/ans/'+VD_Answer+'.png');

	VD_now_q++;
}

function VD_onDirectoryReadError (error) {

}