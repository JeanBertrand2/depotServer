import axios from "axios";
import querystring from "querystring";

const URSSAF_CONFIG_URL =
  process.env.URSSAF_CONFIG_URL || "http://localhost:2083/prestataires/urssaf";

export async function getToken(env = "production") {
  const { data } = await axios.get(URSSAF_CONFIG_URL);
  const config = data[env];
  if (!config)
    throw new Error(
      `Configuration URSSAF introuvable pour l'environnement ${env}`
    );

  const { clientID, clientSecret, scope, urlToken, urlRequete } = config;

  const tokenUrl = urlToken;
  const clientId = clientID;
  const clientSecretT = clientSecret;
  const scopeT = scope;
  const urlProdLocal = `${urlRequete}/particulier`;

  try {
    const response = await axios.post(
      tokenUrl,
      querystring.stringify({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecretT,
        scope: scopeT,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return { accessToken: response.data.access_token, urlProd: urlProdLocal };
  } catch (error) {
    console.error("Erreur lors de l'obtention du token:", error.message);
    throw error;
  }
}

export async function getApi(apiUrl, params) {
  const { accessToken } = await getToken();
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

export async function postApi(data) {
  const { accessToken, urlProd } = await getToken("production");
  if (!urlProd) throw new Error("URL de requête URSSAF introuvable");
  try {
    const response = await axios.post(urlProd, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API:", error.response?.data || error.message);
    throw error;
  }
}
