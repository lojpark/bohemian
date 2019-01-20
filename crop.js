function initFruitInfo( fruitInfo ){
	fruitInfo.buyCost = new Array();
	fruitInfo.sellCost = new Array();
	fruitInfo.harvest = new Array();
	fruitInfo.name = new Array();
	fruitInfo.onSale = new Array();
	
	fruitInfo.buyCost[1]  = 300;  fruitInfo.buyCost[2]  = 600;  fruitInfo.buyCost[3]  = 900;  fruitInfo.buyCost[4]  = 1200;
	fruitInfo.buyCost[5]  = 400;  fruitInfo.buyCost[6]  = 900;  fruitInfo.buyCost[7]  = 1500; fruitInfo.buyCost[8]  = 2000;
	fruitInfo.buyCost[9]  = 300;  fruitInfo.buyCost[10] = 400;  fruitInfo.buyCost[11] = 600;  fruitInfo.buyCost[12] = 900;
	fruitInfo.buyCost[13] = 600;  fruitInfo.buyCost[14] = 900;  fruitInfo.buyCost[15] = 1200; fruitInfo.buyCost[16] = 1500;
	fruitInfo.buyCost[17] = 7000; fruitInfo.buyCost[18] = 10000;fruitInfo.buyCost[19] = 15000;fruitInfo.buyCost[20] = 20000;
	
	fruitInfo.sellCost[1]  = 110; fruitInfo.sellCost[2]  = 220;  fruitInfo.sellCost[3]  = 440;  fruitInfo.sellCost[4]  = 590;
	fruitInfo.sellCost[5]  = 140; fruitInfo.sellCost[6]  = 440;  fruitInfo.sellCost[7]  = 2200; fruitInfo.sellCost[8]  = 2900;
	fruitInfo.sellCost[9]  = 110; fruitInfo.sellCost[10] = 140;  fruitInfo.sellCost[11] = 220;  fruitInfo.sellCost[12] = 330;
	fruitInfo.sellCost[13] = 290; fruitInfo.sellCost[14] = 440;  fruitInfo.sellCost[15] = 1700; fruitInfo.sellCost[16] = 740;
	fruitInfo.sellCost[17] = 2625;fruitInfo.sellCost[18] = 15500;fruitInfo.sellCost[19] = 23500;fruitInfo.sellCost[20] = 11000;
	
	fruitInfo.harvest[1]  = 4;fruitInfo.harvest[2]  = 4;fruitInfo.harvest[3]  = 3;fruitInfo.harvest[4]  = 3;
	fruitInfo.harvest[5]  = 4;fruitInfo.harvest[6]  = 3;fruitInfo.harvest[7]  = 1;fruitInfo.harvest[8]  = 1;
	fruitInfo.harvest[9]  = 4;fruitInfo.harvest[10] = 4;fruitInfo.harvest[11] = 4;fruitInfo.harvest[12] = 4;
	fruitInfo.harvest[13] = 3;fruitInfo.harvest[14] = 3;fruitInfo.harvest[15] = 1;fruitInfo.harvest[16] = 3;
	fruitInfo.harvest[17] = 4;fruitInfo.harvest[18] = 1;fruitInfo.harvest[19] = 1;fruitInfo.harvest[20] = 3;
	
	for( var i = 1; i <= 20; i++ ) fruitInfo.onSale[i] = (9 + Math.floor(Math.random()*4)) / 10;
	
	fruitInfo.name[1]  = "고추";  fruitInfo.name[2]  = "시금치";fruitInfo.name[3]  = "딸기";    fruitInfo.name[4]  = "토마토";
	fruitInfo.name[5]  = "오이";  fruitInfo.name[6]  = "참외";  fruitInfo.name[7]  = "수박이";  fruitInfo.name[8]  = "메론이";
	fruitInfo.name[9]  = "깻잎이";fruitInfo.name[10] = "파";    fruitInfo.name[11] = "팥이";    fruitInfo.name[12] = "피망이";
	fruitInfo.name[13] = "매실이";fruitInfo.name[14] = "귤이";  fruitInfo.name[15] = "배추";    fruitInfo.name[16] = "석류";
	fruitInfo.name[17] = "선두";  fruitInfo.name[18] = "불로초";fruitInfo.name[19] = "만년삼이";fruitInfo.name[20] = "천도복숭아";
};

