var canvas = document.getElementById("space");
var myContext = canvas.getContext("2d");
var cells = [];
var cellWidth = 8;
var cellXLen = 64;//一行的细胞数
var cellYLen = 64;//
var generation = 0;
var running = 0;
var timerInterval = 80;//ms，刷新速率

//绘制单个细胞
function drawCell(x, y, cellState){
    var pos_x = x * cellWidth;
    var pos_y = y * cellWidth;
    if(cellState == 1){
        myContext.fillStyle = "Gold";
        myContext.fillRect(pos_x, pos_y, cellWidth,cellWidth);
        myContext.strokeStyle = "DarkGoldenRod";
        
        myContext.strokeRect(pos_x+1, pos_y+1, cellWidth-2, cellWidth-2);

    }else{
    	myContext.clearRect(pos_x, pos_y, cellWidth,cellWidth);
    }
}

//运用生命游戏规则，返回1则细胞存活，返回0则细胞死亡
function applyLifeGameRules(x,y){
	var neighboursState = []
	var neighboursLiveCount = 0;
	var currentCellState = cells[[x,y]];
	var nextState = 0; 
    //从左上角到右下角依次判断一个细胞其周围细胞的状态
    neighboursState[0] = cells[[(x-1+cellXLen)%cellXLen, (y-1+cellYLen)%cellYLen]];//保证二维平面无限循环
    neighboursState[1] = cells[[(x+cellXLen)%cellXLen, (y-1+cellYLen)%cellYLen]];
    neighboursState[2] = cells[[(x+1+cellXLen)%cellXLen, (y-1+cellYLen)%cellYLen]];
    neighboursState[3] = cells[[(x-1+cellXLen)%cellXLen, (y+cellYLen)%cellYLen]];
    
    neighboursState[4] = cells[[(x+1+cellXLen)%cellXLen, (y+cellYLen)%cellYLen]];
    neighboursState[5] = cells[[(x-1+cellXLen)%cellXLen, (y+1+cellYLen)%cellYLen]];
    neighboursState[6] = cells[[(x+cellXLen)%cellXLen, (y+1+cellYLen)%cellYLen]];
    neighboursState[7] = cells[[(x+1+cellXLen)%cellXLen, (y+1+cellYLen)%cellYLen]];
    var i;
    for(i = 0; i < 8; i ++){
        if(neighboursState[i] == 1){
        	neighboursLiveCount ++;
        }
    }
    if(currentCellState == 1){//细胞目前存活
        if(neighboursLiveCount == 3 || neighboursLiveCount == 2){
        	return 1;
        }else{
        	return 0;
        }
    }else{//细胞死亡
        if(neighboursLiveCount == 3){
        	return 1;
        }
        else{
        	return 0;
        }
    }
}

//随机产生细胞
function randomLifeGame(){
	var i,j;
	for (i = 0; i < cellXLen; i++) {
		for(j = 0; j < cellYLen; j ++){
			state = (Math.random()>0.7) ? 1 : 0; 
			cells[[i, j]] = state;
			drawCell(i, j, state);
		}
	}
	generation = 0;
	spanGen.innerHTML = generation;

}

//开始游戏
function startLifeGame(){
	function runningLifeGame(){
		var nextGeneration = [];
		var i, j;
        for(i = 0; i < cellXLen; i ++){
        	for(j = 0; j < cellYLen; j ++){
        		nextGeneration[[i, j]] = applyLifeGameRules(i, j);
        	}
        }
        for(i = 0; i < cellXLen; i ++){
        	for(j = 0; j < cellYLen; j ++){
        		cells[[i, j]] = nextGeneration[[i, j]];
        	}
        }
        for(i = 0; i < cellXLen; i ++){
        	for(j = 0; j < cellYLen; j ++){
        		drawCell(i, j, cells[[i, j]]);
        	}
        }
        generation ++;
        spanGen.innerHTML = generation;
        if(running == 1){
        	setTimeout(runningLifeGame, timerInterval);
        }
	}
    btnStart.disabled = true;
    btnRefresh.disabled = true;
    btnReset.disabled = true;
    btnPause.disabled = false;
	running = 1;
	randomLifeGame();
	runningLifeGame();
}

//暂停游戏
function pauseLifeGame(){
    running = 0;
    btnStart.disabled = false;
    btnRefresh.disabled = false;
    btnReset.disabled = false;
    btnPause.disabled = true;
}

//重置游戏、重置刷新率
function resetLifeGame(){
	var size = parseInt(document.getElementById('lifeSize').value);
    if (isNaN(size) || size <= 4 || size > 10) {
		alert('请输入正确数值');
		return;
	}
	if(size == 10){
		cellWidth = 1;
		cellXLen = 512;
		cellYLen = 512;
	}
	if(size == 9){
		cellWidth = 2;
		cellXLen = 256;
		cellYLen = 256;
	}
	if(size == 8){
		cellWidth = 4;
		cellXLen = 128;
		cellYLen = 128;
	}
	if(size == 7){
		cellWidth = 8;
		cellXLen = 64;
		cellYLen = 64;
	}
	if(size == 6){
		cellWidth = 16;
		cellXLen = 32;
		cellYLen = 32;
	}
	if(size == 5){
		cellWidth = 32;
		cellXLen = 16;
		cellYLen = 16;
	}
	timerInterval = parseInt(document.getElementById('Refresh').value);
	if (isNaN(timerInterval)) {
		alert('请输入正确数值');
		return;
	}
	randomLifeGame();
}

//加载游戏
function loadLifeGame(){
    canvas.onmousedown = function(e){
    	if(running == 1) return;
    }
    randomLifeGame();
}

window.addEventListener("load", loadLifeGame, true);








