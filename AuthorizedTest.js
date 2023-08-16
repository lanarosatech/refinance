const PaymentAnalyzer = require('./PaymentAnalyzer');

// Dados de exemplo para simular um cenário de teste
const loan = {
  fixedPaymentAmount: 100, // Valor fixo do pagamento
};

// Criar uma instância da classe PaymentAnalyzer
const paymentAnalyzer = new PaymentAnalyzer(loan);

paymentAnalyzer.paymentsData = () => [
  { source: 'Allotment', effectiveDate: new Date('2023-08-01'), amount: 100 },
  { source: 'Allotment', effectiveDate: new Date('2023-08-05'), amount: 100 },
  { source: 'Allotment', effectiveDate: new Date('2023-08-10'), amount: 100 }, // Dentro do ciclo de pagamento e consecutivo
  { source: 'Allotment', effectiveDate: new Date('2023-08-15'), amount: 100 }, // Consecutivo
  { source: 'Allotment', effectiveDate: new Date('2023-08-20'), amount: 100 }, // Consecutivo
  { source: 'Allotment', effectiveDate: new Date('2023-08-25'), amount: 100 }, // Consecutivo
  { source: 'Allotment', effectiveDate: new Date('2023-08-30'), amount: 100 }, // Consecutivo
  { source: 'Allotment', effectiveDate: new Date('2023-09-04'), amount: 100 }, // Consecutivo
  { source: 'Allotment', effectiveDate: new Date('2023-09-09'), amount: 100 }, // Consecutivo
  { source: 'Allotment', effectiveDate: new Date('2023-09-14'), amount: 100 }, // Consecutivo
  { source: 'Allotment', effectiveDate: new Date('2023-09-19'), amount: 100 }, // Consecutivo
  { source: 'Allotment', effectiveDate: new Date('2023-09-24'), amount: 100 }, // Consecutivo
  { source: 'Allotment', effectiveDate: new Date('2023-09-29'), amount: 100 }, // Consecutivo
  { source: 'Allotment', effectiveDate: new Date('2023-10-04'), amount: 100 }, // Consecutivo
];

if (paymentAnalyzer.canRefinance()) {
  console.log("Refinanciamento autorizado.");
} else {
  console.log("Refinanciamento não autorizado.");
}
