/*
	定义一个最大的斗地主类
	play_obj{
		play1:play1,
		play2:play2,
		play3:play3,
		integral:integral
	}
	$parent ==> $('.play_2')   $child ==> $('.play_2 li')
*/
function FightAgainstLandlords(player_obj,difen,$parent,$child){

	this.SetInfo();

	this.DefineVariable();	//定义变量的方法

	this.InitEvents($parent,$child);		//绑定事件

	// this.Game();		//游戏主体

}

FightAgainstLandlords.prototype = {

	constructor:FightAgainstLandlords,	//将构造函数指向自己

	//初始化游戏信息
	SetInfo:function(){

		//初始化玩家信息
		// name:昵称 integral:积分 role:角色(0代表农民,1代表地主) poker:手牌 victory:胜场
		this.all_player = [
			
			{name:player_obj.play1,integral:player.integral,role:0,poker:[],victory:0},
	
			{name:player_obj.play2,integral:player.integral,role:0,poker:[],victory:0},
	
			{name:player.play3,integral:player.integral,role:0,poker:[],victory:0}
	
		];
		
		//初始化游戏基本信息
		this.gameInfo = {
	
			gamesNumber:0,		//游戏总局数
	
			difen:difen,			//底分
	
			multiple:1 			//倍数
	
		}
	},

	//定义变量的方法
	DefineVariable:function(){

		//定义出牌堆的对象
		this.ready_obj = {poker:[],type:0,max:0};

		//定义弃牌堆的对象
		this.foldPoker = {poker:[],type:0,max:0};

		//记录连续选择时开始点击时的牌的index值
		this.start_index = null;
		
		//记录连续选择时结束点击时的牌的index值
		this.end_index = null;

	},

	//绑定事件的方法		$parent ==>>  $('.play_2'),
	//					 $child ==>>  $('.play_2 li')
	InitEvents:function($parent,$child){

		var that = this;	//用变量保存this对象,防止变量污染

		//连续选择功能所需要的绑定事件
		// 1\ 鼠标按下事件
		$parent.on('mousedown',$child,function(){

			that.MouseDown($child,that);

		})

		$parent.on('mouseup',$child,function(){
			
			that.MouseUp($parent,$child,that);

		})
	},

	////////////////////连续选择需要用到的函数(以下)/////////////////////

	//循环遍历将连续选到的牌改变当前状态		$child ==> $('.play_2 li')
	ForLoop:function(start_index,end_index,$child){
			
		for(var i = end_index; i <= start_index; i++){

			var length = this.all_play[1].poker.length;   //定义一个变量来获取玩家手牌的长度
	
			var index = $child.eq(i).attr('index');  //获取index值去改变角度

			if($child.eq(i).attr('kaiguan') == '0'){   //开关值等于0则表示牌没有被选中

				$child.eq(i).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(-50px)'});  //将牌升起
				
				$child.eq(i).attr('kaiguan','1');   //开关值改为1，表示被选中

				this.ready_obj.poker.push($child.eq(i).attr('data-value'));    //data-value值存入数组中

			}else{

				$child.eq(i).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(0px)'})  //将牌降下来

				$child.eq(i).attr('kaiguan','0');  //开关值变为0，表示没有被选中

				var num = this.ready_obj.poker.indexOf($child.eq(i).attr('data-value'));   //定义一个变量来获取数组中要删的值的下标
				
				this.ready_obj.poker.splice(num,1);  //删除数组的没有选中的那张牌的数据

			}

		}

	},

	//鼠标按下
	Mouseup:function($parent,$child,that){

		that.start_index = parseInt($(this).attr('index'));

		$parent.on('mousemove',$child,function(){
			
			that.MouseMove();

		})

	},

	//鼠标移动
	MouseMove:function(){
		
		if($(this).css('boxShadow') == '0px 0px 10px yellow'){	//黄变不黄

			$(this).css('boxShadow','');

		}else{													//不黄变黄

			$(this).css('boxShadow','0px 0px 10px yellow');

		}
	},

	//鼠标松开
	MouseDown:function($child,that){

		that.end_index = parseInt($(this).attr('index'));	//获取index属性值

		if(that.start_index > that.end_index){		//如果从右往左滑

			that.ForLoop(start_index,end_index,$child);	//调用循环方法

		}else if(that.start_index < that.end_index){	//如果从左往右滑

			that.ForLoop(end_index,start_index,$child);	//调用循环方法

		}

	},
	////////////////////连续选择需要用到的函数(以上)/////////////////////

	/* //游戏主体部分
	Game:function(){

	},

	//定义游戏音效的方法
	Sound:function(){

	},

	//定义游戏背景音乐的方法
	Music:function(){

	},

	//定义游戏动画的方法
	Animation:function(){

	},

	//初始化牌堆的方法
	InitPoker:function(){

	}, */

	//自动提示功能
	PromptPoke:function(obj,num){

		//触发提示功能的时候先把手牌全部降下来
		this.ToDown(obj);

		var type = this.foldPoker.type;		//获取弃牌堆的牌型类型

		var tip = []; 	//创建临时存放可以出的牌的数组

		var arr = [];  //用来存放牌的花色和点数 例如：[[1,1],[1,2],[1,3]]

		var length = this.foldPoker.poker.length;	//弃牌堆里的牌型长度

		for(let i=0; i<obj,length; i++){

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

			$('.mindCard li').eq(num).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(0px)'});  //将牌降下来

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

			$('.mindCard li').eq(num).css({transform:' rotate('+(index-(length/2))*4+'deg) translateY(-50px)'});  //将牌升上来

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

				}else if(this.checkShun(arr)){

					this.ready_obj.type = 6;				//牌型类型为顺子

					this.ready_obj.max  = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.checkChunAir(arr)){

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

				if(this.checkShun(arr)){

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
				if(this.checkShun(arr)){

					this.ready_obj.type = 6;				//牌型类型为顺子

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.checkLian(arr)){
					
					this.ready_obj.type = 66;			//牌型类型为连对

					this.this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(ready_obj.max = this.checkZhaAir(arr)){

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

				if(this.checkShun(arr)){

					this.ready_obj.type = 6;				//牌型类型为顺子

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.checkChunAir(arr)){

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

				if(this.checkShun(arr)){

					this.ready_obj.type = 6;				//牌型类型为顺子

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.checkLian(arr)){

					this.ready_obj.type = 66;			//牌型类型为连对

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.ready_obj.max = this.checkZhaAir(arr)){

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
				if(this.checkShun(arr)){

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

				if(this.checkShun(arr)){

					this.ready_obj.type = 6;				//牌型类型为顺子

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.checkLian(arr)){

					this.ready_obj.type = 66;			//牌型类型为连对

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.checkChunAir(arr)){

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

				}else if(this.ready_obj.max = this.checkZhaAir(arr)){

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

				if(this.checkLian(arr)){

					this.ready_obj.type = 66;			//牌型类型为连对

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.ready_obj.max = this.checkZhaAir(arr)){

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

				if(this.checkChunAir(arr)){

					this.ready_obj.type = 1122;			//牌型类型为纯飞机

					this.ready_obj.max = arr[0][0];		//牌型的判断值，判断谁的牌大

					return true;

				}else if(this.checkLian(arr)){

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

				if(this.ready_obj.max = this.checkZhaAir(arr)){

					this.ready_obj.type = 1123;			//牌型类型为飞机带翅膀

					return true;					//牌型的判断值，判断谁的牌大

				}else if(this.checkLian(arr)){

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
	MakePoker:function(poker){

		var poker_arr = poker.split('-');

		var x = poker_arr[0];		//点数

		var y = poker_arr[1];		//花色
		
		// 返回组装完成的牌面HTML代码
		return '<li class="back" style="width: 125px; height: 175px ;background:url(./images/'+x+'-'+y+'.jpg) no-repeat;background-size:100%;" data-value='+poker+'></li>';

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

		var rot = Number(this.ready_obj.type);

		var bot = Number(this.foldPoker.type);

		var rom = Number(this.ready_obj.max);

		var bom = Number(this.foldPoker.max);
		
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
	Replay:function(){

		this.gameInfo.gamesNumber += 1;	//游戏总局数加一

		this.gameInfo.multiple = 1;		//游戏倍数归一

		//所有玩家的角色和手牌数据恢复到原始状态
		for(var i=0;i<3;i++){

			this.all_player[i].role = 0;

			this.all_player[i].poker = [];

		}

		//页面中相对应的手牌也要恢复到初始状态
		
	}	
}