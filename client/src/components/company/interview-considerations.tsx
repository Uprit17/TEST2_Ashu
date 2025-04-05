import { interviewConsiderationsSchema } from '@shared/schema';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InterviewConsiderationsProps {
  data: z.infer<typeof interviewConsiderationsSchema>;
}

export default function InterviewConsiderations({ data }: InterviewConsiderationsProps) {
  const { considerations, businessRoles = [], technicalRoles = [] } = data;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-primary">tips_and_updates</span>
        <h3 className="text-lg font-semibold text-gray-900">Interview Considerations</h3>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="business">Business Roles</TabsTrigger>
          <TabsTrigger value="technical">Technical Roles</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <h4 className="text-md font-medium text-gray-700 mb-2">General Considerations</h4>
          
          {considerations.map((consideration, index) => (
            <div key={index} className="flex gap-3">
              <span className="material-icons text-amber-500 mt-0.5 shrink-0">campaign</span>
              <div>
                <h4 className="font-medium text-gray-800">{consideration.title}</h4>
                <p className="text-sm text-gray-600">{consideration.description}</p>
              </div>
            </div>
          ))}
          
          {considerations.length === 0 && (
            <p className="text-gray-600 text-sm italic">No general interview considerations found.</p>
          )}
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <h4 className="text-md font-medium text-gray-700 mb-2">Business Role Assessments</h4>
          
          {businessRoles.map((consideration, index) => (
            <div key={index} className="flex gap-3">
              <span className="material-icons text-blue-500 mt-0.5 shrink-0">business</span>
              <div>
                <h4 className="font-medium text-gray-800">{consideration.title}</h4>
                <p className="text-sm text-gray-600">{consideration.description}</p>
              </div>
            </div>
          ))}
          
          {businessRoles.length === 0 && (
            <p className="text-gray-600 text-sm italic">No business role-specific considerations found.</p>
          )}
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <h4 className="text-md font-medium text-gray-700 mb-2">Technical Role Assessments</h4>
          
          {technicalRoles.map((consideration, index) => (
            <div key={index} className="flex gap-3">
              <span className="material-icons text-green-500 mt-0.5 shrink-0">code</span>
              <div>
                <h4 className="font-medium text-gray-800">{consideration.title}</h4>
                <p className="text-sm text-gray-600">{consideration.description}</p>
              </div>
            </div>
          ))}
          
          {technicalRoles.length === 0 && (
            <p className="text-gray-600 text-sm italic">No technical role-specific considerations found.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
