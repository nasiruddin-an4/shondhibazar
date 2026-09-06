import { Quote } from "lucide-react";

export default function SafeFoodPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1595841696677-6479bc37240d?w=800&q=80"
                  alt="Farmers in field"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.2] tracking-tight">
                Food safety is an increasingly important <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">public health issue</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                "Food safety" is not just an initiative to us – it is rather a
                way of life. Food Safety being the fundamental of our philosophy
                we work to ensure sourcing, processing, packaging and selling
                the food to the customers that are safe and of good quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="containermx-auto text-center">
            <p className="text-xl text-gray-600 leading-relaxed">
              Governments, consumers, and industry can cause health and economic
              losses. The causes are unhygienic practices in food production,
              harvesting, preparation, and sale but not least unhygienic food
              habit. It is very important to be aware of this. Consumers today
              are increasingly requiring authentic food products, we believe it
              is not sufficient just to tell consumers to be careful rather we
              recognize the problem and address it in multiple dimensions such
              as: finding trusted supply chain partners, investing using
              environment-friendly biodegradable packaging and so on.
            </p>
          </div>
        </div>
      </section>

      {/* Farm to Table Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            We ensure food safety from farms to table
          </h2>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1574316071802-0d684efa7ea5?w=600&q=80"
                  alt="Full fiber wheat flour"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="bg-emerald-50 p-10 rounded-3xl shadow-sm border border-emerald-100">
              <Quote className="text-emerald-400 w-12 h-12 mb-6" />
              <p className="text-2xl font-medium text-gray-800 leading-relaxed italic">
                We at Shondhi use conventional and natural methods to process
                and preserve our products. Our products are absolutely harmful
                chemical-free and no preservatives are used.
              </p>
            </div>
          </div>

          {/* Always Fresh */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1 space-y-6">
              <h3 className="text-4xl font-bold text-gray-900 tracking-tight">
                Always Fresh
              </h3>
              <div className="w-16 h-1.5 bg-emerald-500 rounded-full"></div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Shondhi works with a direct network to sell safe farming, food
                processing and packaging and selling the food to the customers
                that are safe and of good quality.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://shondhibazar.com/wp-content/uploads/2022/08/preservation.jpg"
                  alt="Fresh spices in jars"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* 100% Safe Food */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://shondhibazar.com/wp-content/uploads/2022/08/preservation1-570x380.jpg"
                  alt="Safe food every day"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-4xl font-bold text-gray-900 tracking-tight">
                100% Safe Food
              </h3>
              <div className="w-16 h-1.5 bg-emerald-500 rounded-full"></div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Our packaging ensures that food reaches the consumer in peak
                condition, preserving the integrity, safety, and quality of food
                products. It helps maximize the shelf life and the ECO-Friendly
                Packaging is contributing to the environment.
              </p>
            </div>
          </div>

          {/* No Additives */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <h3 className="text-4xl font-bold text-gray-900 tracking-tight">
                No Additives
              </h3>
              <div className="w-16 h-1.5 bg-emerald-500 rounded-full"></div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Tightly sealed meals and all good containers are good measures
                to limit the advance of food physical and biological
                contamination during storing of our products.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://shondhibazar.com/wp-content/uploads/2022/08/rice-opt-.jpg"
                  alt="Natural ingredients"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="text-5xl mb-6">🚚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flat shipping rate</h3>
              <p className="text-base text-gray-600">All over Dhaka BDT 80</p>
            </div>
            <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="text-5xl mb-6">↩️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy 3 days returns</h3>
              <p className="text-base text-gray-600">3 days money back guarantee</p>
            </div>
            <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="text-5xl mb-6">🏪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pickup From Store</h3>
              <p className="text-base text-gray-600">Plot 2/A, Road - 8, Sector - 15, Uttara</p>
            </div>
            <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="text-5xl mb-6">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Checkout</h3>
              <p className="text-base text-gray-600">MasterCard / Visa</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
