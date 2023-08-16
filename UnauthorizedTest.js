const PaymentAnalyzer = require('./PaymentAnalyzer');

// Dados de exemplo para simular um cenário de teste não autorizado
const loan = {
  fixedPaymentAmount: 100, // Valor fixo do pagamento
};

// Criar uma instância da classe PaymentAnalyzer
const paymentAnalyzer = new PaymentAnalyzer(loan);

paymentAnalyzer.paymentsData = () => [
  { source: 'Allotment', effectiveDate: new Date('2023-08-01'), amount: 80 },
  { source: 'Allotment', effectiveDate: new Date('2023-08-02'), amount: 90 },
  { source: 'Allotment', effectiveDate: new Date('2023-08-03'), amount: 110 },
];

if (paymentAnalyzer.canRefinance()) {
  console.log("Refinanciamento autorizado.");
} else {
  console.log("Refinanciamento não autorizado.");
}
