var inner_points = [[512+48,-280+350],[512+58,-44+350],[512+282,-106+350],[512+258,-55+350],[512+317,-15+350],[512+93,65+350],[512+221,258+350],[512+160,252+350],[512+148,310+350],[512+0,135+350],[512+-148,310+350],[512+-160,252+350],[512+-221,258+350],[512+-93,65+350],[512+-317,-15+350],[512+-258,-55+350],[512+-282,-106+350],[512+-58,-44+350],[512+-48,-280+350],[512+0,-240.85+350]];
var outer_points = [[577.495907,26.186668],[590.579896,275.844052],[832.061352,211.139291],[797.316955,291.294902],[874.068098,339.806860],[639.144942,425.311896],[775.304701,634.979538],[688.335576,626.705098],[672.696903,709.117776],[512.000000,517.606665],[351.303098,709.117776],[335.664424,626.705098],[248.695299,634.979538],[384.855058,425.311896],[149.931902,339.806860],[226.683045,291.294902],[191.938647,211.139291],[433.420104,275.844052],[446.504093,26.186668],[512.000000,84.000000]];
var nowDrawState = false;
var error_media = new Media("other/beep.wav");
$('#ComplexDraw').on("pageshow",function(){

	var canvas = document.getElementById('Complex_Canvas');
    var context = canvas.getContext('2d');


    canvas.height = window.innerHeight * 0.95;
	canvas.width = window.innerWidth;

	context.lineWidth = 5;

	context.beginPath();
	context.moveTo(512.000000,84.000000);
	
	for(var i = 0 ; i < outer_points.length; i++)
	{
		context.lineTo(outer_points[i][0],outer_points[i][1]);		
	}

	context.lineJoin = 'round';
	context.stroke();


	context.beginPath();
	context.moveTo(512+0,-240.85+350);
	for(var i = 0 ; i < inner_points.length; i ++)
	{
		context.lineTo(inner_points[i][0],inner_points[i][1]);
	}
	context.lineJoin = 'round';
	context.stroke();


	$("#Complex_Canvas").drawTouch(context);
	context.strokeStyle = "#000";
	context.lineWidth = 5;

});
$.fn.drawTouch = function(ctx) {
	var start = function(e) {
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
