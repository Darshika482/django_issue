
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import About from "./pages/About";
import AllSystems from "./pages/AllSystems";
import Planner from "./pages/Planner";
import NotFound from "./pages/NotFound";
import AISyllabusCreator from "./pages/AISyllabusCreator";
import CreateSystem from "./pages/CreateSystem";
import SystemPage from "./pages/SystemPage";
import NCERTClasses from "./pages/NCERTClasses";
import NCERTClassDetail from "./pages/NCERTClassDetail";
import ProductivityTechniques from "./pages/ProductivityTechniques";
import ProductivityMethodDetails from "./pages/ProductivityMethodDetails";
import ProductivityTechniqueDetail from "./pages/ProductivityTechniqueDetail";
import PomodoroTechnique from "./pages/PomodoroTechnique";
import DeepFocus from "./pages/DeepFocus";
import VocabularyPage from "./pages/5-min-vocabulary";
import AllWords from "./pages/AllWords";
import Quiz from "./pages/Quiz";
import AllTemplates from "./pages/AllTemplates";
import TemplatePage from "./pages/TemplatePage";
import Auth from "./pages/Auth";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./store/task";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/calendar/index.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <TaskProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/notes" 
                element={
                  <ProtectedRoute>
                    <Notes />
                  </ProtectedRoute>
                } 
              />
              <Route path="/about" element={<About />} />
              <Route 
                path="/all-systems" 
                element={
                  <ProtectedRoute>
                    <AllSystems />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create-system" 
                element={
                  <ProtectedRoute>
                    <CreateSystem />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ncert-classes" 
                element={
                  <ProtectedRoute>
                    <NCERTClasses />
                  </ProtectedRoute>
                } 
              />
              <Route path="/ncert-class/:classId" element={<NCERTClassDetail />} />
              <Route path="/productivity-techniques" element={<ProductivityTechniques />} />
              <Route path="/productivity-method/:id" element={<ProductivityMethodDetails />} />
              <Route path="/productivity-technique/:id" element={<ProductivityTechniqueDetail />} />
              <Route path="/pomodoro-technique" element={<PomodoroTechnique />} />
              <Route path="/deep-focus" element={<DeepFocus />} />
              <Route path="/5-min-vocabulary" element={<VocabularyPage />} />
              <Route path="/all-words" element={<AllWords />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route 
                path="/system/:id" 
                element={
                  <ProtectedRoute>
                    <SystemPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/planner" 
                element={
                  <ProtectedRoute>
                    <Planner />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ai-syllabus-creator" 
                element={
                  <ProtectedRoute>
                    <AISyllabusCreator />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/all-templates" 
                element={
                  <ProtectedRoute>
                    <AllTemplates />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/template/:id" 
                element={
                  <ProtectedRoute>
                    <TemplatePage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TaskProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
