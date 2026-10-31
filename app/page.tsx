'use client'
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Leaf, Shield, Menu, X } from 'lucide-react';

const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuoteSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Thank you! Your quote request has been sent. We\'ll contact you within 24 hours.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          description: ''
        });
      } else {
        setSubmitMessage('Sorry, there was an error sending your request. Please try again or call us directly.');
      }
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your request. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Tree Removal",
      description: "Safe and efficient removal of trees of all sizes, including hazardous and hard-to-reach trees."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Tree Trimming & Pruning",
      description: "Professional pruning to maintain tree health, safety, and aesthetic appeal."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Emergency Services",
      description: "24/7 emergency tree services for storm damage and urgent situations."
    }
  ];


  const TreeLogo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
       <img src='logo.png' className='w-l7 h-17'/>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#090d08] text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-[#090d08]/95 backdrop-blur-sm z-50 border-b border-[#29371d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <TreeLogo />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-lime-400 transition-colors cursor-pointer">Home</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-lime-400 transition-colors cursor-pointer">Services</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-lime-400 transition-colors cursor-pointer">About</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-lime-400 transition-colors cursor-pointer">Contact</button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 cursor-pointer" /> : <Menu className="w-6 h-6 cursor-pointer" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#29371d]">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="hover:text-lime-400 transition-colors text-left cursor-pointer">Home</button>
                <button onClick={() => scrollToSection('services')} className="hover:text-lime-400 transition-colors text-left cursor-pointer">Services</button>
                <button onClick={() => scrollToSection('about')} className="hover:text-lime-400 transition-colors text-left cursor-pointer">About</button>
                <button onClick={() => scrollToSection('contact')} className="hover:text-lime-400 transition-colors text-left cursor-pointer">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 bg-gradient-to-br from-[#090d08] via-[#172410] to-[#090d08]">
        <div className="max-w-7xl mx-auto pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Professional
                <span className="block text-lime-400">Tree Care Service</span>
                <span className="block text-3xl lg:text-4xl font-normal text-[#d6dccb]">
                  You Can Trust
                </span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-lime-500 hover:bg-lime-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 cursor-pointer"
                >
                  Get Free Quote
                </button>
                <a href="tel:+14342824028">
                <button className="border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-[#090d08] px-8 py-4 rounded-lg font-semibold text-lg transition-all cursor-pointer">
                  Call Now: (434) 282-4028
                </button>
                </a>
              </div>
            </div>
            
            {/* Large decorative tree */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
               <img src="logo.png" alt="Jenkins & Sons" />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* photos */}
      <section className='grid sm:grid-cols-3'>
        <div>
          <img src="/treeimg.jpeg" alt="treework shirts" />
        </div>
         <div>
          <img src="/treeimg2.png" alt="treework climbing tree"  />
        </div>
        <div>
          <img src="/treeimg3.png" alt="treework truck" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-[#111a0d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Services</h2>
            <p className="text-xl text-[#d6dccb] max-w-3xl mx-auto">
              From routine maintenance to emergency tree removal, we provide 
              tree care services for residential and commercial properties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-[#090d08] p-8 rounded-xl hover:bg-[#1d2a14] transition-all duration-300 hover:scale-105">
                <div className="text-lime-400 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-[#d6dccb]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-[#090d08]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6 text-lg text-[#d6dccb]">
                <p>
                  Founded by Brandon Jenkins, Jenkins & Sons is a trusted family business
                  serving the community.
                  Our team brings expertise, reliability, and genuine care to every project.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-lime-400">20+</div>
                    <div className="text-sm">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-lime-400">500+</div>
                    <div className="text-sm">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-lime-400">24/7</div>
                    <div className="text-sm">Emergency Service</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#111a0d] p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-6 text-lime-400">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mt-3 flex-shrink-0"></div>
                    <span>Fully licensed and insured for your peace of mind</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mt-3 flex-shrink-0"></div>
                    <span>Free estimates with detailed project planning</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mt-3 flex-shrink-0"></div>
                    <span>Complete cleanup included with every service</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mt-3 flex-shrink-0"></div>
                    <span>Emergency services available 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-[#090d08]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Get Your Free Quote Today</h2>
            <p className="text-xl text-[#d6dccb]">Ready to transform your outdoor space? Contact us now!</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="bg-lime-500 p-4 rounded-full">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <a href="tel:+14342824028"><p className="text-lime-400 text-xl">(434) 282-4028</p></a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-lime-500 p-4 rounded-full">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Service Area</h3>
                  <p className="text-[#d6dccb]">Fredricksburg, Va & Surrounding Counties</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111a0d] p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6">Request Your Free Quote</h3>
              
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitMessage.includes('Thank you') 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {submitMessage}
                </div>
              )}
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-[#1d2a14] border border-[#40512a] rounded-lg px-4 py-3 focus:border-lime-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-[#1d2a14] border border-[#40512a] rounded-lg px-4 py-3 focus:border-lime-400 focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#1d2a14] border border-[#40512a] rounded-lg px-4 py-3 focus:border-lime-400 focus:outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#1d2a14] border border-[#40512a] rounded-lg px-4 py-3 focus:border-lime-400 focus:outline-none"
                />
                <select 
                  name="service"
                  onChange={handleInputChange}
                  value={formData.service}
                  className="w-full bg-[#1d2a14] border border-[#40512a] rounded-lg px-4 py-3 focus:border-lime-400 focus:outline-none"
                >
                  <option value="">Select Service</option>
                  <option value="Tree Removal">Tree Removal</option>
                  <option value="Tree Trimming">Tree Trimming</option>
                  <option value="Emergency Service">Emergency Service</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  name="description"
                  placeholder="Describe your project..."
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-[#1d2a14] border border-[#40512a] rounded-lg px-4 py-3 focus:border-lime-400 focus:outline-none"
                ></textarea>
                <button
                  type="button"
                  onClick={handleQuoteSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-lime-500 hover:bg-lime-600 disabled:bg-gray-600 disabled:cursor-not-allowed cursor-pointer py-4 rounded-lg font-semibold text-lg transition-all"
                >
                  {isSubmitting ? 'Sending...' : 'Get My Free Quote'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050805] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <TreeLogo />
              <p className="text-[#aab49c] mt-4">
                Professional tree care services you can trust.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-[#aab49c]">
                <li>Tree Removal</li>
                <li>Tree Trimming & Pruning</li>
                <li>Emergency Services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
              <div className="space-y-2 text-[#aab49c]">
                <a href="tel:+14342824028"><p>Phone: (434) 282-4028</p></a>
                <p>Email: info@jenkinssons.com</p>
                <p>Service Area: Fredicksburg & Surrounding Counties </p>
              </div>
            </div>
          </div>
          <div className="border-t border-[#29371d] pt-8 text-center text-[#aab49c]">
            <p>&copy; 2026 Jenkins & Sons Tree & Outdoor Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;
