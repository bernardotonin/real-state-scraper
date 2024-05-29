import { ProxyAgent, VivaHeaders } from "../lib/constants.js";
import { getVivaUrl, parseZapJson } from "../lib/utils.js";
import { PrismaProperty } from "../lib/interfaces.js";
import { ZapJSON } from "../lib/json.js";
import fetch from 'node-fetch'

export const getVivaCount = async (): Promise<number> => {
  const response = await fetch(getVivaUrl(0, 0), {
    agent: ProxyAgent,
    headers: VivaHeaders,
  });
  const json = (await response.json()) as ZapJSON;
  return Math.floor(json.search.totalCount / 108);
};

export const fetchFromViva = async (from: number, size: number): Promise<PrismaProperty[]> => {
  const response = await fetch(getVivaUrl(from, size), {agent: ProxyAgent, headers: VivaHeaders});
  const json = await response.json() as ZapJSON
  return parseZapJson(json.search.result.listings)
}

export const VivaScrape = async () => {
  let from = 0;
  let size = 110;

  for (let i = 0; i <= await getVivaCount(); i++) {
    // const result = await saveMany(await fetchFromZap(from, size))
    // console.log(`${result} | ${i}`)
    console.log(await fetchFromViva(from, size))
    from += size - 2;
  }
}