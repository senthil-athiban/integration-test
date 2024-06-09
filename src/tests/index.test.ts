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
  })
})
