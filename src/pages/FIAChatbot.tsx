
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageSquare, Brain, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FIAHeader from '../components/FIAHeader';

const FIAChatbot: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <FIAHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assessment
          </Button>

          <Card className="p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-fiaPink to-fiaBlue rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-fiaCharcoal mb-4 font-karla">
                FIA Chatbot - Eva
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Welcome to your personal Feminine Intelligence Agency coach. Eva is designed to help you 
                navigate complex relationships, build stronger boundaries, and maintain your power.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-fiaPink/10 rounded-lg">
                  <Brain className="h-8 w-8 text-fiaPink mx-auto mb-3" />
                  <h3 className="font-bold text-fiaCharcoal mb-2">Personalized Guidance</h3>
                  <p className="text-gray-600 text-sm">
                    Get insights tailored to your specific vulnerability patterns
                  </p>
                </div>
                
                <div className="text-center p-6 bg-fiaBlue/10 rounded-lg">
                  <Shield className="h-8 w-8 text-fiaBlue mx-auto mb-3" />
                  <h3 className="font-bold text-fiaCharcoal mb-2">Safe Space</h3>
                  <p className="text-gray-600 text-sm">
                    Confidential conversations to explore your relationship dynamics
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-fiaCharcoal mb-3">Coming Soon</h4>
                <p className="text-gray-600">
                  The FIA Chatbot is currently in development. You'll soon be able to have 
                  personalized conversations with Eva about your relationship patterns, 
                  get real-time advice, and practice boundary-setting scenarios.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  className="fia-btn-primary"
                >
                  Return to Assessment
                </Button>
                <Button
                  variant="outline"
                  className="fia-btn-secondary"
                  disabled
                >
                  Join Waitlist (Coming Soon)
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FIAChatbot;
