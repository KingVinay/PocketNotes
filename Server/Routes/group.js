const express = require("express");
const router = express.Router();
const groupController = require("../Controllers/group");

router.post("/create", groupController.createGroup);
router.get("/fetchgroups", groupController.getGroups);
router.get("/shareGroup/:groupId", groupController.shareGroup);
router.get("/searchGroups", groupController.searchGroup);
router.get("/getGroupById/:groupId", groupController.getGroupById);

router.post("/:groupId/addNote", groupController.addNote);
router.get("/:groupId/fetchnotes", groupController.getNotes);
router.get("/shareNote/:noteId", groupController.shareNote);
router.get("/getNoteById/:noteId", groupController.getNoteById);

module.exports = router;
