import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

const options = {
  providers: [
    CredentialsProvider({
      name: 'Project',
      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials.email.length === 0 || credentials.email.length === 0) return null;
        await dbConnect();
        const response = await User.findOne({ email: credentials.email });
        const user = response;
        if (response) {
          const auth = new Promise((resolve, reject) => {
            bcrypt.compare(credentials.password, response.password, function (err, isSame) {
              if (isSame) {
                // Info stored in session
                resolve({
                  _id: user._id,
                  id: user._id.toString(),
                  email: user.email,
                  CreatedTimestamp: user.CreatedTimestamp
                });
              } else {
                resolve(null);
              }
            });
          });
          return await auth;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) token.user = user;
      if (account) token.user.provider = account.provider;
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      let authUser = false;

      if (account.provider === 'credentials') {
        await User.findByIdAndUpdate(user._id, {
          LastLoginDate: new Date()
        });
        authUser = true;
      }

      if (authUser) return true;
      else return false;
    },
    redirect({ url, baseUrl }) {
      return baseUrl + '/profile';
    }
  },
  secret: 'test',
  jwt: {
    secret: 'test',
    encryption: true
  },
  pages: {
    signIn: '/authentication'
  }
};

export default (req, res) => NextAuth(req, res, options);
