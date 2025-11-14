export const WriteSession = (req, res) => {
    const { version } = req.body;
    if (version) {
        req.session.version = version; // Écrire une donnée dans la session
        res.send(`Version ${version}`);
    } else {
        res.send('Verssion SANDBOX.');
    }
}

export const getSession =  (req, res) => {
    let version ="SANDBOX";
   if (req.session.version) {
        version = req.session.version;
       //res.send(`Version, ${req.session.version} !`);
       res.status(200).json(version);
       
    } else {
        res.status(200).json(version);
    }
}

//  req.session.version = ( req.session.version||0) +1;
//         res.json(req.session.version);

