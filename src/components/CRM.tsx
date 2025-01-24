import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CustomerCard } from './crm/CustomerCard';
import { CustomerDetails } from './crm/CustomerDetails';
import { useAuth } from "@/components/AuthProvider";
import type { Customer } from '@/types/customer';
import type { CustomerDocument } from '@/types/customer-document';

export const CRM = () => {
  const { toast } = useToast();
  const { session } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [documents, setDocuments] = useState<CustomerDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetchCustomers();
    }
  }, [session?.user?.id]);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('created_by', session?.user?.id);
      
      if (error) throw error;

      const mappedCustomers: Customer[] = (data || []).map(customer => ({
        id: customer.id,
        firstName: customer.first_name,
        lastName: customer.last_name,
        email: customer.email,
        phone: customer.phone || '',
        company: customer.company,
        lastContact: customer.last_contact || '',
        status: customer.status || 'new',
        street_address: customer.street_address,
        city: customer.city,
        state: customer.state,
        zip_code: customer.zip_code,
        notes: customer.notes,
        lifecycle_stage: (customer.lifecycle_stage as Customer['lifecycle_stage']) || 'lead',
        deal_value: customer.deal_value,
        source: customer.source,
        owner: customer.owner,
        website: customer.website
      }));
      
      setCustomers(mappedCustomers);
    } catch (error: any) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch customers: " + error.message,
        variant: "destructive",
      });
    }
  };

  const fetchCustomerDocuments = async (customerId: string) => {
    try {
      const { data, error } = await supabase
        .from('customer_documents')
        .select('*')
        .eq('customer_id', customerId)
        .eq('uploaded_by', session?.user?.id);
      
      if (error) throw error;
      setDocuments(data || []);
    } catch (error: any) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to fetch customer documents: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!selectedCustomer || !session?.user?.id) return;

    try {
      setIsLoading(true);
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${selectedCustomer.id}/${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('customer_documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('customer_documents')
        .insert({
          customer_id: selectedCustomer.id,
          file_name: file.name,
          file_path: filePath,
          uploaded_by: session.user.id
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      await fetchCustomerDocuments(selectedCustomer.id);
    } catch (error: any) {
      console.error('Error uploading document:', error);
      toast({
        title: "Error",
        description: "Failed to upload document: " + error.message,
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

  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName} ${customer.email} ${customer.company}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!session?.user?.id) {
    return (
      <Card className="w-full max-w-7xl mx-auto my-8">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Please log in to access the CRM.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-7xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Contacts</CardTitle>
        <CardDescription>Manage your customer relationships and track interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            {filteredCustomers.length === 0 ? (
              <p className="text-center text-gray-500">No customers found</p>
            ) : (
              filteredCustomers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  isSelected={selectedCustomer?.id === customer.id}
                  onClick={() => handleCustomerClick(customer)}
                />
              ))
            )}
          </div>

          {selectedCustomer && (
            <CustomerDetails
              customer={selectedCustomer}
              documents={documents}
              onFileUpload={handleFileUpload}
              isLoading={isLoading}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};