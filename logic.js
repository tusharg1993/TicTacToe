var CUR_PLAYER=0;
var socket = io();

/*
1. seperate html, css, js
2. follow naming conventions - functions, vars, const...
3. have proper callbacks whereever reqd
4. functions/methods as minimal as possbile (6- 10 lines)
5. refer js mozilla docs



*/

window.onload = addEvents;//
function addEvents () {
	for (var i = 0; i < 9; i++) {
		document.getElementById(i.toString()).addEventListener("click", playValue);
	};
	document.getElementById("new-game").addEventListener("click",newGame);
}

function newGame()
{
	socket.emit("newgame");
}

function playValue()
{
	if(this.innerHTML!=""){
		return;
	}

	socket.emit("idclick",this.id);

	this.innerHTML = CUR_PLAYER==0? "O": "X";

	if(isGameEnd()){
		alert("Player "+(CUR_PLAYER)+" wins");
		newGame();
	}

	if(isFull()&&!isGameEnd()){
		alert("Game Draw");
		newGame();
	}

	CUR_PLAYER = (CUR_PLAYER+1)%2;
}

function isGameEnd()
{
	for (var i = 0; i < 2; i++) {
		if(
			document.getElementById(i.toString()).innerHTML == document.getElementById((i+3).toString()).innerHTML &&
			document.getElementById((i+6).toString()).innerHTML == document.getElementById((i+3).toString()).innerHTML &&
			document.getElementById(i.toString()).innerHTML != ""
			)
		{
			return true;
		}
	};

	for (var i = 0; i < 9; i+=3) {
		if(
			document.getElementById(i.toString()).innerHTML == document.getElementById((i+1).toString()).innerHTML &&
			document.getElementById((i+1).toString()).innerHTML == document.getElementById((i+2).toString()).innerHTML &&
			document.getElementById(i.toString()).innerHTML != ""
			)
		{
			return true;
		}
	};

	if(
			document.getElementById("0").innerHTML == document.getElementById("4").innerHTML &&
			document.getElementById("4").innerHTML == document.getElementById("8").innerHTML &&
			document.getElementById("0").innerHTML != ""
		)
	{
		return true;
	}

	if(
			document.getElementById("2").innerHTML == document.getElementById("4").innerHTML &&
			document.getElementById("4").innerHTML == document.getElementById("6").innerHTML &&
			document.getElementById("2").innerHTML != ""
		)
	{
		return true;
	}
	return false;
}

function reset()
{
	for (var i = 0; i < 9; i++) 
	{
		document.getElementById(i.toString()).innerHTML  = "";
	};
}

function isFull()
{
	for (var i = 0; i < 9; i++) 
	{
		if(document.getElementById(i.toString()).innerHTML  == "")
		{
			return false;
		}
	};
	return true;
}

socket.on("newgame",function(){
	reset();
	CUR_PLAYER=0;
})

socket.on("idclick",function(id){

	var elem = document.getElementById(id.toString());
	if(elem.innerHTML!="")
	{
		return;
	}

	socket.emit("idclick",elem.id);

	elem.innerHTML = CUR_PLAYER==0? "O": "X";

	if(isGameEnd())
	{
		alert("Player "+(CUR_PLAYER)+" wins");
		newGame();
	}

	if(isFull()&&!isGameEnd())
	{
		alert("Game Draw");
		newGame();
	}

	CUR_PLAYER = (CUR_PLAYER+1)%2;
})

