var chooseArray= [];
var SR_Ans_Array = [["2","4","8"],["1","3","8"],["0","4","5"],["2","6","7"],["1","3","5","7"],["0","2","3","8"],["0","1","2","4","6"],["0","2","4","5","6"],["3"],["2","3"],["0","5"],["2","6","7"],["1","3","4"],["0","2","4","6","7"],["0","3","5","8"]];

var SR_time = new Date();
var SR_starttime;

$('#SR').on("pagebeforeshow",function(event, ui){
	if (app.now_testname !="SR")
	{
		app.now_q=1;
		app.now_testname="SR";
	}
	else
	{
		app.now_q--;
	}
	app.addHiddenBack();
	app.CreateFile("SR");

	for(var i = 0 ; i< 9 ; i++)
    {
    	var tmp_top = 4.1+(Math.floor(i/3))*112.3;
    	var tmp_left = 112*((i%3))+19.5;

    	var tmp_string = "<div class='SRAns_button' id='" + i + "''></div>";
    	// console.log(tmp_string);

    	$( "#Answer_container" ).append( tmp_string );
    	$('#Answer_container > div:last').css('top', tmp_top.toString()+"px");
    	$('#Answer_container > div:last').css('left', tmp_left.toString()+"px");
    }

    $(".SRAns_button").width(108);
    $('.SRAns_button').height(108);
    
    $(".SRAns_button" ).click(function() {
		//console.log("clicked");
		$("#NextQ").show();
		if($(this).css('background-color') == "rgb(0, 0, 0)")
		{
			var tmp_id = $(this).attr('id').toString();
			chooseArray = $.grep(chooseArray, function(n ,i) {
			  return n != tmp_id;
			})
			$(this).css('background-color', 'white');
		}
		else
		{
			$(this).css('background-color', 'black');
			chooseArray.push($(this).attr('id').toString());
		}
		chooseArray = chooseArray.sort();
		var is_same = chooseArray.length == SR_Ans_Array[app.now_q-1].length && chooseArray.every(function(element, index) {
		    return element === SR_Ans_Array[app.now_q-1][index]; 
		});

		//show next Q
		$("#GotoRealTest").show();
		
	});

	SR_NextQuestion();
});


function SR_NextQuestion () {
	// console.log(app.now_q);
	if(app.now_q==15)
	{
		$.mobile.pageContainer.pagecontainer('change', "Section_endPage.html", {
		  transition: 'flow'
		});

	}
	else
	{
		chooseArray.length = 0;
		SR_starttime = SR_time.getTime();
		$("#NextQ").hide();
		SR_clean();
		window.plugins.directoryList.getList("www/img/SR",SR_onDirectoryReadSuccess,SR_onDirectoryReadError);
			
	}
}


function SR_check_option (element) {
	// body...
}


function SR_onDirectoryReadSuccess(directoryList) {
    //console.log(directoryList);

    $('#SR_Q_img').attr('src', 'img/SR/'+app.now_q+'.png');
    $('#SR_Q_img').attr('text-align', 'center');
    $('#SR_Q_img').width($(window).width()/3);
    $('#SR_Q_img').height($(window).width()/3);
    $('#SR_Grid').attr('src', 'img/SR/Grid.png');

    $('#SR_Grid').attr('text-align', 'center');
    $('#SR_Grid').width($(window).width()/3);
    $('#SR_Grid').height($(window).width()/3);
    

}


function SR_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}


$("#NextQ").click(function () {
	console.log(chooseArray);
	console.log(SR_Ans_Array[app.now_q-1]);

	chooseArray = chooseArray.sort();
	var is_same = chooseArray.length == SR_Ans_Array[app.now_q-1].length && chooseArray.every(function(element, index) {
	    return element === SR_Ans_Array[app.now_q-1][index]; 
	});
	
	SR_time= new Date();
	var Time_tmp = SR_time.getTime() - SR_starttime;
	app.thingstowrite = is_same +"," + Time_tmp + "," + chooseArray+"\n";
	app.WriteFile();

	SR_NextQuestion();
	app.now_q++;
})

function SR_clean (argument) {
	$(".SRAns_button" ).css('background-color', 'white');
}