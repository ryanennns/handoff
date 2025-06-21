import React, { useState, useEffect } from "react";
import { FeatureCard } from "~/Components/FeatureCard";
import { ServiceIcon } from "~/Components/ServiceIcon";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import { SiApplemusic, SiTidal, SiAmazonmusic, SiGoogle } from "react-icons/si";
import { FloatingShape } from "~/Components/FloatingShape";

interface FormData {
  email: string;
  password: string;
}

export const LandingPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingShape size={100} top="20%" left="10%" delay={0} />
        <FloatingShape size={150} top="60%" right="15%" delay={1} />
        <FloatingShape size={80} top="10%" right="30%" delay={2} />
        <FloatingShape size={120} top="80%" left="20%" delay={3} />
      </div>

      {/* Parallax Background Elements */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 rounded-full blur-2xl" />
      </div>

      <div>
        <header className="text-white relative z-10 py-6">
          <div className="max-w-6xl mx-auto px-6">
            <nav className="flex justify-between items-center">
              <a href="#" className="text-3xl"></a>
              <ul className="hidden md:flex space-x-8">
                {["Features", "Pricing", "Support"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-white/90 font-medium hover:text-white transition-all duration-300 hover:transform hover:-translate-y-1 relative group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-yellow-400 transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch max-w-7xl mx-auto px-6 gap-12 py-20">
          {/* Hero Section */}
          <section className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 bg-gradient-to-r bg-clip-text text-transparent">
              handoff.fm
            </h1>
            <p className="text-xl md:text-3xl text-white/90 mb-12 leading-relaxed">
              Seamlessly transfer your playlists between any music streaming
              service. Your music, everywhere you want it.
            </p>
            <div className="flex justify-center lg:justify-start gap-6 md:gap-8 flex-wrap">
              <ServiceIcon
                icon={<FaSpotify />}
                bgColor="bg-gradient-to-br from-green-400 to-green-600"
                delay={0}
              />
              <ServiceIcon
                icon={<FaYoutube />}
                bgColor="bg-gradient-to-br from-red-500 to-red-700"
                delay={200}
              />
              <ServiceIcon
                icon={<SiApplemusic />}
                bgColor="bg-gradient-to-br from-red-400 to-pink-500"
                delay={400}
              />
              <ServiceIcon icon={<SiTidal />} bgColor="bg-black" delay={600} />
              <ServiceIcon
                icon={<SiAmazonmusic />}
                bgColor="bg-[#25D1DB]"
                delay={800}
              />
            </div>
          </section>

          {/* Signup Section */}
          <section className="w-full lg:w-1/2">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-3xl h-full flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-white text-center mb-8">
                Start Your Journey
              </h2>
              <div className="space-y-6 flex justify-center">
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://handoff-api.enns.dev/api/auth/redirect/google")
                  }
                  className="px-6 py-3 flex gap-4 items-center justify-center text-lg font-medium text-black bg-white rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-md"
                >
                  <SiGoogle className="w-6 h-6" />
                  <p>Sign in with Google</p>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-black text-white text-center mb-16">
            Why Choose handoff.fm?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Transfer thousands of songs in minutes, not hours. Our optimized algorithms ensure rapid playlist migration."
            />
            <FeatureCard
              icon="🔒"
              title="Secure & Private"
              description="Your data is encrypted and never stored. We connect directly to your streaming services with industry-standard security."
            />
            <FeatureCard
              icon="X"
              title="Perfect Matches"
              description="Advanced matching technology finds the exact songs across platforms, maintaining your playlist integrity."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="relative z-10 py-20 bg-white/5 backdrop-blur-sm border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h2 className="text-5xl font-black text-center mb-16">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            {[
              {
                title: "Casual",
                description:
                  "Perfect for music lovers who want hassle-free transfers.",
                features: [
                  "Transfer up to 500 songs free of charge",
                  "Transfer across all supported platforms",
                ],
                price: "$0.00 / month",
                highlight: false,
              },
              {
                title: "Pro",
                description:
                  "Designed for power users with multiple libraries to manage.",
                features: [
                  "Transfer unlimited songs across all platforms",
                  "Coordinate daily backups",
                  "Dedicated support",
                ],
                price: "$2.99 / month",
                highlight: true,
              },
            ].map(({ title, description, features, price, highlight }) => (
              <div
                key={title}
                className={`flex flex-col justify-between p-10 rounded-3xl border border-white/20 min-h-[480px] ${
                  highlight
                    ? "bg-gradient-to-br from-pink-500 to-yellow-400 shadow-2xl"
                    : "bg-white/10 backdrop-blur"
                } transition-all duration-300 hover:transform hover:-translate-y-2`}
              >
                <div>
                  <h3 className="text-3xl font-bold mb-2">{title}</h3>
                  <p className="text-white/80 text-lg mb-6">{description}</p>
                  <ul className="space-y-3 mb-6">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-white/90"
                      >
                        <span className="text-xl">✅</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-3xl font-bold">{price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-white/70">
            &copy; 2025 handoff.fm. Seamlessly connecting your music universe.
          </p>
        </div>
      </footer>
    </div>
  );
};
