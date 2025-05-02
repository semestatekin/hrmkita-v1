
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { 
  defaultDeductionSettings
} from "@/utils/payrollCalculations";

interface DeductionSettingsProps {
  onChange: (settings: any) => void;
}

const DeductionSettings: React.FC<DeductionSettingsProps> = ({ onChange }) => {
  const [settings, setSettings] = useState({
    ...defaultDeductionSettings
  });
  
  const handleChange = (field: string, value: any) => {
    const newSettings = { ...settings, [field]: value };
    setSettings(newSettings);
    onChange(newSettings);
  };

  return (
    <Card className="p-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="settings">
          <AccordionTrigger>Pengaturan Potongan</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="usePercentage">Gunakan Persentase</Label>
                <Switch
                  id="usePercentage"
                  checked={settings.usePercentage}
                  onCheckedChange={(value) => handleChange("usePercentage", value)}
                />
              </div>
              
              {settings.usePercentage ? (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="absenceRate">Persentase Potongan Ketidakhadiran (%)</Label>
                    <Input
                      id="absenceRate"
                      type="number"
                      value={settings.absenceRate}
                      onChange={(e) => handleChange("absenceRate", parseFloat(e.target.value))}
                      min={0}
                      max={100}
                    />
                    <p className="text-xs text-muted-foreground">
                      Persentase dari gaji harian untuk setiap ketidakhadiran
                    </p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="lateRate">Persentase Potongan Keterlambatan (%)</Label>
                    <Input
                      id="lateRate"
                      type="number"
                      value={settings.lateRate}
                      onChange={(e) => handleChange("lateRate", parseFloat(e.target.value))}
                      min={0}
                      max={100}
                    />
                    <p className="text-xs text-muted-foreground">
                      Persentase dari gaji harian untuk setiap keterlambatan
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="absenceFlatAmount">Potongan Tetap per Ketidakhadiran</Label>
                    <Input
                      id="absenceFlatAmount"
                      type="number"
                      value={settings.absenceFlatAmount}
                      onChange={(e) => handleChange("absenceFlatAmount", parseInt(e.target.value))}
                      min={0}
                    />
                    <p className="text-xs text-muted-foreground">
                      Jumlah tetap yang dipotong untuk setiap ketidakhadiran (Rp)
                    </p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="lateFlatAmount">Potongan Tetap per Keterlambatan</Label>
                    <Input
                      id="lateFlatAmount"
                      type="number"
                      value={settings.lateFlatAmount}
                      onChange={(e) => handleChange("lateFlatAmount", parseInt(e.target.value))}
                      min={0}
                    />
                    <p className="text-xs text-muted-foreground">
                      Jumlah tetap yang dipotong untuk setiap keterlambatan (Rp)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default DeductionSettings;
