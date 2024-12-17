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
