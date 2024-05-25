import { Router } from "express";

import getGeocode from "../controllers/getGeocode";
import getReverseGeocode from "../controllers/getReverseGeocode";

const router = Router();

router.get("/getGeocode", getGeocode);
router.get("/getReverseGeocode", getReverseGeocode);

export default router;
