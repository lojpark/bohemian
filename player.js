function initPlayer( player, db ){
	/* 청 */
	player.x = 218;
	player.y = 780;
	/* 진 */
	player.x = 887;
	player.y = 954;
	/* 집 */
	player.x = 599;
	player.y = 218;
	player.ix = Math.floor(player.x/48);
	player.iy = Math.floor(player.y/48);
	player.dx = player.x;
	player.dy = player.y;
	player.dir = 1;
	player.isMove = false;
	player.motion = 0;
	player.motionDelay = 0;
	player.viewX = 0;
	player.viewY = 0;
	player.action = 0;
	player.isSleep = false;
	player.isSleepChk = false;
	player.sleepTime = 0;
	player.maxSleepTime = 0;
	player.nap = 0;
	player.mn = 0;
	player.nearNpc = 0;
	player.nearPet = 0;
	player.money = 2500;
	player.skill = new Array();
	player.skill[1] = player.skill[2] = player.skill[3] = player.skill[4] = 39;
	player.hp = player.maxhp = 50;
	player.stamina = 1.0;
	player.stress = 0;
	player.waterSkill = 0;
	player.classSkill = 0;
	player.isFaint = 0;
	player.isGather = false;
	player.spd = 3;
};

function movePlayer( player, house, npc, pet, gTable, inventory, textbox, fruitInfo, key ){
	var i, chk = false;
	player.isMove = false;
	
	if( player.isSleep || player.nap > 0 || player.isFaint || pet[7].isAction ) return;
	
	player.dx = player.x;
	player.dy = player.y;
	
	/* 평소 */
	if( player.action == 0 ){
		if( key.up ){
			if( player.y > 3 ){
				/* 충돌 처리 */
				chk = false;
				/* 집 밖 */
				if( player.mn == 0 ){
					for( i = 1; i <= house[0]; i++ ){
						if( (house[i].x-137 <= player.x && player.x <= house[i].x-5) || (house[i].x+5 <= player.x && player.x <= house[i].x+137) ){
							if( player.y-player.spd <= house[i].y+130 && house[i].y-10 <= player.y-player.spd ){
								chk = true;
							}
						}
					}
				}
				/* 집 안 */
				else{
					if( player.y-player.spd < 246 ) chk = true;
				}
				/* npc */
				for( i = 1; i <= npc[0].n; i++ ){
					if( npc[i].x-32 <= player.x && player.x <= npc[i].x+32 && player.mn == npc[i].mn ){
						if( npc[i].y <= player.y && player.y-player.spd <= npc[i].y+24 ){
							chk = true;
							player.nearNpc = i;
							player.dir = 0;
						}
					}
				}
				/* 펫 */
				for( i = 1; i <= pet[0].n; i++ ){
					if( !pet[i].isExist ) continue;
					if( pet[i].x-32 <= player.x && player.x <= pet[i].x+32 && player.mn == 0 ){
						if( pet[i].y <= player.y && player.y-player.spd <= pet[i].y+16 ){
							chk = true;
							player.nearPet = i;
							player.dir = 0;
						}
					}
				}
				if( !chk ){
					player.y -= player.spd; player.isMove = true; player.dir = 0;
				}
			}
			else if( player.viewY < 200 ) player.viewY += 3;
		}
		if( key.down ){
			if( player.y < 1173 ){
				/* 충돌 처리 */
				chk = false;
				/* 집 밖 */
				if( player.mn == 0 ){
					for( i = 1; i <= house[0]; i++ ){
						if( house[i].x-137 <= player.x && player.x <= house[i].x+137 ){
							if( house[i].y-10 <= player.y+player.spd && player.y+player.spd <= house[i].y ){
								chk = true;
							}
						}
					}
				}
				/* 집 안 */
				else{
					if( player.x <= 360-10 || 360+10 <= player.x ){
						if( player.y+player.spd > 365 ) chk = true;
					}
				}
				/* npc */
				for( i = 1; i <= npc[0].n; i++ ){
					if( npc[i].x-32 <= player.x && player.x <= npc[i].x+32 && player.mn == npc[i].mn ){
						if( player.y <= npc[i].y && npc[i].y-24 <= player.y+player.spd ){
							chk = true;
							player.nearNpc = i;
							player.dir = 1;
						}
					}
				}
				/* 펫 */
				for( i = 1; i <= pet[0].n; i++ ){
					if( !pet[i].isExist ) continue;
					if( pet[i].x-32 <= player.x && player.x <= pet[i].x+32 && player.mn == 0 ){
						if( player.y <= pet[i].y && pet[i].y-16 <= player.y+player.spd ){
							chk = true;
							player.nearPet = i;
							player.dir = 1;
						}
					}
				}
				if( !chk ){
					player.y += player.spd; player.isMove = true; player.dir = 1;
				}
			}
			else if( player.viewY > -200 ) player.viewY -= 3;
		}
		if( key.left ){
			if( player.x > 3 ){
				/* 충돌 처리 */
				chk = false;
				/* 집 밖 */
				if( player.mn == 0 ){
					for( i = 1; i <= house[0]; i++ ){
						if( house[i].y-10 <= player.y && player.y <= house[i].y+130 ){
							if( player.x-player.spd <= house[i].x+137 && house[i].x-137 <= player.x-player.spd ){
								chk = true;
							}
						}
					}
				}
				/* 집 안 */
				else{
					if( player.x-player.spd < 240 || ( player.y > 365 && player.x-player.spd < 360-10 ) ) chk = true;
				}
				/* npc */
				for( i = 1; i <= npc[0].n; i++ ){
					if( npc[i].y-16 <= player.y && player.y <= npc[i].y+16 && player.mn == npc[i].mn ){
						if( npc[i].x <= player.x && player.x-player.spd <= npc[i].x+32 ){
							chk = true;
							player.nearNpc = i;
							player.dir = 2;
						}
					}
				}
				/* 펫 */
				for( i = 1; i <= pet[0].n; i++ ){
					if( !pet[i].isExist ) continue;
					if( pet[i].y-16 <= player.y && player.y <= pet[i].y+16 && player.mn == 0 ){
						if( pet[i].x <= player.x && player.x-player.spd <= pet[i].x+32 ){
							chk = true;
							player.nearPet = i;
							player.dir = 2;
						}
					}
				}
				if( !chk ){
					player.x -= player.spd; player.isMove = true; player.dir = 2;
				}
			}
			else if( player.viewX < 200 ) player.viewX += 3;
		}
		if( key.right ){
			if( player.x < 1195 ){
				/* 충돌 처리 */
				chk = false;
				/* 집 밖 */
				if( player.mn == 0 ){
					for( i = 1; i <= house[0]; i++ ){
						if( house[i].y-10 <= player.y && player.y <= house[i].y+130 ){
							if( house[i].x-137 <= player.x+player.spd && player.x+player.spd <= house[i].x+137 ){
								chk = true;
							}
						}
					}
				}
				/* 집 안 */
				else{
					if( player.x+player.spd > 480 || ( player.y > 365 && player.x+player.spd > 360+10 ) ) chk = true;
				}
				/* npc */
				for( i = 1; i <= npc[0].n; i++ ){
					if( npc[i].y-24 <= player.y && player.y <= npc[i].y+24 && player.mn == npc[i].mn ){
						if( npc[i].x >= player.x && player.x+player.spd >= npc[i].x-32 ){
							chk = true;
							player.nearNpc = i;
							player.dir = 3;
						}
					}
				}
				/* 펫 */
				for( i = 1; i <= pet[0].n; i++ ){
					if( !pet[i].isExist ) continue;
					if( pet[i].y-16 <= player.y && player.y <= pet[i].y+16 && player.mn == 0 ){
						if( pet[i].x >= player.x && player.x+player.spd >= pet[i].x-32 ){
							chk = true;
							player.nearPet = i;
							player.dir = 3;
						}
					}
				}
				if( !chk ){
					player.x += player.spd; player.isMove = true; player.dir = 3;
				}
			}
			else if( player.viewX > -200 ) player.viewX -= 3;
		}
		
		if( player.isMove ){
			player.nearNpc = 0;
			player.nearPet = 0;
			player.motionDelay++;
			if( player.motionDelay > 5 ){
				player.motionDelay = 0;
				player.motion = (player.motion+1) % 4;
			}
		}
		
		if( player.spd == 6 ){
			player.motion = 0;
			pet[2].x = player.x;
			pet[2].y = player.y+25;
			if( player.dir == 0 ) pet[2].motion = 1;
			else pet[2].motion = 0;
		}
	}
	/* 개간 */
	else if( player.action == 1 ){
		player.motionDelay++;
		if( player.motionDelay % 5 == 0 ){
			player.motion = (player.motion+1) % 2;
		}
		if( player.motionDelay > player.skill[player.action] ){
			player.motionDelay = player.motion = player.action = 0;
			player.dir = 1;
			if( player.ix >= 0 && player.iy >= 0 ){
				gTable[ player.iy ][ player.ix ].type = 0;
				gTable[ player.iy ][ player.ix ].water = 0;
				gTable[ player.iy ][ player.ix ].time = 0;
				gTable[ player.iy ][ player.ix ].dryTime = 0;
			}
		}
	}
	/* 씨 */
	else if( player.action == 2 ){
		/* 뿌릴 씨앗이 없으면 제자리로 */
		if( inventory[inventory[0].target].type == 0 || inventory[0].target == 0 ){
			player.action = 0;
			initTextbox( textbox, player.x, player.y, 1, "씨앗이 없다!", true );
		}
		else{
			player.motionDelay++;
			if( player.motionDelay % 5 == 0 ){
				player.motion = (player.motion+1) % 3;
			}
			if( player.motionDelay > player.skill[player.action] ){
				player.motionDelay = player.motion = player.action = 0;
				player.dir = 1;
				if( player.ix >= 0 && player.iy >= 0 ){
					gTable[ player.iy ][ player.ix ].type = inventory[inventory[0].target].type;
					gTable[ player.iy ][ player.ix ].harvest = fruitInfo.harvest[inventory[inventory[0].target].type];
					gTable[ player.iy ][ player.ix ].dryTime = 0;
					inventory[inventory[0].target].number--;
					cleanInventory( inventory );
					gTable[ player.iy ][ player.ix ].time = 0;
				}
			}
		}
	}
	/* 물 */
	else if( player.action == 3 ){
		player.motionDelay++;
		if( player.motionDelay % 5 == 0 ){
			player.motion = (player.motion+1) % 2;
		}
		if( player.motionDelay > player.skill[player.action] ){
			player.motionDelay = player.motion = player.action = 0;
			player.dir = 1;
			if( player.ix >= 0 && player.iy >= 0 ){
				gTable[ player.iy ][ player.ix ].water = 800;
				gTable[ player.iy ][ player.ix ].dryTime = 0;
				/* 주변 관수 */
				if( player.waterSkill >= 4 ){
					if( gTable[ player.iy-1 ][ player.ix ].type > 0 && gTable[ player.iy-1 ][ player.ix ].water <= 0 ){
						gTable[ player.iy-1 ][ player.ix ].water = 800;
						gTable[ player.iy-1 ][ player.ix ].dryTime = 0;
					}
					if( gTable[ player.iy+1 ][ player.ix ].type > 0 && gTable[ player.iy+1 ][ player.ix ].water <= 0 ){
						gTable[ player.iy+1 ][ player.ix ].water = 800;
						gTable[ player.iy+1 ][ player.ix ].dryTime = 0;
					}
					if( gTable[ player.iy ][ player.ix-1 ].type > 0 && gTable[ player.iy ][ player.ix-1 ].water <= 0 ){
						gTable[ player.iy ][ player.ix-1 ].water = 800;
						gTable[ player.iy ][ player.ix-1 ].dryTime = 0;
					}
					if( gTable[ player.iy ][ player.ix+1 ].type > 0 && gTable[ player.iy ][ player.ix+1 ].water <= 0 ){
						gTable[ player.iy ][ player.ix+1 ].water = 800;
						gTable[ player.iy ][ player.ix+1 ].dryTime = 0;
					}
				}
				/* 주변 관수 */
				if( player.waterSkill >= 8 ){
					if( gTable[ player.iy-1 ][ player.ix-1 ].type > 0 && gTable[ player.iy-1 ][ player.ix-1 ].water <= 0 ){
						gTable[ player.iy-1 ][ player.ix-1 ].water = 800;
						gTable[ player.iy-1 ][ player.ix-1 ].dryTime = 0;
					}
					if( gTable[ player.iy-1 ][ player.ix+1 ].type > 0 && gTable[ player.iy-1 ][ player.ix+1 ].water <= 0 ){
						gTable[ player.iy-1 ][ player.ix+1 ].water = 800;
						gTable[ player.iy-1 ][ player.ix+1 ].dryTime = 0;
					}
					if( gTable[ player.iy+1 ][ player.ix-1 ].type > 0 && gTable[ player.iy+1 ][ player.ix-1 ].water <= 0 ){
						gTable[ player.iy+1 ][ player.ix-1 ].water = 800;
						gTable[ player.iy+1 ][ player.ix-1 ].dryTime = 0;
					}
					if( gTable[ player.iy+1 ][ player.ix+1 ].type > 0 && gTable[ player.iy+1 ][ player.ix+1 ].water <= 0 ){
						gTable[ player.iy+1 ][ player.ix+1 ].water = 800;
						gTable[ player.iy+1 ][ player.ix+1 ].dryTime = 0;
					}
				}
			}
		}
	}
	/* 수확 */
	else if( player.action == 4 ){
		/* 썩은 작물이면 제자리로 */
		if( inventory, gTable[ player.iy ][ player.ix ].type == 999 ){
			player.action = 0;
		}
		else{
			player.motionDelay++;
			if( player.motionDelay % Math.floor((player.skill[player.action]+2)/2) == 0 ){
				player.motion = (player.motion+1) % 2;
			}
			if( player.motionDelay > player.skill[player.action] ){
				player.motionDelay = player.motion = player.action = 0;
				player.dir = 1;
				if( player.ix >= 0 && player.iy >= 0 ){
					addInventory( inventory, gTable[ player.iy ][ player.ix ].type+100 );
					cleanInventory( inventory );
					
					gTable[ player.iy ][ player.ix ].harvest--;
					if( gTable[ player.iy ][ player.ix ].harvest <= 0 ){
						gTable[ player.iy ][ player.ix ].type = gTable[ player.iy ][ player.ix ].water = 0;
						gTable[ player.iy ][ player.ix ].time = gTable[ player.iy ][ player.ix ].dryTime = 0;
					}
					else gTable[ player.iy ][ player.ix ].time = 2000;
				}
			}
		}
	}
	/* 걸어나오기 */
	else if( player.action == 5 ){
		player.motionDelay++;
		player.y += 3;
		player.dir = 1;
		player.isMove = true;
		if( player.motionDelay % 5 == 0 ){
			player.motion = (player.motion+1) % 4;
		}
		if( player.motionDelay > 30 ){
			player.motionDelay = player.motion = player.action = 0;
		}
	}

	
	if( player.viewX > 0 && player.x > 3 ){
		player.viewX *= 0.9;
		if( player.viewX < 1 ) player.viewX = 0;
	}
	if( player.viewY > 0 && player.y > 3 ){
		player.viewY *= 0.9;
		if( player.viewY < 1 ) player.viewY = 0;
	}
	if( player.viewX < 0 && player.x < 1195 ){
		player.viewX *= 0.9;
		if( player.viewX > -1 ) player.viewX = 0;
	}
	if( player.viewY < 0 && player.y < 1173 ){
		player.viewY *= 0.9;
		if( player.viewY > -1 ) player.viewY = 0;
	}
	
	player.ix = Math.floor(player.x/48);
	player.iy = Math.floor((player.y+24)/48);
	
	player.dx = player.x - player.dx;
	player.dy = player.y - player.dy;
	
	if( textbox.time > 0 && textbox.isDynamic ){
		textbox.x = player.x - 20;
		textbox.y = player.y - 50 - 12*textbox.line;
	}
};

