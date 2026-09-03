import ResourceArticleLayout from "@/pages/resources/components/ResourceArticleLayout";
import { authenticationArticle } from "@/data/resources";

export default function Authentication() {
  return <ResourceArticleLayout article={authenticationArticle} />;
}