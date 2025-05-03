
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCandidates, getJobOpenings } from "@/services/jobPortalService";
import { Candidate, JobOpening } from "@/types/jobPortal";

import CandidatesList from "@/components/jobportal/CandidatesList";
import ValidationProcess from "@/components/jobportal/ValidationProcess";
import AcceptedCandidates from "@/components/jobportal/AcceptedCandidates";
import JobOpeningsList from "@/components/jobportal/JobOpeningsList";

const JobPortal = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidatesData, jobOpeningsData] = await Promise.all([
          getCandidates(),
          getJobOpenings()
        ]);
        
        setCandidates(candidatesData);
        setJobOpenings(jobOpeningsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCandidateStatusUpdate = (updatedCandidate: Candidate) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      )
    );
  };

  // Filter candidates by status
  const newCandidates = candidates.filter(c => c.status === 'new');
  const validatingCandidates = candidates.filter(c => c.status === 'validating');
  const acceptedCandidates = candidates.filter(c => c.status === 'accepted');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <h2 className="text-3xl font-bold">Manajemen Job Portal</h2>
      </div>

      <Tabs defaultValue="candidates" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="candidates">Data Kandidat ({newCandidates.length})</TabsTrigger>
          <TabsTrigger value="validation">Proses Validasi ({validatingCandidates.length})</TabsTrigger>
          <TabsTrigger value="accepted">Kandidat Diterima ({acceptedCandidates.length})</TabsTrigger>
          <TabsTrigger value="jobs">Lowongan Kerja</TabsTrigger>
        </TabsList>

        <TabsContent value="candidates">
          <CandidatesList 
            candidates={newCandidates} 
            isLoading={isLoading}
            onStatusUpdate={handleCandidateStatusUpdate}
          />
        </TabsContent>

        <TabsContent value="validation">
          <ValidationProcess 
            candidates={validatingCandidates}
            isLoading={isLoading}
            onStatusUpdate={handleCandidateStatusUpdate}
          />
        </TabsContent>

        <TabsContent value="accepted">
          <AcceptedCandidates 
            candidates={acceptedCandidates}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="jobs">
          <JobOpeningsList 
            jobOpenings={jobOpenings}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobPortal;
