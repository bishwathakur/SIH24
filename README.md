
# Micro-Doppler Classification System
Invisible Eye is a cross-platform application built with React.js for web and React Native for mobile, enabling seamless monitoring and surveillance. The app allows users to view real-time data, track activity, and manage alerts across devices with efficient performance. It leverages React's component-based design to ensure a responsive and engaging user experience, and its integration with backend services supports robust data handling and secure operations.

## Table of Contents
- [Project Title](#micro-doppler-classification-system)
- [Table of Contents](#table-of-contents)
- [Deployed Website Link](#deployed-website-link)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Web Application Setup](#web-application-setup)
  - [Mobile Application Setup](#mobile-application-setup)
- [Backend](#backend)
- [Web Application](#web-application)
- [Mobile Application](#mobile-application)
- [Analysis of Feasibility](#analysis-of-feasibility)
- [Potential Challenges](#potential-challenges)
- [Overcoming Strategies](#overcoming-strategies)
- [Contributing](#contributing)
- [License](#license)

## Deployed Website Link
Access the deployed web application at [birddroneclassifier.netlify.app](https://birddroneclassifier.netlify.app)

## Technologies Used
This project leverages a diverse set of technologies to build a complete micro-Doppler classification system:

- **FMCW Radar**: Used to capture micro-Doppler signatures for classification.
- **Python**: Programming language used for data processing and backend development.
- **PyTorch**: Deep learning framework utilized to build and train the machine learning model.
- **SciPy & NumPy**: Libraries for mathematical computations and signal processing.
- **React.js**: Frontend framework used to build the web application.
- **React Native**: Framework for building cross-platform mobile applications.

## Screenshots
- Website
![s1](https://github.com/user-attachments/assets/dd58068d-276e-40d4-b2b0-60a5d8945d72)
![s2](https://github.com/user-attachments/assets/748b1c90-71df-47a3-b2ff-c8911d24df70)
![s3(!)](https://github.com/user-attachments/assets/9e9905a7-30d8-4d46-95fb-3b0c2ec133e1)

- Mobile Application
<p align="center">
  <img src="https://github.com/user-attachments/assets/9d771b86-3dc9-4ef0-bf18-0a0f7c8a1603" width="230"/>
  <img src="https://github.com/user-attachments/assets/47f4febb-1166-4d6b-a750-4babff95debd" width="230"/>
  <img src="https://github.com/user-attachments/assets/6f241a8b-90f3-47bf-8a30-2460f2c4b102" width="230"/> 
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/e92b0f8c-98fa-4d89-888a-7dc19e15e4a8" width="230"/>
  <img src="https://github.com/user-attachments/assets/bd6ff0cd-87a7-4426-9686-6a12edea58c8" width="230"/>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/4e3cd048-0479-47c6-8b53-345cff0f1d6e" width="230"/>
  <img src="https://github.com/user-attachments/assets/809fd523-1488-4964-80c2-6e30b540ac97" width="230"/>
</p>

## Installation
Follow the instructions below to set up each component of the system:

### Backend Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/bishwatkur/SIH24.git
   ```
2. **Navigate to the backend directory:**
   ```bash
   cd SIH24/backend
   ```
3. **Create a virtual environment and activate it:**
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```
4. **Install the required dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
5. **Start the backend service:**
   ```bash
   python app.py
   ```
   The backend will start running on `http://localhost:5000`.

### Web Application Setup
1. **Navigate to the web application directory:**
   ```bash
   cd ../web
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the web application:**
   ```bash
   npm start
   ```
   The web application will be available at `http://localhost:3000`.

### Mobile Application Setup
1. **Navigate to the mobile application directory:**
   ```bash
   cd ../mobile
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the mobile application (emulator or device required):**
   ```bash
   npx react-native run-android  # For Android
   npx react-native run-ios      # For iOS
   ```
   Ensure that your mobile device or emulator is properly set up.

## Backend
The backend service is developed in Python and is responsible for:
1. **Data Preprocessing**: Converting FMCW radar data into a format suitable for ML model input.
2. **Model Deployment**: The deployed ML model, built using PyTorch, classifies the micro-Doppler signatures to detect different activities or objects.
3. **API Endpoints**: RESTful APIs are provided for the web and mobile applications to send data and receive predictions.

### ML Model
The model is designed to classify micro-Doppler signatures into predefined categories. It utilizes a convolutional neural network (CNN) architecture optimized for time-series data.

## Web Application
The web application serves as an interface for users to upload radar data files and visualize classification results. It provides the following functionalities:
- Uploading micro-Doppler data in compatible formats.
- Viewing classification results in real-time.
- Interactive graphs and visualizations of the radar data and model predictions.

## Mobile Application
The mobile application is developed using React Native to support both iOS and Android platforms. It allows users to:
- Capture micro-Doppler data through connected devices.
- View real-time classification results.
- Access classification history and performance analytics.

## Analysis of Feasibility
- **Scalability**: The system is scalable with modular components for backend, web, and mobile applications, allowing independent scaling of services.
- **Ease of Setup**: The modular structure ensures ease of setup and maintenance.
- **User-Friendliness**: Both web and mobile interfaces are designed with usability in mind, offering a seamless experience across platforms.

## Potential Challenges
- **Backend Integration**: Ensuring smooth communication between the web and mobile applications with the backend service.
- **Cross-Platform Consistency**: Maintaining a consistent user experience across web and mobile platforms.
- **Real-Time Data Processing**: Handling real-time radar data and providing instantaneous classification results.

## Overcoming Strategies
- **Backend Optimization**: Optimize API responses and use efficient data handling techniques to reduce latency.
- **Cross-Platform Libraries**: Use shared libraries and components for web and mobile applications to maintain consistency.
- **Data Management**: Implement a robust data pipeline to handle and preprocess large volumes of radar data efficiently.

## Contributing

For changes, please open an issue first to discuss what you would like to change.
