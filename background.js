function printTile( player, aSky, img, context ){
	if( player.mn != 0 ){
		context.drawImage( img.floor, 0, 0, 274, 250, 360 - 137, 270 - 120, 274, 250);
		var temp = 0;
		if( player.mn == 2 ) temp = 194;
		context.drawImage( img.shelf, temp, 0, 97, 122, 360 - 137, 270 - 120, 97, 122);
		context.drawImage( img.shelf, temp+97, 0, 97, 122, 360 + 137 - 97, 270 - 120, 97, 122);
		return;
	}
	
	var i, j, minY = -1, minX = -1, maxY = 0, maxX = 0;
	if( player.y >= 300 ) minY = -2;
	if( 900 <= player.y && player.y < 960 ) maxY = 1;
	if( player.x >= 400 ) minX = -2;
	if( 830 <= player.x && player.x < 960 ) maxX = 1;
	
	/* 섬 밑 돌 */
	context.drawImage( img.island, 0, 0, 1200, 290, 360 - player.x + player.viewX, 1470 - player.y + player.viewY, 1200, 290);
	
	for(i = minY; i <= 3; i++){
		for(j = minX; j <= 3; j++){
			if( (player.y >= 240 || i >= 0) && (player.y <= 900 || i <= maxY) && (player.x >= 240 || j >= 0) && (player.x <= 830 || j <= maxX) ){
				/* 낮 */
				if( aSky.moon < 1.0 ){
					context.drawImage( img.border, 0, 0, 250, 250, j*240 + 360 - (player.x%240) + player.viewX - 5, i*240 + 270 - (player.y%240) + player.viewY - 5, 250, 250);
					context.drawImage( img.tile, 0, 0, 240, 240, j*240 + 360 - (player.x%240) + player.viewX, i*240 + 270 - (player.y%240) + player.viewY, 240, 240);
				}
				/* 밤 */
				if( aSky.moon > 0.0 ){
					context.globalAlpha = aSky.moon;
					context.drawImage( img.border, 250, 0, 250, 250, j*240 + 360 - (player.x%240) + player.viewX - 5, i*240 + 270 - (player.y%240) + player.viewY - 5, 250, 250);
					context.drawImage( img.tile, 240, 0, 240, 240, j*240 + 360 - (player.x%240) + player.viewX, i*240 + 270 - (player.y%240) + player.viewY, 240, 240);
					context.globalAlpha = 1.0;
				}
			}
		}
	}
};

function printGround( player, gTable, img, context ){
	if( player.mn != 0 ) return;
	
	var i, j;
	for( i = 0; i <= 25; i++ ){
		for( j = 0; j <= 25; j++ ){
			if( i*48+270-player.y+player.viewY < -48 || i*48+270-player.y+player.viewY > 588 ) continue;
			if( j*48+360-player.x+player.viewX < -48 || j*48+360-player.x+player.viewX > 768 ) continue;
			
			/* 땅 */
			if( gTable[i][j].water > 0 ) // 물
				context.drawImage( img.ground, 48, 0, 48, 48, j*48 + 360 - player.x + player.viewX, i*48 + 270 - player.y + player.viewY, 48, 48);
			else if( gTable[i][j].type >= 0 ) // 건조
				context.drawImage( img.ground, 0, 0, 48, 48, j*48 + 360 - player.x + player.viewX, i*48 + 270 - player.y + player.viewY, 48, 48);
		}
	}
};

function initSky( aSky, sun, moon, star ){
	var i;
	
	/* 하늘 알파값 */
	aSky.day = 0.0;
	aSky.twilight = 0.0;
	aSky.moon = 0.0;
	
	/* 해 */
	sun.x = 550;
	sun.y = 70;
	
	/* 달 */
	moon.x = 0;
	moon.y = 150;
	
	/* 별 */
	star[0] = 40;
	for( i = 1; i <= star[0]; i++ ){
		star[i] = new Object();
		star[i].x = Math.random()*820 - 50;
		star[i].y = Math.random()*640 - 50;
		star[i].scale = Math.random()*1 + 0.1;
		star[i].spd = 10 + Math.random()*5;
	}
};

