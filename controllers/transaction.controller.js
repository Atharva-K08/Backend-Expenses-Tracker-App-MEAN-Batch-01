const {
  createTranscation,
  getTranscationById,
  getTranscations,
  deleteTranscation,
  updateTranscation,
} = require("../services/transcation.service");

/**
 * Create a new transaction
 * @param {Object} req - Express request object
 * @param {Object} req.body - Transaction data
 * @param {string} req.body.userId - User ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.createTransactionController = async (req, res, next) => {
  try {
    if (!req.user.id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    req.body.userId = req.user.id
    if (!req.body.amount || req.body.amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero",
      });
    }
    req.body.amount = parseFloat(req.body.amount);
    const transaction = await createTranscation(req.body);

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get transaction by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Transaction ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.getTransactionController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID is required",
      });
    }

    const transaction = await getTranscationById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction retrieved successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all transactions for a user
 * @param {Object} req - Express request object
 * @param {string} req.user.id - User ID (from auth middleware)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.getTransactionsByUserController = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const transactions = await getTranscations({ userId });

    res.status(200).json({
      success: true,
      message: "Transactions retrieved successfully",
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Update a transaction
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Transaction ID
 * @param {Object} req.body - Updated transaction data
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.updateTransactionController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID is required",
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update data provided",
      });
    }

    const updatedTransaction = await updateTranscation(id, req.body);

    if (!updatedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a transaction
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Transaction ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.deleteTransactionController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID is required",
      });
    }

    const deletedTransaction = await deleteTranscation(id);

    if (!deletedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      data: deletedTransaction,
    });
  } catch (error) {
    next(error);
  }
};
