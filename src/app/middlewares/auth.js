const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({error: 'No token provided'});

    const parts = authHeader.split(' ');

    if(!parts.lenght === 2)
        return res.status(401).send({error: 'Token error'});

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' });

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) return res.status(401).send({error:'Token invalid'});

        req.userId = decoded.id;
        return next();
        });

        class Auth {
            constructor() {
                document.querySelector("body").style.display = "none";
                const auth = localStorage.getItem("auth");
                this.validateAuth(auth);
            }
        
            validateAuth(auth) {
                if (auth != 1) {
                    window.location.replace("/");
                } else {
                    document.querySelector("body").style.display = "block";
                }
            }
        
            logOut() {
                localStorage.removeItem("auth");
                window.location.replace("/");
            }
        }
};