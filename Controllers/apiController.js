import axios from "axios";
import querystring from "querystring";

const URSSAF_CONFIG_URL =
  process.env.URSSAF_CONFIG_URL || "http://localhost:2083/prestataires/urssaf";

async function getToken(env = "production") {
<<<<<<< HEAD
  try {
    const { data } = await axios.get("http://localhost:2083/prestataires/urssaf");
    const config = data[env];

    if (!config) throw new Error(`Configuration URSSAF introuvable pour l'environnement ${env}`);

    const { clientID, clientSecret, scope, urlToken, urlRequete } = config;

    const response = await axios.post(urlToken, querystring.stringify({
      grant_type: 'client_credentials',
      client_id: clientID,
      client_secret: clientSecret,
      scope: scope,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;
    console.log("Token reçu :", accessToken);

    return {
      accessToken,
      urlRequete
    };
  } catch (error) {
    console.error(" Erreur lors de l'obtention du token :");
    console.error("Message :", error.message);
    if (error.response) {
      console.error("Code HTTP :", error.response.status);
      console.error("Headers :", error.response.headers);
      console.error("Body :", error.response.data);
    }
=======
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

    return { accessToken: response.data.access_token, urlRequete };
  } catch (error) {
    console.error("Erreur lors de l'obtention du token:", error.message);
>>>>>>> 2001e37c366571ca2f368d9784ae752657166461
    throw error;
  }
}

<<<<<<< HEAD

export async function getApi(params) {

    let  { accessToken, urlRequete } = await getToken("production");                
    try {
      
      const response = await axios.get(urlRequete,{   
             params ,               
        headers: {   
          'Content-Type': 'application/json',         
           Authorization:`Bearer ${accessToken}`,                                                                                                               
        }  ,                 
                
      });     
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API:',  error.message);
      throw error;
    }
  } 



export async function postApi(data) {
  
  console.log(" postApi() appelée avec :", data); 

  const { accessToken, urlRequete } = await getToken("production");
  const { methode, ...body } = data;
  const fullUrl = methode ? `${urlRequete}${methode}` : urlRequete;

  console.log(" Appel URSSAF vers :", fullUrl);
  console.log("Payload transmis :", JSON.stringify(body, null, 2));

  try {
    const response = await axios.post(fullUrl, body, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "recouv.origin.id": "819d80f5-fe9f-444b-bfcb-4f2ea9cf3d4c"
 
      }
    });
    console.log("Réponse brute URSSAF :", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API URSSAF :", error.response?.data || error.message);
    console.error("Code HTTP :", error.response?.status);
    console.error("Headers :", error.response?.headers);
    throw error;
  }
}
=======
export async function getApi(params) {
  const { accessToken, urlRequete } = await getToken("production");
  try {
    const response = await axios.get(urlRequete, {
      params,
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

export async function postApi(data) {
  const { accessToken, urlRequete } = await getToken("production");
  const { methode, ...body } = data;
  const fullUrl = methode ? `${urlRequete}${methode}` : urlRequete;

  try {
    const response = await axios.post(fullUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "recouv.origin.id": "819d80f5-fe9f-444b-bfcb-4f2ea9cf3d4c",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de l'appel à l'API URSSAF :",
      error.response?.data || error.message
    );
    console.error("Code HTTP :", error.response?.status);
    console.error("Headers :", error.response?.headers);
    throw error;
  }
}
>>>>>>> 2001e37c366571ca2f368d9784ae752657166461
