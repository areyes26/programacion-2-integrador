window.addEventListener("load", function() {
  //Paso 1: Leo Storage
  var recuperoStorage = localStorage.getItem("seriesFavoritos");
  console.log(recuperoStorage);
  // hago que no se pueda ver si no estan logeados
  var nombreUsuario = localStorage.getItem("nombre");
  console.log(nombreUsuario);
  if (nombreUsuario == "" || nombreUsuario == null) {
    document.querySelector("#Cartel_nolog").style.display = "block"
  }else{
  // Si todavía no tenía gifs favoritos
  if (recuperoStorage == null) {
    // Creo una lista vacia
    seriesFavoritos = [];
  } else {
    // Descomprimo el TEXTO que tenia en storage en el array que necesito trabajar
    seriesFavoritos = JSON.parse(recuperoStorage);
  }
  for (var i = 0; i < seriesFavoritos.length; i++) {

    // BUSCAR ESE GIF Y MOSTRARLO
    fetch("https://api.themoviedb.org/3/tv/" + seriesFavoritos[i] + "?api_key=c0e01d0df95b98b689dcb3af16007742&language=en-US")
      .then(function(response) {
        return response.json();
      })
      .then(function(serie) {
        console.log(serie)
        document.querySelector(".seriesfavoritas").innerHTML += '<li>' + '<a href="info_serie.html?id=' + serie.id + '">' + '<img src="https://image.tmdb.org/t/p/w300/' + serie.poster_path + '">' + '</a>' + '</li>'
        if (datos.poster_path == null) {
          var foto = document.querySelector('.seriesfavoritas');
          foto.innerHTML += '<li><a href="info_serie.html?id=' + datos.results[i].id + '"> ' + '<img src="img/notfound.jpg">' + '</a></li>'
        }

      })
  }
  }

  //Random

  var buscarRandom = document.querySelector(".descubrir")

  function aleatorio() {
    return Math.floor(Math.random() * 9542);
  }

  buscarRandom.innerHTML = '<a href="info_serie.html?id=' + aleatorio() + '">' + 'Descubrir' + '</a>'

  //Se creo una funcion que permite hallar series random








})
