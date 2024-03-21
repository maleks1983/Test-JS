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

const obj = new createSecretHolder(5);
obj.setSecret(2);

function init() {
  gapi.load('auth2', function () {
    /* Ready. Make a call to gapi.auth2.init or some other API */
    gapi.auth2.init({
      client_id: '355085333852-8pr4q546m8hcdo2896mrc6ahq2brdaug.apps.googleusercontent.com',
      // Інші параметри ініціалізації, якщо необхідно
    });
    if (auth2.isSignedIn.get()) {
      // Користувач авторизований
      const user = auth2.currentUser.get();
      const profile = user.getBasicProfile();
      console.log('User is signed in:', profile.getName());
      console.log(gapi);
    }
  });
}
