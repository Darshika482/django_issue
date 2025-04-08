
import { Task, TaskCategory, TaskPriority, SubTask } from '@/types';

interface GeminiModule {
  title: string;
  description: string;
  isCompleted: boolean;
}

interface GeminiResponse {
  modules: GeminiModule[];
  tasks: Task[][];
}

export const generateLearningSystem = async (
  apiKey: string,
  systemName: string,
  description: string
): Promise<GeminiResponse> => {
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
  
  const prompt = `
  Create a detailed learning system for "${systemName}" based on this description:
  "${description}"
  
  IMPORTANT: Create EXACTLY 3 learning modules, each with EXACTLY 5 specific tasks.
  
  Please format your response STRICTLY as a JSON object with this exact structure:
  {
    "modules": [
      {
        "title": "Module 1 Title (be specific, clear, and descriptive)",
        "description": "Detailed description of the module's content and objectives",
        "isCompleted": false
      },
      // 2 more modules
    ],
    "tasks": [
      [
        {
          "title": "Task 1 Title for Module 1 (be specific)",
          "description": "Very detailed task description with clear instructions",
          "date": "YYYY-MM-DD" (a realistic date within the next 3 months),
          "priority": "medium" (must be "low", "medium", or "high")
        },
        // 4 more tasks for Module 1
      ],
      // Tasks for Module 2
      // Tasks for Module 3
    ]
  }
  
  REQUIREMENTS:
  1. Each module MUST have a clear, specific title (not generic like "Introduction").
  2. Each module MUST have EXACTLY 5 tasks.
  3. Each task MUST have a descriptive title and thorough description.
  4. Task descriptions MUST be highly detailed (at least 2-3 sentences).
  5. Make the content highly specific to "${systemName}".
  6. Each task MUST include a priority field with value "low", "medium", or "high".
  7. All dates MUST be in YYYY-MM-DD format.
  8. DO NOT use placeholder text or generic content.
  9. DO NOT include any explanations outside the JSON.
  10. ENSURE the JSON is valid and properly formatted.
  
  The entire response should ONLY be the JSON object, nothing else.
  `;

  try {
    console.log("Sending request to Gemini API with prompt:", prompt.substring(0, 200) + "...");
    
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
        },
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error response:", errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract the text from the response
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Clean up the text to ensure it's valid JSON
    const jsonStr = generatedText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    
    console.log("Raw JSON response from Gemini:", jsonStr);
    
    // Parse the JSON
    const parsedData = JSON.parse(jsonStr);
    
    // Validate the structure
    if (!parsedData.modules || !Array.isArray(parsedData.modules) || !parsedData.tasks || !Array.isArray(parsedData.tasks)) {
      console.error("Invalid response structure from Gemini:", parsedData);
      throw new Error("Invalid response structure from Gemini API");
    }
    
    // Ensure each module has exactly 5 tasks
    if (parsedData.tasks.some((moduleTasks: any[]) => !moduleTasks || moduleTasks.length !== 5)) {
      console.error("One or more modules don't have exactly 5 tasks:", parsedData.tasks);
      console.log("Fixing task array to ensure 5 tasks per module...");
      
      // Ensure each module has exactly 5 tasks
      for (let i = 0; i < parsedData.modules.length; i++) {
        if (!parsedData.tasks[i] || !Array.isArray(parsedData.tasks[i])) {
          parsedData.tasks[i] = [];
        }
        
        while (parsedData.tasks[i].length < 5) {
          parsedData.tasks[i].push({
            title: `Task ${parsedData.tasks[i].length + 1} for ${parsedData.modules[i].title}`,
            description: `Generated task for ${parsedData.modules[i].title}. Please complete this task as part of your learning journey.`,
            date: new Date(Date.now() + ((i * 5 + parsedData.tasks[i].length) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            priority: "medium"
          });
        }
        
        // Trim if there are more than 5 tasks
        if (parsedData.tasks[i].length > 5) {
          parsedData.tasks[i] = parsedData.tasks[i].slice(0, 5);
        }
      }
    }
    
    // Ensure dates are formatted properly for each task and all required fields are present
    const formattedTasks = parsedData.tasks.map((moduleTasks: any[]) => {
      return moduleTasks.map((task: any) => {
        let taskDate = task.date;
        
        // Check if date is in MM/DD/YYYY format and convert to YYYY-MM-DD if needed
        if (taskDate && /^\d{2}\/\d{2}\/\d{4}$/.test(taskDate)) {
          const [month, day, year] = taskDate.split('/');
          taskDate = `${year}-${month}-${day}`;
        }
        
        // If no date or invalid, use today's date
        if (!taskDate || !/^\d{4}-\d{2}-\d{2}$/.test(taskDate)) {
          taskDate = new Date().toISOString().split('T')[0];
        }
        
        // Ensure task has a priority
        const priority = task.priority && ['low', 'medium', 'high'].includes(task.priority.toLowerCase()) 
          ? task.priority.toLowerCase() as TaskPriority 
          : 'medium' as TaskPriority;
        
        // Ensure task has a valid category (using 'study' as default)
        const category = 'study' as TaskCategory;
        
        return {
          id: crypto.randomUUID(),
          title: task.title || "Unnamed Task",
          description: task.description || "No description provided",
          date: taskDate,
          completed: false,
          priority: priority,
          category: category,
          subtasks: [] as SubTask[]
        };
      });
    });
    
    console.log("Formatted modules:", parsedData.modules);
    console.log("Formatted tasks:", formattedTasks);
    console.log(`Generated ${parsedData.modules.length} modules with ${formattedTasks.flat().length} total tasks`);
    
    return {
      modules: parsedData.modules,
      tasks: formattedTasks
    };
  } catch (error) {
    console.error("Error generating learning system with Gemini:", error);
    
    // Generate a minimal fallback response with exactly 3 modules and 5 tasks each
    const fallbackResponse: GeminiResponse = {
      modules: [
        {
          title: `${systemName} Module 1: Foundations`,
          description: "Introduction to the foundational concepts of this learning system.",
          isCompleted: false
        },
        {
          title: `${systemName} Module 2: Core Skills`,
          description: "Development of essential skills and knowledge in this area.",
          isCompleted: false
        },
        {
          title: `${systemName} Module 3: Advanced Applications`,
          description: "Applying advanced concepts and techniques in real-world scenarios.",
          isCompleted: false
        }
      ],
      tasks: [
        // 5 tasks for Module 1
        [
          {
            id: crypto.randomUUID(),
            title: "Understand key terminology",
            description: "Research and create a glossary of the most important terms related to this subject. Focus on definitions that will be essential for your learning journey.",
            date: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'medium',
            category: 'study',
            subtasks: []
          },
          {
            id: crypto.randomUUID(),
            title: "Complete introductory reading",
            description: "Read the introductory materials for this subject. Take detailed notes on key concepts and identify areas where you need more clarification.",
            date: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'high',
            category: 'study',
            subtasks: []
          },
          {
            id: crypto.randomUUID(),
            title: "Watch foundation video lectures",
            description: "Complete the video lecture series that covers the foundational concepts. Make sure to pause and take notes on important points.",
            date: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'medium',
            category: 'study',
            subtasks: []
          },
          {
            id: crypto.randomUUID(),
            title: "Complete practice exercises",
            description: "Work through the basic practice exercises to reinforce your understanding of the foundational concepts. Identify areas where you need more practice.",
            date: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'medium',
            category: 'study',
            subtasks: []
          },
          {
            id: crypto.randomUUID(),
            title: "Take foundation concepts quiz",
            description: "Complete the self-assessment quiz to test your understanding of the foundation concepts. Review any questions you got wrong to improve your knowledge.",
            date: new Date(Date.now() + (9 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'high',
            category: 'study',
            subtasks: []
          }
        ],
        // 5 tasks for Module 2
        [
          {
            id: crypto.randomUUID(),
            title: "Study core principles",
            description: "Dive deeper into the core principles of this subject. Create summary notes and diagrams to visualize the relationships between key concepts.",
            date: new Date(Date.now() + (11 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'high',
            category: 'study',
            subtasks: []
          },
          {
            id: crypto.randomUUID(),
            title: "Apply concepts to simple problem",
            description: "Select a simple real-world problem and apply the concepts you've learned so far. Document your approach and solution in detail.",
            date: new Date(Date.now() + (13 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'medium',
            category: 'study',
            subtasks: []
          },
          {
            id: crypto.randomUUID(),
            title: "Participate in discussion forum",
            description: "Join the discussion forum and participate in conversations about core concepts. Ask questions and provide thoughtful responses to others.",
            date: new Date(Date.now() + (15 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'low',
            category: 'study',
            subtasks: []
          },
          {
            id: crypto.randomUUID(),
            title: "Complete intermediate exercises",
            description: "Work through the intermediate-level exercises to build on your foundational knowledge. Focus on applying concepts in different contexts.",
            date: new Date(Date.now() + (17 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'medium',
            category: 'study',
            subtasks: []
          },
          {
            id: crypto.randomUUID(),
            title: "Create visual concept map",
            description: "Develop a comprehensive concept map that connects all the core ideas in this module. Use colors and symbols to highlight relationships and hierarchies.",
            date: new Date(Date.now() + (19 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'medium',
            category: 'study',
            subtasks: []
          }
        ],
        // 5 tasks for Module 3
        [
          {
            id: crypto.randomUUID(),
            title: "Research advanced applications",
            description: "Research and document advanced applications of the concepts you've learned. Focus on real-world examples and case studies in your area of interest.",
            date: new Date(Date.now() + (21 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'medium',
            category: 'study',
            subtasks: []
          },
          {
            id: crypto.randomUUID(),
            title: "Complete challenging problem set",
            description: "Work through the set of challenging problems that require applying multiple concepts together. Document your problem-solving process step by step.",
            date: new Date(Date.now() + (23 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'high',
            category: 'study',
            subtasks: []
          },
          {
            id: crypto.randomUUID(),
            title: "Analyze case study",
            description: "Select a comprehensive case study and analyze it using the frameworks you've learned. Identify key insights and alternative approaches that could have been used.",
            date: new Date(Date.now() + (25 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'medium',
            category: 'study',
            subtasks: []
          },
          {
            id: crypto.randomUUID(),
            title: "Develop mini-project",
            description: "Create a mini-project that demonstrates your understanding of advanced concepts. Focus on practical application and documenting your implementation process.",
            date: new Date(Date.now() + (27 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'high',
            category: 'study',
            subtasks: []
          },
          {
            id: crypto.randomUUID(),
            title: "Complete comprehensive assessment",
            description: "Take the comprehensive assessment that covers all aspects of what you've learned. This will help identify any remaining knowledge gaps before completing the learning system.",
            date: new Date(Date.now() + (29 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            completed: false,
            priority: 'high',
            category: 'study',
            subtasks: []
          }
        ]
      ]
    };
    
    console.log("Using fallback response with predefined modules and tasks");
    return fallbackResponse;
  }
};
