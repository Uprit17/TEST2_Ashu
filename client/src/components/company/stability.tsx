import { stabilitySchema } from '@shared/schema';
import { z } from 'zod';

interface StabilityProps {
  data: z.infer<typeof stabilitySchema>;
}

export default function Stability({ data }: StabilityProps) {
  const { lastLayoff, indicators } = data;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-primary">shield</span>
        <h3 className="text-lg font-semibold text-gray-900">Stability</h3>
      </div>
      
      <div className="mb-5">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Last Major Layoff</h4>
        <div className="flex items-center gap-2">
          <span className="material-icons text-amber-500">event</span>
          <p className="text-base font-medium">{lastLayoff.date}</p>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {lastLayoff.details}
        </p>
      </div>
      
      {indicators && indicators.length > 0 && (
        <div className="mt-5">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Company Stability Indicators</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {indicators.map((indicator, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">{indicator.name}</p>
                  <div className={`
                    ${indicator.status === 'Strong' ? 'bg-green-100 text-green-800' : 
                      indicator.status === 'Mixed' ? 'bg-amber-100 text-amber-800' :
                      indicator.status === 'Weak' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    } text-xs font-medium px-2 py-0.5 rounded`}
                  >
                    {indicator.status}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-1">{indicator.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
