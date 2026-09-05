import { Phone, Mail, Award, CheckCircle2, Quote, Users, Heart, Utensils, Leaf, Star } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export default function JesminAkhtarNeelaPage() {
  const metrics = [
    { value: "400+", label: "Smallholder Farmers", icon: Users },
    { value: "134+", label: "Women Farmers", icon: Heart },
    { value: "200k+", label: "Safe Meals", icon: Utensils },
    { value: "32k+", label: "Glass Jars Saved", icon: Leaf },
  ];

  const recognitions = [
    "Most Impactful Business Award",
    "LeanIn.Org Earth Accelerator",
    "Orange Climate Bangladesh",
    "IIB Women Banking Initiative",
  ];

  const mediaImages = [
    "https://shondhibazar.com/wp-content/uploads/2025/05/IMG-20250512-WA0033.jpg",
    "https://shondhibazar.com/wp-content/uploads/2025/05/IMG-20250512-WA0035.jpg",
    "https://shondhibazar.com/wp-content/uploads/2025/05/IMG-20250512-WA0030.jpg",
    "https://shondhibazar.com/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-12-at-16.39.50_44621f94.jpg",
    "https://shondhibazar.com/wp-content/uploads/2025/05/IMG-20250512-WA0028.jpg",
    "https://shondhibazar.com/wp-content/uploads/2025/05/IMG-20250512-WA0031.jpg",
    "https://shondhibazar.com/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-12-at-16.36.29_bbbb6765.jpg",
    "https://shondhibazar.com/wp-content/uploads/2025/05/IMG-20250512-WA0024.jpg",
    "https://shondhibazar.com/wp-content/uploads/2025/05/IMG-20250512-WA0025.jpg",
    "https://shondhibazar.com/wp-content/uploads/2025/05/IMG-20250512-WA0021.jpg",
    "https://shondhibazar.com/wp-content/uploads/2025/05/IMG-20250512-WA0022.jpg",
    "https://shondhibazar.com/wp-content/uploads/2025/05/IMG-20250512-WA0023.jpg",
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-900/20 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">Meet Jesmin Akhtar Neela</h1>
          <p className="text-xl text-emerald-50 leading-relaxed max-w-2xl mx-auto">
            Visionary social entrepreneur, mother, and advocate for safe food and women's economic empowerment in Bangladesh.
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="p-8 md:p-12 lg:col-span-2 flex flex-col justify-center bg-white border-b lg:border-b-0 lg:border-r border-gray-100">
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Jesmin is a dreamer, a nature lover, a humanitarian, an empath,
                a mother of a loving son, a wife of a wonderful husband and
                blessed with a beautiful family.
              </p>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl mb-8 relative border border-emerald-100/50">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-emerald-200" />
                <p className="text-lg text-gray-800 italic leading-relaxed relative z-10 pl-6">
                  "Shondhi is a business that truly makes a difference in the
                  world while nourishing one's soul it serves. Here the approach
                  to clients attention is unique and highly engaging and
                  thoughtful. It gives us thorough and empowering roadmap for
                  everyone who wants to create a business and a future that not
                  only profitable but also meaningful and significance."
                </p>
                <div className="mt-6 text-right relative z-10">
                  <p className="font-bold text-gray-900 text-lg">Jesmin Akhtar Neela</p>
                  <p className="text-emerald-600 font-medium">Founder & Entrepreneur</p>
                </div>
              </div>

              <div>
                <button className="bg-[#0077b5] hover:bg-[#006097] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 flex items-center inline-flex">
                  <FaLinkedin className="mr-3 w-5 h-5" />
                  Connect on LinkedIn
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-8 flex items-center justify-center">
              <div className="relative w-full max-w-[320px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-white">
                <img
                  src="https://shondhibazar.com/wp-content/uploads/2025/05/Untitled-design-374x374.webp"
                  alt="Jesmin Akhtar Neela"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-8">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">Key Achievements</h3>
                <p className="text-gray-500 mt-1 font-medium">Metrics and recognitions of impact.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
              {/* Left Column: Metrics */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  {metrics.map((metric, index) => (
                    <div key={index} className="bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100/50 text-center hover:bg-emerald-50 transition-colors">
                      <metric.icon className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                      <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">{metric.value}</div>
                      <div className="text-sm font-medium text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Recognitions */}
              <div className="space-y-4 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-gray-900 mb-2 px-2">Recognitions & Awards</h4>
                {recognitions.map((recognition, index) => (
                  <div key={index} className="flex items-center gap-5 bg-gray-50 p-5 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-200">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 flex-shrink-0 shadow-sm">
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                    <span className="text-lg text-gray-800 font-bold leading-tight">{recognition}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 lg:p-10 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-3xl border border-emerald-100 shadow-sm">
              <p className="text-lg lg:text-xl text-teal-900 font-medium leading-relaxed italic text-center">
                "Honored with the Most Impactful Business Award under the
                Towards Gender Lens Investing (GLI) Programme. Recognizing
                women entrepreneurs who are creating positive social impact
                while building sustainable businesses, promoting food safety,
                and driving sustainable impact from farm to table."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-10 border border-white/20 text-white hover:bg-white/20 transition-colors">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">🎯</span>
                Her Vision
              </h2>
              <p className="text-xl leading-relaxed text-emerald-50">
                To build a future where every Bangladeshi family has access to
                safe, traceable, and nutritious food—while farmers, especially
                women, are respected, fairly paid, and empowered.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-10 border border-white/20 text-white hover:bg-white/20 transition-colors">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">🚀</span>
                Her Mission
              </h2>
              <p className="text-xl leading-relaxed text-emerald-50">
                To create a climate-resilient, transparent food ecosystem
                through direct sourcing, cooperative farming, and consumer
                trust—connecting farm to table with dignity and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Core Beliefs & Values</h2>
          </div>

          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-gray-100 mb-16 relative">
            <Quote className="absolute top-10 left-10 w-16 h-16 text-emerald-50 opacity-50" />
            <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed text-center font-medium relative z-10 max-w-4xl mx-auto">
              "Food should heal, not harm. Mothers should never fear the food on
              their child's plate. Women can lead impactful, community-rooted
              change. Farmers deserve fairness and visibility. Sustainability is
              not a trend, it's a responsibility."
            </p>
            <p className="text-center mt-8 text-xl font-bold text-emerald-600 tracking-wide uppercase">
              - Jesmin Akhtar Neela
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Her Connection to Shondhibazar</h3>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Shondhibazar is not just a business—it is her lived experience
                turned into a platform for change. It is where her personal role
                as a mother meets her public role as an entrepreneur.
              </p>
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <p className="text-lg text-emerald-800 font-medium italic">
                  "Shondhibazar is my answer to the fear I once carried. Today, it
                  is a voice for every woman who wants safety, dignity, and
                  purpose." — Jesmin
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="https://shondhibazar.com/wp-content/uploads/2025/05/talking-to-Deligates-281x374.jpg"
                  alt="Jesmin with community"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-emerald-600/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media & Milestones */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Media & Milestones</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mediaImages.map((image, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-3xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Media coverage ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
