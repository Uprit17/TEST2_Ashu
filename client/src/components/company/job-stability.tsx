import { jobStabilitySchema } from '@shared/schema';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';

interface JobStabilityProps {
  data: z.infer<typeof jobStabilitySchema>;
}

export default function JobStability({ data }: JobStabilityProps) {
  const { policies } = data;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-primary">work</span>
        <h3 className="text-lg font-semibold text-gray-900">Job Stability & Employee Policies</h3>
      </div>
      
      <div className="space-y-4">
        {policies.map((policy, index) => (
          <div key={index} className="flex gap-3">
            <span className="material-icons text-green-500 mt-0.5 shrink-0">check_circle</span>
            <div>
              <h4 className="font-medium text-gray-800">{policy.title}</h4>
              <p className="text-sm text-gray-600">{policy.description}</p>
            </div>
          </div>
        ))}
        
        {policies.length === 0 && (
          <p className="text-gray-600 text-sm italic">No notable employee policies found.</p>
        )}
      </div>
    </div>
  );
}
