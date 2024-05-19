import { NextFunction, Request, Response } from 'express';
import CheckList from '../models/checklist.model';
import asyncHandler from 'express-async-handler';

// @desc    Add a new checklist
// @route   POST /api/checklists/
// @access  Public
export const createCheckList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checklist = await CheckList.create(req.body);

    res.status(201).json({
      success: true,
      data: checklist,
      message: 'Checklist created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get checklist
// @route   GET /api/checklists/
// @access  Public
export const getCheckLists = asyncHandler(async (req, res, next) => {
  try {
    const checklists = await CheckList.find({}).lean();

    res.status(200).json({
      checklists,
      message: checklists.length
        ? 'Checklists retreived successfully!'
        : 'No Checklists found!',
      success: !!checklists.length,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get checklist
// @route   GET /api/checklists/:id
// @access  Public
export const getCheckList = asyncHandler(async (req, res, next) => {
  try {
    const checklist = await CheckList.findById(req.params.id);

    if (!checklist) {
      res.status(404);
      throw new Error('Checklist not found!');
    }

    res.status(200).json({
      checklist,
      message: 'Checklist retreived successfully!',
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update a checklist
// @route   PUT /api/checklists/:id
// @access  Public
export const updateCheckList = asyncHandler(async (req, res, next) => {
  try {
    const checklist = await CheckList.findById(req.params.id);

    if (!checklist) {
      res.status(404);
      throw new Error('Checklist not found!');
    }

    const updatedCheckList = await CheckList.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true }
    );

    res.status(200).json({
      checklist: updatedCheckList,
      message: 'Checklist updated successfully!',
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a checklist
// @route   DELETE /api/checklists/:id
// @access  Public
export const deleteCheckList = asyncHandler(async (req, res, next) => {
  try {
    const checklist = await CheckList.findByIdAndDelete(req.params.id);

    if (!checklist) {
      res.status(404);
      throw new Error('CheckList not found!');
    }

    res.status(200).json({
      checklist,
      message: 'Checklist deleted successfully!',
      success: true,
    });
  } catch (error) {
    next(error);
  }
});
