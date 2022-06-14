import nc from 'next-connect';

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

  User.findOneAndUpdate({ _id: req.body._id }, { description: req.body.description }, async (error, user) => {
    if (error) throw error;
    if (!user) res.json({ success: false });
    else {
      res.json({ success: true });
    }
  });
});

export default handler;
