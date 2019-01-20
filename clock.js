function initClock( clock ){
	clock.time = 480;
	clock.season = 1;
	clock.day = 1;
};

function moveClock( clock, player, npc, gTable, inventory, sinventory, kinventory, fruitInfo, rain, pet, house, textbox, db ){
	var dTime = 0.2;
	
	if( player.isSleep ){
		dTime = 3;
		player.sleepTime += 3;
		if( player.stress > 3 ) player.stress -= 3;
		if( player.maxSleepTime < 100 ) player.viewY = Math.sin( player.sleepTime/player.maxSleepTime*Math.PI ) * 10;
		else if( player.maxSleepTime < 200 ) player.viewY = Math.sin( player.sleepTime/player.maxSleepTime*Math.PI ) * 30;
		else if( player.maxSleepTime < 300 ) player.viewY = Math.sin( player.sleepTime/player.maxSleepTime*Math.PI ) * 60;
		else if( player.maxSleepTime < 400 ) player.viewY = Math.sin( player.sleepTime/player.maxSleepTime*Math.PI ) * 100;
		else if( player.maxSleepTime < 500 ) player.viewY = Math.sin( player.sleepTime/player.maxSleepTime*Math.PI ) * 150;
		else player.viewY = Math.sin( player.sleepTime/player.maxSleepTime*Math.PI ) * 200;
		
		if( player.hp < player.maxhp ) player.hp += 0.5;
	}
	else if( player.nap > 0 ){
		dTime = 3;
		if( player.hp < player.maxhp ) player.hp += 0.5;
		
		player.nap--;
		if( player.stress > 1 ) player.stress -= 1;
		if( player.nap <= 0 ){ // 휴식이 끝나면
			player.y += 3; // 바로 외출.
			player.action = 5;
			player.motion = player.motionDelay = 0;
		}
	}
	else if( player.isFaint ){
		dTime = 6;
		if( player.stress > 1 ) player.stress -= 0.1;
		player.hp += 0.075;
		if( player.hp > 20 ) player.isFaint = false;
	}
	
	/* 체력 소모 */
	if( !player.isSleep && player.nap <= 0 && !player.isFaint ){
		var temp = 0.01;
		if( player.stress <= 610 ) temp = 0.01;
		else if( player.stress <= 1000 ) temp = 0.015;
		else if( player.stress <= 1400 ) temp = 0.02;
		else if( player.stress <= 1800 ) temp = 0.03;
		else if( player.stress <= 2200 ) temp = 0.04;
		else if( player.stress <= 2600 ) temp = 0.05;
		else if( player.stress <= 3000 ) temp = 0.06;
		else if( player.stress <= 3400 ) temp = 0.07;
		else if( player.stress <= 3800 ) temp = 0.08;
		else if( player.stress <= 4200 ) temp = 0.09;
		else temp = 0.1;
		
		if( player.action == 0 || player.action == 5 ){
			if( player.isMove ) player.hp -= temp * 2 * player.stamina;
			else player.hp -= temp * player.stamina;
		}
		else player.hp -= temp * 10 * player.stamina;
	}
	/* 기절 */
	if( player.hp <= 0 && !player.isFaint ){
		player.hp = 0;
		player.isFaint = true;
		player.action = 0;
	}
	
	if( pet[7].isAction ) dTime = 3;
	
	moveWeather( rain, dTime, clock.season, player.dx, player.dy, pet[3].isAction );
	for( var i = 1; i <= dTime/0.2; i++ ) movePet( pet, player, npc, house, gTable, textbox );
	
	if( !player.isSleep && player.nap <= 0 && !player.isFaint ) player.stress += dTime;
	clock.time += dTime;
	if( clock.time > 1440 ){
		clock.time = 0;
		clock.day++;
		if( clock.day > 30 ){
			clock.day = 1;
			clock.season++;
			if( clock.season > 4 ){
				clock.season = 1;
			}
		}
		
		/* 루 위치 초기화 */
		if( clock.day % 5 == 0 ){
			npc[4].x = Math.floor( Math.random()*1000+100 );
			if( Math.random()*2 < 1 ) npc[4].y = Math.floor( Math.random()*300+200 );
			else npc[4].y = Math.floor( Math.random()*180+970 );
		}
		else npc[4].x = npc[4].y = -1200;
		
		/* 씨앗 상점 초기화 */
		initSeedInventory( sinventory, clock, fruitInfo );
		/* 루 가게 세일률 초기화 */
		for( var i = 1; i <= 16; i++ ) fruitInfo.onSale[i] = (9 + Math.floor(Math.random()*4)) / 10;
		/* 선물 한도 초기화 */
		npc[1].present = npc[2].present = npc[3].present = npc[4].present = 0;
		/* 대화 한도 초기화 */
		npc[1].talk = npc[2].talk = npc[3].talk = npc[4].talk = 0;
		/* 야생 펫 초기화 */
		for( var i = 1; i <= pet[0].n; i++ ){
			if( !pet[i].isTame ){
				pet[i].isExist = false;
				if( Math.random()*100 < 10 ){
					pet[i].isExist = true;
					pet[i].x = Math.floor( Math.random()*1000+100 );
					if( Math.random()*2 < 1 ) pet[i].y = Math.floor( Math.random()*300+200 );
					else pet[i].y = Math.floor( Math.random()*180+970 );
				}
			}
		}
	}
		
	if( clock.time <= 470 ) player.isSleepChk = true; // 다음날
	if( clock.time > 470 && player.isSleepChk && player.isSleep ){ // 8시가 되면
		player.isSleep = false; // 잠에서 깬다.
		player.y += 3; // 그리고 바로 외출.
		player.action = 5;
		player.motion = player.motionDelay = 0;
		saveFile( db, player, npc, pet, inventory, kinventory, gTable, clock );
	}

	moveCrop( gTable, dTime, rain[0].isRain, clock.season );
};

function printClock( clock, img, context ){
	context.font = "14px helvetica";
	context.fillStyle = "rgb(255,255,255)";
	if( clock.season == 1 ) context.fillText( "봄", 645, 20 );
	if( clock.season == 2 ) context.fillText( "여름", 645, 20 );
	if( clock.season == 3 ) context.fillText( "가을", 645, 20 );
	if( clock.season == 4 ) context.fillText( "겨울", 645, 20 );
	context.fillText( clock.day + "일", 680, 20 );
	context.fillText( Math.floor(clock.time/60) + " : " + Math.floor(clock.time)%60, 645, 40 );
};