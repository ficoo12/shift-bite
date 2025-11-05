const Shifts = require("./schedules.model");
require("dotenv").config();

const createShift = async (req, res) => {
  try {
    const shift = { ...req.body, owner: req.userId };
    const newShift = await Shifts(shift);
    await newShift.save();
    res.status(200).json(newShift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteShift = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedShift = await Shifts.findByIdAndDelete(id);
    if (!deletedShift) {
      return res.status(404).json({ message: "shifta nije pronađena" });
    }
    res
      .status(200)
      .json({ message: "shift deleted successfully", deletedShift });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllShifts = async (req, res) => {
  try {
    const owner = req.userId;
    const shifts = await Shifts.find({ owner })
      .populate("employee", "name surname role")
      .sort({ createdAt: -1 });
    res.status(200).send(shifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editShift = async (req, res) => {
  try {
    const ownerId = req.userId;
    const { id } = req.params;
    const updateShift = await Shifts.findOneAndUpdate(
      { owner: ownerId, _id: id },
      { ...req.body, owner: ownerId },
      { new: true }
    );

    if (!updateShift) {
      res.status(404).send({ message: "shift not found" });
    }
    res
      .status(200)
      .send({ success: "Shift updated successfuly", shift: updateShift });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createShift,
  deleteShift,
  getAllShifts,
  editShift,
};
