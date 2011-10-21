var tela = document.getElementById("canvas");
var ctx = tela.getContext("2d");

ctx.fillRect(0, 0, 400, 300);


var y = 0;
var x = 0;
var agora = Date.now();
var depois = agora;
var intervalo = 0;
var moveBaixo = false;
var moveCima = false;
var moveDireita = false;
var moveEsquerda = false;


setInterval(passo,50);

addEventListener("keydown", botaoPressionado);
addEventListener("keyup", botaoSolto);



function botaoPressionado(e){
   console.log("botao pressionado: " + e.keyCode);
   if (e.keyCode === 40) {
      moveBaixo = true;
   } else if (e.keyCode === 38) {
      moveCima = true;
   } 
   
   if (e.keyCode === 39) {
      moveDireita = true;
   } else if (e.keyCode === 37) {
      moveEsquerda = true;
   }
}

function botaoSolto(e){
   console.log("botao solto: " + e.keyCode);
   if (e.keyCode === 40) {
      moveBaixo = false;
   } else if (e.keyCode === 38) {
      moveCima = false;
   } 

   if (e.keyCode == 39) {
      moveDireita = false;
   } else if (e.keyCode == 37) {
      moveEsquerda = false;
   }
}

function passo(){
   agora = Date.now();
   intervalo = agora - depois;
   //console.log(intervalo);
   if(moveBaixo){
      y=y+60*intervalo/1000;
   }
   
   if (moveCima) {
      y=y-60*intervalo/1000; 
   }
   
   if (moveDireita) {
      x=x+60*intervalo/1000;         
   }

   if (moveEsquerda) {
     x=x-60*intervalo/1000;      
   }
   if(y>=250){
      y=250;
}
   ctx.fillStyle="rgb(0,0,0)";
   ctx.fillRect(0, 0, 400, 300);
   

   ctx.fillStyle="rgb(255,0,0)";
   ctx.strokeStyle="rgb(255,255,255)"; 
   ctx.lineWidth=2;

   ctx.beginPath( );
   ctx.rect(10+x,10+y,20,20);
   ctx.closePath( );
   ctx.fill();
   ctx.stroke();
   depois = agora;
}


