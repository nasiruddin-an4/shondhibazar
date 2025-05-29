import Link from "next/link";

export default function OurArtisanPage() {
  const farmers = [
    {
      name: "মো: আব্দুল হালিম",
      location: "নরসিংদী",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "মোছা: রাবেয়া খাতুন",
      location: "নরসিংদী",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "মো: আব্দুল মান্নান",
      location: "নরসিংদী",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "মো: আব্দুল হালিম",
      location: "নরসিংদী",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "মো: আব্দুল হালিম",
      location: "নরসিংদী",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "মোছা: রাবেয়া খাতুন",
      location: "নরসিংদী",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "মো: আব্দুল মান্নান",
      location: "নরসিংদী",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "মো: আব্দুল হালিম",
      location: "নরসিংদী",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "মো: আব্দুল হালিম",
      location: "নরসিংদী",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "মোছা: রাবেয়া খাতুন",
      location: "নরসিংদী",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "মো: আব্দুল মান্নান",
      location: "নরসিংদী",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "মো: আব্দুল হালিম",
      location: "নরসিংদী",
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-400 text-white relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/placeholder.svg?height=400&width=1200')",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Artisan, our strength</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Meet the dedicated farmers and artisans who make our mission
            possible. Their commitment to quality and sustainable farming
            practices ensures that we can deliver the best products to your
            table.
          </p>
        </div>
      </section>

      {/* Farmers Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {farmers.map((farmer, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={farmer.image || "/placeholder.svg"}
                  alt={farmer.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    {farmer.name}
                  </h3>
                  <p className="text-gray-600">{farmer.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Farmer 1"
                className="rounded-lg shadow-lg"
              />
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Farmer 2"
                className="rounded-lg shadow-lg"
              />
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Farmer 3"
                className="rounded-lg shadow-lg"
              />
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Farmer 4"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                To ensure the quality of the produce Shondhi chooses contract
                farming as the best medium.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                As we have access to information from Safe Bangladesh
                Agriculture Research Institute regarding the source of a
                particular product produced from the best variety of seeds and
                from nutrition, we select our rice farmers - who has experience
                in rice cultivation for generations.
              </p>
              <p className="text-lg text-gray-600">
                During the process we also finance and educate the farmers about
                the use of fertilizers, use of pesticides, use of compound
                fertilizer, etc. and provide them with Bangladesh Agricultural
                Research Institute's standard cultivation method.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl leading-relaxed">
              Women Bangla is one among many like her, who have changed their
              lives and the lives of their families through contract farming. We
              encourage women in contract dairy farming, we provide them with
              cows and support regarding all animal farming. The investment
              gives them a source of income and they get a chance to be
              self-reliant. We have empowered the lives of many such women and
              encouraged by the success of our initiative, we continue to work
              with more and more women.
            </p>
          </div>
        </div>
      </section>

      {/* Poverty Alleviation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Poverty Alleviation and contract Farming
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                As we have access to information from Safe Bangladesh
                Agriculture Research Institute regarding the source of a
                particular product produced from the best variety of seeds and
                from nutrition, we select our rice farmers - who has experience
                in rice cultivation for generations.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We provide support including funds and take price cutting
                farmers at best partners.
              </p>
              <p className="text-lg text-gray-600">
                To ensure the quality of the produce Shondhi chooses contract
                farming as the best medium.
              </p>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Farmers working together"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            We Provide Only Quality Products
          </h2>
          <Link
            href="/about"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
