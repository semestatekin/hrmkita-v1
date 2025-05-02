
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Project, statusColors, statusLabels } from "@/types/project";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Users, Briefcase, DollarSign, User } from "lucide-react";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onEdit: (project: Project) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onBack,
  onEdit,
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-3xl font-bold">Detail Proyek</h2>
        </div>
        <Button onClick={() => onEdit(project)}>Edit Proyek</Button>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="text-2xl font-bold">{project.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={`${statusColors[project.status]} text-white`}>
                  {statusLabels[project.status]}
                </Badge>
                <span className="text-gray-500">Klien: {project.client}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center px-3 py-1 rounded-md bg-blue-50 text-blue-700">
                <span className="font-medium">Kemajuan: {project.progress}%</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-lg">Informasi Proyek</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Durasi Proyek</p>
                    <p className="font-medium">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Klien</p>
                    <p className="font-medium">{project.client}</p>
                  </div>
                </div>
                
                {project.budget && (
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Anggaran</p>
                      <p className="font-medium">{project.budget}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Manajer Proyek</p>
                    <p className="font-medium">{project.manager}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-lg">Tim Proyek</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Anggota Tim ({project.team.length})</p>
                  </div>
                </div>
                <div className="pl-8 space-y-1">
                  {project.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                        {member.charAt(0)}
                      </div>
                      <span>{member}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold mb-3 text-lg">Progress Proyek</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Kemajuan</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold mb-3 text-lg">Deskripsi Proyek</h4>
            <p className="text-gray-700">{project.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetail;
