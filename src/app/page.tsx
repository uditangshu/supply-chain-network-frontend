'use client';

import { useState, useEffect } from 'react';
import { Product, CreateProductRequest } from '@/types';
import { productAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import CreateProductModal from '@/components/CreateProductModal';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAllProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData: CreateProductRequest) => {
    try {
      setCreateLoading(true);
      await productAPI.createProduct(productData);
      setShowCreateModal(false);
      await loadProducts(); // Reload products
    } catch (err) {
      setError('Failed to create product');
      console.error('Error creating product:', err);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleInitializeLedger = async () => {
    try {
      setLoading(true);
      await productAPI.initializeLedger();
      await loadProducts();
    } catch (err) {
      setError('Failed to initialize ledger');
      console.error('Error initializing ledger:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductAction = async (product: Product, action: string) => {
    try {
      setLoading(true);
      
      switch (action) {
        case 'approve-financing':
          const amount = prompt('Enter financing amount:');
          if (amount) {
            await productAPI.approveFinancing(product.ID, { 
              financingAmount: parseFloat(amount) 
            });
          }
          break;
        case 'confirm-supply':
          await productAPI.confirmSupply(product.ID);
          break;
        case 'request-manufacturing':
          await productAPI.requestManufacturing(product.ID, { 
            manufacturerMSP: 'ManufacturerMSP' 
          });
          break;
        case 'accept-manufacturing':
          await productAPI.acceptManufacturing(product.ID);
          break;
        case 'complete-manufacturing':
          await productAPI.completeManufacturing(product.ID);
          break;
      }
      
      await loadProducts(); // Reload products
    } catch (err) {
      setError(`Failed to ${action.replace('-', ' ')}`);
      console.error(`Error with ${action}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Supply Chain Management Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your blockchain-based supply chain with Hyperledger Fabric
        </p>
      </div>

      {/* Actions Bar */}
      <div className="mb-8 flex flex-wrap gap-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create New Product
        </button>
        <button
          onClick={handleInitializeLedger}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          disabled={loading}
        >
          Initialize Ledger
        </button>
        <button
          onClick={loadProducts}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={() => setError(null)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading products...</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.ID}
              product={product}
              onViewDetails={handleViewDetails}
              onTakeAction={handleProductAction}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-gray-400 mt-2">
            Create a new product or initialize the ledger to get started
          </p>
        </div>
      )}

      {/* Create Product Modal */}
      <CreateProductModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProduct}
        loading={createLoading}
      />

      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.Name}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p><strong>ID:</strong> {selectedProduct.ID}</p>
                <p><strong>Type:</strong> {selectedProduct.Type}</p>
                <p><strong>Status:</strong> {selectedProduct.Status}</p>
                <p><strong>Quantity:</strong> {selectedProduct.Quantity.toLocaleString()}</p>
              </div>
              <div>
                <p><strong>Price:</strong> ${selectedProduct.Price.toLocaleString()}</p>
                <p><strong>Supplier:</strong> {selectedProduct.Supplier}</p>
                <p><strong>Manufacturer:</strong> {selectedProduct.Manufacturer || 'Not assigned'}</p>
                <p><strong>Bank Approval:</strong> {selectedProduct.BankApproval ? 'Yes' : 'No'}</p>
              </div>
            </div>

            {selectedProduct.History && selectedProduct.History.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">History:</h3>
                <ul className="space-y-1 text-sm">
                  {selectedProduct.History.map((event, index) => (
                    <li key={index} className="text-gray-600">• {event}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setShowDetailsModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 