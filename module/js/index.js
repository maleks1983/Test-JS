
// Функція для розкодування JWT-токену та отримання інформації про користувача
function decodeJwtResponse(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}



function userName(responsePayload) {
  console.log(responsePayload);
  if (responsePayload !== null) {
    const elenentUser = document.querySelector(".greetingUser");
    elenentUser.innerText = responsePayload.name;
  }
}


function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential);
  userName(responsePayload);

  // console.log("ID: " + responsePayload.sub);
  // console.log('Full Name: ' + responsePayload.name);
  // console.log('Given Name: ' + responsePayload.given_name);
  // console.log('Family Name: ' + responsePayload.family_name);
  // console.log("Image URL: " + responsePayload.picture);
  // console.log("Email: " + responsePayload.email);
  // console.log("UIT: " + responsePayload.jti);
}

function googleLogin() {

  this.loginFormGoogle = document.getElementById('g_id_onload');
  this.loggedUser = {
    googleID: '',
    name: '',
    email: '',
    UIT: ''
  };


  this.init = function init() {
    this.loginFormGoogle['data-client_id'] = "355085333852-8pr4q546m8hcdo2896mrc6ahq2brdaug.apps.googleusercontent.com";
    this.loginFormGoogle['data-callback'] = this.handleCredentialResponse(response);
    const googleSignIn = document.querySelector('.g_id_signin')
    googleSignIn.addEventListener('click', new googleLogin(),)

  }

  this.decodeJwtResponse = function decodeJwtResponse(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  this.handleCredentialResponse = function handleCredentialResponse(response) {
    const responsePayload = this.decodeJwtResponse(response.credential);
    this.loggedUser.googleID = responsePayload.sub;
    this.loggedUser.name = responsePayload.given_name;
    this.loggedUser.email = responsePayload.email;
    this.loggedUser.UIT = responsePayload.jti;

    userName(responsePayload);
  }


}

const googleLogin = new googleLogin();
googleLogin.init();