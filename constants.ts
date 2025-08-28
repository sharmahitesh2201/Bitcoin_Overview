
import {
  KeyMetric,
  TimelineEvent,
  Milestone,
  PriceData,
  AdoptionData,
  HoldingsData,
  RegulatoryComplianceData,
  MarketCycleData,
  NetworkGrowthDataPoint,
  MiningDistributionData,
  AssetCorrelationData,
  PriceProjectionData,
  BITCOIN_ORANGE,
  CORPORATE_BLUE,
  CORPORATE_PURPLE,
  CORPORATE_TEAL,
  CORPORATE_RED,
  CORPORATE_YELLOW,
  CORPORATE_LIGHT_GREY,
  CORPORATE_MEDIUM_GREY,
  CORPORATE_DARK_GREY
} from './types';

export const CURRENT_PRICE = "$125,678";
export const HASH_RATE_GROWTH_YOY = "+115%";

export const KEY_METRICS: KeyMetric[] = [
  { label: "Market Cap", value: "$2.5 Trillion" },
  { label: "Daily Transactions", value: "~350,000" },
  { label: "Network Hashrate", value: "~1200 EH/s" },
  { label: "BTC in Circulation", value: "19.95M / 21M" },
  { label: "Countries Recognizing", value: "150+" },
];

export const PRICE_EVOLUTION_DATA: PriceData[] = [
  { year: '2010', price: 0.1 }, { year: '2011', price: 1 }, { year: '2012', price: 13 },
  { year: '2013', price: 850 }, { year: '2014', price: 320 }, { year: '2015', price: 430 },
  { year: '2016', price: 960 }, { year: '2017', price: 19000 }, { year: '2018', price: 3800 },
  { year: '2019', price: 7200 }, { year: '2020', price: 29000 }, { year: '2021', price: 69000 },
  { year: '2022', price: 16500 }, { year: '2023', price: 42000 }, { year: '2024', price: 103000 }, { year: '2025', price: 125000}
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { year: "Oct 2008", title: "Satoshi's Whitepaper", position: "10%", alignTop: true },
  { year: "May 2010", title: "Bitcoin Pizza Day", details: "10,000 BTC for 2 Pizzas", position: "20%", alignTop: false },
  { year: "2013", title: "First Major Rally", details: "$1,242 Peak", position: "30%", alignTop: true },
  { year: "Feb 2014", title: "Mt. Gox Collapse", details: "744,000 BTC Lost", position: "45%", alignTop: false },
  { year: "Dec 2017", title: "Bull Market Peak", details: "$19,783", position: "60%", alignTop: true },
  { year: "Apr 2021", title: "New ATH", details: "$64,800", position: "75%", alignTop: false },
  { year: "Jan 2024", title: "US Spot ETFs Approve", position: "85%", alignTop: true },
  { year: "Dec 2024", title: "$100K Speculation", details:"Major Price Target", position: "90%", alignTop: false },
];

export const TECHNICAL_MILESTONES: Milestone[] = [
  { title: "2009: Genesis Block", description: "First block mined with message: \"Chancellor on brink of second bailout for banks\"", category: "tech" },
  { title: "2016: Segregated Witness", description: "Protocol upgrade improving transaction capacity and enabling Lightning Network", category: "tech" },
  { title: "2017: Bitcoin Cash Fork", description: "Network split into BTC (1MB blocks) and BCH (8MB blocks)", category: "tech" },
  { title: "2023: Ordinals Protocol", description: "NFT-like functionality introduced to Bitcoin blockchain", category: "tech" },
];

export const INSTITUTIONAL_REGULATORY_MILESTONES: Milestone[] = [
  { title: "2013: FinCEN Guidelines", description: "First major US regulatory framework for Bitcoin businesses", category: "regulation" },
  { title: "2014: Microsoft Adoption", description: "Microsoft begins accepting Bitcoin for Xbox and Windows products", category: "adoption" },
  { title: "2021: El Salvador Legal Tender", description: "First nation to adopt Bitcoin as official legal tender", category: "regulation" },
  { title: "2024: US Spot ETF Impact", description: "US SEC approved Bitcoin spot ETFs, significantly impacting mainstream investment", category: "market" },
];

export const ADOPTION_STATUS_DATA: AdoptionData[] = [
  { status: 'Legal Tender', countries: 2, color: BITCOIN_ORANGE }, // Bitcoin Orange for strong positive
  { status: 'Permissive/Legal', countries: 105, color: CORPORATE_TEAL }, // Professional Green/Teal
  { status: 'Restricted', countries: 55, color: CORPORATE_YELLOW }, // Clear Yellow
  { status: 'Hostile/Implicit Ban', countries: 20, color: CORPORATE_PURPLE }, // Muted Purple
  { status: 'Banned (Explicit)', countries: 12, color: CORPORATE_RED }, // Clear Red
];

