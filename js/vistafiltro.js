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
var categoria = getQuerystring('id1');
var subcategoria1 = getQuerystring('id');
var categoria2 = getQuerystring('id');

$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);

	mostrar(base);
	mostrarpro(base);
	mostrarcate(base);
	mostrarcatego(base);
	mostrardos(base);



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

function mostrarpro(base){
	base.transaction(function(t){
	
		t.executeSql("SELECT * FROM producto where subcategoriaid='"+subcategoria1+"' ",[],function(t,resultado){
			
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo +="<div class=\"product-grids simpleCart_shelfItem wow fadeInUp animated\" data-wow-delay=\".5s\">";
					cuerpo +="<div class=\"new-top\">";
					cuerpo +="<a href=\"vista.html?id="+resultado.rows.item(i).id+"&&id1="+resultado.rows.item(i).categoriaid+"\"><img src=\"images/desarrolloweb_icono_carrito.png\" class=\"img-responsive\" /></a>";
					cuerpo +="<div class=\"new-text\">";
					cuerpo +="<ul>";
					cuerpo +="<form>";
					cuerpo +="<li><a href=\"vista.html?id="+resultado.rows.item(i).id+"&&id1="+resultado.rows.item(i).categoriaid+"\"> Vista Previa</a></li>";
					cuerpo +="<li><input type=\"number\" name=\"cantidad\" class=\"item_quantity\" min=\"1\" max="+resultado.rows.item(i).inventario+" value=\"0\"></li>";
					cuerpo +="<li><button type=\"submit\" class=\"btn btn-fefault cart\">Agregar al carrito</button></li>";
					cuerpo +="<input type=\"hidden\" value="+resultado.rows.item(i).nombre+" name=\"nombre\">";
					cuerpo +="<input type=\"hidden\" value="+resultado.rows.item(i).descripcion+" name=\"descripcion\">";
					cuerpo +="<input type=\"hidden\" value="+resultado.rows.item(i).precio+" name=\"precio\">";
					cuerpo +="<input type=\"hidden\" value="+resultado.rows.item(i).id+" name=\"id\">";
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


//Consulta con otra consulta adentro//
/*function mostrardos(base){
	var nom="";
	var nom1="";
	base.transaction(function(t){
	
		t.executeSql("SELECT * FROM producto where id='1' ",[],function(t,resultado){
			var cuerpo = "ss";
			for(var i = 0; i < resultado.rows.length; i++){

					var nombre =resultado.rows.item(i).id;
					var nombre1 =resultado.rows.item(i).nombre;


						base.transaction(function(t){

							t.executeSql("SELECT * FROM categoria where id='"+nom+"' ",[],function(t,resultado){
							var cuerpo = "";
							for(var i = 0; i < resultado.rows.length; i++){

									var cuerpo =resultado.rows.item(i).nombre;
									
							}		
							$("#dos").html(nom+cuerpo+nom1);
						}); 
					});
			}

				nom=nombre;
				nom1=nombre1;
		}); 
	});

}
*/



								
								
								