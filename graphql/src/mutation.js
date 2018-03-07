const { UserType } = require('./schema')
const { Users } = require('../../data')
const {
    GraphQLString,
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

//Exercise: write a mutation to `createProject`
const createProject = {

}

const HackathonMutationRootType = new GraphQLObjectType({
    name: 'HackathonMutationScheme',
    description: 'Hackathon Schema Mutation Root',
    fields: () => ({
        createUser,
        // createProject //comment back in when exercise is complete
    })
})

module.exports = HackathonMutationRootType;