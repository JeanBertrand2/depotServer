export const InputPrestation = {
  table: "inputprestation",
  columns: [
    "id_InputPrestation",       // AUTO_INCREMENT
    "ID_DemandePaiement",       // Clé étrangère vers DemandePaiement
    "idBeneficiaire",           // Identifiant du bénéficiaire
    "quantite",                 // Quantité de prestation
    "dateheureCreation",        // Date/heure de création
    "ID_utilisateur",           // Utilisateur ayant créé la ligne
    "libelleTTC",               // Libellé de la prestation
    "dateDebutEmploi",          // Date de début d’emploi
    "dateFinEmploi",            // Date de fin d’emploi
    "montantPrestationTTC",     // Montant TTC
    "montantTVA",               // Montant TVA
    "complement1",              // Complément libre (ex: unité)
    "complement2",              // Complément fixe ou dynamique
    "complement3"               // Complément optionnel (nullable)
  ],
  defaults: {
    ID_DemandePaiement: null,
    idBeneficiaire: null,
    quantite: 0,
    dateheureCreation: new Date().toISOString().slice(0, 19).replace("T", " "),
    ID_utilisateur: "system",
    libelleTTC: "",
    dateDebutEmploi: null,
    dateFinEmploi: null,
    montantPrestationTTC: 0,
    montantTVA: 0,
    complement1: "",            // Tu peux y mettre "FORFAIT" ou "HEURE"
    complement2: "SAP800771792",
    complement3: null
  }
};