function printPlayerStatus( player, img, context ){
	var hp = Math.floor(player.hp);
	var maxhp = Math.floor(player.maxhp);
	context.fillStyle = "rgb(128, 128, 128)";
	context.fillRect( 0, 525, 720, 15 );
	context.fillStyle = "rgb(255, 0, 0)";
	context.fillRect( 0, 525, player.hp/player.maxhp*720, 15 );
	context.fillStyle = "rgb(255,255,255)";
	context.font = "13px helvetica";
	context.fillText( hp + " / " + maxhp, 340, 537 );
	
	context.font = "bold 12px helvetica";
	if( player.stress <= 610 ) context.fillStyle = "rgb(0,0,255)";
	else if( player.stress <= 1400 ) context.fillStyle = "rgb(255,128,0)";
	else if( player.stress <= 2200 ) context.fillStyle = "rgb(255,64,0)";
	else if( player.stress <= 2600 ) context.fillStyle = "rgb(255,32,0)";
	else context.fillStyle = "rgb(255,0,0)";
	context.fillText( "피곤함 : " + Math.floor(player.stress/4.2), 3, 521 );
};

function printPlayer( player, img, context ){
	if( player.isFaint ){
		context.drawImage( img.player, 0, 8*48, 32, 48, 360-16 + player.viewX, 270-24 + player.viewY, 32, 48 );
		return;
	}
	if( player.mn == 0 ){
		/* 평소 */
		if( player.action == 0 || player.action == 5 ){
			if( player.isMove ) context.drawImage( img.player, player.motion*32, player.dir*48, 32, 48, 360-16 + player.viewX, 270-24 + player.viewY, 32, 48 );
			else context.drawImage( img.player, 0, player.dir*48, 32, 48, 360-16 + player.viewX, 270-24 + player.viewY, 32, 48 );
		}
		/* 개간 */
		else if( player.action == 1 ){
			context.drawImage( img.player, player.motion*32, 4*48, 32, 48, 360-16 + player.viewX, 270-24 + player.viewY, 32, 48 );
		}
		/* 씨 */
		else if( player.action == 2 ){
			context.drawImage( img.player, player.motion*32, 5*48, 32, 48, 360-16 + player.viewX, 270-24 + player.viewY, 32, 48 );
		}
		/* 물 */
		else if( player.action == 3 ){
			context.drawImage( img.player, player.motion*32, 6*48, 32, 48, 360-16 + player.viewX, 270-24 + player.viewY, 32, 48 );
		}
		/* 물 */
		else if( player.action == 4 ){
			context.drawImage( img.player, player.motion*32, 7*48, 32, 48, 360-16 + player.viewX, 270-24 + player.viewY, 32, 48 );
		}
	}
	else{
		if( player.isMove ) context.drawImage( img.player, player.motion*32, player.dir*48, 32, 48, -16 + player.x, -24 + player.y, 32, 48 );
		else context.drawImage( img.player, 0, player.dir*48, 32, 48, -16 + player.x, -24 + player.y, 32, 48 );
	}
};