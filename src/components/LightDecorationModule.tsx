import React from 'react';
import LightGallerySlider from './LightGallerySlider';
import InquiryForm from './InquiryForm';

interface Category {
  icon: React.ReactNode;
  title: string;
}

interface LightPackage {
  name: string;
  tier: string;
  price?: number;
  features: string[];
}

interface LightDecorationModuleProps {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  categories: Category[];
  packages: LightPackage[];
  galleryItems: { imagePath: string; title?: string }[];
  benefits: string[];
  customSectionTitle: string;
  customSectionDesc: string;
}

export const LightDecorationModule: React.FC<LightDecorationModuleProps> = ({
  heroImage,
  heroTitle,
  heroSubtitle,
  categories,
  packages,
  galleryItems,
  benefits,
  customSectionTitle,
  customSectionDesc,
}) => {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center bg-cover bg-center h-[60vh] md:h-[80vh]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{heroTitle}</h1>
          <p className="text-lg md:text-2xl text-gray-200">{heroSubtitle}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Decoration Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center p-4 bg-white rounded shadow-sm">
              <div className="text-4xl mb-2">{cat.icon}</div>
              <span className="font-medium">{cat.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Decoration Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, idx) => (
            <div key={idx} className="border rounded-lg p-6 bg-white shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-gray-600 mb-2">Tier: {pkg.tier}</p>
              {pkg.price && <p className="text-2xl font-semibold mb-4">${pkg.price.toFixed(2)}</p>}
              <ul className="space-y-1 mb-4">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition-colors">
                Choose
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Slider */}
      <section className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Work Gallery</h2>
        <LightGallerySlider items={galleryItems} />
      </section>

      {/* Benefits */}
      <section className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose Us</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((b, idx) => (
            <li key={idx} className="flex items-start">
              <svg className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Custom Decoration */}
      <section className="bg-primary-50 py-12">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{customSectionTitle}</h2>
          <p className="text-lg mb-8">{customSectionDesc}</p>
          <InquiryForm />
        </div>
      </section>
    </div>
  );
};
