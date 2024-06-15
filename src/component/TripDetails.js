import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import worldCities from '../worldcities.json'; // Assuming worldcities.json is in src folder

const TripDetails = ({ onAddTrip, onUpdateTrip, location, editingTrip }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const [submittedTrip, setSubmittedTrip] = useState(null); // Track submitted trip details

  useEffect(() => {
    if (editingTrip) {
      setFromLocation(editingTrip.fromLocation);
      setToLocation(editingTrip.toLocation);
      setSelectedDate(editingTrip.selectedDate);
    }
  }, [editingTrip]);

  // Function to suggest up to 3 cities based on input
  const suggestCities = (input) => {
    const userInput = input.toLowerCase().trim();

    // Filter cities based on similarity to userInput
    const matchedCities = worldCities.filter(city => {
      const cityName = city.city.toLowerCase();
      return cityName.includes(userInput);
    });

    // Sort matched cities by similarity (number of matching characters)
    matchedCities.sort((a, b) => {
      const nameA = a.city.toLowerCase();
      const nameB = b.city.toLowerCase();
      return nameA.indexOf(userInput) - nameB.indexOf(userInput);
    });

    // Return up to 3 closest matches
    return matchedCities.slice(0, 3).map(city => `${city.city}, ${city.country}`);
  };

  // Function to handle input change for 'From' location
  const handleFromInputChange = (input) => {
    const suggestions = suggestCities(input);
    setFromSuggestions(suggestions);
    setFromLocation(input);
  };

  // Function to handle input change for 'To' location
  const handleToInputChange = (input) => {
    const suggestions = suggestCities(input);
    setToSuggestions(suggestions);
    setToLocation(input);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new trip object
    const trip = {
      fromLocation,
      toLocation,
      selectedDate,
    };

    if (editingTrip) {
      trip.id = editingTrip.id; // Assuming you have an ID field for the trip
      onUpdateTrip(trip);
    } else {
      onAddTrip(trip);
    }

    // Store submitted trip details to display
    setSubmittedTrip(trip);

    // Clear form inputs after submission
    setFromLocation('');
    setToLocation('');
    setSelectedDate('');
  };

  // Function to handle selecting a suggestion for 'From' location
  const handleSelectFromSuggestion = (suggestion) => {
    setFromLocation(suggestion);
    setFromSuggestions([]);
  };

  // Function to handle selecting a suggestion for 'To' location
  const handleSelectToSuggestion = (suggestion) => {
    setToLocation(suggestion);
    setToSuggestions([]);
  };

  useEffect(() => {
    if (location && location.search) {
      const urlParams = new URLSearchParams(location.search);
      const tripDetails = urlParams.get('details');
  
      if (tripDetails) {
        const detailsArray = tripDetails.split(',');
        setFromLocation(detailsArray[0].replace('From: ', '').trim());
        setToLocation(detailsArray[1].replace('To: ', '').trim());
        setSelectedDate(detailsArray[2].replace('Date: ', '').trim());
      }
    }
  }, [location]);

  return (
    <TripDetailsContainer>
      <h2>Trip Details</h2>

      {/* Display submitted or updated trip details */}
      {submittedTrip && (
        <TripDisplay>
          <h3>{editingTrip ? 'Updated Trip Details' : 'Added Trip Details'}</h3>
          <p><strong>From:</strong> {submittedTrip.fromLocation}</p>
          <p><strong>To:</strong> {submittedTrip.toLocation}</p>
          <p><strong>Date:</strong> {submittedTrip.selectedDate}</p>
        </TripDisplay>
      )}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>From:</label>
          <AutocompleteInput
            type="text"
            value={fromLocation}
            onChange={(e) => handleFromInputChange(e.target.value)}
            placeholder="Enter departure city"
            required
          />
          {fromSuggestions.length > 0 && (
            <AutocompleteSuggestions>
              {fromSuggestions.map((suggestion, index) => (
                <Suggestion key={index} onClick={() => handleSelectFromSuggestion(suggestion)}>
                  {suggestion}
                </Suggestion>
              ))}
            </AutocompleteSuggestions>
          )}
        </FormGroup>
        <FormGroup>
          <label>To:</label>
          <AutocompleteInput
            type="text"
            value={toLocation}
            onChange={(e) => handleToInputChange(e.target.value)}
            placeholder="Enter destination city"
            required
          />
          {toSuggestions.length > 0 && (
            <AutocompleteSuggestions>
              {toSuggestions.map((suggestion, index) => (
                <Suggestion key={index} onClick={() => handleSelectToSuggestion(suggestion)}>
                  {suggestion}
                </Suggestion>
              ))}
            </AutocompleteSuggestions>
          )}
        </FormGroup>
        <FormGroup>
          <label>Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">{editingTrip ? 'Update Trip' : 'Add Trip'}</SubmitButton>
      </form>
    </TripDetailsContainer>
  );
};

const TripDetailsContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  position: relative; /* Ensure relative positioning for absolute children */

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }
`;

const AutocompleteInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AutocompleteSuggestions = styled.ul`
  position: absolute;
  top: calc(100% + 5px); /* Position below the input */
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Suggestion = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const TripDisplay = styled.div`
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;

  h3 {
    margin-top: 0;
    font-size: 18px;
  }

  p {
    margin: 5px 0;
  }
`;

export default TripDetails;
