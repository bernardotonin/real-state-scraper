import { PrismaProperty } from "../lib/interfaces.js";
import prisma from "../lib/db.js";

export const create = async (property: PrismaProperty) => {
  return await prisma.propriedade.create({
    data: property,
  });
};

export const createMany = async (properties: PrismaProperty[]) => {
  return await prisma.propriedade.createMany({
    data: properties,
  });
};

export const findByFields = async (
  property: PrismaProperty
): Promise<boolean> => {
  try {
    await prisma.propriedade.findFirstOrThrow({
      where: {
        area: property.area,
        preco: property.preco,
        quartos: property.quartos,
        bairro: property.bairro,
        tipo: property.tipo,
        uso: property.uso,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};
