
//�����
function Ball(x, y, dx, dy, r) 
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
	this.onPadd = false;
}

function Balls()           //������
{
	this.objs = null;
}

Balls.prototype.init = function() //�����ʼ��
{
	this.objs = new Array();
}

Ball.prototype.draw = function() //С�����
{
	ctx.beginPath();
    var grd = ctx.createRadialGradient(this.x,this.y,this.r/6, this.x,this.y,this.r);  //�������״�������
    grd.addColorStop(0,"yellow");   
    grd.addColorStop(0.5,"blue");   
    grd.addColorStop(1,"rgba(255,0,0,0)");  
    ctx.fillStyle = grd;  
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}


//�������
function Padd(x, w, h, img)
{
    this.x = x;
    this.w = w;
    this.h = h;
    this.img = img;
	this.toolList = null;
	this.keepingFlag = 0;
	this.breakThrough = 0;
    this.splitBall = 0;
}

Padd.prototype.removeSplit = function()  //������һ�η��Ѻ�ȡ������״̬
{
	var max = -1;
	var maxTime = -1;
	for(var i =0; i < this.toolList.length; i++)
	{
		if(this.toolList[i].type == SPLIT && this.toolList[i].lastTime > maxTime)
		{
			maxTime = this.toolList[i].lastTime;
			max = i;
		}
	}
	this.toolList.splice(max,1);
}

Padd.prototype.init = function()//�����ʼ��
{
	this.toolList = new Array();
}

Padd.prototype.draw = function()//�������
{
	ctx.drawImage(this.img, this.x, ctx.canvas.height - this.h,this.w,this.h);
}

