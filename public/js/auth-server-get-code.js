/**
 * Function to initiate OAuth 2.0 authentication with Spring Authorization Server.
 * It creates a form to request an access token.
 */

const client_id = 'your-client-id';
const redirect_uri = 'http://localhost:3000/authorized';
const oauth2Endpoint = 'http://localhost:8081/';

function authServerSignIn() {
  // Internal-Server endpoint for requesting an access token
  let endpoint = oauth2Endpoint + "oauth2/authorize";

  // Create a form element to open OAuth 2.0 endpoint in a new window.
  let form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", endpoint);

  // Parameters required for authorization
  let params = {
    client_id: client_id, // Client ID registered with the Authorization Server
    response_type: 'code', // Response type indicating code flow
    scope: 'profile', // Scopes requested for access
    redirect_uri: redirect_uri, // Redirect URI to handle the response
  };

  // Add form parameters as hidden input values.
  for (let p in params) {
    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  // Append the form to the body and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}
