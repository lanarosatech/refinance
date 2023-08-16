class Base {
  CONSECUTIVE_PAYMENTS = 12
  ALLOWED_PAYMENTS_MEAN_DIFF_PERCENTEGE = 8
  PAY_CYCLE = 30

  constructor(loan) {
    this.loan = loan
  }

  paymentsData() {
    // to Array will fetch the payments from database
    return this.loan.payments.toArray()
  }
}

module.exports = Base;
