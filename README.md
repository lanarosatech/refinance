# Regras de Refinanciamento - Documentação

Este documento fornece uma visão geral das regras de refinanciamento implementadas no sistema. As regras de refinanciamento determinam se um empréstimo é elegível para refinanciamento com base em várias condições.

## Condições de Refinanciamento

O refinanciamento é autorizado somente se todas as seguintes condições forem atendidas:

1. **Dentro do Prazo de Refinanciamento:**
   - A data do último pagamento deve ser anterior à data futura definida para refinanciamento. Isso garante que o empréstimo esteja dentro do prazo para refinanciamento.

2. **Número Mínimo de Pagamentos Consecutivos:**
   - O empréstimo deve ter pelo menos um número mínimo de pagamentos consecutivos, conforme definido pelo sistema.

3. **Regra de Média de Dias Consecutivos:**
   - A média de dias consecutivos entre os pagamentos do tipo "Allotment" não deve exceder o ciclo de pagamento, como definido pelo sistema.

4. **Diferença Percentual Média Permitida:**
   - A diferença percentual média entre os pagamentos do tipo "Allotment" e o valor fixo do pagamento não deve exceder um limite permitido, conforme definido pelo sistema.

## Executando os Testes

**Com dados inseridos manualmente:**

Para verificar se um empréstimo é elegível para refinanciamento, execute o teste `AuthorizedTest.js`. 
Certifique-se de configurar as datas e os valores dos pagamentos de acordo com as regras para testar diferentes cenários.

```shell
node AuthorizedTest.js
```

**Com banco de dados:**

Para verificar se um empréstimo é elegível para refinanciamento, execute o teste `DataTest.js`. 
Certifique-se de configurar o banco de dados correto para testar.

```shell
node DataTest.js
```

