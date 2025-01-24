import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, Users, TrendingUp, Edit2, Check, X } from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  customers: Array<{
    id: string;
    name: string;
    value: string;
    probability: number;
  }>;
}

const initialStages: PipelineStage[] = [
  {
    id: '1',
    name: 'Lead',
    customers: [
      {
        id: '1',
        name: 'Tech Solutions Inc',
        value: '$50,000',
        probability: 20
      },
      {
        id: '2',
        name: 'Global Systems',
        value: '$75,000',
        probability: 25
      }
    ]
  },
  {
    id: '2',
    name: 'Contact Made',
    customers: [
      {
        id: '3',
        name: 'Digital Dynamics',
        value: '$100,000',
        probability: 40
      }
    ]
  },
  {
    id: '3',
    name: 'Proposal Sent',
    customers: [
      {
        id: '4',
        name: 'Innovation Labs',
        value: '$150,000',
        probability: 60
      },
      {
        id: '5',
        name: 'Future Corp',
        value: '$200,000',
        probability: 65
      }
    ]
  },
  {
    id: '4',
    name: 'Negotiation',
    customers: [
      {
        id: '6',
        name: 'Enterprise Solutions',
        value: '$300,000',
        probability: 80
      }
    ]
  },
  {
    id: '5',
    name: 'Closed Won',
    customers: [
      {
        id: '7',
        name: 'Mega Corp',
        value: '$250,000',
        probability: 100
      }
    ]
  }
];

export const SalesPipeline = () => {
  const [stages, setStages] = useState<PipelineStage[]>(initialStages);
  const [editingCustomer, setEditingCustomer] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<{
    name?: string;
    value?: string;
    probability?: number;
  }>({});

  const getTotalValue = (customers: PipelineStage['customers']) => {
    return customers.reduce((total, customer) => {
      const value = parseFloat(customer.value.replace(/[$,]/g, ''));
      return total + value;
    }, 0);
  };

  const handleEditStart = (customer: PipelineStage['customers'][0]) => {
    setEditingCustomer(customer.id);
    setEditedValues({
      name: customer.name,
      value: customer.value.replace('$', ''),
      probability: customer.probability,
    });
  };

  const handleEditSave = () => {
    setStages(prevStages => 
      prevStages.map(stage => ({
        ...stage,
        customers: stage.customers.map(customer => 
          customer.id === editingCustomer
            ? {
                ...customer,
                name: editedValues.name || customer.name,
                value: `$${editedValues.value || customer.value.replace('$', '')}`,
                probability: Number(editedValues.probability) || customer.probability,
              }
            : customer
        ),
      }))
    );
    setEditingCustomer(null);
    setEditedValues({});
  };

  const handleEditCancel = () => {
    setEditingCustomer(null);
    setEditedValues({});
  };

  const handleDragStart = (e: React.DragEvent, customerId: string, fromStageId: string) => {
    e.dataTransfer.setData('customerId', customerId);
    e.dataTransfer.setData('fromStageId', fromStageId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toStageId: string) => {
    e.preventDefault();
    const customerId = e.dataTransfer.getData('customerId');
    const fromStageId = e.dataTransfer.getData('fromStageId');

    if (fromStageId === toStageId) return;

    setStages(prevStages => {
      const fromStage = prevStages.find(s => s.id === fromStageId);
      const customer = fromStage?.customers.find(c => c.id === customerId);
      
      if (!fromStage || !customer) return prevStages;

      return prevStages.map(stage => {
        if (stage.id === fromStageId) {
          return {
            ...stage,
            customers: stage.customers.filter(c => c.id !== customerId),
          };
        }
        if (stage.id === toStageId) {
          return {
            ...stage,
            customers: [...stage.customers, customer],
          };
        }
        return stage;
      });
    });
  };

  return (
    <Card className="w-full max-w-6xl mx-auto my-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Sales Pipeline</CardTitle>
            <CardDescription>Track your deals through different stages</CardDescription>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <div className="text-sm">
                <div className="font-medium">Total Value</div>
                <div className="text-muted-foreground">
                  ${getTotalValue(stages.flatMap(s => s.customers)).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <div className="text-sm">
                <div className="font-medium">Total Deals</div>
                <div className="text-muted-foreground">
                  {stages.reduce((total, stage) => total + stage.customers.length, 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="bg-secondary/50 p-4 rounded-lg"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{stage.name}</h3>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {stage.customers.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {stage.customers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No deals yet
                  </p>
                ) : (
                  stage.customers.map((customer) => (
                    <Card 
                      key={customer.id}
                      className="p-3 hover:shadow-md transition-shadow cursor-move"
                      draggable
                      onDragStart={(e) => handleDragStart(e, customer.id, stage.id)}
                    >
                      {editingCustomer === customer.id ? (
                        <div className="space-y-2">
                          <Input
                            value={editedValues.name}
                            onChange={(e) => setEditedValues(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Company name"
                          />
                          <Input
                            value={editedValues.value}
                            onChange={(e) => setEditedValues(prev => ({ ...prev, value: e.target.value }))}
                            placeholder="Deal value"
                          />
                          <Input
                            type="number"
                            value={editedValues.probability}
                            onChange={(e) => setEditedValues(prev => ({ ...prev, probability: Number(e.target.value) }))}
                            placeholder="Probability %"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleEditSave}>
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleEditCancel}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">{customer.name}</div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditStart(customer)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <DollarSign className="w-3 h-3" />
                            {customer.value}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <TrendingUp className="w-3 h-3" />
                            {customer.probability}% probability
                          </div>
                        </>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};