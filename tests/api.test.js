const request = require('supertest');
const app = require('../src/app'); // Replace with the path to your Express app

// Mock data structure to test against
const mockSport = {
  name: "Banana",
  popularityRank: 2
};

const mockPlayer = {
  name: "Jane Smith",
  age: 22,
  position: "Goalkeeper"
};

describe('Sports Management API', () => {

  let sportId, playerId;

  // Test creating a new sport
  describe('POST /api/v1/sports', () => {
    it('should create a new sport', async () => {
      const res = await request(app)
        .post('/api/v1/sports')
        .send(mockSport)
        .expect(201);
      
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.name).toBe(mockSport.name);
      sportId = res.body.data.id;
    });

    it('should return 400 for invalid sport data', async () => {
      await request(app)
        .post('/api/v1/sports')
        .send({})
        .expect(400);
    });
  });

  // Test retrieving all sports
  describe('GET /api/v1/sports', () => {
    it('should retrieve a list of sports', async () => {
      const res = await request(app)
        .get('/api/v1/sports')
        .expect(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  // Test updating a sport
  describe('PUT /api/v1/sports/:id', () => {
    it('should update an existing sport', async () => {
      const updatedSport = { name: "Updated Banana" };
      const res = await request(app)
        .put(`/api/v1/sports/${sportId}`)
        .send(updatedSport)
        .expect(200);
      console.log(res.body.data)
      expect(res.body.data.name).toBe(updatedSport.name);
    });

    it('should return 404 for a non-existent sport ID', async () => {
      await request(app)
        .put('/api/v1/sports/invalid-id')
        .send({ name: "Test" })
        .expect(404);
    });
  });

  // Test deleting a sport
  describe('DELETE /api/v1/sports/:id', () => {
    it('should delete an existing sport', async () => {
      await request(app)
        .delete(`/api/v1/sports/${sportId}`)
        .expect(200);
    });

    it('should return 404 for a non-existent sport ID', async () => {
      await request(app)
        .delete('/api/v1/sports/invalid-id')
        .expect(404);
    });
  });

  // Test adding a player to a sport
  describe('POST /api/v1/sports/:id/players', () => {
    it('should add a player to the sport', async () => {
      const res = await request(app)
        .post(`/api/v1/sports/${sportId}/players`)
        .send(mockPlayer)
        .expect(201);
      
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.name).toBe(mockPlayer.name);
      playerId = res.body.data.id;
    });
  });

  // Test retrieving all players in a sport
  describe('GET /api/v1/sports/:id/players', () => {
    it('should retrieve all players in the sport', async () => {
      const res = await request(app)
        .get(`/api/v1/sports/${sportId}/players`)
        .expect(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  // Test updating a player in a sport
  describe('PUT /api/v1/sports/:sportId/players/:playerId', () => {
    it('should update an existing player', async () => {
      const updatedPlayer = { age: 23 };
      const res = await request(app)
        .put(`/api/v1/sports/${sportId}/players/${playerId}`)
        .send(updatedPlayer)
        .expect(200);
      
      expect(res.body.age).toBe(updatedPlayer.age);
    });

    it('should return 404 for a non-existent player ID', async () => {
      await request(app)
        .put(`/api/v1/sports/${sportId}/players/invalid-id`)
        .send({ name: "Test" })
        .expect(404);
    });
  });

  // Test deleting a player from a sport
  describe('DELETE /api/v1/sports/:sportId/players/:playerId', () => {
    it('should delete an existing player', async () => {
      await request(app)
        .delete(`/api/v1/sports/${sportId}/players/${playerId}`)
        .expect(200);
    });

    it('should return 404 for a non-existent player ID', async () => {
      await request(app)
        .delete(`/api/v1/sports/${sportId}/players/invalid-id`)
        .expect(404);
    });
  });

});
