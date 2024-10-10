import React, { useState, useEffect } from 'react';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import './DocumentCustomizer.css';

const DocumentCustomizer = () => {
  const [itinerary, setItinerary] = useState(null);
  const [customOptions, setCustomOptions] = useState({
    includeLogo: true,
    includeExcursionDetails: true,
    includeHotelDetails: true,
    includeCostBreakdown: true,
    fontSizeTitle: 24,
    fontSizeHeading: 20,
    fontSizeSubheading: 16,
    fontSizeBody: 12,
  });

  useEffect(() => {
    const savedItinerary = JSON.parse(localStorage.getItem('savedItinerary'));
    if (savedItinerary) {
      setItinerary(savedItinerary);
    }
  }, []);

  const handleOptionChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCustomOptions(prevOptions => ({
      ...prevOptions,
      [name]: type === 'checkbox' ? checked : Number(value),
    }));
  };

  const generateWordDocument = () => {
    if (!itinerary) {
      alert('No itinerary found. Please create an itinerary first.');
      return;
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          ...(customOptions.includeLogo ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Your Company Logo Here",
                  bold: true,
                  size: customOptions.fontSizeTitle,
                }),
              ],
            }),
          ] : []),
          new Paragraph({
            text: "Itinerary Details",
            heading: HeadingLevel.HEADING_1,
            size: customOptions.fontSizeHeading,
          }),
          ...itinerary.flatMap((day, index) => [
            new Paragraph({
              text: `Day ${index + 1}: ${new Date(day.date).toDateString()}`,
              heading: HeadingLevel.HEADING_2,
              size: customOptions.fontSizeSubheading,
            }),
            ...day.services.flatMap(service => [
              new Paragraph({
                text: service.Services,
                bold: true,
                size: customOptions.fontSizeBody,
              }),
              ...(customOptions.includeExcursionDetails && service.ExcursionDetails ? [
                new Paragraph({
                  text: service.ExcursionDetails,
                  size: customOptions.fontSizeBody,
                }),
              ] : []),
            ]),
            ...(customOptions.includeHotelDetails && day.hotel ? [
              new Paragraph({
                text: `Hotel: ${day.hotel.HotelName}`,
                bold: true,
                size: customOptions.fontSizeBody,
              }),
            ] : []),
          ]),
          ...(customOptions.includeCostBreakdown ? [
            new Paragraph({
              text: "Cost Breakdown",
              heading: HeadingLevel.HEADING_1,
              size: customOptions.fontSizeHeading,
            }),
            // Add your cost breakdown table here
          ] : []),
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "customized_itinerary.docx");
    });
  };

  return (
    <div className="document-customizer">
      <h2>Customize Document Format</h2>
      <div className="options">
        <label>
          <input
            type="checkbox"
            name="includeLogo"
            checked={customOptions.includeLogo}
            onChange={handleOptionChange}
          />
          Include Logo
        </label>
        <label>
          <input
            type="checkbox"
            name="includeExcursionDetails"
            checked={customOptions.includeExcursionDetails}
            onChange={handleOptionChange}
          />
          Include Excursion Details
        </label>
        <label>
          <input
            type="checkbox"
            name="includeHotelDetails"
            checked={customOptions.includeHotelDetails}
            onChange={handleOptionChange}
          />
          Include Hotel Details
        </label>
        <label>
          <input
            type="checkbox"
            name="includeCostBreakdown"
            checked={customOptions.includeCostBreakdown}
            onChange={handleOptionChange}
          />
          Include Cost Breakdown
        </label>
        <label>
          Title Font Size:
          <input
            type="number"
            name="fontSizeTitle"
            value={customOptions.fontSizeTitle}
            onChange={handleOptionChange}
          />
        </label>
        <label>
          Heading Font Size:
          <input
            type="number"
            name="fontSizeHeading"
            value={customOptions.fontSizeHeading}
            onChange={handleOptionChange}
          />
        </label>
        <label>
          Subheading Font Size:
          <input
            type="number"
            name="fontSizeSubheading"
            value={customOptions.fontSizeSubheading}
            onChange={handleOptionChange}
          />
        </label>
        <label>
          Body Font Size:
          <input
            type="number"
            name="fontSizeBody"
            value={customOptions.fontSizeBody}
            onChange={handleOptionChange}
          />
        </label>
      </div>
      <button onClick={generateWordDocument}>Generate Customized Document</button>
    </div>
  );
};

export default DocumentCustomizer;