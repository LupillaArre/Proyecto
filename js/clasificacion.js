function Clasificacion(id,nombre,nombre1){
	this.id = id;
	this.nombre = nombre;
	this.nombre1 = nombre1;
	
}

$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);
	var sql = "CREATE TABLE IF NOT EXISTS clasificacion(id integer primary key ";
		sql += "autoincrement,nombre)";
	base.transaction(function(t){
		t.executeSql(sql);
	});

	mostrarmodi(base);
	mostrar(base);
	mostrardel(base);

	
	$("#guardar").click(function(){
		guardar(objeto(),base);
		mostrar(base);
		mostrarmodi(base);
		mostrardel(base);
		limpiar();
	});

	$("#actualizar").click(function(){
		actualizar(objeto(),base);
		limpiar();
		mostrarmodi(base);
		mostrar(base);
		mostrardel(base);
		
	});

	$("#cancelar").click(function(){
		limpiar();
		$("#guardar").css("display");
		$("#actualizar").css("display","none");
		$("#cancelar").css("display","none");
	});
	
});


function objeto(){
	var clasificacion = new Clasificacion(

		parseInt($("#id").val()),
		$("#nombre").val(),
		$("#nombre1").val()
		);
	return clasificacion;
}


function guardar(clasificacion,base){
	if(clasificacion.nombre1 != ''){
		base.transaction(function(t){
			var sql = "INSERT INTO clasificacion (nombre)";
				sql += "VALUES (?)";
			t.executeSql(sql,
				[clasificacion.nombre1]
			);
		});
	}else{
		alert("Algunos campos son necesarios");
	}
}
function eliminar(id, base){
	base.transaction(function(t){
			t.executeSql("DELETE FROM clasificacion WHERE id =" +id);
		});
}

function actualizar(clasificacion,base){
	base.transaction(function(t){
		var sql = "UPDATE clasificacion SET nombre = ? WHERE id = ?";
			t.executeSql(sql,
				[clasificacion.nombre,clasificacion.id]
			);
		});
}

function mostrarId(id, base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM clasificacion WHERE id="+id,[],function(t,resultado){
			$("#id").val(resultado.rows.item(0).id);
			$("#nombre").val(resultado.rows.item(0).nombre);		    
		});
	});
}

function mostrar(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM clasificacion",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Nombre</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr align=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "</tr>";
			}
			$("#clasificacion").html(cabecera + cuerpo);

		}); 
	});
}


function mostrarmodi(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM clasificacion",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Nombre</p></th>"+
					"<th><p align=\"center\">Modificar</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr align=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td><spam class='modificar glyphicon glyphicon-pencil' data-modificar='"+resultado.rows.item(i).id +"'></spam></td>";
					cuerpo += "</tr>";
			}
			$("#clasificaciones").html(cabecera + cuerpo);
			$('.modificar').click(function(){
				
				mostrarId($(this).attr('data-modificar'),base);
				$("#guardar").css("display");
				$("#actualizar").css("display","block");
				$("#cancelar").css("display","block");
			});

		}); 
	});
}
function mostrardel(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM clasificacion",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Nombre</p></th>"+
					"<th><p align=\"center\">Eliminar</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr align=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td><spam  class='eliminar glyphicon glyphicon-trash' data-eliminar='"+resultado.rows.item(i).id +"'>X</spam></td>";
					cuerpo += "</tr>";
			}
			$("#clasi").html(cabecera + cuerpo);
			$('.eliminar').click(function(){
				var confirmar = confirm("¿Desea eliminar?");
				if(confirmar == 1){
					eliminar($(this).attr('data-eliminar'),base);
					mostrardel(base);
					mostrar(base);
					mostrarmodi(base);
				}
			});
		}); 
	});
}

function limpiar(){
	$("#id").val(''),
	$("#nombre").val(''),
	$("#nombre1").val('')
}

