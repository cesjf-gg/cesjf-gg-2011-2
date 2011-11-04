var tela = document.getElementById("canvas");
var ctx = tela.getContext("2d");

ctx.fillRect(0, 0, 400, 300);

var jogador = {};
var porta = {
  
   x: 370, a:35, y:270, l:25  
};


jogador.y = 10;
jogador.x = 10;
jogador.a = 20;
jogador.l = 20;
var agora = Date.now();
var depois = agora;
var intervalo = 0;
var moveBaixo = false;
var moveCima = false;
var moveDireita = false;
var moveEsquerda = false;
var nivel = 1;



setInterval(passo,50);

addEventListener("keydown", botaoPressionado);
addEventListener("keyup", botaoSolto);



function botaoPressionado(e){
   //console.log("botao pressionado: " + e.keyCode);
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
   //console.log("botao solto: " + e.keyCode);
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
      jogador.y=jogador.y+60*intervalo/1000;
   }
   
   if (moveCima) {
      jogador.y=jogador.y-60*intervalo/1000; 
   }
   
   if (moveDireita) {
      jogador.x=jogador.x+60*intervalo/1000;         
   }

   if (moveEsquerda) {
     jogador.x=jogador.x-60*intervalo/1000;      
   }
   if(jogador.y>=280){
      jogador.y=280;

   }

   if(jogador.y<=0){
      jogador.y=0;
   }
   if (jogador.x<=0) {
     jogador.x =0;
   }
   if (jogador.x>=380) {
     jogador.x=380;
   } 
   

   ctx.fillStyle="rgb(0,0,0)";
   ctx.fillRect(0, 0, 400, 300);
   

   ctx.fillStyle="rgb(255,0,0)";
   ctx.strokeStyle="rgb(255,255,255)"; 
   ctx.lineWidth=2;

   //personagel do jogo
   ctx.beginPath( );
   ctx.rect(jogador.x-jogador.l/2,jogador.y-jogador.a/2,jogador.l,jogador.a);
   ctx.closePath( );
   ctx.fill();
   ctx.stroke();

//Desenha porta
   ctx.fillStyle="rgb(155,100,50)";
   ctx.strokeStyle="rgb(205,150,100)";
   ctx.beginPath( );
   ctx.rect(porta.x-porta.l/2,porta.y-porta.a/2,porta.l,porta.a);
   ctx.closePath( );
   ctx.fill();
   ctx.stroke();
   
   console.log(colisao(jogador, porta));

   if(colisao(jogador, porta)){

      nivel+=1;
      jogador.x = jogador.l/2;
      jogador.y = jogador.a/2;


   }
   ctx.fillStyle="rgb(255,255,0)";
   ctx.strokeStyle="rgb(255,255,255)";
   ctx.lineWidth = 1.0;
   ctx.fillText("Nível: "+nivel,350,15);
   ctx.strokeText("Nível: "+nivel,350,15);

   depois = agora;
}


function colisao(sprite1, sprite2){
   
   if(sprite1.y+sprite1.a/2 < sprite2.y-sprite2.a/2)
   {
      return false;
   }
   if(sprite1.y-sprite1.a/2 > sprite2.y+sprite2.a/2) {
      return false;
   }
   if(sprite1.x+sprite1.l/2 < sprite2.x-sprite2.l/2) {
      return false;
   }
   if(sprite1.x-sprite1.l/2 > sprite2.x+sprite2.l/2) {
      return false;
   }
   return true;
}
