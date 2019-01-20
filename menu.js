function initMenu( menu, type ){
	menu.type = type;
	menu.sel = 1;
	if( type == 1 ) menu.max = 2;
	if( type == 2 ) menu.max = 2;
	if( type == 3 ) menu.max = 3;
	if( type == 4 ) menu.max = 4;
	if( type == 5 ) menu.max = 4;
	if( type == 7 ) menu.max = 3;
	if( type == 8 ) menu.max = 6;
	if( type == 9 ) menu.max = 2;
	if( type == 0 ) menu.max = 2;
	if( type >= 10 ) menu.max = 2;
	menu.ani = menu.height = 0;
	menu.delay = 0;
};

function moveMenu( menu, player, npc, pet, inventory, sinventory, kinventory, textbox, clock, key ){
	if( menu.height < menu.max*20 + 30 ) return;
	if( menu.delay > 0 ) menu.delay--;
	
	if( key.up && menu.sel > 1 && menu.delay <= 0 ){
		menu.sel--;
		menu.delay = 3;
	}
	if( key.down && menu.sel < menu.max && menu.delay <= 0 ){
		menu.sel++;
		menu.delay = 3;
	}
	if( key.enter || key.z ){
		/* 집 */
		if( menu.type == 1 || menu.type == 7 ){
			if( menu.sel == 1 ){
				/* 잠자기 */
				if( clock.time < 470 || clock.time > 1080 ){
					player.isSleep = true;
					player.isSleepChk = false;
					player.sleepTime = 0;
					if( clock.time < 470 ) player.maxSleepTime = 470 - clock.time;
					else player.maxSleepTime = 470 + 1440 - clock.time;
				}
				/* 휴식하기 */
				else{
					player.nap = 50;
				}
			}
			else if( menu.sel == 2 ){
				player.y += 3;
				player.action = 5;
				player.motion = player.motionDelay = 0;
			}
			else if( menu.sel == 3 ){
				key.z = false;
				key.enter = false;
				menu.type = 0;
				player.x = 599;
				player.y = 218;
				return -1;
			}
		}
		/* 련 */
		if( menu.type == 2 ){
			/* 대화 */
			if( menu.sel == 1 ){
				ryeonScript( 1, textbox, npc );
				if( Math.random()*5 < 1 ){
					if( npc[1].talk < 2 ) addFavor( 1, 1, npc );
					else addFavor( 1, -1, npc );
					npc[1].talk++;
				}
			}
			/* 선물 */
			if( menu.sel == 2 ){
				inventory[0].isOpen = true;
				inventory[0].type = 2;
				npc[2].isPresent = npc[3].isPresent = npc[4].isPresent = false;
				npc[1].isPresent = true;
			}
		}
		/* 청 */
		if( menu.type == 3 ){
			/* 대화 */
			if( menu.sel == 1 ){
				cheongScript( 1, textbox, npc );
				if( Math.random()*5 < 1 ){
					if( npc[2].talk < 2 ) addFavor( 2, 1, npc );
					npc[2].talk++;
				}
			}
			/* 씨앗 사기 */
			if( menu.sel == 2 ){
				sinventory[0].isOpen = true;
				sinventory[0].sel = 1;
			}
			/* 선물 */
			if( menu.sel == 3 ){
				inventory[0].isOpen = true;
				inventory[0].type = 2;
				npc[1].isPresent = npc[3].isPresent = npc[4].isPresent = false;
				npc[2].isPresent = true;
			}
		}
		/* 진 */
		if( menu.type == 4 ){
			/* 대화 */
			if( menu.sel == 1 ){
				jinScript( 1, textbox, npc );
				if( Math.random()*5 < 1 ){
					if( npc[3].talk < 2 ) addFavor( 3, 1, npc );
					npc[3].talk++;
				}
			}
			/* 열매 팔기 */
			if( menu.sel == 2 ){
				inventory[0].isOpen = true;
				inventory[0].type = 1;
			}
			/* 기술 배우기 */
			if( menu.sel == 3 ){
				kinventory[0].isOpen = true;
				kinventory[0].sel = 1;
			}
			/* 선물 */
			if( menu.sel == 4 ){
				inventory[0].isOpen = true;
				inventory[0].type = 2;
				npc[1].isPresent = npc[2].isPresent = npc[4].isPresent = false;
				npc[3].isPresent = true;
			}
		}
		/* 루 */
		if( menu.type == 5 ){
			/* 대화 */
			if( menu.sel == 1 ){
				looScript( 1, textbox, npc );
				if( Math.random()*5 < 1 ){
					if( npc[4].talk < 2 ) addFavor( 4, 1, npc );
					npc[4].talk++;
				}
			}
			/* 씨앗 사기 */
			if( menu.sel == 2 ){
				sinventory[0].isOpen = true;
				sinventory[0].isLoo = true;
				sinventory[0].sel = 1;
			}
			/* 열매 팔기 */
			if( menu.sel == 3 ){
				inventory[0].isOpen = true;
				inventory[0].type = 3;
			}
			/* 선물 */
			if( menu.sel == 4 ){
				inventory[0].isOpen = true;
				inventory[0].type = 2;
				npc[1].isPresent = npc[2].isPresent = npc[3].isPresent = false;
				npc[4].isPresent = true;
			}
		}
		/* 야생 펫 */
		if( menu.type >= 10 && menu.type < 20 ){
			/* 먹이 주기 */
			if( menu.sel == 1 ){
				inventory[0].isOpen = true;
				inventory[0].type = 4;
			}
			/* 길들이기 */
			if( menu.sel == 2 ){
				if( Math.random()*10 < pet[player.nearPet].favor ){
					pet[player.nearPet].isTame = true;
					pet[player.nearPet].favor = 1;
					initTextbox( textbox, player.x, player.y, 1, "길들였다!", true );
				}
				else{
					initTextbox( textbox, player.x, player.y, 1, "도망쳤다!", true );
					pet[player.nearPet].isExist = false;
				}
			}
		}
		/* 길들인 펫 */
		if( menu.type >= 20 ){
			/* 먹이 주기 */
			if( menu.sel == 1 ){
				inventory[0].isOpen = true;
				inventory[0].type = 4;
			}
			/* 특수 능력 */
			if( menu.sel == 2 ){
				if( player.nearPet == 6 && pet[player.nearPet].mp < pet[player.nearPet].maxmp ){
					initTextbox( textbox, player.x, player.y, 1, "사랑이 부족해.", true );
				}
				else{
					pet[player.nearPet].isAction = true;
				}
			}
		}
		key.z = false;
		key.enter = false;
		menu.type = 0;
	}
	
	return 0;
};

