var now_q=1;

var ctx, color = "#000";

$('#VMI').on("pageshow",function(){
	console.log("pageshow");
	$('#Draw_section').height($('#Q_img').height());
	$('#Draw_section').width($('#Q_img').width());


	$('#content').height($('#Q_img').height());
	$('#content').width($('#Q_img').width());

	// $("#canvas").css("background-color","yellow");
});


$(document).ready(function () {
	next_question();
});

function next_question () {
	// console.log("set attr");
	
	// setup a new canvas for drawing wait for device init
	if (now_q==1)
	{
		$('#Q_img').attr('src', 'img/VMI/'+now_q.toString()+'.png');
		setTimeout(function(){
		   newCanvas();
	    }, 1000);
	    now_q++;
	}
	else if(now_q==19)
	{
		$.mobile.pageContainer.pagecontainer('change', "VMI_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		$('#Q_img').attr('src', 'img/VMI/'+now_q.toString()+'.png');
		newCanvas();
		now_q++;
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
 	//$("#canvas").drawPointer();
	// $("#canvas").drawMouse();
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
	next_question();
	document.getElementById("Next_btn").style.display="none";
	// document.getElementById("VP_Confirm_btn").style.display="none";
});
    
//document.getElementById("VC_Intro_Next").style.display="block";
// // prototype to	start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
// $.fn.drawPointer = function() {
// 	var start = function(e) {
//         e = e.originalEvent;
// 		ctx.beginPath();
// 		x = e.pageX;
// 		y = e.pageY;//-44;
// 		ctx.moveTo(x,y);
// 	};
// 	var move = function(e) {
// 		e.preventDefault();
//         e = e.originalEvent;
// 		x = e.pageX;
// 		y = e.pageY;//-44;
// 		ctx.lineTo(x,y);
// 		ctx.stroke();
//     };
// 	$(this).on("MSPointerDown", start);
// 	$(this).on("MSPointerMove", move);
// };        

// // prototype to	start drawing on mouse using canvas moveTo and lineTo
// $.fn.drawMouse = function() {
// 	var clicked = 0;
// 	var start = function(e) {
// 		clicked = 1;
// 		ctx.beginPath();
// 		x = e.pageX;
// 		y = e.pageY;//-44;
// 		ctx.moveTo(x,y);
// 	};
// 	var move = function(e) {
// 		if(clicked){
// 			x = e.pageX;
// 			y = e.pageY;//-44;
// 			ctx.lineTo(x,y);
// 			ctx.stroke();
// 		}
// 	};
// 	var stop = function(e) {
// 		clicked = 0;
// 	};
// 	$(this).on("mousedown", start);
// 	$(this).on("mousemove", move);
// 	$(window).on("mouseup", stop);
// };
