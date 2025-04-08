
interface PriorityInfo {
  label: string;
  bgColor: string;
  textColor: string;
}

export const getTaskPriorityInfo = (priority: string = 'medium'): PriorityInfo => {
  const priorityInfo: Record<string, PriorityInfo> = {
    high: {
      label: 'High',
      bgColor: 'bg-red-100',
      textColor: 'text-red-700'
    },
    medium: {
      label: 'Medium',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700'
    },
    low: {
      label: 'Low',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700'
    }
  };

  return priorityInfo[priority.toLowerCase()] || priorityInfo.medium;
};
