import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../models"; // Adjust path if needed

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong on the server" });
  }
});
// CREATED A TEST USER FOR DEBUGGING - LIEBE
router.post("/seed-user", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("test1234", 10);

    const newUser = await User.create({
      username: "testuser",
      password: hashedPassword,
    });

    res.json({ message: "Test user created", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create test user" });
  }
});

export default router;
