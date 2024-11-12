const axios = require('axios');

async function testUniDeleteRequest() {
    try {
      const response = await axios.delete('http://localhost:3000/university/4');
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  }
  
  testUniDeleteRequest();