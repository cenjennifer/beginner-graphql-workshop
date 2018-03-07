const { UserType, ProjectType } = require('./schema')
const { Users, Projects } = require('../../data')
const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull
} = require('graphql');

const createUser = {
    type: UserType,
    description: "Create a new user",
    args: {
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        lastName: {type: new GraphQLNonNull(GraphQLString)},
    },
    resolve: (root, args) => {
        const createId = Users.length + 1
        const newUser = Object.assign({}, {...args}, {id: createId})
        Users.push(newUser)
        return newUser
    }
}

const createProject = {
    type: ProjectType,
    description: "Create a new project",
    args: {
        members: {type: new GraphQLList(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        office: {type: new GraphQLList(GraphQLString)}
    }, 
    resolve: (root, args) => {
        const createId = Projects.length + 1
        const newProject = Object.assign({}, {...args}, {id: createId})
        Projects.push(newProject)
        return newProject
    }
}

const HackathonMutationRootType = new GraphQLObjectType({
    name: 'HackathonMutationScheme',
    description: 'Hackathon Schema Mutation Root',
    fields: () => ({
        createUser,
        createProject
    })
})

module.exports = HackathonMutationRootType;