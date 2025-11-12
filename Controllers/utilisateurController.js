import db from "../config/db.js";
import bcrypt from "bcrypt";
import { UtilisateursModel } from "../Model/Utilisateurs.js";

export const getUser = (req, res) => {
  const query = `SELECT * FROM ${UtilisateursModel.table}`;
  db.query(query, (error, data) => {
    if (error) {
      console.log("liste utilisateur error : ");
      return res.status(500).json({ error: "Erreur de la base de données" });
    }
    console.log("liste utilisateur : ", data);
    return res.status(200).json(data);
  });
};

export const getUserById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM ${UtilisateursModel.table} WHERE ID_Utilisateurs = ?`;
  db.query(query, [id], (error, data) => {
    if (error) {
      console.log("get user by id error : ");
      return res.status(500).json({ error: "Erreur de la base de données" });
    }
    console.log("get user by id : ", data);
    return res.status(200).json(data);
  });
};

export const createUser = (req, res) => {
  const { Login, MotDePasse, Nom, Prenoms, adresseMail } = req.body;
  const saltRounds = 10;
  bcrypt.hash(MotDePasse, saltRounds, (hashError, hashedPassword) => {
    if (hashError) {
      console.log("hash password error:", hashError);
      return res
        .status(500)
        .json({ error: "Erreur lors du hachage du mot de passe" });
    }
    const query = `INSERT INTO ${UtilisateursModel.table} (Login, MotDePasse, Nom, Prenoms, adresseMail) VALUES (?, ?, ?, ?, ?)`;
    db.query(
      query,
      [Login, hashedPassword, Nom, Prenoms, adresseMail],
      (error, data) => {
        if (error) {
          console.log("create user error : ", error);
          return res
            .status(500)
            .json({ error: "Erreur de la base de données" });
        }
        console.log("create user : ", data);
        return res
          .status(201)
          .json({ message: "Utilisateur créé avec succès" });
      }
    );
  });
};

export const deleteUser = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM ${UtilisateursModel.table} WHERE ID_Utilisateurs = ?`;
  db.query(query, [id], (error, data) => {
    if (error) {
      console.log("delete user error : ", error);
      return res.status(500).json({ error: "Erreur de la base de données" });
    }
    console.log("delete user : ", data);
    return res
      .status(200)
      .json({ message: "Utilisateur supprimé avec succès" });
  });
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { Login, MotDePasse, Nom, Prenoms, adresseMail } = req.body;

    const fields = [];
    const values = [];

    if (Login) fields.push("Login = ?"), values.push(Login);
    if (Nom) fields.push("Nom = ?"), values.push(Nom);
    if (Prenoms) fields.push("Prenoms = ?"), values.push(Prenoms);
    if (adresseMail) fields.push("adresseMail = ?"), values.push(adresseMail);
    if (MotDePasse) {
      const hashed = await bcrypt.hash(MotDePasse, 10);
      fields.push("MotDePasse = ?");
      values.push(hashed);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
    }

    const query = `UPDATE ${UtilisateursModel.table} SET ${fields.join(
      ", "
    )} WHERE ID_Utilisateurs = ?`;
    values.push(id);

    db.query(query, values, (err, data) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ error: "Erreur de la base de données" });
      }
      return res
        .status(200)
        .json({ message: "Utilisateur mis à jour avec succès" });
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Erreur serveur inattendue" });
  }
};
