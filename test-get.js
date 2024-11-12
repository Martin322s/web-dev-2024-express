const axios = require('axios');

/** Change URL and body according to implementation. */
async function testGetRequest() {
  try {
    const response = await axios.get('http://localhost:3000/university/');
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testGetUserRequest();

async function testGetUserRequest() {
    try {
      const response = await axios.get('http://localhost:3000/user/1');
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  }