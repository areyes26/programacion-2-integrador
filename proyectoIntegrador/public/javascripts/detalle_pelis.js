window.addEventListener("load", function() {

  var recuperoStorage = localStorage.getItem("seriesFavoritos");
  // Si todavía no tenía gifs favoritos
  if (recuperoStorage == null) {
    // Creo una lista vacia
    seriesFavoritos = [];
  } else {
    // Descomprimo el TEXTO que tenia en storage en el array que necesito trabajar
    seriesFavoritos = JSON.parse(recuperoStorage);
  }
  ////////////////////Mas serieTarde
  var recuperoStorageTarde = localStorage.getItem("seriesFavoritosTarde");
  // Si todavía no tenía gifs favoritos
  if (recuperoStorageTarde == null) {
    // Creo una lista vacia
    seriesFavoritosTarde = [];
  } else {
    // Descomprimo el TEXTO que tenia en storage en el array que necesito trabajar
    seriesFavoritosTarde = JSON.parse(recuperoStorageTarde);
  }


  // ////////////////Info de la serie
  var querystring = location.search;
  var query2 = new URLSearchParams(querystring)
  var id = query2.get("id")

  fetch("https://api.themoviedb.org/3/tv/" + id + "?api_key=c0e01d0df95b98b689dcb3af16007742&language=en-US")
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function(datos) {
      console.log(datos);
      var info_conteiner = document.querySelector(".info_conteiner");
      var foto_conteiner = document.querySelector(".foto_conteiner");

      info_conteiner.innerHTML += '<h2><strong>' + datos.name + '</strong></h2>'

      var gnre = datos.genres
      var losgeneros = "";
      for (var i = 0; i < gnre.length; i++) {
        losgeneros += ' <a href="series_xgenero.html?id=' + datos.genres[i].id + '">' + datos.genres[i].name + '</a> '

      }
      info_conteiner.innerHTML += '<h3><strong>Géneros: </strong>' + losgeneros + '</h3>'

      info_conteiner.innerHTML += '<h3><strong>Lenguaje original: </strong>' + datos.original_language + '</h3>'

      info_conteiner.innerHTML += '<h3><strong>Sinopsis:</strong>' + ' <p><em>' + datos.overview + '</em></p></h3>'
      info_conteiner.innerHTML += '<h3><strong>Rating:</strong>' + ' <p><em>' + datos.vote_average + '</em></p></h3>'

      // fecha de estreno
      info_conteiner.innerHTML += '<h3><strong>Fecha de estreno: </strong>' + datos.first_air_date + '</h3>'

      // poster
      foto_conteiner.innerHTML = '<img src="https://image.tmdb.org/t/p/w500/' + datos.poster_path + '">'
      if (datos.poster_path == null) {
        var foto = document.querySelector('.foto_conteiner');
        foto.innerHTML = '<img src="img/notfound.jpg">'
      }
    })
  ///////TRAILER
  fetch("https://api.themoviedb.org/3/tv/" + id + "/videos?api_key=c0e01d0df95b98b689dcb3af16007742&language=en-US")
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function(datos) {
      console.log(datos);
      var div_trailer = document.querySelector(".trailer_conteiner");
      var trailer = datos.results;

      for (var i = 0; i < trailer.length; i++) {
        div_trailer.innerHTML += '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + datos.results[i].key + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'


      }
    })
  //----------- Boton --------------------
  var recom = document.querySelector(".Recomendaciones");
  var btn = document.querySelector("#boton-recom");
  btn.onclick = function() {
    recom.classList.toggle('show')
    // document.querySelector("#boton-recom").innerHTML = "Recomendaciones";
  }
  /////////////////// RECOMENDADOS
  fetch("https://api.themoviedb.org/3/tv/" + id + "/recommendations?api_key=c0e01d0df95b98b689dcb3af16007742&language=en-US&page=1")
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function(datos) {
      console.log(datos);
      var recomen = document.querySelector("#Reco");
      var pel = datos.results;

      for (var i = 1; i < pel.length; i++) {
        var recom = document.querySelector(".Recomendaciones");
        var btn = document.querySelector("#boton-recom");
        btn.style.display = "block";
        recomen.innerHTML += '<li><a id="click_pelis" href="info_serie.html?id=' + datos.results[i].id + '"> ' + '<img src="https://image.tmdb.org/t/p/w500/' + datos.results[i].poster_path + '">' + '</a></li>'
      }
    })



  // FAVORITOS
  //

  var datos = new URLSearchParams(location.search);
  var id = datos.get("id");
  if (seriesFavoritos.includes(id)) {
    document.querySelector(".botonFavorito").innerHTML = "Quitar de Favoritos";
  }
  fetch("https://api.themoviedb.org/3/tv/" + id + "?api_key=c0e01d0df95b98b689dcb3af16007742&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(id) {})
  document.querySelector(".botonFavorito").onclick = function() {
    //Paso 2: Modificar la informacion
    // Si la serie ya era favorito
    if (seriesFavoritos.includes(id)) {
      // Lo quito
      var index = seriesFavoritos.indexOf(id);
      seriesFavoritos.splice(index, 1);
      document.querySelector(".botonFavorito").innerHTML = "Agregar a favoritos";
    } else {
      //Lo agrego
      seriesFavoritos.push(id);
      document.querySelector(".botonFavorito").innerHTML = "Quitar de favoritos";
    }
    //Paso 3: Escribir en storage
    var infoParaStorage = JSON.stringify(seriesFavoritos);
    localStorage.setItem("seriesFavoritos", infoParaStorage);
    console.log(localStorage);
  }
  ///////////////verMasTarde

  var datos = new URLSearchParams(location.search);
  var idTarde = datos.get("id");
  if (seriesFavoritos.includes(idTarde)) {
    document.querySelector(".botonFavoritoTarde").innerHTML = "Quitar de ver más tarde";
  }
  fetch("https://api.themoviedb.org/3/tv/" + idTarde + "?api_key=c0e01d0df95b98b689dcb3af16007742&language=en-US")
    .then(function(response) {
      return response.json();
    })

  document.querySelector(".botonFavoritoTarde").onclick = function() {
    //Paso 2: Modificar la informacion
    // Si la serie ya era favorito
    if (seriesFavoritosTarde.includes(idTarde)) {
      // Lo quito
      var index = seriesFavoritosTarde.indexOf(idTarde);
      seriesFavoritosTarde.splice(index, 1);
      document.querySelector(".botonFavoritoTarde").innerHTML = "Ver más tarde";
    } else {
      //Lo agrego
      seriesFavoritosTarde.push(idTarde);
      document.querySelector(".botonFavoritoTarde").innerHTML = "Quitar de ver más tarde";
    }
    //Paso 3: Escribir en storage
    var infoParaStorageTarde = JSON.stringify(seriesFavoritosTarde);
    localStorage.setItem("seriesFavoritosTarde", infoParaStorageTarde);
    console.log(localStorage);
  }



  //Random

  var buscarRandom = document.querySelector(".descubrir")

  function aleatorio() {
    return Math.floor(Math.random() * 9542);
  }

  buscarRandom.innerHTML = '<a href="info_serie.html?id=' + aleatorio() + '">' + 'Descubrir' + '</a>'






})
