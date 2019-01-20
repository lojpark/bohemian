function initDB( db ){
	db.transaction(function(tx){
		tx.executeSql("create table Player(id, name, value)");
		tx.executeSql("create table Npc(id, name, value)");
		tx.executeSql("create table Pet(id, name, value)");
		tx.executeSql("create table Inventory(id, name, value)");
		tx.executeSql("create table Kinventory(id, name, value)");
		tx.executeSql("create table GTable(id, i, j, value)");
		tx.executeSql("create table Clock(id, name, value)");
	});
};

function deleteDB( db ){
	db.transaction(function(tx){
		tx.executeSql("drop table Player");
		tx.executeSql("drop table Npc");
		tx.executeSql("drop table Pet");
		tx.executeSql("drop table Inventory");
		tx.executeSql("drop table Kinventory");
		tx.executeSql("drop table GTable");
		tx.executeSql("drop table Clock");
	});
};

function saveFile( db, player, npc, pet, inventory, kinventory, gTable, clock ){
	db.transaction(function(tx){
		tx.executeSql("delete from Player");
		tx.executeSql("insert into Player values(?,?,?)", [1, "money", player.money]);
		tx.executeSql("insert into Player values(?,?,?)", [2, "skill1", player.skill[1]]);
		tx.executeSql("insert into Player values(?,?,?)", [3, "skill2", player.skill[2]]);
		tx.executeSql("insert into Player values(?,?,?)", [4, "skill3", player.skill[3]]);
		tx.executeSql("insert into Player values(?,?,?)", [5, "skill4", player.skill[4]]);
		tx.executeSql("insert into Player values(?,?,?)", [6, "hp", player.hp]);
		tx.executeSql("insert into Player values(?,?,?)", [7, "maxhp", player.maxhp]);
		tx.executeSql("insert into Player values(?,?,?)", [8, "stamina", player.stamina]);
		tx.executeSql("insert into Player values(?,?,?)", [9, "waterSkill", player.waterSkill]);
		tx.executeSql("insert into Player values(?,?,?)", [10, "classSkill", player.classSkill]);
		
		tx.executeSql("delete from Npc");
		tx.executeSql("insert into Npc values(?,?,?)", [1, "ryeon", npc[1].favor]);
		tx.executeSql("insert into Npc values(?,?,?)", [2, "cheong", npc[2].favor]);
		tx.executeSql("insert into Npc values(?,?,?)", [3, "jin", npc[3].favor]);
		tx.executeSql("insert into Npc values(?,?,?)", [4, "loo", npc[4].favor]);
		
		tx.executeSql("delete from Pet");
		for( var i = 1; i <= pet[0].n; i++ ){
			tx.executeSql("insert into Pet values(?,?,?)", [(i-1)*7+1, "x", pet[i].x]);
			tx.executeSql("insert into Pet values(?,?,?)", [(i-1)*7+2, "y", pet[i].y]);
			tx.executeSql("insert into Pet values(?,?,?)", [(i-1)*7+3, "maxmp", pet[i].maxmp]);
			tx.executeSql("insert into Pet values(?,?,?)", [(i-1)*7+4, "mp", pet[i].mp]);
			tx.executeSql("insert into Pet values(?,?,?)", [(i-1)*7+5, "favor", pet[i].favor]);
			tx.executeSql("insert into Pet values(?,?,?)", [(i-1)*7+6, "isTame", pet[i].isTame]);
			tx.executeSql("insert into Pet values(?,?,?)", [(i-1)*7+7, "isExist", pet[i].isExist]);
		}
		
		tx.executeSql("delete from Inventory");
		tx.executeSql("insert into Inventory values(?,?,?)", [1, "n",      inventory[0].n]);
		tx.executeSql("insert into Inventory values(?,?,?)", [2, "target", inventory[0].target]);
		tx.executeSql("insert into Inventory values(?,?,?)", [3, "tail",   inventory[0].tail]);
		for( var i = 1; i <= 40; i++ ){
			tx.executeSql("insert into Inventory values(?,?,?)", [i*2+2, i, inventory[i].type]);
			tx.executeSql("insert into Inventory values(?,?,?)", [i*2+3, i, inventory[i].number]);
		}
		
		tx.executeSql("delete from Kinventory");
		for( var i = 1; i <= 8; i++ ){
			tx.executeSql("insert into Kinventory values(?,?,?)", [i*2-1, i, kinventory[i].type]);
			tx.executeSql("insert into Kinventory values(?,?,?)", [i*2, i, kinventory[i].cost]);
		}
		
		tx.executeSql("delete from GTable");
		for( var i = 0; i <= 25; i++ ){
			for( var j = 0; j <= 25; j++ ){
				tx.executeSql("insert into GTable values(?,?,?,?)", [i*26+j*5+1, i, j, gTable[i][j].type]);
				tx.executeSql("insert into GTable values(?,?,?,?)", [i*26+j*5+2, i, j, gTable[i][j].water]);
				tx.executeSql("insert into GTable values(?,?,?,?)", [i*26+j*5+3, i, j, gTable[i][j].time]);
				tx.executeSql("insert into GTable values(?,?,?,?)", [i*26+j*5+4, i, j, gTable[i][j].dryTime]);
				tx.executeSql("insert into GTable values(?,?,?,?)", [i*26+j*5+5, i, j, gTable[i][j].harvest]);
			}
		}
		
		tx.executeSql("delete from Clock");
		tx.executeSql("insert into Clock values(?,?,?)", [1, "season", clock.season]);
		tx.executeSql("insert into Clock values(?,?,?)", [2, "day", clock.day]);
	});
};

