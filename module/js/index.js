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

function handleCredentialResponse(googleUser) {
  console.log(googleUser);
  console.log('ID: ' + googleUser.getId());
  console.log('Full Name: ' + googleUser.getName());
  console.log('First Name: ' + progoogleUserfile.getGivenName());
  console.log('Last Name: ' + googleUser.getFamilyName());
  console.log('Email: ' + googleUser.getEmail());
  console.log('Image URL: ' + googleUser.getImageUrl());
}

