var tela = document.getElementById("canvas");
var ctx = tela.getContext("2d");

ctx.fillRect(0, 0, 400, 300);

var sombra = {
    x: 10, y: 10,
	l: 35, a: 52
}

var jogador = {
   x: 10,   y: 10,
   l: 35,   a: 52,
   v: 100,
   quadro: 0,
   direcao: 0,
   movendo: false
};

var coluna;
var porta = {
   x: 370, a:35, y:270, l:25  
};

var inimigo = {
   x: 370, y: 170,
   a: 52, l: 35,
   v: 15,  
   quadro: 0,
   direcao: 0,
   movendo: false
};

var parede = {
   x: 200, a:35, y:100, l:25  
};




var agora = Date.now();
var depois = agora;
var intervalo = 0;
var nivel = 1;
var vidas = 5;
var recorde = 1;

var personagemImagem = new Image();
personagemImagem.src = "personagem.png";
var inimigoImagem = new Image();
inimigoImagem.src = "inimigo.png";

setInterval(passo,50);

addEventListener("keydown", botaoPressionado);
addEventListener("keyup", botaoSolto);



function botaoPressionado(e){
   if (e.keyCode === 40) {
      jogador.movendo = true;
      jogador.direcao = 2;
   } else if (e.keyCode === 38) {
      jogador.movendo = true;
      jogador.direcao = 0;
   } 
   
   if (e.keyCode === 39) {
      jogador.movendo = true;
      jogador.direcao = 1;
   } else if (e.keyCode === 37) {
      jogador.movendo = true;
      jogador.direcao = 3;
   }
}

function botaoSolto(e){
   if (e.keyCode === 40 && jogador.direcao === 2) {
      jogador.movendo = false;
   } else if (e.keyCode === 38 && jogador.direcao === 0) {
      jogador.movendo = false;
   } 

   if (e.keyCode == 39 && jogador.direcao === 1) {
      jogador.movendo = false;
   } else if (e.keyCode == 37 && jogador.direcao === 3) {
      jogador.movendo = false;
   }
}

