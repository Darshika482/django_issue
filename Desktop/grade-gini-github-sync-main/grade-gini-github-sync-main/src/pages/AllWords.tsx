
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, Check, Clock, ArrowLeft } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AllWordsTab from '../components/AllWordsTab';
import { useWordContext } from '../contexts/WordContext';

const AllWords: React.FC = () => {
  const { words } = useWordContext();
  const [activeTab, setActiveTab] = useState<'all' | 'known' | 'study'>('all');
  
  const knownWords = words.filter(word => word.known);
  const studyLaterWords = words.filter(word => word.studyLater);

  // Extract tab selection from URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam === 'known') setActiveTab('known');
    if (tabParam === 'study') setActiveTab('study');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-12">
      <div className="container mx-auto px-4 py-6">
        {/* Back button and header */}
        <div className="mb-6">
          <Link to="/5-min-vocabulary">
            <Button variant="outline" className="mb-4 border-[#8000ff] text-[#8000ff]">
              <ArrowLeft className="mr-2" size={16} />
              Back to Vocabulary
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-[#8000ff] animate-fade-in">All Words Library</h1>
          <p className="text-gray-600">Browse, filter, and organize your vocabulary collection</p>
        </div>

        {/* Main tabs */}
        <Tabs 
          defaultValue={activeTab} 
          className="w-full mt-6"
          onValueChange={(value) => setActiveTab(value as 'all' | 'known' | 'study')}
        >
          <TabsList className="w-full bg-white/20 backdrop-blur-sm mb-8 p-1 rounded-xl">
            <TabsTrigger 
              value="all" 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#8000ff] data-[state=active]:shadow-md transition-all"
            >
              <BookOpen className="mr-2" size={18} /> All Words ({words.length})
            </TabsTrigger>
            <TabsTrigger 
              value="known" 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#8000ff] data-[state=active]:shadow-md transition-all"
            >
              <Check className="mr-2" size={18} /> Known Words ({knownWords.length})
            </TabsTrigger>
            <TabsTrigger 
              value="study" 
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#8000ff] data-[state=active]:shadow-md transition-all"
            >
              <Clock className="mr-2" size={18} /> Study Later ({studyLaterWords.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <AllWordsTab words={words} tabType="all" />
          </TabsContent>

          <TabsContent value="known">
            <AllWordsTab words={knownWords} tabType="known" />
          </TabsContent>

          <TabsContent value="study">
            <AllWordsTab words={studyLaterWords} tabType="study" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AllWords;
