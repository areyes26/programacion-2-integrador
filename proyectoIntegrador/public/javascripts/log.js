window.addEventListener("load", function() {
  console.log();
  if ((window.sessionStorage.getItem('user')) != null) {
    var div = "<li class='nav-item active'>"
    div += "<button class='btn btn-danger log' > Log out </button>"
    div += "</li>"
    document.querySelector("div.log").innerHTML = div
    div = document.querySelector("div.log")

    div.addEventListener("click", function() {
      sessionStorage.clear();
      var url = window.location.href
      location.href = url;
      var div = "<li class='nav-item active'>"
      div += "<button type='button' class='btn btn-primary log' data-toggle='modal' data-target='#exampleModal' data-whatever='@mdo'>Log in </button>"
      div += "</li>"
      document.querySelector("div.log").innerHTML = div
    })
  }
})
