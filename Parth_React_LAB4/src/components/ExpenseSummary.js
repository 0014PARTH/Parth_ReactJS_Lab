import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ExpenseSummary() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/expenses')
      .then(response => {
        setExpenses(response.data);
      });
  }, []);

  const calculateSummary = () => {
    let totalSpent = 0;
    let personASpent = 0;
    let personBSpent = 0;

    expenses.forEach(expense => {
      totalSpent += expense.amount;
      if (expense.payer === 'Person A') {
        personASpent += expense.amount;
      } else if (expense.payer === 'Person B') {
        personBSpent += expense.amount;
      }
    });

    const balance = personASpent - personBSpent;
    let message = '';
    if (balance > 0) {
      message = `Person B owes Person A ₹${balance}`;
    } else if (balance < 0) {
      message = `Person A owes Person B ₹${Math.abs(balance)}`;
    } else {
      message = 'Both are even';
    }

    return { totalSpent, personASpent, personBSpent, message };
  };

  const summary = calculateSummary();

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Expense Summary</h2>
        <button
          style={{
            backgroundColor: '#663366',
            color: '#f1f9ff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/add')}
        >
          Add
        </button>
      </div>
      <table style={{ width: '70%', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden', border: '1px solid white', textAlign: 'center' }}>
        <thead>
          <tr style={{ backgroundColor: '#1c3747', color: '#f1f9ff' }}>
            <th style={{ padding: '12px', borderBottom: '1px solid white' }}>Date</th>
            <th style={{ padding: '12px', borderBottom: '1px solid white', backgroundColor: '#f1f9ff', color: '#663366' }}>Purchase</th>
            <th style={{ padding: '12px', borderBottom: '1px solid white', backgroundColor: '#f1f9ff', color: '#663366' }}>Price</th>
            <th style={{ padding: '12px', borderBottom: '1px solid white', backgroundColor: '#f1f9ff', color: '#663366' }}>Payee</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td style={{ padding: '10px', borderBottom: '1px solid white', backgroundColor: '#1c3747', color: '#f1f9ff' }}>{expense.date}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid white', backgroundColor: '#f1f9ff', color: '#663366' }}>{expense.description}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid white', backgroundColor: '#f1f9ff', color: '#663366' }}>₹{expense.amount}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid white', backgroundColor: '#f1f9ff', color: '#663366' }}>{expense.payer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Table */}
      <table style={{ width: '70%', marginTop: '20px', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden', border: '1px solid white', textAlign: 'center' }}>
        <thead>
          <tr style={{ backgroundColor: '#1c3747', color: '#f1f9ff' }}>
            <th style={{ padding: '12px', borderBottom: '1px solid white' }}>Total Spent</th>
            <th style={{ padding: '12px', borderBottom: '1px solid white' }}>Person A Spent</th>
            <th style={{ padding: '12px', borderBottom: '1px solid white' }}>Person B Spent</th>
            <th style={{ padding: '12px', borderBottom: '1px solid white' }}>Final Payment Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '10px', borderBottom: '1px solid white', backgroundColor: '#f1f9ff', color: '#663366' }}>₹{summary.totalSpent}</td>
            <td style={{ padding: '10px', borderBottom: '1px solid white', backgroundColor: '#f1f9ff', color: '#663366' }}>₹{summary.personASpent}</td>
            <td style={{ padding: '10px', borderBottom: '1px solid white', backgroundColor: '#f1f9ff', color: '#663366' }}>₹{summary.personBSpent}</td>
            <td style={{ padding: '10px', borderBottom: '1px solid white', backgroundColor: '#f1f9ff', color: '#663366' }}>{summary.message}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseSummary;