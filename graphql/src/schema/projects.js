let {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull
} = require('graphql');
const { Users } = require('../../../data')
const UserType  = require('./users.js')

//Exercise: create scheme for a project 
const ProjectType = {}

module.exports = ProjectType