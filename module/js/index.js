this.decodeJwtResponse = null;
this.user = ''

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



this.userName = function userName() {
  if (decodeJwtResponse === null) {
    this.user = this.decodeJwtResponse.name;
    const elenentUser = document.querySelector(".greetingUser");
    elenentUser.innerText = this.user;
  }
}


function handleCredentialResponse(response) {
  this.decodeJwtResponse = decodeJwtResponse(response.credential);
  this.userName();

  // console.log("ID: " + responsePayload.sub);
  // console.log('Full Name: ' + responsePayload.name);
  // console.log('Given Name: ' + responsePayload.given_name);
  // console.log('Family Name: ' + responsePayload.family_name);
  // console.log("Image URL: " + responsePayload.picture);
  // console.log("Email: " + responsePayload.email);
  // console.log("UIT: " + responsePayload.jti);
}

