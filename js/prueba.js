$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);

	mostrarpro(base);

});

function mostrarpro(base){
base.transaction(function(t){
	
		t.executeSql("SELECT * FROM producto where categoriaid='1' ",[],function(t,resultado){
			
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo+="<input type='text' class='nombre' value="+resultado.rows.item(i).nombre+"></input>";
					cuerpo+="<input type='submit' class='eliminar' data-eliminar='"+resultado.rows.item(i).id +"' data-nombre='"+resultado.rows.item(i).nombre +"' value='enviar'></input>";
			}
			$("#prueba").html(cuerpo);
			$('.eliminar').click(function(){
				var id=$(this).attr('data-eliminar');
				var nombre=$(this).attr('data-nombre');
				//guardar(id,nombre,base);
			alerta(id,nombre);
				/* Primera prueba

				var nombre=$(this).attr('data-nombre');
					var id=$(this).attr('data-eliminar');
				alert("asf "+nombre+ " "+id);*/
			});

		}); 
	});

		
}

function alerta(id, nombre){
	var idd=id;
	var nomb=nombre;
//alert("aaa"+idd+" "+nomb);
	cue="";
	cue+="ass";
	cue+=nomb;
	cue+=idd;
	$("#prueba2").html(cue);
}

function guardar(id,nombre,base){
	var nomb=nombre;
	var idd=id;
		base.transaction(function(t){
			var sql = "INSERT INTO categoria (nombre, clasificacionid)";
				sql += "VALUES (?,?)";
			
			t.executeSql(sql,
				[nomb,idd]
			);
		});
}