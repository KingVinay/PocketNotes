const Group = require("../Models/group");

const createGroup = async (req, res, next) => {
  try {
    const { groupName, groupColor } = req.body;

    if (!groupName || !groupColor) {
      return res
        .status(400)
        .json({ errorMessage: "Group name and color are required!" });
    }

    // Create new group
    const group = new Group({
      groupName,
      groupColor,
      shareableLink: "",
    });

    // Save the group
    const savedGroup = await group.save();

    // Generate shareable link
    const shareableLink = `${process.env.FRONTEND_HOST}/groups/${savedGroup._id}`;
    savedGroup.shareableLink = shareableLink;
    await savedGroup.save();

    res.json({
      message: "Group created successfully!",
      savedGroup,
    });
  } catch (error) {
    next(error);
  }
};

const addNote = async (req, res, next) => {
  try {
    const groupId = req.params;
    const { content } = req.body;

    if (!groupId || !content) {
      return res
        .status(400)
        .json({ errorMessage: "Group ID and content are required!" });
    }

    // Find the group by ID
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ errorMessage: "Group not found!" });
    }

    // Create new note
    const newNote = {
      content,
    };

    // Add note to the group's notes array
    group.notes.push(newNote);

    // Save the updated group
    const savedNote = await group.save();
    const NoteId = savedNote.notes.id();

    savedNote.notes.shareableLink = `${process.env.FRONTEND_HOST}/group/notes/${savedNote._id}`;

    // Add note to the group's notes array
    group.notes.push(newNote);

    // Save the updated group
    await group.save();

    res.status(201).json({
      message: "Note added successfully!",
      note: newNote,
    });
  } catch (error) {
    next(error);
  }
};

const getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    next(error);
  }
};

const shareGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ errorMessage: "Group not found!" });
    }

    res.json({ shareableLink: group.shareableLink });
  } catch (error) {
    next(error);
  }
};

const searchGroup = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "query parameter is required" });
    }

    const groups = await Group.find({
      groupName: new RegExp(query, "i"),
    }).exec();

    res.json(groups);
  } catch (error) {
    next(error);
  }
};

module.exports = { createGroup, addNote, getGroups, shareGroup, searchGroup };
