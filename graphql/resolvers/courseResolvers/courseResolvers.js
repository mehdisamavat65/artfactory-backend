const NewCourse = require('../../../models/course/NewCourse');
const checkAuth = require('../../../utils/checkAuth');
module.exports = {

    Mutation:{
        async addCourseTitleAndType(_,{title,courseType},context){
               // const check = checkAuth(context);

                try {
                    const course = await NewCourse.findOne({title});
                    if(course){
                        throw new Error("Course is already exist")
                    }

                    const newcourse = new NewCourse({
                        title,
                        courseType
                    });

                    await newcourse.save();
                    return{
                        ...newcourse._doc,
                        id:newcourse.id
                    }
                } catch (error) {
                    throw new Error(error);
                }
        }
    }
}