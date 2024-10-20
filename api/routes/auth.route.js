import express from "express";

// import { signup } from "../controllers/auth.controller.js";
import { signin  , login, enterproductinfo } from "../controllers/auth.controller.js";
// import { google } from "../controllers/auth.controller.js";

const router = express.Router();

// router.post("/signup", signup);
console.log('-------->>>>>>>>>>>')
router.post("/signin", signin);
router.post("/login", login);
router.post("/productInfo" ,enterproductinfo )
// router.post("/google", google);

export default router;