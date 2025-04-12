
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Search, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12">
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-navy px-3 py-1 text-white font-medium">About Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Our Mission</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                To simplify credit card decisions for every Indian, helping you maximize rewards while minimizing fees.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-navy mb-4">Who We Are</h2>
                <p className="text-gray-600 mb-6">
                  IndiaCardInsight was founded in 2023 by a team of financial experts and technology enthusiasts who were frustrated with the complex and often confusing world of credit cards in India.
                </p>
                <p className="text-gray-600 mb-6">
                  Our team has decades of combined experience in the banking and fintech industries, and we're passionate about using this knowledge to help everyday consumers make informed financial decisions.
                </p>
                <p className="text-gray-600">
                  We are not a bank or financial institution - we're an independent platform that analyzes spending patterns to recommend the best credit cards for your specific lifestyle.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-navy/5 to-slate-blue/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-navy mb-6">Our Core Values</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-navy/10 rounded-full p-3 mr-4">
                      <Check className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-navy">Transparency</h4>
                      <p className="text-gray-600">We clearly disclose how our recommendations work and any relationships we have with card issuers.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-navy/10 rounded-full p-3 mr-4">
                      <Search className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-navy">Data-Driven</h4>
                      <p className="text-gray-600">Our recommendations are based on actual spending patterns and card benefits, not marketing incentives.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-navy/10 rounded-full p-3 mr-4">
                      <Zap className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-navy">Innovation</h4>
                      <p className="text-gray-600">We constantly update our algorithm to account for new card offerings and changing market conditions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform uses a sophisticated algorithm to match your spending habits with the best credit cards available in India.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-navy/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-navy">1</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Share Your Spending</h3>
                <p className="text-gray-600">
                  Tell us about your typical monthly expenses across different categories.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-navy/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-navy">2</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Our Algorithm Works</h3>
                <p className="text-gray-600">
                  We analyze your data against our database of credit card features and benefits.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-navy/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-navy">3</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Get Personalized Recommendations</h3>
                <p className="text-gray-600">
                  Receive tailored credit card suggestions that maximize your potential rewards.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
