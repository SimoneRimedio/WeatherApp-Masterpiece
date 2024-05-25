export const getPosition = async (latitude: number, longitude: number, setError: (error: string | null) => void) => {
    try {
      const response = await fetch(`/api/getReverseGeocode?lat=${latitude}&lon=${longitude}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reverse geocode data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError('Error fetching reverse geocode data');
    }
  };
  