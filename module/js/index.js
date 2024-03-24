

// console.log("ID: " + responsePayload.sub);
// console.log('Full Name: ' + responsePayload.name);
// console.log('Given Name: ' + responsePayload.given_name);
// console.log('Family Name: ' + responsePayload.family_name);
// console.log("Image URL: " + responsePayload.picture);
// console.log("Email: " + responsePayload.email);
// console.log("UIT: " + responsePayload.jti);


class GoogleLogin {

  constructor(selector, client_id, callback) {

    this.props = {
      selector,
      client_id,
      callback
    };

    this.rootElement = document.querySelector(selector);
    this.loginFormGoogle = this.rootElement.querySelector('#g_id_onload');
    this.elenentSignIn = this.rootElement.querySelector(".g_id_signin");
    this.elenentUser = document.querySelector(".greetingUser");


    this.loggedUser = {
      googleID: '',
      name: '',
      email: '',
      UIT: ''
    };

    this.loginFormGoogle.dataset['client_id'] = client_id;
    this.loginFormGoogle.dataset['callback'] = callback;

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

      this.elenentUser.innerText = this.loggedUser.name;

    }

  }

};

const gLogin = new GoogleLogin(".container.mx-auto.form-login",
  "355085333852-8pr4q546m8hcdo2896mrc6ahq2brdaug.apps.googleusercontent.com",
  "handleCredentialResponse");

function handleCredentialResponse(response) {
  gLogin.handleCredentialResponse(response);
}



class Slider {

  constructor(selector) {
    this.rootElement = document.querySelector(selector);
    this._state = { currentSlide: 0 };
    this.bodyEl = this.rootElement.querySelector(".slider__body");
    this.bodyContent = this.bodyEl.querySelectorAll(".slider__content")
    this.controllEl = this.rootElement.querySelector(".slider__control");
    this.timeLineEl = this.rootElement.querySelector(".slider__timeLine");
    this.nextBtn = this.controllEl.querySelector(".next__btn");
    this.prevBtn = this.controllEl.querySelector(".prev__btn");
    this.init();
    this.idAnimation = setInterval(() => { this.nextSlide() }, 5000);
  }


  init() {
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', this.nextSlide.bind(this))
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', this.previousSlide.bind(this))
    }
    this.render(this.state);
  }

  get state() {
    return this._state.currentSlide;
  }

  set state(index) {
    this._state.currentSlide = index;

  }


  render(index) {
    const currentSlideEl = this.bodyContent[this.state];
    const showSlideEL = this.bodyEl.querySelector('.slider__current');
    showSlideEL.classList.remove('slider__current');
    showSlideEL.style.zindex = 0
    currentSlideEl.classList.add('slider__current');
    currentSlideEl.style.zindex = 1;
  }

  nextSlide() {
    this.state++;
    this.state = this.state % this.bodyContent.length;
    this.render(this.state);
  }

  previousSlide() {
    this.state--;
    if (this.state == -1) {
      this.state = this.bodyContent.length - 1;
    }
    this.render(this.state);
  }


}
const slider = new Slider(".slider")

