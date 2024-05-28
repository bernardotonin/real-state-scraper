import { ZapHeaders, ProxyAgent } from '../lib/constants.js'
import { PrismaProperty } from "./interfaces.js";
import { Listing, PricingInfo, ZapJSON } from "./json.js";
import fetch from 'node-fetch'

const getPropertyType = (unitTypes: string): string => {
  if (unitTypes.includes('LAND')) {
    return 'terreno';
  };

  if (unitTypes === "OFFICE") {
    return 'escritorio';
  };

  if (unitTypes === "HOME") {
    return 'casa';
  };

  if (unitTypes === "APARTMENT") {
    return 'apartamento';
  }

  if (unitTypes === "FARM") { 
    return 'chacara'
  }

  if (unitTypes === "COMMERCIAL_PROPERTY" || unitTypes === "BUSINESS") { 
    return 'propriedade comercial'
  }

  if (unitTypes === "CONDOMINIUM") { 
    return 'condominio'
  }

  if (unitTypes === "SHED_DEPOSIT_WAREHOUSE") { 
    return 'deposito'
  }

  if (unitTypes === "BUILDING") { 
    return 'construcao'
  }

  if (unitTypes === "RESIDENTIAL_BUILDING") { 
    return 'construcao residencial'
  }

  if (unitTypes === "COMMERCIAL_BUILDING") { 
    return 'construcao comercial'
  }

  if (unitTypes === "PENTHOUSE") { 
    return 'apartamento'
  }

  return '';
}

const getPropertyUsage = (usageType: string): string => {
  if (usageType === "COMMERCIAL") {
    return 'comercial';
  };

  if (usageType === "RESIDENTIAL") {
    return 'residencial';
  };

  return '';
}

export const getSalePrice = (pricingInfos: PricingInfo[]): number => {
  if (pricingInfos.find((pricingInfo) => {return pricingInfo.businessType == "SALE"}) != undefined){
    // type guard not working properly :(
    // ↓
    return pricingInfos.find((pricingInfo) => {return pricingInfo.businessType == "SALE"})?.price as number
  }
  return 0;
}

// COMMERCIAL_PROPERTY, CONDOMINIUM, SHED_DEPOSIT_WAREHOUSE, BUILDING, RESIDENTIAL_BUILDING, PENTHOUSE, BUSINESS

export const parseZapJson = (listings: Listing[]): PrismaProperty[] => {
  const parsedProperties: PrismaProperty[] = [];
  listings.forEach((listing) => {
    parsedProperties.push({
      area: listing.listing.usableAreas[0] ? listing.listing.usableAreas[0] : 0,
      bairro: listing.listing.address.neighborhood,
      preco: getSalePrice(listing.listing.pricingInfos),
      quartos: listing.listing.bedrooms[0] ? listing.listing.bedrooms[0] : 0,
      tipo: getPropertyType(listing.listing.unitTypes[0]),
      //tipo: listing.listing.unitTypes[0] ,
      uso: getPropertyUsage(listing.listing.usageTypes[0])
    });
  })
  return parsedProperties;
};

export const getZapUrl = (from: number, size: number): string => {
  return `https://glue-api.zapimoveis.com.br/v2/listings?user=e75cb044-fd8e-41a6-a234-50b267383759&portal=ZAP&includeFields=search%28result%28listings%28listing%28contractType%2ClistingsCount%2CsourceId%2CdisplayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2Cstamps%2CcreatedAt%2Cfloors%2CunitTypes%2CnonActivationReason%2CproviderId%2CpropertyType%2CunitSubTypes%2CunitsOnTheFloor%2ClegacyId%2Cid%2Cportal%2CunitFloor%2CparkingSpaces%2CupdatedAt%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2CadvertiserContact%2CwhatsappNumber%2Cbedrooms%2CacceptExchange%2CpricingInfos%2CshowPrice%2Cresale%2Cbuildings%2CcapacityLimit%2Cstatus%2CpriceSuggestion%29%2Caccount%28id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2ClegacyZapId%2CcreatedDate%2Ctier%29%2Cmedias%2CaccountLink%2Clink%29%29%2CtotalCount%29%2Cpage%2Cfacets%2CfullUriFragments%2Cdevelopments%28search%28result%28listings%28listing%28contractType%2ClistingsCount%2CsourceId%2CdisplayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2Cstamps%2CcreatedAt%2Cfloors%2CunitTypes%2CnonActivationReason%2CproviderId%2CpropertyType%2CunitSubTypes%2CunitsOnTheFloor%2ClegacyId%2Cid%2Cportal%2CunitFloor%2CparkingSpaces%2CupdatedAt%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2CadvertiserContact%2CwhatsappNumber%2Cbedrooms%2CacceptExchange%2CpricingInfos%2CshowPrice%2Cresale%2Cbuildings%2CcapacityLimit%2Cstatus%2CpriceSuggestion%29%2Caccount%28id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2ClegacyZapId%2CcreatedDate%2Ctier%29%2Cmedias%2CaccountLink%2Clink%29%29%2CtotalCount%29%29%2CsuperPremium%28search%28result%28listings%28listing%28contractType%2ClistingsCount%2CsourceId%2CdisplayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2Cstamps%2CcreatedAt%2Cfloors%2CunitTypes%2CnonActivationReason%2CproviderId%2CpropertyType%2CunitSubTypes%2CunitsOnTheFloor%2ClegacyId%2Cid%2Cportal%2CunitFloor%2CparkingSpaces%2CupdatedAt%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2CadvertiserContact%2CwhatsappNumber%2Cbedrooms%2CacceptExchange%2CpricingInfos%2CshowPrice%2Cresale%2Cbuildings%2CcapacityLimit%2Cstatus%2CpriceSuggestion%29%2Caccount%28id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2ClegacyZapId%2CcreatedDate%2Ctier%29%2Cmedias%2CaccountLink%2Clink%29%29%2CtotalCount%29%29%2Cschema%2CtopoFixo%28search%28result%28listings%28listing%28listingsCount%2CsourceId%2CdisplayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2Cstamps%2CcreatedAt%2Cfloors%2CunitTypes%2CnonActivationReason%2CproviderId%2CpropertyType%2CunitSubTypes%2CunitsOnTheFloor%2ClegacyId%2Cid%2Cportal%2CunitFloor%2CparkingSpaces%2CupdatedAt%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2CadvertiserContact%2CwhatsappNumber%2Cbedrooms%2CacceptExchange%2CpricingInfos%2CshowPrice%2Cresale%2Cbuildings%2CcapacityLimit%2Cstatus%2CpriceSuggestion%2CadvertiserUrl%29%2Caccount%28id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2ClegacyZapId%2CcreatedDate%2Ctier%2Crating%29%2Cmedias%2CaccountLink%2Clink%29%29%2CtotalCount%29%29&categoryPage=RESULT&developmentsSize=3&superPremiumSize=3&topoFixoSize=0&business=SALE&parentId=null&listingType=USED&addressCity=Foz+do+Igua%C3%A7u&addressLocationId=BR%3EParana%3ENULL%3EFoz+do+Iguacu&addressState=Paran%C3%A1&addressPointLat=-25.516336&addressPointLon=-54.585376&addressType=city&page=1&size=${size}&from=${from}&levels=CITY&ref=&__zt=mtc%3Adeduplication2023&images=webp&viewport=`
};

export const fetchFromZap = async (from: number, size: number) => {
  const response = await fetch(getZapUrl(from, size), {agent: ProxyAgent, headers: ZapHeaders});
  const json = await response.json() as ZapJSON
  return parseZapJson(json.search.result.listings)
}
