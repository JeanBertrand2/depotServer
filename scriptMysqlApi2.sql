CREATE TABLE Prestataires (
    ID_Prestataires INT AUTO_INCREMENT PRIMARY KEY,
    RaisonSociale VARCHAR(200) NOT NULL,
    SIRET VARCHAR(100),
    Adresse VARCHAR(200),
    Tel VARCHAR(50),
    adresseMail VARCHAR(50),
    IdentifiantSAP VARCHAR(50),
    IdentifiantAPI VARCHAR(50),
    ClientIDProduction VARCHAR(100),
    ClientSecretProduction VARCHAR(100),
    ScopeProduction VARCHAR(100),
    UrlTokenProduction VARCHAR(200),
    UrlRequeteProduction VARCHAR(200),
    ContentTypeProduction VARCHAR(50),
    ClientIDSandBox VARCHAR(100),
    ClientSecretSandBox VARCHAR(100),
    ScopeSandBox VARCHAR(100),
    UrlTokenSandBox VARCHAR(200),
    UrlRequeteSandBox VARCHAR(200),
    ContentTypeSandBox VARCHAR(50),
    APICrypte BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ParametreImportation (
    ID_ParametreImportation INT AUTO_INCREMENT PRIMARY KEY,
    NomTable VARCHAR(100) NOT NULL,
    NomParametre VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE DetailParametreImportation (
    ID_DetailParametreImportation INT AUTO_INCREMENT PRIMARY KEY,
    ID_ParametreImportation INT NOT NULL,
    NumRubrique INT,
    NomRubriqueWindev VARCHAR(100),
    LibelleColonneWindev VARCHAR(100),
    NomColonneFichier VARCHAR(100),
    LibelleColonneFichier VARCHAR(100),
    FOREIGN KEY (ID_ParametreImportation) REFERENCES ParametreImportation(ID_ParametreImportation)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE DonneesLicence (
    ID_DonneesLicence INT AUTO_INCREMENT PRIMARY KEY,
    NomPoste VARCHAR(150),
    CleInitiale VARCHAR(8),
    DateInstallation VARCHAR(8),
    DateDerniereUtilisation VARCHAR(8),
    DateExpirationLicence VARCHAR(8),
    NombreJourFlottant VARCHAR(8),
    CleActivation VARCHAR(150)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE Utilisateurs (
    ID_Utilisateurs INT AUTO_INCREMENT PRIMARY KEY,
    Login VARCHAR(50) NOT NULL UNIQUE,
    MotDePasse VARCHAR(100) NOT NULL,
    Nom VARCHAR(100),
    Prenoms VARCHAR(100),
    adresseMail VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE HistoriqueJobs (
    ID_HistoriqueJObs INT AUTO_INCREMENT PRIMARY KEY,
    NomJOB VARCHAR(50),
    StatutJOB VARCHAR(50),
    DateHeureDemande DATE,
    DateHeureTraitement DATETIME,
    NombreFacturesTraitees DECIMAL(4,2),
    NombreFacturesDemandees DECIMAL(4,2),
    ID_Utilisateurs INT,
    MessageErreur VARCHAR(8),
    FOREIGN KEY (ID_Utilisateurs) REFERENCES Utilisateurs(ID_Utilisateurs)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ProfilUtilisateur (
    ID_ProfilUtilisateur INT AUTO_INCREMENT PRIMARY KEY,
    LibelleProfil VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE Menu (
    ID_Menu INT AUTO_INCREMENT PRIMARY KEY,
    LibelleMenu VARCHAR(50) NOT NULL,
    Visible BOOLEAN DEFAULT TRUE,
    NomMenu VARCHAR(200)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE UtilisateursAssociesAuProfil (
    ID_UtilisateursAssociesAuProfil INT AUTO_INCREMENT PRIMARY KEY,
    ID_Utilisateurs INT NOT NULL,
    ID_ProfilUtilisateur INT NOT NULL,
    FOREIGN KEY (ID_Utilisateurs) REFERENCES Utilisateurs(ID_Utilisateurs)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_ProfilUtilisateur) REFERENCES ProfilUtilisateur(ID_ProfilUtilisateur)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    UNIQUE KEY unique_user_profile (ID_Utilisateurs, ID_ProfilUtilisateur)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE utilisateursPrestataires (
    ID_UtilisateursPrestataires INT AUTO_INCREMENT PRIMARY KEY,
    ID_Utilisateurs INT NOT NULL,
    ID_Prestataires INT NOT NULL,
    FOREIGN KEY (ID_Utilisateurs) REFERENCES Utilisateurs(ID_Utilisateurs)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_Prestataires) REFERENCES Prestataires(ID_Prestataires)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    UNIQUE KEY unique_user_prestataire (ID_Utilisateurs, ID_Prestataires)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE MenusAssociesAuProfil (
    ID_MenusAssociesAuProfil INT AUTO_INCREMENT PRIMARY KEY,
    ID_Menu INT NOT NULL,
    ID_ProfilUtilisateur INT NOT NULL,
    FOREIGN KEY (ID_Menu) REFERENCES Menu(ID_Menu)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (ID_ProfilUtilisateur) REFERENCES ProfilUtilisateur(ID_ProfilUtilisateur)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    UNIQUE KEY unique_menu_profile (ID_Menu, ID_ProfilUtilisateur)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


#DATA COMMUN

CREATE TABLE CodeNature (
    ID_CodeNature INT AUTO_INCREMENT PRIMARY KEY,
    Code VARCHAR(20) NOT NULL UNIQUE,
    Libelle VARCHAR(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE CodeTVA (
    ID_CodeTVA INT AUTO_INCREMENT PRIMARY KEY,
    Code DECIMAL(4,2) NOT NULL UNIQUE,
    Libelle VARCHAR(150) NOT NULL,
    TauxTVA DECIMAL(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE CodeTypeVoie (
    ID_CodeTypeVoie INT AUTO_INCREMENT PRIMARY KEY,
    Code VARCHAR(20) NOT NULL UNIQUE,
    Libelle VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE Communes (
    ID_Communes INT AUTO_INCREMENT PRIMARY KEY,
    CodeINSEE VARCHAR(10) NOT NULL UNIQUE,
    CodePostal VARCHAR(5) NOT NULL,
    Commune VARCHAR(200) NOT NULL,
    CodeCommune VARCHAR(5),
    CodeDepartement VARCHAR(5),
    INDEX idx_code_postal (CodePostal),
    INDEX idx_commune (Commune)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE CorrespoChampDmdPaiement (
    ID_CorrespondanceChampDmdPaiement INT AUTO_INCREMENT PRIMARY KEY,
    NomRubrique VARCHAR(50),
    RangColonneExcel DECIMAL(4,2),
    TypeColonne VARCHAR(50),
    FormatColonne VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE Departement (
    ID_Departement INT AUTO_INCREMENT PRIMARY KEY,
    codeDepartement VARCHAR(5) NOT NULL UNIQUE,
    nomDepartement VARCHAR(100) NOT NULL,
    chefLieu VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE DonneesBaseCombo (
    ID_DonneesBaseCombo INT AUTO_INCREMENT PRIMARY KEY,
    Type VARCHAR(30) NOT NULL,
    Code VARCHAR(20) NOT NULL,
    Libelle VARCHAR(50) NOT NULL,
    INDEX idx_type (Type),
    UNIQUE KEY unique_type_code (Type, Code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE HistoriqueImportDonnees (
    ID_HistoriqueImportDonnees INT AUTO_INCREMENT PRIMARY KEY,
    NomTable VARCHAR(100) NOT NULL,
    NomFichierExcel VARCHAR(100),
    DateHeureImportation DATE,
    DateHeureModificationFichier DATETIME,
    INDEX idx_nom_table (NomTable),
    INDEX idx_date_importation (DateHeureImportation)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE Pays (
    ID_Pays INT AUTO_INCREMENT PRIMARY KEY,
    nomPays VARCHAR(100) NOT NULL,
    codePays VARCHAR(10) NOT NULL
);

CREATE TABLE ReferencePrestation (
    ID_ReferencePrestation INT AUTO_INCREMENT,
    Code VARCHAR(20) NOT NULL,
    Libelle VARCHAR(150) NOT NULL,
    PRIMARY KEY (ID_ReferencePrestation)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE Intervenant (
    ID_Intervenant INT AUTO_INCREMENT,
    civilite VARCHAR(1) NOT NULL,
    nomIntervenant VARCHAR(60) NOT NULL,
    prenomIntervenant VARCHAR(80) NOT NULL,
    PRIMARY KEY (ID_Intervenant)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE InputPrestation (
    ID_InputPrestation INT AUTO_INCREMENT,
    ID_DemandePaiement INT NOT NULL,
    idDemandePaiement VARCHAR(50) NOT NULL,
    codeNature VARCHAR(10) NOT NULL,
    quantite INT NOT NULL,
    unite VARCHAR(10) NOT NULL,
    dateHeureCreation DATE NOT NULL,
    ID_Utilisateurs INT NOT NULL,
    mntUnitaireTTC DECIMAL(10, 2) NOT NULL,
    dateDebutEmploi DATE NOT NULL,
    dateFinEmploi DATE NOT NULL,
    mntPrestationTTC DECIMAL(10, 2) NOT NULL,
    mntPrestationHT DECIMAL(10, 2) NOT NULL,
    mntPrestationTVA DECIMAL(4, 2) NOT NULL,
    complement1 VARCHAR(50),
    complement2 VARCHAR(50),
    PRIMARY KEY (ID_InputPrestation)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE Particulier (
    ID_Particulier INT AUTO_INCREMENT,
    civilite VARCHAR(1) NOT NULL,
    nomNaissance VARCHAR(80) NOT NULL,
    nomUsage VARCHAR(80),
    prenoms VARCHAR(80) NOT NULL,
    dateNaissance VARCHAR(30) NOT NULL,
    codePaysNaissance VARCHAR(10) NOT NULL,
    departementNaissance VARCHAR(10) NOT NULL,
    codeCommune_Naissance VARCHAR(10) NOT NULL,
    libelleCommune_Naissance VARCHAR(50) NOT NULL,
    numeroTelephonePortable VARCHAR(20),
    adresseMail VARCHAR(50),
    numeroVoie VARCHAR(4),
    lettreVoie VARCHAR(1),
    codeTypeVoie VARCHAR(4),
    libelleVoie VARCHAR(30),
    complement VARCHAR(50),
    lieuDit VARCHAR(50),
    libelleCommune_Adresse VARCHAR(50),
    codeCommune_Adresse VARCHAR(10),
    codePostal VARCHAR(5),
    dateHeureModification DATE,
    codePays VARCHAR(10),
    bic VARCHAR(15),
    IBAN VARCHAR(40),
    titulaire VARCHAR(100),
    dateInscription DATE,
    dateHeureCreation DATE,
    utilisateurCreation INT,
    utilisateurModification INT,
    idClient VARCHAR(50),
    p_dateNaissance DATE,
    statutCode VARCHAR(100),
    statutDescription VARCHAR(250),
    statutEtat VARCHAR(5),
    PRIMARY KEY (ID_Particulier)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE DemandePaiement (
    ID_DemandePaiement INT AUTO_INCREMENT,
    idClient VARCHAR(50) NOT NULL,
    idDemandePaiement VARCHAR(50) NOT NULL,
    idTiersFacturation VARCHAR(30) NOT NULL,
    numFactureTiers VARCHAR(50) NOT NULL,
    dateFacture DATE NOT NULL,
    idClient_numFactureTiers VARCHAR(100) NOT NULL,
    dateDebutEmploi DATE NOT NULL,
    dateFinEmploi DATE NOT NULL,
    mntAcompte DECIMAL(10, 2),
    dateVersementAcompte DATE,
    mntFactureTTC DECIMAL(10, 2) NOT NULL,
    mntFactureHT DECIMAL(10, 2) NOT NULL,
    statut VARCHAR(50),
    statutlibelle VARCHAR(100),
    inforejet VARCHAR(50),
    inforejetcommentaire VARCHAR(250),
    mntVirement DECIMAL(10, 2),
    dateVirement DATE,
    ID_Utilisateurs INT NOT NULL,
    dateHeureCreation DATE NOT NULL,
    dateHeureModification DATE,
    ID_Particulier INT NOT NULL,
    PRIMARY KEY (ID_DemandePaiement),
    FOREIGN KEY (ID_Utilisateurs) REFERENCES Utilisateurs(ID_Utilisateurs),
    FOREIGN KEY (ID_Particulier) REFERENCES Particulier(ID_Particulier)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;