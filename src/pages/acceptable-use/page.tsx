import { DOCUMENT_BY_SLUG } from "@/data/legalDocuments";
import LegalDocumentLayout from "@/pages/legal/components/LegalDocumentLayout";

export default function AcceptableUsePage() { return <LegalDocumentLayout document={DOCUMENT_BY_SLUG["acceptable-use"]} />; }