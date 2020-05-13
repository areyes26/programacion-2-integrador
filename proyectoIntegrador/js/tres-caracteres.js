window.addEventListener("load", function() {

  var queryString = location.search; //Capturamos la query string del navegador

  var searchParams = new URLSearchParams(queryString); //Obtenemos las posiciones y los datos de la queryString

  var busqueda = searchParams.get("busqueda");

  var tresCaracteres = document.querySelector('.uk-search-input')
  document.querySelector('.conenedor_buscador form').addEventListener('submit', function(event) {

    if (tresCaracteres.value.length < 3) {

      UIkit.notification({
        message: 'Ingrese al menos 3 caracteres',
        status: 'primary',
        pos: 'top-center',
        timeout: 3000
      });
      event.preventDefault();

    }
  })

//LOG IN (lo hago en este para no crear t linkear más archivos js)
var logForm = document.querySelector(".LogIn")
var nombre = document.querySelector("[name=nombre]")
var email = document.querySelector("[name=email]")

var nombreUsuario = "";

// validacion email
logForm.onsubmit = function(event){
var regaxEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if (nombre.value == "" || email.value == "") {
  event.preventDefault()
  UIkit.notification({
    message: 'Llene los dos campos por favor',
    status: 'primary',
    pos: 'top-center',
    timeout: 3000
   });
}
else if (regaxEmail.test(email.value) == false) {
 event.preventDefault()
 UIkit.notification({
   message: 'Ingrese una direccion de correo valida',
   status: 'primary',
   pos: 'top-center',
   timeout: 3000
  });
}
  guardarUsuarios()
}

//info log in

  function guardarUsuarios(){
    localStorage.setItem('nombre', nombre.value)
    localStorage.setItem('email', email.value)
  }
  obtenerUsuarios()
  function obtenerUsuarios(){
  nombreUsuario = localStorage.getItem("nombre")
  }

  var p_nombre = document.querySelector("#p_nombre")
  var logOUTButton = document.querySelector("#logOut")

  if (nombreUsuario !== "") {
    document.querySelector("#a_usuario").style.display = "none"
    logOUTButton.style.display = "block"
    p_nombre.innerText = nombreUsuario
        document.querySelector(".logedIn").style.display = "block"
  }

  function borrarUsuario(){
    localStorage.removeItem('nombre', nombre.value);
    localStorage.removeItem('email', email.value);
  }

  logOUTButton.onclick = function(){
    borrarUsuario();
    location.reload();
  }
// alert(nombreUsuario)
  if (nombreUsuario == null) {
    document.querySelector("#a_usuario").style.display = "block"
    logOUTButton.style.display = "none"
    document.querySelector(".logedIn").style.display = "none"
    p_nombre.innerText = "";

  }








})