function moveSky( aSky, sun, moon, clock ){
	/* 해 */
	if( clock.time > 360 && clock.time <= 1170 ){
		sun.x = 550 - (clock.time - 360)/810 * 1000;
		sun.y = 70 - Math.sin( (clock.time - 360)/810 * Math.PI ) * 300;
	}
	
	/* 달 */
	if( clock.time <= 420 ){
		moon.y = 100 - Math.sin( (1 - (clock.time)/420) * Math.PI/2 ) * 250;
	}
	if( clock.time > 1020 ){
		moon.y = -400 + Math.sin( Math.PI/2 + (1 - (clock.time - 1020)/420) * Math.PI/2 ) * 250;
	}
	
	/* 하늘 알파값 */
	if( clock.time <= 360 ){
		aSky.day = 0.0;
		aSky.twilight = 0.0;
		aSky.moon = 1.0;
	}
	else if( clock.time > 360 && clock.time <= 420 ){
		aSky.day = 0.0;
		aSky.twilight = (clock.time-360) / 60;
		aSky.moon = 1.0 - (clock.time-360) / 60;
	}
	else if( clock.time > 420 && clock.time <= 450 ){
		aSky.day = 1.0;
		aSky.twilight = 1.0 - (clock.time-420) / 30;
		aSky.moon = 0.0;
	}
	else if( clock.time > 450 && clock.time <= 1020 ){
		aSky.day = 1.0;
		aSky.twilight = 0.0;
		aSky.moon = 0.0;
	}
	else if( clock.time > 1020 && clock.time <= 1080 ){
		aSky.day = 1.0;
		aSky.twilight = (clock.time-1020) / 60;
		aSky.moon = 0.0;
	}
	else if( clock.time > 1080 && clock.time <= 1110 ){
		aSky.day = 1.0;
		aSky.twilight = 1.0;
		aSky.moon = 0.0;
	}
	else if( clock.time > 1110 && clock.time <= 1170 ){
		aSky.day = 0.0;
		aSky.twilight = 1.0 - (clock.time-1110) / 60;
		aSky.moon = (clock.time-1110) / 60;
	}
	else{
		aSky.day = 0.0;
		aSky.twilight = 0.0;
		aSky.moon = 1.0;
	}
};

function printSky( player, sun, moon, star, aSky, img, context ){
	if( player.mn != 0 ){
		context.drawImage( img.none, 0, 0, 720, 540, 0, 0, 720, 540);
		return;
	}
	
	var i;
	/* 하늘 */
	context.globalAlpha = aSky.day;
	context.drawImage( img.day, 0, 0, 720, 540, 0, 0, 720, 540);
	
	context.globalAlpha = aSky.twilight;
	context.drawImage( img.twilight, 0, 0, 720, 540, 0, 0, 720, 540);
	
	/* 해 */
	context.globalAlpha = 1.0 - aSky.moon;
	context.drawImage( img.sun, 0, 0, 96, 96, 360 + sun.x - 48 - player.x/10 + player.viewX/10, 270 + sun.y - 48 - player.y/10 + player.viewY/10, 96, 96);
	
	/* 별 */
	context.globalAlpha = aSky.moon;
	for( i = 1; i <= star[0]; i++ ){
		var s = star[i];
		context.fillStyle = "rgb(255,255,255)";
		context.beginPath();
		context.arc( s.x - player.x/s.spd + player.viewX/s.spd, s.y - player.y/s.spd + player.viewY/s.spd, s.scale+Math.random()*0.2-0.1, 0, Math.PI*2, false);
		context.closePath();
		context.fill();
	}
	
	/* 달 */
	context.drawImage( img.moon, 0, 0, 96, 96, 360 + moon.x - 48 - player.x/10 + player.viewX/10, 270 + moon.y - 48 - player.y/10 + player.viewY/10, 96, 96);
	
	context.globalAlpha = 1.0;
};