function passo(){
   agora = Date.now();
   intervalo = agora - depois;

   //Movimento do Jogador
   if(jogador.movendo){
      sombra.x = jogador.x;
	  sombra.y = jogador.y;
      switch(jogador.direcao){
         case 0:
			sombra.y=jogador.y-jogador.v*intervalo/1000; 
			if (!colisao(sombra, parede)) {
            jogador.y=jogador.y-jogador.v*intervalo/1000; 
			}
         break;
         case 1:
		    sombra.x=jogador.x+jogador.v*intervalo/1000;
			if (!colisao(sombra, parede)) {
            jogador.x=jogador.x+jogador.v*intervalo/1000;
			}
         
         break;
         case 2:
			sombra.y=jogador.y+jogador.v*intervalo/1000;
			if (!colisao(sombra, parede)) {
            jogador.y=jogador.y+jogador.v*intervalo/1000;
			}
         break;
         case 3:
		   sombra.x=jogador.x-jogador.v*intervalo/1000; 
		   if (!colisao(sombra, parede)) {
           jogador.x=jogador.x-jogador.v*intervalo/1000; 
	     	}		   
         break;
      }
   }
    
    //li
   if(jogador.y+jogador.a/2>=300){
      jogador.y=300-jogador.a/2;
   }

   if(jogador.y-jogador.a/2<=0){
      jogador.y=jogador.a/2;
   }
   if (jogador.x-jogador.l/2<=0) {
     jogador.x = jogador.l/2;
   }
   if (jogador.x+jogador.l/2>=400) {
     jogador.x=400-jogador.l/2;
   } 
   
   jogador.quadro+=4*intervalo/1000;
   inimigo.quadro+=(4)*intervalo/1000;
   if(jogador.quadro>4){
      jogador.quadro = 0;
   }
   if(inimigo.quadro>4){
      inimigo.quadro = 0;
      inimigo.s = Math.floor(10*Math.random()%2);
   }

   //Movimento do Inimigo
   dx = jogador.x - inimigo.x;
   dy = jogador.y - inimigo.y;
   
   sombra.x = inimigo.x;
   sombra.y = inimigo.y;
   inimigo.movendo = false;
   if (dx>0 && inimigo.s) {
      inimigo.movendo = true;
      inimigo.direcao = 1;
	  
	  sombra.x=inimigo.x+Math.min(inimigo.v*nivel*intervalo/1000,dx);
	  if (!colisao(sombra, parede)) {
      inimigo.x=inimigo.x+Math.min(inimigo.v*nivel*intervalo/1000,dx);  
	  }	  
	  
   } else if (dx<0 && inimigo.s) {
      inimigo.movendo = true;
      inimigo.direcao = 3;
	  
	  sombra.x=inimigo.x+Math.max(-inimigo.v*nivel*intervalo/1000,dx);
	  if (!colisao(sombra, parede)) {
      inimigo.x=inimigo.x+Math.max(-inimigo.v*nivel*intervalo/1000,dx);
	  }
   } else if (dy < 0) {
      inimigo.movendo = true;
      inimigo.direcao = 0;
	   sombra.y=inimigo.y+Math.max(-inimigo.v*nivel*intervalo/1000,dy); 
	   if (!colisao(sombra, parede)) {
       inimigo.y=inimigo.y+Math.max(-inimigo.v*nivel*intervalo/1000,dy); 
	   }	  
   }else if (dy>0) {
      inimigo.movendo = true;
      inimigo.direcao = 2;
	  
	  sombra.y=inimigo.y+Math.min(inimigo.v*nivel*intervalo/1000, dy); 
	  if (!colisao(sombra, parede)) {
      inimigo.y=inimigo.y+Math.min(inimigo.v*nivel*intervalo/1000, dy);   
	  }
   }
   

   ctx.fillStyle="rgb(0,0,0)";
   ctx.fillRect(0, 0, 400, 300);
   

 
   //inimigo
   ctx.fillStyle="rgb(0,0,255)";
   ctx.strokeStyle="rgb(255,0,0)"; 
   ctx.lineWidth=1;
   ctx.beginPath( );
   ctx.rect(inimigo.x-inimigo.l/2,inimigo.y-inimigo.a/2,inimigo.l,inimigo.a);
   ctx.closePath( );
   //ctx.fill();
   ctx.stroke();

   //personagem do jogo
   ctx.fillStyle="rgb(255,0,0)";
   ctx.strokeStyle="rgb(255,255,255)"; 
   ctx.lineWidth=1;
   ctx.beginPath( );
   ctx.rect(jogador.x-jogador.l/2,jogador.y-jogador.a/2,jogador.l,jogador.a);
   ctx.closePath( );
   //ctx.fill();
   ctx.stroke();

   if(jogador.movendo){
         coluna = 35*(Math.floor(jogador.quadro)==3?1:Math.floor(jogador.quadro));
   }else{
         coluna = 35;
   }
   ctx.drawImage(personagemImagem, coluna, 52*(jogador.direcao), 35, 52,
      jogador.x-jogador.l/2,jogador.y-jogador.a/2,jogador.l,jogador.a);

   if(inimigo.movendo){
         coluna = 35*(Math.floor(inimigo.quadro)==3?1:Math.floor(inimigo.quadro));
   }else{
         coluna = 35;
   }
   ctx.drawImage(inimigoImagem, coluna, 52*(inimigo.direcao), 35, 52,
      inimigo.x-inimigo.l/2,inimigo.y-inimigo.a/2,inimigo.l,inimigo.a);

//Desenha porta
   ctx.fillStyle="rgb(155,100,50)";
   ctx.strokeStyle="rgb(205,150,100)";
   ctx.beginPath( );
   ctx.rect(porta.x-porta.l/2,porta.y-porta.a/2,porta.l,porta.a);
   ctx.closePath( );
   ctx.fill();
   ctx.stroke();
   
//Desenha parede
   ctx.fillStyle="rgb(200,200,200)";
   ctx.strokeStyle="rgb(100,100,100)";
   ctx.beginPath( );
   ctx.rect(parede.x-parede.l/2,parede.y-parede.a/2,parede.l,parede.a);
   ctx.closePath( );
   ctx.fill();
   ctx.stroke();   
   
   if(colisao(jogador, porta)){
      nivel+=1;
      recorde = (nivel>recorde)?nivel:recorde;
      jogador.x = jogador.l/2;
      jogador.y = jogador.a/2;
      inimigo.x = 100+(300/2)*(Math.random());
      inimigo.y = 100+(200/2)*(Math.random());
   }
   if(colisao(jogador, inimigo)){
      vidas-=1;
      if(vidas==0){
         vidas = 5;
         nivel = 1;
      }
      jogador.x = jogador.l/2;
      jogador.y = jogador.a/2;
      inimigo.x = 100+(300/2)*(Math.random());
      inimigo.y = 100+(200/2)*(Math.random());
   }

   ctx.fillStyle="rgb(255,255,0)";
   ctx.strokeStyle="rgb(255,255,255)";
   ctx.lineWidth = 1.0;
   ctx.fillText("Nível: "+nivel,350,15);
   ctx.strokeText("Nível: "+nivel,350,15);
   ctx.strokeStyle="rgb(255,0,0)";
   ctx.fillText("Vidas: "+vidas,300,15);
   ctx.strokeText("Vidas: "+vidas, 300,15);
   ctx.strokeStyle="rgb(255,255,0)";
   ctx.fillText("Recorde: "+recorde, 240,15);
   ctx.strokeText("Recorde: "+recorde, 240,15);

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
