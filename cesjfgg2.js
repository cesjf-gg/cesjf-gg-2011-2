var tela = document.getElementById("canvas");
var ctx = tela.getContext("2d");

ctx.fillRect(0, 0, 400, 300);


var y = 0;
var agora = Date.now();
var depois = agora;
var intervalo = 0;



setInterval(passo,50);






function passo(){
   agora = Date.now();
   intervalo = agora - depois;
   console.log(intervalo);
   y=y+30*intervalo/1000;
   if(y>=250){
      y=250;
}
   ctx.fillStyle="rgb(0,0,0)";
   ctx.fillRect(0, 0, 400, 300);
   

   ctx.fillStyle="rgb(255,0,0)";
   ctx.strokeStyle="rgb(255,255,255)"; 
   ctx.lineWidth=2;

   ctx.beginPath( );
   ctx.rect(200,10+y,20,20);
   ctx.closePath( );
   ctx.fill();
   ctx.stroke();
   depois = agora;
}


