const NewUserAdmin = require('../../../models/userAdmin/NewUserAdmin');
const bcryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const checkAuth = require('../../../utils/checkAuth');

module.exports = {
    Query:{
        async getAllUserAdmin(){
            const useradmins = await NewUserAdmin.find();
            return useradmins;
            
        },
        async getAUserAdmin(_,{id}){
            try {
                const admin = await NewUserAdmin.findById(id);
                return admin;
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation:{
        async registerUserAdmin(_,{name,mobile,password,confirmPassword,access,active},context){
            const check = checkAuth(context);
            try {
                const admin = await NewUserAdmin.findOne({mobile});
                if(admin){
                    throw new Error("This User Admin Already Exist");
                   
                }
                if(name === ''){
                    throw new Error("name is required");
                }
                if(mobile === ''){
                    throw new Error("mobile is required");
                }
                if(password === ''){
                    throw new Error("password is required");
                }
                if(password !== confirmPassword){
                    throw new Error("confirmPassword is required");
                }

                const newuseradmin = new NewUserAdmin({
                    name,
                    mobile,
                    password,
                    access,
                    active
                });

                const salt = await bcryptJs.genSalt(10);
                const hashpassword = await bcryptJs.hash(password,salt);

                newuseradmin.password = hashpassword;

                await newuseradmin.save();

                return{
                    ...newuseradmin._doc,
                    id:newuseradmin.id
                }


            } catch (error) {
                throw new Error(error);
            }
        },

        async loginUserAdmin(_,{mobile,password}){
            try {
                
                const admin = await NewUserAdmin.findOne({mobile});
                if(!admin){
                    throw new Error('Admin is not defined');
                }

                const match = await bcryptJs.compare(password,admin.password);
                if(!match){
                    throw new Error("Password is not correct");
                }

                const token = jwt.sign({id:admin.id,name:admin.name,active:admin.active,access:admin.access,mobile:admin.mobile},config.get('secretKey'),{
                    expiresIn:'1h'
                });



                return {
                    ...admin._doc,
                    id:admin.id,
                    token
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        async updateUserAdmin(_,{id,name,mobile,password,confirmPassword,access,active},context){
            try {
                const check = checkAuth(context);
                const admin = await NewUserAdmin.findById(id);
                admin.name = name;
                admin.mobile = mobile;
                admin.active = active;
                admin.access = access;

                
                if(admin.password === password){
                    admin.password = password;
                }else{
                    const salt = await bcryptJs.genSalt(10);
                    const hashpassword = await bcryptJs.hash(password,salt);
                    admin.password = hashpassword;
                }

                await admin.save();
                return admin;

            } catch (error) {
                throw new Error(error);
            }
        },
        async updateUserActive(_,{id,active}){
            const admin = await NewUserAdmin.findById(id);
            admin.active = active;
            await admin.save();
            return admin;
        }
        
    }
}