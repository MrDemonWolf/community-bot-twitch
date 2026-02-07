import express from "express";

const router = express.Router();

import { botStatus } from "../../app";

/**
 *  @route GET /status
 *  @desc Get status of Twitch Bot
 *  @access Public
 *  @returns {object} - Status of Twitch Bot
 */
router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: botStatus.status,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
