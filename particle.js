function initParticle( pt ){
	pt[0] = new Object();
	pt[0].n = 0;
};

function makeParticle( pt, x, y, scale, type ){
	pt[0].n++;
	pt[ pt[0].n ] = new Object();
	pt[ pt[0].n ].x = x;
	pt[ pt[0].n ].y = y;
	pt[ pt[0].n ].type = type;
	pt[ pt[0].n ].scale = scale;
	pt[ pt[0].n ].time = 0;
	
	if( type == 1 || type == 2 ){
		pt[ pt[0].n ].vy = -2;
		pt[ pt[0].n ].vx = Math.random()*2-1;
	}
	if( type == 3 ){
		var theta = Math.random()*2*3.14;
		pt[ pt[0].n ].vy = Math.sin(theta) * 2;
		pt[ pt[0].n ].vx = Math.cos(theta) * 2;
	}
	if( type == 4 ){
		var theta = Math.random()*2*3.14;
		pt[ pt[0].n ].vy = Math.sin(theta) * 4;
		pt[ pt[0].n ].vx = Math.cos(theta) * 4;
	}
	if( type == 5 ){
		var theta = Math.random()*2*3.14;
		pt[ pt[0].n ].vy = Math.sin(theta) * (Math.random()+2) * 2;
		pt[ pt[0].n ].vx = Math.cos(theta) * (Math.random()+2) * 2;
	}
};

function delParticle( pt, i ){
	var j;
	for( j = i; j < pt[0].n; j++ ){
		pt[j].x = pt[j+1].x;
		pt[j].y = pt[j+1].y;
		pt[j].type = pt[j+1].type;
		pt[j].scale = pt[j+1].scale;
		pt[j].time = pt[j+1].time;
		pt[j].vy = pt[j+1].vy;
		pt[j].vx = pt[j+1].vx;
	}
	pt[0].n--;
};

function moveParticle( pt ){
	var i;
	for( i = 1; i <= pt[0].n; i++ ){
		if( pt[i].type == 1 || pt[i].type == 2 ){
			pt[i].vy += 0.1;
		}
		if( pt[i].type == 4 ) pt[i].time += 2;
		if( pt[i].type == 5 ) pt[i].time -= 0.5;
		
		pt[i].x += pt[i].vx;
		pt[i].y += pt[i].vy;
		pt[i].time++;
		
		if( pt[i].time > 50 ){
			delParticle( pt, i );
			i--;
		}
	}
};

function printParticle( pt, player, img, context ){
	if( player.mn != 0 ) return;
	
	var i;
	for( i = 1; i <= pt[0].n; i++ ){
		if( pt[i].type == 1 ) context.fillStyle = "rgba(123, 187, 255, 0.5)";
		if( pt[i].type == 2 ) context.fillStyle = "rgba(255, 255, 64, 0.5)";
		if( pt[i].type == 3 ) context.fillStyle = "rgba(255, 128, 128, 0.5)";
		if( pt[i].type == 4 ){
			if( Math.random()*10 <= 1 ) context.fillStyle = "rgb(255, 255, 64)";
			else context.fillStyle = "rgb(255, 64, 64)";
		}
		if( pt[i].type == 5 ) context.fillStyle = "rgb(255, 255, 64)";
		context.beginPath();
		context.arc( 360+pt[i].x-player.x + player.viewX, 270+pt[i].y-player.y + player.viewY, pt[i].scale, 0, Math.PI*2, false);
		context.closePath();
		context.fill();
	}
};