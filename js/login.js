

  // Funcion para que el panda mueva los ojos al mover el cursor
  $(document).on( "mousemove", function( event ) {
    var dw = $(document).width() / 15;
    var dh = $(document).height() / 15;
    var x = event.pageX/ dw;
    var y = event.pageY/ dh;
    $('.eye-ball').css({
      width : x,
      height : y
    });
  });
  
 
  // validacion
  function guardarUsuario(){
    let nombre = document.getElementById("usuario").value;
          localStorage.setItem("user", nombre);
          window.location.href="home.html";
  }

  //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  if (nombre) {
    document.getElementById("nombreUsuario").innerHTML += localStorage.getItem("user")
  }
  
  });

  /*
  $('.btn').click(function(){
    $('form').addClass('wrong-entry');
      setTimeout(function(){ 
         $('form').removeClass('wrong-entry');
       },3000 );
  });
*/


