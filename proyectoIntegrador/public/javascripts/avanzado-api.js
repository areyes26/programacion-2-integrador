window.onload = function() {


  console.log("Hola ");
  fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=c0e01d0df95b98b689dcb3af16007742&language=en-US")
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function(datos) {
      console.log(datos);
      var buscador = document.querySelector(".avana");
      var label1 = document.querySelector(".incluir");
      var label2 = document.querySelector(".excluir");

      var gnre = datos.genres;


      for (var i = 0; i < gnre.length; i++) {
        label1.innerHTML += '<option value="' + datos.genres[i].id + '">' + datos.genres[i].name + '</option>'
        label2.innerHTML += '<option value="' + datos.genres[i].id + '">' + datos.genres[i].name + '</option>'
      }
    })

  //validacion
  var form = document.querySelector(".avana");
  var select1 = document.querySelector(".incluir");
  var select2 = document.querySelector(".excluir");
  var input = document.querySelector("input[name=año]");

  var option1Selected = select1.selectedIndex;
  var option2Selected = select2.selectedIndex;
  console.log(select1.options);
  console.log(option1Selected);


  form.onsubmit = function(event) {
    if (select1.options[select1.selectedIndex].value == 0 && select2.options[select2.selectedIndex].value == 0 && input.value == "") {
      event.preventDefault();
      UIkit.notification({
        message: 'Complete algun campo',
        status: 'primary',
        pos: 'top-center',
        timeout: 3000
      });
    } else if (select1.options[select1.selectedIndex].value != 0 && select2.options[select2.selectedIndex].value != 0) {
      event.preventDefault();
      UIkit.notification({
        message: 'No puede elegir 2 Géneros a la vez',
        status: 'primary',
        pos: 'top-center',
        timeout: 3000
      });
    }
  }





};
