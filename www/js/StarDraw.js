var inner_points = [[559.596966,318.488397],[713.623981,318.488397],[589.013508,409.023206],[636.610474,555.511603],[512.000000,464.927466],[387.389527,555.511603],[434.986492,409.023206],[310.376019,318.488397],[464.403034,318.488397],[512.000000,172.000000]];
var outer_points = [[590.579896,275.844052],[844.869781,275.844052],[639.144942,425.311896],[717.724838,667.155948],[512.000000,517.606665],[306.275162,667.155948],[384.855058,425.311896],[179.130219,275.844052],[433.420104,275.844052],[512.000000,34.000000]];

var nowDrawState = false;
var SD_time;
var SD_starttime;
var error_times =0;
var drawed = false;
// var error_media = new Media("other/beep.wav");

$('#StarDraw').on("pageshow",function(){
	RMSE.initialize();
	app.CreateFile("SD");
	app.addHiddenBack();
	if (app.now_testname !="SD")
	{
		app.now_q=1;
		app.now_testname="SD";
	}
	else
	{
		if (app.now_q!=1)
		{
			app.now_q--;
		};
	}
	$("#StarDraw_Confirm_btn").hide();
	SD_next_question();
});

$.fn.drawTouch = function(ctx) {
	var start = function(e) {
		$(".circle-text").hide();
		if (drawed === false)
		{
			SD_time = new Date();
			SD_starttime = SD_time.getTime();	
			drawed = true;
		};

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
				error_times++;
			};
			nowDrawState = false;
		}
		SD_time= new Date();
		var Time_tmp = SD_time.getTime() - SD_starttime;


		//RMSE
		RMSE.calculate_D(x,y);
		var tmp_RMSE = Math.sqrt(RMSE.now_distance/RMSE.touch_count);
		app.thingstowrite = app.thingstowrite + app.now_q+","+ Time_tmp + ","+x+","+y+","+error_times+","+tmp_RMSE+"\n";
		RMSE.touch_count++;

	};
	var end = function (e) {
		$(".circle-text").show();
		$("#StarDraw_Confirm_btn").show();
	}
	$(this).on("touchstart", start);
	$(this).on("touchmove", move);	
	$(this).on("touchend" , end);
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

function SD_next_question () {
	if(app.now_q==4)
	{
		app.Tests_finished.star = true;
		$.mobile.pageContainer.pagecontainer('change', "MI_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		newCanvas();
	}
}

function newCanvas(){
	var canvas = document.getElementById('Star_Canvas');
    var context = canvas.getContext('2d');
    app.thingstowrite = "";

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


$("#StarDraw_Confirm_btn").click(function  () {
	app.WriteFile();
	app.now_q++;
	RMSE.initialize();
	error_times =0;
	drawed = false;
	SD_next_question();
	$(this).hide();
});



var RMSE = {

	now_distance: null,
	middle_line_array:null,
	touch_count: null,
	initialize:function () {
		app.thingstowrite = "";
		RMSE.now_distance = 0;
		RMSE.touch_count =1;
		RMSE.middle_line_array=[];
		for(var i = 0 ; i < outer_points.length; i++)
		{
			RMSE.middle_line_array.push([(inner_points[i][0]+outer_points[i][0])/2,(inner_points[i][1]+outer_points[i][1])/2]);
		}
	},
	calculate_D:function (X,Y) {
		var tmp_small = 0;
		for(var i = 0 ; i < RMSE.middle_line_array.length; i++)
		{	
			if (i === RMSE.middle_line_array.length-1)
			{
				now_value = RMSE.distance(RMSE.middle_line_array[i][0],RMSE.middle_line_array[i][1],RMSE.middle_line_array[0][0],RMSE.middle_line_array[0][1],X,Y);
			}else{
				now_value = RMSE.distance(RMSE.middle_line_array[i][0],RMSE.middle_line_array[i][1],RMSE.middle_line_array[i+1][0],RMSE.middle_line_array[i+1][1],X,Y);
			}
			
			if (tmp_small ===0)
			{
				tmp_small = now_value;
			}else if (tmp_small > now_value)
			{
				tmp_small = now_value;
			};
		}

		RMSE.now_distance = RMSE.now_distance + tmp_small;
	},

	distance: function  (x1,y1,x2,y2,pointX,pointY) {
		var diffX = x2 - x1;
	    var diffY = y2 - y1;
	    if ((diffX == 0) && (diffY == 0))
	    {
	        diffX = pointX - x1;
	        diffY = pointY - y1;
	        return diffX * diffX + diffY * diffY;
	    }
	    
	    var t = ((pointX - x1) * diffX + (pointY - y1) * diffY) / (diffX * diffX + diffY * diffY);
	    
	    if (t < 0)
	    {
	        //point is nearest to the first point i.e x1 and y1
	        diffX = pointX - x1;
	        diffY = pointY - y1;
	    }
	    else if (t > 1)
	    {
	        //point is nearest to the end point i.e x2 and y2
	        diffX = pointX - x2;
	        diffY = pointY - y2;
	    }
	    else
	    {
	        //if perpendicular line intersect the line segment.
	        diffX = pointX - (x1 + t * diffX);
	        diffY = pointY - (y1 + t * diffY);
	    }
	    
	    //returning shortest distance
	    return diffX * diffX + diffY * diffY;
	}

};