let db = require("../../database/models");
let sequelize = db.sequelize;
let usuario = {
usuario_genero : window.addEventListener("load", function() {
    //Esto buscando el nombre del genero favorito de la base de datos del usuario, para hace tengo que llamar al api de generos
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=7246c48f98d8db92d443b21af0633a14&language=en-US")
     .then(function(respuesta) {
       return respuesta.json();
     })
     .then(function(datos) {
       console.log(datos);
      //Esto es para imprimir el dato del id
    var id = sequelize.query("SELECT genre_ id FROM users where user_id = 10" )
    if ( id == datos.genres.id) {
     var losgeneros = "";
    for (var i = 0; i < gnre.length; i++) {
      //ACA LE IMPRIME EL GENERO Y LO REDIRIGE A LA PAGINA DE SU GENERO FAVORITO
      losgeneros += ' <a href="/series_xgenero?id=' + datos.genres[i].id + '">' + datos.genres[i].name + '</a> '

    }
  }
  else {
//var genero_favorito = document.querySelector(".genero_favorito"); 
//genero_favorito.innerHTML == '<h3><strong>No tiene un genero favorito</strong></h3>'

    }
   
  })
    })
}
    
module.exports = usuario;