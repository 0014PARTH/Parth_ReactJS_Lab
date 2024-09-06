import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddExpenseForm() {
  const [payer, setPayer] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { payer, description, amount: parseFloat(amount), date };

    axios.post('http://localhost:3001/expenses', newExpense)
      .then(response => {
        console.log(response.data);
        navigate('/');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Item</h2>
      <p><strong>Read the below instructions before proceeding:</strong></p>
      <ul>
        <li>Make sure you fill all the fields where * is provided.</li>
      </ul>

      <table style={{ width: '50%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <tbody>
          <tr>
            <td style={{ padding: '10px', backgroundColor: '#f1f9ff', color: '#663366' }}>Name *</td>
            <td style={{ padding: '10px', backgroundColor: '#f1f9ff', color: '#663366' }}>
              <select value={payer} onChange={(e) => setPayer(e.target.value)} required>
                <option value="" disabled>Select a person</option>
                <option value="Person A">Person A</option>
                <option value="Person B">Person B</option>
              </select>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px', backgroundColor: '#f1f9ff', color: '#663366' }}>Product Purchased *</td>
            <td style={{ padding: '10px', backgroundColor: '#f1f9ff', color: '#663366' }}>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px', backgroundColor: '#f1f9ff', color: '#663366' }}>Price *</td>
            <td style={{ padding: '10px', backgroundColor: '#f1f9ff', color: '#663366' }}>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px', backgroundColor: '#f1f9ff', color: '#663366' }}>Date *</td>
            <td style={{ padding: '10px', backgroundColor: '#f1f9ff', color: '#663366' }}>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <button
          style={{
            backgroundColor: '#663366',
            color: '#f1f9ff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          style={{
            backgroundColor: '#663366',
            color: '#f1f9ff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default AddExpenseForm;