import type { Category, Resource } from './types';
import { TrendingUp, Bitcoin, Landmark, Rocket, Factory, Scale, Briefcase, Bot } from 'lucide-react';

export const categories: Category[] = [
  {
    id: 'stocks',
    name: 'Stocks',
    icon: TrendingUp,
    description: 'Resources for stock market analysis, trading, and news.',
    resources: [
      { id: 's1', name: 'Yahoo Finance', url: 'https://finance.yahoo.com', description: 'Comprehensive financial news, data and commentary including stock quotes, press releases, financial reports, and original content.', label: '[Website]', lastVerified: Date.now(), subcategory: 'Data & Analytics' },
      { id: 's2', name: 'Bloomberg', url: 'https://www.bloomberg.com', description: 'Global leader in business and financial information, delivering trusted data, news, and insights.', label: '[Website]', lastVerified: Date.now(), subcategory: 'News & Media' },
      { id: 's3', name: 'Robinhood', url: 'https://robinhood.com', description: 'A pioneer in commission-free stock trading, offering a simple and accessible platform for new investors.', label: '[App]', lastVerified: Date.now(), subcategory: 'Trading Platforms' },
      { id: 's4', name: 'TD Ameritrade', url: 'https://www.tdameritrade.com', description: 'Full-service investing and trading platform offering a wide range of products and powerful research tools.', label: '[Platform]', lastVerified: Date.now(), subcategory: 'Trading Platforms' },
      { id: 's5', name: 'Seeking Alpha', url: 'https://seekingalpha.com', description: 'Crowd-sourced content service for financial markets. Articles and research by independent contributors.', label: '[Community]', lastVerified: Date.now(), subcategory: 'News & Media' },
      { id: 's6', name: 'TradingView', url: 'https://www.tradingview.com', description: 'Advanced financial visualization platform with the best charts and tools to trade and invest.', label: '[Tool]', lastVerified: Date.now(), subcategory: 'Data & Analytics' },
    ],
  },
  {
    id: 'crypto',
    name: 'Crypto',
    icon: Bitcoin,
    description: 'Your guide to the world of cryptocurrencies and blockchain technology.',
    resources: [
      { id: 'c1', name: 'Coinbase', url: 'https://www.coinbase.com', description: 'A secure platform to buy, sell, and store cryptocurrency like Bitcoin, Ethereum, and more.', label: '[Exchange]', lastVerified: Date.now(), subcategory: 'Exchanges' },
      { id: 'c2', name: 'CoinMarketCap', url: 'https://coinmarketcap.com', description: 'The world\'s most-referenced price-tracking website for cryptoassets in the rapidly growing cryptocurrency space.', label: '[Data]', lastVerified: Date.now(), subcategory: 'Data & Analytics' },
      { id: 'c3', name: 'Ledger', url: 'https://www.ledger.com', description: 'The global leader in security and infrastructure solutions for cryptocurrencies and blockchain applications.', label: '[Wallet]', lastVerified: Date.now(), subcategory: 'Wallets' },
      { id: 'c4', name: 'MetaMask', url: 'https://metamask.io', description: 'A crypto wallet & gateway to blockchain apps. Start exploring blockchain applications in seconds.', label: '[Wallet]', lastVerified: Date.now(), subcategory: 'Wallets' },
      { id: 'c5', name: 'Binance', url: 'https://www.binance.com', description: 'The world\'s largest cryptocurrency exchange by trading volume, with a focus on altcoins.', label: '[Exchange]', lastVerified: Date.now(), subcategory: 'Exchanges' },
      { id: 'c6', name: 'CoinDesk', url: 'https://www.coindesk.com', description: 'An integrated platform for crypto news, events, data & research for the next generation of investing.', label: '[News]', lastVerified: Date.now(), subcategory: 'News & Media' },
    ],
  },
  {
    id: 'investing',
    name: 'Investing',
    icon: Landmark,
    description: 'General investing principles, strategies, and resources for wealth building.',
    resources: [
      { id: 'i1', name: 'Investopedia', url: 'https://www.investopedia.com', description: 'The world\'s leading source of financial content on the web, ranging from market news to retirement strategies.', label: '[Education]', lastVerified: Date.now(), subcategory: 'Education' },
      { id: 'i2', name: 'Vanguard', url: 'https://investor.vanguard.com', description: 'One of the world\'s largest investment companies, offering a large selection of low-cost mutual funds and ETFs.', label: '[Platform]', lastVerified: Date.now(), subcategory: 'Platforms' },
      { id: 'i3', name: 'Morningstar', url: 'https://www.morningstar.com', description: 'Provides independent investment research, ratings, and tools for individual and institutional investors.', label: '[Research]', lastVerified: Date.now(), subcategory: 'Research' },
      { id: 'i4', name: 'Bogleheads', url: 'https://www.bogleheads.org', description: 'A community forum inspired by the investment philosophy of John C. Bogle, focusing on long-term, passive investing.', label: '[Community]', lastVerified: Date.now(), subcategory: 'Communities' },
    ],
  },
  {
    id: 'pe-vc',
    name: 'PE / VC',
    icon: Briefcase,
    description: 'Insights into private equity, venture capital, and startup funding.',
    resources: [
      { id: 'pv1', name: 'PitchBook', url: 'https://pitchbook.com', description: 'A financial data and software company that provides data on the private and public markets.', label: '[Data]', lastVerified: Date.now(), subcategory: 'Data & Platforms' },
      { id: 'pv2', name: 'Crunchbase', url: 'https://www.crunchbase.com', description: 'The leading platform for professionals to discover innovative companies, connect with the people behind them.', label: '[Data]', lastVerified: Date.now(), subcategory: 'Data & Platforms' },
      { id: 'pv3', name: 'Y Combinator', url: 'https://www.ycombinator.com', description: 'A startup accelerator that has been used to launch over 2,000 companies, including Stripe, Airbnb, and Dropbox.', label: '[Accelerator]', lastVerified: Date.now(), subcategory: 'Firms & Accelerators' },
      { id: 'pv4', name: 'Andreessen Horowitz', url: 'https://a16z.com', description: 'A prominent venture capital firm in Silicon Valley, California, that invests in seed to late-stage technology companies.', label: '[VC Firm]', lastVerified: Date.now(), subcategory: 'Firms & Accelerators' },
    ],
  },
  {
    id: 'fintech',
    name: 'Fintech',
    icon: Rocket,
    description: 'Exploring the intersection of finance and technology.',
    resources: [
      { id: 'f1', name: 'Stripe', url: 'https://stripe.com', description: 'A technology company that builds economic infrastructure for the internet. Businesses of every size use the company’s software.', label: '[Payments]', lastVerified: Date.now(), subcategory: 'Payments & Infrastructure' },
      { id: 'f2', name: 'Plaid', url: 'https://plaid.com', description: 'A financial services company that builds a data transfer network that powers fintech and digital finance products.', label: '[API]', lastVerified: Date.now(), subcategory: 'Payments & Infrastructure' },
      { id: 'f3', name: 'Fintech Today', url: 'https://www.fintechtoday.co', description: 'A community and media company covering the world of fintech with newsletters, podcasts, and events.', label: '[Media]', lastVerified: Date.now(), subcategory: 'News & Media' },
      { id: 'f4', name: 'Chime', url: 'https://www.chime.com', description: 'A financial technology company that offers banking services through its mobile app, without physical branches.', label: '[Neobank]', lastVerified: Date.now(), subcategory: 'Digital Banking' },
    ],
  },
];

export const getCategories = (): Omit<Category, 'resources'>[] => {
  return categories.map(({ resources, ...category }) => category);
};

export const getCategoryWithResources = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id);
};
