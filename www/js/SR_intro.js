
$('#SR_intro').on("pagebeforeshow",function(){
	window.plugins.directoryList.getList("www/img/SR",SR_Intro_onDirectoryReadSuccess,SR_Intro_onDirectoryReadError);

	

});


function SR_Intro_check_option (element) {
	// body...
}


function SR_Intro_onDirectoryReadSuccess(directoryList) {
    //console.log(directoryList);
    $('#SR_Q_img').attr('src', 'img/SR/'+directoryList[0]);
    $('#SR_Q_img').attr('text-align', 'center');
    $('#SR_Q_img').width($(window).width()/3);
    $('#SR_Q_img').height($(window).width()/3);
    $('#SR_Grid').attr('src', 'img/SR/Grid.png');

    $('#SR_Grid').attr('text-align', 'center');
    $('#SR_Grid').width($(window).width()/3);
    $('#SR_Grid').height($(window).width()/3);

    for(var i = 0 ; i< 9 ; i++)
    {
    	var tmp_top = 4.1+(Math.floor(i/3))*112.3;
    	var tmp_left = 112*((i%3))+19.5;

    	var tmp_string = "<div class='SRAns_button' id='AnsBlock_" + i + "''></div>";
    	console.log(tmp_string);

    	$( "#Answer_container" ).append( tmp_string );
    	$('#Answer_container > div:last').css('top', tmp_top.toString()+"px");
    	$('#Answer_container > div:last').css('left', tmp_left.toString()+"px");
    }

    $(".SRAns_button").width(108);
    $('.SRAns_button').height(108);
    $( ".SRAns_button" ).click(function() {
		console.log("clicked");
		if($(this).css('background-color') == "rgb(0, 0, 0)")
		{
			$(this).css('background-color', 'white');
		}
		else
		{
			$(this).css('background-color', 'black');
		}
	});
}

// onError Callback if directory does not exists or it is empty
//
function SR_Intro_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}


