const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';
const expiration = '2h';
const { GraphQLError } = 


module.exports = {
    AuthenticationError: new GraphQLError('User not authenticated.',
     {
      extensions:{
        code: 'UNAUTHENTICATED',
      },
    }),

  // Authenticated Routes
  authMiddleware({ req }) {

    let token = req.query.token || req.headers || req.body.token.authorization ;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
