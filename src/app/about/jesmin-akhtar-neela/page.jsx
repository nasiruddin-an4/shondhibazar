import { FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";

export default function JesminAkhtarNeelaPage() {
  const achievements = [
    "400+ smallholder farmers",
    "134+ women farmers",
    "200,000 safe meals",
    "32,000+ glass jars",
    "200,000 plastic units",
    "Most Impactful Business Award",
    "LeanIn.Org Earth Accelerator",
    "Orange Climate Bangladesh",
    "IIB Women Banking Initiative",
  ];

  const mediaImages = [
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold">Meet Jesmin Akhtar Neela</h1>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Jesmin is a dreamer, a nature lover, a humanitarian, an empath,
                a mother of a loving son, a wife of a wonderful husband and
                blessed with a beautiful family.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-lg text-gray-700 italic leading-relaxed">
                  "Shondhi is a business that truly makes a difference in the
                  world while nourishing one's soul it serves. Here the approach
                  to clients attention is unique and highly engaging and
                  thoughtful. It gives us thorough and empowering roadmap for
                  everyone who wants to create a business and a future that not
                  only profitable but also meaningful and significance."
                </p>
                <div className="mt-4 text-right">
                  <p className="font-semibold">Jesmin Akhtar Neela</p>
                  <p className="text-gray-600">Entrepreneur</p>
                </div>
              </div>

              <div className="text-center mb-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center mx-auto">
                  <FaLinkedin className="mr-2" />
                  Connect in LinkedIn
                </button>
              </div>
            </div>

            <div className="text-center">
              <img
                src="/placeholder.svg?height=300&width=250"
                alt="Jesmin Akhtar Neela"
                className="rounded-lg shadow-lg mx-auto mb-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Jesmin Akhtar Neela is a visionary social entrepreneur, mother,
                and advocate for safe food and women's economic empowerment in
                Bangladesh. Her career began from a mother's concern evolved
                into a movement, and ultimately into a sustainable business
                model that has transformed the lives of hundreds of women and
                their families.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <img
                  src="/placeholder.svg?height=150&width=200"
                  alt="Community work 1"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="/placeholder.svg?height=150&width=200"
                  alt="Community work 2"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="/placeholder.svg?height=150&width=200"
                  alt="Community work 3"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="/placeholder.svg?height=150&width=200"
                  alt="Community work 4"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Key Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-yellow-100 rounded-lg">
                <p className="text-lg text-gray-700 italic">
                  "Honored with the Most Impactful Business Award under the
                  Towards Gender Lens Investing (GLI) Programme. Recognizing
                  women entrepreneurs who are creating positive social impact
                  while building sustainable businesses, promoting food safety,
                  and driving sustainable impact from farm to table."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6">Her Vision</h2>
              <p className="text-lg leading-relaxed">
                To build a future where every Bangladeshi family has access to
                safe, traceable, and nutritious food—while farmers, especially
                women, are respected, fairly paid, and empowered.
              </p>
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6">Her Mission</h2>
              <p className="text-lg leading-relaxed">
                To create a climate-resilient, transparent food ecosystem
                through direct sourcing, cooperative farming, and consumer
                trust—connecting farm to table with dignity and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Core Beliefs & Values
          </h2>

          <div className="bg-gray-100 p-8 rounded-lg mb-12">
            <p className="text-xl text-gray-700 leading-relaxed text-center italic">
              "Food should heal, not harm. Mothers should never fear the food on
              their child's plate. Women can lead impactful, community-rooted
              change. Farmers deserve fairness and visibility. Sustainability is
              not a trend, it's a responsibility."
            </p>
            <p className="text-center mt-4 font-semibold text-gray-600">
              - Jesmin Akhtar Neela
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Jesmin with community"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Her Connection to Shondhibazar
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Shondhibazar is not just a business—it is her lived experience
                turned into a platform for change. It is where her personal role
                as a mother meets her public role as an entrepreneur.
              </p>
              <p className="text-lg text-gray-600 italic">
                "Shondhibazar is my answer to the fear I once carried. Today, it
                is a voice for every woman who wants safety, dignity, and
                purpose." — Jesmin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Media & Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Media & Milestones
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mediaImages.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Media coverage ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              <span>+880 1958 585 267</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <span>contact@shondhibazar.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
