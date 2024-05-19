import { NextFunction, Request, Response } from 'express';
import CheckListItem from '../models/checklist-item.model';
import asyncHandler from 'express-async-handler';

// @desc    Add a new checklist item
// @route   POST /api/checklist-items/
// @access  Public
export const createCheckListItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkListItem = await CheckListItem.create(req.body);

    res.status(201).json({
      success: true,
      data: checkListItem,
      message: 'Checklist item created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get checklist items
// @route   GET /api/checklist-items/
// @access  Public
export const getCheckListItems = asyncHandler(async (req, res, next) => {
  try {
    const checkListItems = await CheckListItem.find({}).lean();

    res.status(200).json({
      checkListItems,
      message: checkListItems.length
        ? 'Checklist items retrieved successfully!'
        : 'No checklist items found!',
      success: !!checkListItems.length,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get checklist item
// @route   GET /api/checklist-items/:id
// @access  Public
export const getCheckListItem = asyncHandler(async (req, res, next) => {
  try {
    const checkListItem = await CheckListItem.findById(req.params.id);

    if (!checkListItem) {
      res.status(404);
      throw new Error('Checklist item not found!');
    }

    res.status(200).json({
      checkListItem,
      message: 'Checklist item retrieved successfully!',
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update a checklist item
// @route   PUT /api/checklist-items/:id
// @access  Public
export const updateCheckListItem = asyncHandler(async (req, res, next) => {
  try {
    const checkListItem = await CheckListItem.findById(req.params.id);

    if (!checkListItem) {
      res.status(404);
      throw new Error('Checklist item not found!');
    }

    const updatedCheckListItem = await CheckListItem.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true }
    );

    res.status(200).json({
      checkListItem: updatedCheckListItem,
      message: 'Checklist item updated successfully!',
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a checklist item
// @route   DELETE /api/checklist-items/:id
// @access  Public
export const deleteCheckListItem = asyncHandler(async (req, res, next) => {
  try {
    const checkListItem = await CheckListItem.findByIdAndDelete(req.params.id);

    if (!checkListItem) {
      res.status(404);
      throw new Error('Checklist item not found!');
    }

    res.status(200).json({
      checkListItem,
      message: 'Checklist item deleted successfully!',
      success: true,
    });
  } catch (error) {
    next(error);
  }
});
