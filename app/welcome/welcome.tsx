import React, { useState, useEffect } from "react";

interface FormData {
  email: string;
  password: string;
}

interface ServiceIconProps {
  icon: string;
  bgColor: string;
  delay?: number;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({
  icon,
  bgColor,
  delay = 0,
}) => (
  <div
    className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl text-white transition-all duration-300 cursor-pointer backdrop-blur-md border border-white/20 hover:transform hover:-translate-y-2 hover:scale-110 hover:shadow-2xl ${bgColor}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {icon}
  </div>
);

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 transition-all duration-300 cursor-pointer hover:transform hover:-translate-y-3 hover:bg-white/15 hover:shadow-2xl">
    <div className="text-5xl mb-5 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-white/80 leading-relaxed">{description}</p>
  </div>
);

const FloatingShape: React.FC<{
  size: number;
  top: string;
  left?: string;
  right?: string;
  delay: number;
}> = ({ size, top, left, right, delay }) => (
  <div
    className={`absolute rounded-full bg-white/10 animate-pulse`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      top,
      left,
      right,
      animationDelay: `${delay}s`,
      animationDuration: "4s",
    }}
  />
);

export const Welcome: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) return;

    setIsLoading(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ email: "", password: "" });
        setTimeout(() => {
          setSubmitStatus("idle");
          setIsLoading(false);
        }, 3000);
      } else {
        throw new Error("Registration failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      setSubmitStatus("error");
      setTimeout(() => {
        setSubmitStatus("idle");
        setIsLoading(false);
      }, 2000);
    }
  };

  const getButtonText = () => {
    switch (submitStatus) {
      case "success":
        return "Account Created! ✨";
      case "error":
        return "Try Again";
      default:
        return isLoading ? "Creating Account..." : "Get Started";
    }
  };

  const getButtonStyles = () => {
    switch (submitStatus) {
      case "success":
        return "from-green-400 to-cyan-400";
      case "error":
        return "from-red-400 to-pink-500";
      default:
        return "from-pink-400 to-yellow-400";
    }
  };

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

      {/* Header */}
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

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 bg-gradient-to-r bg-clip-text text-transparent">
            handoff.fm
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Seamlessly transfer your playlists between any music streaming
            service. Your music, everywhere you want it.
          </p>

          {/* Streaming Services Preview */}
          <div className="flex justify-center gap-6 md:gap-8 mb-16 flex-wrap">
            <ServiceIcon
              icon="♫"
              bgColor="bg-gradient-to-br from-green-400 to-green-600"
              delay={0}
            />
            <ServiceIcon
              icon="🎵"
              bgColor="bg-gradient-to-br from-red-400 to-pink-500"
              delay={200}
            />
            <ServiceIcon
              icon="▶"
              bgColor="bg-gradient-to-br from-red-500 to-red-700"
              delay={400}
            />
            <ServiceIcon
              icon="🎶"
              bgColor="bg-gradient-to-br from-gray-700 to-gray-900"
              delay={600}
            />
            <ServiceIcon
              icon="🎼"
              bgColor="bg-gradient-to-br from-black to-gray-800"
              delay={800}
            />
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-lg mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-3xl">
            <h2 className="text-4xl font-bold text-white text-center mb-8">
              Start Your Journey
            </h2>
            <div className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:bg-white/15 focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/30 transition-all duration-300 focus:transform focus:-translate-y-1"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  className="w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:bg-white/15 focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/30 transition-all duration-300 focus:transform focus:-translate-y-1"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-4 text-lg font-bold text-white rounded-2xl bg-gradient-to-r ${getButtonStyles()} hover:shadow-lg uppercase tracking-wide disabled:opacity-80`}
              >
                {getButtonText()}
              </button>
              {isLoading && (
                <div className="flex items-center justify-center text-white/80 mt-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-3" />
                  Creating your account...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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
              icon="🎯"
              title="Perfect Matches"
              description="Advanced matching technology finds the exact songs across platforms, maintaining your playlist integrity."
            />
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
