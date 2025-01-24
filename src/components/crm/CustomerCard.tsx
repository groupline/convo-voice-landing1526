import React from 'react';
import { Card } from "@/components/ui/card";
import { User, Building2, Phone, Mail, Clock } from 'lucide-react';
import type { Customer } from '@/types/customer';

interface CustomerCardProps {
  customer: Customer;
  isSelected: boolean;
  onClick: () => void;
}

export const CustomerCard = ({ customer, isSelected, onClick }: CustomerCardProps) => {
  return (
    <Card 
      className={`p-4 mb-2 cursor-pointer transition-all ${
        isSelected ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-gray-500" />
            <h3 className="font-medium">{`${customer.firstName} ${customer.lastName}`}</h3>
          </div>
          
          {customer.company && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Building2 className="w-4 h-4" />
              <span>{customer.company}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Phone className="w-4 h-4" />
            <span>{customer.phone || 'No phone'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Mail className="w-4 h-4" />
            <span>{customer.email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Last Contact: {new Date(customer.lastContact).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className={`px-2 py-1 rounded-full text-xs ${
            customer.lifecycle_stage === 'customer' ? 'bg-green-100 text-green-800' :
            customer.lifecycle_stage === 'opportunity' ? 'bg-purple-100 text-purple-800' :
            customer.lifecycle_stage === 'sales_qualified_lead' ? 'bg-blue-100 text-blue-800' :
            customer.lifecycle_stage === 'marketing_qualified_lead' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {customer.lifecycle_stage?.replace(/_/g, ' ').toUpperCase() || 'LEAD'}
          </span>
          
          {customer.deal_value && (
            <span className="text-sm font-medium text-gray-600 mt-2">
              ${customer.deal_value.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};