import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const { firstName, lastName, username, email, password } = req.body;
  if (req.method === 'POST') {
    if (!email.length > 3 || !password.length > 3) {
      res.status(200).json({
        success: false,
        error: 'E-mail and password has to be at least 4 characters long.'
      });
      return;
    }

    await dbConnect();
    try {
      const existingUser = await User.findOne({ email: email });

      if (!existingUser) {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
          firstName,
          lastName,
          username,
          email,
          password: passwordHash
        });
        await user.save();
        res.status(200).json({
          success: true,
          error: 'User is created.'
        });
      } else {
        res.status(200).json({
          success: false,
          error: 'Email is occupied.'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Unknown error occured, please contact an administrator for further help.'
      });
    }
  }
}
