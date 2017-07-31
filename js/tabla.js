function Tabla(id){
	this.id = id;
}
$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);

	mostrardetalle(base);

});

function objeto(){
	var table = new Tabla(

		parseInt($("#id").val())

		);
	return tabla;
}

function eliminar(id, base){
	base.transaction(function(t){
			t.executeSql("DELETE FROM detalle_venta WHERE id =" +id);
		});
}


function mostrardetalle(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM detalle_venta",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th><p align=\"center\">Nombre</p></th>"+
					"<th><p align=\"center\">Descripcion</p></th>"+
					"<th><p align=\"center\">Cantidad</p></th>"+
					"<th><p align=\"center\">Precio</p></th>"+
					"<th><p align=\"center\">Total</p></th>"+
					"<th><p align=\"center\">Eliminar</p></th>"+
				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr align=\"center\">";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).descripcion + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).cantidad + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).precio + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).total + "</td>";
					cuerpo += "<td><spam class='eliminar glyphicon glyphicon-trash' data-eliminar='"+resultado.rows.item(i).id +"'>X</spam></td>";
					cuerpo += "</tr>";
			}
			$("#tabla").html(cabecera + cuerpo);
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