import React, { useState, useEffect } from 'react';
import './ManageServices.css';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    Services: '',
    CAR: '',
    VAN: '',
    MINIBUS: '',
    MIDI_BUS: '',
    BUS: '',
    F_HT: '',
    F_SS: '',
    G_HT: '',
    G_SS: '',
    ABF: '',
    LUN: '',
    DIN: '',
    FEES: '',
    MISC: '',
    Guid: '',
    ExcursionDetails: ''
  });

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newService),
    });
    const addedService = await response.json();
    setServices(prev => [...prev, addedService]);
    setNewService({
      Services: '',
      CAR: '',
      VAN: '',
      MINIBUS: '',
      MIDI_BUS: '',
      BUS: '',
      F_HT: '',
      F_SS: '',
      G_HT: '',
      G_SS: '',
      ABF: '',
      LUN: '',
      DIN: '',
      FEES: '',
      MISC: '',
      Guid: '',
      ExcursionDetails: ''
    });
  };

  const handleDelete = async (index) => {
    const serviceToDelete = services[index];
    await fetch(`/api/services/${serviceToDelete.id}`, {
      method: 'DELETE',
    });
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  return (
    <div className="manage-services">
      <h2>Manage Services</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Services"
          value={newService.Services}
          onChange={handleInputChange}
          placeholder="Service Name"
          required
        />
        <input
          type="text"
          name="CAR"
          value={newService.CAR}
          onChange={handleInputChange}
          placeholder="CAR"
        />
        <input
          type="text"
          name="VAN"
          value={newService.VAN}
          onChange={handleInputChange}
          placeholder="VAN"
        />
        <input
          type="text"
          name="MINIBUS"
          value={newService.MINIBUS}
          onChange={handleInputChange}
          placeholder="MINIBUS"
        />
        <input
          type="text"
          name="MIDI_BUS"
          value={newService.MIDI_BUS}
          onChange={handleInputChange}
          placeholder="MIDI BUS"
        />
        <input
          type="text"
          name="BUS"
          value={newService.BUS}
          onChange={handleInputChange}
          placeholder="BUS"
        />
        <input
          type="text"
          name="F_HT"
          value={newService.F_HT}
          onChange={handleInputChange}
          placeholder="F H/T"
        />
        <input
          type="text"
          name="F_SS"
          value={newService.F_SS}
          onChange={handleInputChange}
          placeholder="F S/S"
        />
        <input
          type="text"
          name="G_HT"
          value={newService.G_HT}
          onChange={handleInputChange}
          placeholder="G H/T"
        />
        <input
          type="text"
          name="G_SS"
          value={newService.G_SS}
          onChange={handleInputChange}
          placeholder="G S/S"
        />
        <input
          type="text"
          name="ABF"
          value={newService.ABF}
          onChange={handleInputChange}
          placeholder="ABF"
        />
        <input
          type="text"
          name="LUN"
          value={newService.LUN}
          onChange={handleInputChange}
          placeholder="LUN"
        />
        <input
          type="text"
          name="DIN"
          value={newService.DIN}
          onChange={handleInputChange}
          placeholder="DIN"
        />
        <input
          type="text"
          name="FEES"
          value={newService.FEES}
          onChange={handleInputChange}
          placeholder="FEES"
        />
        <input
          type="text"
          name="MISC"
          value={newService.MISC}
          onChange={handleInputChange}
          placeholder="MISC"
        />
        <input
          type="text"
          name="Guid"
          value={newService.Guid}
          onChange={handleInputChange}
          placeholder="GUID"
        />
        <textarea
          name="ExcursionDetails"
          value={newService.ExcursionDetails}
          onChange={handleInputChange}
          placeholder="Excursion Details"
          rows="4"
        />
        <button type="submit">Add Service</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>CAR</th>
            <th>VAN</th>
            <th>MINIBUS</th>
            <th>MIDI BUS</th>
            <th>BUS</th>
            <th>F H/T</th>
            <th>F S/S</th>
            <th>G H/T</th>
            <th>G S/S</th>
            <th>ABF</th>
            <th>LUN</th>
            <th>DIN</th>
            <th>FEES</th>
            <th>MISC</th>
            <th>GUID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.Services}</td>
              <td>{service.CAR}</td>
              <td>{service.VAN}</td>
              <td>{service.MINIBUS}</td>
              <td>{service.MIDI_BUS}</td>
              <td>{service.BUS}</td>
              <td>{service.F_HT}</td>
              <td>{service.F_SS}</td>
              <td>{service.G_HT}</td>
              <td>{service.G_SS}</td>
              <td>{service.ABF}</td>
              <td>{service.LUN}</td>
              <td>{service.DIN}</td>
              <td>{service.FEES}</td>
              <td>{service.MISC}</td>
              <td>{service.Guid}</td>
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

export default ManageServices;