function initPet( pet ){
	pet[0] = new Object();
	pet[0].x = pet[0].y = pet[0].value = pet[0].time = pet[0].who = 0;
	pet[0].n = 8;
	
	var i;
	for( i = 1; i <= pet[0].n; i++ ){
		pet[i] = new Object();
		pet[i].x = 500;
		pet[i].y = 250;
		pet[i].dx = pet[i].x;
		pet[i].dy = pet[i].y;
		pet[i].spd = 1;
		pet[i].maxmp = pet[i].mp = 50;
		pet[i].motion = 0;
		pet[i].motionDelay = 0;
		pet[i].stopTime = 0;
		pet[i].favor = 0;
		pet[i].isTame = false;
		pet[i].isExist = false;
		if( Math.random()*100 < 10 ){
			pet[i].isExist = true;
			pet[i].x = Math.floor( Math.random()*1000+100 );
			if( Math.random()*2 < 1 ) pet[i].y = Math.floor( Math.random()*300+200 );
			else pet[i].y = Math.floor( Math.random()*180+970 );
		}
		pet[i].isAction = false;				
	}
	
	/* 모든 펫 획득 */
	/*for( i = 1; i <= pet[0].n; i++ ){
		pet[i].isTame = pet[i].isExist = true;
		pet[i].favor = 1;
	}*/
};

function gatherPet( pet, player ){
	for( i = 1; i <= pet[0].n; i++ ){
		if( !pet[i].isTame || !pet[i].isExist || pet[i].spd == 0 ) continue;
		pet[i].dx = player.x + Math.random()*200 - 100;
		pet[i].dy = player.y + Math.random()*200 - 100;
		pet[i].spd = 2;
		pet[i].stopTime = 0;
	}
};

function setDestination( i, pet, player ){	
	pet[i].dx = pet[i].x;
	pet[i].dy = pet[i].y;
	
	if( player.isGather && pet[i].isTame ){
		if( pet[i].spd == 0 ) pet[i].spd = 1;
		pet[i].dx = player.x + Math.random()*200 - 100;
		pet[i].dy = player.y + Math.random()*200 - 100;
	}
	else{
		pet[i].spd = 1;
		if( Math.random()*3 < 2 ) pet[i].stopTime = 30+Math.random()*20;
		else{
			pet[i].dx = pet[i].x + Math.random()*200 - 100;
			pet[i].dy = pet[i].y + Math.random()*200 - 100;
		}
	}
};

