import { useState } from "react";
import { Link } from "wouter";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="material-icons text-primary">psychology</span>
              <h1 className="text-xl font-bold text-gray-900">CompanyPrep AI</h1>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-4 text-sm">
            <a href="#" className="text-gray-600 hover:text-primary">How It Works</a>
            <a href="#" className="text-gray-600 hover:text-primary">About</a>
            <a href="#" className="text-gray-600 hover:text-primary">FAQ</a>
          </div>
          
          <button 
            className="md:hidden focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-icons text-gray-700">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-gray-600 hover:text-primary">How It Works</a>
              <a href="#" className="text-gray-600 hover:text-primary">About</a>
              <a href="#" className="text-gray-600 hover:text-primary">FAQ</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
