let fotoCargada = "";
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    //Si es undefined carga la pagina normal, es decir los imput vacios
 if (localStorage.getItem("datosPerfil") !== undefined){
    //Si en localstorage datosperfil ya tengo los campos llenados me los deja escrito en el imput
    //lo que habia guardado previamente.
    let perfil = JSON.parse(localStorage.getItem("datosPerfil"));
    document.getElementById("primerNombre").value = perfil.nombre1;
    document.getElementById("segundoNombre").value = perfil.nombre2;
    document.getElementById("primerApellido").value = perfil.apellido1;
    document.getElementById("segundoApellido").value = perfil.apellido2;
    document.getElementById("correo").value = perfil.correo;
    document.getElementById("numContacto").value = perfil.tel;
    document.getElementById("edad").value = perfil.edad;
    document.getElementById("foto-perfil").src = perfil.foto;
 }
});

//Funcion que se ejecuta al apretar boton de guardar cambios
function guardarCambios(){
    
    //obtengo los value de cada imput 
    let foto = document.getElementById("foto-perfil").src;
    let primerNombre = document.getElementById("primerNombre").value;
    let segundoNombre = document.getElementById("segundoNombre").value;
    let primerApellido = document.getElementById("primerApellido").value;
    let segundoApellido = document.getElementById("segundoApellido").value;
    let correo = document.getElementById("correo").value;
    let numContacto = document.getElementById("numContacto").value;
    let edad = document.getElementById("edad").value;
    if (fotoCargada){
        foto = fotoCargada;
    }

    //creo objeto con los datos ingresados 
    var datosPerfil = {
        "nombre1" : primerNombre,
        "nombre2" : segundoNombre,
        "apellido1" : primerApellido,
        "apellido2" : segundoApellido,
        "correo" : correo,
        "edad" : edad,
        "tel" : numContacto,
        "foto" : foto
    };
    
    // seteo en localstorage datosperfil pasado a texto
    localStorage.setItem("datosPerfil", JSON.stringify(datosPerfil));

}

function cargarImagen(){
    let file = document.getElementById("imagefile").files[0];
          let reader = new FileReader();
    
          // Closure to capture the file information.
          if (file){
              reader.readAsDataURL(file);
          }
          reader.onloadend = function() {
              
            fotoCargada = reader.result;
          }
    
}