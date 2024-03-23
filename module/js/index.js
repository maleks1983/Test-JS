
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


class GoogleLogin {

  constructor(selector) {
    this.props = {
      selector
    };

    this.rootElement = document.querySelector(selector);
    this.loginFormGoogle = document.getElementById('g_id_onload');
    this.elenentUser = document.querySelector(".greetingUser");
    this.elenentSignIn = document.querySelector(".g_id_signin");

    this.loggedUser = {
      googleID: '',
      name: '',
      email: '',
      UIT: ''
    };


    this.loginFormGoogle.dataset['client_id'] = "355085333852-8pr4q546m8hcdo2896mrc6ahq2brdaug.apps.googleusercontent.com";
    this.loginFormGoogle.dataset['callback'] = "handleCredentialResponse";



    this.decodeJwtResponse = function (token) {
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
    };

    this.handleCredentialResponse = function (response) {
      const responsePayload = this.decodeJwtResponse(response.credential);
      this.loggedUser.googleID = responsePayload.sub;
      this.loggedUser.name = responsePayload.given_name;
      this.loggedUser.email = responsePayload.email;
      this.loggedUser.UIT = responsePayload.jti;
      this.elenentUser.onload;

      this.elenentUser.innerText = this.loggedUser.name;


    };

  }



}
GoogleLogin.prototype.decodeJwtResponse = function (token) {
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
};
GoogleLogin.prototype.handleCredentialResponse = function (response) {
  const responsePayload = this.decodeJwtResponse(response.credential);
  this.loggedUser.googleID = responsePayload.sub;
  this.loggedUser.name = responsePayload.given_name;
  this.loggedUser.email = responsePayload.email;
  this.loggedUser.UIT = responsePayload.jti;
  this.elenentUser.onload;

  this.elenentUser.innerText = this.loggedUser.name;


};

const gLogin = new GoogleLogin(".container.mx-auto.form-login");

function handleCredentialResponse(response) {
  gLogin.handleCredentialResponse(response);
}
