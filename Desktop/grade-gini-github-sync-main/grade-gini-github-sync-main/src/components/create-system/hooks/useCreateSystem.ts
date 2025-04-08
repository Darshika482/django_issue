
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSystem } from '@/api/systemsApi';
import { createModule } from '@/api/modulesApi';
import { createTask } from '@/api/tasksApi';
import { generateLearningSystem } from '@/api/geminiApi';
import { TaskCategory, TaskPriority } from '@/types';
import { toast } from 'sonner';

const MAX_CHARS = 5000;

export const useCreateSystem = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("text-input");
  const [systemName, setSystemName] = useState<string>("");
  const [syllabus, setSyllabus] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(0);
  
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState<boolean>(false);
  const [geminiApiKey, setGeminiApiKey] = useState<string>("");
  const [savedApiKey, setSavedApiKey] = useState<string>(localStorage.getItem('geminiApiKey') || "");
  const [useAI, setUseAI] = useState<boolean>(!!savedApiKey);
  const [showApiGuide, setShowApiGuide] = useState<boolean>(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setSyllabus(text);
      setCharCount(text.length);
      if (errorMessage) setErrorMessage("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    
    if (!['pdf', 'docx', 'txt'].includes(fileExt || '')) {
      setErrorMessage("Unsupported file format. Please upload PDF, DOCX, or TXT files only.");
      return;
    }
    
    if (file.size > 52428800) {
      setErrorMessage("File too large. Maximum file size is 50MB.");
      return;
    }
    
    setUploadedFile(file);
    setErrorMessage("");
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(Math.floor(progress));
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    
    if (!['pdf', 'docx', 'txt'].includes(fileExt || '')) {
      setErrorMessage("Unsupported file format. Please upload PDF, DOCX, or TXT files only.");
      return;
    }
    
    if (file.size > 52428800) {
      setErrorMessage("File too large. Maximum file size is 50MB.");
      return;
    }
    
    setUploadedFile(file);
    setErrorMessage("");
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(Math.floor(progress));
    }, 200);
  };

  const validateInputs = () => {
    if (!systemName.trim()) {
      setErrorMessage("Please enter a name for your learning system.");
      return false;
    }

    if (activeTab === "text-input" && !syllabus.trim()) {
      setErrorMessage("Please enter your syllabus or learning objectives.");
      return false;
    }
    
    if (activeTab === "file-upload" && !uploadedFile) {
      setErrorMessage("Please upload a file first.");
      return false;
    }

    if (useAI && !savedApiKey) {
      setApiKeyDialogOpen(true);
      return false;
    }

    return true;
  };

  const saveApiKey = () => {
    if (geminiApiKey.trim()) {
      localStorage.setItem('geminiApiKey', geminiApiKey);
      setSavedApiKey(geminiApiKey);
      setApiKeyDialogOpen(false);
      toast.success("Google AI API key saved");
      
      handleGenerateSystem();
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  const handleGenerateSystem = async () => {
    if (!validateInputs()) return;
    
    setIsProcessing(true);
    
    try {
      const description = activeTab === "text-input" 
        ? syllabus 
        : `Uploaded file: ${uploadedFile?.name}`;
      
      console.log("Creating system with name:", systemName, "and description:", description.substring(0, 100) + "...");
      
      const newSystem = await createSystem({
        title: systemName,
        description: description,
        progress: 0,
        deadline: "",
        status: "Active"
      });
      
      console.log("Created new system with ID:", newSystem.id);
      
      if (useAI && savedApiKey) {
        try {
          toast.info("Generating learning content with AI...", { duration: 5000 });
          
          console.log("Calling Gemini API to generate learning system...");
          const { modules, tasks } = await generateLearningSystem(
            savedApiKey,
            systemName,
            description
          );
          
          console.log(`Received ${modules.length} modules from Gemini`);
          console.log(`Received tasks array with ${tasks.length} module task groups`);
          
          // Create modules and their tasks sequentially 
          for (let i = 0; i < modules.length; i++) {
            const moduleData = modules[i];
            const moduleTasksData = tasks[i] || [];
            
            console.log(`Creating module ${i+1}: ${moduleData.title}`);
            console.log(`This module has ${moduleTasksData.length} tasks`);
            
            const newModule = await createModule({
              title: moduleData.title,
              description: moduleData.description,
              isCompleted: false
            }, newSystem.id as number);
            
            console.log(`Module created with ID: ${newModule.id}`);
            
            // Create all tasks for this module
            if (moduleTasksData && moduleTasksData.length > 0) {
              for (const taskData of moduleTasksData) {
                try {
                  console.log(`Creating task: ${taskData.title} for module ID: ${newModule.id}`);
                  
                  // Add necessary fields to the task data and ensure category is a valid TaskCategory
                  const taskCategory: TaskCategory = 
                    (taskData.category && ['work', 'personal', 'study', 'health', 'errands', 'finance', 'other'].includes(taskData.category as string)) 
                      ? (taskData.category as TaskCategory) 
                      : 'study';
                  
                  const taskToCreate = {
                    title: taskData.title,
                    description: taskData.description || '',
                    date: taskData.date || new Date().toISOString().split('T')[0],
                    time: '',
                    startTime: '',
                    endTime: '',
                    completed: false,
                    category: taskCategory,
                    priority: (taskData.priority || 'medium') as TaskPriority,
                    technique: 'pomodoro',
                    systemId: String(newSystem.id),
                    systemName: systemName,
                    subtasks: taskData.subtasks || []
                  };
                  
                  // Create the task with explicit module ID
                  const task = await createTask(taskToCreate, newModule.id);
                  console.log(`Task created with ID: ${task.id}`);
                } catch (taskError) {
                  console.error(`Error creating task ${taskData.title}:`, taskError);
                }
              }
            } else {
              console.warn(`No tasks found for module ${moduleData.title}`);
            }
          }
          
          toast.success("Learning system created with AI-generated content!");
        } catch (error) {
          console.error('Error with Gemini API:', error);
          toast.error("Failed to generate content with AI, but basic system was created");
        }
      } else {
        toast.success("Learning system created successfully!");
      }
      
      navigate(`/system/${newSystem.id}`);
    } catch (error) {
      console.error("Error creating system:", error);
      setErrorMessage("Failed to create learning system. Please try again.");
      toast.error("Failed to create learning system");
      setIsProcessing(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    systemName,
    setSystemName,
    syllabus,
    uploadedFile,
    setUploadedFile,
    uploadProgress,
    isProcessing,
    errorMessage,
    charCount,
    apiKeyDialogOpen,
    setApiKeyDialogOpen,
    geminiApiKey,
    setGeminiApiKey,
    savedApiKey,
    useAI,
    setUseAI,
    showApiGuide,
    setShowApiGuide,
    MAX_CHARS,
    handleTextChange,
    handleFileUpload,
    handleDragOver,
    handleDrop,
    saveApiKey,
    handleGenerateSystem
  };
};
