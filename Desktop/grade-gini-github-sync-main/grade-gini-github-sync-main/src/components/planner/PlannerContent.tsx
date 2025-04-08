
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListView from '@/components/views/ListView';
import MonthView from '@/components/views/MonthView';
import WeekView from '@/components/views/WeekView';
import { usePlannerContext } from './PlannerContext';

const PlannerContent: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    handleEditTask, 
    currentDate, 
    setCurrentDate
  } = usePlannerContext();
  
  const renderActiveView = () => {
    switch (activeView) {
      case 'week':
        return (
          <WeekView 
            onEditTask={handleEditTask}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
        );
      case 'month':
        return (
          <MonthView 
            onEditTask={handleEditTask}
          />
        );
      case 'list':
        return (
          <ListView 
            onEditTask={handleEditTask}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="planner-content flex-1 overflow-hidden">
      <Tabs 
        value={activeView} 
        onValueChange={(value) => setActiveView(value as any)}
        className="h-full flex flex-col planner-tabs"
      >
        <TabsContent value="week" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            {renderActiveView()}
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="month" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            {renderActiveView()}
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="list" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            {renderActiveView()}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlannerContent;
