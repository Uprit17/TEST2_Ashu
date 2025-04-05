import { fundingSchema } from '@shared/schema';
import { z } from 'zod';

interface FundingProps {
  data: z.infer<typeof fundingSchema>;
}

export default function Funding({ data }: FundingProps) {
  const { totalRaised, rounds, latestRound, latestRoundDate, utilization } = data;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-primary">account_balance</span>
        <h3 className="text-lg font-semibold text-gray-900">Funding</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm font-medium">Total Funding Raised</p>
          <p className="text-xl font-bold text-gray-900">{totalRaised}</p>
          {rounds && <p className="text-xs text-gray-500 mt-1">Across {rounds}</p>}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm font-medium">Latest Funding Round</p>
          <p className="text-xl font-bold text-gray-900">{latestRound}</p>
          <p className="text-xs text-gray-500 mt-1">{latestRoundDate}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Latest Fund Utilization</h4>
        <p className="text-sm text-gray-600">
          {utilization}
        </p>
      </div>
    </div>
  );
}
