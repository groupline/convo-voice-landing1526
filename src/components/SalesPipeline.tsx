import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    customers: []
  },
  {
    id: '2',
    name: 'Contact Made',
    customers: []
  },
  {
    id: '3',
    name: 'Proposal Sent',
    customers: []
  },
  {
    id: '4',
    name: 'Negotiation',
    customers: []
  },
  {
    id: '5',
    name: 'Closed Won',
    customers: []
  }
];

export const SalesPipeline = () => {
  const [stages] = React.useState<PipelineStage[]>(initialStages);

  return (
    <Card className="w-full max-w-6xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Sales Pipeline</CardTitle>
        <CardDescription>Track your deals through different stages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="bg-muted p-4 rounded-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{stage.name}</h3>
                <Badge variant="secondary">
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
                    <Card key={customer.id} className="p-3">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Value: {customer.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Probability: {customer.probability}%
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