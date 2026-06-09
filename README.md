# Real Estate App UI

This is the frontend UI for the Real Estate Application, built using React and Material-UI (MUI).

## Features

- **Role-Based Access Control (RBAC):** Supports distinct user roles including `Customer`, `Owner`, `Agency`, and `Admin`.
- **Dynamic Navigation:** The header and profile menus adapt dynamically based on the currently logged-in user's role.
- **User Profile Management:** Users can view and edit their profile details, preferences, and security settings.
- **Mock Authentication:** The app comes pre-configured with mock users to test different roles and capabilities without needing a backend server.
- **State Management:** Utilizing Redux Toolkit for global state management including authentication, users, and snackbar notifications.

## Technologies Used

- **React:** Component-based UI library.
- **Material-UI (MUI):** UI component framework for styling and layout.
- **React Router (v7):** For client-side routing.
- **Redux Toolkit:** For application state management.
- **Formik & Yup:** For form building and validation.
- **Tabler Icons:** For SVG icons.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd real-estate-app
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:

```bash
npm start
```

The application will open in your default browser at [http://localhost:3000](http://localhost:3000).

## Mock Users for Testing

You can use the following mock credentials to log in and test different features of the application based on user roles:

| Role | Username | Email | Password |
| :--- | :--- | :--- | :--- |
| **Admin** | admin | `admin@realestate.gr` | `admin123` |
| **Owner** | john_owner | `owner@realestate.gr` | `owner123` |
| **Agency** | maria_agency | `agency@realestate.gr` | `agency123` |
| **Customer** | nikos_customer | `customer@realestate.gr` | `customer123` |

*By default, the application is set to log in the Admin user on startup for testing convenience. You can change this behavior in `src/store/slices/data_auth.js`.*

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.

## Structure Overview

- `src/view/`: Contains all main view components (e.g., Home, Auth, Profile, Dashboards).
- `src/layout/`: Global layout components like Header and Footer.
- `src/routes/`: Client-side routing configuration and auth guards (`RequireAuth`, `RequireRole`).
- `src/store/`: Redux slices and store configuration.
- `src/theme/`: Material-UI theme configurations.
- `src/utils/`: Reusable utility functions and custom hooks.