function moveCrop( gTable, dTime, isRain, season ){
	var i, j;
	for( i = 0; i <= 25 ; i++ ){
		for( j = 0; j <= 25; j++ ){
			if( gTable[i][j].type != -1 && isRain && gTable[i][j].water < 600 ){
				gTable[i][j].water = 600;
				gTable[i][j].dryTime = 0;
			}
			
			/* 계절에 안 맞는 작물은 수시로 썩는다. */
			if( gTable[i][j].type > 0 && gTable[i][j].type <= 16 && Math.floor((gTable[i][j].type-1)/4)+1 != season ){
				if( Math.random()*15000 < 1 ) gTable[i][j].type = 999;
			}
			
			if( gTable[i][j].type == 999 ){
				if( gTable[i][j].water > 0 ){
					gTable[i][j].water -= dTime;
					if( gTable[i][j].water < 0 ) gTable[i][j].water = 0;
				}
				continue;
			}
			
			if( gTable[i][j].type >= 0 ){
				gTable[i][j].time += dTime;
				if( gTable[i][j].type == 0 && gTable[i][j].time >= 1000 ){
					gTable[i][j].type = -1;
					gTable[i][j].water = gTable[i][j].dryTime = 0;
					continue;
				}
				if( gTable[i][j].water > 0 ){
					gTable[i][j].water -= dTime;
					if( gTable[i][j].water < 0 ) gTable[i][j].water = 0;
				}
				else{
					gTable[i][j].dryTime += dTime;
					if( gTable[i][j].type > 16 ){
						if( gTable[i][j].dryTime >= 400 ) gTable[i][j].type = 999;
					}
					else if( gTable[i][j].type > 8 ){
						if( gTable[i][j].dryTime >= 1000 ) gTable[i][j].type = 999;
					}
					else{
						if( gTable[i][j].dryTime >= 1500 ) gTable[i][j].type = 999;
					}
				}
			}
		}
	}
};

