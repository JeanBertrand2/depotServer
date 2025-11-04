export const PrestatairesModel = {
  table: "Prestataires",
  columns: [
    "ID_Prestataires", "RaisonSociale", "SIRET", "Adresse", "Tel", "adresseMail",
    "IdentifiantSAP", "IdentifiantAPI", "ClientIDProduction", "ClientSecretProduction",
    "ScopeProduction", "UrlTokenProduction", "UrlRequeteProduction", "ContentTypeProduction",
    "ClientIDSandBox", "ClientSecretSandBox", "ScopeSandBox", "UrlTokenSandBox",
    "UrlRequeteSandBox", "ContentTypeSandBox", "APICrypte"
  ],
  defaults: {
    ClientIDProduction: null,
    ClientSecretProduction: null,
    APICrypte:null
  }
  //defaults: {
    //ScopeProduction: "homeplus.tiersprestations",
    //ScopeSandBox: "homeplus.tiersprestations",
    //UrlTokenProduction: "https://api.urssaf.fr/api/oauth/v1/token",
   // UrlTokenSandBox: "https://api-edi.urssaf.fr/api/oauth/v1/token",
    //UrlRequeteProduction: "https://api.urssaf.fr/atp/v1/tiersPrestations",
   // UrlRequeteSandBox: "https://api-edi.urssaf.fr/atp/v1/tiersPrestations",
    //ContentTypeProduction: "application/json",
    //ContentTypeSandBox: "application/json"
  //}
};
