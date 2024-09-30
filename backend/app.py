from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import pandas as pd
import torch
import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import spectrogram    
from scipy.fft import fft
from scipy.signal import find_peaks
from waitress import serve
from io import BytesIO
import cloudinary.uploader

import cloudinary.api


# Configure Cloudinary
cloudinary.config(
    cloud_name='dmgwucocs',
    api_key='749959627797523',
    api_secret='EcjF0-IlPocFXXmLLTLzfqiJHHE'
)

app = Flask(__name__)
CORS(app)

def pad_to_square(img):
    _, h, w = img.shape
    padding = ((224 - h) // 2, (224 - w) // 2, (224 - h + 1) // 2, (224 - w + 1) // 2)
    return np.pad(img, ((0, 0), (padding[0], padding[2]), (padding[1], padding[3])), mode='constant', constant_values=0)

def plot3d(data):
    bin_1, bin_2 = 50, 100
    time_series = data[:, bin_1, bin_2]
    time_series_magnitude = np.abs(time_series)
    frequencies, times, Sxx = spectrogram(time_series_magnitude, nperseg=128, noverlap=120)

    # Plot 1: Time-Frequency Spectrogram (Magnitude and Phase)
    plt.figure(figsize=(14, 6))
    plt.subplot(1, 2, 1)
    plt.pcolormesh(times, frequencies, Sxx, shading='gouraud')
    plt.title('Time-Frequency Spectrogram (Magnitude)')
    plt.ylabel('Frequency [Hz]')
    plt.xlabel('Time [s]')
    plt.colorbar(label='Intensity')

    time_series_phase = np.angle(time_series)
    frequencies, times, Sxx = spectrogram(time_series_phase, nperseg=128, noverlap=120)

    plt.subplot(1, 2, 2)
    plt.pcolormesh(times, frequencies, Sxx, shading='gouraud')
    plt.title('Time-Frequency Spectrogram (Phase)')
    plt.ylabel('Frequency [Hz]')
    plt.xlabel('Time [s]')
    plt.colorbar(label='Intensity')

    # Save figure to BytesIO and upload to Cloudinary
    buffer = BytesIO()
    plt.savefig(buffer, format='jpg')
    buffer.seek(0)
    response = cloudinary.uploader.upload(buffer, folder='images', public_id='plot1')
    print("Uploaded plot1 to:", response['secure_url'])

    # Plot 2: Waveform (Real and Phase)
    waveform = data[:, 64, 84]
    plt.figure(figsize=(14, 6))

    plt.subplot(1, 2, 1)
    plt.plot(np.real(waveform))
    plt.title('Waveform (Real Part)')
    plt.xlabel('Time')
    plt.ylabel('Amplitude')

    plt.subplot(1, 2, 2)
    plt.plot(np.angle(waveform))
    plt.title('Phase Information')
    plt.xlabel('Time')
    plt.ylabel('Phase [Radians]')

    buffer = BytesIO()
    plt.savefig(buffer, format='jpg')
    buffer.seek(0)
    response = cloudinary.uploader.upload(buffer, folder='images', public_id='plot2')
    print("Uploaded plot2 to:", response['secure_url'])

    # Plot 3: Frequency Shift Data
    frame_index = 500
    frequency_data = np.abs(fft(data[frame_index, :, :], axis=0))

    plt.figure(figsize=(10, 6))
    plt.imshow(frequency_data, cmap='hot', aspect='auto')
    plt.title('Frequency Shift Data')
    plt.xlabel('Bin 1')
    plt.ylabel('Frequency Bin')
    plt.colorbar(label='Magnitude')

    buffer = BytesIO()
    plt.savefig(buffer, format='jpg')
    buffer.seek(0)
    response = cloudinary.uploader.upload(buffer, folder='images', public_id='plot3')
    print("Uploaded plot3 to:", response['secure_url'])

    # Plot 4: Cyclic Patterns in Micro-Doppler Signatures
    cyclic_pattern = np.sum(frequency_data, axis=1)
    peaks, _ = find_peaks(cyclic_pattern, distance=10)

    plt.figure(figsize=(10, 6))
    plt.plot(cyclic_pattern)
    plt.plot(peaks, cyclic_pattern[peaks], "x")
    plt.title('Cyclic Patterns in Micro-Doppler Signatures')
    plt.xlabel('Time')
    plt.ylabel('Summed Frequency Magnitude')

    buffer = BytesIO()
    plt.savefig(buffer, format='jpg')
    buffer.seek(0)
    response = cloudinary.uploader.upload(buffer, folder='images', public_id='plot4')
    print("Uploaded plot4 to:", response['secure_url'])

  

def plot2d(data):
    frequency_data = np.abs(fft(data, axis=0))

    plt.figure(figsize=(10, 6))
    plt.imshow(frequency_data, cmap='hot', aspect='auto')
    plt.title('Frequency Shift Data')
    plt.xlabel('Bin 1')
    plt.ylabel('Frequency Bin')
    plt.colorbar(label='Magnitude')

    # Save the plot to a temporary file and upload to Cloudinary
    plt.savefig('temp_plot1.jpg', format='jpg')
    plt.close()  # Close the figure to free memory

    # Upload to Cloudinary
    response1 = cloudinary.uploader.upload('temp_plot1.jpg', folder='images2d', public_id='plot1')
    url1 = response1['secure_url']

    cyclic_pattern = np.sum(frequency_data, axis=1)
    peaks, _ = find_peaks(cyclic_pattern, distance=10)

    plt.figure(figsize=(10, 6))
    plt.plot(cyclic_pattern)
    plt.plot(peaks, cyclic_pattern[peaks], "x")
    plt.title('Cyclic Patterns in Micro-Doppler Signatures')
    plt.xlabel('Time')
    plt.ylabel('Summed Frequency Magnitude')

    # Save the plot to a temporary file and upload to Cloudinary
    plt.savefig('temp_plot2.jpg', format='jpg')
    plt.close()  # Close the figure to free memory

    # Upload to Cloudinary
    response2 = cloudinary.uploader.upload('temp_plot2.jpg', folder='images2d', public_id='plot2')
    url2 = response2['secure_url']

    return url1, url2  # Return the URLs of the uploaded images


with open('model-2.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def home():
    return "<h1>Hello World</h1>"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith('.pkl'):
            data = pd.read_pickle(file)
        else:
            return jsonify({'error': 'Unsupported file type'}), 400

        if len(data.shape) == 2:
            plot2d(data)
            magnitude = np.abs(data)
            phase = np.angle(data)
            dim = '2'
        elif len(data.shape) == 3:
            plot3d(data)
            data = data[0]
            magnitude = np.abs(data)
            phase = np.angle(data)
            dim = '3'

        zeros = np.zeros_like(magnitude)
        data = np.stack([magnitude, phase, zeros], axis=0)
        data = pad_to_square(data)

        data = torch.tensor(data, dtype=torch.float32).unsqueeze(0)
        model.eval()

        with torch.no_grad():
            proba = (model(data)).argmax().item()

        proba = 'drone' if proba == 1 else 'bird'
        proba = dim + proba

        return jsonify({'predictions': proba})

    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000)