function printCrop1( player, gTable, aSky, img, context ){
	if( player.mn != 0 ) return;
	
	var i, j;
	for( i = 0; i <= 25; i++ ){
		for( j = 0; j <= 25; j++ ){
			if( i*48+270-player.y+player.viewY < -48 || i*48+270-player.y+player.viewY > 588 ) continue;
			if( j*48+360-player.x+player.viewX < -48 || j*48+360-player.x+player.viewX > 768 ) continue;
			
			/* 썩은 작물 */
			if( gTable[i][j].type == 999 ){
				context.drawImage( img.crop, 48*3, 0, 48, 48, j*48 + 360 - player.x + player.viewX, i*48 + 270 - player.y + player.viewY, 48, 48);
			}
			/* 작물 */
			else if( gTable[i][j].type > 0 ){
				/* 씨앗 */
				if( gTable[i][j].time < 1000 ){
					context.drawImage( img.crop, 0, 0, 48, 48, j*48 + 360 - player.x + player.viewX, i*48 + 270 - player.y + player.viewY, 48, 48);
				}
				/* 새싹 */
				else if( gTable[i][j].time < 2000 ){
					/* 낮 */
					if( aSky.moon < 1.0 ){
						context.drawImage( img.crop, 48, 0, 48, 48, j*48 + 360 - player.x + player.viewX, i*48 + 270 - player.y + player.viewY, 48, 48);
					}
					/* 밤 */
					if( aSky.moon > 0.0 ){
						context.globalAlpha = aSky.moon;
						context.drawImage( img.crop, 48, 48, 48, 48, j*48 + 360 - player.x + player.viewX, i*48 + 270 - player.y + player.viewY, 48, 48);
						context.globalAlpha = 1.0;
					}
				}
				/* 열매 & 풀 */
				else{
					/* 낮 */
					if( aSky.moon < 1.0 ){
						context.drawImage( img.crop, 48*2, 0, 48, 48, j*48 + 360 - player.x + player.viewX, i*48 + 270 - player.y + player.viewY, 48, 48);
					}
					/* 밤 */
					if( aSky.moon > 0.0 ){
						context.globalAlpha = aSky.moon;
						context.drawImage( img.crop, 48*2, 48, 48, 48, j*48 + 360 - player.x + player.viewX, i*48 + 270 - player.y + player.viewY, 48, 48);
						context.globalAlpha = 1.0;
					}
				}
				/* 열매 */
				if( gTable[i][j].time >= 3000 ){
					/* 수확 하지 않을때만 */
					if( ( player.action != 4 || player.motion != 1 ) || ( player.iy != i || player.ix != j ) ){
						context.shadowBlur = 0;
						context.shadowOffsetX = -1;
						context.shadowOffsetY = 1;
						context.shadowColor = "rgba(0, 0, 0, 0.5)";
						context.drawImage( img.fruit, (gTable[i][j].type-1)*32, 0, 32, 32, 8 + j*48 + 360 - player.x + player.viewX, 8 + i*48 + 270 - player.y + player.viewY, 32, 32);
						context.shadowColor = "rgba(0, 0, 0, 0)";
					}
				}
			}
		}
	}
};

function printCrop2( player, gTable, aSky, img, context ){
	if( player.mn != 0 ) return;
	
	var i, j;
	for( i = 0; i <= 25; i++ ){
		for( j = 0; j <= 25; j++ ){
			if( i*48+270-player.y+player.viewY < -48 || i*48+270-player.y+player.viewY > 588 ) continue;
			if( j*48+360-player.x+player.viewX < -48 || j*48+360-player.x+player.viewX > 768 ) continue;
			if( i*48 + 270 - player.y + player.viewY < 255 && (player.action != 4 || player.motion != 1) ) continue;
			if( gTable[i][j].type == 999 ) continue;
			
			/* 작물 */
			if( gTable[i][j].type > 0 ){
				/* 열매 & 풀 */
				if( gTable[i][j].time >= 2000 ){
					/* 낮 */
					if( aSky.moon < 1.0 ){
						context.drawImage( img.crop, 48*2, 0, 48, 48, j*48 + 360 - player.x + player.viewX, i*48 + 270 - player.y + player.viewY, 48, 48);
					}
					/* 밤 */
					if( aSky.moon > 0.0 ){
						context.globalAlpha = aSky.moon;
						context.drawImage( img.crop, 48*2, 48, 48, 48, j*48 + 360 - player.x + player.viewX, i*48 + 270 - player.y + player.viewY, 48, 48);
						context.globalAlpha = 1.0;
					}
				}
				/* 열매 */
				if( gTable[i][j].time >= 3000 ){
					/* 수확 */
					context.shadowBlur = 0;
					context.shadowOffsetX = -1;
					context.shadowOffsetY = 1;
					context.shadowColor = "rgba(0, 0, 0, 0.5)";
					if( player.action == 4 && player.motion == 1 && player.iy == i && player.ix == j ){
						context.drawImage( img.fruit, (gTable[i][j].type-1)*32, 0, 32, 32, 8+360-24 + player.viewX, 8+270-40 + player.viewY, 32, 32);
					}
					else{
						context.drawImage( img.fruit, (gTable[i][j].type-1)*32, 0, 32, 32, 8 + j*48 + 360 - player.x + player.viewX, 8 + i*48 + 270 - player.y + player.viewY, 32, 32);
					}
					context.shadowColor = "rgba(0, 0, 0, 0)";
				}
			}
		}
	}
};