function iPH( player, npc, pet, house, menu ){
	var i;
	
	if( menu.type != 0 || player.isSleep || player.nap > 0 ) return;
	
	/* 내 집 */
	if( house[1].x-137 <= player.x && player.x <= house[1].x+137 && house[1].y <= player.y && player.y <= house[1].y+57 ){
		if( player.spd == 6 ){
			player.spd = 3;
			pet[2].y += 80;
			pet[2].motion = 0;
			pet[2].isAction = false;
		}
		if( player.money >= 1000000 && (npc[1].favor >= 100 || npc[2].favor >= 100 || npc[3].favor >= 100 || npc[4].favor >= 100) ) initMenu( menu, 7 );
		else initMenu( menu, 1 );
	}
	
	/* 씨앗 가게 (청) */
	if( player.mn == 0 && house[2].x-137 <= player.x && player.x <= house[2].x+137 && house[2].y <= player.y && player.y <= house[2].y+57 ){
		player.mn = 1;
		player.x = 360;
		player.y = 270+90;
		if( player.spd == 6 ){
			player.spd = 3;
			pet[2].y += 80;
			pet[2].motion = 0;
			pet[2].isAction = false;
		}
	}
	if( player.mn == 1 && player.y > 376 ){
		player.mn = 0;
		player.x = 218;
		player.y = 687;
		player.action = 5;
		player.motion = player.motionDelay = 0;
	}
	
	/* 가게 (진) */
	if( player.mn == 0 && house[3].x-137 <= player.x && player.x <= house[3].x+137 && house[3].y <= player.y && player.y <= house[3].y+57 ){
		player.mn = 2;
		player.x = 360;
		player.y = 270+90;
		if( player.spd == 6 ){
			player.spd = 3;
			pet[2].y += 80;
			pet[2].motion = 0;
			pet[2].isAction = false;
		}
	}
	if( player.mn == 2 && player.y > 376 ){
		player.mn = 0;
		player.x = 884;
		player.y = 882;
		player.action = 5;
		player.motion = player.motionDelay = 0;
	}
};