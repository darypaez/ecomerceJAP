var product = {};

function showImagesCarrusel(array){

let htmlContentToAppend = "";
let htmlContentToAppend2 ="";

for(let i = 0; i < array.length; i++){
    let imageSrc = array[i];

    if (i== 0) {
    htmlContentToAppend += `
    <div class="carousel-item active">
            <img src="`+imageSrc+`" alt="" width="350" height="200">
          </div>
    `
    }
    else{
        htmlContentToAppend += `
        <div class="carousel-item">
                <img src="`+imageSrc+`" alt="" width="350" height="200">
              </div>
        ` 
    }

    document.getElementById("carrousel2").innerHTML = htmlContentToAppend;

    if (i== 0) {
    htmlContentToAppend2 += `
    <li data-target="#demo" data-slide-to="0" class="active"></li>
    `
    }
    else {
        htmlContentToAppend2 += `
    <li data-target="#demo" data-slide-to="`+i+`"></li>
    `
    }

    document.getElementById("carrouselul").innerHTML = htmlContentToAppend2;
          
    
}
}


function mostrarListaComentarios(lista){
    let htmlContentToAppend2 = "";
    localStorage.removeItem("starValor");
    for (let coment of lista) {
            let score  = document.getElementById("estrellitas");
            let desc = document.getElementById("descComentario");
            let usuarioHTML = document.getElementById("user");
            let fecha = document.getElementById("date");
        
            score.innerHTML = calificaciones.score;
            usuarioHTML.innerHTML =calificaciones.user;
            fecha.innerHTML = calificaciones.dateTime;
            desc.innerHTML = calificaciones.description;


            let stars = '<div class="puntuacion" style="flex-direction: row;">';
            for (let index = 1; index <= 5; index++) {
                if (index <= coment.score){
                    stars += '<div><i class="fas fa-star" style= "color: #ffa400 !important"></i></div>';
                }
                else{
                    stars += '<div><i class="fas fa-star"></i></div>';
                }
            }
            stars += '</div>';
            htmlContentToAppend2 += `
                <div>
                ` +stars+`
                    <div>
                        <div class="d-flex w-100">
                            <h4 class="mb-1">`+ coment.user +`</h4>
                            <p style = "margin-left: 15px; margin-top:6px">` + coment.dateTime+` </p>
                        </div>
                        <p class="mb-1">` + coment.description + `</p>
                    </div>
                </div>
                
            </a>
            `
        }

        document.getElementById("comentariosjson").innerHTML = htmlContentToAppend2;
    }

    function insertarComentario(){
        var cali= localStorage.getItem("starValor");
        if (cali){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '-' + mm + '-' + yyyy + ' ' + today.getHours() + ":"  
            + today.getMinutes() + today.getSeconds();
            
            var comentario=document.getElementById("comentario").value;
            
            let stars = '<div class="puntuacion" style="flex-direction: row;">';
                for (let index = 1; index <= 5; index++) {
                    if (index <= cali){
                        stars += '<div><i class="fas fa-star" style= "color: #ffa400 !important"></i></div>';
                    }
                    else{
                        stars += '<div><i class="fas fa-star"></i></div>';
                    }
                }
                stars += '</div>';
            var htmlContentToAppend =`
            <div>
            ` +stars+`
                <div>
                    <div class="d-flex w-100">
                            <h4 class="mb-1">`+ localStorage.getItem("user") +`</h4>
                                <p style = "margin-left: 15px; margin-top:6px">` + today +` </p>
                        </div>
                            <p class="mb-1">` + comentario + `</p>
                        </div>`
            
            
            document.getElementById("comentariosjson").innerHTML += htmlContentToAppend;
            document.getElementById("comentario").value ="";
            let arr = document.getElementById("estrellas").querySelectorAll('.fa-star');

            for (let index = 0; index < 5; index++) {
                    arr[index].style.color= "#5f5050";                 
            }
            document.getElementById("valistar").style.display="none";
            localStorage.removeItem("starValor");
        }else{
            document.getElementById("valistar").style.display="block";
        }
    }

    //Obtengo el div estrellas y tomo como evento el click en las estrellas para pintar de amarillo 
    //desde la seleccionada para atras. Usando value de cada etrella. 
    document.getElementById("estrellas").addEventListener('click', evento =>{
        let starValor = evento.target.getAttribute('value');
        //guardo en local storage el valor de la estrella seleccionada
        localStorage.setItem("starValor", starValor);
        //dentro del div que tiene id estrellas obtengo todos los de clase fa star
        let arr = document.getElementById("estrellas").querySelectorAll('.fa-star');

        for (let index = 0; index < 5; index++) {
            if (starValor < arr[index].getAttribute('value')) {
                //pinto de gris la estrella de la posicion index
                arr[index].style.color= "#5f5050";           
            }else{
                //pinto de amarillo la estrella de la posicion index
                arr[index].style.color= "#ffa400";           
            }            
        }
    });

    //funcion para mostrar los productos relacionados obtenidos del arreglo de product info
function mostrarProductosRelacionados(similares,listadoProductos){
    var productSimilares =document.getElementById("productSimilar");
    let htmlContentToAppend="";
    //recorre todos los items del arreglo relatedproducts 
    for (let i=0; i<similares.length;i++) {
        relacionado = listadoProductos[similares[i]];
        
        htmlContentToAppend +=`<div class= "box-relacionados">
            <img src="` + relacionado.imgSrc + `" alt="` + relacionado.name + `" class="img-thumbnail" style="margin-top:5px">
            
                <h4>`+ relacionado.name +`</h4>
                
            <h2>` + relacionado.currency + + relacionado.cost +`</h2>
        
    </div>`
    }
    productSimilares.innerHTML = htmlContentToAppend;
    
   
}



//Funci??n que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    //Obtengo todos los productos de products 
    getJSONData(PRODUCTS_URL).then(function(resProduct){
        if (resProduct.status === "ok")
        {
            listadoProductos = resProduct.data;
        }
    })
    //Obtengo los datos del json product info y los agrego a la pag html
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCategoryHTML = document.getElementById("productCategory");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productCategoryHTML.innerHTML = "Categoria: " + product.category;
            productSoldCountHTML.innerHTML = product.soldCount + " Vendidos";

            //Llamo a la funcion que muestra las imagenes en forma de galer??a
            showImagesCarrusel(product.images);
            //Llamo funcion que muestra productos relacionados
            mostrarProductosRelacionados(product.relatedProducts, listadoProductos);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultComent){
        //Obtengo los datos del json de product info y los muestro
        if (resultComent.status === "ok")
        {
            calificaciones = resultComent.data;
            mostrarListaComentarios(calificaciones);
            
            

        }
    });


});
