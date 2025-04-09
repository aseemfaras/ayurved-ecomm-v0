# Ayurved E-Commerce Platform

A modern e-commerce platform for Ayurvedic products built with Next.js, React, and Tailwind CSS.

## Features

- **User Authentication**: Secure login and registration system
- **Product Catalog**: Browse and search Ayurvedic products
- **Shopping Cart**: Add products to cart and manage quantities
- **Checkout Process**: Seamless checkout with multiple payment options
- **Order Management**: Track and manage orders
- **Admin Dashboard**: Comprehensive admin interface for:
  - Product management
  - Order processing
  - Customer management
  - Analytics and reporting

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **UI Components**: Shadcn UI
- **Payment Processing**: Razorpay integration
- **State Management**: React hooks
- **Styling**: Tailwind CSS with custom theming

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ayurved-ecomm.git
cd ayurved-ecomm
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
# Add other necessary environment variables
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── admin/            # Admin dashboard pages
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── products/         # Product pages
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout process
│   └── order-confirmation/  # Order confirmation
├── components/           # Reusable React components
├── lib/                  # Utility functions and shared logic
│   ├── actions/          # Server actions
│   └── utils/            # Helper functions
├── public/               # Static assets
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Shadcn UI for the component library
- Next.js team for the amazing framework
- All contributors who have helped shape this project 