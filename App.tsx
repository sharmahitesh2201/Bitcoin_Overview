
import React from 'react';
import {
  PageHeader,
  KeyMetricsGrid,
  HistoricalTimeline,
  EvolutionHighlights,
  MarketAnalysisHeader,
  AdoptionStatusSection,
  HoldingsSection,
  RegulatoryComplianceVisual,
  MarketCyclesSummary,
  MiningDistributionSection,
  AssetCorrelationVisual,
  PriceProjectionsDisplay,
  PageFooter
} from './components/ContentSections';
import {
  BitcoinPriceEvolutionChart,
  NetworkGrowthVisualChart
} from './components/BitcoinCharts';
import {
  KEY_METRICS,
  PRICE_EVOLUTION_DATA,
  TIMELINE_EVENTS,
  TECHNICAL_MILESTONES,
  INSTITUTIONAL_REGULATORY_MILESTONES,
  ADOPTION_STATUS_DATA,
  HOLDINGS_DATA,
  REGULATORY_COMPLIANCE_DATA,
  MARKET_CYCLE_DATA,
  NETWORK_GROWTH_CHART_DATA,
  MINING_DISTRIBUTION_DATA,
  ASSET_CORRELATION_DATA,
  PRICE_PROJECTIONS_DATA
} from './constants';

// A wrapper Card component for consistency if not already in ContentSections
const ChartCard: React.FC<{title: string; subtitle?: string; children: React.ReactNode; className?: string}> = ({title, subtitle, children, className}) => (
    <div className={`bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col ${className}`}> {/* Added flex flex-col */}
        <h3 className="text-md font-semibold mb-1 text-gray-700">{title}</h3>
        {subtitle && <p className="text-gray-500 text-sm -mt-1 mb-2">{subtitle}</p>}
        <div className="flex-grow"> {/* Added flex-grow to allow chart to take space */}
          {children}
        </div>
    </div>
);


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 text-gray-800">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader />
        <KeyMetricsGrid metrics={KEY_METRICS} />

        {/* Combined Price Evolution & Market Cycles with Network Growth Metrics in a 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ChartCard 
            title="Bitcoin Price Evolution"
            subtitle="(Logarithmic Scale, USD)"
            className="h-full" // Ensure cards in this row can take full height
          >
            <BitcoinPriceEvolutionChart data={PRICE_EVOLUTION_DATA} />
            <h3 className="text-sm font-semibold mt-4 mb-2 text-gray-600">Market Cycle Insights</h3>
            <MarketCyclesSummary data={MARKET_CYCLE_DATA} />
          </ChartCard>
          
          <ChartCard 
            title="Network Growth Metrics"
            className="h-full" // Ensure cards in this row can take full height
          >
            <NetworkGrowthVisualChart data={NETWORK_GROWTH_CHART_DATA} />
          </ChartCard>
        </div>

        <HistoricalTimeline events={TIMELINE_EVENTS} />
        <EvolutionHighlights technical={TECHNICAL_MILESTONES} institutional={INSTITUTIONAL_REGULATORY_MILESTONES} />
        
        <MarketAnalysisHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <AdoptionStatusSection data={ADOPTION_STATUS_DATA} />
          <HoldingsSection data={HOLDINGS_DATA} />
          <RegulatoryComplianceVisual data={REGULATORY_COMPLIANCE_DATA} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <MiningDistributionSection data={MINING_DISTRIBUTION_DATA} />
            <AssetCorrelationVisual data={ASSET_CORRELATION_DATA} />
            <PriceProjectionsDisplay data={PRICE_PROJECTIONS_DATA} />
        </div>
        
        <PageFooter />
      </main>
    </div>
  );
};

export default App;
