$(function(){

	////////////////////////////////////////////////////以下为整个游戏的动画方法///////////////////////////////////////////////////////////
	//初始化玩家的数据
	var all_play = [

		{name:'三藏',integral:1000,role:0,poker:[]},

		{name:'悟空',integral:1000,role:0,poker:[]},

		{name:'悟能',integral:1000,role:0,poker:[]}

	];

	var victery_01 = 0;

	var victery_02 = 0; 

	var victery_03 = 0;

	var play_game = 0;

	game();

	function game(){


	//游戏音效
	var sound_01 = document.getElementsByClassName('sound01')[0];

	var sound_02 = document.getElementsByClassName('sound02')[0];
	
	var music = document.getElementsByClassName('music')[0];
	
	var police_num = 0;

	function sound(){

		var length = foldPoker.poker.length;

		var type = foldPoker.type;

		switch(length){

			case 1:

				if(foldPoker.poker[0] == '14-1'){

					$('.sound01').attr('src','./sound/one/15.ogg');

				}else{

					$('.sound01').attr('src','./sound/one/'+parseInt(foldPoker.poker[0])+'.ogg');

				}

			break;

			case 2:

				$('.sound01').attr('src','./sound/two/'+parseInt(foldPoker.poker[0])+'.ogg');

			break;

			case 3:

				$('.sound01').attr('src','./sound/3zhang.ogg');

			break;

		}

		switch(type){

			case 3.1:

				$('.sound01').attr('src','./sound/sdy.ogg');

			break;

			case 3.2:

				$('.sound01').attr('src','./sound/sdyd.ogg');

			break;

			case 4.2:

				$('.sound01').attr('src','./sound/sde.ogg');

			break;

			case 100:

				$('.sound01').attr('src','./sound/special/zd.ogg');

				$('.music').attr({src:'./music/back/boom.mp3',loop:true});

				bei++;

				bomb();

				music.play();

				music.volume = 0.2;

			break;

			case 6:

				$('.sound01').attr('src','./sound/special/sz.ogg');

				straight();

			break;

			case 66:

				$('.sound01').attr('src','./sound/special/ld.ogg');

				lian();

			break;

			case 110:

				$('.music').attr({src:'./music/back/boom.mp3',loop:true});

				bei = bei * 2;

				wz();

				music.play();

				music.volume = 0.2;

			break;
		}

		if(type == 1122 || type == 1123){

			$('.sound01').attr('src','./sound/special/fj.ogg');

			$('.sound02').attr('src','./sound/special/fj_2.ogg');

			planet();

			sound_02.volume = 1;

			sound_02.play();

		}

		sound_01.volume = 1;

		sound_01.play();

	}


	$('.music').on('ended',function(){

		if($('.music').attr('src') == './music/back/back_02.mp3'){

			$('.music').attr({src:'./music/back/back_01.mp3',loop:false});

		}else if($('.music').attr('src') == './music/back/back_01.mp3'){

			$('.music').attr({src:'./music/back/back_02.mp3',loop:false});

		}

		music.load();

		music.volume = 0.2;

	

	//加载页面中点的动画
	function spotMove(){   //由于for循环中的setTimeout是循环后才获得变量

		for(var i=0; i<6;i++){
			(function(j){
				setTimeout(function(){
					$('li').eq(j).animate({top:'50px',opacity:'0.45'},500).animate({top:'-30px',opacity:'0.45'},500).animate({top:'0px',opacity:'1'},500)
				},j*100);
				
			})(i)	
		}

		setInterval(function(){  //定义多次执行加载点的动画
			for(var i=0; i<6;i++){
				(function(j){
					setTimeout(function(){
						$('li').eq(j).animate({top:'50px',opacity:'0.45'},500).animate({top:'-30px',opacity:'0.45'},500).animate({top:'0px',opacity:'1'},500)
					},j*100);
					
				})(i)	
			}
		},2500)
	}

	// 进度条动画	
	function stripMove(){
		$('.slope').animate({left:'-73px'},7000);
		setTimeout(function(){
			$('.write').css('color','white')
		},2400);

		setTimeout(function(){
			$('.write').text('START');

		},7000);
		
		$('.strip').click(function(){   
			if($('.write').html() == 'START'){   //要判断是否已经加载完才能进行点击

				$('.onLoad_box').css('display','none');

				$('.music').attr({src:'./music/back/back_01.mp3',loop:false});

				music.volume = 0.2;
				music.load();

				backgroundMove();  //点击之后调用桌子

			}
			
		});	
	}

	//形成桌子的动画
 	function backgroundMove(){

		$('.deskL').animate({left:'0%'},700); 

		$('.deskR').animate({left:'50%'},700);   //将左右两张图片移到一起
		
		setTimeout(function(){

			$('.game').animate({opacity:'1'},600);

			$('.onLoad_box').css('display','none');

			$('.game').css('display','block');  //当桌子拼在一起后游戏页面才能显示

		},700)
	}

	//-----------------------洗牌的动画效果函数-------------------
	function shuffleCard(){	           
		
		for(var i=53;i>=0;i--){
			(function(j){
				setTimeout(function(){
					// console.log(j);
					var ranTop = Math.round(Math.random()*30)+20;
					var ranZ = Math.round(Math.random()*150)+50;
					var ranY = Math.round(Math.random()*450)-50;
		 			var ranX = Math.round(Math.random()*800)-400;  
					var ranrotY = Math.round(Math.random()*140)-70;  //产生四个随机值去改变牌的3d效果
					$('.allPoker li').eq(j).animate({top:ranTop+'px'},300)
					$('.allPoker li').eq(j).css({transform:'translateZ('+ranZ+'px) translateY(0px) translateX(0px) rotateY(0deg)'})
					.css({transform:'translateZ('+ranZ+'px) translateY('+ranY+'px) translateX(0px) rotateY(0deg)'})
					.css({transform:'translateZ('+ranZ+'px) translateY('+ranY+'px) translateX('+ranX+'px) rotateY(0deg)'})
					.css({transform:'translateZ('+ranZ+'px) translateY('+ranY+'px) translateX('+ranX+'px) rotateY('+ranrotY+'deg)'});	
				
					setTimeout(function(){

						$('.allPoker li').eq(j).css({opacity:'0'})
						},(54-j))
						setTimeout(function(){

						$('.allPoker li').eq(53-j).animate({top:(j-53)+'px',opacity:'1'},10)
						$('.allPoker li').eq(53-j).css({transform:'translateZ(0px) translateY(0px) translateX(0px) rotateY(0deg)'})
					
						if(j == 0){

							setTimeout(function(){

								sendPoker(0);

							},1000)

						}

					},12000)
				},(54-j)*200)
				
			})(i)
		}
		
	}
	//-----------------------发牌的动画效果函数-------------------
	function sendPoker(number){

		$('.back').css('transition','none');
		// 产生向左向下和角度的随机数
		var sub = Math.round(Math.random()*150)-90;

		var L = Math.round(Math.random()*-200)-700;

		var T = Math.round(Math.random()*100)+200;
		
		// 发牌给左边玩家
		$('.allPoker li:last').animate({left:L+'px',top:T+'px'},100);  //将牌随机移动到某区域中
		
		setTimeout(function(){
			
			$('.allPoker li:last').css({transform:'rotate('+sub+'deg)'});  //随机转动某一角度
		},30)
		
		all_play[0].poker.push(all_poker_data.pop());   //将总数据的最后一个放到左边玩家的手牌数组中
		
			setTimeout(function(){              //延时等待发完一张牌后将原来的牌删掉再对应的位置生成一张
			
			
			$('.leftCard').append('<li  class="poker" style="left:'+(L+662)+'px;top:'+(T+31)+'px;background:url(./images/background.jpg);background-size:110%;transform:rotate('+sub+'deg)"></li>');
			$('.allPoker li:last').remove();
		},110);
		
		
		 // 发牌给中间玩家
		setTimeout(function(){
			
			var sub = Math.round(Math.random()*150)-90;   //再重新给中间玩家随机产生一个新的角度，以防与上一张牌的角度一张
			var Left = Math.round(Math.random()*40)-20;
			$('.allPoker li:last').animate({left:Left+'px',top:(T+350)+'px'},100);   //将牌随机移动到某区域中
			
			setTimeout(function(){
				$('.allPoker li:last').css({transform:'rotate('+sub+'deg)'});   //将牌随机移动到某区域中
			},100)
			
			all_play[1].poker.push(all_poker_data.pop());
			
			setTimeout(function(){            //延时等待发完一张牌后将原来的牌删掉再对应的位置生成一张
				$('.allPoker li:last').remove();
				$('.midCard').append('<li class="poker" style=" left:'+(Left)+'px;top:'+(T-162)+'px;background:url(./images/background.jpg);background-size:110%;transform:rotate('+sub+'deg)" ></li>')
			
			},110) 
		},350)
		

		// 发牌给右边玩家
		setTimeout(function(){	
			var sub = Math.round(Math.random()*150)-90;
			
			$('.allPoker li:last').animate({left:(-L-50)+'px',top:T+'px'},100); //将牌随机移动到某区域中
			
			setTimeout(function(){
				$('.allPoker li:last').css({transform:'rotate('+sub+'deg)'});  //随机转动某一角度
			},100)
			
			all_play[2].poker.push(all_poker_data.pop());  //将总数据的最后一个放到右边玩家的手牌数组中
			
			setTimeout(function(){   //延时等待
				$('.allPoker li:last').remove();
				$('.rightCard').append('<li  class="poker" style="left:'+(-L-711)+'px;top:'+(T+30)+'px;background:url(./images/background.jpg);background-size:110%;transform:rotate('+sub+'deg)"></li>');
				
				
				
			},110)
		},600)
			
			//延时自调用发牌的效果函数
			setTimeout(function(){
				number +=1 ;        //自增发牌的次数
				
				if(number<17){
					sendPoker(number);  //自调用发牌方法
				
				}else{
					
					setTimeout(function(){
						straightenPoker();  //等待发完牌后调用将牌归正的函数方法
					},300)
				    
				}	
			},750)

	}

	//-------------------------创建一个等待所有的牌都发完后将牌归正-------------------------------------------------------------
	function straightenPoker(){
		//左边的玩家的所有牌移动
		for(var i=0;i<17;i++){
			$('.play_1 li').eq(i).css('transform','rotate(0deg)');
			$('.play_1 li').eq(i).animate({left:'0px',top:'0px'},300);
		}
		
		//中间的玩家的所有牌移动
		for(var j=0;j<17;j++){
			$('.play_2 li').eq(j).css('transform','rotate(0deg)');
			$('.play_2 li').eq(j).animate({left:'0px',top:'30px'},300);
		}
		
		//右边的玩家的所有牌移动
		for(var k=0;k<17;k++){
			$('.play_3 li').eq(k).css('transform','rotate(0deg)');
			$('.play_3 li').eq(k).animate({left:'0px',top:'0px'},300);
		}

		//每一副的扑克牌移动
		setTimeout(function(){
			
			$('.play_1').animate({top:'-20px'},500);
			$('.play_2').animate({top:'40px'},500);
			$('.play_3').animate({top:'-20px'},500);
			
		},300)
		
	//---------对3副牌已经排好序的手牌展开----------------
		setTimeout(function(){

		 	//先把原来的左右玩家的两幅手牌删掉
			$('.play_1 li').remove();

			$('.play_3 li').remove();

			//对左右玩家的两幅手牌排序
			all_play[0].poker = sortPoker(all_play[0].poker);

			all_play[2].poker = sortPoker(all_play[2].poker);
		 	
			//生成左边玩家已经排好序的手牌
			for(var i=0;i<17;i++){

				var pokerHtml = makePoker(all_play[0].poker[i]);

				$('.leftCard').append(pokerHtml)

				$('.leftCard li').eq(i).animate({top:40*i+'px'},1300);

			}
			
			//生成中间玩家已经排好序的手牌  
			setTimeout(function(){

				mid();
					
			},1200)


			//生成右边玩家已经排好序的手牌
			for(var k=0;k<17;k++){

			var pokerHtml = makePoker(all_play[2].poker[k]);

				$('.rightCard').append(pokerHtml);

				$('.rightCard li').eq(k).animate({top:40*k+'px'},1300);

			}
		},800);

		setTimeout(function(){

			$('.allPoker li').eq(1).animate({left:'0px'},100);

			$('.allPoker li').eq(2).animate({left:'200px'},100);

			$('.allPoker li').eq(0).animate({left:'-200px'},100);
			
			robPoke();

		},1250);

	}

	//玩家2显示牌的方法
	function mid(){
		if($('.play_2 li').remove()){  //将中间玩家的手牌删掉

			all_play[1].poker = sortPoker(all_play[1].poker); //对中间玩家的手牌进行排序

			var length = all_play[1].poker.length;

			for(var j=0;j<length;j++){	   //循环生成17张牌的牌面

				var pokerHtml = makePoker(all_play[1].poker[j]);

				$('.midCard').append(pokerHtml);	

			}
		}

		$('.play_2 li').attr('class','move');  //给中间玩家的牌列添加一个类名				
		 
		setTimeout(moveCard,10);    //延时下一张牌的移动

		var card = 0;   //定义第几张牌
		
		//定义移动牌的函数方法
		function moveCard() {
			//将牌的角度改变并移动
			$('.play_2 li').eq(card).css({transform:'rotate('+((card-(length/2))*4)+'deg)',transformOrigin:'43% 440%'});

			$('.play_2 li').eq(card).attr('index',card);

			$('.play_2 li').eq(card).attr('kaiguan','0');

			//判断是否把牌移动完
			if(card<all_play[1].poker.length){
				
				card++;

				setTimeout(moveCard,10);
			}

		}
	}

	 //展示地主牌的动画函数
	function showCard(){
		$('.allPoker li').eq(1).animate({left:'0px'},50).end();

		$('.allPoker li').eq(2).animate({left:'0px'},50).end();

		$('.allPoker li').eq(0).animate({left:'0px'},50).end();

		
		$('.allPoker li').css('zIndex','10');  //将层级变高，使下面生成的3张图片能够给覆盖掉

		$('.allPoker li').eq(1).css({top:'0px'});

		$('.allPoker li').eq(2).css({top:'0px'});
		
		
		for(var i=0; i<3;i++){    //循环生成3张地主牌,将地主牌与新生成的3张牌分别放到一个div里面去，便于后面的动画效果制作

			var pokerHtml = makePoker(all_poker_data[i]);

			$('.poker'+i+'').append(pokerHtml);

			$('.poker'+i+'').append($('.allPoker li:last')); //将地主牌放到div中去

			$('.poker'+i+' li').eq(0).css('transform','rotateY(180deg)');  //现将展示的转180度，方便后面再转180度时牌面不是反的
		
		}
			//左边div和右边div平移,稍微改变一下位置使上下两张牌重合
		
		$('.poker1 ').animate({top:'180px',left:'0px'},55);

		$('.poker2 ').animate({top:'180px',left:'200px'},65);

		$('.poker0').animate({top:'180px',left:'-200px'},65);
		 //3个div的视界提升，再转180度
		
		setTimeout(function(){

			$('.back').css('transition','all 0.5s ease');

			//中间的牌转动
			$('.poker1 li').css({transform:'translateZ(250px) rotateY(0deg)'})
			.css({transform:'translateZ(250px) rotateY(180deg)'});
			
			$('.poker1 li').eq(0).css({transform:'translateZ(250px) rotateY(180deg)'})
			.css({transform:'translateZ(250px) rotateY(360deg)'});
			
			//左边的牌转动

			$('.poker0 li').css({transform:'translateZ(250px) rotateY(0deg)'})
			.css({transform:'translateZ(250px) rotateY(180deg)'});
		
			$('.poker0 li').eq(0).css({transform:'translateZ(250px) rotateY(180deg)'})
			.css({transform:'translateZ(250px) rotateY(360deg)'});
			
			//右边的牌转动

			$('.poker2 li').css({transform:'translateZ(250px) rotateY(0deg)'})
			.css({transform:'translateZ(250px) rotateY(180deg)'});
			
			$('.poker2 li').eq(0).css({transform:'translateZ(250px) rotateY(180deg)'})
			.css({transform:'translateZ(250px) rotateY(360deg)'});

		},800)
		
		
		//  //延时，等待3个div转动完后，将上面的牌隐藏了
		setTimeout(function(){
			$('.back').css('transition','all 0.45s ease');

			$('.poker0 li').eq(1).css({opacity:'0'});

			$('.poker1 li').eq(1).css({opacity:'0'});

			$('.poker2 li').eq(1).css({opacity:'0'});
			
			//延时，等待上面的牌隐藏后，又回到一开始的位置
			setTimeout(function(){

				$('.poker0 li').css({transform:'translateZ(0px)'});

				$('.poker1 li').css({transform:'translateZ(0px)'});
				
				$('.poker2 li').css({transform:'translateZ(0px)'});
				
				//回到原来的位置

				$('.poker0 ').css('top','0px');

				$('.poker1 ').css('top','0px');

				$('.poker2 ').css('top','0px');

			},1500)

		},850)
	}   

	//-------------------积分榜动画--------------	
	// scoreboard();
	function scoreboard(){

		$('.num1 td').eq(1).html(all_play[0].integral);
		$('.num1 td').eq(2).html(victery_01);

		$('.num2 td').eq(1).html(all_play[1].integral);
		$('.num2 td').eq(2).html(victery_02);

		$('.num3 td').eq(1).html(all_play[2].integral);
		$('.num3 td').eq(2).html(victery_03);

		$('.scoreboard').css('display','block');

		$('.scoreboard').animate({opacity:'1'},500);

		$('.close').mouseover(function(){  //当鼠标移到关闭按钮时会转动
			
				$('.close').css({transition:'all 2s ease' ,transform:'rotate(720deg)'})  //关闭按钮转动720度
			
		})
		$('.close').mouseout(function(){  //当鼠标离开时按钮也会自动转动

			$('.close').css({transition:'all 1s ease' ,transform:'rotate(360deg)'})   //关闭按钮转360度
		})

		$('.close').click(function(){   //关闭按钮的点击事件
			
			$('.scoreboard').animate({height:'0px'},500);  //点击后积分榜高度变为0，收起来

			setTimeout(function(){

				$('.scoreboard').css({display:'none',opacity:'0',height:'500px'});    //积分榜收起来后消失


			},490)
		})

		$('.end').click(function(){   //点击后重新开局

			$('.scoreboard').css({display:'none',opacity:'0',height:'500px'});

			if(play_game == 0){

				replay();

			}

		})
	}
	

//------------------------玩家赢的时候效果------------------
	function win(){

		$('.win').css('display','block');

		$('.win').animate({left:'0%'},2000);

		$('.music').attr({src:'./sound/end/win.ogg',loop:true});

		music.volume = 0.2;

		$('.sound02').attr({src:'./lu/sorry.m4a',loop:false});

		sound_02.volume = 1;

		sound_02.play();

		music.play();

		music.play();

		clearInterval(set);

		$('.bt2').css('display','none');

		$('.min_clock').css('display','none');

		$('.right_clock').css('display','none');

		$('.left_clock').css('display','none');

		$('.win').click(function(){

			$('.win').css({left:'-150%'});

			scoreboard();		//在此处添加结束动画，显示积分榜

		})
	}

//------------------------玩家输的时候效果------------------
	
	function lose(){

		$('.music').attr({src:'./sound/end/lose.ogg',loop:true});

		music.volume = 0.3;

		music.play();

		var player = rob_arr.indexOf('true');   //地主角色的下标
		
		$('.lose').css({display:'block'});    //显示玩家输的提示

		setTimeout(function(){

			if(rob_arr[1] != true && rob_arr[0] == true ){              //用户是农民，且左边玩家是地主

				$('.left_talk').css('opacity','1');              //将npc的对话框显示

				$('.left_talk').html();                         //预先清空对话框中的内容

				$('.left_talk').html('<p>哈哈！你真菜</p>');   //在对话框中填上内容


			} else if(rob_arr[1] != true && rob_arr[2] == true ){       //用户是农民，且右边玩家是地主

				$('.right_talk').css('opacity','1');

				$('.right_talk').html();

				$('.right_talk').html('<p>哈哈！你真菜</p>');

			}else if(rob_arr[1] == true){                //用户是地主

				$('.left_talk').css('opacity','1');

				$('.left_talk').html();

				$('.left_talk').html('<p>哈哈！你真菜</p>');

				$('.right_talk').css('opacity','1');

				$('.right_talk').html();

				$('.right_talk').html('<p>哈哈！你真菜</p>');

			}   

			$('.lose').click(function(){

				$('.lose').css({display:'none'});

				$('.left_talk').css('opacity','0');

				$('.left_talk').html('');

				$('.right_talk').css('opacity','0');

				$('.right_talk').html('');

				scoreboard();		//在此处添加结束动画，显示积分榜

			})
			
		},300)


		
	}

	/*---------------警报特效（其中一位玩家手牌剩三张时调用）---------------*/
	
	
	function warn(num){

		$('.warn'+num).css('display','block'); //在玩家头像上加上报警器

		$('.sound02').attr({str:'./music/small_police.ogg',loop:false})

		sound_02.load();

		sound_02.volume = 1;

	}

	
 /*--------------------------道具栏------------------------------*/
 	

 	$('.left_people').click(function(){

 		$('.left_container').css({transition:'all 1s ease',transform:'rotate(0deg)',opacity:'1'})

 	})

 	$('.right_people').click(function(){

 		$('.right_container').css({transition:'all 1s ease',transform:'rotate(0deg)',opacity:'1'})

 	})



 	$('.left_set1 span').click(function(){   //连对
 		$('.left_prop_tips').html('连对');
 		$('.sound01').attr('src','./sound/special/ld.ogg');
 		lian();
 	})
 
 	$('.left_set2 span').click(function(){   //炸弹
 		$('.left_prop_tips').html('炸弹');
 		$('.sound01').attr('src','./sound/special/zd.ogg');

		$('.music').attr({src:'./music/back/boom.mp3',loop:true});

		 bomb();

		music.play();
 	})
 	

 	$('.left_set3 span').click(function(){  //王炸
		$('.left_prop_tips').html('王炸');

 		$('.music').attr({src:'./music/back/boom.mp3',loop:true});

		wz();

		music.play();
 	})
 	
 	var lu = 0;
 	$('.right_set1 span').click(function(){ //顺子
 		$('.right_prop_tips').html('顺子');

 		$('.sound01').attr('src','./sound/special/sz.ogg');

		straight();

		sound_01.play();
 	})

 	
 	$('.right_set2 span').click(function(){  //飞机
 		
 		$('.right_prop_tips').html('飞机');
 		planet(); 
 		$('.sound01').attr('src','./sound/special/fj.ogg');

		$('.sound02').attr('src','./sound/special/fj_2.ogg');

		sound_02.play();
 	})

 	$('.right_set3 span').click(function(){  
 		
		  //卢本伟音效
 		  if(lu == 0){

 		 	 $('.sound01').attr({src:'./lu/34567.m4a',loop:false});
 		 	 sound_01.play();
 		 	 lu = 1;
 		  }else if(lu == 1){
 		  	$('.sound01').attr({src:'./lu/ren.m4a',loop:false});
 		 	 sound_01.play();
 		 	 lu = 0;
 		  }
 	})
	
	/*--------------提示玩家效果--------------*/
	function tip(num){
		$('.tips').animate({height:'200px'},400);
		setTimeout(function(){
			$('.tip').css('display','block')
		},380)	
		if(num == 1){
			$('.tip').html('没有牌能打得过上家');    	//提示打不过上家
		}else if(num == 2){
			$('.tip').html('您出的牌不符合规则，请重新出牌');
		}else{

			$('.tip').html('您出的牌打不过上家'); 

		}

		setTimeout(function(){

			$('.tips').css({height:'0px'});

			$('.tip').css('display','none');

		},1380);
		
	}

	/*-----------------------按钮效果---------------------*/

	 
	function btnMove(math){

		$('.um1').css('display','block');

		$('.um2').css('display','block');

		$('.um3').css('display','block');

		$('.rob'+math).css('display','block');

		$('.rob'+math).css({top:'-300px'});

		$('.rob_'+math+'_1').attr('value','叫地主');

		$('.rob_'+math+'_2').attr('value','不叫');

		$('.um'+math).css({opacity:'1'});

		$('.rob'+math).animate({top:'-200px',left:'-100px'},1500)

		.animate({top:'-100px',left:'100px'},1500)

		.animate({top:'0px',left:'0px'},1500)

		setTimeout(function(){

			$('.um1').animate({opacity:'0'},400);

			$('.um2').animate({opacity:'0'},400);

			$('.um3').animate({opacity:'0'},400);
			setTimeout(function(){

				$('.um1').css({opacity:'0',display:'none'});

				$('.um2').css({opacity:'0',display:'none'});

				$('.um3').css({opacity:'0',display:'none'});

			})

		},4600);


	}


/*------------------- 以下是整个游戏的动画效果 ---------------------*/

 	/*   王炸   */


	function wz(){
		$('.wz').css('display','block');
		$('.wz_1').animate({opacity:'1'},700).animate({opacity:'1'},2000).animate({opacity:'0'},10);
		
		$('.left_talk').append('<img class="wz_2" src="./images/wz2.jpg" alt="">');
		
		setTimeout(function(){
			$('.left_talk').animate({opacity:'1'},500).animate({opacity:'1'},2700).animate({opacity:'0'},10);
		},750)
		setTimeout(function(){

			$('.wz').css('display','none');
			

		},2800)
		setTimeout(function(){

			$('.left_talk img').remove();
			

		},4000)
		
	}
		/*飞机*/

	function planet(){
		$('.planet').css({display:'block'});
		$('.game').css({perspective:'900px',transformStyle:'preserve-3d'});
		setTimeout(function(){
			$('.planet').css({transition:'all 3s ease'});
			$('.planet').css({transform:'translateX(-800px) translateZ(1000px)'});

			
		},10)
		setTimeout(function(){
			$('.planet').css({transition:'none'});
			$('.planet').css({transform:'translateX(500px) translateZ(-1000px)'});
			$('.planet').css('display','none');

		},3500)
	}
		
		/*炸弹*/
	  function bomb(){
	  	$('.boom').css('display','block');

	  	$('.boom_img').animate({top:'500px'},400);  //炸弹下落
	  	setTimeout(function(){   //火花冒出
	  		$('.huohua').animate({width:'1000px',height:'1000px',opacity:'1'},100); 
	  	},350)
	  	setTimeout(function(){

	  		$('.boom_img').css({top:'0px'});
	  		$('.huohua').css({width:'0px',height:'0px',opacity:'0'}); 
	  		$('.boom').css('display','none');

	  	},1500)
	  			
	  }
		/*顺子*/
	function straight(){
		
		$('.sz').css('display','block');

		$('.sz').animate({width:'3200px',height:'3200px',margin:'-1600px 0 0 -1600px'},1000);

		setTimeout(function(){

			$('.sz').css('opacity','0');
			
		},1000)
		setTimeout(function(){

			$('.sz').css('display','none');
			$('.sz').css({width:'0px',height:'0px',margin:'0px 0 0 0px'});
			
		},3000)
		
	}
		/*连对*/
	function lian(){
		$('.liandui').css('display','block');
				
		$('.lian').animate({bottom:"400px"},1000).animate({bottom:"1500px"},3000);
		$('.z').animate({height:"300px"},1000).animate({height:"250px"},300).animate({height:"300px"},300).animate({height:"250px"},300).animate({height:"300px"},300).animate({height:"250px"},300).animate({height:"300px"},300);
		$('.h').animate({height:"200px"},800,function(){
			$(this).css('display','none');
		});

		setTimeout(function(){

			$('.liandui').css('display','none');

		},4000)
	}

	
	//////////////////////////////////////////////////////以下为整个游戏的框架////////////////////////////////////////////////

	spotMove();//调用加载点的动画

	stripMove();//调用加载按钮的动画
	
	var ready_obj = {poker:[], type:0, max:0};   //定义出牌堆的对象

	var foldPoker = {poker:[], type:0, max:0};   //定义弃牌堆的对象
	
	var difen = 200; 		//游戏底分

	var bei = 1; 		//游戏倍数

	//形成54张扑克牌
	for(var i=0;i<54;i++){

		$('.allPoker').append('<li class="back" style="top:'+(-i)+'px" ></li>');

	}

	//初始化牌堆数据	数据结构：点数-花色
	var	 all_poker_data = ['14-0','14-1'];

	for(var i=1;i<14;i++){

		for(var j=0;j<4;j++){

			all_poker_data.push(i+'-'+j);

		}

	}

	var click = 0;
	//绑定扑克牌的点击事件
	$('.allPoker').click(function(){

		if(click == 0){

			click = null;

			all_poker_data.sort(function(){		//对数据的洗牌

				return 0.5-Math.random();

			})

			shuffleCard();		//调用洗牌方法;
			
			// sendPoker(0);
			$('.hand').css('display','none');

		}			
	})

	//牌面生成的方法
	function makePoker(poker){

		var poker_arr = poker.split('-');

		var x = poker_arr[0];		//点数

		var y = poker_arr[1];		//花色
		
		// 返回组装完成的牌面HTML代码
		return '<li class="back" style="width: 125px; height: 175px ;background:url(./images/'+x+'-'+y+'.jpg) no-repeat;background-size:100%;" data-value='+poker+'></li>';

	}

	//对牌面数据的排序的方法
	function sortPoker(poker){

		poker = poker.sort(function(x,y){

			var x_arr=x.split('-');

			var y_arr=y.split('-');

			if(x_arr[0]!=y_arr[0]){

				return y_arr[0] - x_arr[0];

			}else{

				return y_arr[1] - x_arr[1];

			}
		});

		return poker;
	}

	//抢地主的方法
	var rob_arr = [-1,-1,-1];

	var rob1 = 0;

	var rob2 = 0;

	var rob3 = 0;	//记录同一个玩家点了按钮的次数

	function robPoke(){
		
		for(var i=1; i<4; i++){

			$('.rob_'+i+'_1').attr('value','抢地主');

			$('.rob_'+i+'_2').attr('value','不抢');
		}

		var math = Math.round(Math.random()*2+1);

		$('.rob'+math).css('display','block');

		$('.rob_'+math+'_1').attr('value','叫地主');

		$('.rob_'+math+'_2').attr('value','不叫');

		btnMove(math);
		
		robTime(math);

		//绑定玩家1抢地主按钮的事件
		$('.rob_1_1').click(function(){

			bei = bei * 2;

			rob1++;

			$('.rob1').css('display','none');	//点击过了就得消失

			if(rob_arr.indexOf(2) == -1){	//没出现过2说明没人叫过地主 

				$('.sound01').attr({src:'./sound/play/call.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				rob_arr[0] = 2;

				$('.rob_1_1').attr('value','抢地主');

				$('.rob_1_2').attr('value','不抢');

			}else if(rob_arr[0] == 2){		//或者我自己叫过地主

				$('.sound01').attr({src:'./sound/play/rob.m4a',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				all_play[0].role = 1;

				rob_arr[0] = true;			//我现在是地主了

				addPoke()

				return;

			}else{	

				$('.sound01').attr({src:'./sound/play/rob.m4a',loop:false});

				sound_01.volume = 1;

				sound_01.play();						

				rob_arr[0] = 1;				//抢地主
				
			}

			if(rob_arr[1] != 0){		//下一个玩家没放弃过抢地主

				$('.rob2').css('display','block');

				clearInterval(int);

				robTime(2);

			}else if(rob_arr[2] != 0){	//下一个玩家放弃过抢地主,上家没放弃过抢地主

				$('.rob3').css('display','block');

				clearInterval(int);

				robTime(3);

			}else{	

				all_play[0].role = 1;				

				rob_arr[0] = true;		//其他玩家都放弃了抢地主，那么直接当选地主

				addPoke()
			}
			
		})
		$('.rob_1_2').click(function(){
			
			noRob(1);

		})

		//绑定玩家2抢地主按钮的事件
		$('.rob_2_1').click(function(){

			bei = bei * 2;

			rob2++

			$('.rob2').css('display','none');	//点击过了就得消失

			if(rob_arr.indexOf(2) == -1){	//没出现过2说明没人叫过地主

				$('.sound01').attr({src:'./sound/play/call.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play(); 

				rob_arr[1] = 2;

				$('.rob_2_1').attr('value','抢地主');

				$('.rob_2_2').attr('value','不抢');

			}else if(rob_arr[1] == 2){		//或者我自己叫过地主

				all_play[1].role = 1;

				rob_arr[1] = true;			//我现在是地主了

				$('.sound01').attr({src:'./sound/play/rob.m4a',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				addPoke()

				return;

			}else{		

				rob_arr[1] = 1;				//抢地主

				$('.sound01').attr({src:'./sound/play/rob.m4a',loop:false});

				sound_01.volume = 1;

				sound_01.play();

			}

			if(rob_arr[2] != 0){		//下一个玩家没放弃过抢地主

				$('.rob3').css('display','block');

				clearInterval(int);

				robTime(3);

			}else if(rob_arr[0] != 0){	//下一个玩家放弃过抢地主,上家没放弃过抢地主

				$('.rob1').css('display','block');

				clearInterval(int);

				robTime(1);

			}else{	

				all_play[1].role = 1;		
		
				rob_arr[1] = true;		//其他玩家都放弃了抢地主，那么直接当选地主

				addPoke()

			}
			
		})

		$('.rob_2_2').click(function(){

			noRob(2);
			
		})



		//绑定玩家3抢地主按钮的事件
		$('.rob_3_1').click(function(){

			bei = bei * 2;

			rob3++

			$('.rob3').css('display','none');	//点击过了就得消失

			if(rob_arr.indexOf(2) == -1){	//没出现过2说明没人叫过地主

				$('.sound01').attr({src:'./sound/play/call.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play(); 

				rob_arr[2] = 2;

				$('.rob_3_1').attr('value','抢地主');

				$('.rob_3_2').attr('value','不抢');

			}else if(rob_arr[2] == 2){		//或者我自己叫过地主

				all_play[2].role = 1;

				rob_arr[2] = true;			//我现在是地主了

				$('.sound01').attr({src:'./sound/play/rob.m4a',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				addPoke()

				return;

			}else{	

				$('.sound01').attr({src:'./sound/play/rob.m4a',loop:false});

				sound_01.volume = 1;

				sound_01.play();			

				rob_arr[2] = 1;				//抢地主

			}

			if(rob_arr[0] != 0){		//下一个玩家没放弃过抢地主

				$('.rob1').css('display','block');

				clearInterval(int);

				robTime(1);

			}else if(rob_arr[1] != 0){	//下一个玩家放弃过抢地主,上家没放弃过抢地主

				$('.rob2').css('display','block');

				clearInterval(int);

				robTime(2);

			}else{	

				all_play[2].role = 1;					

				rob_arr[2] = true;		//其他玩家都放弃了抢地主，那么直接当选地主

				addPoke()
			}
			
		})

		$('.rob_3_2').click(function(){

			noRob(3);
		})
	}


	//点击不抢地主的方法
	function noRob(num){

		if(num == 1){

			rob1++;

			$('.rob1').css('display','none');

			rob_arr[0] = 0;				//进来直接就说明选择了不抢地主

			if(rob_arr[0]==0 && rob_arr[1]==0 && rob_arr[2]==0){	//说明所有人都不抢

				$('.sound01').attr({src:'./sound/play/nocall.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				clearInterval(int);

				replay();

				return;

			}else if(rob_arr.indexOf(-1) == -1 && rob_arr.indexOf(1) == -1){//说明有人叫了地主，其他人都不抢

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				all_play[rob_arr.indexOf(2)].role = 1;

				rob_arr[rob_arr.indexOf(2)] = true;

				addPoke()

			}else if(rob_arr.indexOf(2) == -1 && rob1<2){	//说明还没人叫地主

				$('.sound01').attr({src:'./sound/play/nocall.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				$('.rob_2_1').attr('value','叫地主');

				$('.rob_2_2').attr('value','不叫');

				$('.rob2').css('display','block');

				clearInterval(int);

				robTime(2);

			}else if(rob_arr.indexOf(2) == -1 && rob1 == 2){

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				if(rob_arr[2] == 1){

					all_play[2].role = 1;

					rob_arr[2] = true;

					addPoke()

				}else{

					all_play[1].role = 1;

					rob_arr[1] = true;

					addPoke();
				}

			}else{

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				$('.rob2').css('display','block');

				clearInterval(int);

				robTime(2);
			}
	
		}else if(num == 2){

			rob2++

			$('.rob2').css('display','none');

			rob_arr[1] = 0;				//进来直接就说明了选择不抢地主

			if(rob_arr[0]==0 && rob_arr[1]==0 && rob_arr[2]==0){	//说明所有人都不抢

				$('.sound01').attr({src:'./sound/play/nocall.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				clearInterval(int);

				replay();

				return;

			}else if(rob_arr.indexOf(-1) == -1  && rob_arr.indexOf(1) == -1){//说明有人叫了地主，其他人都不抢

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				all_play[rob_arr.indexOf(2)].role = 1;

				rob_arr[rob_arr.indexOf(2)] = true;

				addPoke()

			}else if(rob_arr.indexOf(2) == -1 && rob2<2){	//说明还没人叫地主

				$('.sound01').attr({src:'./sound/play/nocall.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				$('.rob_3_1').attr('value','叫地主');

				$('.rob_3_2').attr('value','不叫');

				$('.rob3').css('display','block');

				clearInterval(int);

				robTime(3);

			}else if(rob_arr.indexOf(2) == -1 && rob2 == 2){

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				if(rob_arr[0] == 1){

					all_play[0].role = 1;

					rob_arr[0] = true;

					addPoke()

				}else{

					all_play[2].role = 1;

					rob_arr[2] = true;

					addPoke()
				}

			}else{

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				$('.rob3').css('display','block');

				clearInterval(int);

				robTime(3);
			}

		}else if(num == 3){

			rob3++

			$('.rob3').css('display','none');

			rob_arr[2] = 0;				//进来直接就说明了选择不抢地主

			if(rob_arr[0]==0 && rob_arr[1]==0 && rob_arr[2]==0){	//说明所有人都不抢

				$('.sound01').attr({src:'./sound/play/nocall.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				clearInterval(int);

				replay();

				return;

			}else if(rob_arr.indexOf(-1) == -1  && rob_arr.indexOf(1) == -1){//说明有人叫了地主，其他人都不抢

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				all_play[rob_arr.indexOf(2)].role = 1;

				rob_arr[rob_arr.indexOf(2)] = true;

				addPoke()

			}else if(rob_arr.indexOf(2) == -1 && rob3<2){	//说明还没人叫地主

				$('.sound01').attr({src:'./sound/play/nocall.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				$('.rob_1_1').attr('value','叫地主');

				$('.rob_1_2').attr('value','不叫');

				$('.rob1').css('display','block');

				clearInterval(int);

				robTime(1);

			}else if(rob_arr.indexOf(2) == -1 && rob3 == 2){

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				if(rob_arr[1] == 1){

					all_play[1].role = 1;

					rob_arr[1] = true;

					addPoke()

				}else{

					all_play[0].role = 1;

					rob_arr[0] = true;

					addPoke()

				}

			}else{

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				sound_01.volume = 1;

				sound_01.play();

				$('.rob1').css('display','block');

				clearInterval(int);

				robTime(1);

			}	

		}

	}

	////添加地主牌到玩家中并在页面上显示出来
	function addPoke(){


		$('.left_land').css('display','none');

		$('.right_land').css('display','none');

		clearInterval(int);

		//将地主牌的牌面换成对应的牌
		showCard()

		//将电脑玩家数据的身份改为1，代表该玩家是地主
		var m = rob_arr.indexOf(true);

		$('.portrait'+(m+1)+' .head').attr('src',"./images/lordland.jpg");

		all_play[m].role = 1;

		all_play[m].poker = all_play[m].poker.concat(all_poker_data);

		sortPoker(all_play[m].poker);

		if(m == 1){

			cont = 2;

			$('.play_2_bt').css('display','block');

			$('.play_2_bt3').css('display','block');

			mid();

			sendTime(2);

		}else if(m == 0){

			$('.leftCard li').remove();

			for(var i=0;i<20;i++){

				var pokerHtml = makePoker(all_play[0].poker[i]);

				$('.leftCard').append(pokerHtml)

				$('.leftCard li').eq(i).animate({top:40*i+'px'},1300);
			}

		}else if(m == 2){

			$('.rightCard li').remove();

			for(var i=0;i<20;i++){

				var pokerHtml = makePoker(all_play[2].poker[i]);

				$('.rightCard').append(pokerHtml)

				$('.rightCard li').eq(i).animate({top:40*i+'px'},1300);

			}

		}
		//如果不是玩家2抢到地主的话自动打牌
		setTimeout(function(){
			
			if(m == 0){

				promptPoke(all_play[0].poker,0);

				npcSend(0);

				

			}else if(m == 2){

				promptPoke(all_play[2].poker,2);

				npcSend(2);

				setTimeout(function(){

					promptPoke(all_play[0].poker,0);

					if(ready_obj.poker.length != 0){

						npcSend(0);

					}else{

						npcPass(0);

					}

				},1000)
			}
		},3000)
	}


	//绑定玩家牌面的点击事件
	var kaiguan;
	$('.play_2').on('click','li',function(){

		var length = all_play[1].poker.length;   //定义一个变量来获取玩家手牌的长度
		
		var index = $(this).attr('index');  //获取index值去改变角度

		kaiguan = $(this).attr('kaiguan');   //获取开关值去判断牌是否被选择

		var dataValue = $(this).attr('data-value');   //获取data-value值去存入准备出牌的数组中

		if(kaiguan == '0'){   //开关值等于0则表示牌没有被选中

			$(this).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(-50px)'});  //将牌升起
			
			$(this).attr('kaiguan','1');   //开关值改为1，表示被选中

			ready_obj.poker.push(dataValue);    //data-value值存入数组中

		}else{

			$(this).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(0px)'})  //将牌降下来

			$(this).attr('kaiguan','0');  //开关值变为0，表示没有被选中

			var num = ready_obj.poker.indexOf(dataValue);   //定义一个变量来获取数组中要删的值的下标
			
			ready_obj.poker.splice(num,1);  //删除数组的没有选中的那张牌的数据

		}
		
	})

	//玩家出牌的效果
	$('.play_2_bt').click(function(){

		playSend();
		
	})


	//绑定玩家的不出牌按钮的点击事件
	$('.play_2_bt2').click(function(){

		playPass();

	})

	//绑定玩家的提示按钮的点击事件
	$('.play_2_bt3').click(function(){

		toDown(all_play[1].poker);					//把手贱点到的牌都降下来

		promptPoke(all_play[1].poker,1);			//调用提示方法

		if(ready_obj.poker.length == 0){

			tip(1);
					
		}

	})


	//定义玩家出牌的方法
	function playSend(){

		cont = 0;

		if(ready_obj.poker.length != 0){  //判断准备出牌的数组中有没有牌

			sortPoker(ready_obj.poker);   //对出牌的数组排序

		}else{

			return false;	//没牌就要滚出去

		}
		
		if(!checkPoke(ready_obj.poker)){

			tip(2);

			return false;

		}else if(!vsPoke()){

			tip(3);

			return false;

		}else{

			$('.show li').remove();  //删掉弃牌堆里的出牌

			foldPoker = {poker:[],max:0,type:0};

		}

		var length = ready_obj.poker.length;

		var index ;

		for(var i=0; i<length;i++){    //循环遍历出牌数组
			
			index = all_play[1].poker.indexOf(ready_obj.poker[i]);   //获取出牌数组中元素在玩家2手牌数组中的下标值
			
			$('.midCard li').eq(index).css({transform:'rotate(0deg) translateY(-310px) translateX('+(i-(length/2))*30+'px)'})   //移到展示出牌区域中
			
			
			foldPoker.poker[i] = ready_obj.poker[i];  //将出牌数组中的元素赋值的弃牌数组中
		}

		foldPoker.type = ready_obj.type;

		foldPoker.max = ready_obj.max;

		sound();

		for(var j=0; j<ready_obj.poker.length;j++){     //循环遍历出牌数组
			
			var index = all_play[1].poker.indexOf(ready_obj.poker[j]);   //获取出牌数组中元素在玩家2手牌数组中的下标值
			
			all_play[1].poker.splice(index,1);   //将玩家2的手牌中已经出了的牌的数据删掉	
		}

		 setTimeout(function(){

			for(var k=0; k<ready_obj.poker.length; k++){    //在展示出牌区域中生成要出的牌
				

					var htmlPoker = makePoker(ready_obj.poker[k]);
					
					$('.show').append(htmlPoker);
					
					$('.show li').eq(k).css({left:30*k+'px'});
					
					$('.show').css({left:-15*(k+1)+'px'});
				 
			}

			
			ready_obj = {poker:[],max:0,type:0};   //出完牌后将出牌数组清空

		},400)

		

		setTimeout(function(){   //延时将玩家2的手牌重新排序并生成

			$('.play_2 li').remove();

			all_play[1].poker = sortPoker(all_play[1].poker); //对中间玩家的手牌进行排序

			var length = all_play[1].poker.length;
			
			for(var j=0;j<length;j++){	   //循环再次生成剩余牌的牌面

				var pokerHtml = makePoker(all_play[1].poker[j]);

				$('.midCard').append(pokerHtml);	
				$('.back').css('transition','all 0.35s ease');
				$('.play_2 li').eq(j).css({transform:'rotate('+((j-(length/2))*4)+'deg)',transformOrigin:'43% 440%'});

				$('.play_2 li').eq(j).attr('index',j);       //在玩家手牌中添加一个自定义属性来显示是第几张牌

				$('.play_2 li').eq(j).attr('kaiguan','0');   //在玩家手牌中添加一个自定义属性为开关设置
			}

			$('.bt2').css('display','none');

			$('.time').css('display','none');

			clearInterval(set);

		},400)

		if(all_play[1].poker.length == 0){

		 	clearInterval(set);

			console.log('你赢了');

			if(all_play[1].role == 1){

				all_play[0].integral = Number(all_play[0].integral) - Number(bei*difen);

				all_play[1].integral = Number(all_play[1].integral) + Number(bei*difen);

				all_play[2].integral = Number(all_play[2].integral) - Number(bei*difen); 

				victery_02++;

			}else if(all_play[0].role == 1){

				all_play[0].integral = Number(all_play[0].integral) - Number(bei*difen);

				all_play[1].integral = Number(all_play[1].integral) + Number(bei*difen);

				all_play[2].integral = Number(all_play[2].integral) + Number(bei*difen); 

				victery_02++;

				victery_03++;

			}else if(all_play[2].role == 1){

				all_play[0].integral = Number(all_play[0].integral) + Number(bei*difen);

				all_play[1].integral = Number(all_play[1].integral) + Number(bei*difen);

				all_play[2].integral = Number(all_play[2].integral) - Number(bei*difen);

				victery_01++;

				victery_02++;

			}

			play_game = 0;

			win();		
			
			return;
		}else if(all_play[1].poker.length < 4 && police_num == 0){		//最后三张牌的时候发出警报提示玩家


			if($('.music').attr('src') != './music/back/boom.mp3'){

				$('.music').attr({src:'./music/back/police.mp3',loop:true});

				music.load();

			}

			police_num = 1;

		}

		$('.showGrade .text3').html('本局倍数：'+bei+'倍');

		//延时电脑提示出牌
		setTimeout(function(){

			promptPoke(all_play[2].poker,2);			//调用提示方法

			if(ready_obj.poker.length == 0){			//提示出来是有牌可以出的

				npcPass(2);								//那就不出咯

			}else {

				npcSend(2);								//右边电脑出牌

			}


			//右边电脑出完就轮到左边电脑出牌
			setTimeout(function(){

				promptPoke(all_play[0].poker,0);			//调用提示方法

				if(ready_obj.poker.length == 0){			//提示出来是没有牌可以出的

					npcPass(0);								//那就不出咯

				}else {

					npcSend(0);								//左边电脑出牌

				}

			},1000)

		},1000)

	}
	//定义玩家不出牌的方法
	function playPass(){

		var random = Math.round(Math.random() + 1);

		$('.sound01').attr({src:'./sound/play/pass'+random+'.ogg',loop:false,autoplay:'autoplay'});

		sound_01.volume = 1;

		sound_01.play();

		cont++;

		if(cont >= 2){

			foldPoker = {poker:[],max:0,type:0};	//已经有两个人不出了,想出什么就出什么

		}

		toDown(all_play[1].poker);					//把手贱点到的牌都降下来

		$('.bt2').css('display','none');			//点了不出就全部隐藏

		$('.time').css('display','none');

		clearInterval(set);

		ready_obj = {poker:[],max:0,type:0};

		//延时电脑提示出牌
		setTimeout(function(){

			promptPoke(all_play[2].poker,2);			//调用提示方法

			if(ready_obj.poker == 0){					//提示出来是有牌可以出的

				npcPass(2);								//那就不出咯

			}else {

				npcSend(2);							//右边电脑出牌

			}

			//右边电脑出完就轮到左边电脑出牌
			setTimeout(function(){

				promptPoke(all_play[0].poker,0);			//调用提示方法

				if(ready_obj.poker == 0){					//提示出来是没有牌可以出的

					npcPass(0);								//那就不出咯

				}else {

					npcSend(0);							//左边电脑出牌

				}

			},1000)

		},1000)

	}

	//定义电脑出牌的方法
	function npcSend(num){

		cont = 0;

		foldPoker = {poker:[],max:0,type:0};

		$('.show li').remove();

		for(var i=0; i<ready_obj.poker.length; i++){

			foldPoker.poker[i] = ready_obj.poker[i];

		}

		foldPoker.type = ready_obj.type;

		foldPoker.max = ready_obj.max;

		sound();

		for(var k=0; k<ready_obj.poker.length; k++){    //在展示出牌区域中生成要出的牌
				
			var htmlPoker = makePoker(ready_obj.poker[k]);
			
			$('.show').append(htmlPoker);
			
			$('.show li').eq(k).css({left:30*k+'px'});
			
			$('.show').css({left:-15*(k+1)+'px'});
		
		}

		for(var j=0; j<ready_obj.poker.length;j++){     //循环遍历出牌数组
			
			var index = all_play[num].poker.indexOf(ready_obj.poker[j]);   //获取出牌数组中元素在玩家2手牌数组中的下标值
			
			all_play[num].poker.splice(index,1);   //将玩家2的手牌中已经出了的牌的数据删掉	
		}

		ready_obj = {poker:[],max:0,type:0};

		$('.play_'+(num+1)+' li').remove();

		if(all_play[num].poker.length == 0){	//在此处添加结束动画，显示积分榜

			play_game = 0;

			clearInterval(set);

			if(all_play[num].role == all_play[1].role){

				win();

				if(num == 0){

					all_play[0].integral = Number(all_play[0].integral) + Number(bei*difen); 
					all_play[1].integral = Number(all_play[1].integral) + Number(bei*difen); 
					all_play[2].integral = Number(all_play[2].integral) - Number(bei*difen); 

					victery_01++;

					victery_02++;

				}else{

					all_play[0].integral = Number(all_play[0].integral) - Number(bei*difen); 
					all_play[1].integral = Number(all_play[1].integral) + Number(bei*difen); 
					all_play[2].integral = Number(all_play[2].integral) + Number(bei*difen); 

					victery_02++;

					victery_03++;

				}

			}else{

				lose();

				if(num == 0){

					all_play[0].integral = Number(all_play[0].integral) + Number(bei*difen); 
					all_play[1].integral = Number(all_play[1].integral) - Number(bei*difen); 
					all_play[2].integral = Number(all_play[2].integral) - Number(bei*difen); 

					victery_01++;

				}else{

					all_play[0].integral = Number(all_play[0].integral) - Number(bei*difen); 
					all_play[1].integral = Number(all_play[1].integral) - Number(bei*difen); 
					all_play[2].integral = Number(all_play[2].integral) + Number(bei*difen); 

					victery_03++;

				}

			}

			return;

		}else if(all_play[num].poker.length < 4 && police_num == 0){		//最后三张牌的时候发出警报提示玩家


			if($('.music').attr('src') != './music/back/boom.mp3'){

				$('.music').attr({src:'./music/back/police.mp3',loop:true});

				music.load();

			}

			$('.sound02').attr({src:'./music/small_police.ogg',loop:false});

			sound_02.volume = 1;

			police_num = 1;

			

			sound_02.play();

		}

		all_play[num].poker = sortPoker(all_play[num].poker); //对中间玩家的手牌进行排序

		var length = all_play[num].poker.length;
		
		for(var j=0;j<length;j++){	   //循环生成17张牌的牌面

			var pokerHtml = makePoker(all_play[num].poker[j]);

			if(num == 0){

				$('.leftCard').append(pokerHtml);	
				
				$('.leftCard li').eq(j).css({top:40*j+'px'});

				$('.bt2').css('display','block');

				clearInterval(set);

				sendTime();

			}else if(num == 2){

				$('.rightCard').append(pokerHtml);	
				
				$('.rightCard li').eq(j).css({top:40*j+'px'});

			}

		}

	}

	//定义电脑的不出牌方法
	var cont = 0;	//记录点了几次不出

	function npcPass(num){

		var random = Math.round(Math.random() + 1);

		$('.sound01').attr({src:'./sound/play/pass'+random+'.ogg',loop:false,autoplay:'autoplay'});

		sound_01.volume = 1;

		sound_01.load();

		cont++;

		if(cont >= 2){

			foldPoker = {poker:[],max:0,type:0};

			if(num == 0){		//左边电脑点的不出，玩家不能出现不出按钮

				$('.play_2_bt').css('display','block');

				$('.play_2_bt3').css('display','block');

				clearInterval(set);

				sendTime();

			}

		}else{

			if(num == 0){

				$('.bt2').css('display','block');	//不然就全显示

				clearInterval(set);

				sendTime();

			}

		}

	}

	//定义一个用来抢地主计时的方法
	var int;	//用来清定时器用的
	function robTime(t){

		$('.time').css('display','none');

		$('.time'+t).css('display','block');

		var num = 24;

		$('.time'+t).attr('value',num);

		int = setInterval(function(){

			num--;

			if(num < 0 && rob_arr.indexOf(true) == -1){//放弃
		
				clearInterval(int);

				noRob(t);		//时间到就不抢地主

			}else if(num == 8){

				$('.sound02').attr({src:'./lu/quakily.m4a',loop:false});

				sound_02.volume = 1;

				sound_02.play();

			}else if(num < 0){

				clearInterval(int);

			}else{

				$('.time'+t).attr('value',num);

			}

		},1000)

	}


	//定义一个用来出牌计时的方法
	var set;	//用来清定时器用的
	function sendTime(){

		$('.time').css('display','none');

		$('.time2').css('display','block');

		var number = 24;

		$('.time2').attr('value',number);

		set = setInterval(function(){

			number--;

			

			if(number < 0 && cont >= 2){//放弃

				$('.bt2').css('display','none');			//玩家按钮隐藏

				toDown(all_play[1].poker);					//把手贱点到的牌都降下来

				promptPoke(all_play[1].poker,1);			//调用提示方法

				playSend();									//调用玩家出牌方法;		

			}else if(number == 8){

				$('.sound02').attr({src:'./lu/quakily.m4a',loop:false});

				sound_02.volume = 1;

				sound_02.play();

			}else if(number < 0){

				$('.bt2').css('display','none');			//玩家按钮隐藏

				playPass();		//调用玩家不出牌的方法

			}else{

				$('.time2').attr('value',number);

			}

		},1000)

	}


	//定义游戏重开的方法
	function replay(){

		play_game = 1;

		clearInterval(int);

		clearInterval(set);

		for(var i=1;i<=3;i++){

			$('.bt'+i).css('display','none');

			$('.bt'+i).off('click');

			$('.rob'+i).css('display','none');

			$('.rob_'+i+'_1').off('click');

			$('.rob_'+i+'_2').off('click');

			$('.play_'+i+' li').remove();

			all_play[i-1].role = 0;

			all_play[i-1].poker = [];

			$('.portrait'+i+'>.head').attr('src',"./images/farmer.jpg");

			$('.warn'+i).css('display','none')

		}

		$('.play_2').off('mouseup','li');

		$('.play_2').off('mousemove','li');

		$('.play_2').off('mousedown','li');

		$('.play_2').off('click','li');

		$('.allPoker li').remove();

		$('.time').css('display','none');

		$('.showCard li').remove();

		$('.win').css('left','-100%');

		$('.win').css('display','none');

		$('.lose').css('display','none');

		$('.hand').css('display','block');

		$('.mid_clock').css('display','block');

		$('.left_clock').css('display','block');

		$('.right_clock').css('display','block');

		$('.mid_land').css('display','block');

		$('.left_land').css('display','block');

		$('.right_land').css('display','block');

		$('.close').off('mouseover');

		$('.close').off('mouseout');

		$('.close').off('click');

		$('.end').off('click');

		$('.left_people').off('click');

		$('.right_people').off('click');

		$('.left_container').off('mouseout');

		$('.right_container').off('mouseout');

		$('.music').attr({src:'./music/back/back_01.mp3',loop:false});

		bei = 1;

		$('.showGrade .text3').html('本局倍数：'+bei+'倍');

		music.volume = 0.2;

		music.load();

		game();

	}



	//玩家对手牌的连续选择功能
		var start_index;	//记录点击时对应第几张牌，从0开始算

		var end_index;		//记录松开鼠标时对应第几张牌，从0开始算

		var bbbzhu = '0'

		function shubiaoanxia(){

			start_index = parseInt($(this).attr('index')); 
	


			$('.play_2').on('mousemove','li',shubiaoyidong);

			return false;
		};

		function shubiaoyidong(){

			if($(this).css('boxShadow') == '0px 0px 10px yellow'){	//黄变不黄

				$(this).css('boxShadow','');

			}else{													//不黄变黄

				$(this).css('boxShadow','0px 0px 10px yellow');

			}

		};

		function forxunhuan01(){

			for(var i = end_index; i <= start_index; i++){

				var length = all_play[1].poker.length;   //定义一个变量来获取玩家手牌的长度
		
					index = $('.play_2 li').eq(i).attr('index');  //获取index值去改变角度

				if($('.play_2 li').eq(i).attr('kaiguan') == '0'){   //开关值等于0则表示牌没有被选中

					$('.play_2 li').eq(i).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(-50px)'});  //将牌升起
					
					$('.play_2 li').eq(i).attr('kaiguan','1');   //开关值改为1，表示被选中

					ready_obj.poker.push($('.play_2 li').eq(i).attr('data-value'));    //data-value值存入数组中

				}else{

					

					$('.play_2 li').eq(i).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(0px)'})  //将牌降下来

					$('.play_2 li').eq(i).attr('kaiguan','0');  //开关值变为0，表示没有被选中

					

					var num = ready_obj.poker.indexOf($('.play_2 li').eq(i).attr('data-value'));   //定义一个变量来获取数组中要删的值的下标
					
					ready_obj.poker.splice(num,1);  //删除数组的没有选中的那张牌的数据

				}

			}

		}

		function forxunhuan02(){

			for(var i = start_index; i <= end_index; i++){

				var length = all_play[1].poker.length;   //定义一个变量来获取玩家手牌的长度
		
				index = $('.play_2 li').eq(i).attr('index');  //获取index值去改变角度

				if($('.play_2 li').eq(i).attr('kaiguan') == '0'){   //开关值等于0则表示牌没有被选中

					$('.play_2 li').eq(i).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(-50px)'});  //将牌升起
					
					$('.play_2 li').eq(i).attr('kaiguan','1');   //开关值改为1，表示被选中

					ready_obj.poker.push($('.play_2 li').eq(i).attr('data-value'));    //data-value值存入数组中

				}else{

					

					$('.play_2 li').eq(i).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(0px)'})  //将牌降下来

					$('.play_2 li').eq(i).attr('kaiguan','0');  //开关值变为0，表示没有被选中

					

					var num = ready_obj.poker.indexOf($('.play_2 li').eq(i).attr('data-value'));   //定义一个变量来获取数组中要删的值的下标
					
					ready_obj.poker.splice(num,1);  //删除数组的没有选中的那张牌的数据

				}

			}

		}

		function shubiaofangshou(){

			end_index = parseInt($(this).attr('index'));

			if(start_index > end_index){

					forxunhuan01();

			}else if(start_index < end_index){
				
					forxunhuan02();

			}

			$('.play_2 li').css('boxShadow','');	//然后就全都不黄

			$('.play_2').off('mousemove','li');			//松开鼠标就解绑事件

		}

		$('.play_2').on('mousedown','li',shubiaoanxia);

		$('.play_2').on('mouseup','li',shubiaofangshou);




















/////////////////////////////////////////////////以下为牌型是否符合规则和比较牌型的方法/////////////////////////////////////////////////////////

//检查牌型是否符合规则
	/*
		单张		1
		对子		2
		三张		3
		三带一		3.1
		三带二		3.2
		四带二		4.2
		炸弹		100
		王炸		110
		顺子		6
		连对        66
		纯飞机		1122
		飞机带翅膀  1123

		扑克牌的牌型分析
		
		连对：6，8，10，12，14，16，18，20；
		顺子：5-12；
		三连：6，9，12，15，18
		三连带单：8，12，16，20
		三连带双：10，15，20
		四带两对：8
	*/
	function checkPoke(obj){
		//准备要出的牌的长度
		sortPoker(obj);
		var length = obj.length;
		//创建临时存储点数和花色的数组
		var arr = [];
		for(var i=0; i<length; i++){
			arr.push(obj[i].split('-'));
		}
		switch(length){
			//牌型长度为1
			case 1:		
				ready_obj.type = 1; 		//牌型类型为单张
				if(ready_obj.poker[0] == '14-1'){
					ready_obj.max = 15;	//单张牌为大王时，特殊处理
				}else{
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
				}
				return true;
			break;
			//牌型长度为2
			case 2:
				if(arr[0][0] == arr[1][0]){		//两张牌的点数相同
					if(arr[0][0] == 14){		//王炸的情况

						ready_obj.type = 110; 		//牌型类型为王炸
						ready_obj.max = 110;		//牌型的判断值，判断谁的牌大
						return true;

					}else{							
						ready_obj.type = 2; 			//牌型类型为对子
						ready_obj.max = arr[0][0];	//牌型的判断值，判断谁的牌大
						return true;
					}
				}else{
					ready_obj.type = 0; 		//无效牌型
					ready_obj.max = 0;
					return false;		
				}

			break;
			//牌型长度为3
			case 3: 
				if(arr[0][0] == arr[2][0]){
					ready_obj.type = 3; 			//牌型类型为三张
					ready_obj.max = arr[0][0];	//牌型的判断值，判断谁的牌大
					return true;
				}else{
					ready_obj.type = 0; 			//无效类型
					ready_obj.max = 0;	
					return false;
				}
			break;
			//牌型长度为4
			case 4: 
				if(arr[0][0] == arr[3][0]){

					ready_obj.type = 100;			//牌型类型为普通炸弹
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(arr[0][0]==arr[2][0]||arr[1][0]==arr[3][0]){
					ready_obj.type = 3.1; 			//牌型类型为三带一
					ready_obj.max = arr[1][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else{
					ready_obj.type = 0; 			//无效类型
					ready_obj.max = 0;
					return false;		
				}
			break;
			//牌型长度为5
			case 5:
				if(checkShun(arr)){
					ready_obj.type = 6; 			//牌型类型为顺子
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(arr[0][0]==arr[2][0]&&arr[3][0]==arr[4][0]||arr[0][0]==arr[1][0]&&
					arr[2][0]==arr[4][0]){
					ready_obj.type = 3.2; 			//牌型类型为三带二
					ready_obj.max = arr[2][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else{
					ready_obj.type = 0; 			//无效类型
					ready_obj.max = 0;
					return false;	
				}
			break;
			//牌型长度为6
			case 6:
				if(checkLian(arr)){
					ready_obj.type = 66; 			//牌型类型为连对
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(checkShun(arr)){
					ready_obj.type = 6;				//牌型类型为顺子
					ready_obj.max  = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(checkChunAir(arr)){
					ready_obj.type = 1122; 			//牌型类型为纯飞机
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(arr[0][0]==arr[3][0]||arr[1][0]==arr[4][0]||arr[2][0]==arr[5][0]){
					ready_obj.type = 4.2; 			//牌型类型为四带二
					ready_obj.max = arr[2][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else{
					ready_obj.type = 0; 			//无效牌型
					ready_obj.max = 0;				
					return false;
				}
			break;
			//牌型长度为7
			case 7:
				if(checkShun(arr)){
					ready_obj.type = 6; 			//牌型类型为顺子
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else{
					ready_obj.type = 0; 			//无效牌型
					ready_obj.max = 0;		
					return false;
				}
			break;
			//牌型长度为8
			case 8:
				if(checkShun(arr)){
					ready_obj.type = 6;				//牌型类型为顺子
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(checkLian(arr)){
					ready_obj.type = 66;			//牌型类型为连对
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(ready_obj.max = checkZhaAir(arr)){
					ready_obj.type = 1123;			//牌型类型为飞机带翅膀
					return true;
				}else if(arr[0][0]==arr[3][0]&&arr[4][0]==arr[5][0]||
					arr[2][0]==arr[5][0]&&arr[0][0]==arr[1][0]){
					ready_obj.type = 4.2; 			//牌型类型为四带二
					ready_obj.max = arr[2][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else{
					ready_obj.type = 0;				//无效牌型
					ready_obj.max = 0;
					return false;
				}
			break;
			//牌型长度为9
			case 9:
				if(checkShun(arr)){
					ready_obj.type = 6;				//牌型类型为顺子
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(checkChunAir(arr)){
					ready_obj.type = 1122;			//牌型类型为纯飞机
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else{
					ready_obj.type = 0;				//无效牌型
					ready_obj.max = 0;
					return false;
				}
			break;
			//牌型长度为10
			case 10:
				if(checkShun(arr)){
					ready_obj.type = 6;				//牌型类型为顺子
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(checkLian(arr)){
					ready_obj.type = 66;			//牌型类型为连对
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(ready_obj.max = checkZhaAir(arr)){
					ready_obj.type = 1123;			//牌型类型为飞机带翅膀
					return true;					//牌型的判断值，判断谁的牌大
				}else{
					ready_obj.type = 0;				//无效牌型
					ready_obj.max = 0;
					return false;
				}
			break;
			//牌型长度为11
			case 11:
				if(checkShun(arr)){
					ready_obj.type = 6;				//牌型类型为顺子
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else{
					ready_obj.type = 0;				//无效牌型
					ready_obj.max = 0;
					return false;
				}
			break;
			//牌型长度为12
			case 12:
				if(checkShun(arr)){
					ready_obj.type = 6;				//牌型类型为顺子
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(checkLian(arr)){
					ready_obj.type = 66;			//牌型类型为连对
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(checkChunAir(arr)){
					ready_obj.type = 1122;			//牌型类型为纯飞机
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else{
					ready_obj.type = 0;				//无效牌型
					ready_obj.max = 0;
					return false;
				}
			break;
			//牌型长度为14
			case 14:
				if(checkLian(arr)){
					ready_obj.type = 66;			//牌型类型为连对
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else{
					ready_obj.type = 0;				//无效牌型
					ready_obj.max = 0;
					return false;
				}
			break
			//牌型长度为15
			case 15:
				if(checkChunAir(arr)){
					ready_obj.type = 1122;			//牌型类型为纯飞机
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(ready_obj.max = checkZhaAir(arr)){
					ready_obj.type = 1123;			//牌型类型为飞机带翅膀
					return true;					//牌型的判断值，判断谁的牌大
				}else{
					ready_obj.type = 0;				//无效牌型
					ready_obj.max = 0;
					return false;
				}
			break;
			//牌型长度为16
			case 16:
				if(checkLian(arr)){
					ready_obj.type = 66;			//牌型类型为连对
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(ready_obj.max = checkZhaAir(arr)){
					ready_obj.type = 1123;			//牌型类型为飞机带翅膀
					return true;					//牌型的判断值，判断谁的牌大
				}else{
					ready_obj.type = 0;				//无效牌型
					ready_obj.max = 0;
					return false;
				}
			break;
			//牌型长度为18
			case 18:
				if(checkChunAir(arr)){
					ready_obj.type = 1122;			//牌型类型为纯飞机
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else if(checkLian(arr)){
					ready_obj.type = 66;			//牌型类型为连对
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else{
					ready_obj.type = 0;				//无效牌型
					ready_obj.max = 0;
					return false;
				}
			break;
			//牌型长度为20
			case 20:
				if(ready_obj.max = checkZhaAir(arr)){
					ready_obj.type = 1123;			//牌型类型为飞机带翅膀
					return true;					//牌型的判断值，判断谁的牌大
				}else if(checkLian(arr)){
					ready_obj.type = 66;			//牌型类型为连对
					ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大
					return true;
				}else{
					ready_obj.type = 0;				//无效牌型
					ready_obj.max = 0;
					return false;
				}
			break;
		}	

	}


	//检查牌型是否为顺子
	function checkShun(arr){
		for(var i=0; i<arr.length-1; i++){
			if(arr[i][0] - 1 != arr[i+1][0]){
				return false;
			}	
		}
		return true;
	}
	//检查牌型是否为连对
	//554433
	function checkLian(arr){
		for(var i=0; i<arr.length-3; i+=2){
			if(arr[i][0]-1!=arr[i+3][0] || arr[i+1][0]-1!=arr[i+2][0]){
				return false;
			}
		}
		return true;
	}
	//检查牌型是否为纯飞机的方法
	function checkChunAir(arr){
		//判断牌型是否为纯飞机
		//555444333
		for(var i=0;i<arr.length-4; i+=3){
			if(arr[i][0] != arr[i+2][0] || arr[i][0]+1 != arr[i+3][0]){
				return false;
			}
		}
		return true;	
	}
	//检查牌型是否为三带一飞机的方法，因为飞机的判断值很难从外部获取，所以在函数返回出去
	function checkZhaAir(arr){
		var max = false;
		//判断牌型是否为炸弹鸡
		//555544443333
		for(var i=0;i<arr.length-7;i+=4){
			if(arr[i][0]-1 != arr[i+7][0]){
				break;
				//跳出当前判断的循环
			}else if(i+4 <arr.length-7){
				max = arr[0][0];
			}
		}
		//判断是不是飞机带一个翅膀
		//飞机带翅膀的长度有：2*(3+1) = 8, 3*(3+1) = 12,  4*(3+1) = 16,  5*(3+1) = 20
		if(!max){
			switch(arr.length){
				//66655543
				//65444333
				//65554443
				case 8:
					if(arr[0][0]==arr[2][0]&&arr[2][0]-1==arr[3][0]&&arr[3][0]==arr[5][0]){
						max = arr[0][0]
					}else if(arr[2][0]==arr[4][0]&&arr[4][0]-1==arr[5][0]&&arr[5][0]==arr[7][0]){
						max = arr[4][0];
					}else if(arr[1][0]==arr[3][0]&&arr[3][0]-1==arr[4][0]&&arr[4][0]==arr[6][0]){
						max = arr[1][0];
					}
				break;
				//999888777 654
				//9 888777666 54
				//98 777666555 4
				//987 666555444
				case 12:
					if(arr[0][0]==arr[2][0]&&arr[2][0]-1==arr[3][0]&&arr[3][0]==arr[5][0]&&arr[5][0]-1==arr[6][0]&&
						arr[6][0]==arr[8][0]){
						max = arr[0][0];
					}else if(arr[1][0]==arr[3][0]&&arr[3][0]-1==arr[4][0]&&arr[4][0]==arr[6][0]&&arr[6][0]-1==arr[7][0]&&
						arr[7][0]==arr[9][0]){
						max = arr[1][0];
					}else if(arr[2][0]==arr[4][0]&&arr[4][0]-1==arr[5][0]&&arr[5][0]==arr[7][0]&&arr[7][0]-1==arr[8][0]&&
						arr[8][0]==arr[10][0]){
						max = arr[2][0];
					}else if(arr[3][0]==arr[5][0]&&arr[5][0]-1==arr[6][0]&&arr[6][0]==arr[8][0]&&arr[8][0]-1==arr[9][0]&&
						arr[9][0]==arr[11][0]){
						max = arr[3][0];
					}
				break;
				//999888777666 5432
				//9 888777666555 432
				//98 777666555444 32
				//987 666555444333 2
				//9876 555444333222
				case 16:
					if(arr[0][0]==arr[2][0]&&arr[2][0]-1==arr[3][0]&&arr[3][0]==arr[5][0]&&arr[5][0]-1==arr[6][0]&&
						arr[6][0]==arr[8][0]&&arr[8][0]-1==arr[9][0]&&arr[9][0]==arr[11][0]){
						max = arr[0][0];
					}else if(arr[1][0]==arr[3][0]&&arr[3][0]-1==arr[4][0]&&arr[4][0]==arr[6][0]&&arr[6][0]-1==arr[7][0]&&
						arr[7][0]==arr[9][0]&&arr[9][0]-1==arr[10][0]&&arr[10][0]==arr[12][0]){
						max = arr[1][0];
					}else if(arr[2][0]==arr[4][0]&&arr[4][0]-1==arr[5][0]&&arr[5][0]==arr[7][0]&&arr[7][0]-1==arr[8][0]&&
						arr[8][0]==arr[10][0]&&arr[10][0]-1==arr[11][0]&&arr[11][0]==arr[13][0]){
						max = arr[2][0];
					}else if(arr[3][0]==arr[5][0]&&arr[5][0]-1==arr[6][0]&&arr[6][0]==arr[8][0]&&arr[8][0]-1==arr[9][0]&&
						arr[9][0]==arr[11][0]&&arr[11][0]-1==arr[12][0]&&arr[12][0]==arr[14][0]){
						max = arr[3][0];
					}else if(arr[4][0]==arr[6][0]&&arr[6][0]-1==arr[7][0]&&arr[7][0]==arr[9][0]&&arr[9][0]-1==arr[10][0]&&
						arr[10][0]==arr[12][0]&&arr[12][0]-1==arr[13][0]&&arr[13][0]==arr[15][0]){
						max = arr[4][0];
					}
				break;
				//999888777666555 43210
				//9 888777666555444 3210
				//98 777666555444333 210
				//987 666555444333222 10
				//9876 555444333222111 0
				//98765 444333222111000
				case 20:
					if(arr[0][0]==arr[2][0]&&arr[2][0]-1==arr[3][0]&&arr[3][0]==arr[5][0]&&arr[5][0]-1==arr[6][0]&&
						arr[6][0]==arr[8][0]&&arr[8][0]-1==arr[9][0]&&arr[9][0]==arr[11][0]&&arr[11][0]-1==arr[12][0]&&
						arr[12][0]==arr[14][0]){
						max = arr[0][0];
					}else if(arr[1][0]==arr[3][0]&&arr[3][0]-1==arr[4][0]&&arr[4][0]==arr[6][0]&&arr[6][0]-1==arr[7][0]&&
						arr[7][0]==arr[9][0]&&arr[9][0]-1==arr[10][0]&&arr[10][0]==arr[12][0]&&arr[12][0]-1==arr[13][0]&&
						arr[13][0]==arr[15][0]){
						max = arr[1][0];
					}else if(arr[2][0]==arr[4][0]&&arr[4][0]-1==arr[5][0]&&arr[5][0]==arr[7][0]&&arr[7][0]-1==arr[8][0]&&
						arr[8][0]==arr[10][0]&&arr[10][0]-1==arr[11][0]&&arr[11][0]==arr[13][0]&&arr[13][0]-1==arr[14][0]&&
						arr[14][0]==arr[15][0]){
						max = arr[2][0];
					}else if(arr[3][0]==arr[5][0]&&arr[5][0]-1==arr[6][0]&&arr[6][0]==arr[8][0]&&arr[8][0]-1==arr[9][0]&&
						arr[9][0]==arr[11][0]&&arr[11][0]-1==arr[12][0]&&arr[12][0]==arr[14][0]&&arr[14][0]-1==arr[15][0]&&
						arr[15][0]==arr[16][0]){
						max = arr[3][0];
					}else if(arr[4][0]==arr[6][0]&&arr[6][0]-1==arr[7][0]&&arr[7][0]==arr[9][0]&&arr[9][0]-1==arr[10][0]&&
						arr[10][0]==arr[12][0]&&arr[12][0]-1==arr[13][0]&&arr[13][0]==arr[15][0]&&arr[15][0]-1==arr[16][0]&&
						arr[16][0]==arr[17][0]){
						max = arr[4][0];
					}else if(arr[5][0]==arr[7][0]&&arr[7][0]-1==arr[8][0]&&arr[8][0]==arr[10][0]&&arr[10][0]-1==arr[11][0]&&
						arr[11][0]==arr[13][0]&&arr[13][0]-1==arr[14][0]&&arr[14][0]==arr[16][0]&&arr[16][0]-1==arr[17][0]&&
						arr[17][0]==arr[19][0]){
						max = arr[5][0];
					}
				break;
			}
		}
		//判断飞机是不是带一对翅膀
		//飞机带一对翅膀的长度有：2*(3+2) = 10, 3*(3+2) = 15,  4*(3+2) = 20
		if(!max){
			switch(arr.length){
				//666555 4433
				//66 555444 33
				//6655 444333
				case 10:
					if(arr[0][0]==arr[2][0]&&arr[2][0]-1==arr[3][0]&&arr[3][0]==arr[5][0]&&arr[6][0]==arr[7][0]&&arr[8][0]==arr[9][0]){
						max = arr[0][0];
					}else if(arr[2][0]==arr[4][0]&&arr[4][0]-1==arr[5][0]&&arr[5][0]==arr[7][0]&&arr[0][0]==arr[1][0]&&arr[8][0]==arr[9][0]){
						max = arr[2][0];
					}else if(arr[4][0]==arr[6][0]&&arr[6][0]-1==arr[7][0]&&arr[7][0]==arr[9][0]&&arr[0][0]==arr[1][0]&&arr[2][0]==arr[3][0]){
						max = arr[2][0];
					}
				break;
				//999888777 665544
				//99 888777666 5544
				//9988 777666555 44
				//998877 666555444
				case 15:
					if(arr[0][0]==arr[2][0]&&arr[2][0]-1==arr[3][0]&&arr[3][0]==arr[5][0]&&arr[5][0]-1==arr[6][0]&&
						arr[6][0]==arr[8][0]&&arr[9][0]==arr[10][0]&&arr[11][0]==arr[12][0]&&arr[13][0]==arr[14][0]){
						max = arr[0][0];
					}else if(arr[2][0]==arr[4][0]&&arr[4][0]-1==arr[5][0]&&arr[5][0]==arr[7][0]&&arr[7][0]-1==arr[8][0]&&
						arr[8][0]==arr[10][0]&&arr[11][0]==arr[12][0]&&arr[13][0]==arr[14][0]&&arr[0][0]==arr[1][0]){
						max = arr[2][0];
					}else if(arr[4][0]==arr[6][0]&&arr[6][0]-1==arr[7][0]&&arr[7][0]==arr[9][0]&&arr[9][0]-1==arr[10][0]&&
						arr[10][0]==arr[12][0]&&arr[13][0]==arr[14][0]&&arr[0][0]==arr[1][0]&&arr[2][0]==arr[3][0]){
						max = arr[4][0];
					}else if(arr[6][0]==arr[8][0]&&arr[8][0]-1==arr[9][0]&&arr[9][0]==arr[11][0]&&arr[11][0]-1==arr[12][0]&&
						arr[12][0]==arr[14][0]&&arr[0][0]==arr[1][0]&&arr[2][0]==arr[3][0]&&arr[4][0]==arr[5][0]){
						max = arr[6][0];
					}
				break;
				//999888777666 55443322
				//99 888777666555 443322
				//9988 777666555444 3322
				//998877 666555444333 22
				//99887766 555444333222 
				case 20:
					if(arr[0][0]==arr[2][0]&&arr[2][0]-1==arr[3][0]&&arr[3][0]==arr[5][0]&&arr[5][0]-1==arr[6][0]&&
						arr[6][0]==arr[8][0]&&arr[8][0]-1==arr[9][0]&&arr[9][0]==arr[11][0]&&arr[12][0]==arr[13][0]&&
						arr[14][0]==arr[15][0]&&arr[16][0]==arr[17][0]&&arr[18][0]==arr[19][0]){
						max = arr[0][0];
					}else if(arr[2][0]==arr[4][0]&&arr[4][0]-1==arr[5][0]&&arr[5][0]==arr[7][0]&&arr[7][0]-1==arr[8][0]&&
						arr[8][0]==arr[10][0]&&arr[10][0]-1==arr[11][0]&&arr[11][0]==arr[13][0]&&arr[14][0]==arr[15][0]&&
						arr[16][0]==arr[17][0]&&arr[18][0]==arr[19][0]&&arr[0][0]==arr[1][0]){
						max = arr[2][0];
					}else if(arr[4][0]==arr[6][0]&&arr[6][0]-1==arr[7][0]&&arr[7][0]==arr[9][0]&&arr[9][0]-1==arr[10][0]&&
						arr[10][0]==arr[12][0]&&arr[12][0]-1==arr[13][0]&&arr[13][0]==arr[15][0]&&arr[16][0]==arr[17][0]&&
						arr[18][0]==arr[19][0]&&arr[2][0]==arr[3][0]&&arr[0][0]==arr[1][0]){
						max = arr[4][0];
					}else if(arr[6][0]==arr[8][0]&&arr[8][0]-1==arr[9][0]&&arr[9][0]==arr[11][0]&&arr[11][0]-1==arr[12][0]&&
						arr[12][0]==arr[14][0]&&arr[14][0]-1==arr[15][0]&&arr[15][0]==arr[17][0]&&arr[18][0]==arr[19][0]&&
						arr[4][0]==arr[5][0]&&arr[2][0]==arr[3][0]&&arr[0][0]==arr[1][0]){
						max = arr[6][0];
					}else if(arr[8][0]==arr[10][0]&&arr[10][0]-1==arr[11][0]&&arr[11][0]==arr[13][0]&&arr[13][0]-1==arr[14][0]&&
						arr[14][0]==arr[16][0]&&arr[16][0]-1==arr[17][0]&&arr[17][0]==arr[19][0]&&arr[6][0]==arr[7][0]&&
						arr[4][0]==arr[5][0]&&arr[2][0]==arr[3][0]&&arr[0][0]==arr[1][0]){
						max = arr[8][0];
					}
				break;
			}
		}
		return max;
	}
	//判断要出的牌是否打得过弃牌堆里的牌的方法
	function vsPoke(){
		var rot = Number(ready_obj.type);
		var bot = Number(foldPoker.type);
		var rom = Number(ready_obj.max);
		var bom = Number(foldPoker.max);
		
		if(bot == 0){	//弃牌堆里没牌的时候
			return true;
		}else if(rot == 110){	//玩家要出的牌是王炸的时候
			return true;
		}else if(bot!=110&&bot!=100&&rot==100){		//弃牌堆里不是炸弹，玩家的牌是炸弹的时候
			return true;
		}else if(rot==bot&&rom>bom&&ready_obj.poker.length==foldPoker.poker.length){
			return true;		//出牌类型相同，长度一致，并且玩家出牌的比较值要大于弃牌堆里的比较值
		}else{
			return false;
		}
	}


	///////////自动提示功能//////////////

	function promptPoke(obj,num){

		ready_obj.poker = [];

		var type = foldPoker.type;				//获取弃牌堆的牌型类型
		
		var tip = [];							//创建临时存放可以出的牌的数组
		
		var length = foldPoker.poker.length;	//弃牌堆里的牌型长度

		var arr = [];

		for(var i=0;i<obj.length;i++){

			arr.push(obj[i].split('-'));

		}

		switch(length){
			//桌面上没牌的时候
			case 0:
				for(var i=obj.length-1;i>=0;i--){
					if(parseInt(obj[i])==parseInt(obj[i-1])&&parseInt(obj[i-1])==parseInt(obj[i-2])){
						tip.push(obj[i]);
						tip.push(obj[i-1]);
						tip.push(obj[i-2]);
					}else if(parseInt(obj[i])==parseInt(obj[i-1])){
						tip.push(obj[i]);
						tip.push(obj[i-1]);
					}else{
						tip.push(obj[i]);
					}
					break;
				}
			break;
			//牌型长度为1
			case 1:
				for(var i=obj.length-1;i>=0;i--){
					if(parseInt(obj[i])>parseInt(foldPoker.poker[0])){
						tip.push(obj[i]);
						break;
					}
				}
			break;
			//牌型长度为2
			case 2:
				for(var i=obj.length-1;i>=1;i--){
					if(parseInt(obj[i])==parseInt(obj[i-1])&&parseInt(obj[i])>parseInt(foldPoker.poker[0])){
						tip.push(obj[i]);
						tip.push(obj[i-1]);
						break;
					}
				}				
			break;
			//牌型长度为3
			case 3:
				for(var i=obj.length-1;i>=2;i--){
					if(parseInt(obj[i])==parseInt(obj[i-2])&&parseInt(obj[i])>parseInt(foldPoker.poker[0])){
						tip.push(obj[i]);
						tip.push(obj[i-1]);
						tip.push(obj[i-2]);
						break;
					}
				}
			break;
			//牌型长度为4
			case 4:
				switch(type){
						//牌型类型为普通炸弹
						case 100: 				
							for(var i=obj.length-1;i>=3;i--){	
								if(parseInt(obj[i])==parseInt(obj[i-3])&&parseInt(obj[i])>parseInt(foldPoker.poker[0])){
									for(var j=0;j<4;j++){
										tip.push(obj[i-j]);
									}
									break;
								}
							}
						break;
						//牌型类型为三带一
						case 3.1:
							for(var i=obj.length-1;i>=3;i--){
								if(parseInt(obj[i])==parseInt(obj[i-2])&&parseInt(obj[i])>parseInt(foldPoker.poker[1])){	//从手牌中找是否有三个连着相同的牌
									for(var j=0;j<3;j++){
										tip.push(obj[i-j]);					//如果有就添加到提示数组里
									}
									for(var k=obj.length-1;k>=0;k--){
										if(tip.indexOf(obj[k])==-1){		//如果手牌中有其他单张的牌也加到提示数组中
											tip.push(obj[k]);
											break;
										}
									}
									break;
								}
							}
							if(tip.length != 4){
								tip = [];
							}
						break;
				}
			break;
			//牌型长度为5
			case 5:
				switch(type){
					//牌型类型为三带二
					case 3.2 :
						for(var i=obj.length-1;i>=3;i--){
							if(parseInt(obj[i])==parseInt(obj[i-2])&&parseInt(obj[i])>parseInt(foldPoker.poker[2])){	//从手牌中找是否有三个连着相同的牌
								for(var j=0;j<3;j++){
									tip.push(obj[i-j]);					//如果有就添加到提示数组里
								}
								for(var k=obj.length-1;k>=1;k--){
									if(tip.indexOf(obj[k])==-1&&parseInt(obj[k])==parseInt(obj[k-1])){	//如果手牌中有其他单张的牌也加到提示数组中
										tip.push(obj[k]);
										tip.push(obj[k-1]);
										break;
									}
								}
								break;
							}
						}
						if(tip.length != 5){
							tip = [];
						}
					break;
					//牌型类型为顺子
					case 6:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length;i++){
							if(only.indexOf(arr[i][0])==-1){	//点数没出现过就添加（去重）
								only.push(arr[i][0]);
								flo.push(arr[i][1]);
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);	//将点数和花色拼接存到临时数组temp里
						}
						for(var i=temp.length-4;i>=0;i--){
							if(parseInt(temp[i])-1==parseInt(temp[i+1])&&parseInt(temp[i+1])-1==parseInt(temp[i+2])&&
								parseInt(temp[i+2])-1==parseInt(temp[i+3])&&parseInt(temp[i+3])-1==parseInt(temp[i+4])&&
								parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(foldPoker.poker[0])){	//遍历找顺子，没有就GG
								for(var j=0;j<5;j++){
									tip[j]=temp[i+j];
								}
								break;
							}
						}
					break;
				}
			break;
			//牌型长度为6
			case 6:
				switch(type){
					//牌型类型为顺子
					case 6:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length;i++){
							if(only.indexOf(arr[i][0])==-1){	//点数没出现过就添加（去重）
								only.push(arr[i][0]);
								flo.push(arr[i][1]);
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);	//将点数和花色拼接存到临时数组temp里
						}
						
						for(var i=temp.length-6;i>=0;i--){
							
							if(parseInt(temp[i])-1==parseInt(temp[i+1])&&parseInt(temp[i+1])-1==parseInt(temp[i+2])&&
								parseInt(temp[i+2])-1==parseInt(temp[i+3])&&parseInt(temp[i+3])-1==parseInt(temp[i+4])&&
								parseInt(temp[i+4])-1==parseInt(temp[i+5])&&parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(foldPoker.poker[0])){	//遍历找顺子，没有就GG

								for(var j=0;j<6;j++){
									tip[j]=temp[i+j];
								}
								break;
							}
						}
					break;
					//牌型类型为连对
					case 66:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length-1;i++){
							if(arr[i][0]==arr[i+1][0]&&only.indexOf(arr[i][0])==-1){	//点数没在only数组出现过并成对出现的就添加
								only.push(arr[i][0]);
								only.push(arr[i+1][0]);
								flo.push(arr[i][1]);
								flo.push(arr[i+1][1]);
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);	//将点数和花色拼接存到临时数组temp里
						}
						//遍历找连对，没有就GG
						for(var i=temp.length-1;i>=3;i-=2){
							if(parseInt(temp[i])+1==parseInt(temp[i-3])&&parseInt(temp[i-2])+1==parseInt(temp[i-5])&&parseInt(temp[i-5])<13&&parseInt(temp[i])>foldPoker.max){
								for(var j=0;j<6;j++){
									tip[j]=temp[(i-5)+j];
								}
								break;
							}
						}
					break;
					//牌型类型为纯飞机
					case 1122:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length-1;i++){
							if(arr[i][0]==arr[i+2][0]&&only.indexOf(arr[i][0])==-1){	//点数没在only数组出现过并成三出现的就添加
								for(var j=0;j<3;j++){
									only.push(arr[i+j][0]);
									flo.push(arr[i+j][1]);
								}
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);		//将点数和花色拼接存到临时数组temp里
						}
						//遍历找纯飞机,没有就GG
						for(var i=temp.length-1;i>2;i-=3){
							if(parseInt(temp[i])+1==parseInt(temp[i-5])&&parseInt(temp[i-5])<13&&parseInt(temp[i])>foldPoker.max){
								for(var j=0;j<6;j++){
									tip[j]=temp[(i-5)+j];
								}
								break;
							}
						}
					break;
				}
			break;
			//牌型长度为7
			case 7:
				switch(type){
					//牌型类型为顺子
					case 6:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length;i++){
							if(only.indexOf(arr[i][0])==-1){	//点数没出现过就添加（去重）
								only.push(arr[i][0]);
								flo.push(arr[i][1]);
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);	//将点数和花色拼接存到临时数组temp里
						}
						
						for(var i=temp.length-7;i>=0;i--){
							
							if(parseInt(temp[i])-1==parseInt(temp[i+1])&&parseInt(temp[i+1])-1==parseInt(temp[i+2])&&
								parseInt(temp[i+2])-1==parseInt(temp[i+3])&&parseInt(temp[i+3])-1==parseInt(temp[i+4])&&
								parseInt(temp[i+4])-1==parseInt(temp[i+5])&&parseInt(temp[i+5])-1==parseInt(temp[i+6])&&
								parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(foldPoker.poker[0])){	//遍历找顺子，没有就GG

								for(var j=0;j<7;j++){
									tip[j]=temp[i+j];
								}
								break;
							}
						}
					break;
				}
			break;
			//牌型长度为8
			case 8:
				switch(type){
					//牌型类型为顺子
					case 6:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length;i++){
							if(only.indexOf(arr[i][0])==-1){	//点数没出现过就添加（去重）
								only.push(arr[i][0]);
								flo.push(arr[i][1]);
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);	//将点数和花色拼接存到临时数组temp里
						}
						
						for(var i=temp.length-8;i>=0;i--){
							
							if(parseInt(temp[i])-1==parseInt(temp[i+1])&&parseInt(temp[i+1])-1==parseInt(temp[i+2])&&
								parseInt(temp[i+2])-1==parseInt(temp[i+3])&&parseInt(temp[i+3])-1==parseInt(temp[i+4])&&
								parseInt(temp[i+4])-1==parseInt(temp[i+5])&&parseInt(temp[i+5])-1==parseInt(temp[i+6])&&
								parseInt(temp[i+6])-1==parseInt(temp[i+7])&&parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(foldPoker.poker[0])){	//遍历找顺子，没有就GG

								for(var j=0;j<8;j++){
									tip[j]=temp[i+j];
								}
								break;
							}
						}
					break;
					//牌型类型为连对
					case 66:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length-1;i++){
							if(arr[i][0]==arr[i+1][0]&&only.indexOf(arr[i][0])==-1){	//点数没在only数组出现过并成对出现的就添加
								only.push(arr[i][0]);
								only.push(arr[i+1][0]);
								flo.push(arr[i][1]);
								flo.push(arr[i+1][1]);
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);	//将点数和花色拼接存到临时数组temp里
						}
						//遍历找连对，没有就GG
						for(var i=temp.length-1;i>=7;i-=2){
							if(parseInt(temp[i])+1==parseInt(temp[i-3])&&parseInt(temp[i-2])+1==parseInt(temp[i-5])&&
								parseInt(temp[i-4])+1==parseInt(temp[i-7])&&parseInt(temp[i-7])<13&&parseInt(temp[i])>foldPoker.max){
								for(var j=0;j<8;j++){
									tip[j]=temp[(i-7)+j];
								}
								break;
							}
						}
					break;
					//牌型类型为三带一的飞机
					case 1123:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length-2;i++){
							if(arr[i][0]==arr[i+2][0]&&only.indexOf(arr[i][0])==-1){	//点数没在only数组出现过并成三出现的就添加
								for(var j=0;j<3;j++){
									only.push(arr[i+j][0]);
									flo.push(arr[i+j][1]);
								}
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);		//将点数和花色拼接存到临时数组temp里
						}
						for(var i=temp.length-1;i>2;i-=3){
							if(parseInt(temp[i])+1==parseInt(temp[i-5])&&parseInt(temp[i-5])<13&&parseInt(temp[i])>foldPoker.max){
								for(var j=0;j<6;j++){
									tip[j]=temp[(i-5)+j];
								}
								break;
							}
						}
						var con = 1;		//记录加了多少张单牌进去
						for(var i=obj.length-1;i>=0;i--){
							if(temp.indexOf(obj[i])==-1){
								if(con == 2){
									temp.push(obj[i]);
									tip.push(temp[temp.length-2]);
									tip.push(temp[temp.length-1]);
									break;
								}else{
									temp.push(obj[i]);
									con++;
								}	
							}
							
						}
						if(tip.length != 8){
							tip = [];
						}
					break;
				}
			break;
			//牌型长度为9
			case 9:
				switch(type){
					//牌型类型为顺子
					case 6:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length;i++){
							if(only.indexOf(arr[i][0])==-1){	//点数没出现过就添加（去重）
								only.push(arr[i][0]);
								flo.push(arr[i][1]);
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);	//将点数和花色拼接存到临时数组temp里
						}
						
						for(var i=temp.length-9;i>=0;i--){
							
							if(parseInt(temp[i])-1==parseInt(temp[i+1])&&parseInt(temp[i+1])-1==parseInt(temp[i+2])&&
								parseInt(temp[i+2])-1==parseInt(temp[i+3])&&parseInt(temp[i+3])-1==parseInt(temp[i+4])&&
								parseInt(temp[i+4])-1==parseInt(temp[i+5])&&parseInt(temp[i+5])-1==parseInt(temp[i+6])&&
								parseInt(temp[i+6])-1==parseInt(temp[i+7])&&parseInt(temp[i+7])-1==parseInt(temp[i+8])&&
								parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(foldPoker.poker[0])){	//遍历找顺子，没有就GG

								for(var j=0;j<9;j++){
									tip[j]=temp[i+j];
								}
								break;
							}
						}
					break;
					//牌型类型为纯飞机
					case 1122:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length-2;i++){
							if(arr[i][0]==arr[i+2][0]&&only.indexOf(arr[i][0])==-1){	//点数没在only数组出现过并成三出现的就添加
								for(var j=0;j<3;j++){
									only.push(arr[i+j][0]);
									flo.push(arr[i+j][1]);
								}
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);		//将点数和花色拼接存到临时数组temp里
						}
						for(var i=temp.length-1;i>2;i-=3){
							if(parseInt(temp[i])+1==parseInt(temp[i-5])&&parseInt(temp[i-3])+1==parseInt(temp[i-8])&&parseInt(temp[i-8])<13&&parseInt(temp[i])>foldPoker.max){
								for(var j=0;j<9;j++){
									tip[j]=temp[(i-8)+j];
								}
								break;
							}
						}
					break;
				}
			break;
			//牌型长度为10
			case 10:
				switch(type){
					//牌型类型为顺子
					case 6:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length;i++){
							if(only.indexOf(arr[i][0])==-1){	//点数没出现过就添加（去重）
								only.push(arr[i][0]);
								flo.push(arr[i][1]);
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);	//将点数和花色拼接存到临时数组temp里
						}
						
						for(var i=temp.length-10;i>=0;i--){
							
							if(parseInt(temp[i])-1==parseInt(temp[i+1])&&parseInt(temp[i+1])-1==parseInt(temp[i+2])&&
								parseInt(temp[i+2])-1==parseInt(temp[i+3])&&parseInt(temp[i+3])-1==parseInt(temp[i+4])&&
								parseInt(temp[i+4])-1==parseInt(temp[i+5])&&parseInt(temp[i+5])-1==parseInt(temp[i+6])&&
								parseInt(temp[i+6])-1==parseInt(temp[i+7])&&parseInt(temp[i+7])-1==parseInt(temp[i+8])&&
								parseInt(temp[i+8])-1==parseInt(temp[i+9])&&parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(foldPoker.poker[0])){	//遍历找顺子，没有就GG

								for(var j=0;j<10;j++){
									tip[j]=temp[i+j];
								}
								break;
							}
						}
					break;
					//牌型类型为连对
					case 66:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length-1;i++){
							if(arr[i][0]==arr[i+1][0]&&only.indexOf(arr[i][0])==-1){	//点数没在only数组出现过并成对出现的就添加
								only.push(arr[i][0]);
								only.push(arr[i+1][0]);
								flo.push(arr[i][1]);
								flo.push(arr[i+1][1]);
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);	//将点数和花色拼接存到临时数组temp里
						}
						//遍历找连对，没有就GG
						for(var i=temp.length-1;i>=9;i-=2){
							if(parseInt(temp[i])+1==parseInt(temp[i-3])&&parseInt(temp[i-2])+1==parseInt(temp[i-5])&&
							   parseInt(temp[i-4])+1==parseInt(temp[i-7])&&parseInt(temp[i-6])+1==parseInt(temp[i-9])&&
							   parseInt(temp[i-7])<13&&parseInt(temp[i])>foldPoker.max){
								for(var j=0;j<10;j++){
									tip[j]=temp[(i-9)+j];
								}
								break;
							}
						}
					break;
					//牌型类型为三带二飞机
					case 1123:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length-2;i++){
							if(arr[i][0]==arr[i+2][0]&&only.indexOf(arr[i][0])==-1){	//点数没在only数组出现过并成三出现的就添加
								for(var j=0;j<3;j++){
									only.push(arr[i+j][0]);
									flo.push(arr[i+j][1]);
								}
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);								//将点数和花色拼接存到临时数组temp里
						}
						var con = 1;		//记录对子添加了几次
						for(var i=obj.length-1;i>=0;i--){
							if(parseInt(obj[i])==parseInt(obj[i-1])&&temp.indexOf(obj[i])==-1){
								if(con==2){
									temp.push(obj[i]);
									break;
								}else{
									temp.push(obj[i]);
									con++;
								}
							}
						}
						if(temp.length == 10){
							for(var i=0;i<temp.length;i++){
								tip.push(temp[i]);
							}
						}
					break;
				}
			break;
			//牌型长度为11
			case 11:
				if(type == 6){
					var only = [];	//临时存储点数
					var flo = [];	//临时存储花色
					var temp = [];	//临时存储数据
					for(var i=0;i<arr.length;i++){
						if(only.indexOf(arr[i][0])==-1){	//点数没出现过就添加（去重）
							only.push(arr[i][0]);
							flo.push(arr[i][1]);
						}
					}
					for(var i=0;i<only.length;i++){
						temp.push(only[i]+'-'+flo[i]);	//将点数和花色拼接存到临时数组temp里
					}
					
					for(var i=temp.length-11;i>=0;i--){
						
						if(parseInt(temp[i])-1==parseInt(temp[i+1])&&parseInt(temp[i+1])-1==parseInt(temp[i+2])&&
							parseInt(temp[i+2])-1==parseInt(temp[i+3])&&parseInt(temp[i+3])-1==parseInt(temp[i+4])&&
							parseInt(temp[i+4])-1==parseInt(temp[i+5])&&parseInt(temp[i+5])-1==parseInt(temp[i+6])&&
							parseInt(temp[i+6])-1==parseInt(temp[i+7])&&parseInt(temp[i+7])-1==parseInt(temp[i+8])&&
							parseInt(temp[i+8])-1==parseInt(temp[i+9])&&parseInt(temp[i+9])-1==parseInt(temp[i+10])&&
							parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(foldPoker.poker[0])){	//遍历找顺子，没有就GG

							for(var j=0;j<11;j++){
								tip[j]=temp[i+j];
							}
							break;
						}
					}
				}
			break;
			//牌型长度为12
			case 12:
				switch(type){
					//牌型类型为连对
					case 66:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length-1;i++){
							if(arr[i][0]==arr[i+1][0]&&only.indexOf(arr[i][0])==-1){	//点数没在only数组出现过并成对出现的就添加
								only.push(arr[i][0]);
								only.push(arr[i+1][0]);
								flo.push(arr[i][1]);
								flo.push(arr[i+1][1]);
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);	//将点数和花色拼接存到临时数组temp里
						}
						//遍历找连对，没有就GG
						for(var i=temp.length-1;i>=11;i-=2){
							if(parseInt(temp[i])+1==parseInt(temp[i-3])&&parseInt(temp[i-2])+1==parseInt(temp[i-5])&&
							   parseInt(temp[i-4])+1==parseInt(temp[i-7])&&parseInt(temp[i-6])+1==parseInt(temp[i-9])&&
							   parseInt(temp[i-8])+1==parseInt(temp[i-11])&&parseInt(temp[i-7])<13&&parseInt(temp[i])>foldPoker.max){
								for(var j=0;j<12;j++){
									tip[j]=temp[(i-11)+j];
								}
								break;
							}
						}
					break;
					//牌型类型为纯飞机
					case 1122:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length-2;i++){
							if(arr[i][0]==arr[i+2][0]&&only.indexOf(arr[i][0])==-1){	//点数没在only数组出现过并成三出现的就添加
								for(var j=0;j<3;j++){
									only.push(arr[i+j][0]);
									flo.push(arr[i+j][1]);
								}
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);		//将点数和花色拼接存到临时数组temp里
						}
						for(var i=temp.length-1;i>2;i-=3){
							if(parseInt(temp[i])+1==parseInt(temp[i-5])&&parseInt(temp[i-3])+1==parseInt(temp[i-8])&&
							   parseInt(temp[i-5])+1==parseInt(temp[i-11])&&parseInt(temp[i-8])<13&&parseInt(temp[i])>foldPoker.max){
								for(var j=0;j<12;j++){
									tip[j]=temp[(i-11)+j];
								}
								break;
							}
						}
					break;
					//牌型类型为三带一飞机
					case 1123:
						var only = [];	//临时存储点数
						var flo = [];	//临时存储花色
						var temp = [];	//临时存储数据
						for(var i=0;i<arr.length-2;i++){
							if(arr[i][0]==arr[i+2][0]&&only.indexOf(arr[i][0])==-1){	//点数没在only数组出现过并成三出现的就添加
								for(var j=0;j<3;j++){
									only.push(arr[i+j][0]);
									flo.push(arr[i+j][1]);
								}
							}
						}
						for(var i=0;i<only.length;i++){
							temp.push(only[i]+'-'+flo[i]);								//将点数和花色拼接存到临时数组temp里
						}
						var con = 1;		//记录加了多少张单牌进去
						for(var i=obj.length-1;i>=0;i--){
							if(temp.indexOf(obj[i])==-1){
								if(con == 3){
									temp.push(obj[i]);
									break;
								}else{
									temp.push(obj[i]);
									con++;
								}	
							}
							
						}
						if(tip.length == 12){
							for(var i=0;i<temp.length;i++){
								tip.push(temp[i]);
							}
						}
					break;
				}
			break;
			//牌型长度为14
			case 14:
				if(type = 66){
					var only = [];	//临时存储点数
					var flo = [];	//临时存储花色
					var temp = [];	//临时存储数据
					for(var i=0;i<arr.length-1;i++){
						if(arr[i][0]==arr[i+1][0]&&only.indexOf(arr[i][0])==-1){	//点数没在only数组出现过并成对出现的就添加
							only.push(arr[i][0]);
							only.push(arr[i+1][0]);
							flo.push(arr[i][1]);
							flo.push(arr[i+1][1]);
						}
					}
					for(var i=0;i<only.length;i++){
						temp.push(only[i]+'-'+flo[i]);	//将点数和花色拼接存到临时数组temp里
					}
					//遍历找连对，没有就GG
					for(var i=temp.length-1;i>=13;i-=2){
						if(parseInt(temp[i])+1==parseInt(temp[i-3])&&parseInt(temp[i-2])+1==parseInt(temp[i-5])&&
						   parseInt(temp[i-4])+1==parseInt(temp[i-7])&&parseInt(temp[i-6])+1==parseInt(temp[i-9])&&
						   parseInt(temp[i-8])+1==parseInt(temp[i-11])&&parseInt(temp[i-10])+1==parseInt(temp[i-13])&&
						   parseInt(temp[i-7])<13&&parseInt(temp[i])>foldPoker.max){
							for(var j=0;j<14;j++){
								tip[j]=temp[(i-13)+j];
							}
							break;
						}
					}
				}
			break;
		}

		//如果还没有牌可以打，那就找玩家牌里有没有炸弹或者王炸
		if(tip.length == 0){

			for(var i=obj.length-1;i>=3;i--){	

				if(parseInt(obj[i])==parseInt(obj[i-3])&&parseInt(obj[i])>parseInt(foldPoker.poker[0])){

					for(var j=0;j<4;j++){

						tip.push(obj[i-j]);

					}

					break;
				}
			}

		

			if(parseInt(obj[0]) == parseInt(obj[1]) && parseInt(obj[0]) == 14){

				tip.push(obj[0]);

				tip.push(obj[1]);

			}
		}
		checkPoke(tip);			//添加比较值和类型到ready_obj里

		for(var i=0;i<tip.length;i++){

			ready_obj.poker[i] = tip[i];		//添加出牌数据到ready_obj里

		}

		if(num == 1){
		
			toUp(obj);			//将提示出来的牌显示出来

		}

	}
	///////////////////////////////玩家提示出牌的功能结束////////////////////////////////////

	//----------将预备出牌数组里的牌全部显示出来的方法--------
	function toUp(obj){

		var length = obj.length;

		for(var i=0;i<ready_obj.poker.length;i++){

			var num = obj.indexOf(ready_obj.poker[i]);

			var index = $('.midCard li').eq(num).attr('index');

			$('.midCard li').eq(num).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(-50px)'});  //将牌升起
			
			$('.midCard li').eq(num).attr('kaiguan','1');   //开关值改为1，表示被选中

		}
	}

	function toDown(obj){

		var length = obj.length;

		for(var i=0;i<ready_obj.poker.length;i++){

			var num = obj.indexOf(ready_obj.poker[i]);

			var index = $('.midCard li').eq(num).attr('index');

			$('.midCard li').eq(num).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(0px)'})  //将牌降下来

			$('.midCard li').eq(num).attr('kaiguan','0');  //开关值变为0，表示没有被选中

		}

		ready_obj.poker = [];
	}
}
})