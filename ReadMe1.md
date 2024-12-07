UserName: admin
Password: password

For Testing Purposes



Project Title: Multi-Day Service Calculator

Overview

The Multi-Day Service Calculator is a web application designed to DMC Operators in organizing their trips efficiently. It allows users to plan itineraries, manage hotel bookings, and customize travel documents, all from a centralized platform.

Problem
Travel planning and Quotation creation can be a complex and time-consuming process, especially when coordinating multiple services, accommodations, and itineraries. This app addresses the pain points of managing various travel elements by providing a user-friendly interface that simplifies the planning process, ensuring that users can easily keep track of their travel arrangements.

User Profile
The primary users of this app are DMC Operators (Destination Management Companies that provide bulk travel plans in groups to travel agents) who need to organize their trips effectively. They will use the app to add services, select hotels, generate itineraries, and customize travel documents. The app must consider varying user preferences and the need for mobile responsiveness to accommodate users on the go.

Features
User authentication (login/logout)
Multi-day trip planning with service selection
Hotel management (add, delete, view)
Document customization for itineraries
Cost breakdown by group size
Responsive design for mobile and desktop
Autosuggest feature for service selection
Save and view saved itineraries

Tech Stack
Frontend: React, React Router, CSS
Backend: Express.js, Knex.js for database interactions, MySQL for data storage
Libraries: react-autosuggest for service suggestions, docx for document generation, file-saver for downloading documents

APIs
Using Local so far for testing, but External API is implemented for real time data.

Sitemap
Home: Login page
Calculator: Main functionality for trip planning
Manage Hotels: Page for adding and managing hotels
Manage Services: Page for adding and managing services
Saved Itinerary: Page to view saved itineraries
Customize Document: Page for customizing and downloading itineraries

Mockups
Visuals can be created using tools like Figma or hand-drawn sketches to represent the app's UI. Mockups should include the layout for the login page, calculator interface, hotel management page, and document customization options.

Data
The app manages data related to trips, services, and hotels. Each trip day can have multiple services and a selected hotel. The relationships include:

Each trip day is associated with multiple services.
Each trip day can have one selected hotel.

Endpoints
GET /api/services: Fetch all services
Response: JSON array of services
POST /api/services: Create a new service
Request Body: JSON object with service details
Response: JSON object of the created service
GET /api/hotels: Fetch all hotels
Response: JSON array of hotels
POST /api/hotels: Create a new hotel
Request Body: JSON object with hotel details
Response: JSON object of the created hotel

Auth
The project includes a simple authentication mechanism using local storage to track user login status. Users must log in to access the main features of the app, ensuring that their itineraries and preferences are saved securely.

Roadmap
Sprint 1: Implement user authentication and basic trip planning features (2 weeks)
Sprint 2: Add hotel and service management functionalities (2 weeks)
Sprint 3: Implement document customization and downloading features (2 weeks)
Sprint 4: Testing and bug fixing (1 week)
(Not Working In Sprints , but in a continuous manner)

Nice-to-haves
Integration with external APIs for real-time hotel and service data.
User profiles for saving preferences and past itineraries.
Enhanced UI/UX with animations and transitions.
Advanced reporting features for cost breakdowns and analytics. 