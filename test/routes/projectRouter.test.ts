import request from 'supertest';
import app from "../../server"
import ProjectModel from '../../models/ProjectModel';
import UserModel from '../../models/UserModel';
import { IUser } from '../../types/user';
import mongoose, { Mongoose, ObjectId } from 'mongoose';
import { IProject } from '../../types/project';
import bcrypt from 'bcryptjs'
import { generateCredentials } from '../../utils/testUtils';

let tokenCookie:string;
// const credentials = {
//     username:"usuario_teste1",
//     password:"password",
//     email:"teste1@teste.com",
//     firstName:"Teste"
// }

const credentials = generateCredentials();

let DBConnection;
let user:IUser;
let testDeleteProject:IProject;
beforeAll(async () => {
    // jest.setTimeout(30000); // 30 seconds
    DBConnection = await mongoose.connect(process.env.MONGO_URL as string)
    // server = app.listen(3000) as unknown as Server
    // user = await UserModel.create(credentials) as IUser;
    // const registerResponse = await request(app).post('/api/v1/auth/register')
    //     .send(credentials)

    //Cria o usuário para teste
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(credentials.password, salt);

    user = await UserModel.create({...credentials, password:hashedPassword})
    // console.log("user", user)

    const loginResponse = await request(app).post('/api/v1/auth/login')
        .send(credentials)
        // console.log("loginresponse", loginResponse.body)
    tokenCookie = loginResponse.headers['set-cookie']; // Extract cookie from login response
    

    //Cria no BD projetos para teste
    const testProject1 = await ProjectModel
        .create({ name: 'Project 1', createdBy:user._id, members:[user._id] });
    testDeleteProject = await ProjectModel
        .create({ name: 'Project 2', createdBy: user._id, members:[user._id]});
    const testProject3 = await ProjectModel
        .create({ name: 'Test Project', createdBy: user._id, members:[user._id]});
})

afterAll(async () => {
    await ProjectModel.deleteMany({createdBy:user._id})
    await UserModel.findByIdAndDelete(user._id)
})



// interface TestResponse extends Response {
//     msg:string
// }

describe("PROJECT API", () => {
    it("should return every project a user is related to", async () => {
        const response = await request(app)
            .get('/api/v1/projects')
            .set('Cookie', tokenCookie)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array);
        // console.log("every project", response.body);
        expect(response.body.length).toBe(3);
    })

    it("should return the created project and 201 status code", async () => {
        const response = await request(app)
            .post('/api/v1/projects')
            .send({
                name:"Test Project",
                members:[user._id]
            })
            .set('Cookie', tokenCookie)
        const parsedRes = JSON.parse(response.text);
        // console.log(parsedRes)
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('createdBy')
        expect(response.body).toHaveProperty('members')
        expect(response.body.members).toContainEqual(user._id.toString())
    })

    it("should return the project with the updated information", async () => {
        const project = await ProjectModel.findOne({name:"Test Project"}) as IProject;
        const changes = {
            name:"Test",
            leader:[user._id]
        }
        const response = await request(app)
            .patch(`/api/v1/projects/${project._id}`)
            .send(changes)
            .set('Cookie', tokenCookie)
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Test");
        expect(response.body.leader).toContain(user._id.toString());
    })

    it("should delete the resource and return null and a 200 status code", async () => {
        const response = await request(app)
            .delete(`/api/v1/projects/${testDeleteProject._id}`)
            .set('Cookie', tokenCookie);
        const toDeleteId = testDeleteProject._id as ObjectId;
        
        expect(response.statusCode).toBe(200);
        expect(response.body._id.toString()).toBe(toDeleteId.toString());

        const deletedProject = await ProjectModel.findById(testDeleteProject._id);
        expect(deletedProject).toBeNull();
    })
})