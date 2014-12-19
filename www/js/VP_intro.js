// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);

var myArray = ['1.png','2.png','3.png','4.png','5.png']
myArray.sort(function(){ return Math.random()-0.5; }); 

//Question
$('#Q_img').attr('src', 'img/VD/1/ans/0.png');
//Options
$('#1_img').attr('src', 'img/VD/1/opt/'+myArray[0]);
$('#2_img').attr('src', 'img/VD/1/opt/'+myArray[1]);
$('#3_img').attr('src', 'img/VD/1/opt/'+myArray[2]);
$('#4_img').attr('src', 'img/VD/1/opt/'+myArray[3]);
$('#5_img').attr('src', 'img/VD/1/opt/'+myArray[4]);



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

function check_option (element) {
	// body...
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