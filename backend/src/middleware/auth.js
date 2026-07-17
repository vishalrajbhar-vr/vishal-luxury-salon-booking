// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv'
// dotenv.config({ path: './config.env' })

// const auth = async (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     const [bearer, token] = authHeader.split(" ");
//     // const token = authHeader.split(" ")[1];


//     if (bearer !== "Bearer") {
//         return res.status(401).json({
//             message: "Invalid Token"
//         });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded;

//     next();

// }

// export default auth


import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing",
            });
        }

        const [bearer, token] = authHeader.split(" ");

        if (bearer !== "Bearer" || !token) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token Expired or Invalid",
        });
    }
};

export default auth;