import { Leaf, PackageCheck, Recycle, CheckCircle2, Quote, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OurPackagingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-900/20 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                  <Leaf className="w-5 h-5 text-emerald-300" />
                  <span className="text-emerald-100 font-medium tracking-wide text-sm uppercase">Eco-Friendly Initiative</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">Saving our world, one jar at a time.</h1>
                <p className="text-xl text-emerald-50 leading-relaxed max-w-xl">
                  Our packaging ensures that food reaches you in peak condition, preserving its integrity while protecting our planet.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <CheckCircle2 className="w-6 h-6 text-emerald-300 flex-shrink-0 mt-1" />
                  <p className="text-emerald-50">Our brown paper spice cans are widely recyclable, unlike plastics that take centuries to decompose.</p>
                </div>
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <CheckCircle2 className="w-6 h-6 text-emerald-300 flex-shrink-0 mt-1" />
                  <p className="text-emerald-50">Our reusable jars and cloth bags are made from 100% natural materials, adding cost-effectiveness to your home.</p>
                </div>
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <CheckCircle2 className="w-6 h-6 text-emerald-300 flex-shrink-0 mt-1" />
                  <p className="text-emerald-50">We proudly use highly regenerative organic glass and jute to promote and support a sustainable ecosystem.</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-emerald-400/30 rounded-[3rem] blur-2xl transform rotate-3"></div>
                <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-[3rem] border border-white/20 shadow-2xl">
                  <img
                    src="https://shondhibazar.com/wp-content/uploads/2022/08/shondhibazar-packages.gif"
                    alt="Eco-friendly packaging"
                    className="w-full rounded-[2rem] shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottled Up Story */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <PackageCheck className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">A Bottled Up Story</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative">
              <p className="text-lg text-gray-600 leading-relaxed relative z-10">
                Shondhibazar is one of the very first enterprises proudly using highly regenerative organic glass and jute for packaging to promote and support sustainability. We believe that every handmade glass jar shares the history of beautiful ancient treasures. Each piece comes with the promise of being eco-friendly and sustainable, preserving what the glass originally was across its appointed age.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-amber-50 rounded-[3rem] transform -rotate-3 transition-transform hover:rotate-0 duration-500"></div>
            <img
              src="https://shondhibazar.com/wp-content/uploads/2022/08/bolltes-opt.png"
              alt="Glass jars collection"
              className="relative rounded-[2.5rem] shadow-xl w-full h-auto object-cover border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* Symbol of Aristocracy */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">A Symbol of Aristocracy</h2>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">Glass containers are the most environment-friendly way to store spices and food items.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex gap-4 items-start hover:bg-emerald-50 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">
                  There are great business reasons and a perfect balance of price, glamour, and eco-friendly importance that make them beneficial.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex gap-4 items-start hover:bg-emerald-50 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">
                  They are hygienic, handmade, and perfect for multipurpose use around your home and kitchen.
                </p>
              </div>
              <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-lg shadow-emerald-600/20">
                <p className="text-lg font-medium">
                  "From Shondhi, this is our passionate approach to a sustainable future."
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="https://shondhibazar.com/wp-content/uploads/2022/08/bottle-pack-opt.jpg"
                  alt="Glass jars collection"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Large Quote */}
          <div className="bg-gray-900 text-white p-12 md:p-16 rounded-[3rem] relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
            <Quote className="absolute top-12 left-12 w-20 h-20 text-white/10" />
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <p className="text-2xl md:text-3xl font-medium leading-relaxed italic text-emerald-50">
                "These healthy options come to the forefront. Truly, each such glass is slightly individual, might be different from all types as they are absolutely handmade masterpieces."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recycling Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
             <div className="absolute -inset-4 bg-emerald-100 rounded-[3rem] transform rotate-3 transition-transform hover:rotate-0 duration-500"></div>
             <img
              src="https://shondhibazar.com/wp-content/uploads/2022/08/recycle-bottle-of-shondhibazar-opt.jpg"
              alt="Recycling"
              className="relative rounded-[2.5rem] shadow-xl w-full h-auto object-cover border-4 border-white"
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Recycle className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Recycling & Exchanging</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Apart from the farmers, retail chains also fall into the category of Shondhibazar beneficiaries as they can reduce wastage. If people use the exchange offer of these jars, they can get a discount on their next purchase.
              </p>
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <p className="text-emerald-800 font-medium">
                  We have refined our processes to ensure quality prices while reducing energy consumption compared to normal glass manufacturing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://shondhibazar.com/wp-content/uploads/2022/08/bolltes-opt.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Experience Premium Quality</h2>
            <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">Shop our eco-friendly, organic products delivered in safe, sustainable packaging.</p>
            <Link href="/product-category">
              <button className="bg-white text-teal-700 hover:bg-emerald-50 px-10 py-5 rounded-full text-lg font-bold transition-all shadow-xl shadow-emerald-900/20 transform hover:-translate-y-1 inline-flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
