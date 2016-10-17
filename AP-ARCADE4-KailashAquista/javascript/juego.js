var juego ={
	filas : [[], [], []],
	espacioVacio : {fila:2, columna:2},
	nombre:"Pikachu",
	cantidadMovimientos:0,
	isMezclado:false,
	gano:false,
	capturarTeclas: function()
	{
		var that=this;
		$(document).keydown(function(evento)
		{
			
			switch(evento.which)
			{

				case 37: 
					that.moverHaciaLaIzquierda();
					break;
				case 38: 
					that.moverHaciaArriba();
					break;
				case 39: 
					that.moverHaciaLaDerecha(); 
					break;
				case 40: 
					that.moverHaciaAbajo(); 
					break;
			}
			that.check();
		});
	},
	instalarPiezas : function(elemento)
	{
		var contador=1;
		for(var fila=0;fila<3;fila++)
		{
			for(var columna=0;columna<3;columna++)
			{
				
				if(fila == this.espacioVacio.fila && columna == this.espacioVacio.columna)
				{
					this.filas[fila][columna]=null;
					console.log("espaciovacio");
					
				}
				else
				{
					var ficha = this.crearPieza(contador++, fila, columna);
					//$("#juego").append("<div>hola</div>");
					elemento.append(ficha.elemento);
					//console.log(ficha); 
					this.filas[fila][columna]=ficha;
				}
			}
		}
	},
	crearPieza : function(numero, fila, columna)
	{
		//$("#juego").append("<div></div>").addClass("pieza");
		var pieza = $('<div>');
		pieza.addClass('pieza');
		console.log(this.nombre);
		pieza.css({"background-image":"url(images/"+this.nombre+"/"+numero+".jpeg)", "background-color":"black",top:200*fila, left:200*columna});
		return {elemento:pieza, numero:numero, filaInicial:fila, columnaInicial:columna};
	},
	moverHaciaAbajo:function()
	{
		
		var filaOrigen = this.espacioVacio.fila-1;
		var columnaOrigen = this.espacioVacio.columna;

		this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	moverHaciaArriba:function()
	{
		
		var filaOrigen = this.espacioVacio.fila+1;
		var columnaOrigen = this.espacioVacio.columna;

		this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	moverHaciaLaDerecha:function()
	{
		
		var filaOrigen = this.espacioVacio.fila;
		var columnaOrigen = this.espacioVacio.columna-1;

		this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	moverHaciaLaIzquierda:function()
	{
		
		var filaOrigen = this.espacioVacio.fila;
		var columnaOrigen = this.espacioVacio.columna+1;

		this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	moverFichaFilaColumna:function(ficha,fila,columna)
	{
		//console.log(this.filas[fila][columna]);
		ficha.elemento.css({top:fila*200, left:columna*200});
	},
	guardarEspacioVacio:function(nuevaFila, nuevaColumna)
	{
		this.espacioVacio.fila=nuevaFila;
		this.espacioVacio.columna=nuevaColumna;
		this.filas[nuevaFila][nuevaColumna]=null;
	},
	 intercambiarPosicionConEspacioVacio:function(fila, columna)
	{
		var ficha = this.filas[fila] && this.filas[fila][columna];
		if(ficha!=null)
		{
			this.moverFichaFilaColumna(ficha, this.espacioVacio.fila, this.espacioVacio.columna);
			this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
			this.guardarEspacioVacio(fila, columna);
			if(this.isMezclado&&!this.gano)
				this.actualizarContadorMovimientos();
		}
		
	},
	iniciar : function(elemento)
	{
		this.instalarPiezas(elemento);
		this.cantidadMovimientos=0;
		juego.mezclarPiezas(200);
		this.gano=false;
		this.cantidadMovimientos=0;
		if(this.nombre=="Pikachu")
		{
			$(".icono.Pikachu").css({"background-image":'url("images/icons/Pikachu-dark.png"'});
			$(".icono.Twitch").css({"background-image":'url("images/icons/Twitch-dark.png"'});
			$(".icono.Kappa").css({"background-image":'url("images/icons/Kappa-dark.png"'});
		}
		else
		{
			$(".icono.Pikachu").css({"background-image":'url("images/icons/Pikachu.png"'});
			$(".icono.Twitch").css({"background-image":'url("images/icons/Twitch.png"'});
			$(".icono.Kappa").css({"background-image":'url("images/icons/Kappa.png"'});
		}
		$("#contador-movimientos").html("Movimientos: 0");
	},
	check:function()
	{
		for(var fila=0;fila<3;fila++)
		{
			for(var columna=0;columna<3;columna++)
			{
				var ficha = this.filas[fila][columna];
				//console.log(this.filas[fila][columna]); 
				if(ficha)
				{
					if(ficha.fila!=this.espacioVacio.fila||ficha.columna!=this.espacioVacio.columna)
					{
						if(ficha.filaInicial!=fila||columna != ficha.columnaInicial)
						{
							console.log("false");
							return false;

						}
					}
				}
				
			}
		}
		this.cambiarImagenPiezasCuandoGano();
		$("#contador-movimientos").html("¡Ganaste!");
		this.gano=true;
	},
	mezclarPiezas:function(veces)
	{
		var movimientos = ["moverHaciaAbajo", "moverHaciaArriba", "moverHaciaLaDerecha", "moverHaciaLaIzquierda"];
		for(var i=0;i<veces;i++)
		{
			var random = Math.floor(Math.random()*4);//floor redondea el numero random, 4 es el maximo
			var funcionRandom = movimientos[random];
			this[funcionRandom]();
			//console.log(i);
		}
		this.isMezclado=true;
	},
	eliminarPiezas:function(nuevaImagen){
		$("#juego div.pieza").remove();
		this.izMezclado=false;
		this.espacioVacio.fila=2;
		this.espacioVacio.columna=2;
		this.nombre=nuevaImagen;
		var $elemento = $("#juego");
		this.iniciar($elemento);
	},
	cambiarFondo:function(colorFondo, colorContador)
	{
		$("#contenedor").css({'transition':'1.2s','background-color':'#'+colorFondo});
		$("#juego").css({'background-color':'#'+colorFondo});
		$("#contador-movimientos").css({'color':'#'+colorContador});
	},
	cambiarImagenPiezasCuandoGano:function()
	{
		$("#juego .pieza").css({'background-image':"url(images/"+this.nombre+".png)"});
	},
	actualizarContadorMovimientos:function()
	{
		$("#contador-movimientos").html("Movimientos: "+ ++this.cantidadMovimientos);
	}
};
$(document).ready(function(){
		var $elemento = $("#juego");
		juego.iniciar($elemento);
		juego.capturarTeclas();
});