function movePet( pet, player, npc, house, gTable, textbox ){
	var chk = false, chkX = false, chkY = false;
	var i, j;
	for( i = 1; i <= pet[0].n; i++ ){
		if( !pet[i].isExist ) continue;
		
		/* 특수 능력 발동 */
		if( pet[i].isAction ){
			/* 방울이 */
			if( i == 1 ){
				pet[i].mp -= 0.025;
				var iy = Math.floor(pet[i].y/48);
				var ix = Math.floor(pet[i].x/48);
				if( gTable[iy][ix].type != -1 && gTable[iy][ix].water < 150 ){
					gTable[iy][ix].water = 150;
					gTable[iy][ix].dryTime = 0;
				}
			}
			
			/* 둥실이 */
			if( i == 2 ){
				pet[i].mp -= 0.2;
				player.spd = 6;
			}
			
			/* 맑음이 */
			if( i == 3 ){
				pet[i].mp -= 0.05;
				pet[i].motion = 1;
			}
			
			/* 반딧불 */
			if( i == 4 ){
				pet[i].mp -= 0.2;
				if( player.hp < player.maxhp ) player.hp += 0.05;
				else pet[i].isAction = false;
			}
			
			/* 영양이 */
			if( i == 5 ){
				pet[i].mp -= 0.125;
				var iy = Math.floor(pet[i].y/48);
				var ix = Math.floor(pet[i].x/48);
				if( gTable[iy][ix].type > 0 && gTable[iy][ix].type != 999 ){
					gTable[iy][ix].time += 3;
				}
			}
			
			/* 사랑이 */
			if( i == 6 ){
				var who = Math.floor(Math.random()*3)+1;
				if( who == 1 ){
					initTextbox( textbox, player.x, player.y, 2, "련이에게^사랑을 전해줘!", true );
					pet[i].dx = 300;
					pet[i].dy = 20;
				}
				if( who == 2 ){
					initTextbox( textbox, player.x, player.y, 2, "청 누나에게^사랑을 전해줘!", true );
					pet[i].dx = 215;
					pet[i].dy = 776;
				}
				if( who == 3 ){
					initTextbox( textbox, player.x, player.y, 2, "진이에게^사랑을 전해줘!", true );
					pet[i].dx = 887;
					pet[i].dy = 980;
				}
				pet[i].spd = 0;
				pet[i].tx = (pet[i].dx - pet[i].x)/200;
				pet[i].ty = (pet[i].dy - pet[i].y)/200;
				pet[i].mp = 0;
				npc[who].favor += 2;
			}
			
			/* BMO */
			if( i == 7 ){
				pet[i].mp -= 0.03;
			}
			
			if( pet[i].mp <= 0 ){
				pet[i].mp = 0;
				pet[i].isAction = false;
				if( i == 2 ){
					player.spd = 3;
					pet[i].motion = 0;
				}
				if( i == 3 ) pet[i].motion = 0;
			}
		}
		else if( pet[i].mp < pet[i].maxmp ){
			if( i == 6 ) pet[i].mp += (pet[i].favor/2)*pet[i].maxmp/2000;
			else pet[i].mp += pet[i].maxmp/2000;
		}
		
		if( i == 2 && pet[i].isAction ) continue;
		
		if( player.nearPet == i ) continue;
		
		if( pet[i].stopTime > 0 ){
			pet[i].stopTime--;
			continue;
		}
		
		if( (pet[i].x-pet[i].dx)*(pet[i].x-pet[i].dx)+(pet[i].y-pet[i].dy)*(pet[i].y-pet[i].dy) < 20 ){
			setDestination( i, pet, player );
			continue;
		}
		
		if( i != 2 && i != 3 && i != 4 ){
			pet[i].motionDelay++;
			if( pet[i].motionDelay > 10 ){
				pet[i].motion = (pet[i].motion+1)%2;
				pet[i].motionDelay = 0;
			}
		}
		if( i == 4 ){
			pet[i].motionDelay++;
			if( pet[i].motionDelay > 3 ){
				pet[i].motion = (pet[i].motion+1)%2;
				pet[i].motionDelay = 0;
			}
		}
		
		if( i == 6 && pet[i].spd == 0 ){
			pet[i].x += pet[i].tx;
			pet[i].y += pet[i].ty;
			continue;
		}
		
		chkX = chkY = false;
		if( pet[i].y > pet[i].dy ){
			if( pet[i].y > 3 ){
				/* 충돌 처리 */
				chk = false;
				/* 플레이어 */
				if( player.x-32 <= pet[i].x && pet[i].x <= player.x+32 ){
					if( pet[i].y-pet[i].spd <= player.y+40 && player.y <= pet[i].y-pet[i].spd ) chk = true;
				}
				/* 집 */
				for( j = 1; j <= house[0]; j++ ){
					if( house[j].x-137 <= pet[i].x && pet[i].x <= house[j].x+137 ){
						if( pet[i].y-pet[i].spd <= house[j].y+148 && house[j].y-10 <= pet[i].y-pet[i].spd ){
							chk = true;
							break;
						}
					}
				}
				if( !chk ){
					pet[i].y -= pet[i].spd;
					chkY = true;
				}
			}
		}
		if( pet[i].y < pet[i].dy ){
			if( chkY ){
				pet[i].y += pet[i].spd;
				setDestination( i, pet, player );
				continue;
			}
			if( pet[i].y < 1173 ){
				/* 충돌 처리 */
				chk = false;
				/* 플레이어 */
				if( player.x-32 <= pet[i].x && pet[i].x <= player.x+32 ){
					if( player.y-40 <= pet[i].y+pet[i].spd && pet[i].y+pet[i].spd <= player.y ) chk = true;
				}
				for( j = 1; j <= house[0]; j++ ){
					if( house[j].x-137 <= pet[i].x && pet[i].x <= house[j].x+137 ){
						if( house[j].y-10 <= pet[i].y+pet[i].spd && pet[i].y+pet[i].spd <= house[j].y ){
							chk = true;
							break;
						}
					}
				}
				if( !chk ){
					pet[i].y += pet[i].spd;
					chkY = true;
				}
			}
		}
		if( pet[i].x > pet[i].dx ){
			if( pet[i].x > 3 ){
				/* 충돌 처리 */
				chk = false;
				/* 플레이어 */
				if( player.y-40 <= pet[i].y && pet[i].y <= player.y+40 ){
					if( pet[i].x-pet[i].spd <= player.x+32 && player.x-32 <= pet[i].x-pet[i].spd ) chk = true;
				}
				for( j = 1; j <= house[0]; j++ ){
					if( house[j].y-10 <= pet[i].y && pet[i].y <= house[j].y+130 ){
						if( pet[i].x-pet[i].spd <= house[j].x+137 && house[j].x-137 <= pet[i].x-pet[i].spd ){
							chk = true;
							break;
						}
					}
				}
				if( !chk ){
					pet[i].x -= pet[i].spd;
					chkX = true;
				}
			}
		}
		if( pet[i].x < pet[i].dx ){
			if( chkX ){
				pet[i].x += pet[i].spd;
				setDestination( i, pet, player );
				continue;
			}
			if( pet[i].x < 1195 ){
				/* 충돌 처리 */
				chk = false;
				/* 플레이어 */
				if( player.y-40 <= pet[i].y && pet[i].y <= player.y+40 ){
					if( player.x-32 <= pet[i].x+pet[i].spd && pet[i].y+pet[i].spd <= player.x+32 ) chk = true;
				}
				for( j = 1; j <= house[0]; j++ ){
					if( house[j].y-10 <= pet[i].y && pet[i].y <= house[j].y+130 ){
						if( house[j].x-137 <= pet[i].x+pet[i].spd && pet[i].x+pet[i].spd <= house[j].x+137 ){
							chk = true;
							break;
						}
					}
				}
				if( !chk ){
					pet[i].x += pet[i].spd;
					chkX = true;
				}
			}
		}
		
		if( !chkX && !chkY ) setDestination( i, pet, player );
	}
};

