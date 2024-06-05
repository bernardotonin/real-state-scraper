import { ProxyAgent, VivaHeaders } from "../lib/constants.js";
import { getVivaUrl, parseJson } from "../lib/utils.js";
import { save, findDuplicate } from "../repository/PropertyRepository.js";
import { PrismaProperty } from "../lib/interfaces.js";
import { ZapJSON } from "../lib/json.js";
import fetch from "node-fetch";

export const getVivaCount = async (): Promise<number> => {
  const response = await fetch(getVivaUrl(0, 0), {
    agent: ProxyAgent,
    headers: VivaHeaders,
  });
  const json = await response.json() as ZapJSON;
  return Math.floor(json.search.totalCount / 108);
};

export const fetchFromViva = async (
  from: number,
  size: number
): Promise<PrismaProperty[]> => {
  const response = await fetch(getVivaUrl(from, size), {
    agent: ProxyAgent,
    headers: VivaHeaders,
  });
  const json = await response.json() as ZapJSON;
  return parseJson(json.search.result.listings);
};

export const VivaScrape = async () => {
  let from = 0;
  let size = 110;

  for (let i = 0; i <= await getVivaCount(); i++) {
    const data = await fetchFromViva(from, size);
    for (let j = 0; j < data.length; j++) {
      if (await findDuplicate(data[j])) continue;
      await save(data[j]);
    };
    from += size - 2;
    console.log('sucesso | ' + i);
  }
};
