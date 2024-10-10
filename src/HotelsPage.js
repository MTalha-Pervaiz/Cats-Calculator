import React, { useState, useEffect } from 'react';
import './HotelsPage.css';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({
    HotelName: '',
    City: '',
    'H H/T': '',
    'F S/S': '',
    'G H/T': '',
    'G S/S': ''
  });

  useEffect(() => {
    const savedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    setHotels(savedHotels);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedHotels = [...hotels, newHotel];
    setHotels(updatedHotels);
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));
    setNewHotel({
      HotelName: '',
      City: '',
      'H H/T': '',
      'F S/S': '',
      'G H/T': '',
      'G S/S': ''
    });
  };

  const handleDelete = (index) => {
    const updatedHotels = hotels.filter((_, i) => i !== index);
    setHotels(updatedHotels);
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));
  };

  return (
    <div className="hotels-page">
      <h2>Manage Hotels</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="HotelName"
          value={newHotel.HotelName}
          onChange={handleInputChange}
          placeholder="Hotel Name"
          required
        />
        <input
          type="text"
          name="City"
          value={newHotel.City}
          onChange={handleInputChange}
          placeholder="City"
          required
        />
        <input
          type="number"
          name="H H/T"
          value={newHotel['H H/T']}
          onChange={handleInputChange}
          placeholder="H H/T Price"
          required
        />
        <input
          type="number"
          name="F S/S"
          value={newHotel['F S/S']}
          onChange={handleInputChange}
          placeholder="F S/S Price"
          required
        />
        <input
          type="number"
          name="G H/T"
          value={newHotel['G H/T']}
          onChange={handleInputChange}
          placeholder="G H/T Price"
          required
        />
        <input
          type="number"
          name="G S/S"
          value={newHotel['G S/S']}
          onChange={handleInputChange}
          placeholder="G S/S Price"
          required
        />
        <button type="submit">Add Hotel</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Hotel Name</th>
            <th>City</th>
            <th>H H/T</th>
            <th>F S/S</th>
            <th>G H/T</th>
            <th>G S/S</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel, index) => (
            <tr key={index}>
              <td>{hotel.HotelName}</td>
              <td>{hotel.City}</td>
              <td>${hotel['H H/T']}</td>
              <td>${hotel['F S/S']}</td>
              <td>${hotel['G H/T']}</td>
              <td>${hotel['G S/S']}</td>
              <td>
                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelsPage;