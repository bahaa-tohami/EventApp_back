import jwt from "jsonwebtoken"

export const isLogged = (req, res, next) => {

    // On va extraire le token du headers

    let authToken = req.headers.authorization;
    let token = authToken && authToken.split(" ")[1];

    console.log("token extrait: " + token);

    if (!token) {
        return res.json({ message: "Vous n'êtes pas authentifié" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.json({ message: "Vous n'êtes pas autorisé à accéder à cette page" })
        }

        req.userId = decoded.id

        next();

    })

}