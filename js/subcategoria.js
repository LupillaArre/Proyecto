function Subcategoria(id,nombre,categoriaid,nombre1,categoriaid1){
	this.id = id;
	this.nombre = nombre;
	this.categoriaid = categoriaid;
	this.nombre1 = nombre1;
	this.categoriaid1 = categoriaid1;
	
	
}

$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);
	var sql = "CREATE TABLE IF NOT EXISTS subcategoria(id integer primary key ";
		sql += "autoincrement,nombre, categoriaid)";
	base.transaction(function(t){
		t.executeSql(sql);
	});

	mostrarmodi(base);
	mostrar(base);
	mostrardel(base);
	mostrarclasi(base);
	mostrarclasimo(base)

	
	$("#guardar").click(function(){
		guardar(objeto(),base);
		mostrar(base);
		mostrarmodi(base);
		mostrardel(base);
		mostrarclasi(base);
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
	var subcategoria = new Subcategoria(

		parseInt($("#id").val()),
		$("#nombre").val(),
		$("#categoriaid").val(),
		$("#nombre1").val(),
		$("#categoriaid1").val()

		);
	return subcategoria;
}


function guardar(subcategoria,base){
	if(subcategoria.nombre != ''){
		base.transaction(function(t){
			var sql = "INSERT INTO subcategoria (nombre, categoriaid)";
				sql += "VALUES (?,?)";
			t.executeSql(sql,
				[subcategoria.nombre, subcategoria.categoriaid]
			);
		});
	}else{
		alert("Algunos campos son necesarios");
	}
}
function eliminar(id, base){
	base.transaction(function(t){
			t.executeSql("DELETE FROM subcategoria WHERE id =" +id);
		});
}

function actualizar(subcategoria,base){
	base.transaction(function(t){
		var sql = "UPDATE subcategoria SET nombre = ?, categoriaid = ? WHERE id = ?";
			t.executeSql(sql,
				[subcategoria.nombre1,subcategoria.categoriaid1,subcategoria.id]
			);
		});
}

function mostrarId(id, base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM subcategoria WHERE id="+id,[],function(t,resultado){
			$("#id").val(resultado.rows.item(0).id);
			$("#nombre1").val(resultado.rows.item(0).nombre);
			$("#categoriaid1").val(resultado.rows.item(0).categoriaid);		    
		});
	});
}

function mostrar(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM subcategoria",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Nombre</p></th>"+
					"<th><p align=\"center\">Categoria id</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr align=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).categoriaid + "</td>";
					cuerpo += "</tr>";
			}
			$("#subcategoria").html(cabecera + cuerpo);

		}); 
	});
}


function mostrarmodi(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM subcategoria",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Nombre</p></th>"+
					"<th><p align=\"center\">Categoria id</p></th>"+
					"<th><p align=\"center\">Modificar</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr align=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).categoriaid + "</td>";
					cuerpo += "<td><spam class='modificar glyphicon glyphicon-pencil' data-modificar='"+resultado.rows.item(i).id +"'></spam></td>";
					cuerpo += "</tr>";
			}
			$("#mosubcategoria").html(cabecera + cuerpo);
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
		t.executeSql("SELECT * FROM subcategoria",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Nombre</p></th>"+
					"<th><p align=\"center\">Categoria id</p></th>"+
					"<th><p align=\"center\">Eliminar</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr align=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).categoriaid + "</td>";
					cuerpo += "<td><spam  class='eliminar glyphicon glyphicon-trash' data-eliminar='"+resultado.rows.item(i).id +"'>X</spam></td>";
					cuerpo += "</tr>";
			}
			$("#delsubcategoria").html(cabecera + cuerpo);
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
function mostrarclasi(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM categoria",[],function(t,resultado){
			var cabecera = "<option>Seleccione...</option>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<option value="+ resultado.rows.item(i).id +">"+resultado.rows.item(i).nombre +"</option>";
			}
			$("#categoriaid").html(cabecera + cuerpo);
		}); 
	});
}
function mostrarclasimo(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM categoria",[],function(t,resultado){
			var cabecera = "<option>Seleccione...</option>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<option value="+ resultado.rows.item(i).id +">"+resultado.rows.item(i).nombre +"</option>";
			}
			$("#categoriaid1").html(cabecera + cuerpo);
		}); 
	});
}
function limpiar(){
	$("#id").val(''),
	$("#nombre").val(''),
	$("#nombre1").val('')
}


