import Swal from "sweetalert2";
import { Reminder } from "../types/reminderType";
import axiosInstance from "../axiosInstance";

export const useReminderService = () => {
  const fetchReminders = async (): Promise<Reminder[]> => {
    try {
      const res = await axiosInstance.get("/reminders/shown");
      const data = res.data;

      if (!Array.isArray(data)) {
        console.warn("Expected array but got:", data);
        return [];
      }

      return data;
     } catch (e) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "לא ניתן לטעון תזכורות",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
  
      return [];
    }
  };

  const createReminder = async (reminder: {
    title: string;
    content?: string;
    time: string | Date;
  }) => {
    try {
      await axiosInstance.post("/reminders", {
        title: reminder.title,
        content: reminder.content,
        time: new Date(reminder.time).toISOString(),
      });
    } catch (e: any) {
      Swal.fire("שגיאה", "לא ניתן להוסיף תזכורת", "error");
      throw e;
    }
  };

  const markAsDone = async (id: number) => {
    try {
      await axiosInstance.post(`/reminders/${id}/done`);
    } catch (e: any) {
      Swal.fire("שגיאה", "לא ניתן לסמן את התזכורת כבוצעה", "error");
      throw e;
    }
  };

  const deleteReminder = async (id: number) => {
    try {
      await axiosInstance.delete(`/reminders/${id}`);
    } catch (e: any) {
      Swal.fire("שגיאה", "לא ניתן למחוק את התזכורת", "error");
      throw e;
    }
  };

  return {
    fetchReminders,
    createReminder,
    markAsDone,
    deleteReminder,
  };
};
