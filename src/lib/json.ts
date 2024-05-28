export interface ZapJSON {
    search: Search
    page: Page
    facets: Facets
    fullUriFragments: FullUriFragments
    developments: Developments
    superPremium: SuperPremium
    schema: Schema
  }
  
  export interface Search {
    result: Result
    totalCount: number
  }
  
  export interface Result {
    listings: Listing[]
  }
  
  export interface Listing {
    listing: ZapProperty
    account: Account
    medias: Media[]
    accountLink: AccountLink
    link: Link
  }
  
  export interface ZapProperty {
    contractType: string
    listingsCount: number
    sourceId: string
    displayAddressType: string
    amenities: string[]
    usableAreas: number[]
    constructionStatus: string
    listingType: string
    description: string
    title: string
    stamps: any[]
    createdAt: string
    floors: number[]
    unitTypes: string[]
    nonActivationReason: string
    providerId: string
    propertyType: string
    unitSubTypes: any[]
    unitsOnTheFloor: number
    legacyId: string
    id: string
    portal: string
    unitFloor: number
    parkingSpaces: number[]
    updatedAt: string
    address: Address
    suites: number[]
    publicationType: string
    externalId: string
    bathrooms: number[]
    usageTypes: string[]
    totalAreas: number[]
    advertiserId: string
    advertiserContact: AdvertiserContact
    whatsappNumber: string
    bedrooms: number[]
    acceptExchange: boolean
    pricingInfos: PricingInfo[]
    showPrice: boolean
    resale: boolean
    buildings: number
    capacityLimit: any[]
    status: string
  }
  
  export interface Address {
    city: string
    neighborhood: string
    street?: string
    streetNumber?: string
    point: Coords
    stateAcronym: string
  }
  
  export interface Coords {
    lat?: number
    lon?: number
    source: string
    approximateLat?: number
    approximateLon?: number
    radius?: number
  }
  
  export interface AdvertiserContact {
    chat: string
    phones: string[]
  }
  
  export interface PricingInfo {
    businessType: string
    yearlyIptu: number
    price: number
    monthlyCondoFee?: number,
    rentalInfo?: unknown
  }

  
  
  export interface Account {
    id: string
    name: string
    logoUrl: string
    licenseNumber: string
    showAddress: boolean
    legacyVivarealId: number
    legacyZapId: number
    createdDate: string
    tier: string
  }
  
  export interface Media {
    id: string
    url: string
    type: string
  }
  
  export interface AccountLink {
    data: AccountData
    name: string
    href: string
    rel: string
  }
  
  export interface AccountData {}
  
  export interface Link {
    data: LinkData
    name: string
    href: string
    rel: string
  }
  
  export interface LinkData {
    streetNumber: string
    state: string
    city: string
    zone: string
    neighborhood: string
    street: string
  }
  
  export interface Page {
    widgets: Widget[]
    metaContent: MetaContent
    uriFragments: UriFragments
    uriCategory: UriCategory
    uriPagination: UriPagination
    link: PageLink
    condominium: any
    redirectRule: any
  }
  
  export interface Widget {
    links: WidgetLink[]
    header?: Header
    footer?: Footer
    category: string
  }
  
  export interface WidgetLink {
    data: WidgetData
    name: string
    href: string
    rel: string
  }
  
  export interface WidgetData {
    ListingCount?: string
  }
  
  export interface Header {
    data: HeaderData
    name: string
    href: string
    rel: string
  }
  
  export interface HeaderData {}
  
  export interface Footer {
    data: FooterData
    name: string
    href: string
    rel: string
  }
  
  export interface FooterData {}
  
  export interface MetaContent {
    robots: string
    title: string
    description: string
    primaryHeading: string
    secondaryHeading: string
    shouldCountAds: boolean
  }
  
  export interface UriFragments {
    unitSubTypes: any[]
    business: string
    address: UriAddress
    unitType: string
    usageType: string
    amenity: string
    propertyType: string
    listingType: string
    constructionStatus: string
    bedrooms: number
    advertiserId: string
    listingId: string
    condominiumUuid: string
    condominiumName: string
    advertiserLegacyId: number
    pricingInfo: any
    condominiumShortUuid: string
    condominium: any
    unitTypeV3: string
    advertiser: Advertiser
    campaign: Campaign
    pointRadius: string
    contentManagementId: string
    area: string
    neighborhoodsGuide: any
    seoKeyword: any
  }
  
  export interface UriAddress {
    pois: any[]
    valuableZones: any[]
    poisList: any[]
    country: string
    state: string
    city: string
    district: string
    zone: string
    neighborhood: string
    street: string
    streetNumber: string
    complement: string
    zipCode: string
    level: string
    point: UriCoords
    geoJson: string
    precision: string
    name: string
    locationId: string
    source: string
    confidence: string
    ibgeCityId: string
    stateAcronym: string
  }
  
  export interface UriCoords {
    lat: number
    lon: number
    source: string
  }
  
  export interface Advertiser {
    id: string
    legacyVivaRealId: number
    legacyZapId: number
    name: string
  }
  
  export interface Campaign {
    name: string
  }
  
  export interface UriCategory {
    levels: string[]
    name: string
    page: string
    portal: string
  }
  
  export interface UriPagination {
    page: number
    from: number
    size: number
    total: number
    totalListingCounter: number
  }
  
  export interface PageLink  {
    data: PageData
    name: string
    href: string
    rel: string
  }
  
  export interface PageData {}
  
  export interface Facets {
    amenities: Amenities
  }
  
  export interface Amenities {
    KITCHEN: number
    SERVICE_AREA: number
    BARBECUE_GRILL: number
    POOL: number
    BALCONY: number
    GATED_COMMUNITY: number
    PARTY_HALL: number
    PETS_ALLOWED: number
    PLAYGROUND: number
    GOURMET_SPACE: number
    BICYCLES_PLACE: number
    CONCIERGE_24H: number
    DISABLED_ACCESS: number
    ELECTRONIC_GATE: number
    ELEVATOR: number
    GARDEN: number
    SPORTS_COURT: number
  }
  
  export interface FullUriFragments {
    addresses: FullUriAddress[]
    business: string
    listingType: string
  }
  
  export interface FullUriAddress {
    state: string
    city: string
    locationId: string
    point: FullUriCoords
  }
  
  export interface FullUriCoords {
    lat: number
    lon: number
  }
  
  export interface Developments {
    search: DevelopmentsSearch
  }
  
  export interface DevelopmentsSearch {
    result: DevelopmentsResult
    totalCount: number
  }
  
  export interface DevelopmentsResult {
    listings: any[]
  }
  
  export interface SuperPremium {
    search: SuperPremiumSearch
  }
  
  export interface SuperPremiumSearch {
    result: SuperPremiumResult
    totalCount: number
  }
  
  export interface SuperPremiumResult {
    listings: any[]
  }
  
  export interface Schema {
    "@context": string
    "@type": string
    url: string
    itemListElement: any[]
  }