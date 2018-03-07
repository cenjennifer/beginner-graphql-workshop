let {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull
} = require('graphql');
const { Users } = require('../../../data')
const UserType  = require('./users.js')

const ProjectType = new GraphQLObjectType({
    name: "Project",
    description: "This represent a project",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        members: {
            type: new GraphQLList(UserType),
            resolve: function(project){
                return project.members.map(memberId => Users.find(user => user.id === memberId))
            }
        }
    })
});
  
module.exports = ProjectType