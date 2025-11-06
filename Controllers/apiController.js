import axios from "axios";
import querystring from "querystring";

const tokenUrl = process.env.URSSAF_TOKEN_URL;
const clientId = process.env.URSSAF_CLIENT_ID;
const clientSecret = process.env.URSSAF_CLIENT_SECRET;
const scope = process.env.URSSAF_SCOPE;

export async function getToken() {
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

    console.log("Réponse complète du token:", response.data);

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Erreur lors de l'obtention du token:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getApi(apiUrl, params) {
  const accessToken = await getToken();
  try {
    const response = await axios.get(apiUrl, {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de l'appel à l'API:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function postApi(apiUrl, data) {
  let accessToken = await getToken("production");
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API:", error.message);
    throw error;
  }
}
