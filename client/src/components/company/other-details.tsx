import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { otherDetailsSchema } from "@shared/schema";
import { z } from "zod";

interface OtherDetailsProps {
  data: z.infer<typeof otherDetailsSchema>;
}

export default function OtherDetails({ data }: OtherDetailsProps) {
  // Handle case where data or details array might be undefined
  const details = data?.details || [];
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b">
        <CardTitle className="text-lg font-medium">Other Details</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {details.map((detail, index) => (
            <div key={index} className="p-4">
              <h3 className="font-semibold text-md mb-2">{detail.title}</h3>
              <p className="text-muted-foreground whitespace-pre-line">{detail.description}</p>
            </div>
          ))}
          {details.length === 0 && (
            <div className="p-4 text-muted-foreground italic">
              No additional information available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}