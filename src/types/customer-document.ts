export interface CustomerDocument {
  id: string;
  customer_id: string;
  file_name: string;
  file_path: string;
  uploaded_at: string;
  uploaded_by?: string;
}