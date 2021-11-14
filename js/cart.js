let productosCarrito=[];
let porcentEnvio= 0;
let moneda = "UYU"; //inicialmente la pag se recarga en pesos

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(cart){
        if (cart.status === "ok")
        {
            productosCarrito = cart.data.articles;
            showCarrito();
        }
    })
    //evento de click en el simbolo de pesos, pasa el subtotal y total a pesos
    document.getElementById("pesos").addEventListener("click", function(){
        moneda = "UYU";
        updateProductoSubtotal();
    });
    
    //evento de click en el simbolo de dolares, pasa el subtotal y total a dolares
    document.getElementById("dolares").addEventListener("click", function(){
        moneda = "USD";
        updateProductoSubtotal();
    });

        //evento change al seleccionar envio premium; calcula costo de envio y se ve reflejado en el costo
        //de envio y lo suma al total
    document.getElementById("premium").addEventListener("change", function(){
        porcentEnvio = 0.15;
        updateProductoSubtotal();
    });
    
     //evento change al seleccionar envio express, calcula costo de envio y se ve reflejado en el costo
        //de envio y lo suma al total
    document.getElementById("express").addEventListener("change", function(){
        porcentEnvio = 0.07;
        updateProductoSubtotal();
    });

     //evento change al seleccionar envio standard; calcula costo de envio y se ve reflejado en el costo
        //de envio y lo suma al total
    document.getElementById("standard").addEventListener("change", function(){
        porcentEnvio = 0.05;
        updateProductoSubtotal();
    });

    //evento change, cuando selecciono transferencia me habilita los campos de la misma si estaban desahibilitados
    //y deshabilita los de tarj de credito
    document.getElementById("transf").addEventListener("change", function(){
        document.getElementById("num-tarjeta").disabled= true;
        document.getElementById("cvv-tarjeta").disabled = true;
        document.getElementById("vencimiento-tarjeta").disabled = true;
        if (document.getElementById("num-cuenta").disabled){
            document.getElementById("num-cuenta").disabled= false;
        }
    });

    //evento change, cuando selecciono tarjeta de credito me habilita los campos de la misma si estaban desahibilitados
    //y deshabilita los de transferencia
    document.getElementById("credit-card").addEventListener("change", function(){
        if (document.getElementById("num-tarjeta").disabled){
            document.getElementById("num-tarjeta").disabled= false;
        }
        if (document.getElementById("cvv-tarjeta").disabled){
            document.getElementById("cvv-tarjeta").disabled= false;
        }
        if (document.getElementById("vencimiento-tarjeta").disabled){
            document.getElementById("vencimiento-tarjeta").disabled= false;
        }
        document.getElementById("num-cuenta").disabled = true;
    });
});


 

/*completa la función para actualizar el subtotal del producto al modificar la cantidad del mismo*/
function updateProductoSubtotal(){
    let costo = 0;
    let cant = 0;
    let subtotal = 0;
     totalCant= 0;
    
    for (let i =0; i< productosCarrito.length; i++){
        costo = productosCarrito[i].unitCost;
        cant = parseInt(document.getElementById(i).value);
        document.getElementById("subtotal"+i).innerHTML = productosCarrito[i].currency +" "+ costo*cant;
        if(moneda === "UYU"){
            if(productosCarrito[i].currency == "USD"){
                subtotal += costo*40*cant;
            }
            else
            subtotal += costo*cant;
        }
        if(moneda === "USD"){
            if(productosCarrito[i].currency == "UYU"){
                subtotal += costo/40*cant;
            }
            else
            subtotal += costo*cant;
        }
        totalCant+= cant;
    }
    //agrego estas dos variables para entrega 7 para poner el total en la linea 55
    let envio = subtotal*porcentEnvio; 
    let total = subtotal+envio;
    //agrego el costo de envio en la seccion envio , antes decía gratis
    if (moneda === "UYU"){
        if (envio==0){
            document.getElementById("costo-envio").innerHTML ="Seleccione una opción"
        }
        else{
            document.getElementById("costo-envio").innerHTML = "UYU "+ Math.round(envio);
        }
        
        document.getElementById("subtotal").innerHTML = "UYU "+ subtotal;
        document.getElementById("sub-resumen").innerHTML ="UYU "+ subtotal;  
        document.getElementById("total-resumen").innerHTML ="UYU "+ Math.round(total); 
    }
    else{
        if (envio==0){
            document.getElementById("costo-envio").innerHTML ="Seleccione una opción"
        }
        else{
            document.getElementById("costo-envio").innerHTML = "USD "+ Math.round(envio);
        }
        
        document.getElementById("subtotal").innerHTML = "USD "+ subtotal;
        document.getElementById("sub-resumen").innerHTML ="USD "+ subtotal;  
        document.getElementById("total-resumen").innerHTML ="USD "+ Math.round(total); 
    }
    document.getElementById("title-cart").innerHTML ="Carrito ("+ totalCant + " items)";
     
}


