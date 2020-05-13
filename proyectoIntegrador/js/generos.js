window.addEventListener("load", function() {

  //Random

  var buscarRandom = document.querySelector(".descubrir")

  function aleatorio() {
    return Math.floor(Math.random() * 9542);
  }

  buscarRandom.innerHTML = '<a href="info_serie.html?id=' + aleatorio() + '">' + 'Descubrir' + '</a>'







  //
  //
  // })
  //
  //







})