function loadFile( db, player, npc, pet, inventory, sinventory, kinventory, fruitInfo, gTable, clock ){
	db.transaction(function(tx){
		tx.executeSql("select * from Player", [], function(tx, res){
			if( res.rows.length > 0 ){
				var row;
				row = res.rows.item(0);
				player.money = row['value'];
				row = res.rows.item(1);
				player.skill[1] = row['value'];
				row = res.rows.item(2);
				player.skill[2] = row['value'];
				row = res.rows.item(3);
				player.skill[3] = row['value'];
				row = res.rows.item(4);
				player.skill[4] = row['value'];
				row = res.rows.item(5);
				player.hp = row['value'];
				row = res.rows.item(6);
				player.maxhp = row['value'];
				row = res.rows.item(7);
				player.stamina = row['value'];
				row = res.rows.item(8);
				player.waterSkill = row['value'];
				row = res.rows.item(9);
				player.classSkill = row['value'];
			}
		});
		
		tx.executeSql("select * from Npc", [], function(tx, res){
			if( res.rows.length > 0 ){
				var row;
				for( var i = 1; i <= 4; i++ ){
					row = res.rows.item(i-1);
					npc[i].favor = row['value'];
				}
			}
		});
		
		tx.executeSql("select * from Pet", [], function(tx, res){
			if( res.rows.length > 0 ){
				var row;
				for( var i = 1; i <= pet[0].n; i++ ){
					row = res.rows.item( (i-1)*7 );
					pet[i].x = row['value'];
					row = res.rows.item( (i-1)*7+1 );
					pet[i].y = row['value'];
					row = res.rows.item( (i-1)*7+2 );
					pet[i].maxmp = row['value'];
					row = res.rows.item( (i-1)*7+3 );
					pet[i].mp = row['value'];
					row = res.rows.item( (i-1)*7+4 );
					pet[i].favor = row['value'];
					row = res.rows.item( (i-1)*7+5 );
					if( row['value'] == "false" ) pet[i].isTame = false;
					else pet[i].isTame = true;
					row = res.rows.item( (i-1)*7+6 );
					if( row['value'] == "false" ) pet[i].isExist = false;
					else pet[i].isExist = true;
					pet[i].dx = pet[i].x;
					pet[i].dy = pet[i].y;
				}
			}
		});
		
		tx.executeSql("select * from Inventory", [], function(tx, res){
			if( res.rows.length > 0 ){
				var row;
				row = res.rows.item(0);
				inventory[0].n = row['value'];
				row = res.rows.item(1);
				inventory[0].target = row['value'];
				row = res.rows.item(2);
				inventory[0].tail = row['value'];
				for( var i = 1; i <= 40; i++ ){
					row = res.rows.item(i*2+1);
					inventory[i].type = row['value'];
					row = res.rows.item(i*2+2);
					inventory[i].number = row['value'];
				}
			}
		});
		
		tx.executeSql("select * from Kinventory", [], function(tx, res){
			if( res.rows.length > 0 ){
				var row;
				for( var i = 1; i <= 8; i++ ){
					row = res.rows.item(i*2-2);
					kinventory[i].type = row['value'];
					row = res.rows.item(i*2-1);
					kinventory[i].cost = row['value'];
				}
			}
		});
		
		tx.executeSql("select * from GTable", [], function(tx, res){
			if( res.rows.length > 0 ){
				var row, k = 0;
				for( var i = 0; i <= 25; i++ ){
					for( var j = 0; j <= 25; j++ ){
						row = res.rows.item(k);
						gTable[i][j].type = row['value'];
						k++;
						row = res.rows.item(k);
						gTable[i][j].water = row['value'];
						k++;
						row = res.rows.item(k);
						gTable[i][j].time = row['value'];
						k++;
						row = res.rows.item(k);
						gTable[i][j].dryTime = row['value'];
						k++;
						row = res.rows.item(k);
						gTable[i][j].harvest = row['value'];
						k++;
					}
				}
			}
		});
		
		tx.executeSql("select * from Clock", [], function(tx, res){
			if( res.rows.length > 0 ){
				var row;
				row = res.rows.item(0);
				clock.season = row['value'];
				row = res.rows.item(1);
				clock.day = row['value'];
				
				if( clock.day % 5 == 0 ){
					npc[4].x = Math.floor( Math.random()*1000+100 );
					if( Math.random()*2 < 1 ) npc[4].y = Math.floor( Math.random()*300+200 );
					else npc[4].y = Math.floor( Math.random()*180+970 );
				}
				else npc[4].x = npc[4].y = -1200;
				
				initSeedInventory( sinventory, clock, fruitInfo );
			}
		});
	});
};