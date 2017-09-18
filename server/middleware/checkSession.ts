import { Request, Response, NextFunction } from 'express';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userId) {
      next();
    } else {
      res.redirect('/welcome');
    }
  };
};
