class User_model{
    constructor(id, name, email, password, type){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type
    }

    static getAllUsers(){
        return users;
    }

    static signUp({name, email, password, type}){
        const id = users.length+1;
        const newUser = new User_model(id, name, email, password, type);
        users.push(newUser);
        return newUser;
    }

    static signIn({email, password}){
        const myUser =  users.find((currentUser)=> email === currentUser.email && password === currentUser.password);
        return myUser;
    }
}

const users=[
    {
        id:1,
        name: "Parth",
        email: "psm@gmail.com",
        password: "123",
        type:"Admin"
    }
]

export default User_model;