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
             const fileName = fichier.replace(".xlsx",'');
            //const [headers,setHeaders] = useState([])
            // Récupérer les en-têtes (clés du premier objet)
            let headers;
           // let stringHeader =[];
            if(jsonData.length !== 0)
            {
                headers = Object.keys(jsonData[0]);
                
               // for (let h = 0; h < headers.length; h++) {
               switch(fileName) {
                       
                    case "Communes":
                        let h = headers.length-1;
                        while(h > 0)
                            {
                                    
                            if(h < 3 || h===12 || h===15 ) 
                            {
                                    headers[h] = headers[h].replace(" ",'');
                                    
                            }
                                
                                else headers.splice(h,1);
                                h--;
                            }                
                    default:
                       for (let h = 0; h < headers.length; h++) {
                            headers[h] = headers[h].replace(" ",'');    
                       }                 
                } 
            }
                
            for (let i = 0; i < jsonData.length; i++) {
                let values = Object.values(jsonData[i])
               if(fileName ==="Communes")
               {
                    let m = values.length-1;
                        while(m > 0)
                            {
                                    
                            if(m < 3 || m===12 || m===15 ) 
                            {                                  
                                    
                            }                               
                            else values.splice(m,1);
                                m--;
                            } 
               }
                        let stringValue ="";
                         //console.log('code = ',Object.keys(jsonData[0]),' valeur =  ', jsonData.);
                         let val;
                        for (let h = 0; h < values.length; h++) {
                            if(typeof values[h] === "string")
                                val = values[h].replace("'","''");
                            else
                                val =  values[h];
                            switch(fileName) {
                                case "CorrespondanceChampsDemandePaiement":
                                    if(h > 1) break;
                                    stringValue +=(stringValue ==="" ? "" : ",") +`'${val}'`; 
                                    break;
                                case "Communes":
                                        //  rubVerif = "CodeINSEE";
                                        //  rubVerifValue = values[0];
                                       // if(h < 3 || h===12 || h===15 ) 
                                            stringValue +=(stringValue ==="" ? "" : ",") +`'${val}'`; 
                                        //else break; 
                                        break;
                                    default:                                                          
                                        stringValue +=(stringValue ==="" ? "" : ",") +`'${val}'`; 
                                        // code block
                                }                               
                        }
                       
                        let nomFichier = fileName;
                        let rubVerif = headers[0];
                        let rubVerifValue = `'${values[0]}'`;
                        switch(fileName) {
                            case "CorrespondanceChampsDemandePaiement":
                                nomFichier = "CorrespoChampDmdPaiement";
                                break;
                            case "DonneesDeBaseComboListe":
                                nomFichier = "DonneesBaseCombo";
                                rubVerif = "Code";
                                rubVerifValue = `'${values[1]}'`;
                                break;
                          case "Communes":
                                rubVerif = "CodeINSEE";
                                rubVerifValue = `'${values[0]}'`;
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
                                              
                                        }
                                        else
                                        {
                                           // const reqU = `INSERT INTO ${nomFichier} (${headers}) VALUES (${stringValue})`;    
                                           //construction des colonnes à modifier 
                                        let colsVal ="";
                                        let val;
                                           for (let k = 0; k < headers.length; k++) {
                                                
                                                  if(typeof values[k] === "string")
                                                    val = values[k].replace("'","''");
                                                    else
                                                    val =  values[k];
                                                colsVal +=(colsVal ==="" ? "" : ",") +` ${headers[k]} = '${val}'`; 
                                                
                                                
                                             }
                                             const reqU = `UPDATE ${nomFichier} SET ${colsVal} WHERE ${rubVerif} = ${rubVerifValue}`;    
                                                    db.query(reqU,(err,data)=>{
                                                    if(err){
                                                    console.log('error update', reqU, err);
                                                        //return res.json(err)
                                                    } 
                                                    else 
                                                    {
                                                        console.log('go update :', reqU);
                                                    }
                                                    })
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
