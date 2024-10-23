import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (username === 'user' && password === 'password') {
      res.status(200).json({ message: '로그인 성공!' });
    } else {
      res.status(401).json({ message: '잘못된 자격 증명' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
