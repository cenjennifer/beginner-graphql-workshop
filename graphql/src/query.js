const { UserType, ProjectType } = require('./schema')
const { Users, Projects } = require('../../data')
const {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull
} = require('graphql');

const user = {
    type: UserType,
    description: "A single user",
    args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: function(root, args) {
        return Users.find(user => user.id === args.id)
    }
}

const users = {
    type: new GraphQLList(UserType),
    description: "List of all users",
    resolve: function() {
        return Users
    }
}

const project = {
    type: ProjectType,
    description: "A single project by name",
    args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (root, args) => {
        const matchedProject = Projects.find(project => project.name === args.name)
        if(!matchedProject){
            throw new Error(`No projects exists with this name: ${args.name}`);
        }
        return matchedProject
    }
}

const projects = {
    type: new GraphQLList(ProjectType),
    description: "List of all projects",
    resolve: function() {
        return Projects
    }
}

const HackathonQueryRootType = new GraphQLObjectType({
    name: 'HackathonQuerySchema',
    description: "Hackathon Schema Query Root",
    fields: () => ({
        users,
        projects,
        project,
        user
    })
});

module.exports = HackathonQueryRootType;