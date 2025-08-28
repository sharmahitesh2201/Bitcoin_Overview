
import React from 'react';
import {
  KeyMetric,
  TimelineEvent,
  Milestone,
  RegulatoryComplianceData,
  MarketCycleData,
  AssetCorrelationData,
  PriceProjectionData,
  BITCOIN_ORANGE,
  CATEGORY_COLORS,
  AdoptionData,
  HoldingsData,
  MiningDistributionData,
  CORPORATE_TEAL, // Updated to corporate teal
  CORPORATE_RED    // Updated to corporate red
} from '../types';
import { CURRENT_PRICE, HASH_RATE_GROWTH_YOY, FOOTER_FACTS } from '../constants';
import { GlobalAdoptionStatusChart, InstitutionalHoldingsChart, MiningDistributionVisualChart } from './BitcoinCharts';

interface SectionTitleProps {
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className }) => (
  <div className={`mb-4 ${className}`}>
    <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h3>
    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
  </div>
);

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    titleSmall?: boolean;
}

// Updated Card for a slightly more corporate feel
const Card: React.FC<CardProps> = ({ children, className, title, titleSmall = false }) => (
    <div className={`bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}> {/* Changed bg-gray-50/70 to bg-white */}
        {title && <h3 className={`font-semibold mb-2 ${titleSmall ? 'text-sm' : 'text-md'} text-gray-700`}>{title}</h3>}
        {children}
    </div>
);


export const PageHeader: React.FC = () => (
  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-gray-900">
        <span className="text-[#F7931A]">Bitcoin</span> Evolution & Market Overview
      </h1>
      <h2 className="text-lg md:text-xl text-gray-600">From Whitepaper to Global Financial Asset (2008-2025)</h2>
    </div>
    <div className="flex items-center mt-4 md:mt-0 p-3 bg-white rounded-lg shadow-md"> {/* Changed bg-gray-100 to bg-white */}
      <i className="fab fa-bitcoin text-5xl text-[#F7931A] mr-3"></i>
      <div>
        <div className="text-sm font-semibold text-gray-700">Current Price</div>
        <div className="text-2xl font-bold text-[#F7931A]">{CURRENT_PRICE}</div>
      </div>
    </div>
  </div>
);

interface KeyMetricsGridProps {
  metrics: KeyMetric[];
}

export const KeyMetricsGrid: React.FC<KeyMetricsGridProps> = ({ metrics }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
    {metrics.map(metric => (
      <Card key={metric.label} className="text-center p-3"> {/* Ensure consistent padding */}
        <p className="text-xs md:text-sm text-gray-600">{metric.label}</p>
        <p className="text-lg md:text-xl font-bold text-[#F7931A] mt-1">{metric.value}</p>
      </Card>
    ))}
  </div>
);

interface HistoricalTimelineProps {
  events: TimelineEvent[];
}

export const HistoricalTimeline: React.FC<HistoricalTimelineProps> = ({ events }) => (
  <div className="mb-16 mt-8">
    <SectionTitle title="Key Historical Milestones" />
    <div className="relative h-80 w-full px-[5%] md:px-[10%]">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#F7931A] -translate-y-1/2"></div>
      {events.map(event => (
        <div
          key={event.title}
          className="absolute"
          style={{
            left: event.position,
            top: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="w-4 h-4 rounded-full bg-white border-2 border-[#F7931A] shadow-md absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
          <div
            className="text-center w-32 md:w-36 p-2 bg-white/90 backdrop-blur-sm shadow-xl rounded-md border border-gray-200/80"
            style={{
              position: 'absolute',
              left: '50%',
              transform: event.alignTop
                ? 'translate(-50%, -100%) translateY(-1.75rem)'
                : 'translate(-50%, 0%)    translateY(1.75rem)',
            }}
          >
            <div className="font-bold text-xs md:text-sm text-gray-800">{event.year}</div>
            <div className="text-xs text-gray-700 leading-tight">{event.title}</div>
            {event.details && <div className="text-[10px] md:text-xs text-[#F7931A] font-medium mt-0.5">{event.details}</div>}
          </div>
        </div>
      ))}
    </div>
  </div>
);


interface MilestoneDisplayCardProps {
  milestone: Milestone;
}
const MilestoneDisplayCard: React.FC<MilestoneDisplayCardProps> = ({ milestone }) => (
  <div className="p-3 rounded-md shadow-sm border-l-4 bg-white hover:shadow-md transition-shadow" style={{ borderColor: CATEGORY_COLORS[milestone.category] }}>
    <div className="font-bold text-sm text-gray-800">{milestone.title}</div>
    <p className="text-xs text-gray-600 mt-1">{milestone.description}</p>
  </div>
);

interface EvolutionHighlightsProps {
  technical: Milestone[];
  institutional: Milestone[];
}
export const EvolutionHighlights: React.FC<EvolutionHighlightsProps> = ({ technical, institutional }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div>
      <SectionTitle title="Technical Evolution" className="mb-3"/>
      <div className="space-y-3">
        {technical.map(m => <MilestoneDisplayCard key={m.title} milestone={m} />)}
      </div>
    </div>
    <div>
      <SectionTitle title="Institutional & Regulatory Milestones" className="mb-3"/>
      <div className="space-y-3">
        {institutional.map(m => <MilestoneDisplayCard key={m.title} milestone={m} />)}
      </div>
    </div>
  </div>
);


export const MarketAnalysisHeader: React.FC = () => (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 mt-10">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-gray-900"><span className="text-[#F7931A]">Bitcoin</span> Market Analysis & Future Outlook</h1>
            <h2 className="text-md md:text-lg text-gray-600">Global Impact, Adoption Trends & Projections</h2>
        </div>
        <div className="flex items-center bg-white rounded-full px-4 py-2 mt-4 md:mt-0 shadow-md"> {/* bg to white */}
            <span className="text-sm mr-2 text-gray-700">Hash rate growth YoY:</span>
            <span className="text-xl font-bold text-[#F7931A]">{HASH_RATE_GROWTH_YOY}</span>
            <i className="fas fa-arrow-trend-up ml-1 text-[#F7931A]"></i>
        </div>
    </div>
);

interface AdoptionStatusProps { data: AdoptionData[]; }
export const AdoptionStatusSection: React.FC<AdoptionStatusProps> = ({data}) => (
    <Card title="Global Adoption Status" titleSmall>
        <GlobalAdoptionStatusChart data={data} />
        <p className="text-[10px] text-gray-500 mt-2 text-center">
            *Country counts are illustrative estimates.
        </p>
    </Card>
);

interface HoldingsSectionProps { data: HoldingsData[]; }
export const HoldingsSection: React.FC<HoldingsSectionProps> = ({data}) => (
    <Card title="Major Institutional Bitcoin Holdings" titleSmall>
        <InstitutionalHoldingsChart data={data} />
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 text-[10px] mt-2">
            {data.map(item => (
                <div key={item.name} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0" style={{backgroundColor: item.color}}></div>
                    <span className="truncate text-gray-600" title={item.name}>{item.name}: ~{(item.value/1000).toFixed(0)}K BTC</span>
                </div>
            ))}
        </div>
    </Card>
);

interface RegulatoryComplianceVisualProps { data: RegulatoryComplianceData[]; }
export const RegulatoryComplianceVisual: React.FC<RegulatoryComplianceVisualProps> = ({ data }) => (
    <Card title="Regulatory Framework Evolution" titleSmall>
        <div className="space-y-2.5 mt-1"> {/* Increased space slightly */}
            {data.map(item => (
                <div key={item.year} className="flex items-center">
                    <div className="w-1/4 text-xs text-gray-600">{item.year}</div>
                    <div className={`w-3/4 h-5 rounded-sm relative overflow-hidden`} style={{backgroundColor: item.bgColor}}>
                        <div className="absolute inset-y-0 left-0 rounded-sm" style={{ width: `${item.compliance}%`, backgroundColor: item.color }}></div>
                        <span 
                            className="absolute inset-0 text-xs text-center leading-5 font-bold text-white px-1"
                            style={{ textShadow: '0px 0px 3px rgba(0,0,0,0.7)'}} // Added text shadow
                        >
                            {item.compliance}%
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

interface MarketCyclesSummaryProps { data: MarketCycleData[]; }
export const MarketCyclesSummary: React.FC<MarketCyclesSummaryProps> = ({ data }) => (
     <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] md:text-xs mt-3 text-center">
        {data.map(cycle => (
            <div key={cycle.period} className="p-2 bg-gray-100 rounded shadow-sm"> {/* Slightly more padding */}
                <div className="font-semibold text-gray-700">{cycle.period}</div>
                <div style={{color: CORPORATE_TEAL}} className="font-medium">{cycle.gain}</div>
                <div style={{color: CORPORATE_RED}} className="font-medium">{cycle.correction}</div>
            </div>
        ))}
    </div>
);

interface MiningDistributionSectionProps { data: MiningDistributionData[]; }
export const MiningDistributionSection: React.FC<MiningDistributionSectionProps> = ({data}) => (
    <Card title="Mining Distribution" titleSmall>
        <span className="text-xs text-gray-500 block -mt-1 mb-1">(Hashrate %)</span> {/* Adjusted spacing */}
        <MiningDistributionVisualChart data={data} />
        <div className="text-xs mt-2 border-t border-gray-200 pt-2">
            <div className="flex justify-between text-gray-600">
                <span>Global Mining Decentralization Index:</span>
                <span className="font-semibold text-[#F7931A]">0.68 (Medium-High)</span>
            </div>
        </div>
    </Card>
);

interface AssetCorrelationVisualProps { data: AssetCorrelationData[]; }
export const AssetCorrelationVisual: React.FC<AssetCorrelationVisualProps> = ({ data }) => (
    <Card title="Correlation with Traditional Assets" titleSmall>
        <div className="space-y-3 mt-1"> {/* Increased space slightly */}
            {data.map(item => (
                <div key={item.asset} className="flex items-center">
                    <div className="w-1/3 text-xs text-gray-600 truncate" title={item.asset}>{item.asset}</div>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2.5 relative">
                        <div className="h-2.5 rounded-full" style={{ width: `${Math.abs(item.correlation) * 100}%`, backgroundColor: item.color || (item.correlation > 0 ? BITCOIN_ORANGE : CORPORATE_RED) }}></div>
                    </div>
                    <span className="ml-2 text-xs font-medium w-8 text-right" style={{color: item.color || (item.correlation > 0 ? BITCOIN_ORANGE : CORPORATE_RED)}}>
                        {item.correlation.toFixed(2)}
                    </span>
                </div>
            ))}
        </div>
    </Card>
);

interface PriceProjectionsDisplayProps { data: PriceProjectionData[]; }
export const PriceProjectionsDisplay: React.FC<PriceProjectionsDisplayProps> = ({ data }) => (
    <Card title="Price Projections" titleSmall className="relative">
         <span className="text-xs text-gray-500 block -mt-1 mb-2">(by 2030)</span> {/* Adjusted spacing */}
        <div className="space-y-1.5 relative z-10">
            <div className="flex justify-between items-center border-b border-gray-300 pb-1.5"> {/* Increased pb */}
                <div className="text-xs font-semibold text-gray-700">Model</div>
                <div className="text-xs font-semibold text-gray-700">Range (USD)</div>
            </div>
            {data.map(item => (
                <div key={item.model} className="flex justify-between py-0.5"> {/* Added py */}
                    <div className="text-xs text-gray-600">{item.model}</div>
                    <div className="text-xs font-semibold text-[#F7931A]">{item.range}</div>
                </div>
            ))}
        </div>
        <div className="absolute bottom-3 right-3 bg-[#F7931A] rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
            <i className="fab fa-bitcoin text-white text-xl"></i>
        </div>
    </Card>
);

export const PageFooter: React.FC = () => (
    <div className="mt-8 bg-white rounded-lg p-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left shadow-md"> {/* bg to white, more padding */}
        <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-6 mb-2 md:mb-0 text-gray-700">
            {FOOTER_FACTS.map(fact => (
                 <div key={fact.label} className="text-xs">
                    <span className="font-semibold">{fact.label}</span> {fact.value}
                </div>
            ))}
        </div>
        <div className="text-xs italic text-gray-600">
            Source: Blockchain data, market analysis & financial projections as of June 2025
        </div>
    </div>
);