export default function SafeFoodPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Farmers in field"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-6">
                Food safety is an increasingly important public health issue
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                "Food safety" is not just an initiative to us – it is rather a
                way of life. Food Safety being the fundamental of our philosophy
                we work to ensure sourcing, processing, packaging and selling
                the food to the customers that are safe and of good quality. We
                work to ensure sourcing, processing, packaging and selling the
                food to the customers that are safe and of good quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-600 leading-relaxed">
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
      <section className="py-20 bg-green-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            We ensure food safety from farms to table
          </h2>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Full fiber wheat flour"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-xl text-gray-700 leading-relaxed">
                We at Shondhi use conventional and natural methods to process
                and preserve our products. Our products are absolutely harmful
                chemical-free and no preservatives are used.
              </p>
            </div>
          </div>

          {/* Always Fresh */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Always Fresh
              </h3>
              <div className="w-16 h-1 bg-green-500 mb-6"></div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Shondhi works with a direct network to sell safe farming, food
                processing and packaging and selling the food to the customers
                that are safe and of good quality. We work to ensure sourcing,
                processing, packaging and selling the food to the customers that
                are safe and of good quality.
              </p>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="Fresh spices in jars"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* 100% Safe Food */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Safe food every day"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                100% Safe Food
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our packaging ensures that food reaches the consumer in peak
                condition, preserving the integrity, safety, and quality of food
                products. It helps maximize the shelf life and the ECO-Friendly
                Packaging is contributing to the environment. Our packaging do
                not use any packaging containing the toxic and the toxicity of
                manufacture enable processors, transporters, and retailers to
                keep track of products for both inventory control and
                identification of contamination sources.
              </p>
            </div>
          </div>

          {/* No Additives */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                No Additives
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Tightly sealed meals and all good containers are good measures
                to limit the advance of food physical and biological
                contamination during storing of our products.
              </p>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="Natural ingredients"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl text-green-600 mb-4">🚚</div>
              <h3 className="font-bold mb-2">Flat shipping rate</h3>
              <p className="text-gray-600">All over Dhaka BDT 80</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-green-600 mb-4">↩️</div>
              <h3 className="font-bold mb-2">Easy 3 days returns</h3>
              <p className="text-gray-600">3 days money back guarantee</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-green-600 mb-4">🏪</div>
              <h3 className="font-bold mb-2">Pickup From Store</h3>
              <p className="text-gray-600">
                Plot 2/A, Road - 8, Block - C1, Sector - 15, Uttara, Dhaka
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-green-600 mb-4">🔒</div>
              <h3 className="font-bold mb-2">100% Secure Checkout</h3>
              <p className="text-gray-600">MasterCard / Visa</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
