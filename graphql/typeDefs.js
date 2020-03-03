const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Access{
        id:ID!
        admin:Boolean,
        teacher:Boolean,
        departemant:Boolean,
        course:Boolean,
        student:Boolean,
        gallery:Boolean,
        offer:Boolean,
        website:Boolean,
        online:Boolean,
        live:Boolean
    
    }

    input InputAccess{
        admin:Boolean,
        teacher:Boolean,
        departemant:Boolean,
        course:Boolean,
        student:Boolean,
        gallery:Boolean,
        offer:Boolean,
        website:Boolean,
        online:Boolean,
        live:Boolean
    }
    type UserAdmin{
        id:ID
        name:String,
        mobile:String,
        password:String,
        active:Boolean,
        access:Access,
        token:String
       
    }

    type Teacher{
        id:ID!,
        name:String,
        mobile:String,
        password:String,
        active:Boolean,
        picture:String,
        resume:String
    }
    type SubDepartemant{
        id:ID!
        name:String
        active:Boolean
    }
    input ISubDepartemant{
        name:String,
        active:Boolean
    }
    type Departemant{
        id:ID!
        name:String!
        color:String
        active:Boolean,
        subDepartemant:[SubDepartemant]

    }
    type Query{
        getAllUserAdmin:[UserAdmin]!
        getAUserAdmin(id:ID!):UserAdmin!

        getAllTeacher:[Teacher]!
        getATeacher(id:ID!):Teacher!

        getAllDepartemant:[Departemant]!
        getADepartemant(id:ID!):Departemant!
    }
    type DetailsCourse{
        id:ID!
        code:String
        term:String
        days:String
        startDate:String
        capcity:String
        countSession:String
        time:String
        endDate:String
        price:String
        openRegister:Boolean
        openReserve:Boolean
        teacher:Teacher

    
    }
    type ShowInformation{
        menu:Boolean,
        active:Boolean,
        header:Boolean,
        home:Boolean,
        installment:Boolean
    }
   

    type Course{
        id:ID!
        title:String,
    courseType:String,
    description:String,
    audience:String,
    output:String,
    prequisite:String,
    deatils:[DetailsCourse],
   
    departemant:String,
    subDepartemant:String,
    show:ShowInformation,
    picture:String,
    headerBackImage:String,
    mobilePic:String,
    backMobilePic:String,
    video:String,
    posterVideo:String,
    
    
    }

    type Mutation{
        registerUserAdmin(name:String,mobile:String,password:String,access:InputAccess,confirmPassword:String,active:Boolean):UserAdmin!
        loginUserAdmin(mobile:String!,password:String!):UserAdmin!
        updateUserAdmin(id:ID!,name:String!,mobile:String!,password:String!,confirmPassword:String!,access:InputAccess!,active:Boolean!):UserAdmin!
        updateUserActive(id:ID!,active:Boolean):UserAdmin!


        addnewTeacher(name:String!,mobile:String!,password:String!,picture:String,active:Boolean!,resume:String):Teacher!
        updateTeacher(id:ID!,name:String,mobile:String,password:String,picture:String,active:Boolean,resume:String):Teacher!


        addDepartemant(name:String!,color:String,subDepartemant:[ISubDepartemant]):Departemant!
        updateDepartemant(id:ID!,name:String!,color:String,subDepartemant:[ISubDepartemant],active:Boolean):Departemant!
        updateActiveDepartemant(id:ID!,active:Boolean):Departemant!


        addCourseTitleAndType(title:String!,courseType:String!):Course!

        
    }


`;


module.exports = typeDefs;