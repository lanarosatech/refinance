const ConsecutivePayments = require('./ConsecutivePayments');

class PaymentAnalyzer extends ConsecutivePayments {
  constructor(loan) {
    super(loan);
  }

  canRefinance() {
    // Adiciona mais infos no output dos testes
    const analysisResults = this.analyzeData();
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + this.PAY_CYCLE * 24 * 60 * 60 * 1000);

    console.log('Analysis Results:', analysisResults);
    console.log('Current Date:', currentDate);
    console.log('Future Date:', futureDate);

    if (analysisResults.lastPaymentDate < futureDate) {
      console.log('Condition 1: Not met'); // Sinaliza qual condição não está dentro da regra de refinanciamento
      return false; // Fora do prazo de refinanciamento
    }

    if (analysisResults.paymentsCount < this.CONSECUTIVE_PAYMENTS) {
      console.log('Condition 2: Not met');
      return false; // Número mínimo de pagamentos consecutivos não atendido
    }

    if (this.cantRefinanceByRuleAverageDays(analysisResults)) {
      console.log('Condition 3: Not met');
      return false; // Regra de média de dias consecutivos não atendida
    }

    if (analysisResults.paymentsMeanDiffPercent > this.ALLOWED_PAYMENTS_MEAN_DIFF_PERCENT) {
      console.log('Condition 4: Not met');
      return false; // Diferença percentual média excedida
    }

    return true; // Todas as verificações passaram, autoriza refinanciamento
  }

  cantRefinanceByRuleAverageDays() {
    if (this.analyzeData().paymentsCount === 0) {
      return true;
    }
    if (this.analyzeData().averageDaysConsecutiveAllotmentPaymentsCount <= this.PAY_CYCLE) {
      return true;
    }
    return false;
  }

  analyzeData() {
    const paymentsSum = this.allotmentPaymentsSum();
    const paymentsMean = paymentsSum / this.allotmentPayments().length;
    const paymentsMeanDiff = this.loan.fixedPaymentAmount - paymentsMean;
    const paymentsMeanDiffPercentege = (paymentsMeanDiff / this.loan.fixedPaymentAmount) * 100;

    const consecutiveAllotmentPayments = this.consecutiveAllotmentPayments();

    return {
      averageDaysConsecutiveAllotmentPaymentsCount: this.averageDaysConsecutiveAllotmentPayments(),
      paymentsCount: this.allotmentPayments().length,
      lastPaymentDate: consecutiveAllotmentPayments[consecutiveAllotmentPayments.length - 1].effectiveDate,
      paymentsSum,
      paymentsMean,
      paymentsMeanDiff,
      paymentsMeanDiffPercentege,
    };
  }

  allotmentPaymentsSum() {
    return this.allotmentPayments().reduce((acc, cur) => acc + cur.amount, 0);
  }

  consecutiveAllotmentPaymentsSum() {
    return this.consecutiveAllotmentPayments().reduce((acc, cur) => acc + cur.amount, 0);
  }
}

module.exports = PaymentAnalyzer;
