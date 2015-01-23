var chooseArray= [];
var Ans_Array = ["2","4","8"];
var SR_Qid = 1;

$('#SR').on("pagebeforeshow",function(event, ui){
	SR_NextQuestion();


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
		var is_same = chooseArray.length == Ans_Array.length && chooseArray.every(function(element, index) {
		    return element === Ans_Array[index]; 
		});

		//show next Q
		$("#GotoRealTest").show();
		
	});
});


function SR_NextQuestion () {
	// console.log(SR_Qid);
	if(SR_Qid==15)
	{
		$.mobile.pageContainer.pagecontainer('change', "Section_endPage.html", {
		  transition: 'flow'
		});

	}
	else
	{
		chooseArray.length = 0;
		$("#NextQ").hide();
		SR_clean();
		window.plugins.directoryList.getList("www/img/SR",SR_onDirectoryReadSuccess,SR_onDirectoryReadError);
		SR_Qid++;	
	}
}


function SR_check_option (element) {
	// body...
}


function SR_onDirectoryReadSuccess(directoryList) {
    //console.log(directoryList);

    $('#SR_Q_img').attr('src', 'img/SR/'+SR_Qid+'.png');
    $('#SR_Q_img').attr('text-align', 'center');
    $('#SR_Q_img').width($(window).width()/3);
    $('#SR_Q_img').height($(window).width()/3);
    $('#SR_Grid').attr('src', 'img/SR/Grid.png');

    $('#SR_Grid').attr('text-align', 'center');
    $('#SR_Grid').width($(window).width()/3);
    $('#SR_Grid').height($(window).width()/3);

}

// onError Callback if directory does not exists or it is empty
//
function SR_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}


$("#NextQ").click(function () {
	SR_NextQuestion();
})

function SR_clean (argument) {
	$(".SRAns_button" ).css('background-color', 'white');
}