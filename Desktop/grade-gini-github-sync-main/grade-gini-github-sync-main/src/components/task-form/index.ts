
import TaskFormDialog from './TaskFormDialog';
import TaskBasicInfo from './TaskBasicInfo';
import TaskDateTimeSection from './TaskDateTimeSection';
import TaskCategorySection from './TaskCategorySection';
import TaskSubtasksSection from './TaskSubtasksSection';
import TaskProductivitySection from './TaskProductivitySection';
import { useTaskForm } from './hooks/useTaskForm';
import type { TaskFormData } from './hooks/useTaskForm';

export {
  TaskFormDialog,
  TaskBasicInfo,
  TaskDateTimeSection,
  TaskCategorySection,
  TaskSubtasksSection,
  TaskProductivitySection,
  useTaskForm
};

// Export the type with the proper syntax
export type { TaskFormData };
