const elementFormLoginDiv = document.querySelector('.form-login');
const lof = new logInForm();
elementFormLoginDiv.addEventListener('click', function () {
  this.append(lof.builder())
})



function logInForm() {

  this.builder = function builder() {
    const elementFormLogin = document.createElement('form');
    elementFormLogin.apclassList = ('form-signin');
    elementFormLogin.setAttribute('th:metod', 'POST');
    elementFormLogin.setAttribute('th:href', '/login');
    elementFormLogin.innerText = ('Login');
    return elementFormLogin;
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
  var profile = response.getBasicProfile();

  console.log('ID: ' + profile.getId());
  console.log('Full Name: ' + profile.getName());
  console.log('First Name: ' + profile.getGivenName());
  console.log('Last Name: ' + profile.getFamilyName());
  console.log('Email: ' + profile.getEmail());
  console.log('Image URL: ' + profile.getImageUrl());
}

