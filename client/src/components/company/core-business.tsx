import { coreBusinessSchema } from '@shared/schema';
import { z } from 'zod';
import { MapPin } from 'lucide-react';

interface CoreBusinessProps {
  data: z.infer<typeof coreBusinessSchema>;
}

export default function CoreBusiness({ data }: CoreBusinessProps) {
  const { summary, industry, founders, currentCEO, headquarters } = data;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-primary">business</span>
        <h3 className="text-lg font-semibold text-gray-900">Core Business</h3>
      </div>
      <div className="space-y-3 text-gray-700">
        <p className="text-base">{summary}</p>
        
        {headquarters && (
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
            <span>Headquarters: <span className="font-medium">{headquarters}</span></span>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-500 font-medium">Industry</p>
            <p className="font-semibold">{industry}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-500 font-medium">Founders</p>
            <p className="font-semibold">{founders}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-500 font-medium">Current CEO</p>
            <p className="font-semibold">{currentCEO}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
