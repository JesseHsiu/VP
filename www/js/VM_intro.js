$('#VM_Option').hide();

$(document).on("pageshow","#VM_intro",function(){
	setTimeout(function() {   //calls click event after a certain time
		$('#VM_Intro_Q_img').animate(
			{opacity:0,top:0}
		  ,'normal'
		  ,function(){
		  	$(this).hide(); 
		  	$('#VM_Option').animate(
				{opacity:1,top:1}
				,function(){ $(this).show(); }
			);
		  }
		);
	}, 2000);
});

// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);

var VM_myArray = ['1.png','2.png','3.png','4.png']
VM_myArray.sort(function(){ return Math.random()-0.5; }); 

//Question
$('#VM_Intro_Q_img').attr('src', 'img/VM/1/ans/2.png');
//Options
$('#VM_Intro_1_img').attr('src', 'img/VM/1/opt/'+myArray[0]);
$('#VM_Intro_2_img').attr('src', 'img/VM/1/opt/'+myArray[1]);
$('#VM_Intro_3_img').attr('src', 'img/VM/1/opt/'+myArray[2]);
$('#VM_Intro_4_img').attr('src', 'img/VM/1/opt/'+myArray[3]);



$('#VM_Intro_1').on( "click", function() {
	check_option(document.getElementById("VM_Intro_1_img"));
});
$('#VM_Intro_2').on( "click", function() {
	check_option(document.getElementById("VM_Intro_2_img"));
});
$('#VM_Intro_3').on( "click", function() {
	check_option(document.getElementById("VM_Intro_3_img"));
});
$('#VM_Intro_4').on( "click", function() {
	check_option(document.getElementById("VM_Intro_4_img"));
});

function check_option (element) {
	// body...
	console.log(element.src.slice(-5,-4));

	if (element.src.slice(-5,-4) == '1')
	{
		// $('#VP_1_intro_right').addClass('animated bounceOutLeft');
		document.getElementById("VM_Intro_right").style.display="block";
		document.getElementById("VM_Intro_Next").style.display="block";
		document.getElementById("VM_Intro_wrong").style.display="none";
	}
	else
	{
		document.getElementById("VM_Intro_right").style.display="none";
		document.getElementById("VM_Intro_Next").style.display="none";
		document.getElementById("VM_Intro_wrong").style.display="block";
	}
}



