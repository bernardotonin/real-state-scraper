import prisma from "../lib/db.js"
import { PrismaProperty } from "../lib/interfaces.js"

export const create = async (property: PrismaProperty) => {
  return await prisma.propriedade.create({
    data: property
  })
}

export const createMany = async (properties: PrismaProperty[]) => {
  return await prisma.propriedade.createMany({
    data: properties
  })
}

const findById = async () => {
    
}

const findAll = async () => {
    
}

const update = async () => {
    
}

const deleteById = async () => {
    
}
