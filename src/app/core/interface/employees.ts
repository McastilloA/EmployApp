export interface Dialog {
  data: Employee;
  action: number;
}

export interface Employee {
  id: string;
  name: string;
  lastName: string;
  position: string;
  dateBirth: string;
}

export interface Position {
  positions: string[];
}
