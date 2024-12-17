"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  Users,
  Globe,
  ArrowRight,
  ChevronDown,
  Navigation,
  Car,
  Train,
  Plane,
} from "lucide-react";

const LocationsPage = () => {
  const [activeLocation, setActiveLocation] = useState("new-york");

  const stats = [
    {
      icon: Building,
      value: "15+",
      label: "Global Offices",
      description: "Across continents",
    },
    {
      icon: Users,
      value: "1000+",
      label: "Team Members",
      description: "Worldwide presence",
    },
    {
      icon: Globe,
      value: "24/7",
      label: "Support Coverage",
      description: "Always available",
    },
    {
      icon: Clock,
      value: "20+",
      label: "Years Experience",
      description: "Industry expertise",
    },
  ];

  const locations = [
    {
      id: "new-york",
      city: "New York",
      country: "United States",
      address: "123 Broadway, New York, NY 10013",
      phone: "+1 (555) 123-4567",
      email: "nyc@example.com",
      hours: "Mon-Fri: 9AM-6PM EST",
      coordinates: "40.7128° N, 74.0060° W",
      transport: {
        car: "Parking available at 123 Broadway Garage",
        train: "Nearby subway stations: Canal St, Franklin St",
        plane: "30 mins from JFK, 20 mins from LaGuardia",
      },
      image: "/api/placeholder/800/400",
    },
    {
      id: "london",
      city: "London",
      country: "United Kingdom",
      address: "456 Oxford Street, London, W1C 1AP",
      phone: "+44 20 7123 4567",
      email: "london@example.com",
      hours: "Mon-Fri: 9AM-6PM GMT",
      coordinates: "51.5074° N, 0.1278° W",
      transport: {
        car: "Underground parking at Oxford Street Centre",
        train: "Oxford Circus tube station (5 min walk)",
        plane: "45 mins from Heathrow, 1 hour from Gatwick",
      },
      image: "/api/placeholder/800/400",
    },
    {
      id: "tokyo",
      city: "Tokyo",
      country: "Japan",
      address: "789 Shibuya, Tokyo 150-0002",
      phone: "+81 3-1234-5678",
      email: "tokyo@example.com",
      hours: "Mon-Fri: 9AM-6PM JST",
      coordinates: "35.6762° N, 139.6503° E",
      transport: {
        car: "Parking at Shibuya Cross Tower",
        train: "Direct access to Shibuya Station",
        plane: "1 hour from Narita, 30 mins from Haneda",
      },
      image: "/api/placeholder/800/400",
    },
  ];

  const LocationCard = ({ location, isActive, onClick }) => (
    <motion.div
      onClick={onClick}
      className={`cursor-pointer rounded-xl p-6 transition-all duration-300 ${
        isActive ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-50"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3
            className={`text-xl font-semibold ${
              isActive ? "text-white" : "text-gray-900"
            }`}
          >
            {location.city}
          </h3>
          <p className={`${isActive ? "text-blue-100" : "text-gray-600"}`}>
            {location.country}
          </p>
        </div>
        <ChevronDown
          className={`transform transition-transform ${
            isActive ? "rotate-180 text-white" : "text-gray-400"
          }`}
        />
      </div>
    </motion.div>
  );

  const TransportInfo = ({ icon: Icon, title, info }) => (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-gray-600 text-sm">{info}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-24">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Locations
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Find us around the globe. Visit one of our offices and let's
              connect in person.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-lg font-medium text-gray-900 mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Location Selection */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Location
              </h2>
              {locations.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  isActive={activeLocation === location.id}
                  onClick={() => setActiveLocation(location.id)}
                />
              ))}
            </div>

            {/* Location Details */}
            {locations.map(
              (location) =>
                location.id === activeLocation && (
                  <motion.div
                    key={location.id}
                    className="lg:col-span-2 space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={location.image}
                        alt={`${location.city} office`}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <MapPin className="text-blue-600" />
                          <h3 className="text-2xl font-bold text-gray-900">
                            {location.city}
                          </h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Address
                              </h4>
                              <p className="text-gray-600">
                                {location.address}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Contact
                              </h4>
                              <p className="text-gray-600">{location.phone}</p>
                              <p className="text-gray-600">{location.email}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Hours
                              </h4>
                              <p className="text-gray-600">{location.hours}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Coordinates
                              </h4>
                              <p className="text-gray-600">
                                {location.coordinates}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        Getting Here
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <TransportInfo
                          icon={Car}
                          title="By Car"
                          info={location.transport.car}
                        />
                        <TransportInfo
                          icon={Train}
                          title="By Train"
                          info={location.transport.train}
                        />
                        <TransportInfo
                          icon={Plane}
                          title="By Plane"
                          info={location.transport.plane}
                        />
                      </div>
                    </div>

                    <motion.a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        location.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Navigation className="w-5 h-5" />
                      <span>Get Directions</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.a>
                  </motion.div>
                )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;
