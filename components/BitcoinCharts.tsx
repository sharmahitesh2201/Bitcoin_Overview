
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  TooltipProps,
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import {
  PriceData,
  AdoptionData,
  HoldingsData,
  NetworkGrowthDataPoint,
  MiningDistributionData,
  BITCOIN_ORANGE,
  CORPORATE_BLUE, // Using new corporate blue
  CHART_TEXT_COLOR,
  CHART_AXIS_COLOR,
  CHART_GRID_COLOR,
} from '../types';
import { NETWORK_GROWTH_SUMMARY } from '../constants';


const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const dataItem = payload[0].payload;
    const nameDisplay = (payload[0].name || (payload[0].dataKey as string) || '').toString();
    const value = payload[0].value as number;

    let primaryLabel: string = label || dataItem.year || dataItem.status || dataItem.name || '';
    let formattedValue = value.toLocaleString();
    // let valueUnit = ''; // This was not consistently used, simplified logic below

    if (nameDisplay.toLowerCase().includes('price')) {
      formattedValue = `$${value.toLocaleString()}`;
    } else if (nameDisplay.toLowerCase().includes('countries')) {
      formattedValue = `${value.toLocaleString()} countries`;
      primaryLabel = dataItem.status; // Ensure status is primary label for adoption chart
    } else if (nameDisplay.toLowerCase().includes('transactions')) {
      formattedValue = value.toLocaleString();
    } else if (nameDisplay.toLowerCase().includes('wallets')) {
      formattedValue = `${value.toLocaleString()}M`;
    } else if (dataItem.name && typeof value === 'number') { // For Pie charts (Holdings, Mining)
      primaryLabel = dataItem.name;
      const isBTC = dataItem.name.toLowerCase().includes('btc') || dataItem.unit === 'BTC' || (typeof value === 'number' && value > 10000 && !dataItem.name.toLowerCase().includes('%')); // Heuristic for BTC
      const isPercentage = dataItem.unit === '%' || dataItem.name.toLowerCase().includes('%');

      if (isBTC) {
         if (value >= 1000) formattedValue = `${(value/1000).toFixed(1)}K BTC`;
         else formattedValue = `${value.toFixed(0)} BTC`; // Show smaller BTC values without K
      } else if (isPercentage) {
        formattedValue = `${value.toLocaleString()}%`;
      } else {
        formattedValue = value.toLocaleString(); // Default for other numeric pie values
      }
    }
    
    const titleColor = dataItem.color || payload[0].stroke || payload[0].fill || BITCOIN_ORANGE;

    return (
      <div className="bg-white/90 backdrop-blur-md p-3 border border-gray-300 rounded-lg shadow-xl text-[11px] min-w-[150px]">
        <p className="label font-semibold mb-1 text-gray-800 border-b border-gray-200 pb-1" style={{color: CHART_TEXT_COLOR}}>{primaryLabel}</p>
        {payload.map((pItem, index) => {
            let currentVal = pItem.value as number;
            let currentFormattedValue = currentVal.toLocaleString();
            let currentName = (pItem.name || (pItem.dataKey as string) || '').toString();
            let itemColor = pItem.color || pItem.stroke || (pItem.payload && pItem.payload.color) || titleColor;

            if(currentName.toLowerCase().includes('price')) currentFormattedValue = `$${currentVal.toLocaleString()}`;
            else if (currentName.toLowerCase().includes('transactions')) currentFormattedValue = currentVal.toLocaleString();
            else if (currentName.toLowerCase().includes('wallets')) currentFormattedValue = `${currentVal.toLocaleString()}M`;
            else if (dataItem.name && typeof currentVal === 'number' && !primaryLabel.includes(dataItem.name)) { 
                 const isBTC = dataItem.name.toLowerCase().includes('btc') || dataItem.unit === 'BTC' || (currentVal > 10000 && !dataItem.name.toLowerCase().includes('%'));
                 const isPercentage = dataItem.unit === '%' || dataItem.name.toLowerCase().includes('%');
                 if (isBTC) {
                    if (currentVal >= 1000) currentFormattedValue = `${(currentVal/1000).toFixed(1)}K BTC`;
                    else currentFormattedValue = `${currentVal.toFixed(0)} BTC`;
                 } else if (isPercentage) {
                   currentFormattedValue = `${currentVal.toLocaleString()}%`;
                 } else {
                   currentFormattedValue = currentVal.toLocaleString();
                 }
            }

           return (
             <p key={index} style={{ color: itemColor }} className="font-medium my-0.5">
                <span className="capitalize font-normal text-gray-600">{currentName}: </span>{currentFormattedValue}
             </p>
           );
        })}
      </div>
    );
  }
  return null;
};

interface BitcoinPriceChartProps {
  data: PriceData[];
}

