
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Employee, statusColors, statusLabels } from "@/types/employee";
import { Mail, Phone, Calendar, Building, Edit, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  onViewDetails: (employee: Employee) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Avatar className="h-12 w-12">
                {employee.avatar ? (
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                ) : (
                  <AvatarFallback className="bg-gray-200 text-gray-600">
                    {employee.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="ml-4">
                <h3 className="font-bold text-lg">{employee.name}</h3>
                <p className="text-sm text-gray-500">{employee.position}</p>
              </div>
            </div>
            <Badge className={`${statusColors[employee.status]} text-white`}>
              {statusLabels[employee.status]}
            </Badge>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              <span>{employee.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              <span>{employee.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <Building className="h-4 w-4 mr-2 text-gray-500" />
              <span>{employee.department}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span>Bergabung: {formatDate(employee.joinDate)}</span>
            </div>
          </div>
        </div>
        <div className="border-t p-3 bg-gray-50 flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8"
            onClick={() => onViewDetails(employee)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8"
            onClick={() => onEdit(employee)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(employee.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
