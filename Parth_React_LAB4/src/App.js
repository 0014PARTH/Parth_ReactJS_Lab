import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExpenseSummary from './components/ExpenseSummary';
import AddExpenseForm from './components/AddExpenseForm';

function App() {
  return (
    <Router>
      <div>
        <header style={{
          backgroundColor: '#0079b9',
          color: '#f1f9ff',
          padding: '10px 0',
          textAlign: 'center',
          fontSize: '24px'
        }}>
          Expense Tracker
        </header>
        <Routes>
  <Route path="/" element={<ExpenseSummary />} />
  <Route path="/add" element={<AddExpenseForm />} />
</Routes>
      </div>
    </Router>
  );
}

export default App;