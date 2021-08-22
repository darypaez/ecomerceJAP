//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


  // Panda Eye move
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
  
  // validation
  
  
  $('.btn').click(function(){
    $('form').addClass('wrong-entry');
      setTimeout(function(){ 
         $('form').removeClass('wrong-entry');
       },3000 );
  });
