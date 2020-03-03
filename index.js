const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {ApolloServer} = require('apollo-server-express');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


//call db

connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req}) => ({req})
});

server.applyMiddleware({app});

//define port
const PORT = process.env.PORT || 4000;

app.listen(PORT,() =>{
    console.log("Graphql server is running on http://localhost:4000/graphql");
})

 // mongodb://artfacto_user:m9pCtP42d8@artfactoryedu.com:27017/artfacto_db



