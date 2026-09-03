import ResourceArticleLayout from "@/pages/resources/components/ResourceArticleLayout";
import { apiOverviewArticle } from "@/data/resources";

export default function ApiOverview() {
  return <ResourceArticleLayout article={apiOverviewArticle} />;
}