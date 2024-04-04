import React, { useEffect, useState } from 'react';
import '../App.css';

const CustomerList = ({ onCustomerSelect, selectedCustomer }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) throw new Error('Failed to fetch customers');
                const data = await response.json();
                setCustomers(data);
                setLoading(false); 
                if (selectedCustomer === null && data.length > 0) {
                    onCustomerSelect(data[0].id); 
                }
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, [onCustomerSelect, selectedCustomer]);

    return (
        <div className="CustomerList">
            {loading ? (
                <div className='loading'>Loading...</div>
            ) : (
                <ul>
                    {customers.map(({ id, name}) => (
                        <li
                            key={id}
                            onClick={() => onCustomerSelect(id)}
                            className={selectedCustomer === id ? 'selected' : ''}
                        >
                            <h3>{name}</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos placeat sint doloremque iste fugiat, consequatur pariatur est ipsa ratione praesentium.</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomerList;
