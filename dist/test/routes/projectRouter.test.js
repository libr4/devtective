import app from "../../server";
import supertest from 'supertest';
describe("PROJECT API", () => {
    it("should return an document and a status 201 if a project is successfuly created", async () => {
        const newProject = {
            name: "Devtective",
            description: "It helps you manage your development process",
        };
        const response = await supertest(app).post('/api/v1/projects').send(newProject);
        expect(response.body.name).toBe("Devtective");
        expect(response.body.description).toBe("It helps you manage your development process");
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
    });
});
