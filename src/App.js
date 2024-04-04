import React, { useState } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';

const App = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
  };

  return (
    <div className="App">
      <div id='div1' className="scrollable-container">
        <CustomerList onCustomerSelect={handleCustomerSelect} selectedCustomer={selectedCustomer} />
      </div>
      <div id='div2' className="scrollable-container">
        <CustomerDetails  customerId={selectedCustomer} />
      </div>
    </div>
  );
}

export default App;
