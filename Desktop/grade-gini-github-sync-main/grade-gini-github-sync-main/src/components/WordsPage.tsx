
import React from 'react';
import { Link } from 'react-router-dom';
import { useWordContext } from '../contexts/WordContext';
import { Button } from "@/components/ui/button";
import { ArrowRight, List, Brain, Check, Clock } from 'lucide-react';
import StreakCounter from './StreakCounter';

const WordsPage: React.FC = () => {
  const { words } = useWordContext();
  const knownWords = words.filter(word => word.known);
  const studyLaterWords = words.filter(word => word.studyLater);

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Vocabulary Journey</h2>
        <StreakCounter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/all-words" className="block">
          <div className="bg-white rounded-xl shadow-sm border border-purple-200 p-6 transition duration-300 hover:shadow-md hover:border-[#8000ff]/40">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-[#8000ff]/10 flex items-center justify-center">
                <List className="h-6 w-6 text-[#8000ff]" />
              </div>
              <span className="text-lg font-bold text-[#8000ff]">{words.length}</span>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">Total Words</h3>
            <p className="text-gray-600 text-sm mb-4">Your complete vocabulary collection</p>
            <div className="mt-auto">
              <Button variant="outline" className="w-full border-[#8000ff] text-[#8000ff] hover:bg-[#8000ff]/5">
                View All Words <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </Link>

        <Link to="/all-words?tab=known" className="block">
          <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 transition duration-300 hover:shadow-md hover:border-green-400">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-lg font-bold text-green-600">{knownWords.length}</span>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">Known Words</h3>
            <p className="text-gray-600 text-sm mb-4">Words you've already mastered</p>
            <div className="mt-auto">
              <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                View Known Words <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </Link>

        <Link to="/all-words?tab=study" className="block">
          <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-6 transition duration-300 hover:shadow-md hover:border-yellow-400">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-lg font-bold text-yellow-600">{studyLaterWords.length}</span>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">Study Later</h3>
            <p className="text-gray-600 text-sm mb-4">Words you want to revisit</p>
            <div className="mt-auto">
              <Button variant="outline" className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50">
                View Study List <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#8000ff]/20 flex items-center justify-center mt-1">
              <Brain className="h-6 w-6 text-[#8000ff]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Test Your Knowledge</h3>
              <p className="text-gray-600 mb-4">
                Challenge yourself with vocabulary quizzes to reinforce your learning and track your progress.
              </p>
              <Link to="/quiz">
                <Button className="bg-[#8000ff] hover:bg-[#7000db] text-white shadow-sm">
                  Take a Quiz <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Daily Challenge</h3>
              <p className="text-gray-600 mb-4">
                Complete daily vocabulary challenges to maintain your streak and improve consistently.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                Today's Challenge <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordsPage;
