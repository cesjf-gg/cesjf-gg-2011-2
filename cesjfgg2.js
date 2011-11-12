var tela = document.getElementById("canvas");
var ctx = tela.getContext("2d");

ctx.fillRect(0, 0, 400, 300);

var jogador = {
   x: 370,  y:170, a:25, l:25, vx: 60, vy: 60  
};
var porta = {
   x: 370, a:35, y:270, l:25  
};
var inimigo = {
   x: 370, a:25, y:170, l:25, vx: 60, vy: 60  
};



jogador.y = 10;
jogador.x = 10;
jogador.a = 48;
jogador.l = 35;
jogador.quadro = 0;
jogador.direcao = 0;
var agora = Date.now();
var depois = agora;
var intervalo = 0;
var moveBaixo = false;
var moveCima = false;
var moveDireita = false;
var moveEsquerda = false;
var nivel = 1;

var personagemImagem = new Image();
personagemImagem.src = "personagem.png";

setInterval(passo,50);

addEventListener("keydown", botaoPressionado);
addEventListener("keyup", botaoSolto);



function botaoPressionado(e){
   //console.log("botao pressionado: " + e.keyCode);
   if (e.keyCode === 40) {
      moveBaixo = true;
      jogador.direcao = 2;
   } else if (e.keyCode === 38) {
      moveCima = true;
      jogador.direcao = 0;
   } 
   
   if (e.keyCode === 39) {
      moveDireita = true;
      jogador.direcao = 1;
   } else if (e.keyCode === 37) {
      moveEsquerda = true;
      jogador.direcao = 3;
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
   jogador.quadro+=4*intervalo/1000;
   if(jogador.quadro>4){
      jogador.quadro = 0;
   }
   if (jogador.x < inimigo.x) {
      inimigo.x=inimigo.x-10*nivel*intervalo/1000;   
   }

   if (jogador.y < inimigo.y) {
      inimigo.y=inimigo.y-10*nivel*intervalo/1000;   
   }
   
   if (jogador.x > inimigo.x) {
      inimigo.x=inimigo.x+10*nivel*intervalo/1000;   
   }

   if (jogador.y > inimigo.y) {
      inimigo.y=inimigo.y+10*nivel*intervalo/1000;   
   }

   ctx.fillStyle="rgb(0,0,0)";
   ctx.fillRect(0, 0, 400, 300);
   

 
   //inimigo
   ctx.fillStyle="rgb(0,0,255)";
   ctx.strokeStyle="rgb(255,255,255)"; 
   ctx.lineWidth=2;
   ctx.beginPath( );
   ctx.rect(inimigo.x-inimigo.l/2,inimigo.y-inimigo.a/2,inimigo.l,inimigo.a);
   ctx.closePath( );
   ctx.fill();
   ctx.stroke();

   //personagem do jogo
   ctx.fillStyle="rgb(255,0,0)";
   ctx.strokeStyle="rgb(255,255,255)"; 
   ctx.lineWidth=2;
   ctx.beginPath( );
   ctx.rect(jogador.x-jogador.l/2,jogador.y-jogador.a/2,jogador.l,jogador.a);
   ctx.closePath( );
   //ctx.fill();
   //ctx.stroke();
   ctx.drawImage(personagemImagem, 35*(Math.floor(jogador.quadro)==3?1:Math.floor(jogador.quadro)), 52*(jogador.direcao), 35, 52,
      jogador.x-jogador.l/2,jogador.y-jogador.a/2,jogador.l,jogador.a);
   console.log(jogador.quadro);

//Desenha porta
   ctx.fillStyle="rgb(155,100,50)";
   ctx.strokeStyle="rgb(205,150,100)";
   ctx.beginPath( );
   ctx.rect(porta.x-porta.l/2,porta.y-porta.a/2,porta.l,porta.a);
   ctx.closePath( );
   ctx.fill();
   ctx.stroke();
   


   //console.log(colisao(jogador, porta));

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
