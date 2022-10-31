const jwt = require("jsonwebtoken");
const permission = require("../auth/permission.json");
const _ = require('lodash');
const extractToken = (bearerToken) => {
    const regex = /^(Bearer) (.*)$/g;
    const match = regex.exec(bearerToken);
    if (match && match[2]) {
      return match[2];
    }
    return null;
}

const isAuthorize = async (urlArray, userScopes, reqMethod) => {
    try {
        let obj = {}, allowedScopes = [];
        urlArray.forEach(element => {
            if(element.length === 0) return;
            if (permission.hasOwnProperty(`/${element}`)) {
                obj = {...permission[`/${element}`]};
                allowedScopes = obj.scopes[reqMethod];
            } else {
                if(!_.isEmpty(obj) && obj.hasOwnProperty(`/${element}`)){
                    obj = {...obj[`/${element}`]};
                    allowedScopes = obj.scopes[reqMethod];
                }
                if(!_.isEmpty(obj) && obj.hasOwnProperty(`/*`)){
                    obj = {...obj[`/*`]};
                    allowedScopes = obj.scopes[reqMethod];
                }
            }
        });
        console.log(allowedScopes,userScopes);
        return await allowedScopes.some(r=> userScopes.includes(r));
    } catch (error) {
        throw new Error("Cannot Authorize!");
    }
}

module.exports = (strict=true) => async(req,res,next) => {
    try {
        const idToken = req.headers.authorization ? extractToken(req.headers.authorization) : null;

        if(idToken && strict){
            const tokenData = await jwt.verify(idToken, process.env.SECRET_KEY);
            console.log(tokenData);
            const urlArray = req.originalUrl.split("/");
            const access = await isAuthorize(urlArray,tokenData.scopes, req.method);
            if(!access && strict) throw new Error("User not Authorize!! Roles not Sufficient for Operation.");
            next();
        }
        else if(!strict){
            next();
        }
        else{
            throw new Error("Not Authorize!");
        }
    
    } catch (error) {
        // console.log(error);
        return res.status(403).send({message: error.message});
    }
}




