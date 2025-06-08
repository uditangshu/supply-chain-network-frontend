export interface Product {
  ID: string;
  Name: string;
  Type: string;
  Status: 'Requested' | 'Financed' | 'SupplierConfirmed' | 'ManufacturingRequested' | 'InManufacturing' | 'Completed';
  Quantity: number;
  Price: number;
  Supplier: string;
  Manufacturer: string;
  BankApproval: boolean;
  FinancingAmount: number;
  CreatedAt: string;
  History: string[];
  docType: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface CreateProductRequest {
  id: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  supplierMSP: string;
}

export interface ApproveFinancingRequest {
  financingAmount: number;
}

export interface RequestManufacturingRequest {
  manufacturerMSP: string;
}

export const PRODUCT_TYPES = ['RawMaterial', 'Component', 'FinishedGood'] as const;
export const MSPS = ['BankMSP', 'SupplierMSP', 'ManufacturerMSP'] as const;

export const STATUS_COLORS = {
  Requested: 'status-requested',
  Financed: 'status-financed',
  SupplierConfirmed: 'status-supplierconfirmed',
  ManufacturingRequested: 'status-manufacturingrequested',
  InManufacturing: 'status-inmanufacturing',
  Completed: 'status-completed',
} as const; 