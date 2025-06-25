
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfileResult } from '../types/quiz';
import { 
  MessageSquare, 
  Headphones, 
  Zap, 
  Users, 
  BookOpen,
  Mail,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InsightResource {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  route?: string;
  external?: boolean;
  priority: number;
}

interface InsightRoutingProps {
  profile: ProfileResult;
  flagsExplored: number;
}

const InsightRouting: React.FC<InsightRoutingProps> = ({ profile, flagsExplored }) => {
  const [showEmailOptIn, setShowEmailOptIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  // Resource recommendations based on profile type
  const getRecommendations = (profileId: string): InsightResource[] => {
    const allResources: { [key: string]: InsightResource[] } = {
      dreamer: [
        {
          id: 'eva-chat',
          title: 'Talk to Chatbot',
          description: 'Decompress & plan your next move with our AI coach',
          icon: <MessageSquare className="h-5 w-5" />,
          action: 'Continue Your Journey',
          route: '/chat',
          priority: 1
        },
        {
          id: 'listening-lab',
          title: 'Listening Lab',
          description: 'Practice spotting red flags in real relationship scenarios',
          icon: <Headphones className="h-5 w-5" />,
          action: 'Explore This',
          priority: 2
        },
        {
          id: 'reality-anchoring',
          title: 'Reality Anchoring Toolkit',
          description: 'Ground your beautiful vision in present-moment awareness',
          icon: <Zap className="h-5 w-5" />,
          action: 'Activate Your Tools',
          priority: 3
        }
      ],
      caregiver: [
        {
          id: 'eva-chat',
          title: 'Talk to Chatbot',
          description: 'Get support for setting healthy boundaries without guilt',
          icon: <MessageSquare className="h-5 w-5" />,
          action: 'Continue Your Journey',
          route: '/chat',
          priority: 1
        },
        {
          id: 'agency-booster',
          title: 'Agency Booster',
          description: 'Learn tactical responses to reclaim your emotional energy',
          icon: <Zap className="h-5 w-5" />,
          action: 'Activate Your Tools',
          priority: 2
        },
        {
          id: 'reciprocity-reset',
          title: 'Reciprocity Reset Program',
          description: 'Build relationships where care flows both ways',
          icon: <Users className="h-5 w-5" />,
          action: 'Explore This',
          priority: 3
        }
      ],
      leader: [
        {
          id: 'eva-chat',
          title: 'Talk to Chatbot',
          description: 'Explore the strength that comes through vulnerability',
          icon: <MessageSquare className="h-5 w-5" />,
          action: 'Continue Your Journey',
          route: '/chat',
          priority: 1
        },
        {
          id: 'collaborative-power',
          title: 'Collaborative Power Workshop',
          description: 'Learn to lead through connection, not just direction',
          icon: <Users className="h-5 w-5" />,
          action: 'Activate Your Tools',
          priority: 2
        },
        {
          id: 'vulnerable-strength',
          title: 'Vulnerable Strength Training',
          description: 'Make space for softness without losing your edge',
          icon: <Zap className="h-5 w-5" />,
          action: 'Explore This',
          priority: 3
        }
      ],
      default: [
        {
          id: 'eva-chat',
          title: 'Talk to Chatbot',
          description: 'Get personalized guidance for your unique pattern',
          icon: <MessageSquare className="h-5 w-5" />,
          action: 'Continue Your Journey',
          route: '/chat',
          priority: 1
        },
        {
          id: 'listening-lab',
          title: 'Listening Lab',
          description: 'Practice spotting red flags in real scenarios',
          icon: <Headphones className="h-5 w-5" />,
          action: 'Explore This',
          priority: 2
        },
        {
          id: 'agency-booster',
          title: 'Agency Booster',
          description: 'Learn tactical responses to maintain your power',
          icon: <Zap className="h-5 w-5" />,
          action: 'Activate Your Tools',
          priority: 3
        }
      ]
    };

    return allResources[profileId] || allResources.default;
  };

  const recommendations = getRecommendations(profile.id)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);

  const handleResourceClick = (resource: InsightResource) => {
    if (resource.route) {
      navigate(resource.route);
    }
  };

  const handleEmailOptIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would integrate with your email service
    console.log('Email opt-in:', email, 'Profile:', profile.id);
    
    setIsSubscribed(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowEmailOptIn(false);
      setEmail('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-fiaCharcoal mb-2 font-karla">
          Your Insight Journey Continues...
        </h3>
        <p className="text-gray-600">
          Tailored tools to sharpen your social discernment
        </p>
      </div>

      {/* Resource Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {recommendations.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer border-gray-200 hover:border-fiaPink/30">
              <div className="flex items-start space-x-4 mb-4">
                <div className="p-3 bg-fiaPink/10 rounded-lg text-fiaPink">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-fiaCharcoal font-karla mb-1">
                    {resource.title}
                  </h4>
                  {resource.id === 'eva-chat' && (
                    <Badge variant="secondary" className="mb-2 bg-fiaBlue/10 text-fiaBlue border-fiaBlue/20">
                      Recommended
                    </Badge>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 flex-1">
                {resource.description}
              </p>
              
              <Button
                onClick={() => handleResourceClick(resource)}
                className="w-full fia-btn-secondary text-sm"
                variant="outline"
              >
                {resource.action}
                {resource.external && <ExternalLink className="ml-2 h-4 w-4" />}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Enhanced completion message for engaged users */}
      {flagsExplored >= 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-fiaPink/10 to-fiaBlue/10 border border-fiaPink/20 rounded-lg p-6 text-center"
        >
          <div className="text-2xl mb-2">🎯</div>
          <h4 className="font-bold text-fiaCharcoal font-karla mb-2">
            Outstanding Awareness Work!
          </h4>
          <p className="text-gray-700 mb-4">
            You've explored your red flag patterns thoroughly. Ready for deeper intelligence training?
          </p>
          <Button
            onClick={() => navigate('/chat')}
            className="fia-btn-primary"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Continue with Eva
          </Button>
        </motion.div>
      )}

      {/* Email Opt-in Section */}
      <Card className="p-6 bg-gray-50">
        <div className="text-center">
          <Mail className="h-8 w-8 text-fiaBlue mx-auto mb-3" />
          <h4 className="font-bold text-fiaCharcoal font-karla mb-2">
            Stay Sharp, Agent
          </h4>
          
          {!showEmailOptIn && !isSubscribed ? (
            <>
              <p className="text-gray-600 mb-4">
                Get curated intelligence tools delivered to your inbox
              </p>
              <Button
                onClick={() => setShowEmailOptIn(true)}
                variant="outline"
                className="fia-btn-secondary"
              >
                Send Me Tools Based on My Results
              </Button>
            </>
          ) : isSubscribed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="text-fiaBlue text-2xl mb-2">✅</div>
              <p className="text-fiaBlue font-medium">
                Welcome to the intelligence network! Check your email soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleEmailOptIn} className="space-y-4">
              <p className="text-gray-600 text-sm mb-3">
                We use this data only for aggregate insights and never sell your information.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-fiaPink"
                />
                <Button type="submit" className="fia-btn-primary">
                  Join
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};

export default InsightRouting;
