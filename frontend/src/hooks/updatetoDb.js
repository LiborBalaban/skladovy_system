import axios from 'axios';

export const updateData = async (url, formData) => {
  try {
    const response = await axios.put(url, formData, { withCredentials: true });
    console.log('Úspěšně odesláno:', response.data.message);
    alert(response.data.message);
    return response.data.documents;
  } catch (error) {
    console.error('Chyba při odesílání:', error);
    throw error; // Optional: rethrow the error if you want to handle it higher up
  }
};
