import UserModel from "../models/userModel.js";


export const getStaffDetails = async (req, res) => {
  try {
    const staff = await UserModel.findById(req.user.id)
      .populate("company", "name email") // optional: also show company info
      .select("-password");

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    // Get user ID from token
    const userId = req.user.id;  // <-- from decoded.id

    // Find and update
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true, runValidators: true } // ensure updated doc + schema validation
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};