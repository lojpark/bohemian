function initSeedInventory( sinventory, clock, fruitInfo ){	
	sinventory[0] = new Object();
	sinventory[0].n = 12;
	sinventory[0].isOpen = false;
	sinventory[0].sel = 1;
	sinventory[0].delay = 0;
	sinventory[0].isLoo = false;
	
	var i;
	for( i = 1; i <= sinventory[0].n + 8; i++ ){
		sinventory[i] = new Object();
		sinventory[i].type = sinventory[i].cost = 0;
	}
	
	sinventory[1].type = Math.floor( Math.random()*20 ) + 1;
	sinventory[1].cost = fruitInfo.buyCost[sinventory[1].type] + Math.floor( Math.random()*50 ) - 100;
	sinventory[2].type = Math.floor( Math.random()*20 ) + 1;
	sinventory[2].cost = fruitInfo.buyCost[sinventory[2].type] + Math.floor( Math.random()*50 ) - 100;
	for( i = 3; i <= 12; i++ ){
		sinventory[i].type = Math.floor( Math.random()*4 ) + 1 + (clock.season-1)*4;
		sinventory[i].cost = fruitInfo.buyCost[sinventory[i].type] + Math.floor( Math.random()*50 ) - 100;
	}
	for( i = 13; i <= 20; i++ ){
		if( Math.random()*2 <= 1 ){
			sinventory[i].type = Math.floor( Math.random()*4 ) + 17;
			sinventory[i].cost = fruitInfo.buyCost[sinventory[i].type] + Math.floor( Math.random()*100 ) - 200;
		}
		else{
			sinventory[i].type = Math.floor( Math.random()*20 ) + 1;
			sinventory[i].cost = fruitInfo.buyCost[sinventory[i].type] + Math.floor( Math.random()*100 ) - 200;
		}
	}
};

function moveSeedInventory( sinventory, inventory, player, key ){
	if( sinventory[0].isLoo ) sinventory[0].n -= 4;
	
	if( sinventory[0].delay > 0 ) sinventory[0].delay--;
	
	if( key.up && sinventory[0].sel - 4 >= 1 && sinventory[0].delay <= 0 ){
		sinventory[0].sel -= 4;
		sinventory[0].delay = 3;
	}
	if( key.down && sinventory[0].sel + 4 <= sinventory[0].n && sinventory[0].delay <= 0 ){
		sinventory[0].sel += 4;
		sinventory[0].delay = 3;
	}
	if( key.left && sinventory[0].sel - 1 >= 1 && sinventory[0].delay <= 0 ){
		sinventory[0].sel -= 1;
		sinventory[0].delay = 3;
	}
	if( key.right && sinventory[0].sel + 1 <= sinventory[0].n && sinventory[0].delay <= 0 ){
		sinventory[0].sel += 1;
		sinventory[0].delay = 3;
	}
	
	if( sinventory[0].isLoo ) sinventory[0].sel += sinventory[0].isLoo*12;
	if( sinventory[ sinventory[0].sel ].type != 0 && ( key.enter || key.z ) && player.money >= sinventory[ sinventory[0].sel ].cost ){
		player.money -= sinventory[ sinventory[0].sel ].cost;
		addInventory( inventory, sinventory[ sinventory[0].sel ].type );
		sinventory[ sinventory[0].sel ].type = sinventory[ sinventory[0].sel ].cost = 0;
		cleanInventory( inventory );
		key.z = false;
		key.enter = false;
	}
	
	if( sinventory[0].isLoo ){
		sinventory[0].n += 4;
		sinventory[0].sel -= sinventory[0].isLoo*12;
	}
};

