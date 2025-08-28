
import { ReactNode } from 'react';

export interface KeyMetric {
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description?: string;
  details?: string;
  position: string; // e.g. "5%"
  alignTop?: boolean;
}

export interface Milestone {
  title: string;
  description: string;
  category: 'tech' | 'market' | 'regulation' | 'adoption';
}

export interface ChartDataPoint {
  name: string;
  [key: string]: number | string;
}

export interface PriceData {
  year: string;
  price: number;
}

export interface AdoptionData {
  status: string;
  countries: number;
  color: string;
}

export interface HoldingsData {
  name: string;
  value: number;
  color: string;
}

export interface RegulatoryComplianceData {
  year: string;
  compliance: number;
  color: string;
  bgColor: string;
}

export interface MarketCycleData {
  period: string;
  gain: string;
  correction: string;
}

export interface NetworkGrowthDataPoint {
  year: string;
  transactions: number;
  wallets: number; // in millions
}

export interface MiningDistributionData {
  name: string;
  value: number; // percentage
  color: string;
}

export interface AssetCorrelationData {
  asset: string;
  correlation: number; // -1 to 1
  color?: string;
}

export interface PriceProjectionData {
  model: string;
  range: string;
}

// Corporate Color Palette
export const BITCOIN_ORANGE = '#F7931A'; // Primary Accent

export const CORPORATE_BLUE = '#005A9C';    // Professional Blue
export const CORPORATE_TEAL = '#008080';    // Muted Teal/Green
export const CORPORATE_PURPLE = '#5A4F7A';  // Muted Purple
export const CORPORATE_RED = '#D83C3C';     // Clear Red for negative/alert
export const CORPORATE_YELLOW = '#FFB81C';  // Clear Yellow for warning/restricted
export const CORPORATE_LIGHT_GREY = '#D1D5DB'; // For less important elements / pie slices
export const CORPORATE_MEDIUM_GREY = '#9CA3AF';// For other neutral elements
export const CORPORATE_DARK_GREY = '#4B5563';  // For text or important neutral elements

// Retaining original semantic colors for specific uses if needed, but prefer corporate palette for charts
export const BLUE_COLOR = CORPORATE_BLUE; // Standardize to corporate blue
export const PURPLE_COLOR = CORPORATE_PURPLE;
export const GREEN_COLOR = CORPORATE_TEAL; // Standardize to corporate teal/green
export const RED_COLOR = CORPORATE_RED;
export const YELLOW_COLOR = CORPORATE_YELLOW;
export const GREY_COLOR = CORPORATE_MEDIUM_GREY;


export const CATEGORY_COLORS: { [key in Milestone['category']]: string } = {
  tech: BITCOIN_ORANGE,
  market: CORPORATE_BLUE,
  regulation: CORPORATE_PURPLE,
  adoption: CORPORATE_TEAL,
};

// Chart specific colors (can be overridden by data)
export const CHART_TEXT_COLOR = '#374151'; // Tailwind gray-700
export const CHART_AXIS_COLOR = '#6B7280'; // Tailwind gray-500
export const CHART_GRID_COLOR = '#E5E7EB'; // Tailwind gray-200
