// const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
// const { User } = require("../models");
// const { SECRET_KEY } = process.env;


// const authenticate = async (req, res, next) => {
//   const { authorization = "" } = req.headers;

//   const [bearer, token] = authorization.split(" ");

//   if (bearer !== "Bearer") {
//     next(ApiError.unauthorized("Not authorized"));
//     return;
//   }

//   try {
//     const { id } = jwt.verify(token, SECRET_KEY);

//     const user = await User.findOne({ where: { id, token: token } });

//     if (!user) {
//       next(ApiError.unauthorized("Not authorized"));
//       return;
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     next(ApiError.unauthorized("Not authorized"));
//   }
// };

// module.exports = authenticate;


const tokenService = require("../service/token-service");

const authenticate = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError("Not authorized"));
    }

    const accessToken = authorizationHeader.split(" ")[1];
    
    if (!accessToken) {
      return next(ApiError.UnauthorizedError("Not authorized"));
    }

    const userData = tokenService.validateAccessToken(accessToken);


    if (!userData) {
      return next(ApiError.UnauthorizedError("Not authorized"));
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError("Not authorized"));
  }
};

module.exports = authenticate;