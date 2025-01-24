import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerCard } from './crm/CustomerCard';
import { CustomerDetails } from './crm/CustomerDetails';
import { AddContactForm } from './crm/AddContactForm';
import type { Customer } from '@/types/customer';
import type { CustomerDocument } from '@/types/customer-document';

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
        lifecycle_stage: customer.lifecycle_stage || 'lead',
        deal_value: customer.deal_value,
        source: customer.source,
        owner: customer.owner
      }));
      
      setCustomers(mappedCustomers);
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

  const handleFileUpload = async (file: File) => {
    if (!selectedCustomer) return;

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
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      await fetchCustomerDocuments(selectedCustomer.id);
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

  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName} ${customer.email} ${customer.company}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full max-w-7xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Customer Relationship Management</CardTitle>
        <CardDescription>Manage your customer relationships and track interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="contacts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="add">Add Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
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
          </TabsContent>

          <TabsContent value="add">
            <AddContactForm onSuccess={fetchCustomers} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};