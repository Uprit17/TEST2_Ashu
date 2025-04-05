import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <a className="flex items-center">
                <span className="material-icons text-primary">psychology</span>
                <h2 className="text-lg font-bold text-gray-900 ml-2">CompanyPrep AI</h2>
              </a>
            </Link>
            <p className="text-sm text-gray-600 mt-2">Research companies for your interviews in seconds</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Features</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Guides</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">About</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Privacy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-sm text-gray-500">© 2024 CompanyPrep AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-primary">
              <span className="sr-only">LinkedIn</span>
              <span className="material-icons">linkedin</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary">
              <span className="sr-only">Twitter</span>
              <span className="material-icons">twitter</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary">
              <span className="sr-only">GitHub</span>
              <span className="material-icons">code</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
