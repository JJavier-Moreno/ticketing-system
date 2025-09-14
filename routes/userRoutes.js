import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Ambos campos son obligatorios");
  }

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Email o contraseña no válidos");
  }

  const passwordCorrecta = await bcrypt.compare(password, user.password);
  if (!passwordCorrecta)
    return res.status(400).send("Email o contraseña no válidos.");

    let token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.header("Authorization", `Bearer ${token}`).json({token: token});
});

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).send("El usuario ya está registrado");
  }

  user = new User({
    name,
    email,
    password,
    role,
  });

  try {
    await user.save();

    let token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    //Importante enviar el header
    res
      .header("Authorization", `Bearer ${token}`)
      .send({ user: user.name, email: user.email, role: user.role, token });

  } catch (error) {
    console.error("Error en /signup:", error);
    res.status(500).send("Algo fue mal", error);
  }
});

export default router;
