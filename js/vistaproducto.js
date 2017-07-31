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
var categoria = getQuerystring('id');
var categoria1 = getQuerystring('id');
var categoria2 = getQuerystring('id');

$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);
	var sql = "CREATE TABLE IF NOT EXISTS detalle_venta(id integer primary key ";
		sql += "autoincrement,nombre, descripcion,cantidad,precio,total)";
	base.transaction(function(t){
		t.executeSql(sql);
	});


	$("#guardar").click(function(){
		newDocs();
		//limpiar(); es marco no pasa nada
	});

	mostrar(base);
	mostrarpro(base);
	mostrarcate(base);
	mostrarcatego(base);
	//mostrardos(base);

});

function newDocs() {
    window.location.assign("https://www.w3schools.com")
}

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
function mostrarcate(base){
	base.transaction(function(t){
	
		t.executeSql("SELECT * FROM categoria where id='"+categoria+"' ",[],function(t,resultado){
			
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo +="<li><a>"+resultado.rows.item(i).nombre+"</a>";
			}
			$("#mostrarcate").html(cuerpo);

		}); 
	});
	
}
function mostrarcatego(base){ 
	base.transaction(function(t){
	
		t.executeSql("SELECT * FROM subcategoria where categoriaid='"+categoria+"' ",[],function(t,resultado){
			
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){

					cuerpo +="<li class=\"subitem1\"><a href=\"filtro.html?id="+resultado.rows.item(i).id+"&&id1="+resultado.rows.item(i).categoriaid+"\">&ensp;&ensp;&ensp;"+resultado.rows.item(i).nombre+"</a></li>";
			}
			$("#mostrarcatego").html(cuerpo);

		}); 
	});
	
}
function mostrarpro(base){
	base.transaction(function(t){
	
		t.executeSql("SELECT * FROM producto where categoriaid='"+categoria1+"' ",[],function(t,resultado){
			
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){

					cuerpo +="<div class=\"product-grids simpleCart_shelfItem wow fadeInUp animated\" data-wow-delay=\".5s\">";
					cuerpo +="<div class=\"new-top\">";
					cuerpo +="<a href=\"vista.html?id="+resultado.rows.item(i).id+"&&id1="+resultado.rows.item(i).categoriaid+"\"><img src=\"images/desarrolloweb_icono_carrito.png\" class=\"img-responsive\" /></a>";
					cuerpo +="<div class=\"new-text\">";
					cuerpo +="<ul>";
					cuerpo +="<form action=\"\" method=\"POST\">";
					cuerpo +="<li><a href=\"vista.html?id="+resultado.rows.item(i).id+"&&id1="+resultado.rows.item(i).categoriaid+"\"> Vista Previa</a></li>";
					var a=resultado.rows.item(i).inventario;
					var inventari= parseInt(a);
					cuerpo +="<li><input type=\"number\" id=\"cantidad\" name=\"cantidad\" class=\"item_quantity\" min=\"1\" max="+inventari+" value=\"0\"></li>";
					cuerpo +="<input type=\"text\" id=\"nombre\" value="+resultado.rows.item(i).nombre+" name=\"nombre\">";
					cuerpo +="<input type=\"hidden\" id=\"descripcion\" value="+resultado.rows.item(i).descripcion+" name=\"descripcion\">";
					cuerpo +="<input type=\"hidden\" id=\"precio\" value="+resultado.rows.item(i).precio+" name=\"precio\">";
					cuerpo +="<input type=\"hidden\" id=\"ida\" value="+resultado.rows.item(i).id+" name=\"id\">";
					cuerpo +="<li><button id=\"guardar\" type=\"submit\" class=\"btn btn-fefault cart\">Añadir al carrito</button></li>";	 
					//cuerpo +='<li><a  id="prueba" class="item_add" href="checkout.html?id='+resultado.rows.item(i).id+'&&nombre='+resultado.rows.item(i).nombre+'&&descripcion='+resultado.rows.item(i).descripcion+'&&precio='+resultado.rows.item(i).precio+'">Agregar al carrito</a></li>';
					//cuerpo +="<li><button onClick=\"myFunction()\">Agregar al carrito</button></li>";
					//cuerpo +='<li><a onclick="myFunction()" href="checkout.html" class="item_add">Agregar al carrito</a></li>';
					cuerpo +="</form>";
					cuerpo +="</ul>";
					cuerpo +="</div>";
					cuerpo +="</div>";
					cuerpo +="<div class=\"new-bottom\">";
					cuerpo +="<h5><a class=\"name\" href=\"vista.html?id="+resultado.rows.item(i).id+"&&id1="+resultado.rows.item(i).categoriaid+"\">"+resultado.rows.item(i).nombre+"</a></h5>";
					cuerpo +="<div class=\"ofr\">";
					var inven= resultado.rows.item(i).inventario;
					var inventario= parseInt(inven);
					if(inventario == 0){
					cuerpo +="<p><span class=\"item_price\">$"+resultado.rows.item(i).precio+"</span></p>";
					cuerpo +="<p><span class=\"text-danger\">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;Agotado</span></p>";
				}else{
					cuerpo +="<p><span class=\"item_price\">$"+resultado.rows.item(i).precio+"</span></p>";
				}
					cuerpo +="</div>";
					cuerpo +="</div>";
					cuerpo +="</div>";
			}
			$("#mostrarproductos").html(cuerpo);

		}); 
	});
}



