
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEmployeeSelectOptions, populatePaySlipFromEmployee } from "@/services/paySlipService";

interface EmployeeOption {
  value: string;
  label: string;
  position: string;
  salary: string;
}

interface EmployeeSelectProps {
  onEmployeeSelect: (employeeData: any) => void;
  defaultValue?: string;
}

const EmployeeSelect: React.FC<EmployeeSelectProps> = ({ 
  onEmployeeSelect,
  defaultValue
}) => {
  const [employees, setEmployees] = useState<EmployeeOption[]>([]);

  useEffect(() => {
    const options = getEmployeeSelectOptions();
    setEmployees(options);
  }, []);

  const handleEmployeeChange = (employeeId: string) => {
    const employeeData = populatePaySlipFromEmployee(parseInt(employeeId));
    onEmployeeSelect(employeeData);
  };

  return (
    <Select 
      onValueChange={handleEmployeeChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih karyawan" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Karyawan</SelectLabel>
          {employees.map((employee) => (
            <SelectItem key={employee.value} value={employee.value}>
              {employee.label} - {employee.position}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default EmployeeSelect;
