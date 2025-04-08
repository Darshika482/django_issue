
import { Task } from '@/types';

export const ncertClassTemplates: Record<number, {title: string; tasks: Omit<Task, 'id' | 'systemId'>[]}>  = {
  206: { // Class 6
    title: "Class 6",
    tasks: [
      {
        title: "Mathematics - Number Systems",
        description: "Understanding integers, fractions, and decimal numbers",
        date: new Date().toISOString().split('T')[0],
        time: "09:00",
        endTime: "10:30",
        completed: false,
        category: "study",
        priority: "high"
      },
      {
        title: "Science - Food and Components",
        description: "Learning about nutrients and balanced diet",
        date: new Date().toISOString().split('T')[0],
        time: "11:00",
        endTime: "12:30",
        completed: false,
        category: "study",
        priority: "medium"
      },
      {
        title: "Social Studies - History",
        description: "Ancient civilizations and their contributions",
        date: new Date().toISOString().split('T')[0],
        time: "14:00",
        endTime: "15:30",
        completed: false,
        category: "study",
        priority: "medium"
      }
    ]
  },
  207: { // Class 7
    title: "Class 7",
    tasks: [
      {
        title: "Mathematics - Algebra",
        description: "Linear equations and their applications",
        date: new Date().toISOString().split('T')[0],
        time: "09:00",
        endTime: "10:30",
        completed: false,
        category: "study",
        priority: "high"
      },
      {
        title: "Science - Physical and Chemical Changes",
        description: "Understanding differences between physical and chemical changes",
        date: new Date().toISOString().split('T')[0],
        time: "11:00",
        endTime: "12:30",
        completed: false,
        category: "study",
        priority: "medium"
      }
    ]
  },
  208: {
    title: "Class 8",
    tasks: [
      {
        title: "Mathematics - Rational Numbers",
        description: "Properties and operations on rational numbers",
        date: new Date().toISOString().split('T')[0],
        time: "09:00",
        endTime: "10:30",
        completed: false,
        category: "study",
        priority: "high"
      },
      {
        title: "Science - Crop Production and Management",
        description: "Agricultural practices and crop improvement",
        date: new Date().toISOString().split('T')[0],
        time: "11:00",
        endTime: "12:30",
        completed: false,
        category: "study",
        priority: "medium"
      }
    ]
  },
  209: {
    title: "Class 9",
    tasks: [
      {
        title: "Mathematics - Number System",
        description: "Real numbers and their decimal expansions",
        date: new Date().toISOString().split('T')[0],
        time: "09:00",
        endTime: "10:30",
        completed: false,
        category: "study",
        priority: "high"
      },
      {
        title: "Science - Matter in Our Surroundings",
        description: "States of matter and their properties",
        date: new Date().toISOString().split('T')[0],
        time: "11:00",
        endTime: "12:30",
        completed: false,
        category: "study",
        priority: "medium"
      }
    ]
  },
  210: {
    title: "Class 10",
    tasks: [
      {
        title: "Mathematics - Real Numbers",
        description: "Euclid's division lemma and fundamental theorem of arithmetic",
        date: new Date().toISOString().split('T')[0],
        time: "09:00",
        endTime: "10:30",
        completed: false,
        category: "study",
        priority: "high"
      },
      {
        title: "Science - Chemical Reactions and Equations",
        description: "Balancing chemical equations and types of reactions",
        date: new Date().toISOString().split('T')[0],
        time: "11:00",
        endTime: "12:30",
        completed: false,
        category: "study",
        priority: "medium"
      }
    ]
  },
  211: {
    title: "Class 11",
    tasks: [
      {
        title: "Physics - Units and Measurements",
        description: "Accuracy and precision of measuring instruments",
        date: new Date().toISOString().split('T')[0],
        time: "09:00",
        endTime: "10:30",
        completed: false,
        category: "study",
        priority: "high"
      },
      {
        title: "Chemistry - Some Basic Concepts of Chemistry",
        description: "Laws of chemical combination and mole concept",
        date: new Date().toISOString().split('T')[0],
        time: "11:00",
        endTime: "12:30",
        completed: false,
        category: "study",
        priority: "medium"
      }
    ]
  },
  212: { // Class 12
    title: "Class 12",
    tasks: [
      {
        title: "Physics - Wave Optics",
        description: "Study interference, diffraction and polarization",
        date: new Date().toISOString().split('T')[0],
        time: "09:00",
        endTime: "11:00",
        completed: false,
        category: "study",
        priority: "high"
      },
      {
        title: "Chemistry - Organic Chemistry",
        description: "Review reaction mechanisms and named reactions",
        date: new Date().toISOString().split('T')[0],
        time: "13:00",
        endTime: "15:00",
        completed: false,
        category: "study",
        priority: "high"
      },
      {
        title: "Mathematics - Calculus",
        description: "Practice integration by parts and substitution",
        date: new Date().toISOString().split('T')[0],
        time: "16:00",
        endTime: "18:00",
        completed: false,
        category: "study",
        priority: "medium"
      }
    ]
  }
};