function addPetFavor( who, value, pet ){
	pet[who].favor += value;
	if( pet[who].favor < 0 ) pet[who].favor = 0;
	if( pet[who].favor > 9 ){
		pet[who].favor = 9;
		return;
	}
	pet[0].x = pet[who].x-50;
	pet[0].y = pet[who].y+30;
	pet[0].time = 60;
	pet[0].value = value;
	pet[0].who = who;
};

function printPetFavor( pet, player, context ){
	if( pet[0].time <= 0 ) return;
	
	pet[0].time--;
	pet[0].y--;
	
	context.font = "bold 12px helvetica";
	
	if( pet[0].value < 0 ){
		context.fillStyle = "rgb(255,0,0)";
		context.fillText( "호감도 - " + (pet[0].value*-1), 360 + pet[0].x - player.x + player.viewX, 270 + pet[0].y - player.y + player.viewY );
	}
	else{
		context.fillStyle = "rgb(0,0,255)";
		if( pet[pet[0].who].isTame ){
			if( pet[0].value == 0 ) context.fillText( "MP +30%", 360 + pet[0].x - player.x + player.viewX, 270 + pet[0].y - player.y + player.viewY );
			else context.fillText( "레벨업!", 360 + pet[0].x - player.x + player.viewX, 270 + pet[0].y - player.y + player.viewY );
		}
		else{
			context.fillText( "호감도 + " + pet[0].value, 360 + pet[0].x - player.x + player.viewX, 270 + pet[0].y - player.y + player.viewY );
		}
	}
};

function printPetStatus( pet, player, img, context ){
	if( player.mn != 0 ) return;
	
	var i;
	for( i = 1; i <= pet[0].n; i++ ){
		if( !pet[i].isTame || !pet[i].isExist ) continue;
		var mp = Math.floor(player.hp);
		var maxmp = Math.floor(player.maxhp);
		context.fillStyle = "rgb(216, 216, 216)";
		context.fillRect( 360-16+pet[i].x-player.x + player.viewX, 270+20+pet[i].y-player.y + player.viewY, 32, 4 );
		context.fillStyle = "rgb(64, 64, 255)";
		context.fillRect( 360-16+pet[i].x-player.x + player.viewX, 270+20+pet[i].y-player.y + player.viewY, pet[i].mp/pet[i].maxmp*32, 4 );
	}
};
function printPetEffect( pet, player, pt, img, context ){
	if( player.mn != 0 ) return;
	
	var i;
	for( i = 1; i <= pet[0].n; i++ ){
		if( !pet[i].isTame || !pet[i].isExist || !pet[i].isAction ) continue;
		if( i == 1 && Math.random()*2 <= 1 ){
			makeParticle( pt, pet[i].x, pet[i].y, 2, 1 );
		}
		if( i == 4 ){
			context.shadowBlur = 50;
			context.shadowColor = "rgba(255, 255, 0, 0.5)";
			context.fillStyle = "rgba(255, 255, 0, 0.5)";
			context.beginPath();
			context.arc( 360+pet[i].x-player.x + player.viewX, 270+pet[i].y-player.y + player.viewY, 100, 0, Math.PI*2, false);
			context.closePath();
			context.fill();
			context.shadowBlur = 0;
			context.shadowColor = "rgba(0, 0, 0, 0)";
		}
		if( i == 5 && Math.random()*2 <= 1 ){
			makeParticle( pt, pet[i].x, pet[i].y, 2, 2 );
		}
		if( i == 7 && Math.random()*2 <= 1 ){
			makeParticle( pt, pet[i].x, pet[i].y, Math.random()+1, 4 );
		}
	}
	
	if( pet[6].isTame && pet[6].isExist && pet[6].spd == 0 ){
		makeParticle( pt, pet[6].x, pet[6].y, 2, 3 );
	}
};

function printPet1( pet, player, img, context ){
	if( player.mn != 0 ) return;
	
	var i;
	for( i = 1; i <= pet[0].n; i++ ){
		if( !pet[i].isExist ) continue;
		if( player.y > pet[i].y ){
			context.drawImage( img.pet, pet[i].motion*32, (i-1)*32, 32, 32, 360-16+pet[i].x-player.x + player.viewX, 270-16+pet[i].y-player.y + player.viewY, 32, 32 );
		}
	}
};
function printPet2( pet, player, img, context ){
	if( player.mn != 0 ) return;
	
	var i;
	for( i = 1; i <= pet[0].n; i++ ){
		if( !pet[i].isExist ) continue;
		if( player.y <= pet[i].y ){
			context.drawImage( img.pet, pet[i].motion*32, (i-1)*32, 32, 32, 360-16+pet[i].x-player.x + player.viewX, 270-16+pet[i].y-player.y + player.viewY, 32, 32 );
		}
	}
};