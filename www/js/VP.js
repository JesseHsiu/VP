// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);

next_Qusetion();
var now_q=1;
var Q_array = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];

var myArray = ['1.png','2.png','3.png','4.png','5.png']
myArray.sort(function(){ return Math.random()-0.5; }); 
// console.log(myArray);



function next_Qusetion () {
	console.log("123");
	//Question
	$('#Q_img').attr('src', 'img/VD/'+'1'+'/ans/0.png');
	//Options
	$('#1_img').attr('src', 'img/VD/'+'1'+'/opt/'+myArray[0]);
	$('#2_img').attr('src', 'img/VD/'+'1'+'/opt/'+myArray[1]);
	$('#3_img').attr('src', 'img/VD/'+'1'+'/opt/'+myArray[2]);
	$('#4_img').attr('src', 'img/VD/'+'1'+'/opt/'+myArray[3]);
	$('#5_img').attr('src', 'img/VD/'+'1'+'/opt/'+myArray[4]);
	//add number
	now_q++;

	//disapear
	$("#Confirm_btn").css('display','none');
}


$('#1').on( "click", function() {
	check_option(document.getElementById("1_img"));
});
$('#2').on( "click", function() {
	check_option(document.getElementById("2_img"));
});
$('#3').on( "click", function() {
	check_option(document.getElementById("3_img"));
});
$('#4').on( "click", function() {
	check_option(document.getElementById("4_img"));
});
$('#5').on( "click", function() {
	check_option(document.getElementById("5_img"));
});

$('#Confirm_btn').on( "click", function() {
	next_Qusetion();
});

//$("#id").css('display','block'); 

function check_option (element) {
	// body...
	$("#Confirm_btn").css('display','block');

	console.log(element.src.slice(-5,-4));

	if (element.src.slice(-5,-4) == '1')
	{
		// $('#VP_1_intro_right').addClass('animated bounceOutLeft');
		document.getElementById("VP_1_intro_right").style.display="block";
		document.getElementById("VP_1_intro_Next").style.display="block";
		document.getElementById("VP_1_intro_wrong").style.display="none";
	}
	else
	{
		document.getElementById("VP_1_intro_right").style.display="none";
		document.getElementById("VP_1_intro_Next").style.display="none";
		document.getElementById("VP_1_intro_wrong").style.display="block";
	}
}