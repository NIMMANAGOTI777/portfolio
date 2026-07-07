// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute ensures that only authenticated users can access child routes.
 * It also optionally checks for a required role (e.g., "admin").
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Simple loading placeholder – keep UI responsive
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        Loading…
      </div>
    );
  }

  if (!user) {
    // Not authenticated – redirect to login preserving original location
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Role based check – if requiredRole is provided, ensure the user has it
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/admin/403" replace />;
  }

  // All good – render the protected component tree
  return <>{children}</>;
}
