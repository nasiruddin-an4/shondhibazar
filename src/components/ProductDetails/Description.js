import React from "react";

const Description = ({ product }) => {
  return (
    <div className="prose max-w-none">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">পণ্যের বিবরণ</h3>
          <p className="text-gray-600 whitespace-pre-line mb-6">
            {product.description}
          </p>
        </div>
        <div>
          <h4 className="text-lg font-medium mb-3">বৈশিষ্ট্য:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>১০০% খাঁটি চাল</li>
            <li>প্রাকৃতিক স্বাদ ও গন্ধ</li>
            <li>উচ্চ পুষ্টিমান</li>
            <li>কোন রাসায়নিক প্রক্রিয়াজাত নয়</li>
            <li>সহজে রান্না করা যায়</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-medium mb-3">ব্যবহার বিধি:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>রান্নার আগে ভালোভাবে ধুয়ে নিন</li>
            <li>প্রতি কাপ চালের জন্য দেড় কাপ পানি ব্যবহার করুন</li>
            <li>২০-২৫ মিনিট রান্না করুন</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Description;
