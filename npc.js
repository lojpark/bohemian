function initNpc( npc ){
	npc[0] = new Object();
	npc[0].x = npc[0].y = npc[0].value = npc[0].time = 0;
	npc[0].n = 4;
	
	var i;
	for( i = 1; i <= npc[0].n; i++ ){
		npc[i] = new Object();
		npc[i].motion = 0;
		npc[i].motionDelay = 0;
		npc[i].favor = 0;
		npc[i].isPresent = false;
		npc[i].present = 0;
		npc[i].talk = 0;
	}
	
	npc[1].x = 300;
	npc[1].y = -16;
	npc[1].mn = 0;
	npc[2].x = 360;
	npc[2].y = 282;
	npc[2].mn = 1;
	npc[3].x = 360;
	npc[3].y = 282;
	npc[3].mn = 2;
	npc[4].x = -1200;
	npc[4].y = -1200;
	npc[4].mn = 0;
};

function moveNpc( npc ){
	npc[1].motionDelay++;
	if( npc[1].motionDelay > 45 ){
		npc[1].motionDelay = 0;
		npc[1].motion = (npc[1].motion+1) % 2;
	}
	npc[2].motionDelay++;
	if( npc[2].motionDelay > 15 ){
		npc[2].motionDelay = 0;
		npc[2].motion = (npc[2].motion+1) % 2;
	}
	npc[3].motionDelay++;
	if( npc[3].motionDelay > 20 ){
		npc[3].motionDelay = 0;
		npc[3].motion = (npc[3].motion+1) % 2;
	}
	npc[4].motionDelay++;
	if( npc[4].motionDelay > 20 ){
		npc[4].motionDelay = 0;
		npc[4].motion = (npc[4].motion+1) % 2;
	}
};

function addFavor( who, value, npc, textbox ){	
	if( value != 0 ){
		npc[who].favor += value;
		if( npc[who].favor < 0 ) npc[who].favor = 0;
		npc[0].x = npc[who].x-50;
		npc[0].y = npc[who].y+30;
		npc[0].time = 60;
		npc[0].value = value;
		if( textbox != null ) npc[who].present++;
	}
	
	if( textbox == null ) return;
	
	/* 련 */
	if( who == 1 ){
		if( value == 0 ) ryeonScript( 4, textbox, npc );
		else if( value > 0 ) ryeonScript( 2, textbox, npc );
		else ryeonScript( 3, textbox, npc );
	}
	/* 청 */
	if( who == 2 ){
		if( value == 0 ) cheongScript( 4, textbox, npc );
		else if( value > 0 ) cheongScript( 2, textbox, npc );
		else cheongScript( 3, textbox, npc );
	}
	/* 진 */
	if( who == 3 ){
		if( value == 0 ) jinScript( 4, textbox, npc );
		else if( value > 0 ) jinScript( 2, textbox, npc );
		else jinScript( 3, textbox, npc );
	}
	/* 루 */
	if( who == 4 ){
		if( value == 0 ) looScript( 4, textbox, npc );
		else if( value > 0 ) looScript( 2, textbox, npc );
		else looScript( 3, textbox, npc );
	}
};

function printFavor( npc, player, context ){
	if( npc[0].time <= 0 ) return;
	
	npc[0].time--;
	npc[0].y--;
	
	context.font = "bold 12px helvetica";
	
	if( npc[0].value < 0 ){
		context.fillStyle = "rgb(255,0,0)";
		if( player.mn == 0 ) context.fillText( "호감도 - " + (npc[0].value*-1), 360 + npc[0].x - player.x + player.viewX, 270 + npc[0].y - player.y + player.viewY );
		else context.fillText( "호감도 - " + (npc[0].value*-1), npc[0].x, npc[0].y );
	}
	else{
		context.fillStyle = "rgb(0,0,255)";
		if( player.mn == 0 ) context.fillText( "호감도 + " + npc[0].value, 360 + npc[0].x - player.x + player.viewX, 270 + npc[0].y - player.y + player.viewY );
		else context.fillText( "호감도 + " + npc[0].value, npc[0].x, npc[0].y );
	}
	context.shadowColor = "rgba(0, 0, 0, 0)";
};

function printNpc1( npc, player, img, context ){
	if( player.mn == 0 && player.y > npc[1].y ){
		context.drawImage( img.ryeon, npc[1].motion*32, 0, 32, 48, 360-16+npc[1].x-player.x + player.viewX, 270-24+npc[1].y-player.y + player.viewY, 32, 48 );
	}
	if( player.mn == 1 && player.y > npc[2].y ){
		context.drawImage( img.cheong, npc[2].motion*32, 0, 32, 48, -16+npc[2].x, -24+npc[2].y, 32, 48 );
	}
	if( player.mn == 2 && player.y > npc[3].y ){
		context.drawImage( img.jin, npc[3].motion*32, 0, 32, 48, -16+npc[3].x, -24+npc[3].y, 32, 48 );
	}
	if( player.mn == 0 && player.y > npc[4].y ){
		context.drawImage( img.loo, npc[4].motion*32, 0, 32, 48, 360-16+npc[4].x-player.x + player.viewX, 270-24+npc[4].y-player.y + player.viewY, 32, 48 );
	}
};
function printNpc2( npc, player, img, context ){
	if( player.mn == 0 && player.y <= npc[1].y ){
		context.drawImage( img.ryeon, npc[1].motion*32, 0, 32, 48, 360-16+npc[1].x-player.x + player.viewX, 270-24+npc[1].y-player.y + player.viewY, 32, 48 );
	}
	if( player.mn == 1 && player.y <= npc[2].y ){
		context.drawImage( img.cheong, npc[2].motion*32, 0, 32, 48, -16+npc[2].x, -24+npc[2].y, 32, 48 );
	}
	if( player.mn == 2 && player.y <= npc[3].y ){
		context.drawImage( img.jin, npc[3].motion*32, 0, 32, 48, -16+npc[3].x, -24+npc[3].y, 32, 48 );
	}
	if( player.mn == 0 && player.y <= npc[4].y ){
		context.drawImage( img.loo, npc[4].motion*32, 0, 32, 48, 360-16+npc[4].x-player.x + player.viewX, 270-24+npc[4].y-player.y + player.viewY, 32, 48 );
	}
};