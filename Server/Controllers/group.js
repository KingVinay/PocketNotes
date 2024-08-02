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
    const { groupId } = req.params;
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
      shareableLink: "",
    };

    // Add note to the group's notes array
    group.notes.push(newNote);

    // Save the updated group
    const savedNoteGroup = await group.save();

    const savedNote = savedNoteGroup.notes[group.notes.length - 1];

    const shareableLink = `${process.env.FRONTEND_HOST}/${groupId}/notes/${savedNote._id}`;
    savedNote.shareableLink = shareableLink;

    await savedNoteGroup.save();

    res.json({
      message: "Note added successfully!",
      savedNote,
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

const shareNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    // Find the group containing the note
    const group = await Group.findOne({ "notes._id": noteId });

    if (!group) {
      return res.status(404).json({ errorMessage: "Note not found!" });
    }

    // Find the note within the group
    const note = group.notes.id(noteId);

    if (!note) {
      return res.status(404).json({ errorMessage: "Note not found!" });
    }

    res.status(200).json({ shareableLink: note.shareableLink });
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

const getNotes = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ errorMessage: "Group not found!" });
    }

    res.json(group.notes);
  } catch (error) {
    next(error);
  }
};

const getGroupById = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({ errorMessage: "Group Id is required!" });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ errorMessage: "Group not found!" });
    }

    res.json(group);
  } catch (error) {
    next(error);
  }
};

const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    // Find the group containing the note
    const group = await Group.findOne({ "notes._id": noteId });

    if (!group) {
      return res.status(404).json({ errorMessage: "Note not found!" });
    }

    // Find the note within the group
    const note = group.notes.id(noteId);

    if (!note) {
      return res.status(404).json({ errorMessage: "Note not found!" });
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGroup,
  addNote,
  getGroups,
  shareGroup,
  shareNote,
  searchGroup,
  getNotes,
  getGroupById,
  getNoteById,
};
