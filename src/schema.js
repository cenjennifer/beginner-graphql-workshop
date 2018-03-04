const randomBytes = require('crypto').randomBytes
const _ = require('lodash');

//Authors and Posts get data from JSON Arrays in the respective files.
const Authors = require('./data/authors');
const Posts = require('./data/posts');

/* Here a simple schema is constructed without using the GraphQL query language. 
  e.g. using 'new GraphQLObjectType' to create an object type 
*/

let {
  // These are the basic GraphQL types need in this tutorial
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  // This is used to create required fileds and arguments
  GraphQLNonNull,
  // This is the class we need to create the schema
  GraphQLSchema,
} = require('graphql');

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represent an author",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    twitterHandle: {type: GraphQLString}
  })
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This represent a Post",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    body: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve: function(post) {
        return _.find(Authors, a => a.id == post.author_id);
      }
    }
  })
});

// This is the Root Query
const BlogQueryRootType = new GraphQLObjectType({
  name: 'BlogAppSchema',
  description: "Blog Application Schema Query Root",
  fields: () => ({
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of all Authors",
      resolve: function() {
        return Authors
      }
    },
    author: {
      type: AuthorType,
      description: "A single author",
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: (root, args) => {
        const matchAuthorByName = _.find(Authors, a => a.name == args.name);
        if(!matchAuthorByName){
          throw new Error(`No author exists with this name: ${args.name}`);
        } 
        return matchAuthorByName
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      description: "List of all Posts",
      resolve: function() {
        return Posts
      }
    },
    post: {
      type: new GraphQLList(PostType),
      description: "A single post by author name",
      args: {
        authorName: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, args) => {
        const matchAuthorByName = _.find(Authors, a => a.name == args.authorName);
        if(!matchAuthorByName){
          throw new Error(`No author exists with this name: ${args.authorName}`);
        } 
        const matchPostsByAuthorId = _.filter(Posts, p => p.author_id === matchAuthorByName.id)
        if(!matchPostsByAuthorId){
          throw new Error(`No post exists with this author name: ${args.authorName}`);
        }
        return matchPostsByAuthorId
      }
    }
  })
});

// This is the Root Mutation
const BlogMutationRootType = new GraphQLObjectType({
  name: 'BlogAppMutationScheme',
  description: 'Blog Application Schema Mutation Root',
  fields: () => ({
    createAuthor: {
      type: AuthorType,
      description: "Create a new author",
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        twitterHandle: {type: GraphQLString}
      },
      resolve: (root, args) => {
        const createId = randomBytes(10).toString('hex');
        const newAuthor = Object.assign({}, {...args}, {id: createId})
        Authors.push(newAuthor)
        return newAuthor
      }
    }
  })
})

// This is the schema declaration
const BlogAppSchema = new GraphQLSchema({
  query: BlogQueryRootType,
  mutation: BlogMutationRootType 
});

module.exports = BlogAppSchema;