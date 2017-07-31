<!DOCTYPE html>
<html>
<head>
<title>Tienda de Dulces</title>
<script src="https://s.codepen.io/assets/libs/modernizr.js" type="text/javascript"></script>
<!-- for-mobile-apps -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Modern Shoppe Responsive web template, Bootstrap Web Templates, Flat Web Templates, Android Compatible web template, 
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
		function hideURLbar(){ window.scrollTo(0,1); } </script>
<!--//for-mobile-apps -->
<!--Custom Theme files -->
<link href="../../css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
<link href="../../css/style.css" rel="stylesheet" type="text/css" media="all" />
<link rel="stylesheet" href="../../css/flexslider.css" type="text/css" media="screen" />
<!--//Custom Theme files -->
<!--js-->
<script src="../../js/jquery-1.11.1.min.js"></script>
<script src="../../js/modernizr.custom.js"></script>
<!--//js-->
<!--cart-->
<script src="../../js/simpleCart.min.js"></script>
<!--cart-->
<!--web-fonts-->
<link href='//fonts.googleapis.com/css?family=Raleway:400,100,100italic,200,200italic,300,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic' rel='stylesheet' type='text/css'><link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>
<link href='//fonts.googleapis.com/css?family=Pompiere' rel='stylesheet' type='text/css'>
<link href='//fonts.googleapis.com/css?family=Fascinate' rel='stylesheet' type='text/css'>
<!--web-fonts-->
<!--animation-effect-->
<link href="../../css/animate.min.css" rel="stylesheet"> 
<script src="../../js/wow.min.js"></script>
	<script>
	 new WOW().init();
	</script>
<!--//animation-effect-->
<!--start-smooth-scrolling-->
<script type="text/javascript" src="../../js/move-top.js"></script>
<script type="text/javascript" src="../../js/easing.js"></script>	
<script type="text/javascript">
		jQuery(document).ready(function($) {
			$(".scroll").click(function(event){		
				event.preventDefault();
				$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
			});
		});
</script>
<script LANGUAGE="JavaScript">

		function confirmSubmit()
		{
		var agree=confirm("Est� seguro de eliminar este registro? Este proceso es irreversible.");
		if (agree)
		  return true ;
		else
		   return false ;
		}
		
		function modificarSubmit()
		{
		var agree=confirm("Est� seguro de modificar este registro? Este proceso es irreversible.");
		if (agree)
		  return true ;
		else
		   return false ;
		}

</script>

