
import React, { useState, useEffect } from 'react';
import { useWordContext } from '../contexts/WordContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Check, X, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

const Quiz: React.FC = () => {
  const { words } = useWordContext();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  
  // Generate quiz questions from known words
  useEffect(() => {
    const knownWords = words.filter(word => word.known);
    if (knownWords.length < 5) {
      toast({
        title: "Not enough known words",
        description: "You need at least 5 known words to take a quiz",
        variant: "destructive",
      });
      return;
    }
    
    // Randomly select 5 words for the quiz
    const selectedWords = [...knownWords].sort(() => 0.5 - Math.random()).slice(0, 5);
    
    // Create questions with multiple choice answers
    const questions = selectedWords.map(word => {
      // Get 3 random incorrect definitions from other words
      const otherDefinitions = words
        .filter(w => w.id !== word.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.definition);
      
      // Add correct definition and shuffle options
      const options = [...otherDefinitions, word.definition]
        .sort(() => 0.5 - Math.random());
      
      return {
        word: word.word,
        correctDefinition: word.definition,
        options,
      };
    });
    
    setQuizQuestions(questions);
  }, [words, toast]);
  
  const handleAnswer = (selectedDefinition: string) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedDefinition === currentQuestion.correctDefinition;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job!",
        variant: "default",
        className: "bg-purple-100 border-purple-200",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct definition was: "${currentQuestion.correctDefinition.substring(0, 50)}..."`,
        variant: "default",
        className: "bg-red-50 border-red-100",
      });
    }
    
    // Move to next question or complete quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };
  
  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8000ff] to-purple-500 mb-4">
              Vocabulary Quiz
            </h1>
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg border border-purple-100 max-w-xl mx-auto">
              <CardContent className="pt-6 pb-6 text-center">
                <Brain className="mx-auto text-[#8000ff] mb-4" size={48} />
                <h2 className="text-xl font-bold text-gray-700 mb-2">Not Enough Words</h2>
                <p className="text-gray-600 mb-6">
                  You need to mark at least 5 words as "Known" before you can take a quiz.
                </p>
                <Link to="/5-min-vocabulary">
                  <Button className="bg-gradient-to-r from-[#8000ff] to-purple-500 hover:from-[#7000ee] hover:to-purple-600">
                    <ArrowLeft className="mr-2" size={18} />
                    Back to Vocabulary
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <Link to="/5-min-vocabulary" className="inline-flex items-center text-[#8000ff] hover:underline mb-4">
            <ArrowLeft size={18} className="mr-2" /> Back to Vocabulary
          </Link>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8000ff] to-purple-500 mb-4">
            Vocabulary Quiz
          </h1>
          
          {!quizComplete ? (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg border border-purple-100 max-w-xl mx-auto">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500">Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                  <span className="font-medium text-[#8000ff]">Score: {score}/{currentQuestionIndex}</span>
                </div>
                
                <Progress 
                  className="h-2 mb-6" 
                  value={(currentQuestionIndex / quizQuestions.length) * 100} 
                />
                
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#8000ff] mb-2">
                    {quizQuestions[currentQuestionIndex]?.word}
                  </h2>
                  <p className="text-gray-600">Select the correct definition:</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {quizQuestions[currentQuestionIndex]?.options.map((definition: string, index: number) => (
                    <Button
                      key={index}
                      className="w-full text-left justify-start h-auto py-3 px-4 bg-white hover:bg-purple-50 text-gray-700 border border-gray-200 hover:border-[#8000ff]"
                      variant="outline"
                      onClick={() => handleAnswer(definition)}
                    >
                      <span className="bg-[#8000ff]/10 text-[#8000ff] w-6 h-6 rounded-full flex items-center justify-center mr-3 font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="line-clamp-2">{definition}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg border border-purple-100 max-w-xl mx-auto">
              <CardContent className="pt-6 pb-6 text-center">
                <h2 className="text-2xl font-bold text-[#8000ff] mb-4">Quiz Complete!</h2>
                
                <div className="w-36 h-36 rounded-full bg-gradient-to-r from-[#8000ff] to-purple-500 flex items-center justify-center mx-auto mb-6">
                  <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#8000ff]">{score}/{quizQuestions.length}</div>
                      <div className="text-gray-500">Score</div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  {score === quizQuestions.length 
                    ? "Perfect score! You've mastered these words." 
                    : `You got ${score} out of ${quizQuestions.length} correct. Keep practicing!`}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-gradient-to-r from-[#8000ff] to-purple-500 hover:from-[#7000ee] hover:to-purple-600"
                    onClick={restartQuiz}
                  >
                    <Brain className="mr-2" size={18} />
                    Try Another Quiz
                  </Button>
                  <Link to="/5-min-vocabulary">
                    <Button variant="outline" className="border-[#8000ff] text-[#8000ff]">
                      <ArrowLeft className="mr-2" size={18} />
                      Back to Vocabulary
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
