var inner_points = [[512.000000,87.000000],[794.463806,292.221954],[686.572205,624.278076],[337.427765,624.278076],[229.536209,292.221954],[512.000000,87.000000]];
var outer_points = [[844.869751,275.844055],[717.724854,667.155945],[306.275146,667.155945],[179.130219,275.844055],[512.000000,34.000000]];
var nowDrawState = false;
var error_media = new Media("other/beep.wav");
$('#FiveDraw').on("pageshow",function(){
	
	var canvas = document.getElementById('Five_Canvas');
    var context = canvas.getContext('2d');


    canvas.height = window.innerHeight * 0.95;
	canvas.width = window.innerWidth;
	context.lineWidth = 5;	
	
	// setup to trigger drawing on mouse or touch
	context.beginPath();
	context.moveTo(512.000000,34.000000);
	for(var i = 0 ; i < outer_points.length; i++)
	{
		context.lineTo(outer_points[i][0],outer_points[i][1]);		
	}

	context.lineJoin = 'round';
	context.stroke();


	context.beginPath();
	context.moveTo(512.000000,87.000000);
	for(var i = 0 ; i < inner_points.length; i ++)
	{
		context.lineTo(inner_points[i][0],inner_points[i][1]);
	}
	context.lineJoin = 'round';
	context.stroke();

	$("#Five_Canvas").drawTouch(context);
	context.strokeStyle = "#000";
	context.lineWidth = 2;
});

$.fn.drawTouch = function(ctx) {
	var start = function(e) {
		console.log("start draw");
        e = e.originalEvent;
		ctx.beginPath();
		x = e.changedTouches[0].pageX;//-$('#Draw_section').height()-44;
		y = e.changedTouches[0].pageY;//-$('#Draw_section').width()-44;//-44;
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		e.preventDefault();
        e = e.originalEvent;
		x = e.changedTouches[0].pageX;//-$('#Draw_section').height()-44;
		y = e.changedTouches[0].pageY;//-$('#Draw_section').width()-44;//-44;
		ctx.lineTo(x,y);
		ctx.stroke();
		if(inTheSection(x,y))
		{
			nowDrawState = true;
		}
		else
		{
			if (nowDrawState === true) {
				error_media.play();
			};
			nowDrawState = false;
		}
	};
	$(this).on("touchstart", start);
	$(this).on("touchmove", move);	
	// $(this).on("touchend",function () {
	// 	document.getElementById("Intro_Next").style.display="block";
	// })
}; 
//out point

function inTheSection(x,y)
{
	return pnpoly(outer_points,x,y) && !pnpoly(inner_points,x,y);
}

function pnpoly (Point_array,testx, testy) {
	
	// body...
	var i, j, c = 0;
	for (i = 0, j = Point_array.length-1; i < Point_array.length; j = i++) {
		if ( ((Point_array[i][1]>testy) != (Point_array[j][1]>testy)) && (testx < (Point_array[j][0]-Point_array[i][0]) * (testy-Point_array[i][1]) / (Point_array[j][1]-Point_array[i][1]) + Point_array[i][0]) )
		{
			c = !c;
		}
	}

	return c;
}
