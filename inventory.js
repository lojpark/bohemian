function initInventory( inventory ){
	inventory[0] = new Object();
	inventory[0].n = 4;
	inventory[0].isOpen = false;
	inventory[0].sel = 1;
	inventory[0].delay = 0;
	inventory[0].target = 0;
	inventory[0].tail = 1;
	inventory[0].type = 0;
	
	var i;
	for( i = 1; i <= 40; i++ ){
		inventory[i] = new Object();
		inventory[i].type = 0;
		inventory[i].number = 0;
	}
	
	/* 모든 열매 획득 */
	/*for( i = 1; i <= 20; i++ ){
		inventory[i].type = i;
		inventory[i].number = 30;
	}
	for( i = 21; i <= 40; i++ ){
		inventory[i].type = 100 + i - 20;
		inventory[i].number = 30;
	}
	inventory[0].n = 40;
	inventory[0].tail = 41;*/
};

function cleanInventory( inventory ){
	var i, j;
	/* 인벤토리 빈 공간 정렬 */
	for( i = 1; i < inventory[0].tail; i++ ){
		if( inventory[i].type == 0 || inventory[i].number <= 0 ){
			for( j = i; j < inventory[0].tail-1; j++ ){
				inventory[j].type = inventory[j+1].type;
				inventory[j].number = inventory[j+1].number;
			}
			inventory[ inventory[0].tail-1 ].type = inventory[ inventory[0].tail-1 ].number = 0;
			inventory[0].tail--;
			if( inventory[0].tail-1 <= inventory[0].n-4 && inventory[0].n >= 8 ) inventory[0].n -= 4;
			i--;
		}
	}
	
	/* 타겟(뿌릴 씨앗) 재정렬 */
	if( inventory[inventory[0].target].type == 0 || inventory[inventory[0].target].type > 100 || inventory[0].target == 0 ){
		for( i = inventory[0].tail-1; i >= 1; i-- ){
			if( inventory[i].type > 0 && inventory[i].type < 100 ){
				inventory[0].target = i;
				break;
			}
		}
		if( i == 0 ) inventory[0].target = 0;
	}
};

function addInventory( inventory, type ){
	var i;
	for( i = 1; i <= inventory[0].tail; i++ ){
		if( inventory[i].type == type ){
			inventory[i].number++;
			break;
		}
	}
	if( i == inventory[0].tail+1 ){
		inventory[i-1].type = type;
		inventory[i-1].number = 1;
		inventory[0].tail++;
	}
	if( inventory[0].tail > inventory[0].n+1 ) inventory[0].n += 4;
};

