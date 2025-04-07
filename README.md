# User Dashboard Application

A Next.js dashboard application that displays user statistics and data visualizations, built with React, Redux, and Recharts.

## Implementation Approach

The dashboard follows a component-based architecture with clear separation of concerns:

1. **State Management**: Redux Toolkit handles global state for user data, with slices for different data aspects
2. **Visualization**: Recharts provides interactive, responsive charts with custom tooltips and styling
3. **UI Components**: Modular components (GenderChart, Table etc.) promote reusability
4. **Performance**: Next.js static generation optimizes loading times
5. **Styling**: Tailwind CSS enables rapid UI development with responsive design

Data flows unidirectionally from API → Redux store → Components, ensuring predictable state management.

## Features
- Interactive data visualization with Recharts
- Gender distribution pie chart
- Blood type distribution chart
- Height/weight scatter plot
- Data table with sorting, filtering and pagination
- Responsive design with Tailwind CSS
- State management with Redux

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Installation
1. Clone the repository
```bash
git clone https://github.com/your-repo/my-app.git
cd my-app
```
2. Install dependencies:
```bash
npm install
```

## Project Structure
```
my-app/
├── src/
│   ├── app/
│   │   ├── Components/    # Reusable UI components
│   │   │   ├── Table.js   # Data table component
│   │   │   ├── GenderChart.js # Pie chart component
│   │   │   └── ...
│   │   ├── Pages/         # Page components
│   │   │   └── dashboard.js # Main dashboard page
│   │   └── Redux/        # Redux store configuration
│   │       ├── userDataslice.js # Redux slice
│   │       └── store.js  # Redux store
├── public/                # Static assets
└── README.md              # This file
```

## Key Dependencies
- Next.js 14
- React 18
- Redux Toolkit
- Tailwind CSS
- Recharts
- React Icons