function moveIntroMenu( menu, key ){
	if( menu.height < menu.max*20 + 30 ) return 0;
	if( menu.delay > 0 ) menu.delay--;
	
	if( key.up && menu.sel > 1 && menu.delay <= 0 ){
		menu.sel--;
		menu.delay = 3;
	}
	if( key.down && menu.sel < menu.max && menu.delay <= 0 ){
		menu.sel++;
		menu.delay = 3;
	}
	if( key.enter || key.z ){
		key.z = false;
		key.enter = false;
		menu.type = 0;
		return menu.sel;
	}
	return 0;
};

function printMenu( menu, npc, pet, clock, img, context ){
	/* 메뉴 배경 */
	context.fillStyle = "rgb(255,255,255)";
	context.shadowBlur = 5;
	context.shadowOffsetX = 5;
	context.shadowOffsetY = 5;
	context.shadowColor = "rgba(0, 0, 0, 0.5)";
	context.fillRect(360 - 50, 270 - 30, 100, menu.height);
	context.shadowColor = "rgba(0, 0, 0, 0)";
	
	if( menu.height < menu.max*20 + 30 ){
		menu.height = Math.sin(menu.ani*Math.PI/180) * (menu.max*20 + 30);
		menu.ani += 6;
		return;
	}
	
	/* 선택 바 */
	context.fillStyle = "rgba(0,0,0,0.2)";
	context.fillRect(360 - 50, 270+(menu.sel-1)*20, 100, 20);
	
	/* 메뉴 제목 */
	context.font = "bold 15px helvetica";
	context.fillStyle = "rgb(0,0,0)";
	if( menu.type == 1 ) context.fillText( "집", 320, 260 );
	if( menu.type == 2 ) context.fillText( "련", 320, 260 );
	if( menu.type == 3 ) context.fillText( "청", 320, 260 );
	if( menu.type == 4 ) context.fillText( "진", 320, 260 );
	if( menu.type == 5 ) context.fillText( "루", 320, 260 );
	if( menu.type == 7 ) context.fillText( "집", 320, 260 );
	if( menu.type == 8 ) context.fillText( "선택", 320, 260 );
	if( menu.type == 9 ) context.fillText( "선택", 320, 260 );
	if( menu.type >= 10 ){
		switch( menu.type % 10 ){
			case 1:
				context.fillText( "방울이", 320, 260 ); break;
			case 2:
				context.fillText( "둥실이", 320, 260 ); break;
			case 3:
				context.fillText( "맑음이", 320, 260 ); break;
			case 4:
				context.fillText( "반딧불", 320, 260 ); break;
			case 5:
				context.fillText( "영양이", 320, 260 ); break;
			case 6:
				context.fillText( "사랑이", 320, 260 ); break;
			case 7:
				context.fillText( "BMO", 320, 260 ); break;
			case 8:
				context.fillText( "북실이", 320, 260 ); break;
		}
	}
	if( menu.type > 1 && menu.type <= 5 ) context.fillText( "♥  " + npc[menu.type-1].favor, 360, 260 );
	else if( menu.type >= 20 ) context.fillText( "Lv." + pet[menu.type%10].favor, 370, 260 );
	else if( menu.type >= 10 ) context.fillText( "♥ " + pet[menu.type%10].favor, 380, 260 );
	
	/* 메뉴 항목 */
	context.font = "14px helvetica";
	if( menu.type == 1 ){ // 집
		if( clock.time < 470 || clock.time > 1080 ) context.fillText( "잠자기", 320, 285 );
		else context.fillText( "휴식하기", 320, 285 );
		context.fillText( "외출하기", 320, 305 );
	}
	if( menu.type == 2 ){ // 련
		context.fillText( "대화하기", 320, 285 );
		context.fillText( "선물하기", 320, 305 );
	}
	if( menu.type == 3 ){ // 청
		context.fillText( "대화하기", 320, 285 );
		context.fillText( "씨앗 사기", 320, 305 );
		context.fillText( "선물하기", 320, 325 );
	}
	if( menu.type == 4 ){ // 진
		context.fillText( "대화하기", 320, 285 );
		context.fillText( "열매 팔기", 320, 305 );
		context.fillText( "기술 배우기", 320, 325 );
		context.fillText( "선물하기", 320, 345 );
	}
	if( menu.type == 5 ){ // 루
		context.fillText( "대화하기", 320, 285 );
		context.fillText( "씨앗 사기", 320, 305 );
		context.fillText( "열매 팔기", 320, 325 );
		context.fillText( "선물하기", 320, 345 );
	}
	
	if( menu.type == 7 ){ // 집(엔딩 조건 완료)
		if( clock.time < 470 || clock.time > 1080 ) context.fillText( "잠자기", 320, 285 );
		else context.fillText( "휴식하기", 320, 285 );
		context.fillText( "외출하기", 320, 305 );
		context.fillText( "집으로", 320, 325 );
	}
	if( menu.type == 8 ){ // 직업 선택
		context.fillText( "의사", 320, 285 );
		context.fillText( "판사", 320, 305 );
		context.fillText( "검사", 320, 325 );
		context.fillText( "변호사", 320, 345 );
		context.fillText( "셰프", 320, 365 );
		context.fillText( "CEO", 320, 385 );
	}
	if( menu.type == 9 ){ // 결말 선택
		context.fillText( "돌아갈래!", 320, 285 );
		context.fillText( "필요 없어", 320, 305 );
	}
	
	if( menu.type >= 10 && menu.type < 20 ){ // 야생 펫
		context.fillText( "먹이 주기", 320, 285 );
		context.fillText( "길들이기", 320, 305 );
	}
	if( menu.type >= 20 ){ // 길들인 펫
		context.fillText( "먹이 주기", 320, 285 );
		switch( menu.type % 10 ){
			case 1:
				context.fillText( "물장구 치기", 320, 305 ); break;
			case 2:
				context.fillText( "올라타기", 320, 305 ); break;
			case 3:
				context.fillText( "뒤집기", 320, 305 ); break;
			case 4:
				context.fillText( "휴식하기", 320, 305 ); break;
			case 5:
				context.fillText( "거름 뿌리기", 320, 305 ); break;
			case 6:
				context.fillText( "사랑 전하기", 320, 305 ); break;
			case 7:
				context.fillText( "게임하기", 320, 305 ); break;
			case 8:
				context.fillText( "부비부비", 320, 305 ); break;
		}
	}
};

function printIntroMenu( menu, img, context ){
	/* 메뉴 배경 */
	context.fillStyle = "rgb(255,255,255)";
	context.shadowBlur = 5;
	context.shadowOffsetX = 5;
	context.shadowOffsetY = 5;
	context.shadowColor = "rgba(0, 0, 0, 0.5)";
	context.fillRect(360 - 50, 270 - 30, 100, menu.height);
	context.shadowColor = "rgba(0, 0, 0, 0)";
	
	if( menu.height < menu.max*20 + 30 ){
		menu.height = Math.sin(menu.ani*Math.PI/180) * (menu.max*20 + 30);
		menu.ani += 6;
		return;
	}
	
	/* 선택 바 */
	context.fillStyle = "rgba(0,0,0,0.2)";
	context.fillRect(360 - 50, 270+(menu.sel-1)*20, 100, 20);
	
	/* 메뉴 제목 */
	context.font = "bold 15px helvetica";
	context.fillStyle = "rgb(0,0,0)";
	context.fillText( "선택", 320, 260 );
	
	/* 메뉴 항목 */
	context.font = "14px helvetica";
	context.fillText( "이어하기", 320, 285 );
	context.fillText( "새로하기", 320, 305 );
};