<!--//end-smooth-scrolling-->
</head>
<body>
	<!--header-->
	<div class="header">
		<div class="top-header navbar navbar-default"><!--header-one-->
			<div class="container">
				<div class="nav navbar-nav wow fadeInLeft animated" data-wow-delay=".5s">
					<p>Bienvenido </p>
        							
        		<a href="../../proceso-termino-sesion.jsp">Cerrar Sesion</a><br/>	
				</div>
				<div class="nav navbar-nav navbar-right social-icons wow fadeInRight animated" data-wow-delay=".5s">
					
				</div>
				<div class="clearfix"> </div>
			</div>
		</div>
		<div class="header-two navbar navbar-default"><!--header-two-->
			<div class="container">
				<div class="nav navbar-nav header-two-left">
				</div>
				<div class="nav navbar-nav logo wow zoomIn animated" data-wow-delay=".7s">
					<h1><a href="../../indexadmin.jsp">Tienda de <b><br>Dulces</br><b><span class="tag">Siempre con una sonrisa </span> </a></h1>
				</div>
				<div class="nav navbar-nav navbar-right header-two-right">
					<div class="header-right my-account"></div>
					<div class="header-right cart"><div class="cart-box">
					<div class="clearfix"> </div>
						</div>
					</div>
					<div class="clearfix"> </div>
				</div>
				<div class="clearfix"> </div>
			</div>
		</div>
		<div class="top-nav navbar navbar-default"><!--header-three-->
			<div class="container">
				<nav class="navbar" role="navigation">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
					</div>
					<!--navbar-header-->
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav top-nav-info">
							<li><a href="../../indexadmin.jsp" class="active">Inicio</a></li>
							<li><a href="indexcliente.jsp" class="active">Clientes</a></li>
							<li><a href="../Usuario/indexusuario.jsp">Usuarios</a></li>
							<li><a href="../Categoria/indexcat.jsp">Categor�a</a></li>
							<li><a href="../Subcategoria/indexsub.jsp">Subcategor�a</a></li>
							<li><a href="../Clasificacion/indexcla.jsp">Clasificaci�n</a></li>
							<li><a href="../Producto/indexpro.jsp">Productos</a></li>
						</ul> 
						<div class="clearfix"> </div>
						<!--//navbar-collapse-->
						<header class="cd-main-header">
							<ul class="cd-header-buttons">
								<li><a class="cd-search-trigger" href="#cd-search"> <span></span></a></li>
							</ul> <!-- cd-header-buttons -->
						</header>
					</div>
				</nav>
			</div>
		</div>
		<div class="container">
			<div>
				<ul class="nav nav-tabs">
				
					<li role="presentation" class="active"><a href="#list" class="text-center" data-toggle="tab">Lista</a></li>
					
		  			<li role="presentation"><a href="#baja" data-toggle="tab">Baja</a></li>
		  			
		  			
				</ul>
			</div>

			<div class="tab-content">
			
				<div class="tab-pane active" id="list">
				<br>
				<center>
			    <h2>DETALLE DE LOS CLIENTES</h2>
			    </center>
			    <br>
				<div class="table-responsive">
				
				</div>
				</div>
				<div class="tab-pane" id="baja">
				<div class="tab-pane active" id="list">
				<br>
				<center>
			    <h2>BAJA DE CLIENTES</h2>
			    </center>
			    <br>
				<div class="table-responsive">
				
				</div>
				</div>
				</div>
	
			</div>
		</div>
	<!--//header-->
	<br><br><br>

	<!--footer-->
	<div class="footer">
		<div class="container">
			<div class="footer-info">
				<div class="col-md-4 footer-grids wow fadeInUp animated" data-wow-delay=".5s">
					<h4 class="footer-logo"><a href="index.html">Tienda de <b>Dulces</b> <span class="tag">Siempre con una Sonrisa </span> </a></h4>
					<p>� 2017 Tienda de Dulces . Derechos Reservados | Dise�ado Por <a href="http://w3layouts.com" target="_blank">ICCSC</a></p>
				</div>
				<div class="col-md-4 footer-grids wow fadeInUp animated" data-wow-delay=".7s">
					<h3>Popular</h3>
					<ul>
						<li><a href="about.html">Acerca de</a></li>
						<li><a href="products.html">Nuevo</a></li>
						<li><a href="contact.html">Contactanos</a></li>
						<li><a href="faq.html">FAQ</a></li>
						<li><a href="checkout.html">Wishlist</a></li>
					</ul>
				</div>
				<div class="col-md-4 footer-grids wow fadeInUp animated" data-wow-delay=".9s">
					<h3>Suscribete</h3>
					<p>Para m�s informaci�n mandanos un correo<br> A la compa��a</p>
					<form>
						<input type="text" placeholder="Ingresar e-mal" required="">
						<input type="submit" value="Ir">
					</form>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
	<!--//footer-->		
	<!--search jQuery-->
	<script src="../../js/main.js"></script>
	<!--//search jQuery-->
	<!--smooth-scrolling-of-move-up-->
	<script type="text/javascript">
		$(document).ready(function() {
		
			var defaults = {
				containerID: 'toTop', // fading element id
				containerHoverID: 'toTopHover', // fading element hover id
				scrollSpeed: 1200,
				easingType: 'linear' 
			};
			
			$().UItoTop({ easingType: 'easeOutQuart' });
			
		});
	</script>
	<!--//smooth-scrolling-of-move-up-->
	<!--Bootstrap core JavaScript
    ================================================== -->
    <!--Placed at the end of the document so the pages load faster -->
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
  <script src='http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js'></script>
  <script src='http://cdnjs.cloudflare.com/ajax/libs/bootstrap-validator/0.4.5/js/bootstrapvalidator.min.js'></script>
  <script src="../../js/usuarios.js"></script>
    <script src="../../js/bootstrap.js"></script>
</body>
</html>