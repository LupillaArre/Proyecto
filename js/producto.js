function Producto(id,nombre,descripcion,precio,stock_min,stock_max,inventario,clasificacionid,
	categoriaid,subcategoriaid, nombre1, descripcion1,precio1, stock_min1, stock_max1,
	inventario1, clasificacionid1, categoriaid1, subcategoriaid1){
	this.id = id;
	this.nombre = nombre;
	this.descripcion = descripcion;
	this.precio = precio;
	this.stock_min = stock_min;
	this.stock_max = stock_max;
	this.inventario = inventario;
	this.clasificacionid = clasificacionid;
	this.categoriaid = categoriaid;
	this.subcategoriaid = subcategoriaid;

	
	this.nombre1 = nombre1;
	this.descripcion1 = descripcion1;
	this.precio1 = precio1;
	this.stock_min1 = stock_min1;
	this.stock_max1 = stock_max1;
	this.inventario1 = inventario1;
	this.clasificacionid1 = clasificacionid1;
	this.categoriaid1 = categoriaid1;
	this.subcategoriaid1 = subcategoriaid1;
	
}

$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);
	var sql = "CREATE TABLE IF NOT EXISTS producto(id integer primary key ";
		sql += "autoincrement,nombre, descripcion,precio, stock_min, stock_max,inventario,clasificacionid,categoriaid, subcategoriaid)";
	base.transaction(function(t){
		t.executeSql(sql);
	});

	mostrarmodi(base);
	mostrar(base);
	mostrardel(base);
	mostrarclasi(base);
	mostrarcate(base);
	mostrarsub(base);
	mostrarclasi1(base);
	mostrarcate1(base);
	mostrarsub1(base)


	
	$("#guardar").click(function(){
		guardar(objeto(),base);
		mostrar(base);
		mostrarmodi(base);
		mostrardel(base);
		mostrarclasi(base);
		mostrarcate(base);
		mostrarsub(base)
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
	var producto = new Producto(

		parseInt($("#id").val()),
		$("#nombre").val(),
		$("#descripcion").val(),
		$("#precio").val(),
		$("#stock_min").val(),
		$("#stock_max").val(),
		$("#inventario").val(),
		$("#clasificacionid").val(),
		$("#categoriaid").val(),
		$("#subcategoriaid").val(),

		$("#nombre1").val(),
		$("#descripcion1").val(),
		$("#precio1").val(),
		$("#stock_min1").val(),
		$("#stock_max1").val(),
		$("#inventario1").val(),
		$("#clasificacionid1").val(),
		$("#categoriaid1").val(),
		$("#subcategoriaid1").val()

		);
	return producto;
}


function guardar(producto,base){
	if(producto.nombre != '' && producto.descripcion != '' && producto.precio != '' && producto.stock_min != '' && 
		producto.stock_max != '' && producto.inventario !='' && producto.clasificacionid!='' && producto.categoriaid !='' && 
		producto.subcategoriaid !=''){
		base.transaction(function(t){
			var sql = "INSERT INTO producto (nombre, descripcion, precio, stock_min, stock_max,inventario,clasificacionid,categoriaid,subcategoriaid)";
				sql += "VALUES (?,?,?,?,?,?,?,?,?)";
			var nomb=producto.nombre;
			t.executeSql(sql,
				[nomb, producto.descripcion,producto.precio,producto.stock_min,producto.stock_max,producto.inventario,
				producto.clasificacionid, producto.categoriaid, producto.subcategoriaid]
			);
		});
	}else{
		alert("Algunos campos son necesarios");
	}
}
function eliminar(id, base){
	base.transaction(function(t){
			t.executeSql("DELETE FROM producto WHERE id =" +id);
		});
}

function actualizar(producto,base){
	base.transaction(function(t){
		var sql = "UPDATE producto SET nombre = ?, descripcion = ?, precio = ?, stock_min=?, stock_max=?, inventario =?, "; 
		sql +=" clasificacionid = ?, categoriaid=?, subcategoriaid=? WHERE id = ?";
			t.executeSql(sql,
				[producto.nombre1,producto.descripcion1,producto.precio1,producto.stock_min1, producto.stock_max1,
				producto.inventario1, producto.clasificacionid1, producto.categoriaid1, producto.subcategoriaid1, producto.id]
			);
		});
}

function mostrarId(id, base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM producto WHERE id="+id,[],function(t,resultado){
			$("#id").val(resultado.rows.item(0).id);
			$("#nombre1").val(resultado.rows.item(0).nombre);
			$("#descripcion1").val(resultado.rows.item(0).descripcion);
			$("#precio1").val(resultado.rows.item(0).precio);
			$("#stock_min1").val(resultado.rows.item(0).stock_min);
			$("#stock_max1").val(resultado.rows.item(0).stock_max);
			$("#inventario1").val(resultado.rows.item(0).inventario);
			$("#clasificacionid1").val(resultado.rows.item(0).clasificacionid);		    
			$("#categoriaid1").val(resultado.rows.item(0).categoriaid);
			$("#subcategoriaid1").val(resultado.rows.item(0).subcategoriaid);	
		});
	});
}

