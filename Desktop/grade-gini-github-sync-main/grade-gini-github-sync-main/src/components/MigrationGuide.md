
# Migration Guide

## Deprecated Imports

The following import paths have been deprecated and should be updated:

### TaskContext

**Old import (deprecated):**
```typescript
import { useTaskContext, TaskContext, TaskProvider } from '@/store/TaskContext';
```

**New import:**
```typescript
import { useTaskContext, TaskContext, TaskProvider } from '@/store/task';
```

While the old import path still works for backward compatibility, it is recommended to update your imports to use the new path. The old import path will be removed in a future update.

### TaskFormDialog

**Old import (deprecated):**
```typescript
import TaskFormDialog from '@/components/TaskFormDialog';
```

**New import:**
```typescript
import TaskFormDialog from '@/components/task-form/TaskFormDialog';
```

### TaskCard

**Old import (deprecated):**
```typescript
import TaskCard from '@/components/TaskCard';
```

**New import:**
```typescript
import TaskCard from '@/components/task-card';
```

## API Return Type Changes

The Task API functions now return their proper types:
- `addTask` returns `Promise<Task>`
- `updateTask` returns `Promise<Task>`
- `deleteTask` returns `Promise<boolean>`
- `toggleTaskCompletion` returns `Promise<Task>`
- etc.

If you've implemented custom code that expects void returns from these functions, you may need to update it.

## Files that need to be updated:

1. Any component importing from `@/store/TaskContext.tsx`
2. Any component importing `TaskFormDialog`
3. Any component importing `TaskCard`

If you encounter any issues after migration, please check for console errors that might indicate further import paths that need to be updated.
