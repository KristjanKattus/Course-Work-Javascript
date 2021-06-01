(()=>{"use strict";const t=function(){function t(t,e){this.bird=[],this.width=Math.floor(.05*t),this.height=Math.floor(.05*e),this.westSide=Math.floor(.25*t),this.eastSide=this.westSide+this.width+1,this.northSide=Math.floor(.35*e),this.southSide=this.northSide+this.height,this.createBird()}return t.prototype.createBird=function(){this.bird=[[0,0,4,4,0,0],[0,4,4,4,4,0],[4,4,4,4,4,4],[4,4,4,4,4,4],[4,6,5,4,4,4],[0,6,6,4,4,0]]},t.prototype.getBirdCell=function(t,e){return this.bird[t][e]},t.prototype.moveVertically=function(t){void 0===t&&(t=!1),t?(this.northSide-=10,this.southSide-=10):(this.northSide++,this.southSide++)},t.prototype.getLocation=function(){return[this.westSide,this.eastSide,this.northSide,this.southSide]},t.prototype.getBirdCellOrange=function(){return 4},t.prototype.getBirdCellBlack=function(){return 5},t.prototype.getBirdCellWhite=function(){return 6},t}();var e=function(t,e){void 0===t&&(t=""),void 0===e&&(e=0),this.name=t,this.score=0};const i=function(){function i(t,e){void 0===t&&(t=100),void 0===e&&(e=128),this.scoreBoard=[],this.board=[],this.gameScore=0,this.columnHolder=[],this.rowCount=t,this.colCount=e,this.scoreBoard=[],this.initializeBoard()}return i.prototype.initializeBoard=function(){this.bird=new t(this.rowCount,this.colCount),this.board=[],this.columnHolder=[];for(var e=0;e<this.colCount;e++)this.board.push(this.createGameRow(this.rowCount/2,20));this.board.push()},i.prototype.resetGame=function(){this.board=[],this.columnHolder=[],this.gameScore=0,this.initializeBoard()},i.prototype.createGameRow=function(t,e,i){void 0===t&&(t=0),void 0===e&&(e=0),void 0===i&&(i=!1);for(var o=[],n=0;n<this.rowCount;n++)if(i)switch(!0){case n<t:o.push(-1);break;case n>=t+e:o.push(1);break;default:o.push(0)}else o.push(0);return o},i.prototype.getRandomPillarPos=function(){var t=Math.random()*(this.rowCount-8-20)+4;return Math.floor(t)},i.prototype.createPillar=function(){var t=this.getRandomPillarPos(),e=this.createGameRow(t,20,!0);return this.columnHolder=e,e},i.prototype.removeFirstAddLast=function(t,e){if(void 0===t&&(t=!1),void 0===e&&(e=!1),this.checkCollision()||this.birdFall(),this.board.shift(),t){var i=[];e?(i=this.createPillar(),this.gameScore++):i=this.columnHolder,this.board.push(i)}else this.board.push(this.createGameRow())},i.prototype.checkCollision=function(){for(var t=this.getBirdLocation(),e=t[2];e<t[3];e++)if(this.board[t[0]][e]==this.gameCellUp()||this.board[t[1]][e]==this.gameCellDown())return this.gameScore-=2,!0;for(var i=t[0];i<t[1];i++)if(this.board[i][t[2]]==this.gameCellUp()||this.board[i][t[3]]==this.gameCellDown())return this.gameScore-=2,!0;return(t[2]<=0||t[3]>=this.rowCount)&&(this.gameScore-=2,!0)},i.prototype.insertScore=function(t){this.scoreBoard.push(new e(t,this.gameScore))},i.prototype.birdJump=function(){this.bird.moveVertically(!0)},i.prototype.birdFall=function(){this.bird.moveVertically()},i.prototype.getGameBoard=function(){return this.board},i.prototype.getScore=function(){return this.gameScore},i.prototype.getScoreBoard=function(){return this.scoreBoard},i.prototype.getBirdLocation=function(){return this.bird.getLocation()},i.prototype.getBirdCell=function(t,e){return this.bird.getBirdCell(t,e)},i.prototype.birdCellOrange=function(){return this.bird.getBirdCellOrange()},i.prototype.birdCellBlack=function(){return this.bird.getBirdCellBlack()},i.prototype.birdCellWhite=function(){return this.bird.getBirdCellWhite()},i.prototype.gameCellPath=function(){return 0},i.prototype.gameCellUp=function(){return-1},i.prototype.gameCellDown=function(){return 1},i}(),o=function(){function t(t,e){this.timer=null,this.viewContainer=e,this.model=t,this.isRunning=!1,this.pillarIndex=0}return t.prototype.run=function(){this.model.resetGame(),this.isRunning=!0,this.viewContainer.innerHTML="",this.viewContainer.append(this.getBoardHtml(this.model)),this.birdLocation=this.model.getBirdLocation(),this.placeBird(),this.animate()},t.prototype.stop=function(){this.isRunning=!1,clearTimeout(this.timer)},t.prototype.resizeUI=function(){this.isRunning&&(this.viewContainer.innerHTML="",this.viewContainer.append(this.getBoardHtml(this.model)))},t.prototype.getColWidth=function(t){return(window.innerWidth-17)/t},t.prototype.getRowHeight=function(t){return(window.innerHeight-document.getElementById("control").clientHeight-3)/t},t.prototype.placeBird=function(){this.birdLocation=this.model.getBirdLocation();for(var t=0,e=this.birdLocation[0];e<this.birdLocation[1];e++){for(var i=this.viewContainer.firstElementChild.childNodes[e].childNodes,o=0,n=this.birdLocation[2];n<this.birdLocation[3];n++)i[n].style.backgroundColor=this.getCellColour(this.model.getBirdCell(t,o)),o++;t++}},t.prototype.removeBird=function(){for(var t=this.viewContainer.firstElementChild.childNodes,e=this.birdLocation[0]-1;e<this.birdLocation[1]-1;e++)for(var i=this.birdLocation[2];i<this.birdLocation[3];i++)t[e].childNodes[i].style.backgroundColor="#00BFFF"},t.prototype.birdJump=function(){this.model.birdJump()},t.prototype.animate=function(){var t=this;this.timer=setTimeout((function(){t.moveBoard(),t.displayScore(),t.isRunning&&t.animate()}),50)},t.prototype.moveBoard=function(){this.pillarIndex<60?(this.pillarIndex<6?this.pillarIndex<1?this.model.removeFirstAddLast(!0,!0):this.model.removeFirstAddLast(!0,!1):this.model.removeFirstAddLast(),this.pillarIndex++):(this.pillarIndex=0,this.model.removeFirstAddLast()),this.removeFirstColumn();var t=document.getElementById("gameboard");if(this.getColumnHtml(this.model.board[this.model.board.length-1],t),this.model.checkCollision()){this.stop();var e=prompt("Insert your name!");null!=e?this.model.insertScore(e):this.model.insertScore(),this.model.initializeBoard(),this.viewContainer.append(this.getBoardHtml(this.model))}else this.removeBird(),this.placeBird()},t.prototype.removeFirstColumn=function(){this.viewContainer.firstChild.firstChild.remove()},t.prototype.getColumnHtml=function(t,e){var i=this,o=this.getColWidth(this.model.colCount),n=this.getRowHeight(this.model.rowCount),r=document.createElement("div");r.style.minWidth=o+"px",r.style.minHeight=n+"px",r.style.display="inline-block",t.forEach((function(t){var e=document.createElement("div");e.style.backgroundColor=i.getCellColour(t),e.style.minHeight=n+"px",e.style.maxHeight=n+"px",r.append(e)})),e.append(r)},t.prototype.getCellColour=function(t){switch(t){case this.model.gameCellUp():case this.model.gameCellDown():return"#228B22";case this.model.birdCellOrange():return"#FFA500";case this.model.birdCellBlack():return"#000000";case this.model.birdCellWhite():return"#FFFFFF";default:return"#00BFFF"}},t.prototype.getBoardHtml=function(t){var e=this,i=document.createElement("div");return i.id="gameboard",t.getGameBoard().forEach((function(t){e.getColumnHtml(t,i)})),i},t.prototype.displayScore=function(){document.getElementById("scoreElem").textContent=this.model.getScore()},t}(),n=function(){function t(t,e){this.viewContainer=e,this.model=t,this.isRunning=!1}return t.prototype.run=function(){this.isRunning=!0,this.viewContainer.innerHTML="stats",this.makeScoreTable()},t.prototype.makeScoreTable=function(){var t=document.createElement("table"),e=document.createElement("th"),i=document.createElement("th");e.textContent="score",i.textContent="name",e.style.width="100px",i.style.width="100px",t.append(e),t.append(i),this.model.getScoreBoard().forEach((function(e){var i=document.createElement("tr"),o=document.createElement("td"),n=document.createElement("td");o.textContent=e.score,n.textContent=e.name,i.append(o),i.append(n),t.append(i)})),t.style.margin="auto",t.style.fontSize="200%",this.viewContainer.append(t)},t.prototype.stop=function(){this.isRunning=!1},t.prototype.resizeUi=function(){this.isRunning},t}();var r,s=new i,d=((r=document.createElement("div")).id="view-container",r.style.textAlign="center",r.style.alignContent="center",r.innerText="CONTAINER",r),a=new o(s,d),l=new n(s,d),h=function(){var t=document.createElement("div");return t.id="main",t}();document.body.append(h);var c=function(t){var e=document.createElement("div");e.id="control",e.style.textAlign="center";var i=document.createElement("button");i.id="statistics",i.innerText="Statistics";var o=document.createElement("button");o.id="game",o.innerText="Game";var n=document.createElement("span");n.textContent="Your score:";var r=document.createElement("span");return r.id="scoreElem",r.style.fontWeight="bold",e.append(i),e.append(o),e.append(n),e.append(r),i.addEventListener("click",t),o.addEventListener("click",t),e}((function(t){switch(console.log(t),t.target.id){case"game":a.stop(),l.stop(),a.run();break;case"statistics":a.stop(),l.run()}}));h.append(c),h.append(d),window.addEventListener("resize",(function(){a.resizeUI(),l.resizeUi()})),window.addEventListener("keypress",(function(){a.birdJump()})),window.addEventListener("touchstart",(function(){a.birdJump()})),l.run()})();