function moveInventory( inventory, player, npc, pet, fruitInfo, textbox, season, key ){
	if( inventory[0].delay > 0 ) inventory[0].delay--;
	
	/* 타겟(뿌릴 씨앗) 지정 */
	if( inventory[0].target == 0 ){
		var i;
		for( i = inventory[0].tail-1; i >= 1; i-- ){
			if( inventory[i].type > 0 && inventory[i].type < 100 ){
				inventory[0].target = i;
				break;
			}
		}
	}
	
	if( key.up && inventory[0].sel - 4 >= 1 && inventory[0].delay <= 0 ){
		inventory[0].sel -= 4;
		inventory[0].delay = 3;
	}
	if( key.down && inventory[0].sel + 4 <= inventory[0].n && inventory[0].delay <= 0 ){
		inventory[0].sel += 4;
		inventory[0].delay = 3;
	}
	if( key.left && inventory[0].sel - 1 >= 1 && inventory[0].delay <= 0 ){
		inventory[0].sel -= 1;
		inventory[0].delay = 3;
	}
	if( key.right && inventory[0].sel + 1 <= inventory[0].n && inventory[0].delay <= 0 ){
		inventory[0].sel += 1;
		inventory[0].delay = 3;
	}
	if( key.enter || key.z ){
		/* 평소 */
		if( inventory[0].type == 0 ){
			/* 뿌릴 씨앗 지정 */
			if( inventory[ inventory[0].sel ].type > 0 && inventory[ inventory[0].sel ].type < 100 ){
				inventory[0].target = inventory[0].sel;
			}
		}
		/* 열매 팔기(진) */
		else if( inventory[0].type == 1 && inventory[inventory[0].sel].type > 0 ){
			if( inventory[inventory[0].sel].type < 100 ) player.money += fruitInfo.buyCost[inventory[inventory[0].sel].type] * 0.2;
			else player.money += fruitInfo.sellCost[inventory[inventory[0].sel].type-100];
			inventory[inventory[0].sel].number--;
			cleanInventory( inventory );
		}
		/* 선물하기 */
		else if( inventory[0].type == 2 && inventory[inventory[0].sel].type > 0 ){
			/* 련 */
			if( npc[1].isPresent ){
				if( npc[1].present < 3 ){
					/* 레어 열매 제외 */
					var temp = inventory[inventory[0].sel].type;
					if( (temp - 100) > 16 ) addFavor( 1, 4, npc, textbox );
					else{
						/* 뭘 주든 랜덤하게 반응 */
						temp = Math.random()*100;
						if( temp < 10 ) addFavor( 1, -3, npc, textbox );
						else if( temp < 50 ) addFavor( 1, -1, npc, textbox );
						else if( temp < 85 ) addFavor( 1, 2, npc, textbox );
						else addFavor( 1, 4, npc, textbox );
					}
				}
				else addFavor( 1, 0, npc, textbox );
			}
			/* 청 */
			if( npc[2].isPresent ){
				if( npc[2].present < 3 ){
					/* 비싼걸 좋아함 */
					var temp = inventory[inventory[0].sel].type;
					if( temp < 100 ) addFavor( 2, -2, npc, textbox );
					else if( (temp - 100) > 16 ) addFavor( 2, 3, npc, textbox );
					else if( (temp - 100)%4 == 1 || (temp - 100)%4 == 2 ) addFavor( 2, -1, npc, textbox );
					else if( (temp - 100)%4 == 3 ) addFavor( 2, 1, npc, textbox );
					else addFavor( 2, 2, npc, textbox );
				}
				else addFavor( 2, 0, npc, textbox );
			}
			/* 진 */
			if( npc[3].isPresent ){
				if( npc[3].present < 3 ){
					/* 타계절 열매를 좋아함 */
					var temp = inventory[inventory[0].sel].type;
					if( temp < 100 ) addFavor( 3, -2, npc, textbox );
					else if( (temp - 100) > 16 ) addFavor( 3, 3, npc, textbox );
					else if( Math.floor((temp - 101)/4)+1 == season ) addFavor( 3, -1, npc, textbox );
					else addFavor( 3, 2, npc, textbox );
				}
				else addFavor( 3, 0, npc, textbox );
			}
			/* 루 */
			if( npc[4].isPresent ){
				if( npc[4].present < 3 ){
					/* 비싼 계절 열매를 좋아함 */
					var temp = inventory[inventory[0].sel].type;
					if( temp < 100 ) addFavor( 4, -2, npc, textbox );
					else if( Math.floor((temp - 101)/4)+1 == season ){
						if( (temp - 100) > 16 ) addFavor( 4, 5, npc, textbox );
						else if( (temp - 100)%4 == 1 || (temp - 100)%4 == 2 ) addFavor( 4, 1, npc, textbox );
						else if( (temp - 100)%4 == 3 ) addFavor( 4, 2, npc, textbox );
						else addFavor( 4, 3, npc, textbox );
					}
					else{
						if( (temp - 100) > 16 ) addFavor( 4, 5, npc, textbox );
						else if( (temp - 100)%4 == 1 || (temp - 100)%4 == 2 ) addFavor( 4, -1, npc, textbox );
						else if( (temp - 100)%4 == 3 ) addFavor( 4, -1, npc, textbox );
						else addFavor( 4, -1, npc, textbox );
					}
				}
				else addFavor( 4, 0, npc, textbox );
			}
			inventory[inventory[0].sel].number--;
			cleanInventory( inventory );
			inventory[0].type = 0;
			inventory[0].isOpen = false;
		}
		/* 열매 팔기(루) */
		else if( inventory[0].type == 3 && inventory[inventory[0].sel].type > 0 ){
			if( inventory[inventory[0].sel].type < 100 ) player.money += fruitInfo.buyCost[inventory[inventory[0].sel].type] * 0.2;
			else player.money += Math.floor(fruitInfo.sellCost[inventory[inventory[0].sel].type-100] * fruitInfo.onSale[inventory[inventory[0].sel].type-100]);
			inventory[inventory[0].sel].number--;
			cleanInventory( inventory );
		}
		/* 먹이 주기 */
		else if( inventory[0].type == 4 && inventory[inventory[0].sel].type > 0 ){
			if( inventory[inventory[0].sel].type < 100 && !pet[player.nearPet].isTame ){
				addPetFavor( player.nearPet, -1, pet );
			}
			else{
				if( pet[player.nearPet].isTame ){
					if( pet[player.nearPet].favor < 9 ){
						if( inventory[inventory[0].sel].type >= 100 && Math.random()*(pet[player.nearPet].favor+1)*3 <= 1 ){
							addPetFavor( player.nearPet, 1, pet );
							pet[player.nearPet].maxmp += 10;
							pet[player.nearPet].mp = pet[player.nearPet].maxmp;
						}
						else{
							pet[player.nearPet].mp += pet[player.nearPet].maxmp/3;
							if( pet[player.nearPet].mp > pet[player.nearPet].maxmp ) pet[player.nearPet].mp = pet[player.nearPet].maxmp;
							addPetFavor( player.nearPet, 0, pet );
						}
					}
				}
				else{
					addPetFavor( player.nearPet, 1, pet );
				}
			}
			inventory[inventory[0].sel].number--;
			cleanInventory( inventory );
			inventory[0].type = 0;
			inventory[0].isOpen = false;
		}
		key.z = false;
		key.enter = false;
	}
};

