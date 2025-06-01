import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-gray-700">
          Copyright © {new Date().getFullYear()} Accenture. Juragan Labs AI Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;