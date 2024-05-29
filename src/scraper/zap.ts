import { getPropertyType, getPropertyUsage, getSalePrice, getZapUrl } from "../lib/utils.js";
import { ZapHeaders, ProxyAgent } from '../lib/constants.js'
import { Listing, ZapJSON } from "../lib/json.js";
import { PrismaProperty } from "../lib/interfaces.js";
import { saveMany } from "../repository/PropertyRepository.js";
import fetch from 'node-fetch'


export const parseZapJson = (listings: Listing[]): PrismaProperty[] => {
  const parsedProperties: PrismaProperty[] = [];
  listings.forEach((listing) => {
    parsedProperties.push({
      area: listing.listing.usableAreas[0] ? listing.listing.usableAreas[0] : 0,
      bairro: listing.listing.address.neighborhood,
      preco: getSalePrice(listing.listing.pricingInfos),
      quartos: listing.listing.bedrooms[0] ? listing.listing.bedrooms[0] : 0,
      tipo: getPropertyType(listing.listing.unitTypes[0]),
      uso: getPropertyUsage(listing.listing.usageTypes[0])
    });
  })
  return parsedProperties;
};


const fetchFromZap = async (from: number, size: number): Promise<PrismaProperty[]> => {
  const response = await fetch(getZapUrl(from, size), {agent: ProxyAgent, headers: ZapHeaders});
  const json = await response.json() as ZapJSON
  return parseZapJson(json.search.result.listings)
}


const getZapCount = async (): Promise<number> => {
  const response = await fetch(getZapUrl(0, 1), {agent: ProxyAgent, headers: ZapHeaders});
  const json = await response.json() as ZapJSON
  return Math.floor(json.search.totalCount / 108)
}


export const ZapScrape = async () => {
  let from = 0;
  let size = 110;

  for (let i = 0; i <= await getZapCount(); i++) {
    // const result = await saveMany(await fetchFromZap(from, size))
    // console.log(`${result} | ${i}`)
    console.log(await fetchFromZap(from, size))
    from += size - 2;
  }
}