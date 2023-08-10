const apiUrl = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

// Función para realizar la petición web
  try {
    // Realiza la petición a la URL de la API
    const response = await fetch(apiUrl);
    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      throw new Error('No se pudo obtener la información de los productos.');
    } 
    const productsData = await response.json();
    
  } catch (error) {
    console.error('Ha ocurrido un error:', error);
  }
