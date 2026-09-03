import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AccessRequestHistoryRedirect() {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/app/buyer/access-requests/${requestId}?tab=history`, { replace: true });
  }, [requestId, navigate]);

  return null;
}