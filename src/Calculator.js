import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from 'docx';
import { saveAs } from 'file-saver';
import './Calculator.css';
import './ContentArea.css';

const groupSizes = [
  { label: "34-39+1", size: 34 },
  { label: "30-34+1", size: 30 },
  { label: "25-29+1", size: 25 },
  { label: "20-24+1", size: 20 },
  { label: "15-19+1", size: 15 },
  { label: "10-14+1", size: 10 },
  { label: "10-14 NO FREE", size: 10 },
];

const Calculator = () => {
  const [tripDays, setTripDays] = useState([
    { date: new Date(), services: [], hotel: null }
  ]);
  const [currentDay, setCurrentDay] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [hotelData, setHotelData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const savedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    setHotelData(savedHotels);
    const savedServices = JSON.parse(localStorage.getItem('services')) || [];
    setServicesData(savedServices);
  }, []);

  const getSuggestions = (value) => {
    const inputValueLower = value.trim().toLowerCase();
    return servicesData.filter((service) =>
      service.Services.toLowerCase().includes(inputValueLower)
    );
  };

  const isServiceAlreadyAdded = (newService) => {
    return tripDays[currentDay].services.some(
      (service) => service.Services === newService.Services
    );
  };

  const handleSuggestionSelected = (event, { suggestion }) => {
    if (!isServiceAlreadyAdded(suggestion)) {
      setTripDays(prevDays => {
        const newDays = [...prevDays];
        newDays[currentDay] = {
          ...newDays[currentDay],
          services: [...newDays[currentDay].services, suggestion]
        };
        return newDays;
      });
    } else {
      setNotification(`${suggestion.Services} is already added for this day.`);
      setTimeout(() => setNotification(''), 3000);
    }
    setInputValue('');
  };

  const handleInputChange = (event, { newValue }) => {
    setInputValue(newValue);
  };

  const inputProps = {
    placeholder: 'Search for a service',
    value: inputValue,
    onChange: handleInputChange,
  };

  const handleHotelSelection = (event) => {
    const hotelName = event.target.value;
    const hotel = hotelData.find(h => h.HotelName === hotelName);
    setTripDays(prevDays => {
      const newDays = [...prevDays];
      newDays[currentDay].hotel = hotel;
      return newDays;
    });
  };

  const handleDateChange = (event) => {
    setTripDays(prevDays => {
      const newDays = [...prevDays];
      newDays[currentDay].date = new Date(event.target.value);
      return newDays;
    });
  };

  const addDay = () => {
    setTripDays(prevDays => [...prevDays, { date: new Date(), services: [], hotel: null }]);
    setCurrentDay(prevDay => prevDay + 1);
  };

  const removeDay = (index) => {
    if (tripDays.length > 1) {
      setTripDays(prevDays => prevDays.filter((_, i) => i !== index));
      setCurrentDay(prevDay => Math.min(prevDay, tripDays.length - 2));
    } else {
      setNotification("Cannot remove the last day.");
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const calculateTotal = (key) => {
    return tripDays.reduce((acc, day) => {
      return acc + day.services.reduce((dayAcc, service) => {
        return dayAcc + (parseFloat(service[key]) || 0);
      }, 0);
    }, 0);
  };

  const getTransportTotal = (size) => {
    let transportTotal = 0;
    tripDays.forEach(day => {
      if (size >= 21) {
        transportTotal += day.services.reduce((acc, service) => acc + (parseFloat(service.BUS) || 0), 0);
      } else if (size >= 10 && size <= 19) {
        transportTotal += day.services.reduce((acc, service) => acc + (parseFloat(service.MIDI_BUS) || 0), 0);
      } else if (size >= 7 && size <= 9) {
        transportTotal += day.services.reduce((acc, service) => acc + (parseFloat(service.MINIBUS) || 0), 0);
      } else if (size >= 3 && size <= 6) {
        transportTotal += day.services.reduce((acc, service) => acc + (parseFloat(service.VAN) || 0), 0);
      } else if (size <= 2) {
        transportTotal += day.services.reduce((acc, service) => acc + (parseFloat(service.CAR) || 0), 0);
      }
    });
    return transportTotal;
  };

  const getHTTotal = (size) => {
    let total = 0;
    tripDays.forEach(day => {
      if (day.hotel) {
        if (size >= 10) {
          total += parseFloat(day.hotel['G H/T']) || 0;
        } else {
          total += parseFloat(day.hotel['H H/T']) || 0;
        }
      }
    });
    return total;
  };

  const getSSTotal = (size) => {
    let total = 0;
    tripDays.forEach(day => {
      if (day.hotel) {
        if (size >= 10) {
          total += parseFloat(day.hotel['G S/S']) || 0;
        } else {
          total += parseFloat(day.hotel['F S/S']) || 0;
        }
      }
    });
    return total;
  };

  const getBreakdownByGroupSize = (size) => {
    const TPT = Math.ceil(getTransportTotal(size) / size);
    const HT = Math.ceil(getHTTotal(size) / size);
    const SS = Math.ceil(getSSTotal(size) / size);
    const ABF = Math.ceil(calculateTotal('ABF') / size);
    const GUIDE = Math.ceil(calculateTotal('Guid') / size);
    const FEE = Math.ceil(calculateTotal('FEES') / size);
    const MISC = Math.ceil(calculateTotal('MISC') / size);

    const TL = Math.ceil(
      (TPT + HT + ABF + GUIDE + FEE + MISC) / size
    );

    const NET = Math.ceil(
      TPT + HT + SS + ABF + TL + GUIDE + FEE + MISC
    );

    return {
      TPT,
      HT,
      SS,
      ABF,
      TL,
      GUIDE,
      FEE,
      MISC,
      NET,
    };
  };

  const saveItinerary = () => {
    localStorage.setItem('savedItinerary', JSON.stringify(tripDays));
    setNotification('Itinerary saved successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const generateWordDocument = () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Your Company Logo Here",
                bold: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Itinerary Details",
                bold: true,
                size: 20,
              }),
            ],
          }),
          ...tripDays.flatMap((day, index) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Day ${index + 1}: ${day.date.toDateString()}`,
                  bold: true,
                  size: 16,
                }),
              ],
            }),
            ...day.services.flatMap(service => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: service.Services,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: service.ExcursionDetails || "No excursion details provided.",
                  }),
                ],
              }),
            ]),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Hotel: ${day.hotel ? day.hotel.HotelName : 'Not selected'}`,
                  bold: true,
                }),
              ],
            }),
          ]),
          new Paragraph({
            children: [
              new TextRun({
                text: "Cost Breakdown",
                bold: true,
                size: 20,
              }),
            ],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Group Size")],
                  }),
                  new TableCell({
                    children: [new Paragraph("NET TOTAL")],
                  }),
                ],
              }),
              ...groupSizes.map(group => {
                const breakdown = getBreakdownByGroupSize(group.size);
                return new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph(group.label)],
                    }),
                    new TableCell({
                      children: [new Paragraph(`$${breakdown.NET}`)],
                    }),
                  ],
                });
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Thank you for choosing our services!",
                bold: true,
              }),
            ],
          }),
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "itinerary.docx");
      setNotification('Itinerary downloaded successfully!');
      setTimeout(() => setNotification(''), 3000);
    });
  };

  return (

    <div className="calculator">
          <div className="content-area">
      <h1>Multi-Day Service Calculator</h1>

      {notification && <div className="notification">{notification}</div>}

      <div className="day-selector">
        {tripDays.map((day, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentDay(index)}
            className={currentDay === index ? 'active' : ''}
          >
            Day {index + 1}
          </button>
        ))}
        <button onClick={addDay}>+ Add Day</button>
      </div>

      <div className="day-details">
        <h2>Day {currentDay + 1}</h2>
        <input 
          type="date" 
          value={tripDays[currentDay].date.toISOString().split('T')[0]} 
          onChange={handleDateChange}
        />
        <button onClick={() => removeDay(currentDay)}>Remove Day</button>
      </div>

      <div className="search-container">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
          onSuggestionsClearRequested={() => setSuggestions([])}
          getSuggestionValue={(suggestion) => suggestion.Services}
          renderSuggestion={(suggestion) => <div>{suggestion.Services}</div>}
          onSuggestionSelected={handleSuggestionSelected}
          inputProps={inputProps}
        />
      </div>

      <div className="hotel-selection">
        <h2>Select Hotel</h2>
        <select onChange={handleHotelSelection} value={tripDays[currentDay].hotel?.HotelName || ""}>
          <option value="">Select a hotel</option>
          {hotelData.map((hotel, index) => (
            <option key={index} value={hotel.HotelName}>
              {hotel.HotelName} - {hotel.City}
            </option>
          ))}
        </select>
      </div>

      <div className="selected-services">
        <h2>Selected Services for Day {currentDay + 1}</h2>
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>CAR</th>
              <th>VAN</th>
              <th>MINIBUS</th>
              <th>MEDIUM BUS</th>
              <th>BUS</th>
              <th>FULL Room HOTEL</th>
              <th>Half Room HOTEL</th>
              <th>Guide Hotel</th>
              <th>Guide Shared Room</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
              <th>FEES</th>
              <th>MISC</th>
              <th>GUIDE Fee PER DAY</th>
            </tr>
          </thead>
          <tbody>
            {tripDays[currentDay].services.map((service, index) => (
              <tr key={index}>
                <td>{service.Services}</td>
                <td>{service.CAR || '-'}</td>
                <td>{service.VAN || '-'}</td>
                <td>{service.MINIBUS || '-'}</td>
                <td>{service['MIDI_BUS'] || '-'}</td>
                <td>{service.BUS || '-'}</td>
                <td>{service['F_HT'] || '-'}</td>
                <td>{service['F_SS'] || '-'}</td>
                <td>{service['G_HT'] || '-'}</td>
                <td>{service['G_SS'] || '-'}</td>
                <td>{service.ABF || '-'}</td>
                <td>{service.LUN || '-'}</td>
                <td>{service.DIN || '-'}</td>
                <td>{service.FEES || '-'}</td>
                <td>{service.MISC || '-'}</td>
                <td>{service.Guid || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="breakdown">
        <h2>Total Trip Breakdown by Group Size</h2>
        <table>
          <thead>
            <tr>
              <th>Group Size</th>
              <th>TPT</th>
              <th>H/T</th>
              <th>S/S</th>
              <th>ABF</th>
              <th>T/L</th>
              <th>GUIDE</th>
              <th>FEE</th>
              <th>MISC</th>
              <th>NET TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {groupSizes.map((group, index) => {
              const breakdown = getBreakdownByGroupSize(group.size);
              return (
                <tr key={index}>
                  <td>{group.label}</td>
                  <td>${breakdown.TPT}</td>
                  <td>${breakdown.HT}</td>
                  <td>${breakdown.SS}</td>
                  <td>${breakdown.ABF}</td>
                  <td>${breakdown.TL}</td>
                  <td>${breakdown.GUIDE}</td>
                  <td>${breakdown.FEE}</td>
                  <td>${breakdown.MISC}</td>
                  <td>${breakdown.NET}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="actions">
        <button onClick={saveItinerary}>Save Itinerary</button>
        <button onClick={generateWordDocument}>Download Itinerary</button>
      </div>
    </div>
    </div>
  );
};

export default Calculator;