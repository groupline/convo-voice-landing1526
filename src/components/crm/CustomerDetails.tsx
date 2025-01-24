import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Plus } from 'lucide-react';
import type { Customer } from '@/types/customer';
import type { CustomerDocument } from '@/types/customer-document';

interface CustomerDetailsProps {
  customer: Customer;
  documents: CustomerDocument[];
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export const CustomerDetails = ({ 
  customer, 
  documents, 
  onFileUpload, 
  isLoading 
}: CustomerDetailsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="First Name"
              value={customer.firstName}
              readOnly
            />
            <Input
              placeholder="Last Name"
              value={customer.lastName}
              readOnly
            />
          </div>
          
          <Input
            placeholder="Email"
            value={customer.email}
            readOnly
          />
          
          <Input
            placeholder="Phone"
            value={customer.phone || ''}
            readOnly
          />
          
          <Input
            placeholder="Company"
            value={customer.company || ''}
            readOnly
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Stage"
              value={customer.lifecycle_stage?.replace(/_/g, ' ') || 'Lead'}
              readOnly
            />
            <Input
              placeholder="Deal Value"
              value={customer.deal_value ? `$${customer.deal_value.toLocaleString()}` : 'N/A'}
              readOnly
            />
          </div>
          
          <Input
            placeholder="Source"
            value={customer.source || 'N/A'}
            readOnly
          />
          
          <Input
            placeholder="Owner"
            value={customer.owner || 'N/A'}
            readOnly
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Street Address"
            value={customer.street_address || ''}
            readOnly
          />
          
          <div className="grid grid-cols-3 gap-4">
            <Input
              placeholder="City"
              value={customer.city || ''}
              readOnly
            />
            <Input
              placeholder="State"
              value={customer.state || ''}
              readOnly
            />
            <Input
              placeholder="ZIP Code"
              value={customer.zip_code || ''}
              readOnly
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Customer notes..."
            value={customer.notes || ''}
            readOnly
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>{doc.file_name}</span>
                </div>
              </div>
            ))}
            
            <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <div className="flex flex-col items-center space-y-2">
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Drop files to upload or click here
                </span>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onFileUpload(file);
                  }
                }}
                disabled={isLoading}
              />
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};