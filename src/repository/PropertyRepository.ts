import { PrismaProperty } from "../lib/interfaces.js";
import {
  create,
  createMany,
  findByFields,
} from "../service/PropertyService.js";

export const save = async (property: PrismaProperty): Promise<Boolean> => {
  const db_entry = await create(property);

  if (db_entry) {
    return true;
  }

  return false;
};

export const saveMany = async (
  properties: PrismaProperty[]
): Promise<Boolean> => {
  const db_entry = await createMany(properties);

  if (db_entry) {
    return true;
  }

  return false;
};

export const findDuplicate = async (
  property: PrismaProperty
): Promise<boolean> => {
  return await findByFields(property);
};
