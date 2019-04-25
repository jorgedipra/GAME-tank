var debug      =true;
var Max        =50;
var teclaspace =true;
var One        =true;
var Two        =true;
var Three      =true;
consola("start",debug);

document.addEventListener("keydown", function (event) {
	switch (event.which || event.keyCode) {
		case 32:
		if(teclaspace)
			space();
		break;
		case 39:
		arrow_rigth();
		break;
		case 37:
		arrow_left();
		break;
		default:
		consola(event.which || event.keyCode,debug);
		break;
	}
});
var rigth=0;
function arrow_rigth(){
	rigth++;
	switch (rigth) {
		case 1:
		document.getElementById("Tank").style.backgroundPosition="-14px -55%";
		break;
		case 2:
		document.getElementById("Tank").style.backgroundPosition="74px -55%";	
		break;
		case 3:
		document.getElementById("Tank").style.backgroundPosition="160px -55%";
		break;
		case 4:
		document.getElementById("Tank").style.backgroundPosition="250px -55%";
		break;
		default:
		rigth=0;
		break;
	}	
	var positionStartX = document.getElementById("Tank").style.gridColumnStart;
	var positionEndX = document.getElementById("Tank").style.gridColumnEnd;
	if(positionEndX<=Max)
		if(positionStartX){
			positionStartX=parseInt(positionStartX);
			positionEndX=parseInt(positionEndX);
			document.getElementById("Tank").style.gridColumnStart = positionStartX+1;
			document.getElementById("Tank").style.gridColumnEnd = positionEndX+1;
		}else{
			document.getElementById("Tank").style.gridColumnStart = 2;
			document.getElementById("Tank").style.gridColumnEnd = 5;
		}
		consola("->",debug);
	}

	var left=0;
	function arrow_left(){
		left++;
		switch (left) {
			case 1:
			document.getElementById("Tank").style.backgroundPosition="-25px -86%";
			break;
			case 2:
			document.getElementById("Tank").style.backgroundPosition="63px -86%";	
			break;
			case 3:
			document.getElementById("Tank").style.backgroundPosition="151px -86%";
			break;
			case 4:
			document.getElementById("Tank").style.backgroundPosition="239px -86%";
			break;
			default:
			left=0;
			break;
		}	
		var positionStartX = document.getElementById("Tank").style.gridColumnStart;
		var positionEndX = document.getElementById("Tank").style.gridColumnEnd;
		if(positionStartX && positionStartX!=1){
			positionStartX=parseInt(positionStartX);
			positionEndX=parseInt(positionEndX);
			document.getElementById("Tank").style.gridColumnStart = positionStartX-1;
			document.getElementById("Tank").style.gridColumnEnd = positionEndX-1;
		}else{
			document.getElementById("Tank").style.gridColumnStart = 1;
			document.getElementById("Tank").style.gridColumnEnd = 4;
		}
		consola("<-",debug);
	}

	function space(){
		teclaspace= false;
		var positionStartX = document.getElementById("Tank").style.gridColumnStart;
		var positionEndX = document.getElementById("Tank").style.gridColumnEnd;

		if(positionStartX){
			positionStartX=parseInt(positionStartX);
			positionEndX=parseInt(positionEndX);
			document.getElementById("disparo").style.gridColumnStart=positionStartX+1;
			document.getElementById("disparo").style.gridColumnEnd=positionEndX-1;
			nuevoproyectil();
		}else{
			document.getElementById("disparo").style.gridColumnStart=2;
			document.getElementById("disparo").style.gridColumnEnd=3;
			nuevoproyectil();
		}
		document.getElementById("disparo").style.gridRowStart=49-1;
		document.getElementById("disparo").style.gridRowEnd=50-1;
		cuentaAatra(10);

		consola("---",debug);
	}
	function cuentaAatra(velocidad){
		positionEndY=parseInt(document.getElementById("disparo").style.gridRowEnd);
		
		if(One)
			OneEnd=parseInt(document.getElementById("one").style.gridRowEnd)+1;
		else
			OneEnd=0;
		if(Two)
			TwoEnd=parseInt(document.getElementById("two").style.gridRowEnd)+1;
		else
			TwoEnd=0;
		if(Three)
			ThreeEnd=parseInt(document.getElementById("three").style.gridRowEnd)+1;
		else
			ThreeEnd=0;
		
		switch (positionEndY) {
			case OneEnd:
			choque(OneEnd);
			break;
			case TwoEnd:
			choque(TwoEnd);
			break;
			case ThreeEnd:
			choque(ThreeEnd);
			break;
			default:
			break;
		}
		document.getElementById("disparo").style.gridRowStart=positionEndY-2 ;
		document.getElementById("disparo").style.gridRowEnd=positionEndY-1;
		if(positionEndY<=2){
			impacto_proyectil("cero");
			return false; 
		}else{
			setTimeout("cuentaAatra("+velocidad+")",velocidad); 
		}
	}

	function choque(impacto){
		positionStartX=parseInt(document.getElementById("disparo").style.gridColumnStart);
		
		OneEndY=parseInt(document.getElementById("one").style.gridRowEnd)+1
		OneStartX=parseInt(document.getElementById("one").style.gridColumnStart)
		OneEndX=parseInt(document.getElementById("one").style.gridColumnEnd)
		
		TwoEndY=parseInt(document.getElementById("two").style.gridRowEnd)+1
		TwoStartX=parseInt(document.getElementById("two").style.gridColumnStart)
		TwoEndX=parseInt(document.getElementById("two").style.gridColumnEnd)
		
		ThreeEndY=parseInt(document.getElementById("three").style.gridRowEnd)+1
		ThreeStartX=parseInt(document.getElementById("three").style.gridColumnStart)
		ThreeEndX=parseInt(document.getElementById("three").style.gridColumnEnd)
		switch (impacto) {
			case OneEndY:
			//One
			if(positionStartX>=OneStartX && positionStartX<OneEndX){
				Barra=parseInt(document.getElementById("OneBarra").style.width)-10;
				document.getElementById("OneBarra").style.width= Barra+"px";
				impacto_proyectil("one",Barra);
			}
			break;
			case ThreeEndY:
			//Three
			if(positionStartX>=ThreeStartX && positionStartX<ThreeEndX){
				
				Barra=parseInt(document.getElementById("ThreeBarra").style.width)-10;
				document.getElementById("ThreeBarra").style.width= Barra+"px";
				impacto_proyectil("three",Barra);
			}
			case TwoEndY:
			//Two
			if(positionStartX>=TwoStartX && positionStartX<TwoEndX){
				Barra=parseInt(document.getElementById("TwoBarra").style.width)-10;
				document.getElementById("TwoBarra").style.width= Barra+"px";
				impacto_proyectil("two",Barra);
			}
			break;
			default:
				// statements_def
				break;
			}
		}
		function impacto_proyectil(obj,impacto){
			document.getElementById("disparo").style.border="none";
			document.getElementById("disparo").style.boxShadow="none";
			document.getElementById("disparo").style.background="none";
			if(impacto==0){
				document.getElementById(obj).style.display="none";
				switch (obj) {
					case "one":
					One=false;
					document.getElementById("OneDisparo").style.display="none";
					break;
					case "two":
					Two=false;
					document.getElementById("TwoDisparo").style.display="none";
					break;
					case "three":
					Three=false;
					document.getElementById("ThreeDisparo").style.display="none";
					break;
					default:
					break;
				}
			}else if(impacto==50){
				switch (obj) {
					case "one":
					document.getElementById("OneFuego").style.display="initial";
					break;
					case "two":
					document.getElementById("TwoFuego").style.display="initial";
					break;
					case "three":
					document.getElementById("ThreeFuego").style.display="initial";
					break;
					default:
					break;
				}
			}
			teclaspace=true
			consola("X=>"+obj,debug);
		}
		function nuevoproyectil(){
			document.getElementById("disparo").style.border="0.5px solid #0AEFF4FF";
			document.getElementById("disparo").style.background="#0AEFF4FF";
			document.getElementById("disparo").style.boxShadow="0 0 40px #0AEFF4FF";
		}


		function consola(prin,debug){
			if(debug)
				console.log(prin);
			if(prin=="start"){
				document.getElementById("OneBarra").style.width ="100px";
				document.getElementById("TwoBarra").style.width ="100px";
				document.getElementById("ThreeBarra").style.width ="100px";
				bloque("one",24,29,27,3);
				bloque("two",10,15,12,7);
				bloque("three",40,45,12,5);
				nuevoproyectil_escfera("OneDisparo",24,30,28,29,3);
				nuevoproyectil_escfera("TwoDisparo",10,16,14,15,7);
				nuevoproyectil_escfera("ThreeDisparo",40,46,14,15,5);
				//DIV
				elementos=document.getElementById("main").getElementsByTagName("div");
				for (var i = 0; i < elementos.length; i++) {
					document.getElementsByTagName("div")[i].style.border = "0.5px solid #000"; 
				}
			}
		}

		/**
		 * [bloque crea las posiciones en X y los rangos de movimientos]
		 * @param  {[type]} name   [id de del objeto]
		 * @param  {[type]} startX [posicion inicial en X]
		 * @param  {[type]} endX   [poicision final en X]
		 * @param  {[type]} endY   [poicision final en Y]
		 * @param  {[type]} rango  [rango de movimiento]
		 * @return {[type]}        [time]
		 */
		 function bloque(name,startX,endX,endY,rango){
		 	var i=0; var j=0;

		 	setInterval(function(args) {
		 		document.getElementById(name).style.gridColumnStart=startX+j+i;
		 		document.getElementById(name).style.gridColumnEnd=endX+j+i;
		 		document.getElementById(name).style.gridRowStart=endY-2+j+i;
		 		document.getElementById(name).style.gridRowEnd=endY+j+i;
		 		if(j==0)
		 			i++;
		 		else
		 			i--;
		 		document.getElementById(name).style.gridColumnStart=startX+i;
		 		document.getElementById(name).style.gridColumnEnd=endX+i;
		 		if(i==rango)
		 			j=1;
		 		if(i==0)
		 			j=0;
		 	},1000)
		 }

		 function nuevoproyectil_escfera(name,startX,EndX,startY,EndY,rango) {
		 	
		 	document.getElementById(name).style.gridRowStart=startY;
		 	document.getElementById(name).style.gridRowEnd=EndY;
		 	document.getElementById(name).style.gridColumnStart=startX;
		 	document.getElementById(name).style.gridColumnEnd=EndX;

		 	bloque(name,startX,EndX,startY,rango);
		 	document.getElementById(name).style.display="initial";
		 	var i=0;
		 	setInterval(function(argument) { i++;
				document.getElementById(name).style.gridRowStart=startY-1+i;
				document.getElementById(name).style.gridRowEnd=startY+i;

				if(document.getElementById(name).style.gridRowEnd==50)
					i=0;		 		
		 	},100)
		 }