export const HOLDINGS_DATA: HoldingsData[] = [
  { name: 'BlackRock (IBIT)', value: 350000, color: CORPORATE_DARK_GREY }, // Key player, dark grey
  { name: 'MicroStrategy', value: 220000, color: CORPORATE_BLUE }, // Another major player
  { name: 'Fidelity (FBTC)', value: 200000, color: CORPORATE_MEDIUM_GREY },
  { name: 'Grayscale (GBTC)', value: 280000, color: CORPORATE_LIGHT_GREY },
  { name: 'Other Gov/Public/ETFs', value: 500000, color: BITCOIN_ORANGE }, // Bitcoin Orange for diverse "others"
];

// Helper to convert hex to rgba
const hexToRgba = (hex: string, alpha: number = 1) => {
  const [r, g, b] = (hex.match(/\w\w/g) || []).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const REGULATORY_COMPLIANCE_DATA: RegulatoryComplianceData[] = [
  { year: "2013", compliance: 15, color: CORPORATE_RED, bgColor: hexToRgba(CORPORATE_RED, 0.2)},
  { year: "2017", compliance: 40, color: CORPORATE_YELLOW, bgColor: hexToRgba(CORPORATE_YELLOW, 0.2)},
  { year: "2021", compliance: 65, color: CORPORATE_BLUE, bgColor: hexToRgba(CORPORATE_BLUE, 0.2)},
  { year: "2024", compliance: 82, color: BITCOIN_ORANGE, bgColor: hexToRgba(BITCOIN_ORANGE, 0.2) },
];

export const MARKET_CYCLE_DATA: MarketCycleData[] = [
  { period: "2011-2012", gain: "+9,900%", correction: "-93% Correction" },
  { period: "2013-2015", gain: "+10,000%", correction: "-85% Correction" },
  { period: "2016-2018", gain: "+2,800%", correction: "-84% Correction" },
  { period: "2019-2022", gain: "+1,600%", correction: "-77% Correction" },
];

export const NETWORK_GROWTH_CHART_DATA: NetworkGrowthDataPoint[] = [
  { year: '2010', transactions: 100, wallets: 0.01 },
  { year: '2012', transactions: 10000, wallets: 0.5 },
  { year: '2014', transactions: 80000, wallets: 3 },
  { year: '2016', transactions: 250000, wallets: 8 },
  { year: '2018', transactions: 350000, wallets: 15 },
  { year: '2020', transactions: 400000, wallets: 25 },
  { year: '2022', transactions: 550000, wallets: 40 },
  { year: '2024', transactions: 1000000, wallets: 47 },
  { year: '2025', transactions: 1200000, wallets: 55 },
];

export const NETWORK_GROWTH_SUMMARY = [
    { label: "Daily Transactions", value: "~1.2M+", color: BITCOIN_ORANGE },
    { label: "Wallets", value: "55M+", color: CORPORATE_BLUE }, // Differentiate from transactions
    { label: "Nodes", value: "18,000+", color: CORPORATE_DARK_GREY },
    { label: "Uptime", value: "99.98%", color: CORPORATE_TEAL },
];

export const MINING_DISTRIBUTION_DATA: MiningDistributionData[] = [
  { name: 'USA', value: 40, color: BITCOIN_ORANGE }, // USA prominent with Bitcoin Orange
  { name: 'China (Covert)', value: 15, color: CORPORATE_RED }, // Red for "covert" or problematic
  { name: 'Kazakhstan', value: 10, color: CORPORATE_PURPLE },
  { name: 'Russia', value: 10, color: CORPORATE_BLUE },
  { name: 'Canada', value: 8, color: CORPORATE_TEAL },
  { name: 'Others', value: 17, color: CORPORATE_LIGHT_GREY }, // Light grey for diverse "others"
];

export const ASSET_CORRELATION_DATA: AssetCorrelationData[] = [
  { asset: "S&P 500", correlation: 0.38, color: BITCOIN_ORANGE },
  { asset: "Gold", correlation: 0.25, color: CORPORATE_YELLOW }, // Gold often associated with yellow
  { asset: "US Dollar", correlation: -0.30, color: CORPORATE_RED }, // Negative correlation
  { asset: "NASDAQ", correlation: 0.48, color: BITCOIN_ORANGE },
  { asset: "Real Estate", correlation: 0.18, color: CORPORATE_TEAL },
];

export const PRICE_PROJECTIONS_DATA: PriceProjectionData[] = [
  { model: "Stock-to-Flow (Post-Halving)", range: "$250K - $1M" },
  { model: "Institutional Adoption Wave", range: "$200K - $750K" },
  { model: "Metcalfe's Law (Network Growth)", range: "$150K - $500K" },
  { model: "Diminishing Cycles Theory", range: "$180K - $600K" },
];

export const FOOTER_FACTS = [
    { label: "Supply Cap:", value: "21M BTC" },
    { label: "Current Supply:", value: "19.95M BTC" },
    { label: "Next Halving:", value: "~April 2028" },
];