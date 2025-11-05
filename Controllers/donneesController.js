//import { json } from "body-parser";
import db from "../config/db.js";
import fs from 'fs/promises';
import xlsx from 'xlsx';
import path from 'path';
 const  enregistrement = async(fichiersExcel,dossier) =>
{
     for (const fichier of fichiersExcel) {
            const cheminComplet = path.join(dossier, fichier);
            const workbook = xlsx.readFile(cheminComplet);
              
             const sheetName = workbook.SheetNames[0];
             const worksheet = workbook.Sheets[sheetName];
             const jsonData = xlsx.utils.sheet_to_json(worksheet);
            
            //const [headers,setHeaders] = useState([])
            // Récupérer les en-têtes (clés du premier objet)
            let headers;
           // let stringHeader =[];
            if(jsonData.length != 0)
            {
                headers = Object.keys(jsonData[0]);
                let h = 0;
               // for (let h = 0; h < headers.length; h++) {
                while(h < headers.length)
                {
                        
                   if(h < 3 || h===12 || h===15 ) 
                   {
                        headers[h] = headers[h].replace(" ",'');
                        h++;
                   }
                       
                    else headers.splice(h,1);
                }
                   
                    // stringHeader += (stringHeader =="" ? "" : ",") + headers[h].replace(" ",''); 
                    // stringHeader.push[]                           
               // }
            }
                
            for (let i = 0; i < jsonData.length; i++) {
                let values = Object.values(jsonData[i])
               
                        let stringValue ="";
                         //console.log('code = ',Object.keys(jsonData[0]),' valeur =  ', jsonData.);
                         const fileName = fichier.replace(".xlsx",'');
                        for (let h = 0; h < values.length; h++) {
                            
                            switch(fileName) {
                                case "CorrespondanceChampsDemandePaiement":
                                    if(h > 1) break;
                                    stringValue +=(stringValue =="" ? "" : ",") +`"${values[h]}"`; 
                                    break;
                                case "Communes":
                                        //  rubVerif = "CodeINSEE";
                                        //  rubVerifValue = values[0];
                                        if(h < 3 || h===12 || h===15 ) 
                                            stringValue +=(stringValue =="" ? "" : ",") +`"${values[h]}"`;
                                        else break; 
                                        break;
                                    default:
                                        stringValue +=(stringValue =="" ? "" : ",") +`"${values[h]}"`; 
                                        // code block
                                }                               
                        }
                       
                        let nomFichier = fileName;
                        let rubVerif = headers[0];
                        let rubVerifValue = `"${values[0]}"`;
                        switch(fileName) {
                            case "CorrespondanceChampsDemandePaiement":
                                nomFichier = "CorrespoChampDmdPaiement";
                                break;
                            case "DonneesDeBaseComboListe":
                                nomFichier = "DonneesBaseCombo";
                                break;
                          case "Communes":
                                rubVerif = "CodeINSEE";
                                rubVerifValue = values[0];
                                break;
                            default:
                                // code block
                        }
                        const sel =`SELECT COUNT(*) AS count FROM ${nomFichier} WHERE ${rubVerif} = ${rubVerifValue}`;
                       console.log('où se trouve cette requet ', sel);
                                 
                                let result = false;
                                               
                                await db.query(sel,(err,results)=>{
                                    if(err)
                                        {
                                            console.log('reqête erreur select :',sel); //return JSON.parse(err);
                                        }
                                    else
                                    {
                                        console.log('go 1 :',sel);
                                        if(results[0].count <= 0)
                                        {
                                            console.log('go 2 :',sel);
                                            // result = true;
                                            //  if (result != true)
                                            //     {
                                                    const q = `INSERT INTO ${nomFichier} (${headers}) VALUES (${stringValue})`;
                                                    
                                                
                                                    db.query(q,(err,data)=>{
                                                    if(err){
                                                    console.log('error ', q, err);
                                                        //return res.json(err)
                                                    } 
                                                    else 
                                                    {
                                                        console.log('go insert :', q);
                                                    }
                                                    })
                                              //  } 
                                        }
                                    }
                                })

                }
           
          
        }


    
                     //   return result;
}
export const parcourirFichiersExcel = async (req, res) => {
//async function parcourirFichiersExcel(dossier) {
    const dossier = './docexcel';
    try {
        const fichiers = await fs.readdir(dossier);
        const fichiersExcel = fichiers.filter(f => 
            path.extname(f).toLowerCase() === '.xlsx'
        );
        await enregistrement(fichiersExcel,dossier);
       const message = "Mise à jour de la base de données terminée .";
        
        //const resultats = [];
      // return res.status('200').json(`Mise à jour de la base de données terminée .`);
      return  res.status(200).json(message);
        
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw res.status('400').json(`Le dossier "${dossier}" n'existe pas`);
            //console.error(`Le dossier "${dossier}" n'existe pas`);
        } else if (error.code === 'EACCES') {
            throw res.status('400').json(`Accès refusé au dossier "${dossier}"`);
            //console.error(`Accès refusé au dossier "${dossier}"`);
        } else {
            throw res.status('400').json('Erreur inattendue:', error);
            //console.error('Erreur inattendue:', error);
        }
        //throw error;
    }
    
   // return resultats;
}
