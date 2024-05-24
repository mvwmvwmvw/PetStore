const axios = require('axios');
const URL = 'https://petstore.swagger.io/v2';

describe('Get pet by id', () => {
  test('Find pet by ID', async () => {
    const petId = 1; 
    const response = await axios.get(`${URL}/pet/${petId}`);
    expect(response.status).toBe(200); 
    expect(response.data).toHaveProperty('id', petId); 
  });

  test('Invalid ID supplied', async () => {
    const invalidPetId = "InvalidID";
    await expect(axios.get(`${URL}/pet/${invalidPetId}`)).rejects.toHaveProperty('response.status', 404); 
  });
  

  test('Pet not found', async () => {
    const nonExistentPetId = 7453867495875634; 
    await expect(axios.get(`${URL}/pet/${nonExistentPetId}`)).rejects.toHaveProperty('response.status', 404); 
  });
});
