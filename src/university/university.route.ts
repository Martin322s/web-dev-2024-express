import { Router } from 'express';

const universityRouter = Router();

export let universities = [
  { id: 1, name: 'TU-Sofia' },
  { id: 2, name: 'NSA Vasil Levski' },
  { id: 3, name: 'UNWE' }
];

universityRouter.get('/', (req, res) => {
  res.json(universities);
});

universityRouter.get('/:id', (req, res) => {
  const uniId = parseInt(req.params.id);
  const uni = universities.find((u) => u.id === uniId);
  if (uni) {
    res.json(uni);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

universityRouter.post('/', (req, res) => {
  const newUniversity = {
    id: universities.length + 1,
    name: req.body.name
  };
  universities.push(newUniversity);
  res.status(201).json(newUniversity);
});

// PUT to update an existing user
universityRouter.put('/:id', (req, res) => {
  const uniId = parseInt(req.params.id);
  const uniIndex = universities.findIndex((u) => u.id === uniId);
  if (uniIndex !== -1) {
    universities[uniIndex] = {
      id: uniId,
      name: req.body.name
    };
    res.json(universities[uniIndex]);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

// DELETE a user by ID
universityRouter.delete('/:id', (req, res) => {
  const uniId = parseInt(req.params.id);
  const uniIndex = universities.findIndex((u) => u.id === uniId);
  if (uniIndex !== -1) {
    const deletedUniversity = universities.splice(uniIndex, 1);
    res.json(deletedUniversity[0]);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

export default universityRouter;