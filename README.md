
# Micro-Doppler Classification System

## Table of Contents
- [Project Title](#micro-doppler-classification-system)
- [Table of Contents](#table-of-contents)
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

## Technologies Used
This project leverages a diverse set of technologies to build a complete micro-Doppler classification system:

- **FMCW Radar**: Used to capture micro-Doppler signatures for classification.
- **Python**: Programming language used for data processing and backend development.
- **PyTorch**: Deep learning framework utilized to build and train the machine learning model.
- **SciPy & NumPy**: Libraries for mathematical computations and signal processing.
- **React.js**: Frontend framework used to build the web application.
- **React Native**: Framework for building cross-platform mobile applications.

## Installation
Follow the instructions below to set up each component of the system:

### Backend Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/micro-doppler-classification-system.git
   ```
2. **Navigate to the backend directory:**
   ```bash
   cd micro-doppler-classification-system/backend
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
Contributions are welcome! If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
