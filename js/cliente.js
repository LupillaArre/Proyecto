function Cliente(id,nombre,apellidos,correo,nombre_usuario,password,nombre1,apellidos1,
	correo1,nombre_usuario1, password1){
	this.id = id;
	this.nombre = nombre;
	this.apellidos = apellidos;
	this.correo = correo;
	this.nombre_usuario = nombre_usuario;
	this.password = password;
	
	this.nombre1 = nombre1;
	this.apellidos1 = apellidos1;
	this.correo1 = correo1;
	this.nombre_usuario1 = nombre_usuario1;
	this.password1 = password1;
}

$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);
	var sql = "CREATE TABLE IF NOT EXISTS cliente(id integer primary key ";
		sql += "autoincrement,nombre, apellidos,correo, nombre_usuario, password)";

	var sql1="CREATE TABLE IF NOT EXISTS usuario(id integer primary key ";
		sql1 += "autoincrement,usuario, password,correo, tipo)";
	base.transaction(function(t){
		t.executeSql(sql);
		t.executeSql(sql1);
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
	var cliente = new Cliente(

		parseInt($("#id").val()),
		$("#nombre").val(),
		$("#apellidos").val(),
		$("#correo").val(),
		$("#nombre_usuario").val(),
		$("#password").val(),


		$("#nombre1").val(),
		$("#apellidos1").val(),
		$("#correo1").val(),
		$("#nombre_usuario1").val(),
		$("#password1").val()

		);
	return cliente;
}


function guardar(cliente,base){
	
		base.transaction(function(t){
			var sql = "INSERT INTO cliente (nombre, apellidos, correo,nombre_usuario,password)";
				sql += "VALUES (?,?,?,?,?)";
			var sql1 = "INSERT INTO usuario (usuario, password, correo,tipo)";
				sql1 += "VALUES (?,?,?,'CLI')";
			var nomb=cliente.nombre;
			t.executeSql(sql,
				[nomb, cliente.apellidos,cliente.correo,cliente.nombre_usuario,cliente.password]
			);
			t.executeSql(sql1,
				[cliente.nombre_usuario,cliente.password,cliente.correo]
			);
		});

	}
function eliminar(id, base){
	base.transaction(function(t){
			t.executeSql("DELETE FROM cliente WHERE id =" +id);
		});
}

function actualizar(producto,base){
	base.transaction(function(t){
		var sql = "UPDATE cliente SET nombre = ?, apellidos = ?, correo = ?, nombre_usuario=?, password=? "; 
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
		t.executeSql("SELECT * FROM cliente",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Nombre</p></th>"+
					"<th><p align=\"center\">Apellidos</p></th>"+
					"<th><p align=\"center\">Correo</p></th>"+
					"<th><p align=\"center\">Nombre Usuario</p></th>"+
					"<th><p align=\"center\">Password</p></th>"+
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
					cuerpo += "</tr>";
			}
			$("#cliente").html(cabecera + cuerpo);

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
		t.executeSql("SELECT * FROM cliente",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Nombre</p></th>"+
					"<th><p align=\"center\">Apellidos</p></th>"+
					"<th><p align=\"center\">Correo</p></th>"+
					"<th><p align=\"center\">Nombre Usuario</p></th>"+
					"<th><p align=\"center\">Password</p></th>"+
					"<th><p align=\"center\">Eliminar</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tralign=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).apellidos + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).correo + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre_usuario + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).password + "</td>";
					cuerpo += "<td><spam  class='eliminar glyphicon glyphicon-trash' data-eliminar='"+resultado.rows.item(i).id +"'>X</spam></td>";
					cuerpo += "</tr>";
			}
			$("#delcliente").html(cabecera + cuerpo);
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


