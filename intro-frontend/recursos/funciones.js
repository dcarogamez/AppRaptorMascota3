// alert("Hola mundo!")

let colores =["blue","gray", "white", "red","purple","yellow","black","orange","green","brown"];

function cambiarFondo(){
    let indice = parseInt(Math.random()*10)-1;
    let color = colores[indice]
    document.querySelector("body").style.background = color;
    let mensaje =document.querySelector("#txtMensaje").value;
    document.querySelector("#miDivision").innerHTML = mensaje;
}

/*
setInterval(()=> {
    cambiarFondo()
},2000)*/