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
}).get(async (req, res) => {
  await dbConnect();

  const users = await User.find({});
  res.status(200).json({ success: true, data: users });
});
export default handler;
