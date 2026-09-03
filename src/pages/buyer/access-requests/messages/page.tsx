import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AccessRequestMessagesRedirect() {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/app/buyer/access-requests/${requestId}?tab=messages`, { replace: true });
  }, [requestId, navigate]);

  return null;
}