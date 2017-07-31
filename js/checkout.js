function Checkout(id,nombre,descripcion,cantidad,precio){
	this.id = id;
	this.nombre = nombre;
	this.descripcion = descripcion;
	this.cantidad = cantidad;
	this.precio = precio;
	
	
}

$(document).ready(function(){


	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);
	var sql = "CREATE TABLE IF NOT EXISTS detalle_venta(id integer primary key ";
		sql += "autoincrement,nombre, descripcion,cantidad,precio,total)";
	base.transaction(function(t){
		t.executeSql(sql);
	});

	$("#guardar").click(function(){
		guardar(objeto(),base);
		//limpiar(); es marco no pasa nada
	});

});

function objeto(){
	var checkout = new Checkout(

		parseInt($("#id").val()),
		$("#nombre").val(),
		$("#descripcion").val(),
		$("#cantidad").val(),
		$("#precio").val()

		);
	return checkout;
}

function guardar(checkout,base){


		base.transaction(function(t){
			var sql = "INSERT INTO detalle_venta (nombre, descripcion,cantidad,precio,total)";
				sql += "VALUES (?,?,?,?,?)";
			var cant= checkout.cantidad;
			var precio= checkout.precio;
			var total=cant*precio; 
			t.executeSql(sql,
				[checkout.nombre, checkout.descripcion,cant,precio,total]
			);
		});
}
/*function guardar(){ 

	var nombreproducto=document.getElementById("nombre").value;

	var cantidadpedida=document.getElementById("cantidad").value;
	var cantpe= parseInt(cantidadpedida);

	var productoid=document.getElementById("id").value;

	base.transaction(function(t){
	
		t.executeSql("SELECT * FROM producto where id='"+productoid+"' ",[],function(t,resultado){
			for(var i = 0; i < resultado.rows.length; i++){

					var cateproducto =resultado.rows.item(i).categoriaid;
					var categoriaproducto= parseInt(cateproducto);
					var inve =resultado.rows.item(i).inventario;
					var inventario= parseInt(inve);

					if(inventario==0){
						alert ('No hay artículos en el inventario '); 
					}else{
						 base.transaction(function(t){
						 	 t.executeSql("SELECT * FROM detalle_venta WHERE nombre='"+nombreproducto+"'", [], function(t,resultado1) {
						 	 	if(cantpe==0){
						 	 		alert ('Debes tener al menos un producto seleccionado'); 
						 	 	}
						 	 	if(!resultado1){
						 	 		if(cantpe==0){
						 	 		alert ('Debes tener al menos un producto seleccionado'); 
						 	 		}
						 	 		var nombre=document.getElementById("nombre").value;
						 	 		var cantidad=document.getElementById("cantidad").value;
						 	 		var cant= parseInt(cantidad);
						 	 		var precio=document.getElementById("precio").value;
						 	 		var pre=Number(precio);
						 	 		var id=document.getElementById("id").value;
						 	 		var descripcion=document.getElementById("descripcion").value;
						 	 		var total=cant*pre;

						 	 		var totalinventario= inventario-cantpe;

						 	 		base.transaction(function(u){
									var sql4 = "UPDATE producto SET inventario = '"+totalinventario+"' WHERE id = '"+productoid+"'";
										u.executeSql(sql4);
									});
									base.transaction(function(i){
										var sql3 = "INSERT INTO categoria (nombre,descripcion,cantidad,precio,total)";
											sql3 += "VALUES (?,?,?,?,?)";
										i.executeSql(sql3,
											[nombre, descripcion.cantidad,precio,total]
										);
									});
									alert ('Se agrego tu artículo '); 
						 	 	}else{
						 	 		for(var a = 0; a < resultado.rows.length; a++){
						 	 			var id_venta= resultado.rows.item(i).id;
						 	 			var cant1= resultado.rows.item(i).cantidad;

						 	 			var cant2=document.getElementById("cantidad").value;
						 	 			var cant3=parseInt(cant2);

						 	 			var precio1=document.getElementById("precio").value;
						 	 			var pre1=Number(precio1);

						 	 			var cantidadtotal=cant1+cant3;
						 	 			var total2=pre1*cantidadtotal;

						 	 			var totalinventario= inventario-cantpe;

						 	 			base.transaction(function(w){
										var sql1 = "UPDATE producto SET inventario = '"+totalinventario+"' WHERE id = '"+productoid+"'";
											w.executeSql(sql1);
										});
										base.transaction(function(g){
										var sql2 = "UPDATE detalle_venta SET cantidad = '"+cantidadtotal+"' WHERE id = '"+id_venta+"'";
											g.executeSql(sql2);
										});
										alert ('Se agrego tu artículo '); 
						 	 		}
						 	 	}
						 	 });
					 });
				}
			}

		}); 
	});
}*/
