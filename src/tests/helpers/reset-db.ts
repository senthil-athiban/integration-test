import { prismaClient } from "../../db"

export default async () => {
    await prismaClient.$transaction([
        prismaClient.operation.deleteMany()
    ])
}