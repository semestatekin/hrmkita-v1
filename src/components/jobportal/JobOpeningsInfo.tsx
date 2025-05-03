
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface JobOpening {
  id: number;
  title: string;
  description: string;
  requirements: string;
  deadline: string;
}

interface JobOpeningsInfoProps {
  jobOpenings: JobOpening[];
  onJobSelect: (jobId: number) => void;
}

const JobOpeningsInfo: React.FC<JobOpeningsInfoProps> = ({ jobOpenings, onJobSelect }) => {
  return (
    <div className="space-y-6">
      {jobOpenings.map((job) => (
        <Card key={job.id} className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-hrm-primary/10 to-hrm-secondary/10 pb-2">
            <CardTitle className="text-lg">{job.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 pb-2">
            <p className="text-sm mb-2">{job.description}</p>
            <div className="text-sm text-muted-foreground mb-3">
              <strong>Persyaratan:</strong> {job.requirements}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Tenggat: {job.deadline}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              size="sm"
              className="w-full"
              onClick={() => onJobSelect(job.id)}
            >
              Lamar Sekarang
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default JobOpeningsInfo;
