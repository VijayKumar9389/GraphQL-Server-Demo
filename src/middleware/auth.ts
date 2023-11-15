import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token: string | undefined = req.headers['access-token'] as string;
    const user: any = jwt.decode(token);

    if (!token) {
        res.send({ auth: false, msg: 'Please log in' });
    } else {
        jwt.verify(token, 'secret', (err, decode) => {
            if (err) {
                res.status(401);
                res.json({ auth: false, msg: 'Failed to verify token' });
                console.log(err);
            } else {
                console.log('Valid Token');
                next();
            }
        });
    }
};

export default validateToken;
