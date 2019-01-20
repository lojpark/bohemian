function initHouse( house ){
	house[0] = 3;
	house[1] = new Object();
	house[1].x = 600;
	house[1].y = 54;
	house[2] = new Object();
	house[2].x = 216;
	house[2].y = 630;
	house[3] = new Object();
	house[3].x = 888;
	house[3].y = 823;
};

function printHouse1( house, player, img, context ){
	if( player.mn != 0 ) return;
	
	var i;
	for( i = 1; i <= house[0]; i++ ){
		var h = house[i];
		if( h.x - 137 <= player.x && player.x <= h.x + 137 && h.y+60 <= player.y && player.y <= h.y+130 ){
			context.drawImage( img.door, 41, 0, 41, 53, h.x - 21 + 360 - player.x + player.viewX, h.y + 82 + 270 - player.y + player.viewY, 41, 53);
		}
		else{
			context.drawImage( img.door, 0, 0, 41, 53, h.x - 21 + 360 - player.x + player.viewX, h.y + 82 + 270 - player.y + player.viewY, 41, 53);
		}
		if( player.y <= h.y+110 ) continue;
		context.drawImage( img.house, 288*(i-1), 0, 288, 270, h.x - 144 + 360 - player.x + player.viewX, h.y - 135 + 270 - player.y + player.viewY, 288, 270);
	}
};
function printHouse2( house, player, img, context ){
	if( player.mn != 0 ) return;
	
	var i;
	for( i = 1; i <= house[0]; i++ ){
		var h = house[i];
		if( player.y > h.y+110 ) continue;
		context.drawImage( img.house, 288*(i-1), 0, 288, 270, h.x - 144 + 360 - player.x + player.viewX, h.y - 135 + 270 - player.y + player.viewY, 288, 270);
	}
};