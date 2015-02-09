var chooseArray= [];
var Ans_Array = ["2","4","8"];


$('#SR_intro').on("pagebeforeshow",function(){
	window.plugins.directoryList.getList("www/img/SR",SR_Intro_onDirectoryReadSuccess,SR_Intro_onDirectoryReadError);
	if (app.current_userinfo.right_left_hand == "right")
    {
        $("#SR_intro_lefthand").append("<img id='SR_intro_Q_img'>");
        $("#SR_intro_righthand").append("<div id='Answer_container_intro'><img id='SR_intro_Grid'></div>");
    }
    else
    {
        $("#SR_intro_lefthand").append("<div id='Answer_container_intro'><img id='SR_intro_Grid'></div>");
        $("#SR_intro_righthand").append("<img id='SR_intro_Q_img'>");
    }
});


function SR_Intro_check_option (element) {
	// body...
}


function SR_Intro_onDirectoryReadSuccess(directoryList) {
    ////console.log(directoryList);
    $('#SR_intro_Q_img').attr('src', 'img/SR/'+directoryList[0]);
    $('#SR_intro_Q_img').attr('text-align', 'center');
    $('#SR_intro_Q_img').width($(window).width()/3);
    $('#SR_intro_Q_img').height($(window).width()/3);
    $('#SR_intro_Grid').attr('src', 'img/SR/Grid.png');

    $('#SR_intro_Grid').attr('text-align', 'center');
    $('#SR_intro_Grid').width($(window).width()/3);
    $('#SR_intro_Grid').height($(window).width()/3);

    for(var i = 0 ; i< 9 ; i++)
    {
    	var tmp_top = 4.1+(Math.floor(i/3))*112.3;
    	var tmp_left = 112*((i%3))+19.5;

    	var tmp_string = "<div class='SRAns_intro_button' id='" + i + "''></div>";
    	//console.log(tmp_string);

    	$("#Answer_container_intro" ).append( tmp_string );
    	$('#Answer_container_intro > div:last').css('top', tmp_top.toString()+"px");
    	$('#Answer_container_intro > div:last').css('left', tmp_left.toString()+"px");
    }

    $(".SRAns_intro_button").width(108);
    $('.SRAns_intro_button').height(108);
    
    $(".SRAns_intro_button" ).click(function() {
		//console.log("clicked");
		if($(this).css('background-color') === "rgb(111, 107, 107)")
		{
			var tmp_id = $(this).attr('id').toString();
			chooseArray = $.grep(chooseArray, function(n ,i) {
			  return n != tmp_id;
			})
			$(this).css('background-color', 'white');
		}
		else
		{
			$(this).css('background-color', 'rgb(111,107,107)');
			chooseArray.push($(this).attr('id').toString());
		}
		chooseArray = chooseArray.sort();
		var is_same = chooseArray.length == Ans_Array.length && chooseArray.every(function(element, index) {
		    return element === Ans_Array[index]; 
		});

		if(is_same)
		{
			$("#SR_intro_right").show();
			$("#GotoRealTest").show();
		}
		else
		{
			$("#SR_intro_right").hide();
			$("#GotoRealTest").hide();
		}
	});


}

// onError Callback if directory does not exists or it is empty
//
function SR_Intro_onDirectoryReadError(error) {
    alert('Directory Read error \n' + 'message: ' + error);
}


