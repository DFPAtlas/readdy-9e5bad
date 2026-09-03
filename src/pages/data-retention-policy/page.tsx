import { DOCUMENT_BY_SLUG } from "@/data/legalDocuments";
import LegalDocumentLayout from "@/pages/legal/components/LegalDocumentLayout";

export default function DataRetentionPage() { return <LegalDocumentLayout document={DOCUMENT_BY_SLUG["data-retention-policy"]} />; }