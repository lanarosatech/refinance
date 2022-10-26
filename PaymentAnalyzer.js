import ConsecutivePayments from './ConsecutivePayments'

class PaymentAnalyzer extends ConsecutivePayments {
  constructor(loan) {
    super(loan)
  }

  canRefinance() {
    if (this.analyzeData().lastPaymentDate.add(this.PAY_CYCLE, 'days') < Date.now()) {
      return false
    }

    if (this.analyzeData().paymentsCount < this.CONSECUTIVE_PAYMENTS) {
      return false
    }

    if (this.cantRefinanceByRuleAverageDays()) {
      return false
    }

    if (
      this.analyzeData().paymentsMeanDiffPercentege > this.ALLOWED_PAYMENTS_MEAN_DIFF_PERCENTEGE
    ) {
      return false
    }

    return true
  }

  cantRefinanceByRuleAverageDays() {
    if (this.analyzeData().paymentsCount === 0) {
      return true
    }

    if (this.analyzeData().averageDaysConsecutiveAllotmentPaymentsCount > this.PAY_CYCLE) {
      return true
    }

    return false
  }

  analyzeData() {
    const paymentsSum = this.allotmentPaymentsSum()
    const paymentsMean = paymentsSum / this.allotmentPayments().length
    const paymentsMeanDiff = this.loan.fixedPaymentAmount - paymentsMean
    const paymentsMeanDiffPercentege = (paymentsMeanDiff / this.loan.fixedPaymentAmount) * 100

    const consecutiveAllotmentPayments = this.consecutiveAllotmentPayments()

    return {
      averageDaysConsecutiveAllotmentPaymentsCount: this.averageDaysConsecutiveAllotmentPayments(),
      paymentsCount: this.allotmentPayments().length,
      lastPaymentDate: consecutiveAllotmentPayments[consecutiveAllotmentPayments.length -1].effectiveDate,
      paymentsSum: paymentsSum,
      paymentsMean: paymentsMean,
      paymentsMeanDiff: paymentsMeanDiff,
      paymentsMeanDiffPercentege: paymentsMeanDiffPercentege
    }
  }

  allotmentPaymentsSum() {
    return this.allotmentPayments().reduce((acc, cur) => acc + cur.amount, 0)
  }

  consecutiveAllotmentPaymentsSum() {
    return this.consecutiveAllotmentPayments().reduce((acc, cur) => acc + cur.amount, 0)
  }
}

export default PaymentAnalyzer
