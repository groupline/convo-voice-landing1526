import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Plus, FileText } from 'lucide-react';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  lastContact: string;
  status: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  notes?: string;
}

interface CustomerDocument {
  id: string;
  file_name: string;
  file_path: string;
  uploaded_at: string;
}

export const CRM = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [documents, setDocuments] = useState<CustomerDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*');
      
      if (error) throw error;
      setCustomers(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch customers",
        variant: "destructive",
      });
    }
  };

  const fetchCustomerDocuments = async (customerId: string) => {
    try {
      const { data, error } = await supabase
        .from('customer_documents')
        .select('*')
        .eq('customer_id', customerId);
      
      if (error) throw error;
      setDocuments(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch customer documents",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (customerId: string, file: File) => {
    try {
      setIsLoading(true);
      
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${customerId}/${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('customer_documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create document record
      const { error: dbError } = await supabase
        .from('customer_documents')
        .insert({
          customer_id: customerId,
          file_name: file.name,
          file_path: filePath,
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      // Refresh documents list
      await fetchCustomerDocuments(customerId);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerClick = async (customer: Customer) => {
    setSelectedCustomer(customer);
    await fetchCustomerDocuments(customer.id);
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName} ${customer.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full max-w-6xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Customer Relationship Management</CardTitle>
        <CardDescription>Manage your customer relationships and track interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow 
                      key={customer.id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCustomerClick(customer)}
                    >
                      <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.status}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {selectedCustomer && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              
              <div className="space-y-2">
                <h4 className="font-medium">Address</h4>
                <Input
                  placeholder="Street Address"
                  value={selectedCustomer.street_address || ''}
                  readOnly
                />
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="City"
                    value={selectedCustomer.city || ''}
                    readOnly
                  />
                  <Input
                    placeholder="State"
                    value={selectedCustomer.state || ''}
                    readOnly
                  />
                  <Input
                    placeholder="ZIP Code"
                    value={selectedCustomer.zip_code || ''}
                    readOnly
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Notes</h4>
                <Textarea
                  placeholder="Customer notes..."
                  value={selectedCustomer.notes || ''}
                  readOnly
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Documents</h4>
                <div className="border rounded-md p-4">
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>{doc.file_name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <label className="mt-4 flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
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
                          handleFileUpload(selectedCustomer.id, file);
                        }
                      }}
                      disabled={isLoading}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};