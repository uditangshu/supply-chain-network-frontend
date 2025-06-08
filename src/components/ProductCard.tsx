'use client';

import { Product, STATUS_COLORS } from '@/types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onTakeAction?: (product: Product, action: string) => void;
}

export default function ProductCard({ product, onViewDetails, onTakeAction }: ProductCardProps) {
  const getAvailableActions = (product: Product) => {
    const actions = [];
    
    switch (product.Status) {
      case 'Requested':
        if (!product.BankApproval) {
          actions.push({ key: 'approve-financing', label: 'Approve Financing', color: 'blue' });
        }
        break;
      case 'Financed':
        actions.push({ key: 'confirm-supply', label: 'Confirm Supply', color: 'green' });
        break;
      case 'SupplierConfirmed':
        actions.push({ key: 'request-manufacturing', label: 'Request Manufacturing', color: 'purple' });
        break;
      case 'ManufacturingRequested':
        actions.push({ key: 'accept-manufacturing', label: 'Accept Manufacturing', color: 'orange' });
        break;
      case 'InManufacturing':
        actions.push({ key: 'complete-manufacturing', label: 'Complete Manufacturing', color: 'green' });
        break;
    }
    
    return actions;
  };

  const availableActions = getAvailableActions(product);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.Name}</h3>
        <span className={`status-badge ${STATUS_COLORS[product.Status]}`}>
          {product.Status}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p><span className="font-medium">ID:</span> {product.ID}</p>
        <p><span className="font-medium">Type:</span> {product.Type}</p>
        <p><span className="font-medium">Quantity:</span> {product.Quantity.toLocaleString()}</p>
        <p><span className="font-medium">Price:</span> ${product.Price.toLocaleString()}</p>
        <p><span className="font-medium">Supplier:</span> {product.Supplier}</p>
        {product.Manufacturer && (
          <p><span className="font-medium">Manufacturer:</span> {product.Manufacturer}</p>
        )}
        {product.BankApproval && (
          <p><span className="font-medium">Financing:</span> ${product.FinancingAmount.toLocaleString()}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onViewDetails(product)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
        >
          View Details
        </button>
        
        {availableActions.map((action) => (
          <button
            key={action.key}
            onClick={() => onTakeAction?.(product, action.key)}
            className={`px-4 py-2 rounded transition-colors text-sm text-white ${
              action.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
              action.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
              action.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
              action.color === 'orange' ? 'bg-orange-500 hover:bg-orange-600' :
              'bg-gray-500 hover:bg-gray-600'
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
} 