    
    
    // Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }else{
            RegistarCliente();
            event.preventDefault()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

function RegistarCliente(){
    
    let nombres = document.querySelector("txtNombre").value;
    let apellidos = document.querySelector("txtApellido").value;
    let correo = document.querySelector("txtCorreo").value;
    let telefono = document.querySelector("txtTelefono").value;

    let url =`http://localhost:3000/clientes`;
    let datos ={
        nombre: nombres,
        apellido: apellidos,
        correo: correo,
        telefono1 : telefono

    };

    fetch(url, {
        method:'POST',
        body: JSON.stringify(datos),
        headers:{
            'Conten-Type':'aplication/json'
        }
    }).then(res =>{
        console.log(mensaje)
    })

}

