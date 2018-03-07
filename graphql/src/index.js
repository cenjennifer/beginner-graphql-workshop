
let {
    GraphQLSchema // This is the class we need to create the schema
} = require('graphql');
const HackathonQueryRootType = require('./query');
const HackathonMutationRootType = require('./mutation');

const HackathonSchema = new GraphQLSchema({
    query: HackathonQueryRootType,
    mutation: HackathonMutationRootType 
});

module.exports = HackathonSchema;