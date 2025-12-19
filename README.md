# ZipShift Parcel (Frontend)

This is the frontend application for **ZipShift Parcel**, a modern delivery management platform built with React and Vite. It offers a seamless user experience for managing parcels, tracking deliveries, and handling payments.

## 🚀 Tech Stack

- **Framework:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Authentication:** [Firebase](https://firebase.google.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Payments:** [Stripe](https://stripe.com/)
- **Visuals:** [Framer Motion](https://www.framer.com/motion/) (Animations), [Recharts](https://recharts.org/) (Charts)

## 🛠️ Installation & Setup

1.  **Clone the repository** (if not already done).
2.  **Navigate to the frontend directory**:
    ```bash
    cd ZipShift-Parcel
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Set up Environment Variables**:
    Create a `.env` file in the root of the `ZipShift-Parcel` directory. You will need to add your Firebase configuration, Stripe public key, and backend URL.
    *Example:*
    ```env
    VITE_API_URL=http://localhost:5000
    VITE_FIREBASE_API_KEY=...
    VITE_STRIPE_PUBLIC_KEY=...
    ```

## 🏃‍♂️ Running the App

To start the development server:

```bash
npm run dev
```

The app will typically run at `http://localhost:5173`.

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 📂 Project Structure

- `src/components`: Reusable UI components.
- `src/pages`: Main application pages.
- `src/hooks`: Custom React hooks.
- `src/store`: Zustand store definitions.
- `src/utils`: Helper functions and configurations (e.g., Firebase).
