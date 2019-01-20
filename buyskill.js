function initSkillInventory( kinventory ){	
	kinventory[0] = new Object();
	kinventory[0].n = 8;
	kinventory[0].isOpen = false;
	kinventory[0].sel = 1;
	kinventory[0].delay = 0;
	
	var i;
	for( i = 1; i <= kinventory[0].n; i++ ){
		kinventory[i] = new Object();
		kinventory[i].type = i;
		kinventory[i].cost = 3000;
	}
	kinventory[7].cost = 20000;
};

function moveSkillInventory( kinventory, inventory, player, key ){	
	if( kinventory[0].delay > 0 ) kinventory[0].delay--;
	
	if( key.up && kinventory[0].sel - 4 >= 1 && kinventory[0].delay <= 0 ){
		kinventory[0].sel -= 4;
		kinventory[0].delay = 3;
	}
	if( key.down && kinventory[0].sel + 4 <= kinventory[0].n && kinventory[0].delay <= 0 ){
		kinventory[0].sel += 4;
		kinventory[0].delay = 3;
	}
	if( key.left && kinventory[0].sel - 1 >= 1 && kinventory[0].delay <= 0 ){
		kinventory[0].sel -= 1;
		kinventory[0].delay = 3;
	}
	if( key.right && kinventory[0].sel + 1 <= kinventory[0].n && kinventory[0].delay <= 0 ){
		kinventory[0].sel += 1;
		kinventory[0].delay = 3;
	}
	
	if( kinventory[ kinventory[0].sel ].type != 0 && ( key.enter || key.z ) && player.money >= kinventory[ kinventory[0].sel ].cost ){
		player.money -= kinventory[ kinventory[0].sel ].cost;
		
		/* 체력 */
		if( kinventory[ kinventory[0].sel ].type % 8 == 5 ){
			kinventory[ kinventory[0].sel ].type += 8;
			player.maxhp += 30;
			if( kinventory[ kinventory[0].sel ].type <= 16 ) kinventory[ kinventory[0].sel ].cost = 7000;
			else if( kinventory[ kinventory[0].sel ].type <= 24 ) kinventory[ kinventory[0].sel ].cost = 15000;
			else{
				kinventory[ kinventory[0].sel ].type = kinventory[ kinventory[0].sel ].cost = 0;
			}
		}
		/* 지구력 */
		else if( kinventory[ kinventory[0].sel ].type % 8 == 6 ){
			kinventory[ kinventory[0].sel ].type += 8;
			player.stamina -= 0.2;
			if( kinventory[ kinventory[0].sel ].type <= 16 ) kinventory[ kinventory[0].sel ].cost = 7000;
			else if( kinventory[ kinventory[0].sel ].type <= 24 ) kinventory[ kinventory[0].sel ].cost = 15000;
			else{
				kinventory[ kinventory[0].sel ].type = kinventory[ kinventory[0].sel ].cost = 0;
			}
		}
		/* 주변 관수 */
		else if( kinventory[ kinventory[0].sel ].type % 8 == 7 ){
			kinventory[ kinventory[0].sel ].type += 8;
			player.waterSkill += 4;
			if( kinventory[ kinventory[0].sel ].type <= 16 ) kinventory[ kinventory[0].sel ].cost = 40000;
			else{
				kinventory[ kinventory[0].sel ].type = kinventory[ kinventory[0].sel ].cost = 0;
			}
		}
		/* 작물 구별 */
		else if( kinventory[ kinventory[0].sel ].type % 8 == 0 ){
			player.classSkill = 1;
			kinventory[ kinventory[0].sel ].type = kinventory[ kinventory[0].sel ].cost = 0;
		}
		/* 개간, 파종, 관수, 수확 */
		else{
			kinventory[ kinventory[0].sel ].type += 8;
			player.skill[ kinventory[0].sel ] -= 5;
			if( kinventory[ kinventory[0].sel ].type <= 12 ) kinventory[ kinventory[0].sel ].cost = 5000;
			else if( kinventory[ kinventory[0].sel ].type <= 20 ) kinventory[ kinventory[0].sel ].cost = 7500;
			else if( kinventory[ kinventory[0].sel ].type <= 28 ) kinventory[ kinventory[0].sel ].cost = 10000;
			else if( kinventory[ kinventory[0].sel ].type <= 36 ) kinventory[ kinventory[0].sel ].cost = 15000;
			else if( kinventory[ kinventory[0].sel ].type <= 44 ) kinventory[ kinventory[0].sel ].cost = 20000;
			else{
				kinventory[ kinventory[0].sel ].type = kinventory[ kinventory[0].sel ].cost = 0;
			}
		}
		
		key.z = false;
		key.enter = false;
	}
};

