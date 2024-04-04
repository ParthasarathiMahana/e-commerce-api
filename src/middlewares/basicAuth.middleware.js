import User_model from "../features/user/user.model.js";

function basicAuth(req, res, next){
    const authHeader = req.header("authorization");

    if(!authHeader){
        return res.send("correct user detail is required.")
    }
    // [Basic df67fs77d88gfs78fds....]
    const encodedAuthHeader = authHeader.replace("Basic ","");
    const decodedCreds = Buffer.from(encodedAuthHeader, 'base64').toString('utf8')
    const [username, password] = decodedCreds.split(":");

    const allUsers = User_model.getAllUsers();
    const validUser = allUsers.find((user)=> username == user.email && password == user.password);

    if (validUser) {
        next()
    }else{
        return res.status(401).send("Incorrect credentials");
    }
}

export default basicAuth;