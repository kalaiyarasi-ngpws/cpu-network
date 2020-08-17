import {
    BCPromiseQuery,
} from '../config'
const sign = require('jsonwebtoken/sign');


// import {loginQuery} from './login.query'

const login = async(req,res)=>{
    let response = {} 
    if (!req.body.username) {
        return res.send({ error: true, msg: 'Error Username  Not Exist' });
    }
    if (!req.body.password) {
        return res.send({ error: true, msg: 'Error Password  Not Exist' });
    }

    let users = await BCPromiseQuery(`select * from users where username ='${req.body.username}'  and password='${req.body.password}' limit 1`);
    console.log(users.rows);
        if(users.rows[0]){
            const tokenObj = {
                name: users.rows[0].name,
                email: users.rows[0].email,
                id:users.rows[0].id
            };
            const secretkey = process.env.JWT_SECRET_KEY;
            const token = sign(tokenObj, secretkey, {
                expiresIn: '8h',
            });

            response= {
                error:false,
                msg:'successfully logged in.',
                token:token
            }
        }else{
            response= {error:true,msg:'Login Failed! Please check your credentials.'}
        }
        return res.send(response);


}

export{
    login
}