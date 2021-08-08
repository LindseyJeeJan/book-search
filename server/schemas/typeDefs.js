const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]!
    } 

    type Book {
        _id: bookId
        authors: [String]!
        description: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        books(username: String): [Book]
        book(bookId: ID!): Book
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(userId: ID!, bookId: ID!): User
        removeBook(userId: ID!, bookId: ID!): User
    }
`;

module.exports = typeDefs;