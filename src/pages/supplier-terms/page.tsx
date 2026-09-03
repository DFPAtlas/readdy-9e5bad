import { DOCUMENT_BY_SLUG } from "@/data/legalDocuments";
import LegalDocumentLayout from "@/pages/legal/components/LegalDocumentLayout";

export default function SupplierTermsPage() { return <LegalDocumentLayout document={DOCUMENT_BY_SLUG["supplier-terms"]} />; }