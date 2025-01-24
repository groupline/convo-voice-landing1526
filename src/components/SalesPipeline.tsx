import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, TrendingUp } from "lucide-react";

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
  const [stages] = React.useState<PipelineStage[]>(initialStages);

  const getTotalValue = (customers: PipelineStage['customers']) => {
    return customers.reduce((total, customer) => {
      const value = parseFloat(customer.value.replace(/[$,]/g, ''));
      return total + value;
    }, 0);
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
                    <Card key={customer.id} className="p-3 hover:shadow-md transition-shadow">
                      <div className="font-medium">{customer.name}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <DollarSign className="w-3 h-3" />
                        {customer.value}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        {customer.probability}% probability
                      </div>
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