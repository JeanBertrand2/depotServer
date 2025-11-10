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

export const updateUser = (req, res) => {
  const id = req.params.id;
  const { Login, MotDePasse, Nom, Prenoms, adresseMail } = req.body;
  const query = `UPDATE ${UtilisateursModel.table} SET Login = ?, MotDePasse = ?, Nom = ?, Prenoms = ?, adresseMail = ? WHERE ID_Utilisateurs = ?`;
  db.query(
    query,
    [Login, MotDePasse, Nom, Prenoms, adresseMail, id],
    (error, data) => {
      if (error) {
        console.log("update user error : ", error);
        return res.status(500).json({ error: "Erreur de la base de données" });
      }
      console.log("update user : ", data);
      return res
        .status(200)
        .json({ message: "Utilisateur mis à jour avec succès" });
    }
  );
};
