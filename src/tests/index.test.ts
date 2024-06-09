import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "..";
import resetDb from "./helpers/reset-db";

describe('POST /sum', () => {

  beforeAll(async () => {
    await resetDb();
  })

  it('should return the sum of two numbers', async () => {
    const { status, body } = await request(app).post("/sum").send({
        a: 1,
        b: 2
    });

    expect(status).toBe(200);
    expect(body).toEqual({ answer: 3, id: expect.any(Number)})
  })

  it('should return the multiplication of two number', async () => {
    const { status, body } =await request(app).post("/multiply").send({
      a: 1,
      b: 2
    });

    expect(status).toBe(200);
    expect(body).toEqual({answer: 2, id: expect.any(Number)});
  })

  it('should return the task id and default status of completion as false', async () => {
    const { status, body } = await request(app).post('/tasks').send({
      title: "to code",
      description: "to complete the integration test",
      completed: false
    });

    expect(status).toBe(201);
    expect(body).toEqual({id: expect.any(Number), completed: false});
  });

  it('should return the task id and assign the task id to the user', async () => {

    const userRequest = await request(app).post('/users').send({
      name: "john",
      email: "johndoe@gmail.com"
    });

    expect(userRequest.status).toBe(200);
    expect(userRequest.body).toEqual({id: expect.any(Number), email: "johndoe@gmail.com"});

    const taskRequest = await request(app).post('/tasks').send({
      title: "to sleep",
      description: "to sleep at 9pm",
      completed: false
    });
    
    expect(taskRequest.status).toBe(201);
    expect(taskRequest.body).toEqual({id: expect.any(Number), completed: false});

    const taskAssign = await request(app).put(`/tasks/${taskRequest.body.id}/assign/${userRequest.body.id}`).send();

    expect(taskAssign.status).toBe(200);
    expect(taskAssign.body).toEqual({
        id: expect.any(Number),
        title: "to sleep",
        description: "to sleep at 9pm",
        completed: false,
        status: "assigned",
        userId: expect.any(Number)
    });
  })
})
