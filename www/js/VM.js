// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);
var VM_now_q=1;
var VM_Answer;
var VM_time = new Date();
var VM_starttime;
$("#VM_Confirm_btn").css('display','none');
$('#VM_Option').css('display','none');

$('#VM').on("pageshow",function(){
	app.CreateFile("VM");
	console.log("pageshow");
	VM_next_Qusetion();
});

// var Q_array = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];

var VM_myArray = ['1.png','2.png','3.png','4.png']

// console.log(myArray);



function VM_next_Qusetion() {

	if (VM_now_q==16)
	{
		// $.mobile.changePage("Section_endPage.html", "slideup");
		$.mobile.pageContainer.pagecontainer('change', "Section_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		$("#VM_Confirm_btn").css('display','none');
		$('#VM_Option').css('display','none');
		VM_starttime = VM_time.getTime();
		window.plugins.directoryList.getList("www/img/VM/"+VM_now_q+"/ans",VM_onDirectoryReadSuccess,VM_onDirectoryReadError);
	}
}


$('#VM_1').on("click", function() {
	VM_check_option(document.getElementById("VM_1_img"));
});
$('#VM_2').on("click", function() {
	VM_check_option(document.getElementById("VM_2_img"));
});
$('#VM_3').on("click", function() {
	VM_check_option(document.getElementById("VM_3_img"));
});
$('#VM_4').on("click", function() {
	VM_check_option(document.getElementById("VM_4_img"));
});

$('#VM_Confirm_btn').on("click", function() {
	VM_next_Qusetion();
	// document.getElementById("VP_Confirm_btn").style.display="none";
});

//$("#id").css('display','block'); 

function VM_check_option (element) {
	// body...
	console.log(element.src.slice(-5,-4));
	// $("#VP_1_Next").css('display','block');
	// $("#VP_Confirm_btn").css('display','block');
	VM_time= new Date();
	var Time_tmp = VM_time.getTime() - VM_starttime-2000;
	if (VM_Answer === element.src.slice(-5,-4))
	{

		console.log("correct");
		
		console.log("time: "+ Time_tmp);
	}
	else
	{
		console.log("error");
		console.log("time: "+ Time_tmp);
	}
	app.thingstowrite = (VM_Answer === element.src.slice(-5,-4)) +"," + Time_tmp + "," + element.src.slice(-5,-4)+"\n";
	app.WriteFile();

	VM_next_Qusetion();

	//$("#VM_Confirm_btn").css('display','block');
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

function VM_onDirectoryReadSuccess(directoryList) {
    // for (var entry in directoryList) {
    //     // if( directoryList.hasOwnProperty( entry ) ) {
    //     //   console.log(directoryList[entry].name);
    //     // } 
    //     console.log(entry.name);
    // }
    VM_Answer = directoryList[0].slice(-5,-4);
    console.log('img/VM/'+VM_now_q.toString()+'/ans/'+directoryList[0])
    $('#VM_Q_img').attr('src', 'img/VM/'+VM_now_q.toString()+'/ans/'+directoryList[0]);
    // $('#VM_Q_img').show();
    $('#VM_Q_img').css('display','block');
    $('#VM_Q_img').css('opacity',1);
    $('#VM_Q_img').css('top',1);

    setTimeout(function() {   //calls click event after a certain time
		$('#VM_Q_img').animate(
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
	// console.log("123");//VM_now_q.toString()
	//Question
	// $('#VP_1_Q_img').attr('src', 'img/VM/'+VM_now_q.toString()+'/ans/0.png');
	$('#VM_1_img').attr('src', 'img/VM/'+VM_now_q.toString()+'/opt/'+VM_myArray[0]);
	$('#VM_2_img').attr('src', 'img/VM/'+VM_now_q.toString()+'/opt/'+VM_myArray[1]);
	$('#VM_3_img').attr('src', 'img/VM/'+VM_now_q.toString()+'/opt/'+VM_myArray[2]);
	$('#VM_4_img').attr('src', 'img/VM/'+VM_now_q.toString()+'/opt/'+VM_myArray[3]);
	
	//add number
	console.log(VM_now_q);
	VM_now_q++;

	//disapear
	
	VM_myArray.sort(function(){ return Math.random()-0.5; }); 
}

// onError Callback if directory does not exists or it is empty
//
function VM_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}