const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('savedBooks');
        },
        user: async (parent, { _id }) => {
            return User.findOne({ username }).populate('savedBooks');
        },
        books: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Book.find(params);
        },
        book: async (parent, { _id }) => {
            return Book.findOne({ _id: bookId });
        },
         me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('savedBooks');
        }
        throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
            },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
            },
        saveBook: async (parent, { userId, bookId }) => {
        const saveBook = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: {savedBooks: book._id}},
            { new: true }
        );
        return vote;
        },
    },
};

module.exports = resolvers;