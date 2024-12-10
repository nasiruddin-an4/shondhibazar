import React from "react";

const Additional = ({ product }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-4">Product Information</h3>
          <table className="w-full">
            <tbody className="divide-y">
              <tr>
                <td className="py-3 text-gray-600">Weight</td>
                <td className="py-3 font-medium">1kg, 5kg, 25kg</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-600">Category</td>
                <td className="py-3 font-medium">{product.category}</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-600">SKU</td>
                <td className="py-3 font-medium">RICE001</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-600">Storage</td>
                <td className="py-3 font-medium">Keep in a cool, dry place</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Nutritional Information
          </h3>
          <table className="w-full">
            <tbody className="divide-y">
              {[
                { label: "জলীয় অংশ", value: "১২.৬০ গ্রাম" },
                { label: "আমিষ", value: "৩৯.৪ গ্রাম" },
                { label: "শ্বাসকৃত", value: "৫৯৬ গ্রাম" },
                { label: "আঁশ", value: "১৮.৫ গ্রাম" },
                { label: "চর্বি", value: "০.৬ গ্রাম" },
                { label: "শর্করা", value: "৭৭.৪ গ্রাম" },
              ].map((item, index) => (
                <tr key={index}>
                  <td className="py-3 text-gray-600">{item.label}</td>
                  <td className="py-3 font-medium">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Additional;
