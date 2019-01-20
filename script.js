function ryeonScript( type, textbox, npc ){
	var temp = 1;
	/* 대화 */
	if( type == 1 ){
		if( npc[1].favor < 10 ){
			temp = Math.floor( Math.random()*4 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "...", false );
					break;
				case 2:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "혼자 있고 싶어.", false );
					break;
				case 3:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "저리 가!", false );
					break;
				case 4:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "내버려둬.", false );
					break;
			}
		}
		else if( npc[1].favor < 30 ){
			temp = Math.floor( Math.random()*4 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "...", false );
					break;
				case 2:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "나한테 왜 이러는거야?", false );
					break;
				case 3:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "집?...^여기가 내 집이야.", false );
					break;
				case 4:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "그건 알아서 뭐하게!", false );
					break;
			}
		}
		else if( npc[1].favor < 50 ){
			temp = Math.floor( Math.random()*5 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "...", false );
					break;
				case 2:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "엄마...^보고싶어...", false );
					break;
				case 3:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "집?...^여기가 내 집이야.", false );
					break;
				case 4:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "아니야...^신경 쓰지마...", false );
					break;
				case 5:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "정말?...^거짓말!", false );
					break;
			}
		}
		else if( npc[1].favor < 75 ){
			temp = Math.floor( Math.random()*5 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "넌 정말...^못 말리는 애야.", false );
					break;
				case 2:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "엄마...^보고싶어...", false );
					break;
				case 3:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "엄마는 나를 버렸어.", false );
					break;
				case 4:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "아니야...^신경 쓰지마...", false );
					break;
				case 5:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "정말?...^거짓말!", false );
					break;
			}
		}
		else{
			temp = Math.floor( Math.random()*5 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "나도 네가 좋아...♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[1].x, npc[1].y, 3, "약속해줘!^항상 내 곁에^있어줄거지?", false );
					break;
				case 3:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "우리 엄마처럼^날 버리지 않을거지?", false );
					break;
				case 4:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "넌 정말 다정한 것 같아.", false );
					break;
				case 5:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "믿을 수 있는^사람이 생겨서 기뻐♥", false );
					break;
			}
		}
	}
	/* 좋은 선물 */
	if( type == 2 ){
		if( npc[1].favor < 10 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "...", false );
					break;
				case 2:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "흥ㆍㆍㆍ !", false );
					break;
			}
		}
		else if( npc[1].favor < 50 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "이런거 줘도^별로 고맙지 않아.", false );
					break;
				case 2:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "흥ㆍㆍㆍ !", false );
					break;
			}
		}
		else{
			initTextbox( textbox, npc[1].x, npc[1].y, 1, "고마워...♥", false );
		}
	}
	/* 나쁜 선물 */
	if( type == 3 ){
		if( npc[1].favor < 10 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "...", false );
					break;
				case 2:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "짜증나.", false );
					break;
			}
		}
		else if( npc[1].favor < 50 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "...", false );
					break;
				case 2:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "필요 없어.", false );
					break;
			}
		}
		else{
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[1].x, npc[1].y, 1, "...", false );
					break;
				case 2:
					initTextbox( textbox, npc[1].x, npc[1].y, 2, "지금은 받을^기분이 아니야.", false );
					break;
			}
		}
	}
	/* 선물 그만해 */
	if( type == 4 ){
		initTextbox( textbox, npc[1].x, npc[1].y, 1, "...", false );
	}
};

