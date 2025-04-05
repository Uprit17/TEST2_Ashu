export default function EmptyState() {
  return (
    <section id="empty-state" className="mt-16 text-center max-w-3xl mx-auto">
      <div className="flex justify-center mb-6">
        <div className="bg-primary/10 p-4 rounded-full">
          <span className="material-icons text-4xl text-primary">search</span>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to research a company</h2>
      <p className="text-gray-600 mb-8">
        Enter a company name above to get comprehensive insights including business model, financials, funding, job stability and more.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <span className="material-icons text-primary text-xl mb-3">schedule</span>
          <h3 className="font-medium text-gray-900 mb-1">Save Interview Time</h3>
          <p className="text-sm text-gray-600">Get complete company research in seconds, not hours</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <span className="material-icons text-primary text-xl mb-3">insights</span>
          <h3 className="font-medium text-gray-900 mb-1">Make Better Decisions</h3>
          <p className="text-sm text-gray-600">Evaluate stability and culture before accepting offers</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <span className="material-icons text-primary text-xl mb-3">psychology</span>
          <h3 className="font-medium text-gray-900 mb-1">Impress Interviewers</h3>
          <p className="text-sm text-gray-600">Ask insightful questions that showcase your research</p>
        </div>
      </div>
    </section>
  );
}
