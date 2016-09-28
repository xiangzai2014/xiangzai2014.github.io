
describe('Variable', function(){
	var cellWidth = 8;
	var cells = [];
	it('cellWidth has been defined', function(){
		assert.isDefined(cellWidth);
	});
	
	it('calls is array', function(){
		assert.isArray(cells);
	});
	//判断不是字符串
	it('should not be a string', function(){
		expect(cellWidth).to.not.be.a('string');
	})

	
});

describe('drawCell', function(){
	it('should be a function', function(){
    	assert.isFunction(drawCell); //是否是函数
	});
	it('should have three arguments', function(){
    	assert.equal(drawCell.length, 3);
  	});
  	it('function throws a reference error', function(){
    	assert.throws(drawCell);
    });
    //函数会报出异常
    it('expect throw error', function(){
		expect(drawCell).to.throw(Error);
	});
});

describe('applyLifeGameRules', function(){
	it('should be a function', function(){
    	assert.isFunction(applyLifeGameRules);
	});
	it('should have two arguments', function(){
    	assert.equal(applyLifeGameRules.length, 2);
    });
    //是否会处理异常
    it('function throws a reference error', function(){
    	assert.throws(applyLifeGameRules);
    });
    it('expect throw error', function(){
		expect(applyLifeGameRules).to.throw(Error);
	});
	//判断返回值是否为0
	it('return num should be 0', function(){
		var i,j;
		var cellXLen = 64;
		var cellYLen = 64;
		var cellWidth = 8;
		var cells = [];
		for(i = 0; i < cellXLen; i ++){
			for(j = 0; j < cellYLen; j ++){
				cells[[i,j]] = 1;
			}
		}
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
		assert.strictEqual(applyLifeGameRules(1,1), 0);
	});
});

describe('randomLifeGame', function(){
	it('should be a function', function(){
    	assert.isFunction(randomLifeGame);
	});
	it('function throws a reference error', function(){
    	assert.throws(randomLifeGame);
    });
    it('expect throw error', function(){
		expect(randomLifeGame).to.throw(Error);
	});
});

describe('startLifeGame', function(){
	it('should be a function', function(){
    	assert.isFunction(startLifeGame);
	});
	it('function throws a reference error', function(){
    	assert.throws(startLifeGame);
    });
    it('expect throw error', function(){
		expect(startLifeGame).to.throw(Error);
	});
});

describe('pauseLifeGame', function(){
	it('should be a function', function(){
    	assert.isFunction(pauseLifeGame);
	});
	it('function throws a reference error', function(){
    	assert.throws(pauseLifeGame);
    });
    it('expect throw error', function(){
		expect(pauseLifeGame).to.throw(Error);
	});
});

describe('resetLifeGame', function(){
	it('should be a function', function(){
    	assert.isFunction(resetLifeGame);
	});
	it('function throws a reference error', function(){
    	assert.throws(resetLifeGame);
    });
    it('expect throw error', function(){
		expect(resetLifeGame).to.throw(Error);
	});
});

describe('loadLifeGame', function(){
	it('should be a function', function(){
    	assert.isFunction(loadLifeGame);
	});
	it('function throws a reference error', function(){
    	assert.throws(loadLifeGame);
    });
    it('expect throw error', function(){
		expect(loadLifeGame).to.throw(Error);
	});
});







