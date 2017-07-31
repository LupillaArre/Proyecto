function getQuerystring(key, default_)
{
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}
var producto = getQuerystring('id');
var categoria = getQuerystring('id1');

$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);

	mostrar(base);
	mostrarproducto(base);
	

});

function mostrar(base){
	base.transaction(function(t){
	
		t.executeSql("SELECT * FROM categoria where id='"+categoria+"' ",[],function(t,resultado){
			
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo +=resultado.rows.item(i).nombre;
			}
			$("#categoria").html(cuerpo);

		}); 
	});
}
function newDocs() {
    window.location.assign("https://www.w3schools.com")
}
function mostrarproducto(base){
	var producto = getQuerystring('id');
var categoria = getQuerystring('id1');
	base.transaction(function(t){
	
		t.executeSql("SELECT * FROM producto where id='"+producto+"' ",[],function(t,resultado){
			
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo +="<div class=\"container\">";
					cuerpo +="<div class=\"single-info\">";
					cuerpo +="<div class=\"col-md-6 single-top wow fadeInLeft animated\" data-wow-delay=\".5s\">";
					cuerpo +="<div class=\"flexslider\">";
					cuerpo +="<ul class=\"slides\">";
					cuerpo +="<li>";
					cuerpo +="<div class=\"thumb-image\"> <img src=\"images/desarrolloweb_icono_carrito.png\" class=\"img-responsive\"></div>";
					cuerpo +="</li>";
					cuerpo +="</ul>";
					cuerpo +="</div>";
					cuerpo +="</div>";
					cuerpo +="<div class=\"col-md-6 single-top-left simpleCart_shelfItem wow fadeInRight animated\" data-wow-delay=\".5s\">";
					cuerpo +="<form >";
					cuerpo +="<h3 >"+resultado.rows.item(i).nombre+"</h3>";
					cuerpo +="<div class=\"single-rating\"></div>";
					cuerpo +="<h6  class=\"item_price\">$"+resultado.rows.item(i).precio+"</h6>";
					cuerpo +="<p>"+resultado.rows.item(i).descripcion+"</p>";
					cuerpo +="<div class=\"clearfix\"> </div>";
					cuerpo +="<div class=\"quantity\">";
					cuerpo +="<p class=\"qty\"> Cantidad :  </p><input type=\"number\" name=\"cantidad\" class=\"item_quantity\" min=\"1\" max="+resultado.rows.item(i).inventario+" value=\"0\">";
					cuerpo +="<input type=\"hidden\" value="+producto+" name=\"productoid\">";
					cuerpo +="</div>";
					cuerpo +="<div class=\"btn_form\">";
					var inven= resultado.rows.item(i).inventario;
					var inventario= parseInt(inven);
					if(inventario == 0){

					cuerpo +="<p><span class=\"text-danger\">Agotado</span></p>";
					cuerpo +="<button type=\"submit\" class=\"btn btn-fefault cart\" >Agregar al carrito</button>";

				}else{
					cuerpo +="<button type=\"submit\" class=\"btn btn-fefault cart\" >Agregar al carrito</button>";
				}
					cuerpo +="</div>";
					cuerpo +="<input type=\"hidden\" value="+resultado.rows.item(i).nombre;+" name=\"nombre\">";
					cuerpo +="<input type=\"hidden\" value="+resultado.rows.item(i).descripcion;+" name=\"descripcion\">";
					cuerpo +="<input type=\"hidden\" value="+resultado.rows.item(i).precio;+" name=\"precio\">";
					cuerpo +="<input type=\"hidden\" value="+resultado.rows.item(i).id;+" name=\"id\">";
					cuerpo +="</form>";
					cuerpo +="</div>";
					cuerpo +=" <div class=\"clearfix\"> </div>";
					cuerpo +="</div>";
					cuerpo +="<div class=\"collpse tabs\">";
					cuerpo +="<div class=\"panel-group collpse\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">";
					cuerpo +="<div class=\"panel panel-default wow fadeInUp animated\" data-wow-delay=\".5s\">";
					cuerpo +="<div class=\"panel-heading\" role=\"tab\" id=\"headingOne\">";
					cuerpo +="<h4 class=\"panel-title\">";
					cuerpo +="<a role=\"buttoDescripcionn\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"true\" aria-controls=\"collapseOne\">";
					cuerpo +="Descripcion";
					cuerpo +="</a>";
					cuerpo +="</h4>";
					cuerpo +="</div>";
					cuerpo +="<div id=\"collapseOne\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"headingOne\">";
					cuerpo +="<div class=\"panel-body\">";
					cuerpo +=resultado.rows.item(i).descripcion;
					cuerpo +="</div>";
					cuerpo +="</div>";
					cuerpo +="</div>";
					cuerpo +="</div>";
					cuerpo +="</div>";
					cuerpo +="<br>";
					cuerpo +="<br>";
					cuerpo +="</div>";

			}
			$("#vistapro").html(cuerpo);

		}); 
	});
}
