import { getZapUrl, parseJson } from "../lib/utils.js";
import { ZapHeaders, ProxyAgent } from "../lib/constants.js";
import { save, findDuplicate } from "../repository/PropertyRepository.js";
import { PrismaProperty } from "../lib/interfaces.js";
import { ZapJSON } from "../lib/json.js";
import fetch from "node-fetch";

const fetchFromZap = async (
  from: number,
  size: number
): Promise<PrismaProperty[]> => {
  const response = await fetch(getZapUrl(from, size), {
    agent: ProxyAgent,
    headers: ZapHeaders,
  });
  const json = await response.json() as ZapJSON;
  return parseJson(json.search.result.listings);
};

export const getZapCount = async (): Promise<number> => {
  const response = await fetch(getZapUrl(0, 3), {
    agent: ProxyAgent,
    headers: ZapHeaders,
  });
  const json = await response.json() as ZapJSON;
  return Math.floor(json.search.totalCount / 108);
};

export const ZapScrape = async (): Promise<void> => {
  let from = 0;
  let size = 110;
  for (let i = 0; i <= await getZapCount(); i++) {
    const data = await fetchFromZap(from, size);
    for (let j = 0; j < data.length; j++) {
      if (await findDuplicate(data[j])) continue;
      await save(data[j]);
    };
    from += size - 2;
    console.log('sucesso | ' + i);
  }
};
