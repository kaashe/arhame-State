import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res
      .status(201)
      .json({ message: "Listing Created Succesfuly!", listing, status: 201 });
  } catch (error) {
    next(error);
  }
};
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ error: "Listing not found!:deleteUser" });
  }
  const reqId = req.user.id;
  const userId = listing.userRef;
  if (reqId !== userId) {
    return res
      .status(401)
      .json({ error: "Not Allowed to delete!:delete Listing" });
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing Deleted", status: 200 });
  } catch (error) {
    next(error);
  }
};
