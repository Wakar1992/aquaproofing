import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  Award, 
  Clock, 
  Droplets,
  Home,
  Building,
  Umbrella,
  CheckCircle,
  Star,
  ArrowRight,
  Users,
  Calendar,
  ChevronDown,
  Upload,
  FileImage,
  Trash2
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf';
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(event.currentTarget);
    
    // Add files to form data
    selectedFiles.forEach((file, index) => {
      formData.append(`attachment_${index}`, file);
    });

    try {
      // Using Formspree for form handling with file uploads
      const response = await fetch('https://formspree.io/f/mwpbboje', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        (event.target as HTMLFormElement).reset();
        setSelectedFiles([]);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: <Home className="w-12 h-12" />,
      title: "Basement Waterproofing",
      description: "Complete basement waterproofing solutions including interior and exterior waterproofing, sump pump installation, and drainage systems.",
      features: ["Interior & Exterior Sealing", "Sump Pump Systems", "French Drains", "Vapor Barriers"]
    },
    {
      icon: <Building className="w-12 h-12" />,
      title: "Foundation Waterproofing",
      description: "Protect your foundation from water damage with our comprehensive foundation waterproofing and crack repair services.",
      features: ["Foundation Crack Repair", "Exterior Waterproofing", "Foundation Drainage", "Structural Protection"]
    },
    {
      icon: <Umbrella className="w-12 h-12" />,
      title: "Roof Waterproofing",
      description: "Professional roof waterproofing and leak repair services to keep your property dry and protected from the elements.",
      features: ["Roof Leak Repair", "Waterproof Membranes", "Gutter Systems", "Preventive Maintenance"]
    }
  ];

  const whyChooseUs = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Licensed & Insured",
      description: "Fully licensed and insured professionals with comprehensive coverage for your peace of mind."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "25+ Years Experience",
      description: "Over two decades of experience in waterproofing solutions for residential and commercial properties."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Lifetime Warranty",
      description: "We stand behind our work with comprehensive lifetime warranties on all waterproofing services."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Emergency Service",
      description: "Emergency waterproofing services available 24/7 because water damage doesn't wait."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "Downtown Resident",
      rating: 5,
      text: "AquaProofing Co. saved our basement from chronic flooding. Their team was professional, efficient, and the work has held up perfectly for over 3 years now.",
      service: "Basement Waterproofing"
    },
    {
      name: "Mike Thompson",
      location: "Commercial Property Owner",
      rating: 5,
      text: "Outstanding foundation waterproofing work on our office building. The team was knowledgeable and completed the project on time and within budget.",
      service: "Foundation Waterproofing"
    },
    {
      name: "Jennifer Lee",
      location: "Homeowner",
      rating: 5,
      text: "Fast response to our roof leak emergency. They not only fixed the immediate problem but provided a comprehensive waterproofing solution.",
      service: "Roof Waterproofing"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Droplets className="w-7 h-7 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-gray-900">AquaProofing Co.</h1>
                <p className="text-sm text-gray-600">Professional Waterproofing Services</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Reviews</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
              <a href="tel:+1-555-AQUA-PRO" className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all transform hover:scale-105 font-semibold">
                Call Now: (555) AQUA-PRO
              </a>
            </nav>

            <button 
              className="lg:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <a href="#services" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a>
              <a href="#about" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
              <a href="#testimonials" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Reviews</a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
              <a href="tel:+1-555-AQUA-PRO" className="block w-full text-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all font-semibold">
                Call Now: (555) AQUA-PRO
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Professional
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                  Waterproofing
                </span>
                Services
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Protect your property from water damage with our expert waterproofing solutions. Licensed, insured, and backed by a lifetime warranty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#contact" className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all transform hover:scale-105 flex items-center justify-center">
                  Get Free Estimate
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="tel:+1-555-AQUA-PRO" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center">
                  <Phone className="mr-2 w-5 h-5" />
                  Emergency Service
                </a>
              </div>
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">25+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-1">5000+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="text-blue-600/30">
                  <Home className="w-48 h-48" />
                </div>
                <div className="absolute top-6 right-6 bg-white rounded-full p-4 shadow-lg">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <div className="absolute bottom-6 left-6 bg-white rounded-full p-4 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center mt-12">
          <ChevronDown className="w-8 h-8 text-gray-400 mx-auto animate-bounce" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Waterproofing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive waterproofing solutions to protect your property from water damage, backed by our lifetime warranty.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose AquaProofing Co.?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With over 25 years of experience, we're your trusted partner for all waterproofing needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Certifications & Memberships</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm font-semibold text-gray-700">BBB Accredited</div>
                <div className="text-xs text-gray-500">A+ Rating</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm font-semibold text-gray-700">Licensed Contractor</div>
                <div className="text-xs text-gray-500">State Certified</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm font-semibold text-gray-700">Fully Insured</div>
                <div className="text-xs text-gray-500">Liability & Workers Comp</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm font-semibold text-gray-700">EPA Certified</div>
                <div className="text-xs text-gray-500">Environmental Safety</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our waterproofing services.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                  <div className="text-sm text-blue-600 font-medium mt-1">{testimonial.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Get Your Free Estimate Today
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to protect your property? Contact us for a free, no-obligation estimate on our waterproofing services.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-blue-200 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <a href="tel:+1-555-AQUA-PRO" className="text-blue-200 hover:text-white transition-colors">
                      (555) AQUA-PRO
                    </a>
                    <div className="text-sm text-blue-200 mt-1">24/7 Emergency Service Available</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-blue-200 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href="mailto:info@aquaproofingco.com" className="text-blue-200 hover:text-white transition-colors">
                      info@aquaproofingco.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-200 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Service Area</div>
                    <div className="text-blue-200">
                      123 Waterproof Lane<br />
                      Your City, YS 12345<br />
                      <span className="text-sm">Serving a 50-mile radius</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-200 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Business Hours</div>
                    <div className="text-blue-200">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 5:00 PM<br />
                      Sunday: Emergency Service Only
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Free Estimate</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-green-800 font-medium">Thank you! Your request has been submitted successfully.</span>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-red-800 font-medium">There was an error submitting your request. Please try again.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="john.doe@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="basement">Basement Waterproofing</option>
                    <option value="foundation">Foundation Waterproofing</option>
                    <option value="roof">Roof Waterproofing</option>
                    <option value="emergency">Emergency Service</option>
                    <option value="inspection">Property Inspection</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Please describe your waterproofing needs, property type, and any specific concerns..."
                  ></textarea>
                </div>

                {/* File Upload Section */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach Photos (Optional)
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Upload photos of the problem area to help us provide a more accurate estimate. Max 5 files, 10MB each. Supported formats: JPG, PNG, PDF
                  </p>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id="fileUpload"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                    </label>
                  </div>*/}

                  {/* Selected Files Display */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <FileImage className="w-5 h-5 text-blue-500 mr-2" />
                            <span className="text-sm text-gray-700 truncate max-w-xs">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              ({(file.size / 1024 / 1024).toFixed(1)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Estimate'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div className="ml-3">
                  <div className="text-xl font-bold">AquaProofing Co.</div>
                  <div className="text-sm text-gray-400">Professional Waterproofing</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Your trusted partner for professional waterproofing services. Protecting properties with quality, reliability, and lifetime warranties.
              </p>
              <div className="text-sm text-gray-400">
                Licensed • Insured • Bonded<br />
                License #WP-2024-001
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white transition-colors">Basement Waterproofing</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Foundation Waterproofing</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Roof Waterproofing</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Emergency Services</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Water Damage Prevention</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                  <a href="tel:+1-555-AQUA-PRO" className="hover:text-white transition-colors">
                    (555) AQUA-PRO
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                  <a href="mailto:info@aquaproofingco.com" className="hover:text-white transition-colors">
                    info@aquaproofingco.com
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    123 Waterproof Lane<br />
                    Your City, YS 12345
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AquaProofing Co. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;