import axios from "axios";
import querystring from 'querystring';


async function getToken(env = "production") {
  const { data } = await axios.get("http://localhost:2083/prestataires/urssaf");
    const config = data[env];
  
    if (!config) throw new Error(`Configuration URSSAF introuvable pour l'environnement ${env}`);
  
    const { clientID, clientSecret, scope, urlToken } = config;

    const tokenUrl = urlToken;
    const clientId = clientID;
    const clientSecretT=clientSecret;
    const scopeT=scope;
    try {
      const response = await axios.post(tokenUrl, querystring.stringify({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecretT,
        scope:scopeT,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data.accessToken.access_token;
    } catch (error) {
      console.error('Erreur lors de l\'obtention du token:',  error.message);
      throw error;
    }
}

export async function getApi(apiUrl,params) {

    let accessToken = await getToken("production");                 
    try {
      
      const response = await axios.get(apiUrl,{   
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
   
 



 export async function postApi(apiUrl,data) {
  
    let accessToken = await getToken("production");                 
    try {     
      const response = await axios.post(apiUrl,{                       
        headers: {   
          'Content-Type': 'application/json',         
           Authorization:`Bearer ${accessToken}`,                                                                                                               
        }  ,                 
        body:JSON.stringify(data),      
      });     
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API:',  error.message);
      throw error;
    }

  }

