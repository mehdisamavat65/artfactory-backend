const userAdminResolvers = require('./userAdminResolvers/userAdminResolvers');
const teacherResolvers = require('./teacherResolvers/teacherResolvers');
const departemantResolvers = require('./departemantResolvers/departemantResolvers');
const courseResolvers = require('./courseResolvers/courseResolvers');
module.exports = {
   Query:{
      ...userAdminResolvers.Query,
      ...teacherResolvers.Query,
      ...departemantResolvers.Query
   },
   Mutation:{
        ...userAdminResolvers.Mutation,
        ...teacherResolvers.Mutation,
        ...departemantResolvers.Mutation,
        ...courseResolvers.Mutation
   }
}