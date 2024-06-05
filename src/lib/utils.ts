import { Listing, PricingInfo } from "./json.js";
import { PrismaProperty } from "./interfaces.js";
import { VivaScrape } from "../scraper/viva.js";
import { ZapScrape } from "../scraper/zap.js";

export const getPropertyType = (unitTypes: string): string => {
  if (unitTypes.includes("LAND")) {
    return "terreno";
  }

  if (unitTypes === "OFFICE") {
    return "escritorio";
  }

  if (unitTypes === "HOME") {
    return "casa";
  }

  if (unitTypes === "APARTMENT") {
    return "apartamento";
  }

  if (unitTypes === "FARM") {
    return "chacara";
  }

  if (unitTypes === "COMMERCIAL_PROPERTY" || unitTypes === "BUSINESS") {
    return "propriedade comercial";
  }

  if (unitTypes === "CONDOMINIUM") {
    return "condominio";
  }

  if (unitTypes === "SHED_DEPOSIT_WAREHOUSE") {
    return "deposito";
  }

  if (unitTypes === "BUILDING") {
    return "construcao";
  }

  if (unitTypes === "RESIDENTIAL_BUILDING") {
    return "construcao residencial";
  }

  if (unitTypes === "COMMERCIAL_BUILDING") {
    return "construcao comercial";
  }

  if (unitTypes === "PENTHOUSE") {
    return "apartamento";
  }

  return "";
};

export const getPropertyUsage = (usageType: string): string => {
  if (usageType === "COMMERCIAL") {
    return "comercial";
  }

  if (usageType === "RESIDENTIAL") {
    return "residencial";
  }

  return "";
};

export const getSalePrice = (pricingInfos: PricingInfo[]): number => {
  if (
    pricingInfos.find((pricingInfo) => {
      return pricingInfo.businessType == "SALE";
    }) != undefined
  ) {
    // type guard not working properly :(
    // ↓
    return +pricingInfos.find((pricingInfo) => {
      return pricingInfo.businessType == "SALE";
    })?.price;
  }
  return 0;
};

export const parseJson = (listings: Listing[]): PrismaProperty[] => {
  const parsedProperties: PrismaProperty[] = [];
  listings.forEach((listing) => {
    parsedProperties.push({
      area: listing.listing.usableAreas[0]
        ? +listing.listing.usableAreas[0]
        : 0,
      bairro: listing.listing.address.neighborhood,
      preco: getSalePrice(listing.listing.pricingInfos),
      quartos: listing.listing.bedrooms[0] ?? 0,
      tipo: getPropertyType(listing.listing.unitTypes[0]),
      uso: getPropertyUsage(listing.listing.usageTypes[0]),
    });
  });
  return parsedProperties;
};

export const getVivaUrl = (from: number, size: number): string => {
  return `https://glue-api.vivareal.com/v2/listings?addressCity=Foz%20do%20Igua%C3%A7u&addressLocationId=BR%3EParana%3ENULL%3EFoz%20do%20Iguacu&addressNeighborhood=&addressState=Paran%C3%A1&addressCountry=Brasil&addressStreet=&addressZone=&addressPointLat=-25.516336&addressPointLon=-54.585376&business=SALE&facets=amenities&unitTypes=&unitSubTypes=&unitTypesV3=&usageTypes=&listingType=USED&parentId=null&categoryPage=RESULT&images=webp&includeFields=search(result(listings(listing(displayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2CunitTypes%2CnonActivationReason%2CpropertyType%2CunitSubTypes%2Cid%2Cportal%2CparkingSpaces%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2Cbedrooms%2CpricingInfos%2CshowPrice%2Cstatus%2CadvertiserContact%2CvideoTourLink%2CwhatsappNumber%2Cstamps)%2Caccount(id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2Cphones%2Ctier)%2Cmedias%2CaccountLink%2Clink))%2CtotalCount)%2Cpage%2CseasonalCampaigns%2CfullUriFragments%2Cnearby(search(result(listings(listing(displayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2CunitTypes%2CnonActivationReason%2CpropertyType%2CunitSubTypes%2Cid%2Cportal%2CparkingSpaces%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2Cbedrooms%2CpricingInfos%2CshowPrice%2Cstatus%2CadvertiserContact%2CvideoTourLink%2CwhatsappNumber%2Cstamps)%2Caccount(id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2Cphones%2Ctier)%2Cmedias%2CaccountLink%2Clink))%2CtotalCount))%2Cexpansion(search(result(listings(listing(displayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2CunitTypes%2CnonActivationReason%2CpropertyType%2CunitSubTypes%2Cid%2Cportal%2CparkingSpaces%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2Cbedrooms%2CpricingInfos%2CshowPrice%2Cstatus%2CadvertiserContact%2CvideoTourLink%2CwhatsappNumber%2Cstamps)%2Caccount(id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2Cphones%2Ctier)%2Cmedias%2CaccountLink%2Clink))%2CtotalCount))%2Caccount(id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2Cphones%2Ctier%2Cphones)%2Cdevelopments(search(result(listings(listing(displayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2CunitTypes%2CnonActivationReason%2CpropertyType%2CunitSubTypes%2Cid%2Cportal%2CparkingSpaces%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2Cbedrooms%2CpricingInfos%2CshowPrice%2Cstatus%2CadvertiserContact%2CvideoTourLink%2CwhatsappNumber%2Cstamps)%2Caccount(id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2Cphones%2Ctier)%2Cmedias%2CaccountLink%2Clink))%2CtotalCount))%2Cowners(search(result(listings(listing(displayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2CunitTypes%2CnonActivationReason%2CpropertyType%2CunitSubTypes%2Cid%2Cportal%2CparkingSpaces%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2Cbedrooms%2CpricingInfos%2CshowPrice%2Cstatus%2CadvertiserContact%2CvideoTourLink%2CwhatsappNumber%2Cstamps)%2Caccount(id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2Cphones%2Ctier)%2Cmedias%2CaccountLink%2Clink))%2CtotalCount))&size=${size}&from=${from}&q=&developmentsSize=5&__vt=control%2Creq-ph&levels=CITY&ref=&pointRadius=&isPOIQuery=`;
};

