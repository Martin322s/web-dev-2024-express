const axios = require('axios');

async function testPostRequest() {
  try {
    const response = await axios.post('http://localhost:3000/university/', {
      name: 'MU - Burgas'
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testPostRequest();