function printSeedInfo( type, cost, sx, sy, context ){
	if( type == 0 ) return;
	context.fillStyle = "rgba(0, 0, 0, 0.5)";
	context.fillRect( sx, sy, 100, 80 );
	context.font = "bold 15px helvetica";
	context.fillStyle = "rgb(255,255,255)";
	switch( type ){
		case 1:  context.fillText( "고추 씨앗", sx + 10, sy + 20 ); break;
		case 2:  context.fillText( "시금치 씨앗", sx + 10, sy + 20 ); break;
		case 3:  context.fillText( "딸기 씨앗", sx + 10, sy + 20 ); break;
		case 4:  context.fillText( "토마토 씨앗", sx + 10, sy + 20 ); break;
		case 5:  context.fillText( "오이 씨앗", sx + 10, sy + 20 ); break;
		case 6:  context.fillText( "참외 씨앗", sx + 10, sy + 20 ); break;
		case 7:  context.fillText( "수박 씨앗", sx + 10, sy + 20 ); break;
		case 8:  context.fillText( "메론 씨앗", sx + 10, sy + 20 ); break;
		case 9:  context.fillText( "깻잎 씨앗", sx + 10, sy + 20 ); break;
		case 10: context.fillText( "파 씨앗", sx + 10, sy + 20 ); break;
		case 11: context.fillText( "팥 씨앗", sx + 10, sy + 20 ); break;
		case 12: context.fillText( "피망 씨앗", sx + 10, sy + 20 ); break;
		case 13: context.fillText( "매실 씨앗", sx + 10, sy + 20 ); break;
		case 14: context.fillText( "귤 씨앗", sx + 10, sy + 20 ); break;
		case 15: context.fillText( "배추 씨앗", sx + 10, sy + 20 ); break;
		case 16: context.fillText( "석류 씨앗", sx + 10, sy + 20 ); break;
		case 17: context.fillText( "선두 씨앗", sx + 10, sy + 20 ); break;
		case 18: context.fillText( "불로초 씨앗", sx + 10, sy + 20 ); break;
		case 19: context.fillText( "만년삼 씨앗", sx + 10, sy + 20 ); break;
		case 20: context.fillText( "천도복 씨앗", sx + 10, sy + 20 ); break;
	}
	
	context.font = "14px helvetica";
	if( type <= 4 ) context.fillText( "봄 작물", sx + 10, sy + 50 );
	else if( type <= 8 ) context.fillText( "여름 작물", sx + 10, sy + 50 );
	else if( type <= 12 ) context.fillText( "가을 작물", sx + 10, sy + 50 );
	else if( type <= 16 ) context.fillText( "겨울 작물", sx + 10, sy + 50 );
	else context.fillText( "사계절 작물", sx + 10, sy + 50 );
	context.fillText( cost + "G", sx + 10, sy + 70 );
};

function printSeedInventory( sinventory, player, img, context ){
	if( !sinventory[0].isOpen ) return;
	var i, x, y, sx = 0, sy = 0;
	
	if( sinventory[0].isLoo ) sinventory[0].n -= 4;
	
	context.fillStyle = "rgb(255,255,255)";
	context.fillRect( 360 - 34*2, 270 - 34*sinventory[0].n/8, 34*4 + 2, 34*sinventory[0].n/4 + 2 );
	context.fillRect( 360 - 34*2, 270 - 34*sinventory[0].n/8 - 20, 34*4 + 2, 20 );
	context.fillStyle = "rgb(0,0,0)";
	context.font = "14px helvetica";
	context.fillText( "소지금 : " + player.money + "G", 360 - 34*2 + 3, 270 - 34*sinventory[0].n/8 - 5 );
	
	x = 360 - 34*2 + 2;
	y = 270 - 34*sinventory[0].n/8 + 2;
	for( i = 1 + sinventory[0].isLoo*12; i <= sinventory[0].n + sinventory	[0].isLoo*12; i++ ){
		context.drawImage( img.square, 0, 0, 32, 32, x, y, 32, 32);
		context.drawImage( img.seed, 32*(sinventory[i].type-1), 0, 32, 32, x, y, 32, 32);
		if( sinventory[0].sel + sinventory[0].isLoo*12 == i ){
			context.fillStyle = "rgba(0, 0, 0, 0.1)";
			context.fillRect( x, y, 32, 32 );
			sx = x + 15;
			sy = y + 15;
		}
		x += 34;
		if( i % 4 == 0 ){
			x = 360 - 34*2 + 2;
			y += 34;
		}
	}
	
	printSeedInfo( sinventory[sinventory[0].sel+sinventory[0].isLoo*12].type, sinventory[sinventory[0].sel+sinventory[0].isLoo*12].cost, sx, sy, context );
	
	if( sinventory[0].isLoo ) sinventory[0].n += 4;
};