const  Base = require('./Base');

class ConsecutivePayments extends Base {
  constructor(loan) {
    super(loan)
  }

  consecutivePayments() {
    if (!this._consecutivePayments) {
      this._consecutivePayments = this.calculateConsecutivePayments(this.paymentsData())
    }
    return this._consecutivePayments
  }

  averageDaysConsecutiveAllotmentPayments() {
    const allotmentPayments = this.paymentsData().filter(e => e.source == 'Allotment')
    if (!this._averageDaysConsecutiveAllotmentPayments) {
      this._averageDaysConsecutiveAllotmentPayments =
        this.calculateAverageDaysAllotmentPayments(allotmentPayments)
    }
    return this._averageDaysConsecutiveAllotmentPayments
  }

  consecutiveAllotmentPayments() {
    const allotmentPayments = this.paymentsData().filter(e => e.source == 'Allotment')
    if (!this._consecutiveAllotmentPayments) {
      this._consecutiveAllotmentPayments = this.calculateConsecutivePayments(allotmentPayments)
    }
    return this._consecutiveAllotmentPayments
  }

  // função de pagamento com a data e tipo de pagamento retornando o array com pagamentos de allotments
  allotmentPayments() {
    return this.paymentsData().filter(e => e.source == 'Allotment')
  }

  calculateAverageDaysAllotmentPayments(paymentsData) {
    if (paymentsData.length == 0) {
      return []
    }
    // ordem que o pagamento foi feito: do primeiro mais antigo pro ultimo mais recente
    paymentsData.sort((a, b) => a.effectiveDate - b.effectiveDate)

    let averageDays = 0
    let differenceDays = 0
    let lastPayment = null
    paymentsData.forEach(paymentData => {
      differenceDays = this.consecutivePaymentsDiff(paymentData, lastPayment)
      lastPayment = paymentData
      if (differenceDays) {
        averageDays += differenceDays
      }
    })

    const paymentsDataCount = paymentsData.length
    if (paymentsDataCount < 2) {
      return 0
    } else {
      return averageDays / (paymentsDataCount - 1)
    }
  }

  consecutivePaymentsDiff(payment1, payment2) {
    if (!payment1 || !payment2) {
      return false
    }
    const effectiveDate1 = payment1.effectiveDate
    const effectiveDate2 = payment2.effectiveDate
    return Math.abs(effectiveDate1 - effectiveDate2)
  }

  calculateConsecutivePayments(paymentsData) {
    if (paymentsData.length == 0) {
      return []
    }

    paymentsData.sort((a, b) => a.effectiveDate - b.effectiveDate)
    let consecutivePayments = []
    paymentsData.forEach(paymentData => {
      if (!this.isConsecutivePayments(paymentData, consecutivePayments[consecutivePayments.length - 1])) {
        consecutivePayments = []
      }

      consecutivePayments.push(paymentData)
    })
    return consecutivePayments
  }

  isConsecutivePayments(payment1, payment2) {
    if (!payment1 || !payment2) {
      return false;
    }
    return Math.abs(payment1.effectiveDate - payment2.effectiveDate) <= this.PAY_CYCLE;
  }
}

module.exports = ConsecutivePayments;
