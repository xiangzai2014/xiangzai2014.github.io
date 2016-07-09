/*20160708*/

var weChatMessageNum = 3;//屏幕上显示的信息条数
var socketurl = "https://wall.cgcgbcbc.com";
var geturl = "https://wall.cgcgbcbc.com/api/messages?num=" + weChatMessageNum;
var array = [];
var time = null;
var flag = false;

Vue.transition('animation', {
	beforeLeave: function(el){
		$('#message-contents').addClass('move');
	},

	afterLeave: function(el){
		$('#message-contents').removeClass('move');
	},
});

var weChatMessageAdmin = new Vue({
	el: '.page-content',
    data:{
      weChatMessages: [], 
      admin: [],
      adminMessage: []
    },
    methods:{
    	newMessage: function(weChatMessage){
    		weChatMessageAdmin.weChatMessages.push(weChatMessage);//进入数组
    		if(weChatMessageAdmin.weChatMessages.length > weChatMessageNum){
    			weChatMessageAdmin.weChatMessages.shift();//获取数组第一项

    		}
    	}
    }
});

function HandleMessage(weChatMessage){
	if(weChatMessage.isAdmin){
		weChatMessage.headimgurl = "image/guanliyuan.jpg";
	}

    weChatMessage.content = wechatFace.faceToHTML(weChatMessage.content);
    weChatMessage.content = twemoji.parse(weChatMessage.content);
	/*输出信息，方便测试*/
	console.log(weChatMessage);
	flag = false;
	if(weChatMessage.content.length > 10){
         flag = true;
	}

	if (weChatMessage.isAdmin) {
		function popAdmin(){
			while(weChatMessageAdmin.admin.pop()){};/*移除最后一个元素并返回该元素值*/
		}
		if(time !== null){
			clearTimeout(time);//取消由setTimeout()方法设置的timeout。
		}
		time = setTimeout(function(){//在指定的毫秒数后调用函数或计算表达式。
            popAdmin();
            time = null;
		},  11*1000);
		popAdmin();
		setTimeout(function(){
            weChatMessageAdmin.admin.push(weChatMessage);
		}, 800);
	}
	else{
		array.push(weChatMessage);
	}
}

function getMessage(callback){
	fetch(geturl).then(function(data){
			return data.json();
		}).then(function(data){
			data.reverse().forEach(function(animation){
				callback(animation);
			});
		});
}

//事件监听
var socket = io.connect(socketurl);

socket.on('disconnect', function(){
    location.reload();
});

socket.on('new message', function(message){
	HandleMessage(message);
});

socket.on('admin', function(message){
    message.isAdmin = true;
    HandleMessage(message);
});

var Me = {
    "nickname": "admin",
    "content": "我是管理员"
}

//获取信息
getMessage(function(Me){
	HandleMessage(Me);
});

//不停地调用函数，直到clearInterval()被调用或窗口被关闭,由setInterval()返回的ID值可用作clearInterval()方法的参数。
var timer = setInterval(function(){
    if (array.length > 0) {
    	weChatMessageAdmin.newMessage(array.shift());
    }
    if (array.length > 150) {
    	array = array.slice(-20); //以数组的形式返回数组的一部分，注意不包括end对应的元素，如果省略end将复制start之后的所有元素,如果是负数，那么它规定从数组尾部开始算起的位置
    }
}, 400);
