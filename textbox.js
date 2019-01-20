function initTextbox( textbox, x, y, line, text, isDynamic ){
	textbox.x = x - 20;
	textbox.y = y - 50 - 12*line;
	textbox.line = line;
	textbox.time = 0;
	if( x != 0 ) textbox.time = 100;
	textbox.text = text;
	textbox.isDynamic = isDynamic;
};

function moveTextbox( textbox ){
	textbox.time--;
};

function printTextbox( textbox, player, img, context ){
	if( textbox.time <= 0 ) return;
	var t = textbox, p = player;
	var i, width = 0, x = 0, y = 0;
	
	for( i = 0; i < t.text.length; i++ ){
		if( t.text[i] == '^' || i == t.text.length-1 ){
			if( width < x ) width = x;
			x = 0;
			continue;
		}
		if( t.text[i] == ' ' ) x -= 6;
		x += 12;
	}
	width += 23;
	
	context.fillStyle = "rgb(255,255,255)";
	if( player.mn == 0 ){
		context.fillRect( 360 + t.x - p.x + p.viewX, 270 + t.y - p.y + p.viewY, width, 9 + 15*t.line );
		context.drawImage( img.tail, 0, 0, 14, 8, 360+30 + t.x - p.x + p.viewX, 270+9+15*t.line + t.y - p.y + p.viewY, 14, 8);
	}
	else{
		context.fillRect( t.x , t.y, width, 9 + 14*t.line );
		context.drawImage( img.tail, 0, 0, 14, 8, 30 + t.x, 9+14*t.line + t.y, 14, 8);
	}
	
	context.font = "12px helvetica";
	context.fillStyle = "rgb(0,0,0)";
	if( player.mn == 0 ){
		x = 8 + 360 + t.x - player.x + player.viewX;
		y = 16 + 270 + t.y - player.y + player.viewY;
	}
	else{
		x = 8 + t.x;
		y = 16 + t.y;
	}
	for( i = 0; i < t.text.length; i++ ){
		if( t.text[i] == '^' ){
			if( player.mn == 0 ) x = 8 + 360 + t.x - player.x + player.viewX;
			else x = 8 + t.x;
			y += 15;
			continue;
		}
		context.fillText( t.text[i], x, y );
		if( t.text[i] == ' ' ) x -= 6;
		x += 12;
	}
};