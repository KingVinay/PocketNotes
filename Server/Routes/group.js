const express = require("express");
const router = express.Router();
const groupController = require("../Controllers/group");

router.post("/create", groupController.createGroup);
router.get("/fetchgroups", groupController.getGroups);
router.get("/shareGroup/:groupId", groupController.shareGroup);
router.get("/searchGroup", groupController.searchGroup);

module.exports = router;
