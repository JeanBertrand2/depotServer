import axios from "axios";
import querystring from "querystring";

async function getToken(tokenUrl, clientId, clientSecret, scope) {
  try {
    const response = await axios.post(
      tokenUrl,
      querystring.stringify({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: scope,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.accessToken.access_token;
  } catch (error) {
    console.error("Erreur lors de l'obtention du token:", error.message);
    throw error;
  }
}

export async function getApi(
  apiUrl,
  params,
  tokenUrl,
  clientId,
  clientSecret,
  scope
) {
  let accessToken = await getToken(tokenUrl, clientId, clientSecret, scope);
  try {
    const response = await axios.get(apiUrl, {
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.access_token}`,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API:", error.message);
    throw error;
  }
}

export async function postApi(
  apiUrl,
  data,
  tokenUrl,
  clientId,
  clientSecret,
  scope
) {
  let accessToken = await getToken(tokenUrl, clientId, clientSecret, scope);
  try {
    const response = await axios.post(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.access_token}`,
      },
      body: data,
    });
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API:", error.message);
    throw error;
  }
}
