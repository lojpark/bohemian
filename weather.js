function initWeather( rain ){
	var i;
	rain[0] = new Object();
	rain[0].isRain = false;
	rain[0].time = 0;
	rain[0].n = 35;
	rain[0].prob = 0;
	
	for( i = 1; i <= rain[0].n; i++ ){
		rain[i] = new Object();
		rain[i].x = Math.random()*920 - 100;
		rain[i].y = Math.random()*1080 - 1100;
		rain[i].vy = 5;
		rain[i].scale = 0.5 + Math.random()*0.5;
	}
};

function moveWeather( rain, dTime, season, dx, dy, bonus ){
	var i, temp = 0;
	
	if( dTime == 0.2 ) temp = 45000;
	else temp = 3000;
	
	if( season == 2 ){
		if( dTime == 0.2 ) temp = 10500;
		else temp = 700;
	}
	if( season == 4 ){
		if( dTime == 0.2 ) temp = 15000;
		else temp = 1000;
	}
	
	if( bonus ) temp /= 2;
	
	if( dTime == 0.2 ) rain[0].prob = temp;
	else rain[0].prob = temp*15;
	
	if( Math.random()*temp <= 1 ){
		rain[0].isRain = true;
		rain[0].time = Math.random()*1500 + 500;
	}
	
	if( rain[0].isRain ){
		rain[0].time -= dTime;
		if( rain[0].time <= 0 ){
			rain[0].isRain = false;
			rain[0].time = 0;
			return;
		}
		for( i = 1; i <= rain[0].n; i++ ){
			if( season == 4 ){
				rain[i].y += rain[i].scale * dTime * 4;
			}
			else{
				rain[i].y += rain[i].vy * dTime * 5;
				rain[i].vy += rain[i].scale + 0.5;
			}
			
			rain[i].x -= dx;
			rain[i].y -= dy;
			
			if( rain[i].y > 560 || rain[i].x < -120 || rain[i].x > 840 ){
				rain[i].x = Math.random()*920 - 100;
				rain[i].y = Math.random()*50-70;
				rain[i].vy = 1;
				rain[i].scale = 0.5 + Math.random()*0.5;
			}
		}
	}
};

function printWeather( rain, player, clock, img, context ){
	if( player.mn != 0 ) return;
	var i;
	
	if( rain[0].isRain ){
		for( i = 1; i <= rain[0].n; i++ ){
			if( clock.season == 4 ) context.drawImage( img.snow, 0, 0, 24, 24, rain[i].x, rain[i].y, 24*rain[i].scale, 24*rain[i].scale);
			else context.drawImage( img.rain, 0, 0, 2, 32, rain[i].x, rain[i].y, 2*rain[i].scale, 32*rain[i].scale);
		}
	}
	
	
	context.font = "14px helvetica";
	context.fillStyle = "rgb(255,255,255)";
	if( Math.floor(720000/rain[0].prob) < 100 )
		context.fillText( "강수 확률 : " + Math.floor(720000/rain[0].prob) + "%", 10, 40 );
	else
		context.fillText( "강수 확률 : 99%", 10, 40 );
};