//muestra los articulos del json calculando sub total y total
function showCarrito(){

    /*mostrar los productos del carrito con el input correspondiente a la cantidad*/
    let htmlToAppend = "";
    let i = 0;
    let subtotal = 0;
    let totalCant=0;
    for(let article of productosCarrito){
        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle">${article.currency} ${parseInt(article.unitCost)}</td>
        <td class="align-middle"><input type="number" min ="1" value=${parseInt(article.count)} id ="${i}" onchange ="updateProductoSubtotal()">
        <buttom type="button" class="btn" onclick="eliminarProducto(${i})"><i class="fa fa-trash" aria-hidden="true"></i></buttom>

        </td>
        <td class="align-middle" id ="${"subtotal"+i}">${article.currency} ${parseInt(article.unitCost) * parseInt(article.count)}</td>
        </tr>`
        i++;
        subtotal += parseInt(article.count) * parseInt(article.unitCost);
       totalCant+= article.count;
    }

    /*if(${article.currency} == "USD"){
        subtotal += parseInt(article.count) * parseInt(article.unitCost) *40; 
           }
        else{
        subtotal += parseInt(article.count) * parseInt(article.unitCost);
        }*/
    document.getElementById("carrito").innerHTML = htmlToAppend;
    document.getElementById("subtotal").innerHTML = "UYU "+subtotal;
    //cuando muestro los productos , no tengo seleccionado metodo de envio entonces pongo que elija una opcion
    document.getElementById("costo-envio").innerHTML ="Seleccione una opción"
    document.getElementById("title-cart").innerHTML ="Carrito ("+ totalCant + " items)";
    document.getElementById("sub-resumen").innerHTML = "$ "+subtotal; 
    document.getElementById("total-resumen").innerHTML ="$ "+ subtotal;  
 
}

//funcion para chequear que estén los campos de envio llenados antes de proceder al pago
function validarEnvio(){
    
    let inputEmpty;
        
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
          form.classList.add('was-validated');
         
        },
         false);
         
        var tipoEnvio = document.getElementsByName('envio');
        var chequeado = false;
        for ( var i = 0; i < tipoEnvio.length; i++) {
            if(tipoEnvio[i].checked) {
                chequeado = true;
                break;
            }
}
let inputCalle = document.getElementById("calle-envio").value != "";
let inputNum = document.getElementById("num-envio").value != "";
let inputEsq = document.getElementById("esq-envio").value != "";
inputEmpty = inputCalle && inputNum && inputEsq;
//si no selecciono envio sale alert
if(!chequeado)   { 
    alert("Seleccione un tipo de envío"); 
}    

    //si seleccioné envio y llene los campos de la la direccion se abre el modal del pago
    if (chequeado && inputEmpty ){
      $('#exampleModalCenter').modal('show');
    }

/*let envioExpress = document.getElementById("express");
let envioPremium = document.getElementById("premium");
let envioStandard = document.getElementById("standard");
if (!envioExpress.checked || !envioPremium.checked || !envioStandard.checked){
    alert("Seleccione un tipo de envío"); 
 
    if (porcentEnvio ==0){
        alert("Seleccione un tipo de envío"); 

    }
}*/



}
//finalizar compra, muestra que se realizo con exito y cierra modal
function FinalizarCompra(){
  $('#exampleModalCenter').modal('hide');
  alert("Compra realizada con exito");
}

//cerrar modal
function Cerrar(){
  $('#exampleModalCenter').modal('hide');
}

//funcion para eliminar un producto del carrito , lo saco del arreglo , calculo el subtotal de nuevo y muestro
function eliminarProducto(borrar){
    productosCarrito.splice(borrar,1);
    updateProductoSubtotal();
    showCarrito();
}


//funcion que valida que los campos del metodo de pago seleccionado tengan valor
function validarPago(){
  
  let transfBanc = document.getElementById("transf");
  let tarjcredito = document.getElementById("credit-card");
    if(tarjcredito.checked){
      let numtarj = document.getElementById("num-tarjeta").value !== "";
      let cvvtarj = document.getElementById("cvv-tarjeta").value !== "";
      let venctarj = document.getElementById("vencimiento-tarjeta").value !== "";
      let tarj = document.getElementById("vencimiento-tarjeta");
      if (numtarj && cvvtarj && venctarj){
        FinalizarCompra();
      }
      else{
      alert("Complete los datos de la tarjeta de credito");
      }

    }
    else{
      if(transfBanc.checked){
        let banco = document.getElementById("num-cuenta").value !== "";
        if (banco){
          FinalizarCompra();
        }
        else{
          alert("Complete el numero de cuenta bancaria");
        }
      }
      else{
        alert("Seleccione un tipo de pago");
      }
    }
  


}
