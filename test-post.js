const axios = require('axios');

async function testPostRequest() {
  try {
    const response = await axios.post('http://localhost:3000/user/subject', {
      userId: 1,
      subject: 'Math'
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testPostRequest();

async function testUniPostRequest() {
  try {
    const response = await axios.post('http://localhost:3000/university', {
      name: 'TU - Gabrovo'
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// testUniPostRequest();
