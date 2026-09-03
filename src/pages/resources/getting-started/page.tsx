import ResourceArticleLayout from "@/pages/resources/components/ResourceArticleLayout";
import { gettingStartedArticle } from "@/data/resources";

export default function GettingStarted() {
  return <ResourceArticleLayout article={gettingStartedArticle} />;
}