var ctx, color = "#000";	

$('#VMI_intro').on("pageshow",function(){
	console.log($("#VMI_Intro_div_Q").width());

	$('#Draw_section').height($("#VMI_Intro_div_Q").width());
	$('#Draw_section').width($("#VMI_Intro_div_Q").width());

	$('#content').height($("#VMI_Intro_div_Q").width());
	$('#content').width($("#VMI_Intro_div_Q").width());

	// $("#canvas").css("background-color","yellow");
});


$(document).ready(function () {
	$('#VMI_Intro_Q_img').attr('src', 'img/VMI/1.png');


	

	// setup a new canvas for drawing wait for device init
    setTimeout(function(){
	   newCanvas();
    }, 1000);
		
	// reset palette selection (css) and select the clicked color for canvas strokeStyle
	// $(".palette").click(function(){
	// 	$(".palette").css("border-color", "#777");
	// 	$(".palette").css("border-style", "solid");
	// 	$(this).css("border-color", "#fff");
	// 	$(this).css("border-style", "dashed");
	// 	color = $(this).css("background-color");
	// 	ctx.beginPath();
	// 	ctx.strokeStyle = color;
	// });
    
	// // link the new button with newCanvas() function
	// $("#new").click(function() {
	// 	newCanvas();
	// });
});

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
		document.getElementById("Intro_Next").style.display="block";
	})
}; 
    
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
