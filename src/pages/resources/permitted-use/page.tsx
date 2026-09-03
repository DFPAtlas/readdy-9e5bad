import ResourceArticleLayout from "@/pages/resources/components/ResourceArticleLayout";
import { permittedUseArticle } from "@/data/resources";

export default function PermittedUse() {
  return <ResourceArticleLayout article={permittedUseArticle} />;
}