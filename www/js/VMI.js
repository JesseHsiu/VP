var ctx, color = "#000";

$('#VMI').on("pageshow",function(){
	if (app.now_testname !="VMI")
	{
		app.now_q=1;
		app.now_testname="VMI";
	}
	else
	{
		if (app.now_q!=1)
		{
			app.now_q--;
		};
	}
	app.addHiddenBack();
	console.log("pageshow");
	app.CreateFolder("VMI");

	$('#Draw_section').height($('#VMI_div_Q').width());
	$('#Draw_section').width($('#VMI_div_Q').width());
	$('#content').height($('#VMI_div_Q').width());
	$('#content').width($('#VMI_div_Q').width());
	next_question();
});


function next_question () {
	// setup a new canvas for drawing wait for device init
	// if (app.now_q==1)
	// {
	// 	$('#VMI_Q_img').attr('src', 'img/VMI/'+app.now_q+'.png');
	// 	setTimeout(function(){
	// 	   newCanvas();
	//     }, 1000);
	//     app.now_q++;
	// }
	if(app.now_q==19)
	{
		app.Tests_finished.VMI = true;
		$.mobile.pageContainer.pagecontainer('change', "VMI_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		$('#VMI_Q_img').attr('src', 'img/VMI/'+app.now_q+'.png');
		newCanvas();
		app.now_q++;
	}
	
}


// function to setup a new canvas for drawing
function newCanvas(){
	//define and resize canvas
    $("#content").height($('#Draw_section').height());
    var canvas = '<canvas id="canvas" width="'+$('#Draw_section').width()+'" height="'+$('#Draw_section').height()+'"></canvas>';
	$("#content").html(canvas);
    
    // setup canvas
	ctx=document.getElementById("canvas").getContext("2d");
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;
	
	// setup to trigger drawing on mouse or touch
	$("#canvas").drawTouch();
}

// prototype to	start drawing on touch using canvas moveTo and lineTo
$.fn.drawTouch = function() {
	var start = function(e) {
        e = e.originalEvent;
		ctx.beginPath();
		x = e.changedTouches[0].pageX-$('#Draw_section').height()-44;
		y = e.changedTouches[0].pageY-$('#Draw_section').width()-44;//-44;
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		e.preventDefault();
        e = e.originalEvent;
		x = e.changedTouches[0].pageX-$('#Draw_section').height()-44;
		y = e.changedTouches[0].pageY-$('#Draw_section').width()-44;//-44;
		ctx.lineTo(x,y);
		ctx.stroke();
	};
	$(this).on("touchstart", start);
	$(this).on("touchmove", move);	
	$(this).on("touchend",function () {
		document.getElementById("Next_btn").style.display="block";
	})
}; 

$('#Next_btn').on("click", function() {
	var canvas = document.getElementById("canvas");
	var img = canvas.toDataURL("image/tiff");
	app.thingstowrite = img;
	app.saveVMIImg(app.now_q-1);

	next_question();
	document.getElementById("Next_btn").style.display="none";
});
