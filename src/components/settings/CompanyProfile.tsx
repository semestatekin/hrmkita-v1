
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyData {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  logo: string;
  npwp: string;
  siup: string;
}

export const CompanyProfile: React.FC = () => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "PT. Contoh Perusahaan",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    phone: "+62 21 1234567",
    email: "info@contohperusahaan.com",
    website: "www.contohperusahaan.com",
    description: "Perusahaan teknologi yang bergerak di bidang pengembangan software",
    logo: "",
    npwp: "01.234.567.8-901.000",
    siup: "123/SIUP/2023"
  });

  const { toast } = useToast();

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Berhasil",
        description: "Profil perusahaan berhasil diperbarui",
      });
    }, 500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Profil Perusahaan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="company-name">Nama Perusahaan</Label>
              <Input
                id="company-name"
                value={companyData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Masukkan nama perusahaan"
              />
            </div>

            <div>
              <Label htmlFor="company-phone">Nomor Telepon</Label>
              <Input
                id="company-phone"
                value={companyData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Masukkan nomor telepon"
              />
            </div>

            <div>
              <Label htmlFor="company-email">Email</Label>
              <Input
                id="company-email"
                type="email"
                value={companyData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Masukkan email perusahaan"
              />
            </div>

            <div>
              <Label htmlFor="company-website">Website</Label>
              <Input
                id="company-website"
                value={companyData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="Masukkan website perusahaan"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="company-npwp">NPWP</Label>
              <Input
                id="company-npwp"
                value={companyData.npwp}
                onChange={(e) => handleInputChange('npwp', e.target.value)}
                placeholder="Masukkan NPWP"
              />
            </div>

            <div>
              <Label htmlFor="company-siup">SIUP</Label>
              <Input
                id="company-siup"
                value={companyData.siup}
                onChange={(e) => handleInputChange('siup', e.target.value)}
                placeholder="Masukkan SIUP"
              />
            </div>

            <div>
              <Label>Logo Perusahaan</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-gray-400" />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Logo
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="company-address">Alamat</Label>
            <Textarea
              id="company-address"
              value={companyData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Masukkan alamat lengkap perusahaan"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="company-description">Deskripsi Perusahaan</Label>
            <Textarea
              id="company-description"
              value={companyData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Masukkan deskripsi perusahaan"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Simpan Perubahan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