export const getZapUrl = (from: number, size: number): string => {
  return `https://glue-api.zapimoveis.com.br/v2/listings?user=e75cb044-fd8e-41a6-a234-50b267383759&portal=ZAP&includeFields=search%28result%28listings%28listing%28contractType%2ClistingsCount%2CsourceId%2CdisplayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2Cstamps%2CcreatedAt%2Cfloors%2CunitTypes%2CnonActivationReason%2CproviderId%2CpropertyType%2CunitSubTypes%2CunitsOnTheFloor%2ClegacyId%2Cid%2Cportal%2CunitFloor%2CparkingSpaces%2CupdatedAt%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2CadvertiserContact%2CwhatsappNumber%2Cbedrooms%2CacceptExchange%2CpricingInfos%2CshowPrice%2Cresale%2Cbuildings%2CcapacityLimit%2Cstatus%2CpriceSuggestion%29%2Caccount%28id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2ClegacyZapId%2CcreatedDate%2Ctier%29%2Cmedias%2CaccountLink%2Clink%29%29%2CtotalCount%29%2Cpage%2Cfacets%2CfullUriFragments%2Cdevelopments%28search%28result%28listings%28listing%28contractType%2ClistingsCount%2CsourceId%2CdisplayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2Cstamps%2CcreatedAt%2Cfloors%2CunitTypes%2CnonActivationReason%2CproviderId%2CpropertyType%2CunitSubTypes%2CunitsOnTheFloor%2ClegacyId%2Cid%2Cportal%2CunitFloor%2CparkingSpaces%2CupdatedAt%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2CadvertiserContact%2CwhatsappNumber%2Cbedrooms%2CacceptExchange%2CpricingInfos%2CshowPrice%2Cresale%2Cbuildings%2CcapacityLimit%2Cstatus%2CpriceSuggestion%29%2Caccount%28id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2ClegacyZapId%2CcreatedDate%2Ctier%29%2Cmedias%2CaccountLink%2Clink%29%29%2CtotalCount%29%29%2CsuperPremium%28search%28result%28listings%28listing%28contractType%2ClistingsCount%2CsourceId%2CdisplayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2Cstamps%2CcreatedAt%2Cfloors%2CunitTypes%2CnonActivationReason%2CproviderId%2CpropertyType%2CunitSubTypes%2CunitsOnTheFloor%2ClegacyId%2Cid%2Cportal%2CunitFloor%2CparkingSpaces%2CupdatedAt%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2CadvertiserContact%2CwhatsappNumber%2Cbedrooms%2CacceptExchange%2CpricingInfos%2CshowPrice%2Cresale%2Cbuildings%2CcapacityLimit%2Cstatus%2CpriceSuggestion%29%2Caccount%28id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2ClegacyZapId%2CcreatedDate%2Ctier%29%2Cmedias%2CaccountLink%2Clink%29%29%2CtotalCount%29%29%2Cschema%2CtopoFixo%28search%28result%28listings%28listing%28listingsCount%2CsourceId%2CdisplayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2Cstamps%2CcreatedAt%2Cfloors%2CunitTypes%2CnonActivationReason%2CproviderId%2CpropertyType%2CunitSubTypes%2CunitsOnTheFloor%2ClegacyId%2Cid%2Cportal%2CunitFloor%2CparkingSpaces%2CupdatedAt%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2CadvertiserContact%2CwhatsappNumber%2Cbedrooms%2CacceptExchange%2CpricingInfos%2CshowPrice%2Cresale%2Cbuildings%2CcapacityLimit%2Cstatus%2CpriceSuggestion%2CadvertiserUrl%29%2Caccount%28id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2ClegacyZapId%2CcreatedDate%2Ctier%2Crating%29%2Cmedias%2CaccountLink%2Clink%29%29%2CtotalCount%29%29&categoryPage=RESULT&developmentsSize=3&superPremiumSize=3&topoFixoSize=0&business=SALE&parentId=null&listingType=USED&addressCity=Foz+do+Igua%C3%A7u&addressLocationId=BR%3EParana%3ENULL%3EFoz+do+Iguacu&addressState=Paran%C3%A1&addressPointLat=-25.516336&addressPointLon=-54.585376&addressType=city&page=1&size=${size}&from=${from}&levels=CITY&ref=&__zt=mtc%3Adeduplication2023&images=webp&viewport=`;
};

export const populateDb = async () => {
  await ZapScrape();
  await VivaScrape();
  console.log('done!');
};
