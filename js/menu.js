$(document).ready(function(){
	var base = openDatabase('mybd','1.0','Base de datos',2 * 1024 * 1024);

	mostrardulces(base);
	mostrarbotanas(base);
	mostrarotros(base);

});

function mostrarbotanas(base){
	base.transaction(function(t){
		
		t.executeSql("SELECT * FROM categoria where clasificacionid='2' ",[],function(t,resultado){
			
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo +="<div class=\"col-sm-2 menu-grids menulist1\">";
					cuerpo+= "<ul class=\"multi-column-dropdown\">";
					cuerpo+= "<h4>";
					cuerpo += "<a href=\"producto.html?id="+resultado.rows.item(i).id+"\">" + resultado.rows.item(i).nombre + "</a><br>";
					cuerpo +="</h4>";
					cuerpo +="</ul>";
					cuerpo +="</div>";
			}
			$("#botanas").html(cuerpo);

		}); 
	});
}

function mostrarotros(base){
	base.transaction(function(t){
		
		t.executeSql("SELECT * FROM categoria where clasificacionid='3' ",[],function(t,resultado){
			
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo +="<div class=\"col-sm-2 menu-grids menulist1\">";
					cuerpo+= "<ul class=\"multi-column-dropdown\">";
					cuerpo+= "<h4>";
					cuerpo += "<a href=\"producto.html?id="+resultado.rows.item(i).id+"\">" + resultado.rows.item(i).nombre + "</a><br>";
					cuerpo +="</h4>";
					cuerpo +="</ul>";
					cuerpo +="</div>";
			}
			$("#otros").html(cuerpo);

		}); 
	});
}
function mostrardulces(base){
	base.transaction(function(t){
		
		t.executeSql("SELECT * FROM categoria where clasificacionid='1' ",[],function(t,resultado){
			
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo +="<div class=\"col-sm-2 menu-grids menulist1\">";
					cuerpo+= "<ul class=\"multi-column-dropdown\">";
					cuerpo+= "<h4>";
					cuerpo += "<a href=\"producto.html?id="+resultado.rows.item(i).id+"\">" + resultado.rows.item(i).nombre + "</a><br>";
					cuerpo +="</h4>";
					cuerpo +="</ul>";
					cuerpo +="</div>";
			}
			$("#dulces").html(cuerpo);

		}); 
	});
}