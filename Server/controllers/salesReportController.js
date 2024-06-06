import asyncWrapper from '../middlewares/asyncWrapper.js';
import httpStatusText from '../utils/httpStatusText.js';
import appError from '../utils/appError.js';
import SalesReport from '../models/salesReportModel.js';

export const getSalesReportByProductId = asyncWrapper(async (req, res, next) => {
  const salesReport = await SalesReport.findOne({ productId: req.params.productId });

  if (!salesReport) {
    return next(new appError('No sales report found for this product', 404, httpStatusText.ERROR));
  }

  res.status(200).json({
    state: httpStatusText.SUCCESS,
    salesReport,
  });
});

export const getSales = async (req, res) => {
  const salesReport = await SalesReport.find();
  if (!salesReport) {
    return next(new appError('No sales report found ', 404, httpStatusText.ERROR));
  }

  res.status(200).json({
    state: httpStatusText.SUCCESS,
    salesReport,
  })
}