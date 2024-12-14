import { useState, useEffect } from 'react';
import axios from 'axios';

const useData = (url) => { // Přijímáme URL jako parametr
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(url, { withCredentials: true });
        setData(response.data.documents);
      } catch (error) {
        console.error("Chyba při získávání dat", error);
        setError("Chyba při načítání dat");
      } finally {
        setLoading(false);
      }
    };

    if (url) loadData();
  }, [url]);

  return { data, loading, error };
};

export default useData;