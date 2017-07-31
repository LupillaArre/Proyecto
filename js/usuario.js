function Usuario(id,nombre_usuario,password,correo){
	this.id = id;
	this.nombre_usuario = nombre_usuario;
	this.password = password;
	this.correo = correo;
}

$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);
	var sql = "CREATE TABLE IF NOT EXISTS usuario(id integer primary key ";
		sql += "autoincrement,usuario, password,correo, tipo)";
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
	var usuario = new Usuario(

		parseInt($("#id").val()),
		$("#nombre_usuario").val(),
		$("#password").val(),
		$("#correo").val()

		);
	return usuario;
}


function guardar(usuario,base){
	
		base.transaction(function(t){
			var sql = "INSERT INTO usuario (usuario, password, correo,tipo)";
				sql += "VALUES (?,?,?,'CLI')";
			
			t.executeSql(sql,
				[usuario.nombre_usuario,usuario.password,usuario.correo]
			);
		});
}
function eliminar(id, base){
	base.transaction(function(t){
			t.executeSql("DELETE FROM usuario WHERE id =" +id);
		});
}

function actualizar(producto,base){
	base.transaction(function(t){
		var sql = "UPDATE usuario SET usuario = ?, password = ?, correo = ?"; 
		sql +=" WHERE id = ?";
			t.executeSql(sql,
				[producto.nombre1,producto.apellidos1,producto.correo1,producto.nombre_usuario1, producto.password1]
			);
		});
}

function mostrarId(id, base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM cliente WHERE id="+id,[],function(t,resultado){
			$("#id").val(resultado.rows.item(0).id);
			$("#nombre1").val(resultado.rows.item(0).nombre);
			$("#apellidos1").val(resultado.rows.item(0).descripcion);
			$("#correo1").val(resultado.rows.item(0).precio);
			$("#nombre_usuario1").val(resultado.rows.item(0).stock_min);
			$("#password1").val(resultado.rows.item(0).stock_max);
		});
	});
}

function mostrar(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM usuario",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Usuario</p></th>"+
					"<th><p align=\"center\">Password</p></th>"+
					"<th><p align=\"center\">Correo</p></th>"+
					"<th><p align=\"center\">Tipo Usuario</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr align=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).usuario + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).password + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).correo + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).tipo + "</td>";
					cuerpo += "</tr>";
			}
			$("#usuario").html(cabecera + cuerpo);

		}); 
	});
}


function mostrarmodi(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM cliente",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Nombre</p></th>"+
					"<th><p align=\"center\">Apellidos</p></th>"+
					"<th><p align=\"center\">Correo</p></th>"+
					"<th><p align=\"center\">Nombre Usuario</p></th>"+
					"<th><p align=\"center\">Password</p></th>"+
					"<th><p align=\"center\">Modificar</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr align=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).apellidos + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).correo + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre_usuario + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).password + "</td>";
					cuerpo += "<td><spam class='modificar glyphicon glyphicon-pencil' data-modificar='"+resultado.rows.item(i).id +"'></spam></td>";
					cuerpo += "</tr>";
			}
			$("#moproducto").html(cabecera + cuerpo);
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
		t.executeSql("SELECT * FROM usuario",[],function(t,resultado){
			var cabecera = "<tr align=\"center\">"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Usuario</p></th>"+
					"<th><p align=\"center\">Password</p></th>"+
					"<th><p align=\"center\">Correo</p></th>"+
					"<th><p align=\"center\">Tipo Usuario</p></th>"+
					"<th><p align=\"center\">Eliminar</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr align=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).usuario + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).password + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).correo + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).tipo + "</td>";
					cuerpo += "<td><spam  class='eliminar glyphicon glyphicon-trash' data-eliminar='"+resultado.rows.item(i).id +"'>X</spam></td>";
					cuerpo += "</tr>";
			}
			$("#delusuario").html(cabecera + cuerpo);
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
	$("#apellidos").val(''),
	$("#correo").val(''),
	$("#nombre_usuario").val(''),
	$("#password").val('')
}


