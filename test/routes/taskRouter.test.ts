import request from 'supertest';
import app from "../../server"
import ProjectModel from '../../models/ProjectModel';
import UserModel from '../../models/UserModel';
import { IUser } from '../../types/user';
import mongoose, { Mongoose, ObjectId } from 'mongoose';
import { IProject } from '../../types/project';
import bcrypt from 'bcryptjs'
import { generateCredentials, generateMockTask } from '../../utils/testUtils';
import TaskModel, { ITask } from '../../models/TaskModel';

let tokenCookie:string;
// const credentials = {
//     username:"usuario_teste1",
//     password:"password",
//     email:"teste1@teste.com",
//     firstName:"Teste"
// }

const credentials = generateCredentials();

let testProject1:IProject;
let testProject2:IProject;

let testTask1:ITask;
let testTask2:ITask;
let testTask3:ITask;

let DBConnection:Mongoose;
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
    console.log("user", user)

    const loginResponse = await request(app).post('/api/v1/auth/login')
        .send(credentials)
        console.log("loginresponse", loginResponse.body)
    tokenCookie = loginResponse.headers['set-cookie']; // Extract cookie from login response
    

    //Cria no BD projetos para teste
    testProject1 = await ProjectModel
        .create({ name: 'Test Project 1', createdBy:user._id, members:[user._id] });

    testProject2 = await ProjectModel
        .create({ name: 'Test Project 2', createdBy:user._id, members:[user._id] });

    testTask1 = await TaskModel
        .create({...generateMockTask(), fromProject:testProject1._id});
    testTask2 = await TaskModel
        .create({...generateMockTask(), fromProject:testProject1._id});
    testTask3 = await TaskModel
        .create({...generateMockTask(), fromProject:testProject1._id});
    // testDeleteProject = await ProjectModel
    //     .create({ name: 'Test Project 2', createdBy: user._id, members:[user._id]});
    // const testProject3 = await ProjectModel
    //     .create({ name: 'Test Project 3', createdBy: user._id, members:[user._id]});
})

afterAll(async () => {
    await ProjectModel.deleteMany({createdBy:user._id})
    await TaskModel.deleteMany({fromProject:testProject1._id})
    await UserModel.findByIdAndDelete(user._id)
    await DBConnection.disconnect()
})



// interface TestResponse extends Response {
//     msg:string
// }

describe("TASKS API", () => {
    describe("GET /api/v1/projects/:projectId/tasks", () => {
        it("should return an validation error message if given projectId is invalid", async () => {
            const invalidId = "jsahfdkjshfj";
            const response = await request(app)
                .get(`/api/v1/projects/${invalidId}/tasks`)
                .set('Cookie', tokenCookie)

            expect(response.body.messages[0]).toBe("Projeto não identificado ou não existe!")
        })

        it("should return every task related to a given project", async () => {
            const response = await request(app)
                .get(`/api/v1/projects/${testProject1._id}/tasks`)
                .set('Cookie', tokenCookie)

            expect(response.statusCode).toBe(200)
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(3);

            expect(response.body[0].fromProject.toString()).toBe(testProject1._id.toString())
            expect(response.body[1].fromProject.toString()).toBe(testProject1._id.toString())
            expect(response.body[2].fromProject.toString()).toBe(testProject1._id.toString())
        })
    })

    describe("POST /api/v1/projects/:projectId/tasks", () => {
        it("should return an validation error message if given projectId is invalid", async () => {
            const invalidId = "jsahfdkjshfj";
            const response = await request(app)
                .post(`/api/v1/projects/${invalidId}/tasks`)
                .set('Cookie', tokenCookie)

            expect(response.body.messages[0]).toBe("Projeto não identificado ou não existe!")
        })

        it("should return the created task", async () => {
            const newTask = generateMockTask();
            const response = await request(app)
                .post(`/api/v1/projects/${testProject1._id}/tasks`)
                .set('Cookie', tokenCookie)
                .send(newTask)

            expect(response.statusCode).toBe(201)
            expect(response.body.title).toBe(newTask.title);
            expect(response.body.description).toBe(newTask.description);
            expect(response.body.type).toBe(newTask.type);
        })

        
    })

    describe("GET /api/v1/projects/:projectId/tasks/:taskId", () => {
        it("should return an error message if there's no task with that id from the given project", async () => {
            const response = await request(app)
                .get(`/api/v1/projects/${testProject2._id}/tasks/30`)
                .set('Cookie', tokenCookie)

            expect(response.body.messages[0]).toBe("Erro ao encontrar tarefa!");
        })

        it("should return the asked task with a numeric taskId", async () => {
            const response = await request(app)
                .get(`/api/v1/projects/${testProject1._id}/tasks/${testTask1.taskId}`)
                .set('Cookie', tokenCookie)

            expect(response.body._id.toString()).toBe(testTask1._id.toString())
            expect(typeof response.body.taskId).toBe('number');
        })

    })

    describe("PATCH /api/v1/projects/:projectId/tasks/:taskId", () => {
        const changes = generateMockTask();
        it("should return an error message if there's no task with that id from the given project", async () => {
            const response = await request(app)
                .patch(`/api/v1/projects/${testProject2._id}/tasks/30`)
                .send(changes)
                .set('Cookie', tokenCookie)

            expect(response.body.messages[0]).toBe("Erro ao encontrar tarefa!");
        })

        it("should return the new changed task but with same _id and taskId", async () => {
            const response = await request(app)
                .patch(`/api/v1/projects/${testProject1._id}/tasks/${testTask1.taskId}`)
                .send(changes)
                .set('Cookie', tokenCookie)
            const query = await TaskModel.find({fromProject:testProject1._id, taskId:testTask1.taskId});
            console.log("query", query)

            //changes are expected
            expect(response.body.title).toBe(changes.title)
            expect(response.body.description).toBe(changes.description)

            //but taskId should remain the same
            expect(response.body._id.toString()).toBe(testTask1._id.toString())
            expect(response.body.taskId).toBe(testTask1.taskId)
        })
    })
})


    // it("should return the created project and 201 status code", async () => {
    //     const response = await request(app)
    //         .post('/api/v1/projects')
    //         .send({
    //             name:"Test Project",
    //             members:[]
    //         })
    //         .set('Cookie', tokenCookie)
    //     const parsedRes = JSON.parse(response.text);
    //     // console.log(parsedRes)
    //     expect(response.statusCode).toBe(201)
    //     expect(response.body).toHaveProperty('createdBy')
    //     expect(response.body).toHaveProperty('members')
    //     expect(response.body.members).toContainEqual(user._id.toString())
    // })

    // it("should return the project with the updated information", async () => {
    //     const project = await ProjectModel.findOne({name:"Test Project"}) as IProject;
    //     const changes = {
    //         name:"Test",
    //         leader:[user._id]
    //     }
    //     const response = await request(app)
    //         .patch(`/api/v1/projects/${project._id}`)
    //         .send(changes)
    //         .set('Cookie', tokenCookie)
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.name).toBe("Test");
    //     expect(response.body.leader).toContain(user._id.toString());
    // })

    // it("should delete the resource and return null and a 200 status code", async () => {
    //     const response = await request(app)
    //         .delete(`/api/v1/projects/${testDeleteProject._id}`)
    //         .set('Cookie', tokenCookie);
    //     const toDeleteId = testDeleteProject._id as ObjectId;
        
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body._id.toString()).toBe(toDeleteId.toString());

    //     const deletedProject = await ProjectModel.findById(testDeleteProject._id);
    //     expect(deletedProject).toBeNull();
// })