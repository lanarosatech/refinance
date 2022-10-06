class Base {
  CONSECUTIVE_PAYMENTS = 12
  ALLOWED_PAYMENTS_MEAN_DIFF_PERCENTEGE = 8
  PAY_CYCLE = 14

  constructor(loan) {
    this.loan = loan
    this.borrower = loan.loanBorrower
  }

  paymentsBetween(startDate, endDate) {
    return this.loan.payments
      .where({
        effectiveDate: {
          $gte: startDate,
          $lte: endDate
        }
      })
      .toArray()
  }

  paymentsData() {
    return this.loan.payments.toArray()
  }
}