function cheongScript( type, textbox, npc ){
	var temp = 1;
	/* 대화 */
	if( type == 1 ){
		if( npc[2].favor < 10 ){
			temp = Math.floor( Math.random()*3 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "안녕~", false );
					break;
				case 2:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "어서와~", false );
					break;
				case 3:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "요즘 어때?", false );
					break;
			}
		}
		else if( npc[2].favor < 30 ){
			temp = Math.floor( Math.random()*4 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "안녕~♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "어서와~♥", false );
					break;
				case 3:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "또 왔네~!", false );
					break;
				case 4:
					initTextbox( textbox, npc[2].x, npc[2].y, 2, "참!^그 얘기 들었어?", false );
					break;
			}
		}
		else if( npc[2].favor < 50 ){
			temp = Math.floor( Math.random()*5 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "어서와~♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "글쎄, 걔가 그랬대!", false );
					break;
				case 3:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "정말 웃기지 않아?", false );
					break;
				case 4:
					initTextbox( textbox, npc[2].x, npc[2].y, 2, "참!^그 얘기 들었어?", false );
					break;
				case 5:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "웃겨 정말~", false );
					break;
			}
		}
		else if( npc[2].favor < 75 ){
			temp = Math.floor( Math.random()*5 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[2].x, npc[2].y, 2, "어서와~♥^멋진 청년♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "너랑 있으면 즐거워♥", false );
					break;
				case 3:
					initTextbox( textbox, npc[2].x, npc[2].y, 2, "하하, 정말?^너도 멋있어~♥", false );
					break;
				case 4:
					initTextbox( textbox, npc[2].x, npc[2].y, 2, "참!^그 얘기 들었어?", false );
					break;
				case 5:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "웃겨 정말~♥", false );
					break;
			}
		}
		else{
			temp = Math.floor( Math.random()*5 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[2].x, npc[2].y, 2, "어서와~♥^자기~♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "너랑 있으면 즐거워♥", false );
					break;
				case 3:
					initTextbox( textbox, npc[2].x, npc[2].y, 2, "하하, 정말?^너도 멋있어~♥", false );
					break;
				case 4:
					initTextbox( textbox, npc[2].x, npc[2].y, 4, "네가 없어지면?^글쎄~^무지무지 슬프겠지?^그런데 왜?", false );
					break;
				case 5:
					initTextbox( textbox, npc[2].x, npc[2].y, 3, "이제 네가 없는^일상은 상상할^수가 없어!", false );
					break;
			}
		}
	}
	/* 좋은 선물 */
	if( type == 2 ){
		if( npc[2].favor < 10 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "어머~ 고마워라~", false );
					break;
				case 2:
					initTextbox( textbox, npc[2].x, npc[2].y, 2, "이렇게 비싼걸!^고마워~", false );
					break;
			}
		}
		else if( npc[2].favor < 50 ){
			temp = Math.floor( Math.random()*3 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "어머~ 고마워라~♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[2].x, npc[2].y, 2, "이렇게 비싼걸!^고마워~♥", false );
					break;
				case 3:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "너, 보는 눈이 있구나?", false );
					break;
			}
		}
		else{
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "고마워~♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[2].x, npc[2].y, 2, "내 생각 해주는건^너 밖에 없다니까~♥", false );
					break;
			}
		}
	}
	/* 나쁜 선물 */
	if( type == 3 ){
		if( npc[2].favor < 10 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "하하~ 너도 참~", false );
					break;
				case 2:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "좀 더 성의를 보여봐~", false );
					break;
			}
		}
		else{
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "하하~ 너도 참~♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[2].x, npc[2].y, 1, "왜 그래 정말~!", false );
					break;
			}
		}
	}
	/* 선물 그만해 */
	if( type == 4 ){
		initTextbox( textbox, npc[2].x, npc[2].y, 1, "오늘은 그만 됐어~", false );
	}
	/* 상점 닫기 */
	if( type == 5 ){
		if( npc[2].favor < 10 ){
			initTextbox( textbox, npc[2].x, npc[2].y, 1, "다음에 또 와~", false );
		}
		else{
			initTextbox( textbox, npc[2].x, npc[2].y, 1, "다음에 또 와~♥", false );
		}
	}
};

