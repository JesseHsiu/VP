// document.getElementById('tmp_test').addEventListener('click',this.haha('123'),false);
var VM_Answer;
var VM_time = new Date();
var VM_starttime;
$("#VM_Confirm_btn").css('display','none');
$('#VM_Option').css('display','none');

$('#VM').on("pageshow",function(){
	if (app.now_testname !="VM")
	{
		app.now_q=1;
		app.now_testname="VM";
	}
	else
	{
		if (app.now_q!=1)
		{
			app.now_q--;
		};
	}
	app.addHiddenBack();
	app.CreateFile("VM");
	console.log("pageshow");
	VM_next_Qusetion();
});

// var Q_array = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];

var VM_myArray = ['1.png','2.png','3.png','4.png']

// console.log(myArray);



function VM_next_Qusetion() {

	if (app.now_q==16)
	{
		app.Tests_finished.VM = true;
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
		window.plugins.directoryList.getList("www/img/VM/"+app.now_q+"/ans",VM_onDirectoryReadSuccess,VM_onDirectoryReadError);
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
});


function VM_check_option (element) {
	// body...
	console.log(element.src.slice(-5,-4));
	VM_time= new Date();
	var Time_tmp = VM_time.getTime() - VM_starttime-5000;
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
}

function VM_onDirectoryReadSuccess(directoryList) {
    // for (var entry in directoryList) {
    //     // if( directoryList.hasOwnProperty( entry ) ) {
    //     //   console.log(directoryList[entry].name);
    //     // } 
    //     console.log(entry.name);
    // }
    VM_Answer = directoryList[0].slice(-5,-4);
    console.log('img/VM/'+app.now_q.toString()+'/ans/'+directoryList[0])
    $('#VM_Q_img').attr('src', 'img/VM/'+app.now_q.toString()+'/ans/'+directoryList[0]);
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
	}, 5000);
	
	//Question
	$('#VM_1_img').attr('src', 'img/VM/'+app.now_q.toString()+'/opt/'+VM_myArray[0]);
	$('#VM_2_img').attr('src', 'img/VM/'+app.now_q.toString()+'/opt/'+VM_myArray[1]);
	$('#VM_3_img').attr('src', 'img/VM/'+app.now_q.toString()+'/opt/'+VM_myArray[2]);
	$('#VM_4_img').attr('src', 'img/VM/'+app.now_q.toString()+'/opt/'+VM_myArray[3]);
	
	//add number
	console.log(app.now_q);
	app.now_q++;

	//disapear
	
	VM_myArray.sort(function(){ return Math.random()-0.5; }); 
}

// onError Callback if directory does not exists or it is empty
//
function VM_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}