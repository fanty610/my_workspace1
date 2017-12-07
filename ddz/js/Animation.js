function Animation(Ama,special,poker,Music,Rob){
	this.Animation.spotMove(Ama);
	this.Animation.stripMove(Ama,special,Music);

}
Animation.prototype = {
	construction : Animation,
	
	Animation:{
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



	},

	
	//洗牌特效
	shuffleCard:function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,That){
			
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

								that.sendPoker(0,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,That);

							},1000)

						}

					},12000)
				},(54-j)*200)
					
			})(i)
		}
						
	},
	
	//发牌
 	sendPoker:function (number,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,That){
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
		
		That.all_player[0].poker.push(That.all_poker_data.pop());   //将总数据的最后一个放到左边玩家的手牌数组中
		
		setTimeout(function(poker){              //延时等待发完一张牌后将原来的牌删掉再对应的位置生成一张
			
			poker.$leftCard.append('<li  class="poker  cardLeft" style="left:'+(L+662)+'px;top:'+(T+31)+'px;background:url(./images/background.jpg);background-size:110%;transform:rotate('+sub+'deg)"></li>');
			poker.$cardLeft = $('.cardLeft');
			poker.$allPokerLi.eq(poker.$allPokerLi.length-((number*3)+1)).remove();
		
		},110,poker);
		
		
		 // 发牌给中间玩家
		setTimeout(function(poker,That){
				
			var sub = Math.round(Math.random()*150)-90;   //再重新给中间玩家随机产生一个新的角度，以防与上一张牌的角度一张
			var Left = Math.round(Math.random()*40)-20;
			poker.$allPokerLi.eq(poker.$allPokerLi.length-((number*3)+2)).animate({left:Left+'px',top:(T+350)+'px'},100);   //将牌随机移动到某区域中
			
			setTimeout(function(poker,That){
				poker.$allPokerLi.eq(poker.$allPokerLi.length-1).css({transform:'rotate('+sub+'deg)'});   //将牌随机移动到某区域中
			},100,poker)
		
			That.all_player[1].poker.push(That.all_poker_data.pop());
			
			setTimeout(function(poker,That){            //延时等待发完一张牌后将原来的牌删掉再对应的位置生成一张
		
				poker.$allPokerLi.eq(poker.$allPokerLi.length-((number*3)+2)).remove();
				
				poker.$midCard.append('<li class="poker  cardMid" style=" left:'+(Left)+'px;top:'+(T-162)+'px;background:url(./images/background.jpg);background-size:110%;transform:rotate('+sub+'deg)" ></li>')
				
				poker.$cardMid = $('.cardMid');
			},110,poker,That) 
		},350,poker,That)
		

		// 发牌给右边玩家
		setTimeout(function(poker,That){	
			var sub = Math.round(Math.random()*150)-90;
			
			poker.$allPokerLi.eq(poker.$allPokerLi.length-((number*3)+3)).animate({left:(-L-50)+'px',top:T+'px'},100); //将牌随机移动到某区域中
			
			setTimeout(function(poker,That){
				poker.$allPokerLi.eq(poker.$allPokerLi.length-1).css({transform:'rotate('+sub+'deg)'});  //随机转动某一角度
			},100,poker)
			
			That.all_player[2].poker.push(That.all_poker_data.pop());  //将总数据的最后一个放到右边玩家的手牌数组中
			
			setTimeout(function(poker,That){   //延时等待
				poker.$allPokerLi.eq(poker.$allPokerLi.length-((number*3)+3)).remove();
				poker.$rightCard.append('<li  class="poker   cardRight" style="left:'+(-L-711)+'px;top:'+(T+30)+'px;background:url(./images/background.jpg);background-size:110%;transform:rotate('+sub+'deg)"></li>');			
			
				poker.$cardRight = $('.cardRight');
			},110,poker,That)
		},600,poker,That)
			
			//延时自调用发牌的效果函数
			setTimeout(function(){
				number +=1 ;        //自增发牌的次数
				
				if(number<17){
					that.sendPoker(number,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,That);  //自调用发牌方法
				
				}else{
					
					setTimeout(function(){
						
						that.straightenPoker(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,That);  //等待发完牌后调用将牌归正的函数方法
					},300)
				    
				}	
			},750)

	},
	straightenPoker:function (player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,That){
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
			That.all_player[0].poker = That.SortPoker(That.all_player[0].poker);

			That.all_player[2].poker = That.SortPoker(That.all_player[2].poker);
		 	
			//生成左边玩家已经排好序的手牌
			for(var i=0;i<17;i++){

				var pokerHtml = That.MakePoker(That.all_player[0].poker[i]);	
				
				poker.$leftCard.append(pokerHtml);

			}
			poker.$cardLeft = $('.leftCard .back');

			for(var j = 0;j<17;j++){
				poker.$cardLeft.eq(j).animate({top:40*j+'px'},1300);
			}


			//生成中间玩家已经排好序的手牌  
			setTimeout(function(poker,That){

				that.mid(poker,That);
					
			},1200,poker,That)


			//生成右边玩家已经排好序的手牌
			for(var k=0;k<17;k++){

			var pokerHtml = That.MakePoker(That.all_player[2].poker[k]);

				poker.$rightCard.append(pokerHtml);


			}
			poker.$cardRight = $('.rightCard .back');

			for(var z=0; z<17; z++){
				poker.$cardRight.eq(z).animate({top:40*z+'px'},1300);
			}

		
		},800,poker);



		setTimeout(function(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,That){

			poker.$allPokerLi.eq(1).animate({left:'0px'},100);

			poker.$allPokerLi.eq(2).animate({left:'200px'},100);

			poker.$allPokerLi.eq(0).animate({left:'-200px'},100);
			

			//开始抢地主
			That.robSui(player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob);

		},1250,player_obj,difen,Ama,poker,another,special,cardSE,Music,Rob,That);

	},

	mid:function(poker,That){

		if(poker.$cardMid.remove()){  //将中间玩家的手牌删掉

			That.all_player[1].poker = That.SortPoker(That.all_player[1].poker); //对中间玩家的手牌进行排序

			var length = That.all_player[1].poker.length;

			for(var j=0;j<length;j++){	   //循环生成17张牌的牌面
				
				var pokerHtml = That.MakePoker(That.all_player[1].poker[j],'midCard');

				poker.$midCard.append(pokerHtml);	

			}
		}
		poker.$cardMid = $('.midCard .back');

		poker.$cardMid.attr('class','move');  //给中间玩家的牌列添加一个类名				
			
		
		setTimeout(this.moveCard(poker,0,That),10);    //延时下一张牌的移动


	},
	//定义移动牌的函数方法

	moveCard:function(poker,card,That) {
		//将牌的角度改变并移动
		//
		var length = poker.$cardMid.length
		poker.$cardMid.eq(card).css({transform:'rotate('+((card-(length/2))*4)+'deg)',transformOrigin:'43% 440%'});

		poker.$cardMid.eq(card).attr('index',card);

		poker.$cardMid.eq(card).attr('kaiguan','0');
		//判断是否把牌移动完
		if(card<That.all_player[1].poker.length){
				
			card++;

			setTimeout(this.moveCard(poker,card,That),10);
		}

	},

	// 展示地主牌
/*	showCard: function(poker){
		
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
	*/
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
	
	/*specialEffects:{
		//-------------------积分榜动画--------------
			
		scoreboard:function(special,That){

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

				if(this.play_game == 0){

					this.Replay();

				}

			})
		},


	},*/
}