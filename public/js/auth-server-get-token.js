document.addEventListener("DOMContentLoaded", function () {
  const url = window.location.href;
  const match = url.match(/[?&]code=([^&]+)/);

  const client_id = "your-client-id";
  const client_secret = "your-client-secret";
  const redirect_uri = "http://localhost:3000/authorized";
  const oauth2Endpoint =
    "http://localhost:8081/";

  if (match) {
    const code = match[1];
    requestSpringServerToken(code);
  }

  function requestSpringServerToken(code) {
    const tokenEndpoint = oauth2Endpoint + "oauth2/token"; // The token endpoint of the Spring Authorization Server
    const params = {
      client_id: client_id,
      client_secret: client_secret,
      scope: "profile",
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
    };

    const formBody = Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", tokenEndpoint, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(formBody);
    xhr.onload = function () {
      const data = JSON.parse(this.responseText);
      setAccessTokenCookie(data.access_token);
      setRefreshTokenCookie(data.refresh_token);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
    };
  }

  function setAccessTokenCookie(accessToken) {
    const expirationMinutes = 59;
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + expirationMinutes);
    document.cookie = `access_token=${accessToken}; expires=${expirationDate.toUTCString()}; path=/`;
    localStorage.setItem("access_token_expiration", expirationDate);
  }

  function setRefreshTokenCookie(refreshToken) {
    document.cookie = `refresh_token=${refreshToken}; path=/`;
  }

  // Verify if the user has an access token stored in the local storage
  const storedAccessToken = localStorage.getItem("access_token");
  if (storedAccessToken) {
    const expirationDate = new Date(
      localStorage.getItem("access_token_expiration")
    );
    if (expirationDate > new Date()) {
      setAccessTokenCookie(storedAccessToken);
    } else {
      const code = url.substring(
        url.indexOf("?code=") + 6,
        url.indexOf("&scope=")
      );
      requestGoogleToken(code);
    }
  }
});
