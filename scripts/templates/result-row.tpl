<tr class="payment month-<%- monthNumber %>">
    <td><span class="number"><strong><%- paymentNumber %></strong></span></td>
    <td><span class="date"><%- date %></span></td>
    <td><span class="dollar-amount"><%- numeral(remainingBalance).format(moneyFormat) %></span></td>
    <td><span class="dollar-amount"><%- numeral(interestPaid).format(moneyFormat) %></span></td>
    <td><span class="dollar-amount"><%- numeral(totalInterestPaid).format(moneyFormat) %></span></td>
</tr>