export const BitcoinPriceEvolutionChart: React.FC<BitcoinPriceChartProps> = ({ data }) => (
  <div className="h-[250px] md:h-[300px] bg-white rounded-lg shadow-sm p-3">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 25, left: 15, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_COLOR} />
        <XAxis dataKey="year" tick={{ fontSize: 10, fill: CHART_AXIS_COLOR }} stroke={CHART_AXIS_COLOR} />
        <YAxis
          type="number"
          scale="log"
          domain={['auto', 'auto']}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          tick={{ fontSize: 10, fill: CHART_AXIS_COLOR }}
          stroke={CHART_AXIS_COLOR}
          allowDataOverflow={true}
          width={70}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="price" stroke={BITCOIN_ORANGE} strokeWidth={2.5} dot={{ r: 2, fill: BITCOIN_ORANGE, strokeWidth:1, stroke:BITCOIN_ORANGE }} activeDot={{ r: 5, strokeWidth: 2, fill: BITCOIN_ORANGE, stroke: '#fff' }} name="Price" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

interface GlobalAdoptionChartProps {
  data: AdoptionData[];
}

export const GlobalAdoptionStatusChart: React.FC<GlobalAdoptionChartProps> = ({ data }) => (
  <div className="h-[220px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_COLOR} horizontal={true} vertical={false}/>
        <XAxis type="number" tick={{ fontSize: 10, fill: CHART_AXIS_COLOR }} stroke={CHART_AXIS_COLOR} />
        <YAxis dataKey="status" type="category" tick={{ fontSize: 10, fill: CHART_AXIS_COLOR, width:95 }} stroke={CHART_AXIS_COLOR} width={100} interval={0} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="countries" barSize={15} name="Countries">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

interface InstitutionalHoldingsChartProps {
  data: HoldingsData[];
}

export const InstitutionalHoldingsChart: React.FC<InstitutionalHoldingsChartProps> = ({ data }) => (
    <div className="h-[150px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} innerRadius={40} labelLine={false}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={1}/>
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

interface NetworkGrowthVisualChartProps {
  data: NetworkGrowthDataPoint[];
}

export const NetworkGrowthVisualChart: React.FC<NetworkGrowthVisualChartProps> = ({ data }) => (
    <div className="flex flex-col h-full w-full"> {/* Use flex to manage height */}
        <div className="flex-grow relative"> {/* Chart area takes remaining space */}
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_COLOR}/>
                    <XAxis dataKey="year" tick={{ fontSize: 10, fill: CHART_AXIS_COLOR }} stroke={CHART_AXIS_COLOR} />
                    <YAxis yAxisId="left" type="number" scale="log" domain={['auto', 'auto']}
                        tickFormatter={(value) => value >= 1000000 ? `${value/1000000}M` : value >= 1000 ? `${value/1000}K` : value}
                        tick={{ fontSize: 9, fill: BITCOIN_ORANGE }} stroke={BITCOIN_ORANGE} width={45} allowDataOverflow={true}
                    />
                    <YAxis yAxisId="right" type="number" orientation="right" domain={['auto', 'auto']}
                        tickFormatter={(value) => `${value}M`}
                        tick={{ fontSize: 9, fill: CORPORATE_BLUE }} stroke={CORPORATE_BLUE} width={35} allowDataOverflow={true}
                    />
                    <Tooltip content={<CustomTooltip />}/>
                    <Legend wrapperStyle={{fontSize: "11px", paddingTop: "10px", color: CHART_TEXT_COLOR }} iconSize={10} />
                    <Line yAxisId="left" type="monotone" dataKey="transactions" name="Transactions" stroke={BITCOIN_ORANGE} strokeWidth={2.5} dot={false} activeDot={{ r: 4, strokeWidth: 1 }} />
                    <Line yAxisId="right" type="monotone" dataKey="wallets" name="Wallets (M)" stroke={CORPORATE_BLUE} strokeWidth={2.5} dot={false} activeDot={{ r: 4, strokeWidth: 1 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mt-4 text-center h-[60px] flex-shrink-0"> {/* Summary part, fixed height */}
            {NETWORK_GROWTH_SUMMARY.map(item => (
                <div key={item.label}>
                    <div className="font-semibold text-sm" style={{color: item.color || CHART_TEXT_COLOR}}>{item.value}</div>
                    <div className="text-gray-500 text-[10px]">{item.label}</div>
                </div>
            ))}
        </div>
    </div>
);

interface MiningDistributionVisualChartProps {
  data: MiningDistributionData[];
}

export const MiningDistributionVisualChart: React.FC<MiningDistributionVisualChartProps> = ({ data }) => (
  <div className="h-[150px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie data={data} dataKey="value" nameKey="name" cx="30%" cy="50%" outerRadius={55} labelLine={false} >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={1} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{fontSize: "10px", lineHeight: "16px", right: "-15px", color: CHART_TEXT_COLOR }}
            iconSize={8}
            payload={data.map(item => ({ value: `${item.name} (${item.value}%)`, type: 'square', color: item.color}))}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);