
//���߶���

function Tools() //��������
{
	this.objs = null ;
}

Tools.prototype.init = function() //�������ݳ�ʼ��
{
	this.objs = new Array();
}


function Tool()  //����
{
	this.r = 0;
	this.c = 0;
	this.width = 0;
	this.height = 0;
	this.startx = 0;
	this.starty = 0;
	this.type = 0;
	this.lastTime = 0;
	this.moveable= true;
	this.src = null;
}

Tool.prototype.loadTool = function(type, r, c)  //���߳�ʼ��
{
	switch(type)
	{
	    case KEEP:
	    this.width = 20;
	    this.height = 20;
	    this.src = "images/bigQQexpression/1.gif";
	    break;
		
	    case BREAKTHROUGH:
	    this.width = 20;
	    this.height = 20;
	    this.src = "images/bigQQexpression/2.gif";
	    break;
		
	    case SPLIT:
	    this.width = 20;
	    this.height = 20;
	    this.src = "images/bigQQexpression/0.gif";
	    break;
		
	    case LONGER:
	    this.width = 20;
	    this.height = 20;
	    this.src = "images/bigQQexpression/3.gif";
	    break;
   }
   this.r = r;
   this.c = c;
   this.type = type;	
   this.startx = c * (oBricks.w + oBricks.p) + ((oBricks.w + oBricks.p) - this.width) / 2;
   this.starty = r * (oBricks.h + oBricks.p) + ((oBricks.h + oBricks.p) - this.height) / 2;
}

Tool.prototype.updatePos = function()  //���µ���λ��
{
	if(this.moveable)
	{
	  this.starty += 5;
	}
}


Tool.prototype.updateLastTime = function()  //���µ��߳���ʱ��
{
	var onPaddFlag = false;
	if(this.type == KEEP||this.type == LONGER)
	{
	    for(var i =0; i < oBalls.objs.length; i++)
	    {
	       var oBall = oBalls.objs[i];
	       if(oBall.onPadd)
	       {
	          onPaddFlag = true;
		      break;
	       }
	    }
	}
	if(!onPaddFlag)
	{
		this.lastTime++;
	}
}


Tool.prototype.apply = function()   //���߲���Ч��
{
	switch(this.type)
	{
	case KEEP:
	oPadd.keepingFlag ++;
	break;
	case BREAKTHROUGH:
	oPadd.breakThrough++;
	break;
	case SPLIT:
	oPadd.splitBall++;
	break;
	case LONGER:
	if(oPadd.w < canvas.width)
	{
	    oPadd.x = oPadd.x + oPadd.w/2 - oPadd.w;
	    oPadd.w *= 2;
	}
	break;
	}
}

Tool.prototype.remove = function()  //�����Ƴ�Ч��
{
	switch(this.type)
	{
	case KEEP:
	oPadd.keepingFlag --;
		break;
   case BREAKTHROUGH:
	oPadd.breakThrough --;
	break;
	case SPLIT:
	oPadd.splitBall--;
	break;
	case LONGER:
	if(oPadd.w / 2 >= 120)
	{
	oPadd.x = oPadd.x + oPadd.w / 2 -oPadd.w/4;
	oPadd.w /= 2;
	}
	else
	{
	oPadd.w = 120;	
	}
	break;
	}
}

Tool.prototype.draw = function()   //���߻���
{

		var img=new Image()
        img.src=this.src;
        ctx.drawImage(img,this.startx,this.starty,this.width,this.height);
}