import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/expenses')
      .then(response => {
        setExpenses(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.description} - {expense.payer} paid ₹{expense.amount} on {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;