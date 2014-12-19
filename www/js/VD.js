// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);
var now_q=1;
next_Qusetion();

// var Q_array = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];

var myArray = ['1.png','2.png','3.png','4.png','5.png']

// console.log(myArray);



function next_Qusetion() {
	if (now_q==16)
	{
		// $.mobile.changePage("Section_endPage.html", "slideup");
		$.mobile.pageContainer.pagecontainer('change', "Section_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		$("#VP_1_Confirm_btn").css('display','none');
		// console.log("123");//now_q.toString()
		//Question
		$('#VP_1_Q_img').attr('src', 'img/VD/'+now_q.toString()+'/ans/0.png');
		$('#VP_1_1_img').attr('src', 'img/VD/'+now_q.toString()+'/opt/'+myArray[0]);
		$('#VP_1_2_img').attr('src', 'img/VD/'+now_q.toString()+'/opt/'+myArray[1]);
		$('#VP_1_3_img').attr('src', 'img/VD/'+now_q.toString()+'/opt/'+myArray[2]);
		$('#VP_1_4_img').attr('src', 'img/VD/'+now_q.toString()+'/opt/'+myArray[3]);
		$('#VP_1_5_img').attr('src', 'img/VD/'+now_q.toString()+'/opt/'+myArray[4]);
		//add number
		console.log(now_q);
		now_q++;

		//disapear
		
		myArray.sort(function(){ return Math.random()-0.5; }); 
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

$('#VP_1_Confirm_btn').on("click", function() {
	next_Qusetion();
	// document.getElementById("VP_Confirm_btn").style.display="none";
});

//$("#id").css('display','block'); 

function VP_check_option (element) {
	// body...
	console.log(element.src.slice(-5,-4));
	// $("#VP_1_Next").css('display','block');
	// $("#VP_Confirm_btn").css('display','block');
	$("#VP_1_Confirm_btn").css('display','block');
	// document.getElementById("VP_Confirm_btn").style.display="block";
	// $("#VP_Confirm_btn").css('display','block');
	// if (element.src.slice(-5,-4) == '1')
	// {
	// 	// $('#VP_1_intro_right').addClass('animated bounceOutLeft');
		
	// }
	// else
	// {
	// 	document.getElementById("VP_1_Next").style.display="none";
	// }
}