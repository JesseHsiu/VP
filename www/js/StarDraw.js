var inner_points = [[559.596966,318.488397],[713.623981,318.488397],[589.013508,409.023206],[636.610474,555.511603],[512.000000,464.927466],[387.389527,555.511603],[434.986492,409.023206],[310.376019,318.488397],[464.403034,318.488397],[512.000000,172.000000]];
var outer_points = [[590.579896,275.844052],[844.869781,275.844052],[639.144942,425.311896],[717.724838,667.155948],[512.000000,517.606665],[306.275162,667.155948],[384.855058,425.311896],[179.130219,275.844052],[433.420104,275.844052],[512.000000,34.000000]];
var nowDrawState = false;
var nowDraw_q = 1;

var error_media = new Media("other/beep.wav");
$('#StarDraw').on("pageshow",function(){
	$('#StarDraw_Confirm_btn').hide();
	StarDraw_next();
});

$('#StarDraw_Confirm_btn').click(function () {
	nowDraw_q++;
	if(nowDraw_q>5)
	{
		$.mobile.pageContainer.pagecontainer('change', "Draw_EndPage.html", {
		  transition: 'flow'
		});
	}
	else{
		StarDraw_next();	
	}
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
	$(this).on("touchend",function () {
		$('#StarDraw_Confirm_btn').show();
	});
}; 

function StarDraw_next()
{
	var canvas = document.getElementById('Star_Canvas');
	var context = canvas.getContext('2d');

	context.clearRect ( 0 , 0 , canvas.width, canvas.height );

	canvas.height = window.innerHeight * 0.95;
	canvas.width = window.innerWidth;

	context.lineWidth = 5;

	context.beginPath();
	context.moveTo(512.000000,34.000000);

	for(var i = 0 ; i < outer_points.length; i++)
	{
		context.lineTo(outer_points[i][0],outer_points[i][1]);		
	}

	context.lineJoin = 'round';
	context.stroke();


	context.beginPath();
	context.moveTo(512.000000,172.000000);
	for(var i = 0 ; i < inner_points.length; i ++)
	{
		context.lineTo(inner_points[i][0],inner_points[i][1]);
	}

	context.lineJoin = 'round';
	context.stroke();

	$("#Star_Canvas").drawTouch(context);
	context.strokeStyle = "#000";
	context.lineWidth = 2;
}


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
