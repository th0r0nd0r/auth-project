import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';

// standard auth route
router.get('/login', (req, res) => {
  // standard login
});

router.get('/logout', (req, res) => {
  // log out users
});


router.get('/linkedin', (req, res) => {
  // handle request for linkedin
});

export default router;