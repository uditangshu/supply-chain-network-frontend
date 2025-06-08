# Supply Chain Management Frontend

A Next.js frontend application for managing blockchain-based supply chain operations using Hyperledger Fabric.

## Features

- **Product Management**: Create, view, and track products through the supply chain
- **Workflow Management**: Handle financing approval, supply confirmation, and manufacturing
- **Real-time Updates**: Live status tracking and history viewing
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **API Integration**: REST API calls to Hyperledger Fabric backend
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Access to the Supply Chain API backend

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_API_URL=http://20.189.232.16:8000/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

### Required for Production

- `NEXT_PUBLIC_API_URL`: The base URL for the Supply Chain API backend

### Example Configuration

For local development:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

For production (Azure VM):
```env
NEXT_PUBLIC_API_URL=http://20.189.232.16:8000/api
```

## Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/supply-chain-frontend)

### Manual Deploy

1. Push your code to GitHub/GitLab/Bitbucket

2. Connect your repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. Configure environment variables in Vercel:
   - Go to your project settings
   - Add environment variable:
     - Name: `NEXT_PUBLIC_API_URL`
     - Value: `http://20.189.232.16:8000/api`

4. Deploy!

### Environment Variables for Vercel

Make sure to set these in your Vercel project settings:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://20.189.232.16:8000/api` | Backend API endpoint |

## API Integration

The frontend communicates with a Hyperledger Fabric backend API that provides:

- Product CRUD operations
- Supply chain workflow management
- Blockchain transaction handling
- Real-time status updates

### API Endpoints Used

- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/{id}/approve-financing` - Approve financing
- `PUT /api/products/{id}/confirm-supply` - Confirm supply
- `PUT /api/products/{id}/request-manufacturing` - Request manufacturing
- `PUT /api/products/{id}/accept-manufacturing` - Accept manufacturing
- `PUT /api/products/{id}/complete-manufacturing` - Complete manufacturing
- `GET /api/products/{id}/history` - Get product history

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js 13+ app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ProductCard.tsx
│   └── CreateProductModal.tsx
├── lib/               # Utility functions
│   └── api.ts         # API client
└── types/             # TypeScript types
    └── index.ts       # Type definitions
```

## Supply Chain Workflow

1. **Bank** creates product financing request
2. **Bank** approves financing
3. **Supplier** confirms supply availability
4. **Supplier** requests manufacturing
5. **Manufacturer** accepts manufacturing
6. **Manufacturer** completes manufacturing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is part of a Hyperledger Fabric supply chain demonstration. # supply-chain-network-frontend
# supply-chain-network-frontend
