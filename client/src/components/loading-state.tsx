export default function LoadingState({ companyName }: { companyName?: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div>
          {companyName ? (
            <h2 className="text-2xl font-bold text-gray-900">{companyName}</h2>
          ) : (
            <div className="shimmer h-8 w-48 rounded-md"></div>
          )}
          <div className="shimmer h-4 w-32 rounded-md mt-2"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          {/* Loading Core Business */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="shimmer h-6 w-6 rounded-full"></span>
              <div className="shimmer h-6 w-40 rounded-md"></div>
            </div>
            <div className="space-y-3">
              <div className="shimmer h-4 w-full rounded-md"></div>
              <div className="shimmer h-4 w-full rounded-md"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="shimmer h-4 w-20 rounded-md mb-2"></div>
                  <div className="shimmer h-5 w-32 rounded-md"></div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="shimmer h-4 w-20 rounded-md mb-2"></div>
                  <div className="shimmer h-5 w-32 rounded-md"></div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="shimmer h-4 w-20 rounded-md mb-2"></div>
                  <div className="shimmer h-5 w-32 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading Additional Sections */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="shimmer h-6 w-6 rounded-full"></span>
              <div className="shimmer h-6 w-40 rounded-md"></div>
            </div>
            <div className="shimmer h-4 w-full rounded-md"></div>
            <div className="shimmer h-4 w-full rounded-md mt-3"></div>
            <div className="shimmer h-4 w-3/4 rounded-md mt-3"></div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="shimmer h-6 w-6 rounded-full"></span>
              <div className="shimmer h-6 w-40 rounded-md"></div>
            </div>
            <div className="shimmer h-4 w-full rounded-md"></div>
            <div className="shimmer h-4 w-full rounded-md mt-3"></div>
            <div className="shimmer h-4 w-3/4 rounded-md mt-3"></div>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="shimmer h-6 w-6 rounded-full"></span>
              <div className="shimmer h-6 w-40 rounded-md"></div>
            </div>
            
            <div className="space-y-4">
              <div className="shimmer h-20 w-full rounded-lg"></div>
              <div className="shimmer h-20 w-full rounded-lg"></div>
              <div className="shimmer h-20 w-full rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        `
      }} />
    </div>
  );
}
