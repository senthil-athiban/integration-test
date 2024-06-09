import express from "express";
import { prismaClient } from "./db";

export const app = express();
app.use(express.json());

app.post('/sum', async (req, res) => {
    const { a,b } = req.body;
    const result = a+b;

    const request = await prismaClient.operation.create({
        data:{
            a: 1,
            b: 2,
            answer: result,
            type: "Sum"
        }
    });

    res.json({
        answer: result,
        id: request.id
    })
})

app.post('/multiply', async (req, res) => {
    const { a,b } = req.body;
    const result = a*b;

    const request = await prismaClient.operation.create({
        data: {
            a: a,
            b: b,
            answer: result,
            type: "Multiply"
        }
    })
    res.json({
        answer: result,
        id: request.id
    })
})

