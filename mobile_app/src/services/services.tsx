
import axios from 'axios';
export const ip = '192.168.36.249';
export const mainURL = `http://${ip}:8000/`;
export const baseUrl = `http://${ip}:8000/otp/`;
export const salonUrl = `http://${ip}:8000/salon/salons/`;
export const apiurl = `http://${ip}:8000/salon/`;
export const filtererdSalonURL = `http://${ip}:8000/salon/filteredsalons/`;


export const generateOtp = async (phoneNumber) => {
  console.log(phoneNumber);
  try {
    const response = await axios.post(`${baseUrl}generate-otp/`, {
      phone_number: phoneNumber,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to generate OTP 123');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const verifyOtp = async (phoneNumber, otp, uid) => {
  try {
    const response = await axios.post(`${baseUrl}verify-otp/`, {
      phone_number: phoneNumber,
      otp: otp,
      uid: uid,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error('Failed to verify OTP');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const boolmySalons = async (phoneNumber, csrfToken) => {
  try{
    const response = await axios.post(`${baseUrl}check-salons/`, {
      phone_number: phoneNumber,
    },
  {
    headers: {
      'X-CSRFToken': csrfToken, // Include CSRF token in headers
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Failed to get salons');
  }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const submitName = async (name, gender, phoneNumber) => {
  try {
    const response = await axios.post(`${baseUrl}submit-name/`, {
      name: name,
      gen: gender,
      phone_number: phoneNumber,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Failed to submit name');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

