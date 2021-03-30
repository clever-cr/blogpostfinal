//import  static  from 'express';
import bcrypt from 'bcrypt'
import  {generateAuthToken}  from '../Helpers/token';
import UserData from '../model/Usermodel';
const Users = [];
class UserController {
    static signup = (req, res) => {
        const id = Users.length + 1;
        let {
            firstname,
            lastname,
            email,
            password,
            gender,
            role,
            department,
            adress
        } = req.body;
        password=bcrypt.hashSync(password,10)//why have we put here this 10?
        const isEmailExist = Users.find(User => User.email === email);
        if (isEmailExist) {
            return res.status(409).json({
                status: 409,
                error: "email is deplicated"
            });
        }
        const User = new UserData(id, firstname, lastname, email, password, gender, role, department, adress);
        Users.push(User);//adding information in array
        const data = Users.find((U) => U.email == email);
        
        if (!data) {
            return res.status(417).json({
                status: 417,
                message: "Account was not created",
               
            })
        }
        else{
        let  { password, ...dataWithOutPassword}=data
        return res.status(201).json({
            status: 201,
            message: "Account created successfully",
            data,
            data:dataWithOutPassword
         
        })
    }
        }

    

    static signin = (req, res) => {

        let {
            email,
            password } = req.body;
        const User = new UserData(email, password);
        Users.push(User);//adding information in array
        const data = Users.find((User) => User.email === email);
        const isUserExist = Users.find((User) => User.email === email);
        if (isUserExist && bcrypt.compareSync(password,isUserExist.password)) {
            const token = generateAuthToken({
                id:data.id,
                email:data.email,
                role:data.role,
           
            })
        
          
              
                let  { password, ...dataWithOutPassword}=data;
            return res.status(200).json({
               
                status: 200,
                message: "ok success",
                token: token,
              
                data:dataWithOutPassword
            })
        }
        
        return res.status(401).json({
            status: 401,
            message: "log in failed"
        })

    }


}


export default {UserController,Users};
