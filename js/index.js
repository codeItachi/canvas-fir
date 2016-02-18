window.onload=function(){
	var canvas=document.querySelector('#canvas');
    ctx=canvas.getContext('2d');
    var row=15;
	for(var i=0;i<row;i++){
		var r=ctx.createLinearGradient(0,0,560,0)
		r.addColorStop(0,'red');
		r.addColorStop(1,'blue');
		ctx.strokeStyle=r;
		ctx.beginPath();
		ctx.moveTo(20,20.5+40*i);
		ctx.lineTo(580,20.5+40*i);
		ctx.stroke();
        
        var l=ctx.createLinearGradient(0,0,0,560)
		l.addColorStop(0,'orange');
		l.addColorStop(1,'purple');
		ctx.strokeStyle=l;
		ctx.beginPath();
		ctx.moveTo(20.5+40*i,20);
		ctx.lineTo(20.5+40*i,580);
		ctx.stroke();
	}
	
	

	ctx.beginPath();
	ctx.arc(300.5,300.5,5,0,Math.PI*2);
	ctx.fill();


    var z=[140.5,460.5];
    for(var i=0;i<z.length;i++){
    	for(var j=0;j<z.length;j++){
    		ctx.beginPath();
    		ctx.arc(z[i],z[j],5,0,Math.PI*2);
    		ctx.fill();
    	}
    }


  var luozi=function(x,y,color){
  	var zx=40*x+20.5;
  	var zy=40*y+20.5;

  	var black=ctx.createRadialGradient(zx,zy,1,zx,zy,18);
  	black.addColorStop(0.1,'#555');
  	black.addColorStop(1,'black');
    
    var white=ctx.createRadialGradient(zx,zy,1,zx,zy,18);
  	white.addColorStop(0.1,'#fff');
  	white.addColorStop(1,'#ddd');

  	ctx.fillStyle=color?black:white;
  	ctx.beginPath();
  	ctx.arc(zx,zy,18,0,Math.PI*2);
  	ctx.fill();
  }
  var qizi={};
   
   var flag=true
   canvas.onclick=function(e){
    var x=Math.round( (e.offsetX-20.5)/40);
    var y=Math.round( (e.offsetY-20.5)/40);
    
    if(qizi[x+'_'+y]){return}
    luozi(x,y,flag);
    qizi[x+'_'+y]=flag?'black':'white';
    flag=!flag;
    localStorage.data=JSON.stringify(qizi);//记忆 储存
   }

   if(localStorage.data){
   	qizi=JSON.parse(localStorage.data);
   	for(var i in qizi){
   		var x=i.split('_')[0];
   		var y=i.split('_')[1];
   		luozi(x,y,qizi[i]=='black');
   	}
   }
   canvas.ondblclick=function(e){
   	e.stopPropagation();
   }
   document.ondblclick=function(){
   	localStorage.clear();
   	location.reload();
   }
  }