const NewTeacher = require('../../../models/teacher/Teacher');
const checkAuth  = require('../../../utils/checkAuth');
const bcryptJs = require('bcryptjs');
module.exports ={

    Query:{
        async getAllTeacher(){
            const teachers = await NewTeacher.find();
            return teachers;
        },
        async getATeacher(_,{id}){
            const teacher = await NewTeacher.findById(id);
            return teacher;
        }
    },

    Mutation:{
            async addnewTeacher(_,{name,mobile,password,picture,active,resume},context){
                    const check = checkAuth(context);

                    try {
                        const teacher = await NewTeacher.findOne({mobile});
                        if(teacher){
                            throw new Error("Teeacher already exist");
                        }

                        const newteacher = new NewTeacher({
                            name,
                            mobile,
                            password,
                            picture,
                            active,
                            resume
                        });
                        
                        const slat = await bcryptJs.genSalt(10);
                        const hashPassword = await bcryptJs.hash(password,slat);

                        newteacher.password = hashPassword;

                        await newteacher.save();

                        return{
                            ...newteacher._doc,
                            id:newteacher.id
                        }

                    } catch (error) {
                        throw new Error(error);
                    }
            },
            async updateTeacher(_,{id,name,mobile,password,picture,active,resume},context){
                //const check = checkAuth(context);

                const teacher = await NewTeacher.findById(id);
                teacher.name = name;
                teacher.mobile = mobile;
                if(teacher.password !== password){
                   const salt = await bcryptJs.genSalt(10);
                   const hashPassword = await bcryptJs.hash(password,salt);
                   teacher.password = hashPassword;     
                }else{
                    teacher.password = password;
                }
                teacher.picture = picture;
                teacher.active = active;
                teacher.resume = resume;

                await teacher.save();
                return teacher;
                
            }
           
    }
}