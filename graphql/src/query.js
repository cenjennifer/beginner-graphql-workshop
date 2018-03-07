const { UserType, ProjectType } = require('./schema')
const { Users, Projects } = require('../../data')
const {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const user = {
    type: UserType,
    description: "A single user",
    args: {
        id: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve: function(root, args) {
        return Users.find(user => user.id == args.id)
    }
}

const users = {
    type: new GraphQLList(UserType),
    description: "List of all users",
    resolve: function() {
        return Users
    }
}

//Exercise: setup query for a `project` and `projects`
const project = {
    
}

const projects = {

}

const HackathonQueryRootType = new GraphQLObjectType({
    name: 'HackathonQuerySchema',
    description: "Hackathon Schema Query Root",
    fields: () => ({
        user,
        users,
        // project, //comment back in when exercise is complete
        // projects, //comment back in when exercise is complete
    })
});

module.exports = HackathonQueryRootType;