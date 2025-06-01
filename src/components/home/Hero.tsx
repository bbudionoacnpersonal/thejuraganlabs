import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <div 
        className="absolute top-0 left-0 right-0 w-full h-[800px]"
        style={{
          background: `
            radial-gradient(
              circle at 50% 0%,
              rgb(0, 102, 255) 0%,
              rgba(0, 68, 255, 0.2) 25%,
              transparent 50%
            )
          `,
          transform: 'scale(2)',
          opacity: 0.7,
        }}
      />
      <div className="absolute top-0 left-0 right-0 w-full h-[800px] bg-gradient-to-b from-transparent via-dark-background/80 to-dark-background" />

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 sm:pt-16 lg:pt-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              <span className="block">Create Your AI Agents</span>
              <span className="font-extrabold bg-gradient-to-r from-[#4DACFF] via-[#774DFF] to-[#FF73FF] bg-clip-text text-transparent">In Minutes</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              Be the boss of your AI agents team's development, testing, and deployment — powered by connected cutting-edge language models.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
            >
              <div className="rounded-md shadow">
                <Link to="/login">
                  <Button size="lg" className="bg-primary-400">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link to="/signup">
                  <Button variant="ghost" size="lg" className="border border-dark-border">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="bg-dark-surface/80 backdrop-blur-sm p-2 rounded-xl border border-dark-border">
              <div className="relative rounded-lg overflow-hidden bg-dark-400/80 pt-4">
                <div className="absolute top-0 left-0 p-2 flex space-x-1">
                  <div className="h-3 w-3 bg-error-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-warning-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-success-500 rounded-full"></div>
                </div>
                <div className="pt-6 pb-8 px-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary-600 flex items-center justify-center">
                        <span className="text-white font-medium">U</span>
                      </div>
                      <div className="border-primary-600/25 bg-dark-surface/90 backdrop-blur-sm p-3 rounded-lg max-w-md">
                        <p className="text-gray-300">Buatin AI agents team yang bisa analisa tiket dari pelanggan dan mengkategorikannya berdasarkan prioritas dan departemennya.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 justify-end">
                      <div className="bg-dark-surface/90 backdrop-blur-sm p-3 rounded-lg max-w-md border-secondary-400/25">
                        <p className="text-gray-300">Siap Gan! Gw bantuin bikin ya AI agents team untuk bantu Agan ya. Mari kita mulai dengan konfigurasi komponent utama yang diperlukan:</p>
                        <ul className="text-gray-300 mt-2 space-y-1 list-disc list-inside">
                          <li>"Natural language processing" untuk analisa tiket</li>
                          <li>"Classification system" untuk prioritisasi</li>
                          <li>"Routing" ke tim yang tepat sesuai dengan tiketnya</li>
                        </ul>
                      </div>
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-400 flex items-center justify-center">
                        <span className="text-white font-medium">AI</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary-600 flex items-center justify-center">
                        <span className="text-white font-medium">U</span>
                      </div>
                      <div className="bg-dark-surface/90  backdrop-blur-sm p-3 rounded-lg max-w-md">
                        <p className="text-gray-300">Wah mantap! Gw jg mw ini terintegrasi dengan akun Zendesk perusahaan ya.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 justify-end">
                      <div className="bg-dark-surface/90 backdrop-blur-sm p-3 rounded-lg max-w-md border-secondary-400/25">
                        <p className="text-gray-300">Noted Gan! Gw dah tambahin barusan Zendesk ke AI agents teamnya ya. AI Team Agan dah siap untuk testing ya. Klik "Chat Playground untuk mencoba"</p>
                        <div className="bg-dark-background/80 p-2 rounded mt-2 text-sm font-mono text-secondary-600">
                          Agent: CustomerSupportAssistant<br/>
                          Model: GPT-4<br/>
                          Tools: [ZendeskConnector, TextAnalysis]<br/>
                          Status: Ready for testing
                        </div>
                      </div>
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-400 flex items-center justify-center">
                        <span className="text-white font-medium">AI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;