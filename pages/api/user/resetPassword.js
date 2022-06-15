import nc from 'next-connect';
import bcrypt from 'bcrypt';

import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  }
}).post(async (req, res) => {
  await dbConnect();
  if (req.body.passwordOne === req.body.passwordTwo) {
    const password = await bcrypt.hash(req.body.passwordOne, 10);
    await User.findOneAndUpdate({ _id: req.body._id }, { password: password });

    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

export default handler;
