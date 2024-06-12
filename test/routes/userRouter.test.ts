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

const credentials = generateCredentials();
let DBConnection:Mongoose;
let user:IUser;
let testDeleteProject:IProject;

beforeAll(async () => {
    jest.setTimeout(30000); // 30 seconds
    //Conecta ao banco de dados
    DBConnection = await mongoose.connect(process.env.MONGO_URL as string)
    // server = app.listen(3000) as unknown as Server
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(credentials.password, salt);

    user = await UserModel.create({...credentials, password:hashedPassword})
    console.log("user", user)

    const loginResponse = await request(app).post('/api/v1/auth/login')
        .send(credentials)
        console.log("loginresponse", loginResponse.body)
    tokenCookie = loginResponse.headers['set-cookie']; // Extract cookie from login response
    

    // testUser = await UserModel.create(mockUser);
    // const testProject1 = await ProjectModel
    //     .create({ name: 'Project 1', createdBy:user._id, members:[user._id] });
    // testDeleteProject = await ProjectModel
    //     .create({ name: 'Project 2', createdBy: user._id, members:[user._id]});
    // const testProject3 = await ProjectModel
    //     .create({ name: 'Test Project', createdBy: user._id, members:[user._id]});
})

afterAll(async () => {
    // await UserModel.findByIdAndDelete(testUser._id);
    await UserModel.findByIdAndDelete(user._id);
    await DBConnection.disconnect()
})



// interface TestResponse extends Response {
//     msg:string
// }

