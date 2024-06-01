import app from "../server";
import supertest from "supertest";
// import supertest from "supertest";
import express from "express";

// const app = express();

describe('GET /api/hello', () => {
    it('should return a message', async () => {
      // expect("success test").toBe("success test");
      const response = await supertest(app).get('/api/hello');
      expect(response.status).toBe(200);
//       expect(response.body).toBe('Hello, world!');
    });
  });