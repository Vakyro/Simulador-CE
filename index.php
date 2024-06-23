<?php
  include("configuracion.php");
  $accion = (isset($_GET['accion'])) ? $_GET['accion'] : null;

  include(HEADER); 

  switch ($accion) {

    case 'Simulador':
      include("Simulador.php");
      break;

    default:
      include("Home.php");
      break;
  }

  include(FOOTER); 
?>