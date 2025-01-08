import { useState, useEffect } from 'react';
import axios from 'axios';

const useData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Nastaví loading na true
      setError(null); // Resetuje error
      const startTime = Date.now();

      try {
        const response = await axios.get(url, { withCredentials: true });
        setData(response.data.documents);
      } catch (error) {
        console.error("Chyba při získávání dat", error);
        setError("Chyba při načítání dat");
      } finally {
        // Vypočítá dobu, jak dlouho načítání trvalo
        const elapsedTime = Date.now() - startTime;
        const minimumLoadingTime = 500;

        // Počká, pokud načítání trvalo méně než minimální čas
        setTimeout(() => setLoading(false), Math.max(0, minimumLoadingTime - elapsedTime));
      }
    };

    if (url) loadData();
  }, [url]);

  return { data, loading, error };
};

export default useData;