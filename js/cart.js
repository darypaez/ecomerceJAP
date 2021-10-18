let productosCarrito=[];

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(cart){
        if (cart.status === "ok")
        {
            productosCarrito = cart.data.articles;
            showCarrito();
        }
    })
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
        subtotal += costo*cant;
        totalCant+= cant;
    }
    document.getElementById("subtotal").innerHTML = "UYU "+ subtotal;
    document.getElementById("title-cart").innerHTML ="Carrito ("+ totalCant + " items)";
    document.getElementById("sub-resumen").innerHTML ="$ "+ subtotal;  
    document.getElementById("total-resumen").innerHTML ="$ "+ subtotal;  
}



/*modificar la función showCarrito para que aparezca el subtotal del producto en base a la cantidad y precio unitario*/
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
        <td class="align-middle"><input type="number" min ="1" value=${parseInt(article.count)} id ="${i}" onchange ="updateProductoSubtotal()"></td>
        <td class="align-middle" id ="${"subtotal"+i}">${article.currency} ${parseInt(article.unitCost) * parseInt(article.count)}</td>
        </tr>`
        i++;
       subtotal += parseInt(article.count) * parseInt(article.unitCost);
       totalCant+= article.count;
    }
    document.getElementById("carrito").innerHTML = htmlToAppend;
    document.getElementById("subtotal").innerHTML = "UYU "+subtotal;
    
    document.getElementById("title-cart").innerHTML ="Carrito ("+ totalCant + " items)";
    document.getElementById("sub-resumen").innerHTML = "$ "+subtotal; 
    document.getElementById("total-resumen").innerHTML ="$ "+ subtotal;  
 
}


