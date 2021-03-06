// var inner_points = [[512.000000,87.000000],[794.463806,292.221954],[686.572205,624.278076],[337.427765,624.278076],[229.536209,292.221954]];
// var outer_points = [[844.869751,275.844055],[717.724854,667.155945],[306.275146,667.155945],[179.130219,275.844055],[512.000000,34.000000]];
var nowDrawState = false;
var CircleD_time;
var CircleD_starttime;
var error_times =0;
var drawed = false;
// var error_media = new Media("other/beep.wav");

$('#CircleDraw').on("pageshow",function(){
	RMSE.initialize();
	app.CreateFile("CircleD");
	app.addHiddenBack();
	if (app.now_testname !="CircleD")
	{
		app.now_q=1;
		app.now_testname="CircleD";
		
	}
	else
	{
		if (app.now_q!=1)
		{
			app.now_q--;
		};
	}
	app.thingstowrite = "";
	$("#CircleDraw_Confirm_btn").hide();
	CircleD_next_question();
});

$.fn.drawTouch = function(ctx) {
	var start = function(e) {
		$(".circle-text").hide();
		if (drawed === false)
		{
			CircleD_time = new Date();
			CircleD_starttime = CircleD_time.getTime();	
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
		CircleD_time= new Date();
		var Time_tmp = CircleD_time.getTime() - CircleD_starttime;


		//RMSE
		RMSE.calculate_D(x,y);
		var tmp_RMSE = Math.sqrt(RMSE.now_distance/RMSE.touch_count);
		//console.log("distance:"+RMSE.now_distance+";Count:"+RMSE.touch_count);
		//console.log(app.now_q+","+ Time_tmp + ","+x+","+y+","+error_times+","+tmp_RMSE);
		app.thingstowrite = app.thingstowrite + app.now_q+","+ Time_tmp + ","+x+","+y+","+error_times+","+tmp_RMSE+"\n";
		RMSE.touch_count++;

	};
	var end = function (e) {
		$(".circle-text").show();
		$("#CircleDraw_Confirm_btn").show();
	}
	$(this).on("touchstart", start);
	$(this).on("touchmove", move);	
	$(this).on("touchend" , end);
	// $(this).on("touchend",function () {
	// 	document.getElementById("Intro_Next").style.display="block";
	// })
}; 
//out point

function inTheSection(dX1,dY1)
{

	//distance
	var tmp_distance = Math.sqrt((dX1 - 512)*(dX1 - 512) + (dY1 - 370)*(dY1 - 370));

	if (tmp_distance >300 || tmp_distance<260) {
		return false;
	}
	else
	{
		return true;
	}


	//return pnpoly(outer_points,x,y) && !pnpoly(inner_points,x,y);
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

function CircleD_next_question () {
	if(app.now_q==4)
	{
		app.Tests_finished.circle = true;
		$.mobile.pageContainer.pagecontainer('change', "MI_endPage.html", {
		  transition: 'flow'
		});
	}
	else
	{
		// app.thingstowrite = "";
		newCanvas();
	}
}

function newCanvas(){
	var canvas = document.getElementById('Circle_Canvas');
    var context = canvas.getContext('2d');

    canvas.height = window.innerHeight * 0.95;
	canvas.width = window.innerWidth;
	context.lineWidth = 5;	
	
	// setup to trigger drawing on mouse or touch
	// context.beginPath();
	// context.moveTo(512.000000,34.000000);
	// for(var i = 0 ; i < outer_points.length; i++)
	// {
	// 	context.lineTo(outer_points[i][0],outer_points[i][1]);		
	// }

	// context.lineJoin = 'round';
	// context.stroke();


	// context.beginPath();
	// context.moveTo(229.536209,292.221954);
	// for(var i = 0 ; i < inner_points.length; i ++)
	// {
	// 	context.lineTo(inner_points[i][0],inner_points[i][1]);
	// }
	// context.lineJoin = 'round';
	// context.stroke();


	context.beginPath();
	context.arc(512,370,260,0,2*Math.PI);
	context.stroke();

	context.beginPath();
	context.arc(512,370,300,0,2*Math.PI);
	context.stroke();


	$("#Circle_Canvas").drawTouch(context);
	context.strokeStyle = "#000";
	context.lineWidth = 2;
}


$("#CircleDraw_Confirm_btn").click(function  () {
	console.log("data:"+app.thingstowrite);
	app.WriteFile();
	app.now_q++;
	RMSE.initialize();
	error_times =0;
	drawed = false;
	CircleD_next_question();
	$(this).hide();
});



var RMSE = {

	now_distance: null,
	middle_line_array:null,
	touch_count: null,
	initialize:function () {
		//app.thingstowrite = "";
		RMSE.now_distance = 0;
		RMSE.touch_count =1;
		// RMSE.middle_line_array=[];
		// for(var i = 0 ; i < outer_points.length; i++)
		// {
		// 	RMSE.middle_line_array.push([(inner_points[i][0]+outer_points[i][0])/2,(inner_points[i][1]+outer_points[i][1])/2]);
		// }
	},
	calculate_D:function (dX1,dY1) {
		// var tmp_small = 0;
		// for(var i = 0 ; i < RMSE.middle_line_array.length; i++)
		// {	
		// 	if (i === RMSE.middle_line_array.length-1)
		// 	{
		// 		now_value = RMSE.distance(RMSE.middle_line_array[i][0],RMSE.middle_line_array[i][1],RMSE.middle_line_array[0][0],RMSE.middle_line_array[0][1],X,Y);
		// 	}else{
		// 		now_value = RMSE.distance(RMSE.middle_line_array[i][0],RMSE.middle_line_array[i][1],RMSE.middle_line_array[i+1][0],RMSE.middle_line_array[i+1][1],X,Y);
		// 	}
			
		// 	if (tmp_small ===0)
		// 	{
		// 		tmp_small = now_value;
		// 	}else if (tmp_small > now_value)
		// 	{
		// 		tmp_small = now_value;
		// 	};
		// }

		// RMSE.now_distance = RMSE.now_distance + tmp_small;


		var tmp_dis = Math.sqrt((dX1 - 512)*(dX1 - 512) + (dY1 - 370)*(dY1 - 370));
		//console.log(tmp_dis);
		if (tmp_dis >280) {
			RMSE.now_distance = RMSE.now_distance + (tmp_dis - 280)*(tmp_dis - 280);
		}
		else
		{
			RMSE.now_distance = RMSE.now_distance + (280 - tmp_dis)*(280 - tmp_dis);
		}

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

