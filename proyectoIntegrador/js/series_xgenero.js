window.addEventListener("load", function() {

  //////////////////Info de la serie
  var querystring = location.search;
  var query2 = new URLSearchParams(querystring)
  var id = query2.get("id")
  var page = 1;
  vermas()

  function vermas() {
    // GENEROSSSSSSS
    var url = "https://api.themoviedb.org/3/discover/tv?api_key=c0e01d0df95b98b689dcb3af16007742&language=en-US&sort_by=popularity.desc&page=2" + page + "&timezone=America%2FNew_York&include_null_first_air_dates=false&with_genres=" + id;
    console.log("hola mundo!");
    fetch(url)
      .then(function(respuesta) {
        return respuesta.json();
      })
      .then(function(datos) {
        console.log(datos);
        var div = document.querySelector(".ul_generos");
        var series = datos.results;
        //titulo
        var titulo = document.querySelector("#titulos");
        var name = query2.get("name")
        titulo.innerHTML = name;

        for (var i = 0; i < series.length; i++) {
          if (datos.results[i].poster_path == null) {
            var photo = document.querySelector('.ul_generos');
            photo.innerHTML += '<li><a href="info_serie.html?id=' + datos.results[i].id + '"> ' + '<img src="img/notfound.jpg">' + '</a></li>'
          } else {
            div.innerHTML += '<li><a id="click_pelis" href="info_serie.html?id=' + datos.results[i].id + '"> ' + '<img src="https://image.tmdb.org/t/p/w500/' + datos.results[i].poster_path + '">' + '</a></li>'
          }

        }
        console.log(series.length);
        if (datos.results.length == 0 && page == 1) {
          titulo.innerHTML = "No se encontró el género";
          titulo.style.textTransform = "none";
          titulo.style.padding = "20%"
          titulo.style.textAlign = "center"
          titulo.style.color = "Red"
        }
        for (var i = 0; i < series.length; i++) {
          div.innerHTML += '<li><a href="info_serie.html?id=' + datos.results[i].id + '"> ' + '<img src="https://image.tmdb.org/t/p/w500/' + datos.results[i].poster_path + '">' + '</a></li>'
        }
        if (datos.total_pages == page) {
          console.log('cortamo');
          window.removeEventListener('scroll', scrolled)
          return
          // alert("No se encuentran resultados")
        }
      })

  }
  window.addEventListener('scroll', scrolled)

  function scrolled(e) {
    var myDiv = document.querySelector('body')
    if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {
      // scrolledToBottom(e);
      page++
      vermas()
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
