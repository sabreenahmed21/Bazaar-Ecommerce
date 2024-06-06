import mongoose from 'mongoose';

const salesReportSchema = new mongoose.Schema({
  yearlySalesTotal: Number,
  yearlyTotalSoldUnits: Number,
  year: Number,
  monthlyData: [{ month: String, totalSales: Number, totalUnits: Number }],
  dailyData: [{ date: String, totalSales: Number, totalUnits: Number }],
});

const SalesReport = mongoose.model('SalesReport', salesReportSchema);
export default SalesReport;
