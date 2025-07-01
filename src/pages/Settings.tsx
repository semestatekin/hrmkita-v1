
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyProfile } from "@/components/settings/CompanyProfile";
import { UserManagement } from "@/components/settings/UserManagement";
import { RolePermissions } from "@/components/settings/RolePermissions";

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Pengaturan Sistem</h2>
        <p className="text-gray-600 mt-2">Kelola profil perusahaan, pengguna, dan hak akses sistem</p>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="company">Profil Perusahaan</TabsTrigger>
          <TabsTrigger value="users">Manajemen Pengguna</TabsTrigger>
          <TabsTrigger value="roles">Hak Akses & Peran</TabsTrigger>
        </TabsList>
        
        <TabsContent value="company" className="mt-6">
          <CompanyProfile />
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="roles" className="mt-6">
          <RolePermissions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
