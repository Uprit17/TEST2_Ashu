import { Alert, AlertDescription } from "@/components/ui/alert";
import { financialsSchema } from '@shared/schema';
import { AlertTriangle } from "lucide-react";
import { z } from 'zod';

interface FinancialsProps {
  data: z.infer<typeof financialsSchema>;
}

export default function Financials({ data }: FinancialsProps) {
  const { years, source, reliabilityAlert } = data;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-primary">trending_up</span>
        <h3 className="text-lg font-semibold text-gray-900">Financials</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">Annual revenue for the past three fiscal years</p>
      
      {reliabilityAlert && (
        <Alert className="mb-4 bg-amber-50 border-amber-200 text-amber-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {reliabilityAlert}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">YoY Growth</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {years.map((year, index) => (
              <tr key={index}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{year.year}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{year.revenue}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {year.growth !== "N/A" && year.growth ? (
                    <span className={`${year.isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                      <span className="material-icons text-sm">
                        {year.isPositive ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                      {year.growth}
                    </span>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {source && <p className="text-xs text-gray-500 mt-3">Source: {source}</p>}
    </div>
  );
}
