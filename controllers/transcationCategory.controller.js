const {
  createTranscationCategory,
  getTranscationCategory,
  getTranscationCategories,
  deleteTranscationCategory,
  updateTranscationCategory,
} = require("../services/transcationCatetory.service");

/**
 * Create a new transaction category
 * @param {Object} req - Express request object
 * @param {Object} req.body - Category data
 * @param {string} req.body.userId - User ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.createTranscationCategoryController = async (req, res, next) => {
  try {
    if (!req.body.userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!req.body.name || req.body.name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category = await createTranscationCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Transaction category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get transaction category by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Category ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.getTranscationCategoryController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const category = await getTranscationCategory(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Transaction category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction category retrieved successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all transaction categories for a user
 * @param {Object} req - Express request object
 * @param {string} req.user.id - User ID (from auth middleware)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.getTranscationCategoriesController = async (req, res, next) => {
  try {
    const userId = req.user?.id  || req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const categories = await getTranscationCategories({ userId });

    res.status(200).json({
      success: true,
      message: "Transaction categories retrieved successfully",
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a transaction category
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Category ID
 * @param {Object} req.body - Updated category data
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.updateTranscationCategoryController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update data provided",
      });
    }

    if (req.body.name && req.body.name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category name cannot be empty",
      });
    }

    const updatedCategory = await updateTranscationCategory(id, req.body);

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Transaction category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a transaction category
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Category ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.deleteTranscationCategoryController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const deletedCategory = await deleteTranscationCategory(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Transaction category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    next(error);
  }
};
