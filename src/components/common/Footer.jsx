import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">JobPortal</h2>
            <p className="text-sm text-indigo-200">
              Find your dream job, connect with top companies, and build your future—all in one place.
            </p>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-3">Job Seekers</h3>
            <ul className="space-y-2 text-sm text-indigo-200">
              <li><a href="#search-jobs" className="hover:text-white">Search Jobs</a></li>
              <li><a href="#upload-resume" className="hover:text-white">Upload Resume</a></li>
              <li><a href="#career-tips" className="hover:text-white">Career Tips</a></li>
              <li><a href="#faqs" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-3">Employers</h3>
            <ul className="space-y-2 text-sm text-indigo-200">
              <li><a href="#post-job" className="hover:text-white">Post a Job</a></li>
              <li><a href="#search-resumes" className="hover:text-white">Search Resumes</a></li>
              <li><a href="#plans" className="hover:text-white">Plans & Pricing</a></li>
              <li><a href="#support" className="hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-indigo-200">
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
              <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-sm text-indigo-300">
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
