import express from "express";
import mongoose from "mongoose";
import { auth } from "../middlewares/auth.js";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.status(200).json({ tickets });
  } catch (err) {
    res.status(500).send(`Algo fue mal ${err}`);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const ticket = await Ticket.findOne({id});
    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    res.status(200).json({ ticket });
  } catch (err) {
    res.status(400).send(`Algo fue mal ${err}`);
  }
});

router.put("/:id", auth, async (req, res) => {
  const updates = req.body;
  const id = req.params.id;

  try {
    const ticket = await Ticket.findOneAndUpdate({id}, updates, {
      new: true,
    });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    res.status(200).json({ ticket });
  } catch (err) {
   res.status(400).send(`Algo fue mal ${err}`);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const ticket = await findByIdAndDelete({id});
    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    res.status(200).json({ ticket });
  } catch (err) {
    res.status(400).send("Algo fue mal");
  }
});

router.post("/", auth, async (req, res) => {
  const { title, description, priority, status } = req.body;
  const { _id } = req.user;
  const user = await User.findOne({ _id });
  if (!user) {
    return res.status(400).send("Usuario no encontrado");
  }

  let ticket = new Ticket({
    title,
    description,
    priority,
    status,
    user: user.id,
  });

  try {
    const newTicket = await ticket.save();
    res.status(200).json({ ticket: newTicket });
  } catch (err) {
    res.status(500).send(`Algo fue mal: ${err}`);
  }
});

export default router;
