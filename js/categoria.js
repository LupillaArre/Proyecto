function Categoria(id,nombre,clasificacionid,nombre1,clasificacionid1){
	this.id = id;
	this.nombre = nombre;
	this.clasificacionid = clasificacionid;
	this.nombre1 = nombre1;
	this.clasificacionid1 = clasificacionid1;
	
	
}

$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);
	var sql = "CREATE TABLE IF NOT EXISTS categoria(id integer primary key ";
		sql += "autoincrement,nombre, clasificacionid)";
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
		//limpiar();
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
	var categoria = new Categoria(

		parseInt($("#id").val()),
		$("#nombre").val(),
		$("#clasificacionid").val(),
		$("#nombre1").val(),
		$("#clasificacionid1").val()

		);
	return categoria;
}


function guardar(categoria,base){

	if(categoria.nombre != ''){
		base.transaction(function(t){
			var sql = "INSERT INTO categoria (nombre, clasificacionid)";
				sql += "VALUES (?,?)";
			var nomb=categoria.nombre;
			var nombreproducto=document.getElementById("nombre").value;
			var n=nombreproducto;
			t.executeSql(sql,
				[n, categoria.clasificacionid]
			);
		});
	}else{
		alert("Algunos campos son necesarios");
	}
}
function eliminar(id, base){
	base.transaction(function(t){
			t.executeSql("DELETE FROM categoria WHERE id =" +id);
		});
}

function actualizar(categoria,base){
	base.transaction(function(t){
		var sql = "UPDATE categoria SET nombre = ?, clasificacionid = ? WHERE id = ?";
			t.executeSql(sql,
				[categoria.nombre1,categoria.clasificacionid1,categoria.id]
			);
		});
}

function mostrarId(id, base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM categoria WHERE id="+id,[],function(t,resultado){
			$("#id").val(resultado.rows.item(0).id);
			$("#nombre1").val(resultado.rows.item(0).nombre);
			$("#clasificacionid1").val(resultado.rows.item(0).clasificacionid);		    
		});
	});
}

function mostrar(base){
	base.transaction(function(t){
		var num=1;
		t.executeSql("SELECT * FROM categoria  ",[],function(t,resultado){
			var cabecera =
					"<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Nombre</p></th>"+
					"<th><p align=\"center\">Clasificacion id</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
				var id= resultado.rows.item(i).id;
					cuerpo += "<tr>";
					cuerpo += "<td align=\"center\">" + id + "</td>";
					cuerpo += "<td align=\"center\">" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td align=\"center\">" + resultado.rows.item(i).clasificacionid + "</td>";
					cuerpo += "</tr>";
			}
			
			$("#categoria").html(cabecera + cuerpo);

		}); 
	});
}


function mostrarmodi(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM categoria",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Nombre</p></th>"+
					"<th><p align=\"center\">Clasificacion id</p></th>"+
					"<th><p align=\"center\">Modificar<p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr align=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).clasificacionid + "</td>";
					cuerpo += "<td><spam class='modificar glyphicon glyphicon-pencil' data-modificar='"+resultado.rows.item(i).id +"'></spam></td>";
					cuerpo += "</tr>";
			}
			$("#mocategoria").html(cabecera + cuerpo);
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
		t.executeSql("SELECT * FROM categoria",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Id</p></th>"+
					"<th><p align=\"center\">Nombre</p></th>"+
					"<th><p align=\"center\">Clasificacion id</p></th>"+
					"<th><p align=\"center\">Eliminar</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr align=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).clasificacionid + "</td>";
					cuerpo += "<td><spam class='eliminar glyphicon glyphicon-trash' data-eliminar='"+resultado.rows.item(i).id +"'>X</spam></td>";
					cuerpo += "</tr>";
			}
			$("#delcategoria").html(cabecera + cuerpo);
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
		t.executeSql("SELECT * FROM clasificacion",[],function(t,resultado){
			var cabecera = "<option>Seleccione...</option>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<option value="+ resultado.rows.item(i).id +">"+resultado.rows.item(i).nombre +"</option>";
			}
			$("#clasificacionid").html(cabecera + cuerpo);
		}); 
	});
}
function mostrarclasimo(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM clasificacion",[],function(t,resultado){
			var cabecera = "<option>Seleccione...</option>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<option value="+ resultado.rows.item(i).id +">"+resultado.rows.item(i).nombre +"</option>";
			}
			$("#clasificacionid1").html(cabecera + cuerpo);
		}); 
	});
}
function limpiar(){
	$("#id").val(''),
	$("#nombre").val(''),
	$("#nombre1").val(''),
	$("#clasificacionid1").val('')
}