function jinScript( type, textbox, npc ){
	var temp = 1;
	/* 대화 */
	if( type == 1 ){
		if( npc[3].favor < 10 ){
			temp = Math.floor( Math.random()*3 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "안녕!", false );
					break;
				case 2:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "또 보네.", false );
					break;
				case 3:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "힘들다 힘들어.", false );
					break;
			}
		}
		else if( npc[3].favor < 30 ){
			temp = Math.floor( Math.random()*4 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "안녕~!", false );
					break;
				case 2:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "오늘은 무슨 일이야?", false );
					break;
				case 3:
					initTextbox( textbox, npc[3].x, npc[3].y, 3, "인생 참...^힘들다 힘들어.^그렇지 않아?", false );
					break;
				case 4:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "뭐 도와줄 거라도 있어?", false );
					break;
			}
		}
		else if( npc[3].favor < 50 ){
			temp = Math.floor( Math.random()*5 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "안녕~♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "언제 오나 기다렸잖아!", false );
					break;
				case 3:
					initTextbox( textbox, npc[3].x, npc[3].y, 2, "요즘은 그래도^네가 있어서 살만해.", false );
					break;
				case 4:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "뭐 도와줄 거라도 있어?", false );
					break;
				case 5:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "응응!", false );
					break;
			}
		}
		else if( npc[3].favor < 75 ){
			temp = Math.floor( Math.random()*7 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "안녕~♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "언제 오나 기다렸잖아!", false );
					break;
				case 3:
					initTextbox( textbox, npc[3].x, npc[3].y, 4, "요즘은 그래도^네가 있어서 살만해.^힘들어도 네 얼굴보면^힘이 나는 것 같아!", false );
					break;
				case 4:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "뭐 도와줄 거라도 있어?", false );
					break;
				case 5:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "응응!", false );
					break;
				case 6:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "정말로?^잉, 부끄럽게...", false );
					break;
				case 7:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "넌 정말 다정한^남자야~^널 만날 수 있어서^참 다행이야.", false );
					break;
			}
		}
		else{
			temp = Math.floor( Math.random()*7 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "안녕~♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "언제 오나 기다렸잖아!", false );
					break;
				case 3:
					initTextbox( textbox, npc[3].x, npc[3].y, 4, "요즘은 그래도^네가 있어서 살만해.^힘들어도 네 얼굴보면^힘이 나는 것 같아♥", false );
					break;
				case 4:
					initTextbox( textbox, npc[3].x, npc[3].y, 4, "네가 없어지면?^안 돼!^...^아무튼 안 돼!", false );
					break;
				case 5:
					initTextbox( textbox, npc[3].x, npc[3].y, 4, "불안하게 왜 그런^소리를 하는거야!^당연히 항상^네 곁에 있어야지!", false );
					break;
				case 6:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "정말로?^잉, 부끄럽게...♥", false );
					break;
				case 7:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "넌 정말 다정한^남자야~♥^널 만날 수 있어서^참 다행이야!", false );
					break;
			}
		}
	}
	/* 좋은 선물 */
	if( type == 2 ){
		if( npc[3].favor < 10 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "땡큐!", false );
					break;
				case 2:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "감사~", false );
					break;
			}
		}
		else if( npc[3].favor < 50 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "뭘 이런걸 다...", false );
					break;
				case 2:
					initTextbox( textbox, npc[3].x, npc[3].y, 2, "너 정말 내생각^많이 하는구나!", false );
					break;
			}
		}
		else{
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "고마워~♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[3].x, npc[3].y, 2, "너 정말 내생각^많이 하는구나♥", false );
					break;
			}
		}
	}
	/* 나쁜 선물 */
	if( type == 3 ){
		if( npc[3].favor < 10 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "장난해?", false );
					break;
				case 2:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "뭐야 이게?", false );
					break;
			}
		}
		else if( npc[3].favor < 50 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "이건 언제든 먹을 수 있어.", false );
					break;
				case 2:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "별로다 정말.", false );
					break;
			}
		}
		else{
			initTextbox( textbox, npc[3].x, npc[3].y, 1, "이건 언제든 먹을 수 있어~", false );
		}
	}
	/* 선물 그만해 */
	if( type == 4 ){
		if( npc[3].favor < 10 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "부담스러워!", false );
					break;
				case 2:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "왜 자꾸 주는거야?", false );
					break;
			}
		}
		else if( npc[3].favor < 50 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "이제 그만해.", false );
					break;
				case 2:
					initTextbox( textbox, npc[3].x, npc[3].y, 1, "왜 자꾸 주는거야?", false );
					break;
			}
		}
		else{
			initTextbox( textbox, npc[3].x, npc[3].y, 1, "이제 괜찮아~", false );
		}
	}
	/* 상점 닫기 */
	if( type == 5 ){
		if( npc[3].favor < 30 ){
			initTextbox( textbox, npc[3].x, npc[3].y, 1, "잘 가~", false );
		}
		else if( npc[3].favor < 50 ){
			initTextbox( textbox, npc[3].x, npc[3].y, 1, "다음에 또 놀러와~", false );
		}
		else{
			initTextbox( textbox, npc[3].x, npc[3].y, 1, "다음에 또 놀러와~♥", false );
		}
	}
};

