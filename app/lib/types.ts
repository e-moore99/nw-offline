export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Pokemon {
  name: string;
  id: number;
  sprites: { front_default: string };
}

// Don't worry about edge facets
interface EdgeFacet {
  itemCode?: string;
  itemDescription?: string;
}

// This is just for displaying a little marketing badge on the product card / PDP
interface CampaignBadgeContent {
  badgeSmallUrl?: string;
  badgeMediumUrl?: string;
  badgeLargeUrl?: string;
  title?: string;
  subTitle?: string;
  campaignUrl?: string;
}

// Category structure of the product, hierarchy from 0-2 (visible in breadcrumbs on PDP)
interface CategoryTree {
  level0?: string;
  level1?: string;
  level2?: string;
  webContent?: CampaignBadgeContent;
  appContent?: CampaignBadgeContent;
}

// Just "Everyday Low Price" at this stage
interface MarketingInitiative {
  themeCode?: string;
  initiativeCode?: string;
}

// Import and under regulation to inform consumers of best value
interface UnitPrice {
  pricePerUnit?: number;
  unitQuantity?: number;
  unitQuantityUom?: string;
  measureDescription?: string;
}

// The standard non-promotional price
interface SinglePrice {
  price?: number;
  promoId?: string;
  // also known as unit price
  comparativePrice?: UnitPrice;
}

// Promotional values of the product
interface PromotionProduct {
  promoId?: string;
  // promotional price of the product
  rewardValue?: number;
  decal?: string;
  sapType?: string;
  rewardType?: string;
  // if threshold is > 1, it is a 'multibuy' promotion
  threshold?: number;
  // max number of products allowed to purchase
  limit?: number;
  // are there other products within this promotion
  multiProducts?: boolean;
  description?: string;
  terms?: string;
  // is a Clubcard required to purchase the product at the promo price
  cardDependencyFlag?: boolean;
  // is this promotion the best value to customers
  bestPromotion?: boolean;
  // promotional unit price
  comparativePrice?: UnitPrice;
}

export type Product = {
  // FAN ID
  productId: string;
  // Product brand
  brand?: string;
  // Product name
  name: string;
  // subtitle
  subtitle?: string;
  href?: string;
  // Usually a unit of measure (kg/l)
  displayName?: string;
  // Is the product available to purchase in store and/or online
  availability?: string[];
  // Is the product sold in individual units or as a weight
  saleType?: string;
  // img imports
  image_lg?: string;
  image_md?: string;
  image_sm?: string;
  image_xs?: string;
  // pricing
  price_isSaleValueCardDependent?: boolean;
  price_value?: number;
  price_retailValue?: number;
  price_hasLimit?: boolean;
  // Does the product require the customer to be above 18
  restrictedFlag?: boolean;
  // Does the product contain tobacco
  tobaccoFlag?: boolean;
  // Does the product contain alcohol
  liquorFlag?: boolean;
  // is the origin country of the product under regulation
  originRegulated?: boolean;
  // description containing where the product is from
  originStatement?: string;
  // Don't worry about facets, they're for querying in our search index
  facets?: EdgeFacet[];
  // taxonomy of which categories the product belongs to (Level 0 - 2)
  categoryTrees?: CategoryTree[];
  // Does the product come under a marketing initiative (e.g Everyday Low Price)
  // This is technically not a promotion
  marketingInitiatives?: MarketingInitiative[];
  // non promotional price of the product
  singlePrice?: SinglePrice;
  // all promotions the product is a part of
  promotions?: PromotionProduct[];
  // other fields that are present in raw data/ db table
  unitOfMeasure?: string;
  unitPrice_plainText?: string;
  unitPrice_value?: number;
  unitPrice_type?: string;
  unitPrice_amount?: number;
  categories?: string;
};
