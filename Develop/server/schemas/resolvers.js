const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { Book } = require('../models');
const { AuthenticationError } = require('../utils/auth');
const { saveBook } = require('../controllers/user-controller');

const resolvers = {
    Query: {
        me: async (parent,args,context) => {
            if (context.user) {
                data = await User.findOne({ _id: context.user._id }).select('-_v -password');
            }
            
            throw new AuthenticationError('Must be logged in!');
        },
    },
},

Mutation: {
    login: async (parent, { email, username, password }) => {
        const user = await User.create({ username,email,password });
        const token =signToken(user);
        return { token, user };

        if (!user) {
            throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }
  
        const token = signToken(user);
        return { token, user };
      },

    addUser async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
  
        return { token, user };
      },
    
      saveBook: async (parent, { input }, context) => {
        if (context.user) {
          const user = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: input } },
            { new: true }
          );
  
          return user;
        }
  
        throw new Error('Must be logged in to perform action.');
      },
      removeBook async (parent, { bookId }, context) => {
        if (context.user) {
          const user = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
  
          return updatedUser;
        }
  
        throw new Error('Must be logged in to perform action.');
      },
    },

module.exports = resolvers