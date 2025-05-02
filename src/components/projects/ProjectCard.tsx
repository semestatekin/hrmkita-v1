
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project, statusColors, statusLabels } from "@/types/project";
import { CalendarRange, Clock, Briefcase, Users, Edit, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
  onView: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onView,
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
            <h3 className="font-bold text-lg">{project.name}</h3>
            <Badge className={`${statusColors[project.status]} text-white`}>
              {statusLabels[project.status]}
            </Badge>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <CalendarRange className="h-4 w-4 mr-2 text-gray-500" />
              <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
            </div>
            <div className="flex items-center text-sm">
              <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
              <span>Klien: {project.client}</span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-gray-500" />
              <span>Tim: {project.team.length} anggota</span>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm flex justify-between">
              <span>Kemajuan</span>
              <span>{project.progress}%</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="border-t p-3 bg-gray-50 flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8"
            onClick={() => onView(project)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8"
            onClick={() => onEdit(project)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
