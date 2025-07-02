
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Plus, Edit, Trash2, Target } from 'lucide-react';
import { getObjectives, getKeyResultsByObjectiveId, deleteObjective, deleteKeyResult } from '@/services/performanceService';
import { OKRObjective, KeyResult, statusColors, statusLabels } from '@/types/performance';
import { toast } from "sonner";
import OKRForm from './OKRForm';
import KeyResultForm from './KeyResultForm';

const OKRList: React.FC = () => {
  const [objectives, setObjectives] = useState<OKRObjective[]>(getObjectives());
  const [searchTerm, setSearchTerm] = useState('');
  const [isObjectiveDialogOpen, setIsObjectiveDialogOpen] = useState(false);
  const [isKeyResultDialogOpen, setIsKeyResultDialogOpen] = useState(false);
  const [editingObjective, setEditingObjective] = useState<OKRObjective | undefined>(undefined);
  const [editingKeyResult, setEditingKeyResult] = useState<KeyResult | undefined>(undefined);
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string>('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteObjective = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus objektif ini beserta semua hasil kunci terkait?')) {
      deleteObjective(id);
      setObjectives(getObjectives());
      toast.success('Objektif berhasil dihapus');
    }
  };

  const handleEditObjective = (objective: OKRObjective) => {
    setEditingObjective(objective);
    setIsObjectiveDialogOpen(true);
  };

  const handleAddObjective = () => {
    setEditingObjective(undefined);
    setIsObjectiveDialogOpen(true);
  };

  const handleAddKeyResult = (objectiveId: string) => {
    setSelectedObjectiveId(objectiveId);
    setEditingKeyResult(undefined);
    setIsKeyResultDialogOpen(true);
  };

  const handleEditKeyResult = (keyResult: KeyResult) => {
    setEditingKeyResult(keyResult);
    setSelectedObjectiveId(keyResult.objectiveId);
    setIsKeyResultDialogOpen(true);
  };

  const handleDeleteKeyResult = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus key result ini?')) {
      deleteKeyResult(id);
      setObjectives(getObjectives());
      toast.success('Key Result berhasil dihapus');
    }
  };

  const handleObjectiveFormSuccess = () => {
    setObjectives(getObjectives());
    setIsObjectiveDialogOpen(false);
    setEditingObjective(undefined);
    toast.success(editingObjective ? 'Objektif berhasil diperbarui' : 'Objektif berhasil ditambahkan');
  };

  const handleKeyResultFormSuccess = () => {
    setObjectives(getObjectives());
    setIsKeyResultDialogOpen(false);
    setEditingKeyResult(undefined);
    setSelectedObjectiveId('');
    toast.success(editingKeyResult ? 'Key Result berhasil diperbarui' : 'Key Result berhasil ditambahkan');
  };

  const handleObjectiveFormCancel = () => {
    setIsObjectiveDialogOpen(false);
    setEditingObjective(undefined);
  };

  const handleKeyResultFormCancel = () => {
    setIsKeyResultDialogOpen(false);
    setEditingKeyResult(undefined);
    setSelectedObjectiveId('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredObjectives = objectives.filter(objective => 
    objective.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    objective.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Objectives & Key Results (OKR)</CardTitle>
          <Button onClick={handleAddObjective}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Objektif
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Cari OKR..." 
                className="pl-9" 
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {filteredObjectives.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredObjectives.map((objective) => (
                <ObjectiveItem 
                  key={objective.id} 
                  objective={objective} 
                  onDelete={handleDeleteObjective}
                  onEdit={handleEditObjective}
                  onAddKeyResult={handleAddKeyResult}
                  onEditKeyResult={handleEditKeyResult}
                  onDeleteKeyResult={handleDeleteKeyResult}
                />
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'Tidak ada OKR yang sesuai dengan pencarian' : 'Belum ada data OKR'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Objective Dialog */}
      <Dialog open={isObjectiveDialogOpen} onOpenChange={setIsObjectiveDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingObjective ? 'Edit Objektif' : 'Tambah Objektif Baru'}
            </DialogTitle>
          </DialogHeader>
          <OKRForm
            objective={editingObjective}
            onSuccess={handleObjectiveFormSuccess}
            onCancel={handleObjectiveFormCancel}
          />
        </DialogContent>
      </Dialog>

      {/* Key Result Dialog */}
      <Dialog open={isKeyResultDialogOpen} onOpenChange={setIsKeyResultDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingKeyResult ? 'Edit Key Result' : 'Tambah Key Result Baru'}
            </DialogTitle>
          </DialogHeader>
          <KeyResultForm
            keyResult={editingKeyResult}
            objectiveId={selectedObjectiveId}
            onSuccess={handleKeyResultFormSuccess}
            onCancel={handleKeyResultFormCancel}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

const ObjectiveItem: React.FC<{ 
  objective: OKRObjective; 
  onDelete: (id: string) => void;
  onEdit: (objective: OKRObjective) => void;
  onAddKeyResult: (objectiveId: string) => void;
  onEditKeyResult: (keyResult: KeyResult) => void;
  onDeleteKeyResult: (id: string) => void;
}> = ({ objective, onDelete, onEdit, onAddKeyResult, onEditKeyResult, onDeleteKeyResult }) => {
  const [keyResults] = useState<KeyResult[]>(() => 
    getKeyResultsByObjectiveId(objective.id)
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <AccordionItem value={objective.id} className="border rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between px-4">
        <AccordionTrigger className="hover:no-underline py-4 flex-1">
          <div className="flex items-start gap-4 text-left">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">{objective.title}</span>
                <Badge className={`${statusColors[objective.status]} text-white ml-2`}>
                  {statusLabels[objective.status]}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">{objective.description}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span>Penugasan: {objective.assigneeName}</span>
                <span>•</span>
                <span>{formatDate(objective.startDate)} - {formatDate(objective.endDate)}</span>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        
        <div className="flex items-center gap-4 mr-2">
          <div className="text-right w-24">
            <div className="text-lg font-bold">{objective.progress}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${objective.progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(objective);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(objective.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <AccordionContent className="border-t pt-0">
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold">Key Results</h4>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onAddKeyResult(objective.id)}
            >
              <Plus className="h-3 w-3 mr-1" /> Tambah Key Result
            </Button>
          </div>
          
          {keyResults.length > 0 ? (
            <div className="space-y-3">
              {keyResults.map((keyResult) => (
                <KeyResultItem 
                  key={keyResult.id} 
                  keyResult={keyResult} 
                  onEdit={onEditKeyResult}
                  onDelete={onDeleteKeyResult}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              Belum ada key result untuk objektif ini
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const KeyResultItem: React.FC<{ 
  keyResult: KeyResult;
  onEdit: (keyResult: KeyResult) => void;
  onDelete: (id: string) => void;
}> = ({ keyResult, onEdit, onDelete }) => {
  const formatValue = (value: number, unit: string) => {
    if (unit === 'Rupiah') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(value);
    } else if (unit === '%') {
      return `${value}%`;
    } else {
      return `${value} ${unit}`;
    }
  };

  return (
    <div className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100">
      <div className="flex justify-between">
        <div>
          <div className="font-medium flex items-center gap-2">
            <Target className="h-4 w-4 text-gray-400" />
            {keyResult.title}
          </div>
          <p className="text-sm text-gray-500 mt-1">{keyResult.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm">
              <span className="font-medium">{formatValue(keyResult.currentValue, keyResult.unit)}</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-500">{formatValue(keyResult.targetValue, keyResult.unit)}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{ width: `${keyResult.progress}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium">{keyResult.progress}%</span>
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => onEdit(keyResult)}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => onDelete(keyResult.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OKRList;
