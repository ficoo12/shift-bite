const Shifts = require("./schedules.model");

const createShift = async (req, res) => {
  try {
    const shift = { ...req.body, owner: req.user.sub };
    const newShift = await Shifts(shift);
    await newShift.save();
    res.status(200).json(newShift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteShift = async (req, res) => {
  try {
    const { shiftId } = req.params;
    const deletedShift = await Shifts.findByIdAndDelete(shiftId);
    if (!deletedShift) {
      return res.status(404).json({ message: "shifta nije pronađena" });
    }
    res.status(200).json({ message: "shift deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllShifts = async (req, res) => {
  try {
    const owner = req.user.sub;
    const shifts = await Shifts.find({ owner })
      .populate("employee", "name surname role")
      .sort({ createdAt: -1 });
    res.status(200).send(shifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createShift,
  deleteShift,
  getAllShifts,
};
