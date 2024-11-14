import { Router } from 'express';
import { universities } from '../university/university.route';

const userRouter = Router();

let users: { 
  id: number; 
  name: string; 
  email: string; 
  university: { id: number; name: string } | {}; 
  subjects: string[];
}[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', university: { id: -1, name: '' }, subjects: [] },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', university: { id: -1, name: '' }, subjects: [] },
];

userRouter.get('/', (req, res) => {
  res.json(users);
});

userRouter.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.post('/', (req, res) => {
  const universityId = req.body.universityId;
  const university = universities.find(x => x.id === universityId);
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    university: university ? university : {},
    subjects: req.body.subjects || []
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

userRouter.patch('/subject/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const subject = req.body.subject;
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    const user = users[userIndex];

    user.subjects = [...user.subjects, subject];

    users.splice(userIndex, 1, user);
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// PUT to update an existing user
userRouter.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = {
      id: userId,
      name: req.body.name,
      email: req.body.email,
      university: req.body.university || {},
      subjects: req.body.subjects || []
    };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE a user by ID
userRouter.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.patch('/', (req, res) => {
  const userId = parseInt(req.body.userId);
  let user = users.find(x => x.id === userId);
  let userIndex = users.findIndex(x => x.id === userId);

  const universityId = parseInt(req.body.universityId);
  let university = universities.find(x => x.id === universityId);

  if (user && university) {
    const newUser = { ...user, university: university };
    users.splice(userIndex, 1, newUser);
    res.json(newUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default userRouter;
