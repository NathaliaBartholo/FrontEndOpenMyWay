
let chartQuantityPerKind;
let chartTotalQuantity;

let arrCategories = [];

window.onload = function () {
    
    chartQuantityPerKind = new CanvasJS.Chart("chartQuantityPerKind", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Quantidade por tipo"
        },
        axisY: {
            title: "Quantidade"
        },
        data: [{        
            type: "column",  
            showInLegend: true,             
            legendMarkerColor: "black",
            legendText: "Tipos(Categorias)",
            dataPoints: [      
                { y: 120, label: "Alimentação" },
                { y: 89,  label: "Saude" },                
            ]
        }]

    });
    
    chartQuantityPerKind.render();
}


function getAll(){
    let urlBase = "https://script.google.com/macros/s/AKfycbx5n3DVrYufZ1cxSJE6UKXvSn6lfhGagHgCiyFjzIkrhCto27Q/exec";
    
    let quantity;

    let promisse = window.fetch(urlBase)
           .then(function(response) {
               return response.json();
               
           
           }).then(function(body) {
                
                quantity =  Object.keys( body ).length;
                
                for(let c=0; c< quantity; c++){
                    arrCategories[c] = body[c].categoria;
                }

               //document.body.innerHTML = body[1];
               
           });
}
