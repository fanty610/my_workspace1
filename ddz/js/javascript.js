
	// 定义一个最大的斗地主类
	// play_obj{
	// 	play1:play1,
	// 	play2:play2,
	// 	play3:play3,
	// 	integral:integral
	// }


function FightAgainstLandlords(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){

	this.Animate = new Animation(Ama,special,poker,Music,Rob);

	this.SetInfo(player_obj);  //初始化游戏信息

	// this.DefineVariable();	//定义变量的方法


	this.bei = 1   //游戏倍数

	this.police_num = 0;

	this.victery_01 = 0;

	this.victery_02 = 0;

	this.victery_03 = 0;

	this.play_game = 0;

	this.cont = 0;	//记录点了几次不出

	this.rob_arr = [-1,-1,-1];

	this.rob1 = 0;

	this.rob2 = 0;

	this.rob3 = 0;  //记录同一个玩家点了抢地主按钮的次数

	this.int;	//用来清定时器用的(抢地主)

	this.kaiguan;

    this.set;   //用来清定时器用的（出牌）

	this.InitEvents(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);		//绑定事件
	this.DefineVariable();
	this.InitPoker(poker);
	// this.Animation = new Animation()  //动画函数
}

FightAgainstLandlords.prototype = {

	constructor:FightAgainstLandlords,	//将构造函数指向自己

	//初始化游戏信息
	SetInfo:function(player_obj){

		//初始化玩家信息
		// name:昵称 integral:积分 role:角色(0代表农民,1代表地主) poker:手牌 victory:胜场
		this.all_player = [
			
			{name:player_obj.play1,integral:player_obj.integral,role:0,poker:[],victory:0},
	
			{name:player_obj.play2,integral:player_obj.integral,role:0,poker:[],victory:0},
	
			{name:player_obj.play3,integral:player_obj.integral,role:0,poker:[],victory:0}
	
		],
		
		//初始化游戏基本信息
		this.gameInfo = {
	
			gamesNumber:0,		//游戏总局数
	
			difen:player_obj.difen,			//底分
	
			multiple:1 			//倍数
	
		}

		
		
	},
//初始化牌堆的方法
	InitPoker:function(poker){
		for(var i=0;i<54;i++){

			poker.$allPoker.append('<li class="back" style="top:'+(-i)+'px" ></li>');
			
		}

		poker.$allPokerLi = $('.back');


		// 定义牌型
		this.all_poker_data = ['14-0','14-1'];

		for(var i=1;i<14;i++){

			for(var j=0;j<4;j++){

				this.all_poker_data.push(i+'-'+j);

			}

		}
		

	}, 

		


	//定义变量的方法
	DefineVariable:function(){

		//定义出牌堆的对象
		this.ready_obj = {poker:[],type:0,max:0};

		//定义弃牌堆的对象
		this.foldPoker = {poker:[],type:0,max:0};


	},


	//绑定事件的方法
	InitEvents:function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){
	 	var that = this;

		var click = 0;

		//开始游戏
		poker.$allPoker.on('click',poker.$allPoker,function(){
			
	 		if(click == 0){

				click = null;

				that.all_poker_data.sort(function(){		//对数据的洗牌

					return 0.5-Math.random();

				})
			}
		
			another.$hand.css('display','none');

			//洗牌特效
			that.Animate.shuffleCard(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,that);
		
			// that.robSui(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);
		});


		/*抢地主*/
		
		//绑定玩家1抢地主按钮的事件
		Rob.$rob_1_1.on('click', function(){

			// var that = this; 

			that.bei = that.bei * 2;

			that.rob1++;

			Rob.$rob1.css('display','none');	//点击过了就得消失
			

			if(that.rob_arr.indexOf(2) == -1){	//没出现过2说明没人叫过地主 

				$('.sound01').attr({src:'./sound/play/call.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				that.rob_arr[0] = 2;

				Rob.$rob_1_1.attr('value','抢地主');

				Rob.$rob_1_2.attr('value','不抢');

			}else if(that.rob_arr[0] == 2){		//或者我自己叫过地主

				$('.sound01').attr({src:'./sound/play/rob.m4a',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				that.all_player[0].role = 1;

				that.rob_arr[0] = true;			//我现在是地主了

				that.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

				return;

			}else{	

				$('.sound01').attr({src:'./sound/play/rob.m4a',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();						

				that.rob_arr[0] = 1;				//抢地主
				
			}

			if(that.rob_arr[1] != 0){		//下一个玩家没放弃过抢地主

				Rob.$rob2.css('display','block');

				clearInterval(that.int);
				
				that.robTime(2,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,23);

			}else if(that.rob_arr[2] != 0){	//下一个玩家放弃过抢地主,上家没放弃过抢地主

				Rob.$rob3.css('display','block');

				clearInterval(that.int);

				that.robTime(3,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

			}else{	

				that.all_player[0].role = 1;				

				that.rob_arr[0] = true;		//其他玩家都放弃了抢地主，那么直接当选地主

				that.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);
			}
		});
		Rob.$rob_1_2.on('click', function(){
			that.noRob(1,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);
		});

		//绑定玩家2抢地主按钮的事件
		Rob.$rob_2_1.on('click', function(){
			
			that.bei = that.bei * 2;

			that.rob2++;

			Rob.$rob2.css('display','none');	//点击过了就得消失

			if(that.rob_arr.indexOf(2) == -1){	//没出现过2说明没人叫过地主

				$('.sound01').attr({src:'./sound/play/call.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play(); 

				that.rob_arr[1] = 2;

				Rob.$rob_2_1.attr('value','抢地主');

				Rob.$rob_2_2.attr('value','不抢');

			}else if(that.rob_arr[1] == 2){		//或者我自己叫过地主

				that.all_player[1].role = 1;

				that.rob_arr[1] = true;			//我现在是地主了

				$('.sound01').attr({src:'./sound/play/rob.m4a',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				that.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)

				return;

			}else{		

				that.rob_arr[1] = 1;				//抢地主

				$('.sound01').attr({src:'./sound/play/rob.m4a',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

			}

			if(that.rob_arr[2] != 0){		//下一个玩家没放弃过抢地主

				Rob.$rob3.css('display','block');

				clearInterval(that.int);

				that.robTime(3,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

			}else if(that.rob_arr[0] != 0){	//下一个玩家放弃过抢地主,上家没放弃过抢地主

				Rob.$rob1.css('display','block');

				clearInterval(this.int);

				that.robTime(1,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,13);

			}else{	

				that.all_player[1].role = 1;		
		
				that.rob_arr[1] = true;		//其他玩家都放弃了抢地主，那么直接当选地主

				that.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)

			}
		});
		Rob.$rob_2_2.on('click', function(){
			that.noRob(2,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);
		});

		//绑定玩家3抢地主按钮的事件
		Rob.$rob_3_1.on('click', function(){
			
			that.bei = that.bei * 2;

			that.rob3++

			Rob.$rob3.css('display','none');	//点击过了就得消失

			if(that.rob_arr.indexOf(2) == -1){	//没出现过2说明没人叫过地主

				$('.sound01').attr({src:'./sound/play/call.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play(); 

				that.rob_arr[2] = 2;

				Rob.$rob_3_1.attr('value','抢地主');

				Rob.$rob_3_2.attr('value','不抢');

			}else if(that.rob_arr[2] == 2){		//或者我自己叫过地主

				that.all_player[2].role = 1;

				that.rob_arr[2] = true;			//我现在是地主了

				$('.sound01').attr({src:'./sound/play/rob.m4a',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				that.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)

				return;

			}else{	

				$('.sound01').attr({src:'./sound/play/rob.m4a',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();			

				that.rob_arr[2] = 1;				//抢地主

			}

			if(that.rob_arr[0] != 0){		//下一个玩家没放弃过抢地主

				Rob.$rob1.css('display','block');

				clearInterval(that.int);

				that.robTime(1,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

			}else if(that.rob_arr[1] != 0){	//下一个玩家放弃过抢地主,上家没放弃过抢地主

				Rob.$rob2.css('display','block');

				clearInterval(that.int);

				that.robTime(2,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

			}else{	

				that.all_player[2].role = 1;					

				that.rob_arr[2] = true;		//其他玩家都放弃了抢地主，那么直接当选地主

				that.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)
			}
		});
		Rob.$rob_3_2.on('click', function(){
			that.noRob(3,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);
		});


		/* 出牌 */

		//绑定玩家牌面的点击事件
		poker.$play2.on('click','li',function(){

			var length = that.all_player[1].poker.length;   //定义一个变量来获取玩家手牌的长度
			
			var index = $(this).attr('index');  //获取index值去改变角度

			that.kaiguan = $(this).attr('kaiguan');   //获取开关值去判断牌是否被选择

			var dataValue =$(this).attr('data-value');   //获取data-value值去存入准备出牌的数组中

			if(that.kaiguan == '0'){   //开关值等于0则表示牌没有被选中

				$(this).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(-50px)'});  //将牌升起
				
				$(this).attr('kaiguan','1');   //开关值改为1，表示被选中

				that.ready_obj.poker.push(dataValue);    //data-value值存入数组中

			}else{

				$(this).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(0px)'})  //将牌降下来

				$(this).attr('kaiguan','0');  //开关值变为0，表示没有被选中

				var num = that.ready_obj.poker.indexOf(dataValue);   //定义一个变量来获取数组中要删的值的下标
				
				that.ready_obj.poker.splice(num,1);  //删除数组的没有选中的那张牌的数据

			}
		});

		//玩家出牌的效果
		poker.$play_2_bt.click(function(){
			
			that.playSend(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);
			
		});

		//绑定玩家的不出牌按钮的点击事件
		poker.$play_2_bt2.click(function(){

			that.playPass(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

		});

		//绑定玩家的提示按钮的点击事件
		poker.$play_2_bt3.click(function(){

			that.ToDown(that.all_player[1].poker);					//把手贱点到的牌都降下来

			that.PromptPoke(that.all_player[1].poker,1);			//调用提示方法

			if(that.ready_obj.poker.length == 0){

				that.specialEffects.tip(1,special);
						
			}

		});

		/*-----------------道具栏---------------*/	
		another.$left_people.click(function(){

 			another.$left_container.css({transition:'all 1s ease',transform:'rotate(0deg)',opacity:'1'})

	 	});

	 	another.$right_people.click(function(){

	 		another.$right_container.css({transition:'all 1s ease',transform:'rotate(0deg)',opacity:'1'})

	 	});



	 	another.$left_set1_span.on('click',function(cardSE){   //连对
	 	
	 		another.$left_prop_tips.html('连对');
	 		special.$sound1.attr('src','./sound/special/ld.ogg');
	 		that.Animate.cardSpecialEffect.lian(cardSE);

 		});
	 
	 	another.$left_set2_span.on('click',function(cardSE){   //炸弹

	 		another.$left_prop_tips.html('炸弹');
	 		special.$sound1.attr('src','./sound/special/zd.ogg');

			special.$music.attr({src:'./music/back/boom.mp3',loop:true});

			that.Animate.cardSpecialEffect.bomb(cardSE);

			Music.music.play();
	 	})
	 	

	 	another.$left_set3_span.on('click',function(){  //王炸
	 		
			another.$left_prop_tips.html('王炸');

	 		special.$music.attr({src:'./music/back/boom.mp3',loop:true});

			that.Animate.cardSpecialEffect.wz(special,cardSE);

			Music.music.play();
	 	})
	 	
	 	var lu = 0;
	 	another.$right_set1_span.on('click',function(cardSE){ //顺子
	 		another.$right_prop_tips.html('顺子');

	 		special.$sound1.attr('src','./sound/special/sz.ogg');

			Music.sound_01.play();
	 		
	 		that.cardSpecialEffect.straight(cardSE);
	 	})

	 	
	 	another.$right_set2_span.on('click',function(){  //飞机
	 		
	 		another.$right_prop_tips.html('飞机');
	 		 
	 		special.$sound1.attr('src','./sound/special/fj.ogg');

			special.$sound2.attr('src','./sound/special/fj_2.ogg');

			Music.sound_02.play();
	 		
	 		that.cardSpecialEffect.planet(cardSE,Ama);
	 	})

	 	another.$right_set3_span.on('click',function(){  
			  //卢本伟音效
	 		  if(lu == 0){

	 		 	 special.$sound1.attr({src:'./lu/34567.m4a',loop:false});
	 		 	 Music.sound_01.play();
	 		 	 lu = 1;
	 		  }else if(lu == 1){
	 		  	special.$sound1.attr({src:'./lu/ren.m4a',loop:false});
	 		 	 Music.sound_01.play();
	 		 	 lu = 0;
	 		  }
	 	})

	},

	//游戏主体部分
	// Game:function(){

	// },

	//定义游戏音效的方法
	Sound:function(special,Music,cardSE,Ama){
		
		var length = this.foldPoker.poker.length;

		var type = this.foldPoker.type;
		
		switch(length){

			case 1:

				if(this.foldPoker.poker[0] == '14-1'){

					special.$sound1.attr('src','./sound/one/15.ogg');

				}else{

					special.$sound1.attr('src','./sound/one/'+parseInt(this.foldPoker.poker[0])+'.ogg');

				}

			break;

			case 2:

				special.$sound1.attr('src','./sound/two/'+parseInt(this.foldPoker.poker[0])+'.ogg');

			break;

			case 3:

				special.$sound1.attr('src','./sound/3zhang.ogg');

			break;

		}

		switch(type){

			case 3.1:

				special.$sound1.attr('src','./sound/sdy.ogg');

			break;

			case 3.2:

				special.$sound1.attr('src','./sound/sdyd.ogg');

			break;

			case 4.2:

				special.$sound1.attr('src','./sound/sde.ogg');

			break;

			case 100:

				special.$sound1.attr('src','./sound/special/zd.ogg');

				special.$music.attr({src:'./music/back/boom.mp3',loop:true});

				this.bei++;

				this.cardSpecialEffect.bomb(cardSE);

				Music.music.play();

				Music.music.volume = 0.2;

			break;

			case 6:

				special.$sound1.attr('src','./sound/special/sz.ogg');

				this.cardSpecialEffect.straight(cardSE);

			break;

			case 66:

				special.$sound1.attr('src','./sound/special/ld.ogg');

				this.cardSpecialEffect.lian(cardSE);

			break;

			case 110:

				special.$music.attr({src:'./music/back/boom.mp3',loop:true});

				this.bei = this.bei * 2;
				
				this.cardSpecialEffect.wz(special,cardSE);

				Music.music.play();

				Music.music.volume = 0.2;

			break;
		}

		if(type == 1122 || type == 1123){

			special.$sound1.attr('src','./sound/special/fj.ogg');

			special.$sound2.attr('src','./sound/special/fj_2.ogg');

			this.cardSpecialEffect.planet(cardSE,Ama);

			Music.sound_02.volume = 1;

			Music.sound_02.play();

		}

		Music.sound_01.volume = 1;

		Music.sound_01.play();
		
	},

	//定义游戏背景音乐的方法
	Music:function(special,Music){
		special.$music.on('ended',function(){

			if(special.$music.attr('src') == './music/back/back_02.mp3'){

				special.$music.attr({src:'./music/back/back_01.mp3',loop:false});

			}else if(special.$music.attr('src') == './music/back/back_01.mp3'){

				special.$music.attr({src:'./music/back/back_02.mp3',loop:false});

			}

			Music.music.load();

			Music.music.volume = 0.2;
		})

	},

	//定义游戏动画的对象
/*	Animation:{
		spotMove:function(Ama){
			// var that = this;
			
			for(var i=0; i<6;i++){
				(function(j){
					setTimeout(function(){
						Ama.$spot.eq(j).animate({top:'50px',opacity:'0.45'},500).animate({top:'-30px',opacity:'0.45'},500).animate({top:'0px',opacity:'1'},500)
					},j*100);
					
				})(i)	
			}

			setInterval(function(){  //定义多次执行加载点的动画
				for(var i=0; i<6;i++){
					(function(j){
						setTimeout(function(){
							Ama.$spot.eq(j).animate({top:'50px',opacity:'0.45'},500).animate({top:'-30px',opacity:'0.45'},500).animate({top:'0px',opacity:'1'},500)
						},j*100);
						
					})(i)	
				}
			},2500)
		},
		stripMove:function (Ama,special,Music){
			var that = this;
			this.music = document.getElementsByClassName('music')[0];
			Ama.$slope.animate({left:'-73px'},7000);
			setTimeout(function(){
				Ama.$write.css('color','white')
			},2400);

			setTimeout(function(){
				Ama.$write.text('START');

			},7000);
			Ama.$strip.click(function(){   
				if(Ama.$write.html() == 'START'){   //要判断是否已经加载完才能进行点击

					Ama.$onLoad_box.css('display','none');
					
					special.$music.attr({src:'./music/back/back_01.mp3',loop:false});

					Music.music.volume = 0.2;

					Music.music.load();

					that.backgroundMove(Ama);  //点击之后调用桌子

				}
				
			});	
		},
		backgroundMove:function(Ama){

			Ama.$deskL.animate({left:'0%'},700); 

			Ama.$deskR.animate({left:'50%'},700);   //将左右两张图片移到一起
				
			setTimeout(function(){

				Ama.$game.animate({opacity:'1'},600);

				Ama.$onLoad_box.css('display','none');

				Ama.$game.css('display','block');  //当桌子拼在一起后游戏页面才能显示

			},700)
		},

	
	},*/

	


	// 洗牌动画
	shuffleCard:function(poker,Music,special,Rob,cardSE){	
		var that = this;          
		
		for(var i=53;i>=0;i--){
			(function(j){
				setTimeout(function(){
						
					var ranTop = Math.round(Math.random()*30)+20;
					var ranZ = Math.round(Math.random()*150)+50;
					var ranY = Math.round(Math.random()*450)-50;
			 		var ranX = Math.round(Math.random()*800)-400;  
					var ranrotY = Math.round(Math.random()*140)-70;  //产生四个随机值去改变牌的3d效果
					poker.$allPokerLi.eq(j).animate({top:ranTop+'px'},300)
					poker.$allPokerLi.eq(j).css({transform:'translateZ('+ranZ+'px) translateY(0px) translateX(0px) rotateY(0deg)'})
						.css({transform:'translateZ('+ranZ+'px) translateY('+ranY+'px) translateX(0px) rotateY(0deg)'})
						.css({transform:'translateZ('+ranZ+'px) translateY('+ranY+'px) translateX('+ranX+'px) rotateY(0deg)'})
						.css({transform:'translateZ('+ranZ+'px) translateY('+ranY+'px) translateX('+ranX+'px) rotateY('+ranrotY+'deg)'});	
					
					setTimeout(function(){

						poker.$allPokerLi.eq(j).css({opacity:'0'})
							},(54-j))
						setTimeout(function(){

						poker.$allPokerLi.eq(53-j).animate({top:(j-53)+'px',opacity:'1'},10)
						poker.$allPokerLi.eq(53-j).css({transform:'translateZ(0px) translateY(0px) translateX(0px) rotateY(0deg)'})
						
						if(j == 0){
							setTimeout(function(){

								that.sendPoker(0,poker,Music,special,Rob,cardSE);

							},1000)

						}

					},12000)
				},(54-j)*200)
					
			})(i)
		}
			
	},
	
 	sendPoker:function (number,poker,Music,special,Rob,cardSE){
 		var that = this;
		
		poker.$allPokerLi.css('transition','none');
		// 产生向左向下和角度的随机数
		var sub = Math.round(Math.random()*150)-90;

		var L = Math.round(Math.random()*-200)-700;

		var T = Math.round(Math.random()*100)+200;
		
		// 发牌给左边玩家
		poker.$allPokerLi.eq(poker.$allPokerLi.length-((number*3)+1)).animate({left:L+'px',top:T+'px'},100);  //将牌随机移动到某区域中
		
		setTimeout(function(poker){
			
			poker.$allPokerLi.eq(poker.$allPokerLi.length-1).css({transform:'rotate('+sub+'deg)'});  //随机转动某一角度
		},30,poker)
		
		this.all_player[0].poker.push(this.all_poker_data.pop());   //将总数据的最后一个放到左边玩家的手牌数组中
		
		setTimeout(function(poker){              //延时等待发完一张牌后将原来的牌删掉再对应的位置生成一张
			
			poker.$leftCard.append('<li  class="poker  cardLeft" style="left:'+(L+662)+'px;top:'+(T+31)+'px;background:url(./images/background.jpg);background-size:110%;transform:rotate('+sub+'deg)"></li>');
			poker.$cardLeft = $('.cardLeft');
			
			poker.$allPokerLi.eq(poker.$allPokerLi.length-((number*3)+1)).remove();
		
		},110,poker);
		
		
		 // 发牌给中间玩家
		setTimeout(function(poker){
				
			var sub = Math.round(Math.random()*150)-90;   //再重新给中间玩家随机产生一个新的角度，以防与上一张牌的角度一张
			var Left = Math.round(Math.random()*40)-20;
			poker.$allPokerLi.eq(poker.$allPokerLi.length-((number*3)+2)).animate({left:Left+'px',top:(T+350)+'px'},100);   //将牌随机移动到某区域中
			
			setTimeout(function(poker){
				poker.$allPokerLi.eq(poker.$allPokerLi.length-1).css({transform:'rotate('+sub+'deg)'});   //将牌随机移动到某区域中
			},100,poker)
			
			that.all_player[1].poker.push(that.all_poker_data.pop());
			
			setTimeout(function(poker){            //延时等待发完一张牌后将原来的牌删掉再对应的位置生成一张
		
				poker.$allPokerLi.eq(poker.$allPokerLi.length-((number*3)+2)).remove();
				
				poker.$midCard.append('<li class="poker  cardMid" style=" left:'+(Left)+'px;top:'+(T-162)+'px;background:url(./images/background.jpg);background-size:110%;transform:rotate('+sub+'deg)" ></li>')
				
				poker.$cardMid = $('.cardMid');
			},110,poker) 
		},350,poker)
		

		// 发牌给右边玩家
		setTimeout(function(poker){	
			var sub = Math.round(Math.random()*150)-90;
			
			poker.$allPokerLi.eq(poker.$allPokerLi.length-((number*3)+3)).animate({left:(-L-50)+'px',top:T+'px'},100); //将牌随机移动到某区域中
			
			setTimeout(function(poker){
				poker.$allPokerLi.eq(poker.$allPokerLi.length-1).css({transform:'rotate('+sub+'deg)'});  //随机转动某一角度
			},100,poker)
			
			that.all_player[2].poker.push(that.all_poker_data.pop());  //将总数据的最后一个放到右边玩家的手牌数组中
			
			setTimeout(function(poker){   //延时等待
				poker.$allPokerLi.eq(poker.$allPokerLi.length-((number*3)+3)).remove();
				poker.$rightCard.append('<li  class="poker   cardRight" style="left:'+(-L-711)+'px;top:'+(T+30)+'px;background:url(./images/background.jpg);background-size:110%;transform:rotate('+sub+'deg)"></li>');			
				
				poker.$cardRight = $('.cardRight');
			},110,poker)
		},600,poker)
			
			//延时自调用发牌的效果函数
			setTimeout(function(){
				number +=1 ;        //自增发牌的次数
				
				if(number<17){
					that.sendPoker(number,poker,Music,special,Rob,cardSE);  //自调用发牌方法
				
				}else{
					
					setTimeout(function(){
						that.straightenPoker(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);  //等待发完牌后调用将牌归正的函数方法
					},300)
				    
				}	
			},750)

	},
	straightenPoker:function (player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){
		var that = this;

		//左边的玩家的所有牌移动
		for(var i=0;i<17;i++){
			poker.$cardLeft.eq(i).css('transform','rotate(0deg)');
			poker.$cardLeft.eq(i).animate({left:'0px',top:'0px'},300);
		}
		
		//中间的玩家的所有牌移动
		for(var j=0;j<17;j++){
			poker.$cardMid.eq(j).css('transform','rotate(0deg)');
			poker.$cardMid.eq(j).animate({left:'0px',top:'30px'},300);
		}
		
		//右边的玩家的所有牌移动
		for(var k=0;k<17;k++){
			poker.$cardRight.eq(k).css('transform','rotate(0deg)');
			poker.$cardRight.eq(k).animate({left:'0px',top:'0px'},300);
		}

		//每一副的扑克牌移动
		setTimeout(function(){
			
			poker.$play1.animate({top:'-20px'},500);
			poker.$play2.animate({top:'40px'},500);
			poker.$play3.animate({top:'-20px'},500);
			
		},300)
	
	//---------对3副牌已经排好序的手牌展开----------------
		setTimeout(function(poker){

		 	//先把原来的左右玩家的两幅手牌删掉
			poker.$cardLeft.remove();

			poker.$cardRight.remove();

			//对左右玩家的两幅手牌排序
			that.all_player[0].poker = that.SortPoker(that.all_player[0].poker);

			that.all_player[2].poker = that.SortPoker(that.all_player[2].poker);
		 	
			//生成左边玩家已经排好序的手牌
			for(var i=0;i<17;i++){

				var pokerHtml = that.MakePoker(that.all_player[0].poker[i]);	
				
				poker.$leftCard.append(pokerHtml);

			}
			poker.$cardLeft = $('.leftCard .back');

			for(var j = 0;j<17;j++){
				poker.$cardLeft.eq(j).animate({top:40*j+'px'},1300);
			}


			//生成中间玩家已经排好序的手牌  
			setTimeout(function(poker){

				that.mid(poker);
					
			},1200,poker)


			//生成右边玩家已经排好序的手牌
			for(var k=0;k<17;k++){

			var pokerHtml = that.MakePoker(that.all_player[2].poker[k]);

				poker.$rightCard.append(pokerHtml);


			}
			poker.$cardRight = $('.rightCard .back');

			for(var z=0; z<17; z++){
				poker.$cardRight.eq(z).animate({top:40*z+'px'},1300);
			}

		
		},800,poker);



		setTimeout(function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){

			poker.$allPokerLi.eq(1).animate({left:'0px'},100);

			poker.$allPokerLi.eq(2).animate({left:'200px'},100);

			poker.$allPokerLi.eq(0).animate({left:'-200px'},100);
			

			//开始抢地主
			that.robSui(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

		},1250,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

	},

	mid:function (poker){

		if(poker.$cardMid.remove()){  //将中间玩家的手牌删掉

			this.all_player[1].poker = this.SortPoker(this.all_player[1].poker); //对中间玩家的手牌进行排序

			var length = this.all_player[1].poker.length;

			for(var j=0;j<length;j++){	   //循环生成17张牌的牌面
				
				var pokerHtml = this.MakePoker(this.all_player[1].poker[j],'midCard');

				poker.$midCard.append(pokerHtml);	

			}
		}
		poker.$cardMid = $('.midCard .back');

		poker.$cardMid.attr('class','move');  //给中间玩家的牌列添加一个类名				
		
		setTimeout(this.moveCard(poker,0),10);    //延时下一张牌的移动

		  //定义第几张牌
		
		
	},
		//定义移动牌的函数方法
		
	moveCard:function(poker,card) {
		//将牌的角度改变并移动
		var length = poker.$cardMid.length
		poker.$cardMid.eq(card).css({transform:'rotate('+((card-(length/2))*4)+'deg)',transformOrigin:'43% 440%'});

		poker.$cardMid.eq(card).attr('index',card);

		poker.$cardMid.eq(card).attr('kaiguan','0');
		//判断是否把牌移动完
		if(card<this.all_player[1].poker.length){
				
			card++;

			setTimeout(this.moveCard(poker,card),10);
		}

	},

	robSui:function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){
		for(var i=1; i<4; i++){

			$('.rob_'+i+'_1').attr('value','抢地主');

			$('.rob_'+i+'_2').attr('value','不抢');
		}

		var math = Math.round(Math.random()*2+1);     //math =1

		$('.rob'+math).css('display','block');

		$('.rob_'+math+'_1').attr('value','叫地主');

		$('.rob_'+math+'_2').attr('value','不叫');

		this.specialEffects.btnMove(math,special);
	
		this.robTime(math,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);
	},

	//添加地主牌到玩家中并在页面上显示出来
	addPoke:function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){
	
		var that = this;

		$('.left_land').css('display','none');

		$('.right_land').css('display','none');

		clearInterval(this.int);

		//将地主牌的牌面换成对应的牌
		this.showCard(poker)

		//将电脑玩家数据的身份改为1，代表该玩家是地主
		var m = this.rob_arr.indexOf(true);

		$('.portrait'+(m+1)+' .head').attr('src',"./images/lordland.jpg");

		this.all_player[m].role = 1;

		this.all_player[m].poker = this.all_player[m].poker.concat(this.all_poker_data);

		this.SortPoker(this.all_player[m].poker);

		if(m == 1){

			this.cont = 2;

			$('.play_2_bt').css('display','block');

			$('.play_2_bt3').css('display','block');

			this.Animate.mid(poker,that);

			this.sendTime(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

		}else if(m == 0){

			$('.leftCard li').remove();

			for(var i=0;i<20;i++){

				var pokerHtml = this.MakePoker(this.all_player[0].poker[i]);

				$('.leftCard').append(pokerHtml)

				$('.leftCard li').eq(i).animate({top:40*i+'px'},1300);
			}

		}else if(m == 2){

			$('.rightCard li').remove();

			for(var i=0;i<20;i++){

				var pokerHtml = this.MakePoker(this.all_player[2].poker[i]);

				$('.rightCard').append(pokerHtml)

				$('.rightCard li').eq(i).animate({top:40*i+'px'},1300);

			}

		}

		//如果不是玩家2抢到地主的话自动打牌
		setTimeout(function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){

			if(m == 0){

				that.PromptPoke(that.all_player[0].poker,0);

				that.npcSend(0,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

				

			}else if(m == 2){
				

				that.PromptPoke(that.all_player[2].poker,2);

				that.npcSend(2,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

				setTimeout(function(){

					that.PromptPoke(that.all_player[0].poker,0);

					if(that.ready_obj.poker.length != 0){

						that.npcSend(0,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

					}else{

						that.npcPass(0,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

					}

				},1000)
			}
		},5000,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)
	},

	//定义一个用来抢地主计时的方法 
	robTime:function(t,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,ppp){
		console.log(ppp);
		var that = this;
		
		poker.$time.css('display','none');

		$('.time'+t).css('display','block');    //计时器显示

		var num = 24;

		$('.time'+t).attr('value',num);
		// console.log('时：'+t);
		// console.log('间：'+t);

		this.int = setInterval(function(){
			console.log('啦啦：'+t);
			num--;
			// if(num==22){
			// 	// console.log(this.int)
			// 	clearInterval(that.int)
			// }

			if(num < 0 && that.rob_arr.indexOf(true) == -1){//放弃
				console.log(that.int)
				clearInterval(that.int);
				console.log('时间完了：'+t);
				that.noRob(t,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);		//时间到就不抢地主

			}else if(num == 8){

				$('.sound02').attr({src:'./lu/quakily.m4a',loop:false});

				Music.sound_02.volume = 1;

				Music.sound_02.play();

			}else if(num < 0){

				clearInterval(this.int);

			}else{

				$('.time'+t).attr('value',num);

			}

		},1000)
	},

	//点击不抢地主的方法
	noRob:function(num,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){
		
		console.log(num);

		if(num == 1){

			this.rob1++;

			Rob.$rob1.css('display','none');

			this.rob_arr[0] = 0;				//进来直接就说明选择了不抢地主

			if(this.rob_arr[0]==0 && this.rob_arr[1]==0 && this.rob_arr[2]==0){	//说明所有人都不抢

				$('.sound01').attr({src:'./sound/play/nocall.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				clearInterval(this.int);
				// $('.time2').remove();
				this.Replay(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

				return;

			}else if(this.rob_arr.indexOf(-1) == -1 && this.rob_arr.indexOf(1) == -1){//说明有人叫了地主，其他人都不抢

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				this.all_player[this.rob_arr.indexOf(2)].role = 1;

				this.rob_arr[this.rob_arr.indexOf(2)] = true;

				this.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)

			}else if(this.rob_arr.indexOf(2) == -1 && this.rob1<2){	//说明还没人叫地主

				$('.sound01').attr({src:'./sound/play/nocall.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				Rob.$rob_2_1.attr('value','叫地主');

				Rob.$rob_2_2.attr('value','不叫');

				Rob.$rob2.css('display','block');

				clearInterval(this.int);

				this.robTime(2,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,2-1);

			}else if(this.rob_arr.indexOf(2) == -1 && this.rob1 == 2){

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				if(this.rob_arr[2] == 1){

					this.all_player[2].role = 1;

					this.rob_arr[2] = true;

					this.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)

				}else{

					this.all_player[1].role = 1;

					this.rob_arr[1] = true;

					this.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);
				}

			}else{

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				Rob.$rob2.css('display','block');

				clearInterval(this.int);

				this.robTime(2,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,2-2);
			}
	
		}else if(num == 2){

			this.rob2++

			Rob.$rob2.css('display','none');

			console.log(Rob.$rob2.css('display'))

			this.rob_arr[1] = 0;				//进来直接就说明了选择不抢地主

			if(this.rob_arr[0]==0 && this.rob_arr[1]==0 && this.rob_arr[2]==0){	//说明所有人都不抢

				$('.sound01').attr({src:'./sound/play/nocall.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				clearInterval(this.int);

				this.Replay(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

				return;

			}else if(this.rob_arr.indexOf(-1) == -1  && this.rob_arr.indexOf(1) == -1){//说明有人叫了地主，其他人都不抢

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				this.all_player[this.rob_arr.indexOf(2)].role = 1;

				this.rob_arr[this.rob_arr.indexOf(2)] = true;

				this.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)

			}else if(this.rob_arr.indexOf(2) == -1 && this.rob2<2){	//说明还没人叫地主

				$('.sound01').attr({src:'./sound/play/nocall.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				Rob.$rob_3_1.attr('value','叫地主');

				Rob.$rob_3_2.attr('value','不叫');

				Rob.$rob3.css('display','block');

				clearInterval(this.int);

				this.robTime(3,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

			}else if(this.rob_arr.indexOf(2) == -1 && this.rob2 == 2){

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				if(this.rob_arr[0] == 1){

					this.all_player[0].role = 1;

					this.rob_arr[0] = true;

					this.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)

				}else{

					this.all_player[2].role = 1;

					this.rob_arr[2] = true;

					this.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)
				}

			}else{

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				Rob.$rob3.css('display','block');

				clearInterval(this.int);

				this.robTime(3,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);
			}

		}else if(num == 3){

			this.rob3++

			Rob.$rob3.css('display','none');

			this.rob_arr[2] = 0;				//进来直接就说明了选择不抢地主

			if(this.rob_arr[0]==0 && this.rob_arr[1]==0 && this.rob_arr[2]==0){	//说明所有人都不抢

				$('.sound01').attr({src:'./sound/play/nocall.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				clearInterval(this.int);

				this.Replay(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

				return;

			}else if(this.rob_arr.indexOf(-1) == -1  && this.rob_arr.indexOf(1) == -1){//说明有人叫了地主，其他人都不抢

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				this.all_player[this.rob_arr.indexOf(2)].role = 1;

				this.rob_arr[this.rob_arr.indexOf(2)] = true;

				this.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)

			}else if(this.rob_arr.indexOf(2) == -1 && this.rob3<2){	//说明还没人叫地主

				$('.sound01').attr({src:'./sound/play/nocall.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				Rob.$rob_1_1.attr('value','叫地主');

				Rob.$rob_1_2.attr('value','不叫');

				Rob.$rob1.css('display','block');

				clearInterval(this.int);

				this.robTime(1,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,1-1);

			}else if(this.rob_arr.indexOf(2) == -1 && this.rob3 == 2){

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				if(this.rob_arr[1] == 1){

					this.all_player[1].role = 1;

					this.rob_arr[1] = true;

					this.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)

				}else{

					this.all_player[0].role = 1;

					this.rob_arr[0] = true;

					this.addPoke(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)

				}

			}else{

				$('.sound01').attr({src:'./sound/play/norob.ogg',loop:false});

				Music.sound_01.volume = 1;

				Music.sound_01.play();

				Rob.$rob1.css('display','block');

				clearInterval(this.int);

				this.robTime(1,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,1-2);

			}	

		}
	},

		// 展示地主牌
	showCard: function(poker){
		
		poker.$allPokerLi.eq(1).animate({left:'0px'},50).end();

		poker.$allPokerLi.eq(2).animate({left:'0px'},50).end();

		poker.$allPokerLi.eq(0).animate({left:'0px'},50).end();

		
		poker.$allPokerLi.css('zIndex','10');  //将层级变高，使下面生成的3张图片能够给覆盖掉

		poker.$allPokerLi.eq(1).css({top:'0px'});

		poker.$allPokerLi.eq(2).css({top:'0px'});
		
		
		 //生成3张地主牌,将地主牌与新生成的3张牌分别放到一个div里面去，便于后面的动画效果制作
		var pokerHtml0 = this.MakePoker(this.all_poker_data[0]);
		var pokerHtml1 = this.MakePoker(this.all_poker_data[1]);
		var pokerHtml2 = this.MakePoker(this.all_poker_data[2]);

		//第一张牌
		poker.$poker0.append(pokerHtml0);
			
		poker.$poker0.append(poker.$allPokerLi.eq(0)); //将地主牌放到div中去

		poker.$poker0Li = $('.poker0 li');

		poker.$poker0Li.eq(0).css('transform','rotateY(180deg)');  //现将展示的转180度，方便后面再转180度时牌面不是反的
			

		//第二张牌
		poker.$poker1.append(pokerHtml1);

		poker.$poker1.append(poker.$allPokerLi.eq(1)); //将地主牌放到div中去

		poker.$poker1Li = $('.poker1 li');

		poker.$poker1Li.eq(0).css('transform','rotateY(180deg)');  //现将展示的转180度，方便后面再转180度时牌面不是反的
			
		//第三张牌
		poker.$poker2.append(pokerHtml2);

		poker.$poker2.append(poker.$allPokerLi.eq(2)); //将地主牌放到div中去

		poker.$poker2Li = $('.poker2 li');

		poker.$poker2Li.eq(0).css('transform','rotateY(180deg)');  //现将展示的转180度，方便后面再转180度时牌面不是反的

		
		//左边div和右边div平移,稍微改变一下位置使上下两张牌重合
		
		poker.$poker1.animate({top:'180px',left:'0px'},55);

		poker.$poker2.animate({top:'180px',left:'200px'},65);

		poker.$poker0.animate({top:'180px',left:'-200px'},65);
		 //3个div的视界提升，再转180度
		
		setTimeout(function(poker){

			poker.$back.css('transition','all 0.5s ease');

			//中间的牌转动
			poker.$poker1Li.css({transform:'translateZ(250px) rotateY(0deg)'})
			.css({transform:'translateZ(250px) rotateY(180deg)'});
			
			poker.$poker1Li.eq(0).css({transform:'translateZ(250px) rotateY(180deg)'})
			.css({transform:'translateZ(250px) rotateY(360deg)'});
			
			//左边的牌转动

			poker.$poker0Li.css({transform:'translateZ(250px) rotateY(0deg)'})
			.css({transform:'translateZ(250px) rotateY(180deg)'});
		
			poker.$poker0Li.eq(0).css({transform:'translateZ(250px) rotateY(180deg)'})
			.css({transform:'translateZ(250px) rotateY(360deg)'});
			
			//右边的牌转动

			poker.$poker2Li.css({transform:'translateZ(250px) rotateY(0deg)'})
			.css({transform:'translateZ(250px) rotateY(180deg)'});
			
			poker.$poker2Li.eq(0).css({transform:'translateZ(250px) rotateY(180deg)'})
			.css({transform:'translateZ(250px) rotateY(360deg)'});

		},800,poker)
		
		
		//  //延时，等待3个div转动完后，将上面的牌隐藏了
		setTimeout(function(poker){
			poker.$back.css('transition','all 0.45s ease');

			poker.$poker0Li.eq(1).css({opacity:'0'});

			poker.$poker1Li.eq(1).css({opacity:'0'});

			poker.$poker2Li.eq(1).css({opacity:'0'});
			
			//延时，等待上面的牌隐藏后，又回到一开始的位置
			setTimeout(function(poker){

				poker.$poker0Li.css({transform:'translateZ(0px)'});

				poker.$poker1Li.css({transform:'translateZ(0px)'});
				
				poker.$poker2Li.css({transform:'translateZ(0px)'});
				
				//回到原来的位置

				poker.$poker0.css('top','0px');

				poker.$poker1.css('top','0px');

				poker.$poker2.css('top','0px');

			},1500,poker)

		},850,poker)
	},

	//定义玩家出牌的方法
	playSend:function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){
		
		var that = this;

		this.cont = 0;

		if(this.ready_obj.poker.length != 0){  //判断准备出牌的数组中有没有牌
	
			that.SortPoker(this.ready_obj.poker);   //对出牌的数组排序

		}else{
			
			return false;	//没牌就要滚出去

		}

		if(!this.CheckPoke(this.ready_obj.poker)){

			this.specialEffects.tip(2,special);

			return false;

		}else if(!this.VsPoke()){

			this.specialEffects.tip(3,special);

			return false;

		}else{

			$('.show li').remove();  //删掉弃牌堆里的出牌

			this.foldPoker = {poker:[],max:0,type:0};
		}

		var length = this.ready_obj.poker.length;

		var index ;

		for(var i=0; i<length;i++){    //循环遍历出牌数组
			
			index = this.all_player[1].poker.indexOf(this.ready_obj.poker[i]);   //获取出牌数组中元素在玩家2手牌数组中的下标值
			
			poker.$midCardLi.eq(index).css({transform:'rotate(0deg) translateY(-310px) translateX('+(i-(length/2))*30+'px)'})   //移到展示出牌区域中
			
			
			this.foldPoker.poker[i] = this.ready_obj.poker[i];  //将出牌数组中的元素赋值的弃牌数组中
		}

		this.foldPoker.type = this.ready_obj.type;

		this.foldPoker.max = this.ready_obj.max;

		this.Sound(special,Music,cardSE,Ama);

		for(var j=0; j<this.ready_obj.poker.length;j++){     //循环遍历出牌数组
			
			var index = this.all_player[1].poker.indexOf(this.ready_obj.poker[j]);   //获取出牌数组中元素在玩家2手牌数组中的下标值
			
			this.all_player[1].poker.splice(index,1);   //将玩家2的手牌中已经出了的牌的数据删掉	
		}

		setTimeout(function(){
			
			for(var k=0; k<that.ready_obj.poker.length; k++){    //在展示出牌区域中生成要出的牌
				
					var htmlPoker = that.MakePoker(that.ready_obj.poker[k]);
					
					poker.$show.append(htmlPoker);
					
					$('.show li').eq(k).css({left:30*k+'px'});
					
					poker.$show.css({left:-15*(k+1)+'px'});
				 
			}

			that.ready_obj = {poker:[],max:0,type:0};   //出完牌后将出牌数组清空

		},400)

		setTimeout(function(){   //延时将玩家2的手牌重新排序并生成
			
			poker.$cardMid.remove();

			that.all_player[1].poker = that.SortPoker(that.all_player[1].poker); //对中间玩家的手牌进行排序

			var length = that.all_player[1].poker.length;
			
			for(var j=0;j<length;j++){	   //循环再次生成剩余牌的牌面

				var pokerHtml = that.MakePoker(that.all_player[1].poker[j],'cardMid2');

				poker.$midCard.append(pokerHtml);	

				poker.$cardMid = $('.midCard li');

				poker.$back.css('transition','all 0.35s ease');
				
				poker.$cardMid.eq(j).css({transform:'rotate('+((j-(length/2))*4)+'deg)',transformOrigin:'43% 440%'});

				poker.$cardMid.eq(j).attr('index',j);       //在玩家手牌中添加一个自定义属性来显示是第几张牌

				poker.$cardMid.eq(j).attr('kaiguan','0');   //在玩家手牌中添加一个自定义属性为开关设置
			}

			poker.$bt2.css('display','none');

			poker.$time.css('display','none');

			clearInterval(that.set);

		},400)
		
		if(this.all_player[1].poker.length == 0){

		 	clearInterval(this.set);

			// console.log('你赢了');

			if(this.all_player[1].role == 1){

				this.all_player[0].integral = Number(this.all_player[0].integral) - Number(this.bei*player_obj.difen);

				this.all_player[1].integral = Number(this.all_player[1].integral) + Number(this.bei*player_obj.difen);

				this.all_player[2].integral = Number(this.all_player[2].integral) - Number(this.bei*player_obj.difen); 

				this.victery_02++;
 

			}else if(this.all_player[0].role == 1){

				this.all_player[0].integral = Number(this.all_player[0].integral) - Number(this.bei*player_obj.difen);
				
				this.all_player[1].integral = Number(this.all_player[1].integral) + Number(this.bei*player_obj.difen);

				this.all_player[2].integral = Number(this.all_player[2].integral) + Number(this.bei*player_obj.difen); 

				this.victery_02++;

				this.victery_03++;
				
			}else if(this.all_player[2].role == 1){

				this.all_player[0].integral = Number(this.all_player[0].integral) + Number(this.bei*player_obj.difen);

				this.all_player[1].integral = Number(this.all_player[1].integral) + Number(this.bei*player_obj.difen);

				this.all_player[2].integral = Number(this.all_player[2].integral) - Number(this.bei*player_obj.difen);

				this.victery_01++;

				this.victery_02++;
			}

			this.play_game = 0;

			this.specialEffects.win(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,this);		
			
			return;
		}else if(this.all_player[1].poker.length < 4 && this.police_num == 0){		//最后三张牌的时候发出警报提示玩家


			if(special.$music.attr('src') != './music/back/boom.mp3'){

				special.$music.attr({src:'./music/back/police.mp3',loop:true});

				Music.music.load();

			}

			this.police_num = 1;

		}

		$('.showGrade .text3').html('本局倍数：'+this.bei+'倍');

		//延时电脑提示出牌
		setTimeout(function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){

			that.PromptPoke(that.all_player[2].poker,2);			//调用提示方法

			if(that.ready_obj.poker.length == 0){			//提示出来是有牌可以出的

				that.npcPass(2,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);								//那就不出咯

			}else {

				that.npcSend(2,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);								//右边电脑出牌

			}


			//右边电脑出完就轮到左边电脑出牌
			setTimeout(function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){

				that.PromptPoke(that.all_player[0].poker,0);			//调用提示方法

				if(that.ready_obj.poker.length == 0){			//提示出来是没有牌可以出的

					that.npcPass(0,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);								//那就不出咯

				}else {

					that.npcSend(0,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);								//左边电脑出牌

				}

			},1000,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)

		},1000,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)
	},

	//定义玩家不出牌的方法
	playPass:function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){
		
		var that = this;
		
		var random = Math.round(Math.random() + 1);

		$('.sound01').attr({src:'./sound/play/pass'+random+'.ogg',loop:false,autoplay:'autoplay'});

		Music.sound_01.volume = 1;

		Music.sound_01.play();

		this.cont++;

		if(this.cont >= 2){

			this.foldPoker = {poker:[],max:0,type:0};	//已经有两个人不出了,想出什么就出什么

		}

		this.ToDown(this.all_player[1].poker);					//把手贱点到的牌都降下来

		poker.$bt2.css('display','none');			//点了不出就全部隐藏

		poker.$time.css('display','none');

		clearInterval(this.set);

		this.ready_obj = {poker:[],max:0,type:0};

		//延时电脑提示出牌
		setTimeout(function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){

			that.PromptPoke(that.all_player[2].poker,2);			//调用提示方法

			if(that.ready_obj.poker == 0){					//提示出来是有牌可以出的

				that.npcPass(2,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);								//那就不出咯

			}else {

				that.npcSend(2,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);							//右边电脑出牌
			
			}

			//右边电脑出完就轮到左边电脑出牌
			setTimeout(function(){

				that.PromptPoke(that.all_player[0].poker,0);			//调用提示方法

				if(that.ready_obj.poker == 0){					//提示出来是没有牌可以出的

					that.npcPass(0,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);								//那就不出咯

				}else {

					that.npcSend(0,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);							//左边电脑出牌
				
				}

			},1000)

		},1000,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob)
	},

	//定义一个用来出牌计时的方法
	sendTime:function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){
		// console.log(ttt)
		var that = this;

		poker.$time.css('display','none');

		poker.$time2.css('display','block');

		var number = 24;

		poker.$time2.attr('value',number);

		this.set = setInterval(function(){

			number--;

			if(number < 0 && this.cont >= 2){//放弃

				poker.$bt2.css('display','none');			//玩家按钮隐藏

				that.ToDown(that.all_player[1].poker);					//把手贱点到的牌都降下来

				that.PromptPoke(that.all_player[1].poker,1);			//调用提示方法

				that.playSend(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);									//调用玩家出牌方法;		

			}else if(number == 8){

				$('.sound02').attr({src:'./lu/quakily.m4a',loop:false});

				Music.sound_02.volume = 1;

				Music.sound_02.play();

			}else if(number < 0){

				poker.$bt2.css('display','none');			//玩家按钮隐藏

				that.playPass(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);		//调用玩家不出牌的方法

			}else{

				poker.$time2.attr('value',number);

			}

		},1000)
	},

	//定义电脑出牌的方法
	npcSend:function(num,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){

		this.cont = 0;

		this.foldPoker = {poker:[],max:0,type:0};

		$('.show li').remove();

		for(var i=0; i<this.ready_obj.poker.length; i++){

			this.foldPoker.poker[i] = this.ready_obj.poker[i];

		}

		this.foldPoker.type = this.ready_obj.type;

		this.foldPoker.max = this.ready_obj.max;

		this.Sound(special,Music,cardSE,Ama);

		for(var k=0; k<this.ready_obj.poker.length; k++){    //在展示出牌区域中生成要出的牌
				
			var htmlPoker = this.MakePoker(this.ready_obj.poker[k]);
			
			$('.show').append(htmlPoker);
			
			$('.show li').eq(k).css({left:30*k+'px'});
			
			$('.show').css({left:-15*(k+1)+'px'});
		
		}

		for(var j=0; j<this.ready_obj.poker.length;j++){     //循环遍历出牌数组
			
			var index = this.all_player[num].poker.indexOf(this.ready_obj.poker[j]);   //获取出牌数组中元素在玩家2手牌数组中的下标值
			
			this.all_player[num].poker.splice(index,1);   //将玩家2的手牌中已经出了的牌的数据删掉	
		}

		this.ready_obj = {poker:[],max:0,type:0};

		$('.play_'+(num+1)+' li').remove();

		if(this.all_player[num].poker.length == 0){	//在此处添加结束动画，显示积分榜

			this.play_game = 0;
			
			clearInterval(this.set);
			
			if(this.all_player[num].role == this.all_player[1].role){

				this.specialEffects.win(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,this);    //赢了

				if(num == 0){

					this.all_player[0].integral = Number(this.all_player[0].integral) + Number(this.bei*player_obj.difen); 
					this.all_player[1].integral = Number(this.all_player[1].integral) + Number(this.bei*player_obj.difen); 
					this.all_player[2].integral = Number(this.all_player[2].integral) - Number(this.bei*player_obj.difen); 

					this.victery_01++;

					this.victery_02++;
					
				}else{

					this.all_player[0].integral = Number(this.all_player[0].integral) - Number(this.bei*player_obj.difen); 
					this.all_player[1].integral = Number(this.all_player[1].integral) + Number(this.bei*player_obj.difen); 
					this.all_player[2].integral = Number(this.all_player[2].integral) + Number(this.bei*player_obj.difen); 

					this.victery_02++;

					this.victery_03++;
					
				}

				
				

			}else{
				
				this.specialEffects.lose(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,this.rob_arr,this);

				if(num == 0 /*&& this.all_player[num].role ==true*/){

					this.all_player[0].integral = Number(this.all_player[0].integral) + Number(this.bei*player_obj.difen); 
					this.all_player[1].integral = Number(this.all_player[1].integral) - Number(this.bei*player_obj.difen); 
					this.all_player[2].integral = Number(this.all_player[2].integral) - Number(this.bei*player_obj.difen); 

					this.victery_01++;

				}else{

					this.all_player[0].integral = Number(this.all_player[0].integral) - Number(this.bei*player_obj.difen); 
					this.all_player[1].integral = Number(this.all_player[1].integral) - Number(this.bei*player_obj.difen); 
					this.all_player[2].integral = Number(this.all_player[2].integral) + Number(this.bei*player_obj.difen); 

					this.victery_03++;

				}
				
				
			}
	
			return;
		
		}else if(this.all_player[num].poker.length < 4 && this.police_num == 0){		//最后三张牌的时候发出警报提示玩家


			if(special.$music.attr('src') != './music/back/boom.mp3'){

				special.$music.attr({src:'./music/back/police.mp3',loop:true});

				Music.music.load();

			}

			$('.sound02').attr({src:'./music/small_police.ogg',loop:false});

			Music.sound_02.volume = 1;

			this.police_num = 1;

			Music.sound_02.play();

		}
			
		this.all_player[num].poker = this.SortPoker(this.all_player[num].poker); //对中间玩家的手牌进行排序

		var length = this.all_player[num].poker.length;
		
		for(var j=0;j<length;j++){	   //循环生成17张牌的牌面

			var pokerHtml = this.MakePoker(this.all_player[num].poker[j]);

			if(num == 0){

				$('.leftCard').append(pokerHtml);	
				
				$('.leftCard li').eq(j).css({top:40*j+'px'});

				$('.bt2').css('display','block');

				clearInterval(this.set);
				
				if(this.all_player[2].poker != 0){
					this.sendTime(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);
				}
				

			}else if(num == 2){

				$('.rightCard').append(pokerHtml);	
				
				$('.rightCard li').eq(j).css({top:40*j+'px'});

			}

		}
	},

	//定义电脑的不出牌方法
	npcPass:function(num,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){	

		var random = Math.round(Math.random() + 1);

		$('.sound01').attr({src:'./sound/play/pass'+random+'.ogg',loop:false,autoplay:'autoplay'});

		Music.sound_01.volume = 1;

		Music.sound_01.load();

		this.cont++;

		if(this.cont >= 2){

			this.foldPoker = {poker:[],max:0,type:0};

			if(num == 0){		//左边电脑点的不出，玩家不能出现不出按钮

				$('.play_2_bt').css('display','block');

				$('.play_2_bt3').css('display','block');

				clearInterval(this.set);

				this.sendTime(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

			}

		}else{
			
			if(num == 0 && this.all_player[2].poker != 0){

				$('.bt2').css('display','block');	//不然就全显示

				clearInterval(this.set);
				
				this.sendTime(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);
				
				

			}

		}
	},


	specialEffects:{
		//-------------------积分榜动画--------------
			
		scoreboard:function(That,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){

			special.$num1td.eq(1).html(That.all_player[0].integral);
			special.$num1td.eq(2).html(That.victery_01);

			special.$num2td.eq(1).html(That.all_player[1].integral);
			special.$num2td.eq(2).html(That.victery_02);

			special.$num3td.eq(1).html(That.all_player[2].integral);
			special.$num3td.eq(2).html(That.victery_03);

			special.$scoreboard.css('display','block');

			special.$scoreboard.animate({opacity:'1'},500);

			special.$close.mouseover(function(){  //当鼠标移到关闭按钮时会转动
			
				special.$close.css({transition:'all 2s ease' ,transform:'rotate(720deg)'})  //关闭按钮转动720度
			
			})
			special.$close.mouseout(function(){  //当鼠标离开时按钮也会自动转动

				special.$close.css({transition:'all 1s ease' ,transform:'rotate(360deg)'})   //关闭按钮转360度
			})

			special.$close.click(function(){   //关闭按钮的点击事件
			
				special.$scoreboard.animate({height:'0px'},500);  //点击后积分榜高度变为0，收起来

				setTimeout(function(){

					special.$scoreboard.css({display:'none',opacity:'0',height:'500px'});    //积分榜收起来后消失


				},490)
			})

			special.$end.click(function(){   //点击后重新开局

				special.$scoreboard.css({display:'none',opacity:'0',height:'500px'});
			
				if(That.play_game == 0){
					
					That.Replay(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

				}

			})
		},
		//------------------------玩家赢的时候效果------------------
		win:function (player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,That){
			var that = this;
			
			// $('.time2').remove();

			special.$win.css('display','block');

			special.$win.animate({left:'0%'},2000);

			special.$music.attr({src:'./sound/end/win.ogg',loop:true});

			Music.music.volume = 0.2;

			special.$sound2.attr({src:'./lu/sorry.m4a',loop:false});

			Music.sound_02.volume = 1;

			Music.sound_02.play();

			Music.music.play();

			Music.music.play();
			
			clearInterval(That.set);
			
			special.$bt2.css('display','none');

			special.$mid_clock.css('display','none');

			special.$right_clock.css('display','none');

			special.$left_clock.css('display','none');

			special.$win.click(function(){

				special.$win.css({left:'-150%'});
				
				that.scoreboard(That,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);		//在此处添加结束动画，显示积分榜

			})
		},
		//------------------------玩家输的时候效果------------------
		
		lose:function (player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,rob_arr,That){
			var that = this;
			// $('.time2').remove();

			clearInterval(That.set);
			
		
			special.$music.attr({src:'./sound/end/lose.ogg',loop:true});

			Music.music.volume = 0.3;

			Music.music.play();
			
			var player = rob_arr.indexOf('true');   //地主角色的下标
			
			special.$lose.css({display:'block'});    //显示玩家输的提示

			setTimeout(function(special){

				if(rob_arr[1] != true && rob_arr[0] == true ){              //用户是农民，且左边玩家是地主

					special.$left_talk.css('opacity','1');              //将npc的对话框显示

					special.$left_talk.html();                         //预先清空对话框中的内容

					special.$left_talk.html('<p>哈哈！你真菜</p>');   //在对话框中填上内容


				} else if(rob_arr[1] != true && rob_arr[2] == true ){       //用户是农民，且右边玩家是地主

					special.$right_talk.css('opacity','1');

					special.$right_talk.html();

					special.$right_talk.html('<p>哈哈！你真菜</p>');

				}else if(rob_arr[1] == true){                //用户是地主

					special.$left_talk.css('opacity','1');

					special.$left_talk.html();

					special.$left_talk.html('<p>哈哈！你真菜</p>');

					special.$right_talk.css('opacity','1');

					special.$right_talk.html();

					special.$right_talk.html('<p>哈哈！你真菜</p>');

				}   

				special.$lose.click(function(){

					special.$lose.css({display:'none'});

					special.$left_talk.css('opacity','0');

					special.$left_talk.html('');

					special.$right_talk.css('opacity','0');

					special.$right_talk.html('');

					
					that.scoreboard(That,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);		//在此处添加结束动画，显示积分榜
					
				})
				
			},300,special)
		
		},
		/*---------------警报特效（其中一位玩家手牌剩三张时调用）---------------*/
	
	
		warn:function (name,special,Music){

			name.css('display','block'); //在玩家头像上加上报警器

			special.$sound2.attr({str:'./music/small_police.ogg',loop:false})

			Music.sound_02.load();

			Music.sound_02.volume = 1;

		},
		/*--------------提示玩家效果--------------*/
		tip:function (num,special){
			special.$tips.animate({height:'200px'},400);
			setTimeout(function(){
				special.$tip.css('display','block')
			},380)	
			if(num == 1){
				special.$tip.html('没有牌能打得过上家');    	//提示打不过上家
			}else if(num == 2){
				special.$tip.html('您出的牌不符合规则，请重新出牌');
			}else{

				special.$tip.html('您出的牌打不过上家'); 

			}

			setTimeout(function(special){

				special.$tips.css({height:'0px'});

				special.$tip.css('display','none');

			},1380,special);
			
		},
		/*-----------------------按钮效果---------------------*/

		 
		btnMove:function (math,special){

			special.$um1.css('display','block');

			special.$um2.css('display','block');

			special.$um3.css('display','block');

			$('.rob'+math).css('display','block');

			$('.rob'+math).css({top:'-300px'});

			$('.rob_'+math+'_1').attr('value','叫地主');

			$('.rob_'+math+'_2').attr('value','不叫');

			$('.um'+math).css({opacity:'1'});

			$('.rob'+math).animate({top:'-200px',left:'-100px'},1500)

			.animate({top:'-100px',left:'100px'},1500)

			.animate({top:'0px',left:'0px'},1500)

			setTimeout(function(special){

				special.$um1.animate({opacity:'0'},400);

				special.$um2.animate({opacity:'0'},400);

				special.$um3.animate({opacity:'0'},400);

				setTimeout(function(special){
					
					special.$um1.css({opacity:'0',display:'none'});

					special.$um2.css({opacity:'0',display:'none'});

					special.$um3.css({opacity:'0',display:'none'});

				},1,special)

			},4600,special);


		}


	},

	cardSpecialEffect:{
		wz:function (special,cardSE){
			cardSE.$wz.css('display','block');
			cardSE.$wz_1.animate({opacity:'1'},700).animate({opacity:'1'},2000).animate({opacity:'0'},10);
			
			special.$left_talk.append('<img class="wz_2" src="./images/wz2.jpg" alt="">');
			
			setTimeout(function(special){
				special.$left_talk.animate({opacity:'1'},500).animate({opacity:'1'},2700).animate({opacity:'0'},10);
			},750,special)
			
			setTimeout(function(cardSE){

				cardSE.$wz.css('display','none');
			
			},2800,cardSE)
			
			setTimeout(function(cardSE){

				cardSE.$left_talk_img.remove();
			
			},4000,cardSE)
			
		},
			/*飞机*/

		planet:function (cardSE,Ama){
			
			cardSE.$planet.css({display:'block'});
			Ama.$game.css({perspective:'900px',transformStyle:'preserve-3d'});
			setTimeout(function(cardSE){
				cardSE.$planet.css({transition:'all 3s ease'});
				cardSE.$planet.css({transform:'translateX(-800px) translateZ(1000px)'});

				
			},10,cardSE)
			setTimeout(function(cardSE){
				cardSE.$planet.css({transition:'none'});
				cardSE.$planet.css({transform:'translateX(500px) translateZ(-1000px)'});
				cardSE.$planet.css('display','none');

			},3500,cardSE)
		},
			
			/*炸弹*/
		bomb:function (cardSE){
		  	
		  	cardSE.$boom.css('display','block');

		  	cardSE.$boom_img.animate({top:'500px'},400);  //炸弹下落
		  	setTimeout(function(cardSE){   //火花冒出
		  		cardSE.$huohua.animate({width:'1000px',height:'1000px',opacity:'1'},100); 
		  	},350,cardSE)
		  	setTimeout(function(cardSE){

		  		cardSE.$boom_img.css({top:'0px'});
		  		cardSE.$huohua.css({width:'0px',height:'0px',opacity:'0'}); 
		  		cardSE.$boom.css('display','none');

		  	},1500,cardSE)
		  			
		},
			/*顺子*/
		straight:function (cardSE){
			
			cardSE.$sz.css('display','block');

			cardSE.$sz.animate({width:'3200px',height:'3200px',margin:'-1600px 0 0 -1600px'},1000);

			setTimeout(function(cardSE){

				cardSE.$sz.css('opacity','0');
				
			},1000,cardSE)
			setTimeout(function(cardSE){

				cardSE.$sz.css('display','none');
				cardSE.$sz.css({width:'0px',height:'0px',margin:'0px 0 0 0px'});
				
			},3000,cardSE)
			
		},
			/*连对*/
		lian:function (cardSE){
			cardSE.$liandui.css('display','block');
					
			cardSE.$lian.animate({bottom:"400px"},1000).animate({bottom:"1500px"},3000);
			cardSE.$z.animate({height:"300px"},1000).animate({height:"250px"},300).animate({height:"300px"},300).animate({height:"250px"},300).animate({height:"300px"},300).animate({height:"250px"},300).animate({height:"300px"},300);
			
			cardSE.$h.animate({height:"200px"},800,function(){
				cardSE.$h.css('display','none');
			});

			setTimeout(function(){

				cardSE.$liandui.css('display','none');

			},4000)
		}
	},

	//自动提示功能
	PromptPoke:function(obj,num){

		//触发提示功能的时候先把手牌全部降下来
		// this.ToDown(obj);

		var type = this.foldPoker.type;		//获取弃牌堆的牌型类型

		var tip = []; 	//创建临时存放可以出的牌的数组

		var arr = [];  //用来存放牌的花色和点数 例如：[[1,1],[1,2],[1,3]]

		var length = this.foldPoker.poker.length;	//弃牌堆里的牌型长度

		for(let i=0; i<obj.length; i++){

			arr.push(obj[i].split('-'));

		}

		switch(length){

			//桌面上没牌的时候
			case 0:
				for(let i=obj.length-1;i>=0;i--){

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

			//牌型长度为1时
			case 1:

				for(var i=obj.length-1;i>=0;i--){

					if(parseInt(obj[i]) > parseInt(this.foldPoker.poker[0])){

						tip.push(obj[i]);

						break;
					}
				}

			break;

			//牌型长度为2
			case 2:

				for(var i=obj.length-1;i>=1;i--){

					if(parseInt(obj[i]) == parseInt(obj[i-1]) && parseInt(obj[i]) > parseInt(this.foldPoker.poker[0])){

						tip.push(obj[i]);

						tip.push(obj[i-1]);

						break;

					}

				}	

			break;

			//牌型长度为3
			case 3:

				for(var i=obj.length-1;i>=2;i--){

					if(parseInt(obj[i]) == parseInt(obj[i-2]) && parseInt(obj[i]) > parseInt(this.foldPoker.poker[0])){

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

								if(parseInt(obj[i]) == parseInt(obj[i-3]) && parseInt(obj[i]) > parseInt(this.foldPoker.poker[0])){

									for(var j=0;j<4;j++){

										tip.push(obj[i-j]);

									}

									break;

								}

							}
						break;
						//牌型类型为三带一
						case 3.1:

							for(var i = obj.length-1;i >= 3;i--){

								if(parseInt(obj[i]) == parseInt(obj[i-2]) && parseInt(obj[i]) > parseInt(this.foldPoker.poker[1])){	//从手牌中找是否有三个连着相同的牌
									
									for(var j=0;j<3;j++){
										
										tip.push(obj[i-j]);					//如果有就添加到提示数组里
									
									}
									
									for(var k=obj.length-1;k>=0;k--){
										
										if(tip.indexOf(obj[k]) == -1){		//如果手牌中有其他单张的牌也加到提示数组中
											
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

							if(parseInt(obj[i])==parseInt(obj[i-2])&&parseInt(obj[i])>parseInt(this.foldPoker.poker[2])){	//从手牌中找是否有三个连着相同的牌
								
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

								parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(this.foldPoker.poker[0])){	//遍历找顺子，没有就GG

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

								parseInt(temp[i+4])-1==parseInt(temp[i+5])&&parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(this.foldPoker.poker[0])){	//遍历找顺子，没有就GG

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

							if(parseInt(temp[i])+1==parseInt(temp[i-3])&&parseInt(temp[i-2])+1==parseInt(temp[i-5])&&parseInt(temp[i-5])<13&&parseInt(temp[i])>this.foldPoker.max){
								
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

							if(arr[i][0]==arr[i+2][0] && only.indexOf(arr[i][0]) == -1){	//点数没在only数组出现过并成三出现的就添加

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

							if(parseInt(temp[i])+1==parseInt(temp[i-5])&&parseInt(temp[i-5])<13&&parseInt(temp[i])>this.foldPoker.max){

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

								parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(this.foldPoker.poker[0])){	//遍历找顺子，没有就GG

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

								parseInt(temp[i+6])-1==parseInt(temp[i+7])&&parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(this.foldPoker.poker[0])){	//遍历找顺子，没有就GG

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

								parseInt(temp[i-4])+1==parseInt(temp[i-7])&&parseInt(temp[i-7])<13&&parseInt(temp[i])>this.foldPoker.max){

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

							if(parseInt(temp[i])+1==parseInt(temp[i-5])&&parseInt(temp[i-5])<13&&parseInt(temp[i])>this.foldPoker.max){

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

								parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(this.foldPoker.poker[0])){	//遍历找顺子，没有就GG

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

							if(parseInt(temp[i])+1==parseInt(temp[i-5])&&parseInt(temp[i-3])+1==parseInt(temp[i-8])&&parseInt(temp[i-8])<13&&parseInt(temp[i])>this.foldPoker.max){
								
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

								parseInt(temp[i+8])-1==parseInt(temp[i+9])&&parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(this.foldPoker.poker[0])){	//遍历找顺子，没有就GG

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

							   parseInt(temp[i-7])<13&&parseInt(temp[i])>this.foldPoker.max){

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

							if(arr[i][0]==arr[i+2][0] && only.indexOf(arr[i][0])==-1){	//点数没在only数组出现过并成三出现的就添加

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

							parseInt(temp[i])<13&&parseInt(temp[i])>parseInt(this.foldPoker.poker[0])){	//遍历找顺子，没有就GG

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

							   parseInt(temp[i-8])+1==parseInt(temp[i-11])&&parseInt(temp[i-7])<13&&parseInt(temp[i])>this.foldPoker.max){

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

							   parseInt(temp[i-5])+1==parseInt(temp[i-11])&&parseInt(temp[i-8])<13&&parseInt(temp[i])>this.foldPoker.max){

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

						   parseInt(temp[i-7])<13&&parseInt(temp[i])>this.foldPoker.max){

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

				if(parseInt(obj[i])==parseInt(obj[i-3])&&parseInt(obj[i])>parseInt(this.foldPoker.poker[0])){

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

		this.CheckPoke(tip);			//添加比较值和类型到ready_obj里

		for(var i=0;i<tip.length;i++){

			this.ready_obj.poker[i] = tip[i];		//添加出牌数据到ready_obj里

		}

		if(num == 1){
		
			this.ToUp(obj);			//将提示出来的牌显示出来

		}


	},

	//将手牌全部降下来的功能
	ToDown:function(obj){

		// var that = this;	//防止this指向混乱
		
		var length = obj.length;	//获取当前手牌的数量

		for(let i=0; i<this.ready_obj.poker.length;i++){

			var num = obj.indexOf(this.ready_obj.poker[i]);	//获取升上来的牌在手牌中的位置（下标）

			var index = $('.midCard li').eq(num).attr('index');	//获取当前牌的自定义属性值

			$('.midCard li').eq(num).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(0px)'});  //将牌降下来

			$('.midCard li').eq(num).attr('kaiguan','0');  //开关值变为0，表示没有被选中

		}

		this.ready_obj.poker = [];	//手牌降下来相对应准备出牌的数组数据也要清空
	},

	//将准备出牌的数组里的牌全部升上来的方法
	ToUp:function(obj){

		// var that = this;

		var length = obj.length;

		for(let i=0; i<this.ready_obj.poker.length;i++){

			var num = obj.indexOf(this.ready_obj.poker[i]);	//获取准备要出的牌在手牌中的位置（下标）

			var index = $('.midCard li').eq(num).attr('index');	//获取当前牌的自定义属性值

			$('.midCard li').eq(num).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(-50px)'});  //将牌升上来

			$('.midCard li').eq(num).attr('kaiguan','1');  //开关值变为1，表示被选中

		}

	},

	//检查牌型是否符合规则的方法
	CheckPoke:function(obj){

		this.SortPoker(obj);	//对准备要出的牌的牌型进行排序

		//准备要出的牌的长度
		var length = obj.length;

		var arr = [];		//创建临时存储点数和花色的数组

		for(let i=0; i<length; i++){

			arr.push(obj[i].split('-'));

		}

		switch(length){

			//牌型长度为1
			case 1:	

				this.ready_obj.type = 1; 		//牌型类型为单张

				if(this.ready_obj.poker[0] == '14-1'){

					this.ready_obj.max = 15;	//单张牌为大王时，特殊处理

				}else{

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

				}

				return true;

			break;

			//牌型长度为2
			case 2:

				if(arr[0][0] == arr[1][0]){		//两张牌的点数相同

					if(arr[0][0] == 14){		//王炸的情况

						this.ready_obj.type = 110; 		//牌型类型为王炸

						this.ready_obj.max = 110;		//牌型的判断值，判断谁的牌大

						return true;

					}else{		

						this.ready_obj.type = 2; 			//牌型类型为对子

						this.ready_obj.max = arr[0][0];	//牌型的判断值，判断谁的牌大

						return true;

					}

				}else{

					this.ready_obj.type = 0; 		//无效牌型

					this.ready_obj.max = 0;

					return false;

				}

			break;

			//牌型长度为3
			case 3: 

				if(arr[0][0] == arr[2][0]){

					this.ready_obj.type = 3; 			//牌型类型为三张

					this.ready_obj.max = arr[0][0];	//牌型的判断值，判断谁的牌大

					return true;

				}else{

					this.ready_obj.type = 0; 			//无效类型

					this.ready_obj.max = 0;	

					return false;

				}
				
			break;

			//牌型长度为4
			case 4:

				if(arr[0][0] == arr[3][0]){

					this.ready_obj.type = 100;			//牌型类型为普通炸弹

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(arr[0][0]==arr[2][0]||arr[1][0]==arr[3][0]){

					this.ready_obj.type = 3.1; 			//牌型类型为三带一

					this.ready_obj.max = arr[1][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else{

					this.ready_obj.type = 0; 			//无效类型

					this.ready_obj.max = 0;

					return false;		
				}

			break;

			//牌型长度为5
			case 5:

				if(this.CheckShun(arr)){

					this.ready_obj.type = 6; 			//牌型类型为顺子

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(arr[0][0]==arr[2][0]&&arr[3][0]==arr[4][0]||arr[0][0]==arr[1][0]&&

					arr[2][0]==arr[4][0]){

					this.ready_obj.type = 3.2; 			//牌型类型为三带二

					this.ready_obj.max = arr[2][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else{

					this.ready_obj.type = 0; 			//无效类型

					this.ready_obj.max = 0;

					return false;	
				}

			break;

			//牌型长度为6
			case 6:

				if(this.CheckLian(arr)){

					this.ready_obj.type = 66; 			//牌型类型为连对

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.CheckShun(arr)){

					this.ready_obj.type = 6;				//牌型类型为顺子

					this.ready_obj.max  = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.CheckChunAir(arr)){

					this.ready_obj.type = 1122; 			//牌型类型为纯飞机

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(arr[0][0]==arr[3][0]||arr[1][0]==arr[4][0]||arr[2][0]==arr[5][0]){

					this.ready_obj.type = 4.2; 			//牌型类型为四带二

					this.ready_obj.max = arr[2][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else{

					this.ready_obj.type = 0; 			//无效牌型

					this.ready_obj.max = 0;	

					return false;
				}

			break;

			//牌型长度为7
			case 7:

				if(this.CheckShun(arr)){

					this.ready_obj.type = 6; 			//牌型类型为顺子

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else{

					this.ready_obj.type = 0; 			//无效牌型

					this.ready_obj.max = 0;	

					return false;

				}

			break;

			//牌型长度为8
			case 8:
				if(this.CheckShun(arr)){

					this.ready_obj.type = 6;				//牌型类型为顺子

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.CheckLian(arr)){
					
					this.ready_obj.type = 66;			//牌型类型为连对

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.ready_obj.max = this.CheckZhaAir(arr)){

					this.ready_obj.type = 1123;			//牌型类型为飞机带翅膀

					return true;

				}else if(arr[0][0]==arr[3][0]&&arr[4][0]==arr[5][0]||

					arr[2][0]==arr[5][0]&&arr[0][0]==arr[1][0]){

					this.ready_obj.type = 4.2; 			//牌型类型为四带二

					this.ready_obj.max = arr[2][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else{

					this.ready_obj.type = 0;				//无效牌型

					this.ready_obj.max = 0;

					return false;

				}

			break;

			//牌型长度为9
			case 9:

				if(this.CheckShun(arr)){

					this.ready_obj.type = 6;				//牌型类型为顺子

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.CheckChunAir(arr)){

					this.ready_obj.type = 1122;			//牌型类型为纯飞机

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else{

					this.ready_obj.type = 0;				//无效牌型

					this.ready_obj.max = 0;

					return false;

				}

			break;

			//牌型长度为10
			case 10:

				if(this.CheckShun(arr)){

					this.ready_obj.type = 6;				//牌型类型为顺子

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.CheckLian(arr)){

					this.ready_obj.type = 66;			//牌型类型为连对

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.ready_obj.max = this.CheckZhaAir(arr)){

					this.ready_obj.type = 1123;			//牌型类型为飞机带翅膀

					return true;					//牌型的判断值，判断谁的牌大

				}else{

					this.ready_obj.type = 0;				//无效牌型

					this.ready_obj.max = 0;

					return false;

				}

			break;

			//牌型长度为11
			case 11:
				if(this.CheckShun(arr)){

					this.ready_obj.type = 6;				//牌型类型为顺子

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else{

					this.ready_obj.type = 0;				//无效牌型

					this.ready_obj.max = 0;

					return false;

				}

			break;

			//牌型长度为12
			case 12:

				if(this.CheckShun(arr)){

					this.ready_obj.type = 6;				//牌型类型为顺子

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.CheckLian(arr)){

					this.ready_obj.type = 66;			//牌型类型为连对

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.CheckChunAir(arr)){

					this.ready_obj.type = 1122;			//牌型类型为纯飞机

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else{

					this.ready_obj.type = 0;				//无效牌型

					this.ready_obj.max = 0;

					return false;

				}

			break;

			//牌型长度为15
			case 15:

				if(this.checkChunAir(arr)){

					this.ready_obj.type = 1122;			//牌型类型为纯飞机

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.ready_obj.max = this.CheckZhaAir(arr)){

					this.ready_obj.type = 1123;			//牌型类型为飞机带翅膀

					return true;					//牌型的判断值，判断谁的牌大

				}else{

					this.ready_obj.type = 0;				//无效牌型

					this.ready_obj.max = 0;

					return false;

				}

			break;

			//牌型长度为16
			case 16:

				if(this.CheckLian(arr)){

					this.ready_obj.type = 66;			//牌型类型为连对

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.ready_obj.max = this.CheckZhaAir(arr)){

					this.ready_obj.type = 1123;			//牌型类型为飞机带翅膀

					return true;					//牌型的判断值，判断谁的牌大

				}else{

					this.ready_obj.type = 0;				//无效牌型

					this.ready_obj.max = 0;

					return false;

				}

			break;

			//牌型长度为18
			case 18:

				if(this.CheckChunAir(arr)){

					this.ready_obj.type = 1122;			//牌型类型为纯飞机

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.CheckLian(arr)){

					this.ready_obj.type = 66;			//牌型类型为连对

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else{

					this.ready_obj.type = 0;				//无效牌型

					this.ready_obj.max = 0;

					return false;

				}

			break;

			//牌型长度为20
			case 20:

				if(this.ready_obj.max = this.CheckZhaAir(arr)){

					this.ready_obj.type = 1123;			//牌型类型为飞机带翅膀

					return true;					//牌型的判断值，判断谁的牌大

				}else if(this.CheckLian(arr)){

					this.ready_obj.type = 66;			//牌型类型为连对

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;
					
				}else{

					this.ready_obj.type = 0;				//无效牌型

					this.ready_obj.max = 0;

					return false;

				}
				
			break;

		}

	},

	//对牌面数据进行排序的方法
	SortPoker:function(poker){

		poker = poker.sort(function(x,y){

			var x_arr = x.split('-');

			var y_arr = y.split('-');

			if(x_arr[0] != y_arr[0]){

				return y_arr[0] - x_arr[0];

			}else{

				return y_arr[1] - x_arr[1];

			}
		});

		return poker;

	},

	//牌面生成的方法
	MakePoker:function(poker,className){
		
		var poker_arr = poker.split('-');

		var x = poker_arr[0];		//点数

		var y = poker_arr[1];		//花色
		
		// 返回组装完成的牌面HTML代码
		return '<li class="back '+className+'" style="width: 125px; height: 175px ;background:url(./images/'+x+'-'+y+'.jpg) no-repeat;background-size:100%;" data-value='+poker+'></li>';

	},

	//检查牌型是否为顺子
	CheckShun:function(arr){

		for(var i=0; i<arr.length-1; i++){

			//数组里的数据不相连就不是顺子，返回false
			if(arr[i][0] - 1 != arr[i+1][0]){

				return false;

			}

		}

		return true;
	},

	//检查牌型是否为纯飞机的方法
	//555444333 
	CheckChunAir:function(arr){

		for(var i=0;i<arr.length-4; i+=3){

			//隔一不相等，隔四不差一，就返回false
			if(arr[i][0] != arr[i+2][0] || arr[i][0]+1 != arr[i+3][0]){

				return false;

			}

		}

		return true;
	},

	//检查牌型是否为连对
	//554433
	CheckLian:function(arr){

		for(var i=0; i<arr.length-3; i+=2){

			//隔二差一，相邻也差一，就是连对
			if(arr[i][0]-1!=arr[i+3][0] || arr[i+1][0]-1!=arr[i+2][0]){

				return false;

			}

		}

		return true;

	},

	//检查牌型是否为三带一的飞机的方法，因为飞机的判断值很难从外部获取，所以在函数返回出去
	CheckZhaAir:function(arr){

		var max = false;

		//判断牌型是否为炸弹鸡
		//555544443333
		for(var i=0;i<arr.length-7;i+=4){

			//隔六不差一就不是炸弹鸡，跳出循环
			if(arr[i][0]-1 != arr[i+7][0]){

				break;

			}else if(i+4 <arr.length-7){	//如果是炸弹鸡就给max赋最大的那个数

				max = arr[0][0];

			}
		}

		//判断牌型是否为三带一飞机
		//飞机带翅膀的长度有：2*(3+1) = 8, 3*(3+1) = 12,  4*(3+1) = 16,  5*(3+1) = 20,
		if(!max){

			switch(arr.length){

				//66655543
				//65444333
				//65554443
				case 8:

					if(arr[0][0]==arr[2][0]&&arr[2][0]-1==arr[3][0]&&arr[3][0]==arr[5][0]){

						max = arr[0][0];

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

	},

	//判断要出的牌是否打得过弃牌堆里的牌的方法
	VsPoke:function(){

		var rot = Number(this.ready_obj.type);   //准备出牌的牌型

		var bot = Number(this.foldPoker.type);	 //弃牌堆的牌型

		var rom = Number(this.ready_obj.max);	//准备出牌的牌堆中最大值

		var bom = Number(this.foldPoker.max);	//弃牌堆中最大值
		
		if(bot == 0){	//弃牌堆里没牌的时候

			return true;

		}else if(rot == 110){	//玩家要出的牌是王炸的时候
			
			return true;

		}else if(bot!=110&&bot!=100&&rot==100){		//弃牌堆里不是炸弹，玩家的牌是炸弹的时候

			return true;

		}else if(rot==bot&&rom>bom&&this.ready_obj.poker.length==this.foldPoker.poker.length){

			return true;		//出牌类型相同，长度一致，并且玩家出牌的比较值要大于弃牌堆里的比较值

		}else{

			return false;

		}
	},

	// 定义游戏重开的功能		后面添加的东西有需要重置就在这里进行补充
	Replay:function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob){
		
		// this.gameInfo.gamesNumber += 1;	//游戏总局数加一
		this.play_game += 1;
		// this.gameInfo.multiple = 1;		//游戏倍数归一
		this.bei = 1;

		clearInterval(this.int);

		clearInterval(this.set);
		
		//所有玩家的角色和手牌数据恢复到原始状态
		for(var i=1;i<=3;i++){

			$('.bt'+i).css('display','none');

			$('.bt'+i).off('click');

			$('.rob'+i).css('display','none');

			$('.rob_'+i+'_1').off('click');

			$('.rob_'+i+'_2').off('click');

			$('.play_'+i+' li').remove();

			this.all_player[i-1].role = 0;

			this.all_player[i-1].poker = [];

			$('.portrait'+i+'>.head').attr('src',"./images/farmer.jpg");

			$('.warn'+i).css('display','none')
		}
		
		//页面中相对应的手牌也要恢复到初始状态
		poker.$play2.off('mouseup','li');

		poker.$play2.off('mousemove','li');

		poker.$play2.off('mousedown','li');

		poker.$play2.off('click','li');

		poker.$allPoker.off('click');

		$('.allPoker li').remove();

		poker.$time.css('display','none');

		$('.showCard li').remove();

		special.$win.css('left','-100%');

		special.$win.css('display','none');

		special.$lose.css('display','none');

		another.$hand.css('display','block');

		special.$mid_clock.css('display','block');

		special.$left_clock.css('display','block');

		special.$right_clock.css('display','block');

		$('.mid_land').css('display','block');

		$('.left_land').css('display','block');

		$('.right_land').css('display','block');

		special.$close.off('mouseover');

		special.$close.off('mouseout');

		special.$close.off('click');

		special.$end.off('click');

		another.$left_people.off('click');

		another.$right_people.off('click');

		another.$left_container.off('mouseout');

		another.$right_container.off('mouseout');

		special.$music.attr({src:'./music/back/back_01.mp3',loop:false});

		$('.showGrade .text3').html('本局倍数：'+this.bei+'倍');

	this.bei = 1   //游戏倍数

	this.police_num = 0;

	this.victery_01 = 0;

	this.victery_02 = 0;

	this.victery_03 = 0;

	this.cont = 0;	//记录点了几次不出

	this.rob_arr = [-1,-1,-1];

	this.rob1 = 0;

	this.rob2 = 0;

	this.rob3 = 0;  //记录同一个玩家点了抢地主按钮的次数

	this.all_poker_data =[];

	//定义出牌堆的对象
	this.ready_obj = {poker:[],type:0,max:0};

	//定义弃牌堆的对象
	this.foldPoker = {poker:[],type:0,max:0};

	this.InitEvents(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);		//绑定事件

	// this.DefineVariable();

	this.InitPoker(poker);

	// $('.mid_clock').append('<input class="time2		time" type="button" value="">');
	}	
}

