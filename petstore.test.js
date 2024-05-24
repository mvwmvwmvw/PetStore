const axios = require('axios');
const URL = 'https://petstore.swagger.io/v2';

describe('Pet API tests', () => {
  describe('Get pet by id', () => {
    test('Find pet by ID', async () => {
      const petId = 1;
      const response = await axios.get(`${URL}/pet/${petId}`);
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', petId);
    });

    test('Invalid ID', async () => {
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

  describe('Add a new pet', () => {
    test('Add a new pet to the store', async () => {
        const newPet = {
            "id": 123,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "Dog1",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        };

        const response = await axios.post(`${URL}/pet`, newPet);
        expect(response.status).toBe(200);
    });
});
describe('Delete a pet', () => {
    test('Delete a pet from the store', async () => {
        const petId = 123; 

        const response = await axios.delete(`${URL}/pet/${petId}`);
        expect(response.status).toBe(200); 
    });

    test('Cannot delete a pet from the store because wrong id, id does not exist', async () => {
        const petId = 439587438578934798578934;

        try {
            await axios.delete(`${URL}/pet/${petId}`);
        } catch (error) {
            expect(error.response.status).toBe(404); 
        }
    });
});
describe('Update an existing pet', () => {
    test('Update an existing pet in the store', async () => {
         const updatedPet = {
              "id": 123, 
              "category": {
                 "id": 0,
                  "name": "string"
              },
             "name": "updatedDoggie",
              "photoUrls": [
                  "string"
              ],
               "tags": [
                {
                    "id": 0,
                     "name": "string"
                  }
                ],
             "status": "available"
            };

            const response = await axios.put(`${URL}/pet`, updatedPet);
            expect(response.status).toBe(200); 
        });
    });

});


describe('User API tests', () => {
    describe('Get user by username', () => {
        test('Find user by username', async () => {
            const username = 'user1';
            const response = await axios.get(`${URL}/user/${username}`);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('username', username);
          });
          
  
      test('Invalid username', async () => {
        const invalidUsername = "InvalidUsername";
        await expect(axios.get(`${URL}/user/${invalidUsername}`)).rejects.toHaveProperty('response.status', 404);
      });
      
  
      test('User not found', async () => {
        const nonExistentUsername = "NonExistentUser";
        await expect(axios.get(`${URL}/user/${nonExistentUsername}`)).rejects.toHaveProperty('response.status', 404);
      });
    });


    describe('Create list of users', () => {
        test('Create list of users', async () => {
          const userList = [
            {
              "id": 4354356355,
              "username": "userMia",
              "firstName": "Mia",
              "lastName": "Mia2",
              "email": "fjhdjfhd@gmail.com",
              "password": "password123",
              "phone": "34564365634",
              "userStatus": 1
            },
            {
              "id": 354545363,
              "username": "userMira",
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
  