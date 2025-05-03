
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobOpeningsInfo from "@/components/jobportal/JobOpeningsInfo";
import JobApplicationForm from "@/components/jobportal/JobApplicationForm";

interface JobOpening {
  id: number;
  title: string;
  description: string;
  requirements: string;
  deadline: string;
}

interface JobPortalSectionProps {
  jobOpenings: JobOpening[];
}

const JobPortalSection: React.FC<JobPortalSectionProps> = ({ jobOpenings }) => {
  const [activeTab, setActiveTab] = useState("jobinfo");
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const handleJobSelect = (jobId: number) => {
    setSelectedJob(jobId);
    setActiveTab("apply");
  };

  const handleCancel = () => {
    setActiveTab("jobinfo");
    setSelectedJob(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-hrm-primary">Portal Lowongan Kerja</h2>
        <p className="text-muted-foreground">Temukan karir impian Anda bersama kami</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="jobinfo">Info Lowongan</TabsTrigger>
          <TabsTrigger value="apply">Formulir Lamaran</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobinfo" className="space-y-6">
          <JobOpeningsInfo jobOpenings={jobOpenings} onJobSelect={handleJobSelect} />
        </TabsContent>
        
        <TabsContent value="apply">
          <JobApplicationForm 
            jobOpenings={jobOpenings}
            selectedJob={selectedJob}
            onCancel={handleCancel}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobPortalSection;
