
# Import Migration Guide

The following imports should be updated throughout the codebase:

## Current (deprecated)
```typescript
import { useTaskContext } from '@/store/TaskContext';
```

## New (recommended)
```typescript
import { useTaskContext } from '@/store/task';
```

This change should be made gradually to maintain backward compatibility while transitioning to the new structure.

## Context Structure Update

The planner context has been split into separate contexts for state and handlers:

```typescript
// For state only
import { usePlannerStateContext } from '@/components/planner/PlannerStateContext';

// For handlers only
import { usePlannerHandlersContext } from '@/components/planner/PlannerHandlersContext';

// For both (compatibility)
import { usePlannerContext } from '@/components/planner/PlannerContext';
```

Components that only need state or only need handlers can import just what they need.
