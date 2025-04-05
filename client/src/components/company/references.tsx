import { referencesSchema } from '@shared/schema';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ReferencesProps {
  data: z.infer<typeof referencesSchema>;
  onExportPDF: () => void;
}

export default function References({ data, onExportPDF }: ReferencesProps) {
  const { articles } = data;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-primary">article</span>
        <h3 className="text-lg font-semibold text-gray-900">Recent References</h3>
      </div>
      
      <div className="space-y-4">
        {articles.map((article, index) => (
          <a 
            key={index}
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block hover:bg-gray-50 p-3 rounded-lg border border-gray-200 transition-colors"
          >
            <p className="text-sm font-medium text-gray-800">{article.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">{article.source}</span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500">{article.date}</span>
            </div>
          </a>
        ))}
        
        {articles.length === 0 && (
          <p className="text-gray-600 text-sm italic py-3">No references available.</p>
        )}
      </div>
      
      <div className="mt-6">
        <Button 
          variant="outline"
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800"
          onClick={onExportPDF}
        >
          <Download className="mr-2 h-4 w-4" />
          Export as PDF
        </Button>
      </div>
    </div>
  );
}
