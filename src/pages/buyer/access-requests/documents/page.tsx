import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AccessRequestDocumentsRedirect() {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/app/buyer/access-requests/${requestId}?tab=security`, { replace: true });
  }, [requestId, navigate]);

  return null;
}