function printItemInfo( invType, type, sx, sy, fruitInfo, context ){
	if( type == 0 ) return;
	context.fillStyle = "rgba(0, 0, 0, 0.4)";
	if( invType == 0 || invType == 2 || invType == 4 ) context.fillRect( sx, sy, 100, 60 );
	else if( invType == 1 || invType == 3 ) context.fillRect( sx, sy, 100, 80 );
	
	context.font = "bold 15px helvetica";
	context.fillStyle = "rgb(255,255,255)";
	switch( type ){
		case 1:   context.fillText( "고추 씨앗", sx + 10, sy + 20 ); break;
		case 2:   context.fillText( "시금치 씨앗", sx + 10, sy + 20 ); break;
		case 3:   context.fillText( "딸기 씨앗", sx + 10, sy + 20 ); break;
		case 4:   context.fillText( "토마토 씨앗", sx + 10, sy + 20 ); break;
		case 5:   context.fillText( "오이 씨앗", sx + 10, sy + 20 ); break;
		case 6:   context.fillText( "참외 씨앗", sx + 10, sy + 20 ); break;
		case 7:   context.fillText( "수박 씨앗", sx + 10, sy + 20 ); break;
		case 8:   context.fillText( "메론 씨앗", sx + 10, sy + 20 ); break;
		case 9:   context.fillText( "깻잎 씨앗", sx + 10, sy + 20 ); break;
		case 10:  context.fillText( "파 씨앗", sx + 10, sy + 20 ); break;
		case 11:  context.fillText( "팥 씨앗", sx + 10, sy + 20 ); break;
		case 12:  context.fillText( "피망 씨앗", sx + 10, sy + 20 ); break;
		case 13:  context.fillText( "매실 씨앗", sx + 10, sy + 20 ); break;
		case 14:  context.fillText( "귤 씨앗", sx + 10, sy + 20 ); break;
		case 15:  context.fillText( "배추 씨앗", sx + 10, sy + 20 ); break;
		case 16:  context.fillText( "석류 씨앗", sx + 10, sy + 20 ); break;
		case 17:  context.fillText( "선두 씨앗", sx + 10, sy + 20 ); break;
		case 18:  context.fillText( "불로초 씨앗", sx + 10, sy + 20 ); break;
		case 19:  context.fillText( "만년삼 씨앗", sx + 10, sy + 20 ); break;
		case 20:  context.fillText( "천도복 씨앗", sx + 10, sy + 20 ); break;
		case 101: context.fillText( "고추", sx + 10, sy + 20 ); break;
		case 102: context.fillText( "시금치", sx + 10, sy + 20 ); break;
		case 103: context.fillText( "딸기", sx + 10, sy + 20 ); break;
		case 104: context.fillText( "토마토", sx + 10, sy + 20 ); break;
		case 105: context.fillText( "오이", sx + 10, sy + 20 ); break;
		case 106: context.fillText( "참외", sx + 10, sy + 20 ); break;
		case 107: context.fillText( "수박", sx + 10, sy + 20 ); break;
		case 108: context.fillText( "메론", sx + 10, sy + 20 ); break;
		case 109: context.fillText( "깻잎", sx + 10, sy + 20 ); break;
		case 110: context.fillText( "파", sx + 10, sy + 20 ); break;
		case 111: context.fillText( "팥", sx + 10, sy + 20 ); break;
		case 112: context.fillText( "피망", sx + 10, sy + 20 ); break;
		case 113: context.fillText( "매실", sx + 10, sy + 20 ); break;
		case 114: context.fillText( "귤", sx + 10, sy + 20 ); break;
		case 115: context.fillText( "배추", sx + 10, sy + 20 ); break;
		case 116: context.fillText( "석류", sx + 10, sy + 20 ); break;
		case 117: context.fillText( "선두", sx + 10, sy + 20 ); break;
		case 118: context.fillText( "불로초", sx + 10, sy + 20 ); break;
		case 119: context.fillText( "만년삼", sx + 10, sy + 20 ); break;
		case 120: context.fillText( "천도복", sx + 10, sy + 20 ); break;
	}
	
	context.font = "14px helvetica";
	/* 진 가게 */
	if( invType == 1 ){
		if( type < 100 ) context.fillText( fruitInfo.buyCost[type]*0.2 + "G", sx + 10, sy + 70 );
		else context.fillText( fruitInfo.sellCost[type-100] + "G", sx + 10, sy + 70 );
	}
	/* 루 가게 */
	else if( invType == 3 ){
		if( type < 100 ) context.fillText( fruitInfo.buyCost[type]*0.2 + "G", sx + 10, sy + 70 );
		else context.fillText( Math.floor(fruitInfo.sellCost[type-100]*fruitInfo.onSale[type-100]) + "G", sx + 10, sy + 70 );
	}
	if( type > 100 ) type -= 100;
	if( type <= 4 ) context.fillText( "봄 작물", sx + 10, sy + 50 );
	else if( type <= 8 ) context.fillText( "여름 작물", sx + 10, sy + 50 );
	else if( type <= 12 ) context.fillText( "가을 작물", sx + 10, sy + 50 );
	else if( type <= 16 ) context.fillText( "겨울 작물", sx + 10, sy + 50 );
	else context.fillText( "사계절 작물", sx + 10, sy + 50 );
};