describe("USERS API", () => {

    describe("GET /current-user", () => {

        it("should return the current logged in user", async () => {
            const response = await request(app)
                .get('/api/v1/users/current-user')
                .set('Cookie', tokenCookie)
            expect(response.statusCode).toBe(200)
            expect(response.body._id.toString()).toBe(user._id.toString());
        })
    
        it("should produce a validation error if there's no token in the request", async () => {
            const response = await request(app)
                .get('/api/v1/users/current-user')
                // .set('Cookie', tokenCookie)
            expect(response.statusCode).toBe(400)
            expect(response.body.messages[0]).toBe("Usuário não logado!");
        })
    
        it("should NOT return user's password", async () => {
            const response = await request(app)
                .get('/api/v1/users/current-user')
                .set('Cookie', tokenCookie)
    
            expect(response.statusCode).toBe(200)
            expect(response.body).not.toHaveProperty('password')
        })
    })

    describe("PATCH /:userId", () => {
        it("should return a validation error message if given an invalid userId", async () => {
            const invalidId = "kjlasdflksajfkl";
            const response = await request(app)
            .patch(`/api/v1/users/${invalidId}`)
            .set('Cookie', tokenCookie)
            expect(response.statusCode).toBe(400)
            expect(response.body.messages[0]).toBe("Usuário não identificado ou não encontrado!");

        })

        it("should produce a validation error if there's no token in the request", async () => {
            const response = await request(app)
                .patch(`/api/v1/users/${user._id}`)
                // .set('Cookie', tokenCookie)
            expect(response.statusCode).toBe(400)
            expect(response.body.messages[0]).toBe("Usuário não logado!");
        })

        it("should return an authentication error message if token is invalid", async () => {
            const invalidToken = "token=eyJhbGcisajdfahfOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjU0ZWUyZTQ0Mjk4YjRiNzgxZTExMzUiLCJyb2xlIjoiTm90IFNwZWNpZmllZCIsImlhdCI6MTcxNzM3NDMyOSwiZXhwIjoxNzE3NDYwNzI5fQ.I8T1qyVmSpRjPerRZ63a86DAoRjTBNY-COGg28al5_4; Path=/; Expires=Mon, 03 Jun 2024 01:51:53 GMT; HttpOnly";
            const response = await request(app)
                .patch(`/api/v1/users/${user._id}`)
                .set('Cookie', invalidToken)

            expect(response.statusCode).toBe(401)
            expect(response.body.messages[0]).toBe("Autenticação inválida!");
        })

        it("should return a validation error message if role is invalid", async () => {
            const changes = {
                role:"invalid role"
            }
            const response = await request(app)
                .patch(`/api/v1/users/${user._id}`)
                .set('Cookie', tokenCookie)
                .send(changes)

            expect(response.statusCode).toBe(400)
            expect(response.body.messages[0]).toBe("Valor inválido para permissão!");
        })

        it("should return an updated user", async () => {
            const changes = {
                username:"changed",
                name:"Changed"
            }
            const response = await request(app)
                .patch(`/api/v1/users/${user._id}`)
                .set('Cookie', tokenCookie)
                .send(changes);

            expect(response.body._id.toString()).toBe(user._id.toString());
            expect(response.body.username).not.toBe(user.username);
            expect(response.body.name).not.toBe(user.name);
        })

        it("should return an user with the changes", async () => {
            const changes = {
                username:"hasjldfhkjadf",
                name:"xmcznviuowqr"
            }
            const response = await request(app)
                .patch(`/api/v1/users/${user._id}`)
                .set('Cookie', tokenCookie)
                .send(changes);
            
            expect(response.body._id.toString()).toBe(user._id.toString());
            expect(response.body.username).toBe(changes.username);
            expect(response.body.name).toBe(changes.name);

        })
    })

    // describe("DELETE /:userId", () => {

    //     it("should return a validation error message if given an invalid userId", async () => {
    //         const invalidId = "kjlasdflksajfkl";
    //         const response = await request(app)
    //         .delete(`/api/v1/users/${invalidId}`)
    //         .set('Cookie', tokenCookie)
    //         expect(response.statusCode).toBe(400)
    //         expect(response.body.messages[0]).toBe("Usuário não identificado ou não encontrado!");

    //     })

    //     it("should produce a validation error if there's no token in the request", async () => {
    //         const response = await request(app)
    //             .patch(`/api/v1/users/${user._id}`)
    //             // .set('Cookie', tokenCookie)
    //         expect(response.statusCode).toBe(400)
    //         expect(response.body.messages[0]).toBe("Usuário não logado!");
    //     })

    //     it("should return an authentication error message if token is invalid", async () => {
    //         const invalidToken = "token=eyJhbGcisajdfahfOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjU0ZWUyZTQ0Mjk4YjRiNzgxZTExMzUiLCJyb2xlIjoiTm90IFNwZWNpZmllZCIsImlhdCI6MTcxNzM3NDMyOSwiZXhwIjoxNzE3NDYwNzI5fQ.I8T1qyVmSpRjPerRZ63a86DAoRjTBNY-COGg28al5_4; Path=/; Expires=Mon, 03 Jun 2024 01:51:53 GMT; HttpOnly";
    //         const response = await request(app)
    //             .patch(`/api/v1/users/${user._id}`)
    //             .set('Cookie', invalidToken)

    //         expect(response.statusCode).toBe(401)
    //         expect(response.body.messages[0]).toBe("Autenticação inválida!");
    //     })

    //     it("should return a validation error message if role is invalid", async () => {
    //         const changes = {
    //             role:"invalid role"
    //         }
    //         const response = await request(app)
    //             .patch(`/api/v1/users/${user._id}`)
    //             .set('Cookie', tokenCookie)
    //             .send(changes)

    //         expect(response.statusCode).toBe(400)
    //         expect(response.body.messages[0]).toBe("Valor inválido para permissão!");
    //     })

    //     it("should return the deleted user", async () => {
    //         const response = await request(app)
    //             .patch(`/api/v1/users/${user._id}`)
    //             .set('Cookie', tokenCookie)

    //         expect(response.body._id.toString()).toBe(user._id.toString());
    //         expect(response.body.username).not.toBe(user.username);
    //         expect(response.body.firstName).not.toBe(user.firstName);

    //     })

        // it("should return an user with the changes", async () => {
        //     const changes = {
        //         username:"hasjldfhkjadf",
        //         firstName:"xmcznviuowqr"
        //     }
        //     const response = await request(app)
        //         .patch(`/api/v1/users/${user._id}`)
        //         .set('Cookie', tokenCookie)
        //         .send(changes);
            
        //     expect(response.body._id.toString()).toBe(user._id.toString());
        //     expect(response.body.username).toBe(changes.username);
        //     expect(response.body.firstName).toBe(changes.firstName);

        // })


    // })
})