import React, { useEffect, useState } from 'react';
import '../App.css';

const CustomerDetails = ({ customerId }) => {
    const [customer, setCustomer] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const photoUrl = 'https://jsonplaceholder.typicode.com/photos';

    useEffect(() => {
        if (!customerId) return;

        const fetchCustomerDetails = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${customerId}`);
                if (!response.ok) throw new Error('Failed to fetch customer details');
                const data = await response.json();
                setCustomer(data);
            } catch (error) {
                console.error('Error fetching customer details:', error);
            }
        };

        fetchCustomerDetails();
    }, [customerId]);

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            try {
                const response = await fetch(photoUrl);
                if (!response.ok) throw new Error('Failed to fetch photos');
                const data = await response.json();
                const customerPhotos = data.filter(photo => photo.albumId === customerId).slice(0, 9);
                setPhotos(customerPhotos);
            } catch (error) {
                console.error('Error fetching photos:', error);
            } finally {
                setLoading(false);
            }
        };

        const interval = setInterval(fetchPhotos, 10000);
        fetchPhotos();

        return () => clearInterval(interval);
    }, [customerId]);

    if (!customer) return <div className="CustomerDetails loading">Loading...</div>;

return (
  <div className="CustomerDetails">
    <h3>{customer.name}</h3>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est nihil atque illum nam dolorum dignissimos asperiores totam, expedita obcaecati tempora rem fugit quasi numquam a, voluptatum aliquam odio, non adipisci.</p>
    {loading ? (
      <div className='loading'>Loading...</div>
    ) : (
      <div className="PhotoGrid">
        {photos.map(({ url }, index) => (
          <img key={index} src={url} alt={`Photo ${index + 1}`} />
        ))}
      </div>
    )}
  </div>
);
}

export default CustomerDetails;
