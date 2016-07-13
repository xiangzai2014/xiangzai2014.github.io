
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) //����Բ�Ǿ���
{
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y, x+w, y+h, r);
    this.arcTo(x+w, y+h, x, y+h, r);
    this.arcTo(x, y+h, x, y, r);
    this.arcTo(x, y, x+w, y, r);
    this.closePath();
    return this;
}

function clear()  //�������
{ 
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawBackground() //���Ʊ���
{
    var bgImg = new Image();
	switch(stages)
	{
		case 1:
              bgImg.src = "../images/haiyang.jpg";
			  break;
	    case 2:
		      bgImg.src = "images/senlin.jpg";
			  break;
	    case 3:
		     bgImg.src = "images/xingkong.jpg";
			  break;
	}
    ctx.drawImage(bgImg, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawBricks()//����ש��
{
	for (i=0; i < oBricks.r; i++)
	{
		 for (j=0; j < oBricks.c; j++)
		 {
			 oBricks.objs[i][j].draw();
		 }
	}
}

function drawPadd()//���Ƶ���
{
	oPadd.draw();
}

function drawBalls()//����С��
{
	for(var i =0; i < oBalls.objs.length; i++)
	{
		oBalls.objs[i].draw();
	}
}

function drawTools()//���Ƶ���
{
	for(var i =0; i < oTools.objs.length; i++)
	{
		oTools.objs[i].draw();
	}
}

function drawPlayState()//������Ϸ��Ϣ
{
	ctx.font = '16px Verdana';
    ctx.fillStyle = '#fff';
    iMin = Math.floor(iElapsed / 60);
    iSec = iElapsed % 60;
    if (iMin < 10) iMin = "0" + iMin;
    if (iSec < 10) iSec = "0" + iSec;
    ctx.fillText('Time: ' + iMin + ':' + iSec, 600, 520);
    ctx.fillText('Points: ' + iPoints, 600, 550);

    if (sLastTime != null && sLastPoints != null) 
	{
        ctx.fillText('Last Time: ' + sLastTime, 600, 460);
        ctx.fillText('Last Points: ' + sLastPoints, 600, 490);
    }
}


function drawScene()//�ܵĻ��ƹ���
{
	clear(); 
    drawBackground();
    console.log(oBalls.objs[0].x);
    console.log(oBalls.objs[0].y);
	drawBricks();
	drawBalls();
    drawPadd();
    drawTools();
    drawPlayState();
}