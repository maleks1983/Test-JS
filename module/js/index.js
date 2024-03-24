

// console.log("ID: " + responsePayload.sub);
// console.log('Full Name: ' + responsePayload.name);
// console.log('Given Name: ' + responsePayload.given_name);
// console.log('Family Name: ' + responsePayload.family_name);
// console.log("Image URL: " + responsePayload.picture);
// console.log("Email: " + responsePayload.email);
// console.log("UIT: " + responsePayload.jti);

const loginForm = document.querySelector('.container.mx-auto.form-login');


class GoogleLogin {

  constructor(rootElement) {
    this._CLIENT_ID = "355085333852-8pr4q546m8hcdo2896mrc6ahq2brdaug.apps.googleusercontent.com";
    this.loggedUser = {
      googleID: '',
      name: '',
      email: '',
      UIT: ''
    };
    this.rootElement = rootElement;
    this.elenentUser = document.querySelector(".greetingUser");
    this.render();
  }

  renderOnload() {
    const loginFormGoogle = document.createElement('div');
    loginFormGoogle.id = 'g_id_onload';
    loginFormGoogle.dataset['client_id'] = this._CLIENT_ID;
    loginFormGoogle.dataset['callback'] = 'handleCredentialResponse';
    return loginFormGoogle;
  }

  renderSignin() {
    const elenentSignIn = document.createElement('div');
    elenentSignIn.className = 'g_id_signin';
    elenentSignIn.dataset.type = 'icon';
    elenentSignIn.dataset.text = 'Вхід';
    return elenentSignIn;

  }

  render() {
    const loggedWrapper = document.createElement('div');
    loggedWrapper.className = 'loggedWrapper';
    loggedWrapper.style.display = 'none';
    loggedWrapper.append(this.renderOnload());
    loggedWrapper.append(this.renderSignin());
    this.rootElement.append(loggedWrapper);
  }

  decodeJwtResponse(token) {
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

  handleCredentialResponse(response) {
    const responsePayload = this.decodeJwtResponse(response.credential);

    this.loggedUser.googleID = responsePayload.sub;
    this.loggedUser.name = responsePayload.given_name;
    this.loggedUser.email = responsePayload.email;
    this.loggedUser.UIT = responsePayload.jti;

    this.elenentUser.innerText = this.loggedUser.name;

  }



};
const googleLogin = new GoogleLogin(loginForm);

loginForm.addEventListener('click', (event) => {
  const vrapper =  event.target.querySelector('.loggedWrapper')
  console.log(vrapper);
  vrapper.style.display = 'block';
})

// const gLogin = new GoogleLogin(".container.mx-auto.form-login");

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
    this.timeLineElList = null;
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
    this.renderTimeLine();
    this.render(this.state);
  }

  renderTimeLine() {
    const timeLineUl = this.timeLineEl.querySelector('ul');
    for (let e in this.bodyContent) {
      const element = document.createElement("li");
      element.className = 'slider__timeLine-li';
      timeLineUl.append(element);
    }
    this.timeLineElList = timeLineUl.querySelectorAll('li');
  }

  get state() {
    return this._state.currentSlide;
  }

  set state(index) {
    this._state.currentSlide = index;

  }


  render(index) {
    const currentSlideEl = this.bodyContent[index];
    const currentTimeLineEl = this.timeLineElList[index];
    const showSlideEL = this.bodyEl.querySelector('.slider__current');
    const showTimeLineEL = this.timeLineEl.querySelector('.timeLine__current');
    if (showSlideEL) {
      showSlideEL.classList.remove('slider__current');
    }
    if (showTimeLineEL) {
      showTimeLineEL.classList.remove('timeLine__current');
    }
    showSlideEL.style.zindex = 0
    currentSlideEl.classList.add('slider__current');
    currentTimeLineEl.classList.add('timeLine__current');
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

