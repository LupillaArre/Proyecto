function Checkout(nombre,descripcion,cantidad,precio){
	this.nombre = nombre;
	this.descripcion = descripcion;
	this.cantidad = cantidad;
	this.precio = precio;
}

$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);
	var sql = "CREATE TABLE IF NOT EXISTS detalle_venta(id integer primary key ";
		sql += "autoincrement,nombre,descripcion,cantidad,precio,total)";
	base.transaction(function(t){
		t.executeSql(sql);
	});
	
	$("#guardar").click(function(){
		//guardar(objeto(),base);
		alerta();
		//limpiar();
	});
	
});

function objeto(){
	var checkout = new Checkout(

		$("#nombre").val(),
		$("#descripcion").val(),
		$("#cantidad").val(),
		$("#precio").val()

		);
	return checkout;
}
function alerta(){
	alert("dsdfds");
}
function guardar(checkout,base){

	if(checkout.nombre != ''){
		base.transaction(function(t){
			var sql = "INSERT INTO detalle_venta(nombre,descripcion,cantidad,precio,total)";
				sql += "VALUES (?,?,?,?,?)";
			var descripcion=document.getElementById("descripcion").value;
			var nomb=checkout.nombre;
			var cantidad=document.getElementById("cantidad").value;
			var precio=document.getElementById("precio").value;
			var c=cantidad;
			var total=c*precio;
			t.executeSql(sql,
				[nomb,descripcion,c,precio,total]
			);
			location.href='index.html';
		});
	}else{
		alert("Algunos campos son necesarios");
	}
}