function printSkillInfo( type, cost, sx, sy, context ){
	if( type == 0 ) return;
	context.fillStyle = "rgba(0, 0, 0, 0.5)";
	context.fillRect( sx, sy, 130, 100 );
	context.font = "bold 15px helvetica";
	context.fillStyle = "rgb(255,255,255)";
	switch( type ){
		case 1:  context.fillText( "개간 Lv.1", sx + 10, sy + 20 ); break;
		case 2:  context.fillText( "파종 Lv.1", sx + 10, sy + 20 ); break;
		case 3:  context.fillText( "관수 Lv.1", sx + 10, sy + 20 ); break;
		case 4:  context.fillText( "수확 Lv.1", sx + 10, sy + 20 ); break;
		case 5:  context.fillText( "체력 Lv.1", sx + 10, sy + 20 ); break;
		case 6:  context.fillText( "지구력 Lv.1", sx + 10, sy + 20 ); break;
		case 7:  context.fillText( "주변 관수 Lv.1", sx + 10, sy + 20 ); break;
		case 8:  context.fillText( "작물 구별 Lv.M", sx + 10, sy + 20 ); break;
		case 9:  context.fillText( "개간 Lv.2", sx + 10, sy + 20 ); break;
		case 10:  context.fillText( "파종 Lv.2", sx + 10, sy + 20 ); break;
		case 11:  context.fillText( "관수 Lv.2", sx + 10, sy + 20 ); break;
		case 12:  context.fillText( "수확 Lv.2", sx + 10, sy + 20 ); break;
		case 13:  context.fillText( "체력 Lv.2", sx + 10, sy + 20 ); break;
		case 14:  context.fillText( "지구력 Lv.2", sx + 10, sy + 20 ); break;
		case 15:  context.fillText( "주변 관수 Lv.M", sx + 10, sy + 20 ); break;
		case 17:  context.fillText( "개간 Lv.3", sx + 10, sy + 20 ); break;
		case 18:  context.fillText( "파종 Lv.3", sx + 10, sy + 20 ); break;
		case 19:  context.fillText( "관수 Lv.3", sx + 10, sy + 20 ); break;
		case 20:  context.fillText( "수확 Lv.3", sx + 10, sy + 20 ); break;
		case 21:  context.fillText( "체력 Lv.M", sx + 10, sy + 20 ); break;
		case 22:  context.fillText( "지구력 Lv.M", sx + 10, sy + 20 ); break;
		case 25:  context.fillText( "개간 Lv.4", sx + 10, sy + 20 ); break;
		case 26:  context.fillText( "파종 Lv.4", sx + 10, sy + 20 ); break;
		case 27:  context.fillText( "관수 Lv.4", sx + 10, sy + 20 ); break;
		case 28:  context.fillText( "수확 Lv.4", sx + 10, sy + 20 ); break;
		case 33:  context.fillText( "개간 Lv.5", sx + 10, sy + 20 ); break;
		case 34:  context.fillText( "파종 Lv.5", sx + 10, sy + 20 ); break;
		case 35:  context.fillText( "관수 Lv.5", sx + 10, sy + 20 ); break;
		case 36:  context.fillText( "수확 Lv.5", sx + 10, sy + 20 ); break;
		case 41:  context.fillText( "개간 Lv.M", sx + 10, sy + 20 ); break;
		case 42:  context.fillText( "파종 Lv.M", sx + 10, sy + 20 ); break;
		case 43:  context.fillText( "관수 Lv.M", sx + 10, sy + 20 ); break;
		case 44:  context.fillText( "수확 Lv.M", sx + 10, sy + 20 ); break;
	}
	
	context.font = "14px helvetica";
	if( type % 8 == 1 ){
		context.fillText( "개간 속도", sx + 10, sy + 50 );
		context.fillText( "15% 상승", sx + 10, sy + 70 );
	}
	if( type % 8 == 2 ){
		context.fillText( "파종 속도", sx + 10, sy + 50 );
		context.fillText( "15% 상승", sx + 10, sy + 70 );
	}
	if( type % 8 == 3 ){
		context.fillText( "관수 속도", sx + 10, sy + 50 );
		context.fillText( "15% 상승", sx + 10, sy + 70 );
	}
	if( type % 8 == 4 ){
		context.fillText( "수확 속도", sx + 10, sy + 50 );
		context.fillText( "15% 상승", sx + 10, sy + 70 );
	}
	if( type % 8 == 5 ){
		context.fillText( "최대 체력", sx + 10, sy + 50 );
		context.fillText( "30 증가", sx + 10, sy + 70 );
	}
	if( type % 8 == 6 ){
		context.fillText( "소모 체력", sx + 10, sy + 50 );
		context.fillText( "20% 감소", sx + 10, sy + 70 );
	}
	if( type % 8 == 7 ){
		context.fillText( "주변 4방향", sx + 10, sy + 50 );
		context.fillText( "한 번에 관수", sx + 10, sy + 70 );
	}
	if( type % 8 == 0 ){
		context.fillText( "z키를 눌러", sx + 10, sy + 50 );
		context.fillText( "작물 구별 가능", sx + 10, sy + 70 );
	}
	context.fillText( cost + "G", sx + 10, sy + 90 );
};

function printSkillInventory( kinventory, player, img, context ){
	if( !kinventory[0].isOpen ) return;
	var i, x, y, sx = 0, sy = 0;
	
	context.fillStyle = "rgb(255,255,255)";
	context.fillRect( 360 - 34*2, 270 - 34*kinventory[0].n/8, 34*4 + 2, 34*kinventory[0].n/4 + 2 );
	context.fillRect( 360 - 34*2, 270 - 34*kinventory[0].n/8 - 20, 34*4 + 2, 20 );
	context.fillStyle = "rgb(0,0,0)";
	context.font = "14px helvetica";
	context.fillText( "소지금 : " + player.money + "G", 360 - 34*2 + 3, 270 - 34*kinventory[0].n/8 - 5 );
	
	x = 360 - 34*2 + 2;
	y = 270 - 34*kinventory[0].n/8 + 2;
	for( i = 1; i <= kinventory[0].n; i++ ){
		context.drawImage( img.square, 0, 0, 32, 32, x, y, 32, 32);
		context.drawImage( img.seed, 32*(kinventory[i].type-1), 0, 32, 32, x, y, 32, 32);
		if( kinventory[0].sel == i ){
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
	
	printSkillInfo( kinventory[kinventory[0].sel].type, kinventory[kinventory[0].sel].cost, sx, sy, context );
};