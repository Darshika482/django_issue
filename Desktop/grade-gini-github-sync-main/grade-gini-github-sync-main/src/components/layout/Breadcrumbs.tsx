
import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage 
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

interface BreadcrumbsProps {
  items?: Array<{
    label: string;
    path?: string;
  }>;
  currentPageLabel?: string;
}

const pathMap: Record<string, string> = {
  'dashboard': 'Dashboard',
  'notes': 'Notes',
  'about': 'About',
  'all-systems': 'Learning Systems',
  'planner': 'Task Planner',
  'ai-syllabus-creator': 'AI Syllabus Creator',
  'system': 'System Details'
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, currentPageLabel }) => {
  // Temporarily disable breadcrumbs until path issues are fixed
  return null;
  
  /* Original breadcrumbs code - commented out as per user request
  const location = useLocation();
  const params = useParams();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Generate breadcrumbs from the current path if not provided
  const breadcrumbs = items || pathnames.map((path, index) => {
    // Check if this is an ID segment
    const isIdSegment = /^\d+$/.test(path);
    
    // If it's an ID segment and we have a currentPageLabel, skip this segment
    // It will be added separately at the end
    if (isIdSegment && currentPageLabel) {
      return null;
    }
    
    // Build the URL up to this point in the path
    const url = `/${pathnames.slice(0, index + 1).join('/')}`;
    
    // Special case for system/{id} path
    if (path === 'system' && !isIdSegment) {
      // For the 'system' segment when it's followed by an ID, link back to all-systems
      return {
        label: 'Learning Systems',
        path: '/all-systems'
      };
    }
    
    // Get the label from pathMap or format the path
    const label = pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    
    return {
      label,
      path: url
    };
  }).filter(Boolean) as Array<{ label: string; path: string }>;

  return (
    <Breadcrumb className="py-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <React.Fragment key={breadcrumb.path}>
              <BreadcrumbItem>
                {isLast && !currentPageLabel ? (
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              
              {!isLast && <BreadcrumbSeparator />}
              
              {isLast && currentPageLabel && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{currentPageLabel}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
  */
};

export default Breadcrumbs;
