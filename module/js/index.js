

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

const elementFormLoginDiv = document.querySelector('.form-login');
const lof = new logInForm();
elementFormLoginDiv.addEventListener('click', function () {
  this.append(lof.builder())
})



function logInForm() {

  this.builder = function builder() {
    const elementFormLogin = document.createElement('form');
    for(let el in elementFormLogin){
      console.log(el)
    }

 
    // elementFormLogin.apclassList = ('form-signin');
    // elementFormLogin.setAttribute('th:metod', 'POST');
    // elementFormLogin.setAttribute('th:href', '/login');
    // elementFormLogin.innerText = ('Login');
    // return elementFormLogin;
  }


}

function createSecretHolder(secret) {

  this.secret = secret;

  this.setSecret = function setSecret(secret) {
    this.secret = secret;
  }

  this.getSecret = function getSecret() {
    return this.secret;
  }

}



function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential);

  console.log("ID: " + responsePayload.sub);
  console.log('Full Name: ' + responsePayload.name);
  console.log('Given Name: ' + responsePayload.given_name);
  console.log('Family Name: ' + responsePayload.family_name);
  console.log("Image URL: " + responsePayload.picture);
  console.log("Email: " + responsePayload.email);
}

