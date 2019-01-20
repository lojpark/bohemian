$(document).ready(function(){
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

	var hide = false;
	var key = new Object();
	var player = new Object();
	var star = new Array();
	var sun = new Object(), moon = new Object();
	var aSky = new Object();
	var clock = new Object();
	var house = new Array();
	var menu = new Object();
	var npc = new Array();
	var textbox = new Object();
	var inventory = new Array(), sinventory = new Array(), kinventory = new Array();
	var fruitInfo = new Object();
	var rain = new Array();
	var pet = new Array();
	var pt = new Array();
	var storyTime = 0, storyMotion = 0, motionKing = 0, motionAngel = 0, isEnding = false;
	
	var gTable = new Array();
	for( var i = 0; i <= 25; i++ ){
		gTable[i] = new Array();
		for( var j = 0; j <= 25; j++ ){
			gTable[i][j] = new Object();
			gTable[i][j].type = -1;
			gTable[i][j].water = 0;
			gTable[i][j].time = 0;
			gTable[i][j].dryTime = 0;
			gTable[i][j].harvest = 0;
		}
	}
	
	var db = window.openDatabase("farmDB", "1.0", "farm", 1000);
	
	var img = new Object();
	img.player = new Image();
	img.player.src = "image/player.png";
	img.tile = new Image();
	img.tile.src = "image/tile.png";
	img.floor = new Image();
	img.floor.src = "image/floor.png";
	img.shelf = new Image();
	img.shelf.src = "image/shelf.png";
	img.border = new Image();
	img.border.src = "image/border.png";
	img.ground = new Image();
	img.ground.src = "image/ground.png";
	img.crop = new Image();
	img.crop.src = "image/crop.png";
	img.moon = new Image();
	img.moon.src = "image/moon.png";
	img.sun = new Image();
	img.sun.src = "image/sun.png";
	img.island = new Image();
	img.island.src = "image/island.png";
	img.day = new Image();
	img.day.src = "image/day.png";
	img.twilight = new Image();
	img.twilight.src = "image/twilight.png";
	img.none = new Image();
	img.none.src = "image/none.png";
	img.house = new Image();
	img.house.src = "image/house.png";
	img.door = new Image();
	img.door.src = "image/door.png";
	img.ryeon = new Image();
	img.ryeon.src = "image/ryeon.png";
	img.cheong = new Image();
	img.cheong.src = "image/cheong.png";
	img.jin = new Image();
	img.jin.src = "image/jin.png";
	img.loo = new Image();
	img.loo.src = "image/loo.png";
	img.tail = new Image();
	img.tail.src = "image/tail.png";
	img.square = new Image();
	img.square.src = "image/square.png";
	img.seed = new Image();
	img.seed.src = "image/seed.png";
	img.fruit = new Image();
	img.fruit.src = "image/fruit.png";
	img.target = new Image();
	img.target.src = "image/target.png";
	img.rain = new Image();
	img.rain.src = "image/rain.png";
	img.snow = new Image();
	img.snow.src = "image/snow.png";
	img.pet = new Image();
	img.pet.src = "image/pet.png";
	img.king = new Image();
	img.king.src = "image/king.png";
	img.angel = new Image();
	img.angel.src = "image/angel.png";
	img.castle = new Image();
	img.castle.src = "image/castle.png";
	
	
	document.onkeydown = function(e){
		var press_key = e || window.event;
		switch (press_key.keyCode) {
			case 38:
				key.up = true;
				key.z = key.enter = false;
				break;
			case 40:
				key.down = true;
				key.z = key.enter = false;
				break;
			case 37:
				key.left = true;
				key.z = key.enter = false;
				break;
			case 39:
				key.right = true;
				key.z = key.enter = false;
				break;
			case 13:
				key.enter = true;
				break;
			case 90:
				if( pet[7].isAction ){
					pet[7].isAction = false;
					break;
				}
				if( player.spd == 6 ){
					player.spd = 3;
					pet[2].isAction = false;
					pet[2].motion = 0;
				}
				else if( player.nearNpc > 0 && menu.type == 0 && !inventory[0].isOpen && !sinventory[0].isOpen && !kinventory[0].isOpen ){
					key.z = false;
					initMenu( menu, player.nearNpc+1 );
				}
				else if( player.nearPet > 0 && menu.type == 0 && !inventory[0].isOpen && !sinventory[0].isOpen && !kinventory[0].isOpen ){
					key.z = false;
					if( pet[player.nearPet].isTame ) initMenu( menu, player.nearPet+20 );
					else initMenu( menu, player.nearPet+10 );
				}
				else key.z = true;
				break;
			case 27:
				if( menu.type == 1 || menu.type == 7 || menu.type == 9 ) break;
				if( inventory[0].type == 3 || sinventory[0].isLoo ) looScript( 5, textbox, npc );
				else if( sinventory[0].isOpen ) cheongScript( 5, textbox, npc );
				else if( inventory[0].type == 1 || kinventory[0].isOpen ) jinScript( 5, textbox, npc );
				sinventory[0].isOpen = sinventory[0].isLoo = false;
				kinventory[0].isOpen = false;
				inventory[0].isOpen = false;
				inventory[0].type = 0;
				menu.type = 0;
				break;
			/* 시간 빠르게 돌리기! */
			/*case 65:
				for( var i = 0; i <= 1000; i++ ){
					moveClock( clock, player, npc, gTable, inventory, sinventory, kinventory, fruitInfo, rain, pet, house, textbox, db );
				}
				break;*/
		}
	};
	document.onkeyup = function(e){
		var press_key = e || window.event;
		switch (press_key.keyCode) {
			case 38: key.up = false; break;
			case 40: key.down = false; break;
			case 37: key.left = false; break;
			case 39: key.right = false; break;
			case 13: key.enter = false; break;
			case 32:
				if( storyTime > 0 ) break;
				hide = !hide;
				context.fillStyle = "rgb(255,255,255)";
				context.fillRect(0, 0, 720, 540);
				animate();
				break;
			case 73:
				if( menu.type == 0 && !sinventory[0].isOpen && inventory[0].type == 0 ){
					inventory[0].isOpen = !inventory[0].isOpen;
				}
				break;
			case 88:
				if( storyTime > 0 ) break;
				
				player.isGather = !player.isGather;
				if( player.isGather ){
					gatherPet( pet, player );
					initTextbox( textbox, player.x, player.y, 1, "모여!", true );
				}
				else initTextbox( textbox, player.x, player.y, 1, "놀아!", true );
				break;
			case 90:
				if( storyTime > 0 && !isEnding ){
					if( storyTime < 99 ) storyTime = 99;
					else if( storyTime < 249 ) storyTime = 249;
					else if( storyTime < 399 ) storyTime = 399;
					else if( storyTime < 549 ) storyTime = 549;
					else if( storyTime < 699 ) storyTime = 699;
					else if( storyTime < 849 ) storyTime = 849;
					else if( storyTime < 999 ) storyTime = 999;
					else if( storyTime < 1149 ) storyTime = 1149;
					else if( storyTime < 1299 ) storyTime = 1299;
					else if( storyTime < 1449 ) storyTime = 1449;
					key.z = false;
					break;
				}
				if( player.action != 0 || player.mn != 0 || !key.z || sinventory[0].isOpen || kinventory[0].isOpen || inventory[0].isOpen ) break;
				if( player.nearPet != 0 || player.nearNpc != 0 ) break;
				/* 개간 */
				if( gTable[player.iy][player.ix].type < 0 || gTable[player.iy][player.ix].type == 999 ) player.action = 1;
				/* 파종 */
				else if( gTable[player.iy][player.ix].type == 0 ) player.action = 2;
				/* 수확 */
				else if( gTable[player.iy][player.ix].type > 0 && gTable[player.iy][player.ix].time >= 3000 ) player.action = 4;
				/* 관수 */
				else if( gTable[player.iy][player.ix].water <= 0 ) player.action = 3;
				/* 구별 */
				else if( gTable[player.iy][player.ix].type > 0 && player.classSkill > 0 ){
					initTextbox( textbox, player.x, player.y, 2, "딱 보니까^이건 " + fruitInfo.name[gTable[player.iy][player.ix].type] + "다!", true );
				}
				player.motion = player.motionDelay = 0;
				key.z = false;
				break;
		}
	};
		
	function intro(){
		context.clearRect( 0, 0, canvasWidth, canvasHeight );
		
		var chk = moveIntroMenu( menu, key );
		if( chk != 0 ){
			init( chk );
			return;
		}
		
		printIntroMenu( menu, img, context );
		
		setTimeout(intro, 33);
	};
	
	function init( loadType ){
		key.up = key.down = key.left = key.right = key.z = key.enter = false;
		hide = false;
		
		initPlayer( player, db );
		initSky( aSky, sun, moon, star );
		initClock( clock );
		initHouse( house );
		initNpc( npc );
		initFruitInfo( fruitInfo );
		initInventory( inventory );
		initSeedInventory( sinventory, clock, fruitInfo );
		initSkillInventory( kinventory );
		initTextbox( textbox, 0, 0, 0, 0, false );
		initWeather( rain );
		initPet( pet );
		initParticle( pt );
		
		if( loadType == 1 ){
			loadFile( db, player, npc, pet, inventory, sinventory, kinventory, fruitInfo, gTable, clock );
			animate();
		}
		else{
			animateOpening();
			deleteDB( db );
			initDB( db );
		}
	};
	
	function animateOpening(){
		context.clearRect( 0, 0, canvasWidth, canvasHeight );
		
		if( menu.type == 0 ) storyTime++;
		storyMotion++;
		
		if( storyMotion % 5 == 0 ) motionKing = (motionKing + 1) % 4;
		if( storyMotion % 20 == 0 ) motionAngel = (motionAngel + 1) % 2;
		
		if( storyTime == 100 ) initTextbox( textbox, 640, 90, 4, "어리석은 녀석!^너 처럼 게으르고^한심한 녀석은^처음 본다!");
		if( storyTime == 250 ) initTextbox( textbox, 640, 90, 2, "넌 인간 세상으로^추방이야!");
		if( storyTime == 400 ) initTextbox( textbox, 640, 90, 3, "돌아오려거든^두 가지 조건을^만족해야한다!");
		if( storyTime == 550 ) initTextbox( textbox, 640, 90, 4, "첫째,^혼자 힘으로^인간 세상의 돈^1백만G를 벌어라!");
		if( storyTime == 700 ) initTextbox( textbox, 640, 90, 3, "둘째,^인간 여자와^진심으로 사랑해라!");
		if( storyTime == 850 ) initTextbox( textbox, 640, 90, 3, "두 가지 조건을^모두 성취하면^다시 돌아와도 좋다.");
		if( storyTime == 1000 ) initTextbox( textbox, 640, 90, 3, "그 전까지^돌아올 생각은^꿈도 꾸지 마!");
		if( storyTime == 1150 ) initTextbox( textbox, 640, 90, 1, "...");
		if( storyTime == 1300 ) initTextbox( textbox, 640, 90, 3, "인간 세상에서^살아갈 직업은^무엇이 좋겠느냐?");
		if( storyTime == 1450 && menu.type == 0 ) initMenu( menu, 8 );
		if( storyTime >= 1451 ) initTextbox( textbox, 640, 90, 2, "틀렸어!^너는 농부가 된다!");
		
		moveTextbox( textbox );
		moveMenu( menu, player, npc, pet, inventory, sinventory, kinventory, textbox, clock, key );
		
		context.drawImage( img.castle, 0, 0, 720, 540, 0, 0, 720, 540 );
		context.drawImage( img.king, motionKing*95, 0, 95, 185, 360 - 47, 80, 95, 185 );
		context.drawImage( img.angel, motionAngel*32, 0, 32, 48, 360 - 16, 370, 32, 48 );
		printTextbox( textbox, player, img, context );
		if( menu.type > 0 ) printMenu( menu, npc, pet, clock, img, context );
		if( storyMotion%30 < 15 && storyTime < 1450 ){
			context.fillStyle = "rgb(32, 32, 32)";
			context.font = "bold 16px helvetica";
			context.fillText( "z키를 눌러 딴생각 하기", 530, 530 );
		}
		
		if( storyTime >= 1500 ){
			context.fillStyle = "rgba(0, 0, 0, " + (storyTime-1500)/150 + ")";
			context.fillRect( 0, 0, 720, 540 );
		}
		if( storyTime == 1650 ){
			storyTime = 0;
			textbox.time = 0;
			for( var i = 1; i <= 360; i++ ) makeParticle( pt, player.x, player.y, Math.random()+1, 5 );
			animate();
			return;
		}
		
		setTimeout( animateOpening, 33 );
	};
	
	function animateEnding(){
		isEnding = true;
		context.clearRect( 0, 0, canvasWidth, canvasHeight );
		
		if( menu.type == 0 ) storyTime++;
		storyMotion++;
		
		if( storyMotion % 5 == 0 ) motionKing = (motionKing + 1) % 4;
		if( storyMotion % 20 == 0 ) motionAngel = (motionAngel + 1) % 2;
		
		if( storyTime == 1 ){
			for( var i = 1; i <= 360; i++ ) makeParticle( pt, 595, 340, Math.random()+1, 5 );
		}
		if( storyTime == 100 ) initTextbox( textbox, 640, 90, 2, "장하구나!^역시 내 아들이야.");
		if( storyTime == 250 ) initTextbox( textbox, 640, 90, 2, "난 네가 해낼 줄^알고 있었다.");
		if( storyTime == 400 ) initTextbox( textbox, 640, 90, 1, "...");
		if( storyTime == 550 ) initTextbox( textbox, 640, 90, 3, "표정을 보아하니^인간 세상에 정이^많이 들었나 보구나.");
		if( storyTime == 700 ) initTextbox( textbox, 640, 90, 2, "혹시 다시^돌아가고 싶은게냐?");
		if( storyTime == 850 && menu.type == 0 ) initMenu( menu, 9 ); 
		if( storyTime == 851 && menu.sel == 1 ) initTextbox( textbox, 640, 90, 4, "멍청한 놈!^네가 인간인줄 알아?^사사로운 정에^이끌려선 안돼!");
		if( storyTime == 851 && menu.sel == 2 ) initTextbox( textbox, 640, 90, 3, "당연하지.^왕이 되려면 비정한^면도 있어야 해.");
		if( storyTime == 1000 ) initTextbox( textbox, 640, 90, 2, "내일부터 수업을^시작한다.");
		if( storyTime >= 1150 ) initTextbox( textbox, 640, 90, 2, "왕이 될 준비는^되었겠지?");
		
		moveTextbox( textbox );
		moveMenu( menu, player, npc, pet, inventory, sinventory, kinventory, textbox, clock, key );
		moveParticle( pt );
		
		context.drawImage( img.castle, 0, 0, 720, 540, 0, 0, 720, 540 );
		context.drawImage( img.king, motionKing*95, 0, 95, 185, 360 - 47, 80, 95, 185 );
		context.drawImage( img.angel, motionAngel*32, 0, 32, 48, 360 - 16, 370, 32, 48 );
		printParticle( pt, player, img, context );
		printTextbox( textbox, player, img, context );
		if( menu.type > 0 ) printMenu( menu, npc, pet, clock, img, context );
		
		if( storyTime >= 1750 ){
			context.fillStyle = "rgb(0, 0, 0)";
			context.fillRect( 0, 0, 720, 540 );
			context.fillStyle = "rgba(255, 255, 255, " + (storyTime-1750)/150 + ")";
			context.font = "bold 40px helvetica";
			context.fillText( "끝", 344, 270 );
			if( storyTime == 1900 ) return;
		}
		else if( storyTime >= 1300 ){
			context.fillStyle = "rgb(0, 0, 0)";
			context.fillRect( 0, 0, 720, 540 );
			if( storyTime >= 1600 ) context.fillStyle = "rgba(255, 255, 255, " + (1.0 - (storyTime-1600)/150) + ")";
			else if( storyTime >= 1450 ) context.fillStyle = "rgb(255, 255, 255)";
			else if( storyTime >= 1300 ) context.fillStyle = "rgba(255, 255, 255, " + (storyTime-1300)/150 + ")";
			context.font = "bold 20px helvetica";
			context.fillText( "그렇게 그는 왕이 되었다.", 260, 230 );
			context.fillText( "그가 다시 인간세계에 갔을 때에는", 220, 270 );
			context.fillText( "이미 모두 죽고 아무도 없었다.", 240, 310 );
		}
		else if( storyTime >= 1150 ){
			context.fillStyle = "rgba(0, 0, 0, " + (storyTime-1150)/150 + ")";
			context.fillRect( 0, 0, 720, 540 );
		}
		
		setTimeout( animateEnding, 33 );
	};
	
	function animate(){
		if( hide ) return;
		context.clearRect( 0, 0, canvasWidth, canvasHeight );
		
		moveClock( clock, player, npc, gTable, inventory, sinventory, kinventory, fruitInfo, rain, pet, house, textbox, db );
		moveSky( aSky, sun, moon, clock );
		moveNpc( npc );
		moveTextbox( textbox );
		moveParticle( pt );
		if( menu.type == 0 && !inventory[0].isOpen && !sinventory[0].isOpen && !kinventory[0].isOpen ) movePlayer( player, house, npc, pet, gTable, inventory, textbox, fruitInfo, key );
		else{
			if( sinventory[0].isOpen ) moveSeedInventory( sinventory, inventory, player, key );
			else if( kinventory[0].isOpen ) moveSkillInventory( kinventory, inventory, player, key );
			else if( inventory[0].isOpen ) moveInventory( inventory, player, npc, pet, fruitInfo, textbox, clock.season, key );
			else{
				if( moveMenu( menu, player, npc, pet, inventory, sinventory, kinventory, textbox, clock, key ) == -1 ){
					animateEnding();
					return;
				}
			}
		}
		
		iPH( player, npc, pet, house, menu );
		
		printSky( player, sun, moon, star, aSky, img, context );
		printTile( player, aSky, img, context );
		printGround( player, gTable, img, context );
		printPetEffect( pet, player, pt, img, context );
		printPetStatus( pet, player, img, context );
		printNpc1( npc, player, img, context );
		printPet1( pet, player, img, context );
		printHouse1( house, player, img, context );
		printCrop1( player, gTable, aSky, img, context );
		printPlayer( player, img, context );
		printNpc2( npc, player, img, context );
		printPet2( pet, player, img, context );
		printHouse2( house, player, img, context );
		printCrop2( player, gTable, aSky, img, context );
		printParticle( pt, player, img, context );
		printWeather( rain, player, clock, img, context );
		printClock( clock, img, context );
		printTextbox( textbox, player, img, context );
		printFavor( npc, player, context );
		printPetFavor( pet, player, context );
		if( menu.type > 0 ) printMenu( menu, npc, pet, clock, img, context );
		printInventory( inventory, player, fruitInfo, img, context );
		printSeedInventory( sinventory, player, img, context );
		printSkillInventory( kinventory, player, img, context );
		printPlayerStatus( player, img, context );
		
		context.font = "14px helvetica";
		context.fillStyle = "rgb(255,255,255)";
		context.fillText( player.x + ", " + player.y, 10, 15 );
		
		setTimeout(animate, 33);
	};
	
	initMenu( menu, 0 );
	intro();
});


/*
context.font = "14px helvetica";
context.fillStyle = "rgb(255,255,255)";
context.fillText( document.getElementById("box").value, 360, 340 );
*/