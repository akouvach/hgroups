let desarrollo = true;

function obtenerBase(){
    let port="";
    let url=""
    if(desarrollo){
        port="5000";
        url = "http://localhost:" + port; 
    } else {

        url = "https://hgroups.herokuapp.com" ;
    }
    return (url);
}
let base = obtenerBase();


function mostrarJson(obj){


    var lugar=document.getElementById("resultados");
    var mensaje = "<div class='w3-responsive'>";

    mensaje += "<table class='w3-table-all'>";

    mensaje += "<caption>Usuarios del sistema</caption>";

    // hago un ciclo para colocar los titulos
    let titulos = obj[0];
    mensaje += "<thead><tr>";
    for(var j in titulos){
        mensaje += "<th>" + j + "</th>";
    }
    mensaje += "</tr></thead>";

    mensaje+="<tbody>";
    
    //ahora recorro todos los elementos del vector para poner los datos
    for (var i in obj) {
        mensaje += "<tr>";
        if(obj.hasOwnProperty(i)){
            let miObj = obj[i];
            for(var j in miObj){
                mensaje += "<td>" + miObj[j] + "</td>";
            }
        } 
        mensaje += "</tr>";
    }

    mensaje+="</tbody>";

    mensaje += "</table></div>";

    lugar.innerHTML = mensaje;
}


function mostrarUsuarios(){
    var url = base + "/usuarios";
    var misCabeceras = new Headers();

    console.log(url);
    var miInit = { method: 'GET',
                headers: misCabeceras,
                mode: 'cors',
                cache: 'default' };

    fetch(url,miInit)
    .then(function(response) {
        return response.json();
    })
    .then(function(miJson) {
        mostrarJson(miJson);
        
    });
}

function agregarUsuario(){

    var url = base + "/insertar";
    var data = {nombre: 'pepe',apellido:'gonzalez',email:'gonzalea@delpueblo.com',pais:'Argento'};

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        console.log('Success:', response);

    });

}

function borrarTodo(){
    var url = base + "/borrarTodo";

    fetch(url, {
        method: 'DELETE', // or 'PUT'
        body: "" // data can be `string` or {object}!

    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        console.log('Success:', response);
    });
}