// const express = require('express');
// const cors = require('cors');
// const { graphqlHTTP } = require('express-graphql');
// const schema = require('./schema')

// const app = express();

// app.use(cors());

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true,
// }))

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`));

// const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');

const { ApolloServer } = require("apollo-server")
const { gql } = require("apollo-server-core")

let authors = [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: 'J. R. R. Tolkien' },
    { id: 3, name: 'Brent Weeks' }
]

let books = [
    { id: 1, title: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
    { id: 2, title: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
    { id: 3, title: 'Harry Potter and the Goblet of Fire', authorId: 1 },
    { id: 4, title: 'The Fellowship of the Ring', authorId: 2 },
    { id: 5, title: 'The Two Towers', authorId: 2 },
    { id: 6, title: 'The Return of the King', authorId: 2 },
    { id: 7, title: 'The Way of Shadows', authorId: 3 },
    { id: 8, title: 'Beyond the Shadows', authorId: 3 }
]

const typeDefs = gql`
    type Book {
        id: Int!
        title: String!
        authorId: Int
        author: Author!
    }

    type Author {
        id: Int!
        name: String!
        books: [Book!]!
    }

    type Query {
        bookCount: Int!
        allBooks: [Book!]!
        allAuthors: [Author!]!
        findBookByTitle(title: String!): [Book]
        findAuthorByName(name: String!): [Author]
        author(authorId: Int!): Author
    }
    
    type Mutation {
        addBook (
            title: String!
            authorId: Int!
        ): Book
        addAuthor (name: String!): Author
    }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        allBooks: () => books,
        allAuthors: () => authors,
        findBookByTitle: (root, args) => books.filter(b => b.title.includes(args.title)),
        findAuthorByName: (root, args) => authors.filter(a => a.name.includes(args.name)),
    },
    Book: {
        author: (root) => authors.find((a) => a.id === root.authorId)
    },
    Author: {
        books: (root) => books.filter(b => b.id === root.id)
    },
    Mutation: {
        addBook: (root, args) => {
            const book = { id: books.length + 1, ...args }
            books = books.concat(book)
            return book
        },
        addAuthor: (root, args) => {
            const author = { id: authors.length + 1, ...args }
            authors = authors.concat(author)
            return author
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})