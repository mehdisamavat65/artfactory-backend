const checkAuth = require('../../../utils/checkAuth');
const NewDepartemant = require('../../../models/departemant/NewDepartemant');

module.exports = {
    Query:{
        async getAllDepartemant(){
            const departemants = await NewDepartemant.find();
            return departemants;
        },
        async getADepartemant(_,{id}){
            const departemant = await NewDepartemant.findById(id);
            return departemant;
        }
    },
    Mutation:{
        async addDepartemant(_,{name,color,subDepartemant},context){
               // const check = checkAuth(context)

               try {
                   const departemant = await NewDepartemant.findOne({name});
                   if(departemant){
                       throw new Error('Departemant already exist');
                   }

                   const newdepartemant = new NewDepartemant({
                       name,
                       color,
                       subDepartemant,
                       active:true

                   });

                   await newdepartemant.save();

                   return{
                       ...newdepartemant._doc,
                       id:newdepartemant.id
                   }

               } catch (error) {
                throw new Error(error);
               }
        },
        async updateDepartemant(_,{id,name,color,subDepartemant,active},context){
            const departemant = await NewDepartemant.findById(id);
            departemant.name = name;
            departemant.color = color;
            departemant.active = active;
            departemant.subDepartemant = subDepartemant;

            await departemant.save();
            return departemant;
        },
        async updateActiveDepartemant(_,{id,active},context){
            //const check = checkAuth(context);
            const departemant = await NewDepartemant.findById(id);
            departemant.active = active;
            await departemant.save();
            return departemant
        }
    }
}