function mostrar(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM producto",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th>Id</th>"+
					"<th>Nombre</th>"+
					"<th>Descripcion </th>"+
					"<th>Precio </th>"+
					"<th>Stock min </th>"+
					"<th>Stock max </th>"+
					"<th>Inventario </th>"+
					"<th>Clasificacion id</th>"+
					"<th>Categoria id</th>"+
					"<th>Subcategoria id</th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr>";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).descripcion + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).precio + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).stock_min + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).stock_max + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).inventario + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).clasificacionid + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).categoriaid + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).subcategoriaid + "</td>";
					cuerpo += "</tr>";
			}
			$("#producto").html(cabecera + cuerpo);

		}); 
	});
}


function mostrarmodi(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM producto",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th>Id</th>"+
					"<th>Nombre</th>"+
					"<th>Descripcion </th>"+
					"<th>Precio </th>"+
					"<th>Stock min </th>"+
					"<th>Stock max </th>"+
					"<th>Inventario </th>"+
					"<th>Clasificacion id</th>"+
					"<th>Categoria id</th>"+
					"<th>Subcategoria id</th>"+
					"<th>Modificar</th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr>";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).descripcion + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).precio + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).stock_min + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).stock_max + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).inventario + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).clasificacionid + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).categoriaid + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).subcategoriaid + "</td>";
					cuerpo += "<td><spam class='modificar glyphicon glyphicon-pencil' data-modificar='"+resultado.rows.item(i).id +"'>O</spam></td>";
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
		t.executeSql("SELECT * FROM producto",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th>Id</th>"+
					"<th>Nombre</th>"+
					"<th>Descripcion </th>"+
					"<th>Precio </th>"+
					"<th>Stock min </th>"+
					"<th>Stock max </th>"+
					"<th>Inventario </th>"+
					"<th>Clasificacion id</th>"+
					"<th>Categoria id</th>"+
					"<th>Subcategoria id</th>"+
					"<th>Eliminar</th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr>";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).descripcion + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).precio + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).stock_min + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).stock_max + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).inventario + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).clasificacionid + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).categoriaid + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).subcategoriaid + "</td>";
					cuerpo += "<td><spam  class='eliminar glyphicon glyphicon-trash' data-eliminar='"+resultado.rows.item(i).id +"'>X</spam></td>";
					cuerpo += "</tr>";
			}
			$("#delproducto").html(cabecera + cuerpo);
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
function mostrarcate(base){
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
function mostrarsub(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM subcategoria",[],function(t,resultado){
			var cabecera = "<option>Seleccione...</option>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<option value="+ resultado.rows.item(i).id +">"+resultado.rows.item(i).nombre +"</option>";
			}
			$("#subcategoriaid").html(cabecera + cuerpo);
		}); 
	});
}


function mostrarclasi1(base){
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
function mostrarcate1(base){
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
function mostrarsub1(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM subcategoria",[],function(t,resultado){
			var cabecera = "<option>Seleccione...</option>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<option value="+ resultado.rows.item(i).id +">"+resultado.rows.item(i).nombre +"</option>";
			}
			$("#subcategoriaid1").html(cabecera + cuerpo);
		}); 
	});
}



function limpiar(){
	$("#id").val(''),
	$("#nombre").val(''),
	$("#descripcion").val(''),
	$("#precio").val(''),
	$("#stock_min").val(''),
	$("#stock_max").val(''),
	$("#inventario").val('')
}


