$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);

	mostrar(base);
	

});

function mostrar(base){
	base.transaction(function(t){
	
		t.executeSql("SELECT * FROM producto ",[],function(t,resultado){
			
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo +="<div class=\"col-md-3 gallery-grid wow flipInY animated\" data-wow-delay=\".5s\">";
					cuerpo+= "<a href=\"vista.html?id="+resultado.rows.item(i).id+"&&id1="+resultado.rows.item(i).categoriaid+"\">";
					cuerpo +="<img src=\"images/desarrolloweb_icono_carrito.png\" class=\"img-responsive\"/>";
					cuerpo+="</a>";
					cuerpo+= "<div class=\"gallery-text simpleCart_shelfItem\">";
					cuerpo += "<h5>";
					cuerpo +="<a href=\"vista.html?id="+resultado.rows.item(i).id+"&&id1="+resultado.rows.item(i).categoriaid+"\" class=\"name\">"+resultado.rows.item(i).nombre+"</a>";
					cuerpo +="</h5>";
					cuerpo +="<p><span class=\"item_price\">$"+resultado.rows.item(i).precio+"</span></p>";
					cuerpo +="</div>";
					cuerpo +="</div>";
			}
			$("#productos").html(cuerpo);

		}); 
	});
}
