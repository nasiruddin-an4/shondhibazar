import {
  FaLeaf,
  FaUsers,
  FaShieldAlt,
  FaArrowRight,
  FaAward,
} from "react-icons/fa";
import Link from "next/link";
import { MdEco } from "react-icons/md";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}

      <section className="relative py-10 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-teal-200/40 rounded-full blur-lg animate-bounce"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-6 py-3 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                <MdEco className="mr-2" />
                Our Story
              </div>

              <h1 className="text-6xl lg:text-7xl font-black text-slate-900 leading-tight">
                Everything you{" "}
                <span className="text-emerald-600">eat and drink</span> matters.
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed">
                Shondhi is a cooperative organization. With an aim to ‘Go green
                grow organic’ we focus on from the foods we eat to the air we
                breathe, going green can help keep us healthy and improve our
                quality of life. We work to thrive for organic, pure and harmful
                chemical free world for our children. If not fully but at least
                we can try to leave the world better than we got.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/our-artisan"
                  className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Meet Our Farmers
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link
                  href="/safe-food"
                  className="inline-flex items-center border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 hover:text-white transition-all duration-300"
                >
                  Our Safety Standards
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="Our Story"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>

              {/* Floating Achievement Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100">
                <div className="flex items-center space-x-3">
                  <FaAward className="text-2xl text-emerald-600" />
                  <div>
                    <div className="font-bold text-slate-900">Award Winner</div>
                    <div className="text-sm text-slate-500">
                      Most Impactful Business 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                SHONDHI, a Bengali word means evening. SHONDHI is a cooperative
                Organization, where people from different parts of the country
                come together.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                A conglomerate of professionals coming together from a variety
                of industries with decades of experience. Shondhi is a platform
                of agricultural cooperative where our Digital Logistic
                Technology connects Farmers to Consumers directly.
              </p>
              <p className="text-lg text-gray-600">
                We take pride in business and in our ability to offer a
                state-of-the-art online platforms to sell quality food with fair
                share direct support.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-green-500 text-white p-8 rounded-lg">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-lg">Years Experience</div>
            </div>
            <div className="text-center bg-green-500 text-white p-8 rounded-lg">
              <div className="text-4xl font-bold mb-2">30</div>
              <div className="text-lg">Team Members</div>
            </div>
            <div className="text-center bg-green-500 text-white p-8 rounded-lg">
              <div className="text-4xl font-bold mb-2">134,554</div>
              <div className="text-lg">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Food Safety Model"
                className="mx-auto"
              />
              <h3 className="text-xl font-bold text-center mt-4">
                Food Safety Model
              </h3>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-400 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="leading-relaxed">
                  Food Safety is our first priority. We believe food is a gift
                  from the Almighty. We are committed to ensuring and refining
                  food safety at the grassroots level. We work to ensure
                  sourcing, processing, packaging and selling the food to the
                  customers that are safe and of good quality.
                </p>
              </div>
              <div className="bg-orange-400 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="leading-relaxed">
                  To create a climate-resilient, transparent food ecosystem
                  through direct sourcing, cooperative farming, and consumer
                  trust—connecting farm to table with dignity and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Food Endeavor */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              A Safe Food Endeavor
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Shondhi works with a direct network to sell safe farming, food
              processing and packaging and selling the food to the customers
              that are safe and of good quality. We work to ensure sourcing,
              processing, packaging and selling the food to the customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center bg-gray-100 p-6 rounded-lg">
              <FaShieldAlt className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Safe Food</h3>
              <p className="text-gray-600">
                Ensuring quality and safety in every product we deliver
              </p>
            </div>
            <div className="text-center bg-gray-100 p-6 rounded-lg">
              <FaLeaf className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Natural Preservation</h3>
              <p className="text-gray-600">
                Using traditional methods to preserve food naturally
              </p>
            </div>
            <div className="text-center bg-gray-100 p-6 rounded-lg">
              <FaUsers className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">
                Biodegradable Packaging
              </h3>
              <p className="text-gray-600">
                Eco-friendly packaging for a sustainable future
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">99</div>
              <div className="text-lg text-gray-600">Registered Collectors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">2</div>
              <div className="text-lg text-gray-600">
                Successful Community Centers
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">7</div>
              <div className="text-lg text-gray-600">Years Food Collecting</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Farmers */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Shondhi Community Farmers
              </h2>
              <h3 className="text-2xl font-semibold text-green-600 mb-4">
                We work with farmers we know and trust.
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                We work with small-scale farmers to build quality control and
                fair agricultural practices. SHONDHI develops a link that
                connects farmers to SHONDHI, we are a team working on providing
                the best quality products to the market.
              </p>
              <Link
                href="/our-artisan"
                className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Meet Our Farmers
              </Link>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Farmer in rice field"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Novelty */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-green-400 text-white p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-8">Our Novelty</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <span>Safe Food</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <span>Natural Preservation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <span>Single platform that has more variety of cereals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <span>
                    Collective farming offering direct agricultural products at
                    your doorstep
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <span>
                    Collective security from integrated farmers at fair price
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <span>
                    Collective security from integrated farmers at fair price
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <span>
                    Collective security from integrated farmers at fair price
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <span>
                    Our farmers packaging meets of organic glass and jute
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">•</span>
                  <span>Natural packaging with natural products</span>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Our products"
                className="rounded-lg shadow-lg w-full"
              />
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Packaging"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
