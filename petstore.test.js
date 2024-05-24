const axios = require('axios');
const URL = 'https://petstore.swagger.io/v2';

describe('Pet API', () => {
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


  describe('Find pets by status', () => {
    test('Find pets by available status', async () => {
      const status = 'available';
      const response = await axios.get(`${URL}/pet/findByStatus?status=${status}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.every(pet => pet.status === status)).toBe(true);
    });

    test('Find pets by pending status', async () => {
      const status = 'pending';
      const response = await axios.get(`${URL}/pet/findByStatus?status=${status}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.every(pet => pet.status === status)).toBe(true);
    });

    test('Find pets by sold status', async () => {
      const status = 'sold';
      const response = await axios.get(`${URL}/pet/findByStatus?status=${status}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.every(pet => pet.status === status)).toBe(true);
    });
  });

 

});
describe('User API', () => {
    describe('Get user by username', () => {
        test('Find user by username', async () => {
            const username = 'user1';
            const response = await axios.get(`${URL}/user/${username}`);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('username', username);
          });
          
  
      test('Invalid username supplied', async () => {
        const invalidUsername = "InvalidUsername";
        await expect(axios.get(`${URL}/user/${invalidUsername}`)).rejects.toHaveProperty('response.status', 404);
      });
      
  
      test('User not found', async () => {
        const nonExistentUsername = "NonExistentUser";
        await expect(axios.get(`${URL}/user/${nonExistentUsername}`)).rejects.toHaveProperty('response.status', 404);
      });
    });


    describe('Create list of users with given input array', () => {
        test('Create list of users', async () => {
          const userList = [
            {
              "id": 4354356355,
              "username": "user1",
              "firstName": "Mia",
              "lastName": "Mia2",
              "email": "fjhdjfhd@gmail.com",
              "password": "password123",
              "phone": "34564365634",
              "userStatus": 1
            },
            {
              "id": 354545363,
              "username": "user2",
              "firstName": "Mira",
              "lastName": "Mira2",
              "email": "fhuijgdhjghd@gmail.com",
              "password": "password111",
              "phone": "457574756",
              "userStatus": 2
            }
          ];
      
          const response = await axios.post(`${URL}/user/createWithList`, userList);
          
          expect(response.status).toBe(200);
        });
      });
      
  });
  