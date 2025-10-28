import express from "express";
import msql from "mysql";
import cors from "cors";

const app = express()
app.use(express.json())
app.use(cors());
// const db = msql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"de34%124",
//     database:"dbecole"
// });
const db = msql.createConnection({
    host:"https://chamois.o2switch.net:2083",
    user:"sc7jzvl0578_urssaf",
    password:"xH4JPCm565Io",
    database:"sc7jzvl0578_urssaf"
});
//db.connect();
// app.get("/",(req,res)=>{
//     res.json("hello this is th backend")
// })
app.get("/pays",(req,res)=>{
    const q = "select * from Pays";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
});
app.post("/etudiants",(req,res)=>{
    const q = "INSERT INTO etudiants (Name,Age) VALUES (?)";
    const values =[req.body.Name,
        req.body.Age]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
            return res.json("L'étudiant a été créé avec succès")
    })
})
//8800
app.listen(2083,()=>{
    console.log("Connected to backend!")
})