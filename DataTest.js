const PaymentAnalyzer = require('./PaymentAnalyzer');
const BancoDeDados = require('./BancoDeDados'); // Importar o módulo para interagir com o banco de dados

// Dados de exemplo para simular um cenário de teste
const loan = {
  fixedPaymentAmount: 100, // Valor fixo do pagamento
};

// Criar uma instância da classe PaymentAnalyzer
const paymentAnalyzer = new PaymentAnalyzer(loan);

// Consultar o banco de dados para recuperar os pagamentos
const paymentsFromData = BancoDeDados.queryPayments(); // Implemente a função de consulta no módulo db

// Definir a função paymentsData para retornar os pagamentos do banco de dados
paymentAnalyzer.paymentsData = () => paymentsFromData;

if (paymentAnalyzer.canRefinance()) {
  console.log("Refinanciamento autorizado.");
} else {
  console.log("Refinanciamento não autorizado.");
}
