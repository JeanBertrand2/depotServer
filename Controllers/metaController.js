import db from "../config/db.js";

export function getAllMeta(req, res) {
  db.query("SELECT * FROM Pays", (err, pays) => {
    if (err) return res.status(500).json({ error: err.message });
    db.query("SELECT * FROM CodeTypeVoie", (err2, codeTypeVoie) => {
      if (err2) return res.status(500).json({ error: err2.message });
      db.query("SELECT * FROM Departement", (err3, departement) => {
        if (err3) return res.status(500).json({ error: err3.message });
        res.json({ pays, codeTypeVoie, departement });
      });
    });
  });
}
