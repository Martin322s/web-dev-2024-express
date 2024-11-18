import express, { Request, Response } from 'express';
import { db } from '../database';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
  try {
    const { name, email, universityId } = req.body;
    const university = await db.models.University.findByPk(universityId);

    if (!university) {
      res.status(404).json({ error: 'University not found' });
      return;
    }

    if (await db.models.User.findOne({ where: { email } })) {
      throw new Error("User already exists.")
    }
    
    const user = await db.models.User.create({ name, email, universityId, subjects: [] });

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await db.models.User.findAll({
      include: {
        model: db.models.University,
        as: 'university',
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create/subject', async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    let subject = await db.models.Subject.findOne({ where: { title } });
    
    if (!subject) {
      subject = await db.models.Subject.create({
        title: title,
      });
    }

    res.status(201).json({
      message: 'Subject created successfully',
      subject: subject
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/update/subject', async (req: Request, res: Response) => {
  try {
    const { userId, subjectId } = req.body; 
    
    const user = await db.models.User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return; 
    }

    const subject = await db.models.Subject.findByPk(subjectId);
    if (!subject) {
      res.status(404).json({ error: 'Subject not found' });
      return;
    }

    await user.update({ subjects: [...user.subjects, subjectId] });

    res.status(200).json({
      message: 'Subject successfully added to user',
      // user: user,
      // subject: subject,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