function printInventory( inventory, player, fruitInfo, img, context ){
	if( !inventory[0].isOpen ) return;
	var i, x, y, sx = 0, sy = 0;
	
	context.fillStyle = "rgb(255,255,255)";
	context.fillRect( 360 - 34*2, 270 - 34*inventory[0].n/8, 34*4 + 2, 34*inventory[0].n/4 + 2 );
	context.fillRect( 360 - 34*2, 270 - 34*inventory[0].n/8 - 20, 34*4 + 2, 20 );
	context.fillStyle = "rgb(0,0,0)";
	context.font = "14px helvetica";
	context.fillText( "소지금 : " + player.money + "G", 360 - 34*2 + 3, 270 - 34*inventory[0].n/8 - 5 );
	
	context.font = "bold 10px helvetica";
	x = 360 - 34*2 + 2;
	y = 270 - 34*inventory[0].n/8 + 2;
	for( i = 1; i <= inventory[0].n; i++ ){
		context.drawImage( img.square, 0, 0, 32, 32, x, y, 32, 32);
		if( inventory[i].type < 100 ) context.drawImage( img.seed, 32*(inventory[i].type-1), 0, 32, 32, x, y, 32, 32);
		else context.drawImage( img.fruit, 32*(inventory[i].type-101), 0, 32, 32, x, y, 32, 32);
		if( inventory[i].number > 1 ){
			context.fillStyle = "rgb(0,0,0)";
			context.fillText( inventory[i].number, x + 2, y + 30 );
		}
		
		if( inventory[0].sel == i ){
			context.fillStyle = "rgba(0, 0, 0, 0.1)";
			context.fillRect( x, y, 32, 32 );
			sx = x + 25;
			sy = y + 25;
		}
		if( inventory[0].target == i ){
			context.drawImage( img.target, 0, 0, 32, 32, x, y, 32, 32 );
		}
		
		x += 34;
		if( i % 4 == 0 ){
			x = 360 - 34*2 + 2;
			y += 34;
		}
	}
	
	printItemInfo( inventory[0].type, inventory[inventory[0].sel].type, sx, sy, fruitInfo, context );
};