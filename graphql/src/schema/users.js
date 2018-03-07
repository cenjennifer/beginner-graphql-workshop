let {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull // This is used to create required fields and arguments
  } = require('graphql');

const UserType = new GraphQLObjectType({
    name: "User",
    description: "This represent an user",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        lastName: {type: new GraphQLNonNull(GraphQLString)}
    })
});

module.exports = UserType