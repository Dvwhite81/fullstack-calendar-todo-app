export interface UserType {
  _id: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: UserType;
  token?: string;
}

export interface UserResult {
  success: boolean;
  message: string;
}

export interface ToDoFormData {
  title: string;
  urgency: string;
  color: string;
}

export interface ToDoType extends ToDoFormData {
  _id: string;
}

export interface EventFormData {
  description: string;
  allDay: boolean;
  start: Date;
  end: Date;
}

export interface EventType extends EventFormData {
  _id: string;
}

export interface EventStyleType {
  style: {
    backgroundColor: string | undefined;
    borderColor: string | undefined;
  };
}

export interface CurrentDayType {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  selected: boolean;
  year: number;
}
