export const fetchData = async (url, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`Error al obtener los datos. Código de estado: ${response.status}`);
      }
      const data = await response.text();
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      throw error;
    }
  };