function looScript( type, textbox, npc ){
	var temp = 1;
	/* 대화 */
	if( type == 1 ){
		if( npc[4].favor < 10 ){
			temp = Math.floor( Math.random()*4 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "안녕하세요!", false );
					break;
				case 2:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "오랜만이에요!", false );
					break;
				case 3:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "하핫!", false );
					break;
				case 4:
					initTextbox( textbox, npc[4].x, npc[4].y, 2, "저는 5일마다 찾아오는^무역상이에요!", false );
					break;
			}
		}
		else if( npc[4].favor < 30 ){
			temp = Math.floor( Math.random()*5 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "안녕하세요!", false );
					break;
				case 2:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "오랜만이에요!", false );
					break;
				case 3:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "하핫!", false );
					break;
				case 4:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "기다렸죠?", false );
					break;
				case 5:
					initTextbox( textbox, npc[4].x, npc[4].y, 2, "오늘은 싸고 좋은^물건들이 많아요!", false );
					break;
			}
		}
		else if( npc[4].favor < 50 ){
			temp = Math.floor( Math.random()*6 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[4].x, npc[4].y, 4, "섬에 올 날만을^기다렸답니다!^이유는...^비밀이에요!", false );
					break;
				case 2:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "오랜만이에요!", false );
					break;
				case 3:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "하핫♥", false );
					break;
				case 4:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "기다렸죠?", false );
					break;
				case 5:
					initTextbox( textbox, npc[4].x, npc[4].y, 2, "오늘은 싸고 좋은^물건들이 많아요!", false );
					break;
				case 6:
					initTextbox( textbox, npc[4].x, npc[4].y, 2, "또 헤어져야 한다니~^아쉬워라!", false );
					break;
			}
		}
		else if( npc[4].favor < 75 ){
			temp = Math.floor( Math.random()*6 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[4].x, npc[4].y, 4, "섬에 올 날만을^기다렸답니다!^이유는...^비밀이에요!", false );
					break;
				case 2:
					initTextbox( textbox, npc[4].x, npc[4].y, 2, "정말요?^기뻐요~♥", false );
					break;
				case 3:
					initTextbox( textbox, npc[4].x, npc[4].y, 3, "5일이 아니라^3일마다 올까봐요!^하핫♥", false );
					break;
				case 4:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "기다렸죠?", false );
					break;
				case 5:
					initTextbox( textbox, npc[4].x, npc[4].y, 2, "오늘은 싸고 좋은^물건들이 많아요!", false );
					break;
				case 6:
					initTextbox( textbox, npc[4].x, npc[4].y, 2, "또 헤어져야 한다니~^아쉬워라!", false );
					break;
			}
		}
		else{
			temp = Math.floor( Math.random()*6 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "보고싶었어요♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[4].x, npc[4].y, 5, "당신은 꼭 어디론가^훌쩍 떠나버릴 것 같아요...^아니죠?^항상 절 만나러^와주실거죠?", false );
					break;
				case 3:
					initTextbox( textbox, npc[4].x, npc[4].y, 3, "마음 같아서는^매일 매일 오고싶네요~^하핫♥", false );
					break;
				case 4:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "기다렸죠?♥", false );
					break;
				case 5:
					initTextbox( textbox, npc[4].x, npc[4].y, 2, "오늘은 싸고 좋은^물건들이 많아요!", false );
					break;
				case 6:
					initTextbox( textbox, npc[4].x, npc[4].y, 3, "꼭!^다음에도 와주셔야해요!^기다릴게요♥", false );
					break;
			}
		}
	}
	/* 좋은 선물 */
	if( type == 2 ){
		if( npc[4].favor < 10 ){
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "와!고마워요!", false );
					break;
				case 2:
					initTextbox( textbox, npc[4].x, npc[4].y, 2, "제가 이런걸^받아도 될까요?", false );
					break;
			}
		}
		else{
			temp = Math.floor( Math.random()*2 ) + 1;
			switch( temp ){
				case 1:
					initTextbox( textbox, npc[4].x, npc[4].y, 1, "와!고마워요♥", false );
					break;
				case 2:
					initTextbox( textbox, npc[4].x, npc[4].y, 2, "정말~^매번 받기만 하네요~", false );
					break;
			}
		}
	}
	/* 나쁜 선물 */
	if( type == 3 ){
		temp = Math.floor( Math.random()*2 ) + 1;
		switch( temp ){
			case 1:
				initTextbox( textbox, npc[4].x, npc[4].y, 1, "괜찮아요!", false );
				break;
			case 2:
				initTextbox( textbox, npc[4].x, npc[4].y, 1, "앗!...", false );
				break;
		}
	}
	/* 선물 그만해 */
	if( type == 4 ){
		temp = Math.floor( Math.random()*2 ) + 1;
		switch( temp ){
			case 1:
				initTextbox( textbox, npc[4].x, npc[4].y, 1, "이제 괜찮아요!", false );
				break;
			case 2:
				initTextbox( textbox, npc[4].x, npc[4].y, 1, "정말 고마워요!", false );
				break;
		}
	}
	/* 상점 닫기 */
	if( type == 5 ){
		if( npc[4].favor < 30 ){
			initTextbox( textbox, npc[4].x, npc[4].y, 2, "감사합니다~^또 오세요!", false );
		}
		else{
			initTextbox( textbox, npc[4].x, npc[4].y, 2, "감사합니다♥^또 오실거죠?", false );
		}
	}
};