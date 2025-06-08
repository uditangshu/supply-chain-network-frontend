import { Product, ApiResponse, CreateProductRequest, ApproveFinancingRequest, RequestManufacturingRequest } from '@/types';

// Use environment variable for API URL, fallback to Azure VM IP
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://20.189.232.16:8000/api';

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const productAPI = {
  // Get all products
  getAllProducts: (): Promise<ApiResponse<Product[]>> => 
    apiCall<Product[]>('/products'),

  // Get product by ID
  getProduct: (id: string): Promise<ApiResponse<Product>> =>
    apiCall<Product>(`/products/${id}`),

  // Get product history
  getProductHistory: (id: string): Promise<ApiResponse<string[]>> =>
    apiCall<string[]>(`/products/${id}/history`),

  // Create new product
  createProduct: (data: CreateProductRequest): Promise<ApiResponse<Product>> =>
    apiCall<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Initialize ledger
  initializeLedger: (): Promise<ApiResponse<string>> =>
    apiCall<string>('/products/init', {
      method: 'POST',
    }),

  // Approve financing
  approveFinancing: (id: string, data: ApproveFinancingRequest): Promise<ApiResponse<Product>> =>
    apiCall<Product>(`/products/${id}/approve-financing`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Confirm supply
  confirmSupply: (id: string): Promise<ApiResponse<Product>> =>
    apiCall<Product>(`/products/${id}/confirm-supply`, {
      method: 'PUT',
    }),

  // Request manufacturing
  requestManufacturing: (id: string, data: RequestManufacturingRequest): Promise<ApiResponse<Product>> =>
    apiCall<Product>(`/products/${id}/request-manufacturing`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Accept manufacturing
  acceptManufacturing: (id: string): Promise<ApiResponse<Product>> =>
    apiCall<Product>(`/products/${id}/accept-manufacturing`, {
      method: 'PUT',
    }),

  // Complete manufacturing
  completeManufacturing: (id: string): Promise<ApiResponse<Product>> =>
    apiCall<Product>(`/products/${id}/complete-manufacturing`, {
      method: 'PUT',
    }),
};

export const healthAPI = {
  checkHealth: (): Promise<any> => {
    const healthUrl = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '/health')
      : 'http://20.189.232.16:8000/health';
    return fetch(healthUrl).then(res => res.json());
  },
}; 