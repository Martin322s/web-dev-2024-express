const axios = require('axios');

async function testPostUniversityRequest() {
  try {
    const response = await axios.post('http://localhost:3000/university', {
      name: 'Sofia University',
      town: 'Sofia'
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}


async function testPostUserRequest() {
  try {
    const response = await axios.post('http://localhost:3000/user/create', {
      name: 'John Doe',
      email: 'johndoe@example.com',
      universityId: 1
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// (async () => {
//   await testPostUniversityRequest();
//   await testPostUserRequest()
// })()

async function testPutUniversityRequest() {
  try {
    const response = await axios.put('http://localhost:3000/user/update/subject', {
      userId: 1,
      subjectId: 2
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testPutUniversityRequest();

async function testPostSubject() {
  try {
    const response = await axios.post('http://localhost:3000/user/create/subject', {
      title: 'Math'
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// testPostSubject();