
function mostrarListaProductos(lista){

    let htmlContentToAppend = "";
    for (let product of lista) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <h4>` + product.currency + ` ` + product.cost +` </h4>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
                
            </a>
            `
        }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            lista = resultObj.data;
            mostrarListaProductos(resultObj.data);
        }
    });
 });
