export interface Reminder {
    id: number;
    userId: number;
    title: string;
    content?: string; 
    triggerType: string;
    triggerTargetId?: number;
    time?: string;
    isRead: boolean;
    // isDone: boolean;
    createdAt: string;
  }
  