export default function Footer() {
  const currentYear = new Date().getFullYear(); // Dynamic current year

  return (
    <footer className="w-full bg-gray-100 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center space-y-4 md:space-y-2">

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-800 transition-colors duration-200">
            About Us
          </a>
          <a href="#" className="hover:text-gray-800 transition-colors duration-200">
            Contact
          </a>
          <a href="#" className="hover:text-gray-800 transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-800 transition-colors duration-200">
            Terms of Service
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 text-center">
          © {currentYear} News Today. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
