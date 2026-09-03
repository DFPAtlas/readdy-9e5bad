export interface SolutionChallenge {
  title: string;
  explanation: string;
  dataContribution: string;
  limitation: string;
}

export interface SolutionWorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface SolutionUseCase {
  organisationType: string;
  businessQuestion: string;
  dataCategories: string;
  exampleWorkflow: string;
  operationalOutput: string;
  complianceCheckpoint: string;
  limitation: string;
}

export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface Solution {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  shortDescription: string;
  heroDescription: string;
  businessChallenges: SolutionChallenge[];
  supportedOutcomes: string[];
  workflowSteps: SolutionWorkflowStep[];
  typicalUsers: string[];
  relevantCategories: string[];
  featuredPackageSlugs: string[];
  useCases: SolutionUseCase[];
  complianceConsiderations: string[];
  limitations: string[];
  faqs: SolutionFaq[];
  relatedSolutionSlugs: string[];
  seoTitle: string;
  seoDescription: string;
}

export const solutions: Solution[] = [
  {
    id: "sol-001",
    slug: "marketing-intelligence",
    name: "Marketing Intelligence",
    eyebrow: "Understand markets, audiences and campaigns",
    shortDescription:
      "Identify target audiences, evaluate campaign performance and understand market dynamics using governed data products designed for responsible marketing planning.",
    heroDescription:
      "Marketing intelligence at DataHarbour combines aggregated consumer-segment data, market-research dashboards, location-based footfall indices and audience-planning tools to help marketing teams understand their markets without compromising consumer privacy. Every product is accompanied by provenance documentation and permitted-use conditions so you can plan campaigns with confidence.",
    businessChallenges: [
      {
        title: "Identifying viable target audiences",
        explanation:
          "Marketing teams often rely on broad assumptions or incomplete data when defining target segments for campaigns.",
        dataContribution:
          "Pre-built consumer lifestyle segments and demographic profiles can help marketing teams identify audiences that match their product or service profile, using statistically representative modelled data.",
        limitation:
          "Segments are statistical models and do not guarantee individual purchasing behaviour. Campaign success still depends on creative execution, offer relevance and market conditions.",
      },
      {
        title: "Understanding local market characteristics",
        explanation:
          "National-level marketing strategies often fail to account for significant regional variation in consumer behaviour, competition and market opportunity.",
        dataContribution:
          "Location-intelligence products including footfall indices, demographic trends and high-street vacancy data can help teams understand local market conditions at town, ward or postcode-sector level.",
        limitation:
          "Local data should inform strategy, not replace it. On-the-ground knowledge, local partner relationships and qualitative research remain essential.",
      },
      {
        title: "Measuring campaign effectiveness and sentiment",
        explanation:
          "Without structured market feedback, marketing teams struggle to quantify campaign impact, brand perception shifts and category sentiment trends.",
        dataContribution:
          "Continuous consumer-sentiment tracking dashboards and market-research reports can provide weekly brand-perception metrics, purchase-intention scores and category-sentiment trends.",
        limitation:
          "Sentiment data reflects panel responses and is subject to sampling variation. It should be interpreted alongside internal performance data, not as a single source of truth.",
      },
      {
        title: "Selecting optimal locations for physical retail or service points",
        explanation:
          "Site-selection decisions based on intuition or limited local knowledge carry significant financial risk, particularly for multi-site operators.",
        dataContribution:
          "Combined footfall data, catchment demographics, transport-accessibility scores and competitor-density analysis can provide a structured evidence base for location-investment decisions.",
        limitation:
          "Data products model typical conditions and cannot predict specific future footfall, local planning changes or unexpected competitor entry.",
      },
    ],
    supportedOutcomes: [
      "Improve market visibility with aggregated consumer-segment data",
      "Identify regional variation in market opportunity",
      "Track brand perception and category sentiment over time",
      "Evaluate potential retail or service locations with structured evidence",
      "Understand competitor landscape and high-street dynamics",
      "Build audience profiles for responsible campaign planning",
    ],
    workflowSteps: [
      {
        step: 1,
        title: "Define the marketing purpose",
        description:
          "Clarify the specific marketing question, target geography, campaign type and desired outcomes before selecting data products.",
      },
      {
        step: 2,
        title: "Identify required intelligence signals",
        description:
          "Determine which data categories — audience segments, location intelligence, consumer sentiment or demographic trends — are most relevant to your marketing challenge.",
      },
      {
        step: 3,
        title: "Review provenance and usage conditions",
        description:
          "Examine each product's provenance status, permitted-use summary, restriction summary and access-level requirements before requesting access.",
      },
      {
        step: 4,
        title: "Access and integrate data responsibly",
        description:
          "Complete required verification steps, agree to licence terms and integrate product data or dashboard access into your marketing planning and campaign workflows.",
      },
      {
        step: 5,
        title: "Evaluate, refresh and retain records",
        description:
          "Monitor data freshness, track campaign performance against baseline metrics, respect retention terms and refresh data at the defined frequency.",
      },
    ],
    typicalUsers: [
      "Marketing analysts",
      "Brand managers",
      "Campaign planners",
      "Market-research teams",
      "Location-planning teams",
      "Consumer-insight professionals",
      "Media-strategy teams",
    ],
    relevantCategories: [
      "Audience Intelligence",
      "Location Intelligence",
      "Market Research",
      "Demographic Intelligence",
    ],
    featuredPackageSlugs: [
      "consumer-lifestyle-audience-segments",
      "regional-retail-footfall-index",
      "market-sentiment-research-dashboard",
      "uk-high-street-vacancy-intelligence",
      "local-area-demographic-trends",
    ],
    useCases: [
      {
        organisationType: "A mid-market retail group with 60+ UK locations",
        businessQuestion:
          "Which towns within our target region show the strongest alignment with our customer profile and offer viable expansion opportunities?",
        dataCategories: "Footfall indices, demographic trends, high-street vacancy data, consumer lifestyle segments",
        exampleWorkflow:
          "The marketing team identifies five candidate towns, requests catchment-area demographic profiles, reviews footfall trends by retail category, overlays competitor-density data and narrows to a shortlist of two for in-person assessment.",
        operationalOutput:
          "A structured location-assessment brief supporting board-level expansion decisions, with data-backed rationale for each recommended town.",
        complianceCheckpoint:
          "Confirms that all data products used carry appropriate permitted-use terms for commercial location planning and that no individually identifiable consumer data is accessed.",
        limitation:
          "The data supports site selection but does not replace physical site visits, local market knowledge, lease negotiations or planning-permission due diligence.",
      },
      {
        organisationType: "A consumer-goods brand launching a new product category",
        businessQuestion:
          "Which consumer segments show the strongest purchase-intent signals for our new category, and how is market sentiment trending quarter by quarter?",
        dataCategories: "Audience segments, consumer sentiment tracking, purchase-intention data, demographic trends",
        exampleWorkflow:
          "The brand team selects pre-built audience segments aligned with the new category, reviews quarterly sentiment trends, cross-references with demographic data and develops a targeting strategy for an initial campaign in two UK regions.",
        operationalOutput:
          "A campaign-planning document with clearly defined audience profiles, regional prioritisation and a sentient-benchmark baseline for post-campaign measurement.",
        complianceCheckpoint:
          "Verifies that audience segments are statistical aggregates only, confirms permitted-use terms cover campaign planning and ensures no individual-level targeting occurs without a valid lawful basis.",
        limitation:
          "Segment definitions are static between quarterly refreshes and may not capture rapid shifts in consumer sentiment. Campaign optimisation should still rely on real-time performance data.",
      },
    ],
    complianceConsiderations: [
      "Confirm that audience segments are statistical aggregates and do not enable individual-level identification or tracking",
      "Verify that any personal data used in campaign execution has a recognised lawful basis under UK GDPR",
      "Review data-retention terms and ensure campaign-level consumer data is not retained beyond the agreed period",
      "Check that location-intelligence products do not enable singling-out of individuals in small geographic areas",
      "Ensure that any automated audience-selection process includes meaningful human review where it significantly affects individuals",
    ],
    limitations: [
      "Does not guarantee campaign performance or return on marketing investment",
      "Does not provide individual-level consumer profiles or enable direct consumer targeting without a valid lawful basis",
      "Does not replace creative strategy, brand positioning or offer development",
      "Does not provide real-time consumer tracking or behavioural monitoring",
      "Does not guarantee that all relevant competitor activity is captured in location-intelligence products",
      "Does not remove the need for market-specific qualitative research and local expertise",
    ],
    faqs: [
      {
        question: "Does selecting the Marketing Intelligence solution grant access to listed data products?",
        answer:
          "No. Solutions describe how governed data products may support business workflows. Access to any listed product requires a separate access request, which may involve organisation verification, supplier approval or compliance review depending on the product\u2019s access level.",
      },
      {
        question: "Can I use audience-segment data to target individual consumers?",
        answer:
          "Audience segments are statistical models derived from aggregated data and do not contain individual-level identifiers. If your campaign requires individual-level targeting, you must ensure you have a valid lawful basis under UK GDPR and that the data product\u2019s permitted-use terms explicitly allow that application.",
      },
      {
        question: "How often is market-sentiment data refreshed?",
        answer:
          "Refresh frequency varies by product. The Market Sentiment Research Dashboard is updated weekly from a nationally representative panel. Location-intelligence products update quarterly or weekly depending on the specific dataset. Always check the product detail page for the current refresh schedule.",
      },
      {
        question: "Are the package listings shown for this solution live products?",
        answer:
          "All package listings on DataHarbour are currently fictional demonstration listings illustrating the planned marketplace. Live products, verified suppliers and access requests will be available in a future platform phase.",
      },
    ],
    relatedSolutionSlugs: ["audience-planning", "location-intelligence", "market-research"],
    seoTitle: "Marketing Intelligence Solutions — DataHarbour",
    seoDescription:
      "Explore how governed data products support marketing intelligence, audience planning, location analysis and campaign measurement. Responsible, provenance-reviewed data for UK marketing teams.",
  },
  {
    id: "sol-002",
    slug: "business-verification",
    name: "Business Verification",
    eyebrow: "Verify organisations, directors and registrations",
    shortDescription:
      "Support customer due diligence, supplier onboarding and counterparty verification using consolidated registry data, filing histories and structured risk indicators.",
    heroDescription:
      "Business verification at DataHarbour enables organisations to confirm company registration details, review filing histories, check officer and PSC records, validate registered addresses and assess publicly available risk indicators from Companies House, gazette notices and court registers. Every product includes clear provenance documentation and access conditions so verification workflows remain auditable and compliant.",
    businessChallenges: [
      {
        title: "Confirming the legal status and registration of counterparties",
        explanation:
          "Organisations entering commercial relationships need reliable confirmation that a counterparty is a duly registered entity with an active filing status.",
        dataContribution:
          "Company-registry enrichment APIs can provide real-time confirmation of registration status, company type, incorporation date, registered address and filing-history summary from Companies House.",
        limitation:
          "A valid Companies House registration does not confirm commercial viability, creditworthiness or that the company is trading actively. Registry status is one part of a broader due-diligence process.",
      },
      {
        title: "Identifying persons with significant control and directors",
        explanation:
          "Understanding who ultimately owns or controls a company is essential for anti-money-laundering compliance, sanctions screening and commercial-risk assessment.",
        dataContribution:
          "Registry data products provide structured access to officer appointments, persons-with-significant-control records and disqualified-director registers, enabling automated PSC and director screening.",
        limitation:
          "PSC registers rely on company self-reporting and may contain inaccuracies or omissions. Where identification of beneficial owners is critical, independent verification and enhanced due diligence should supplement registry data.",
      },
      {
        title: "Monitoring company-status changes and risk signals",
        explanation:
          "A company that was verified six months ago may have since entered administration, filed a proposal to strike off or accumulated adverse registry events.",
        dataContribution:
          "Scheduled feeds and webhook notification services can monitor monitored entities for filing changes, gazette notices, insolvency events and other publicly available risk signals.",
        limitation:
          "Not all risk events are captured in public registers. Late filings, unaudited accounts and delayed gazette publication create a time lag between an event and its appearance in registry data.",
      },
    ],
    supportedOutcomes: [
      "Confirm company registration status and filing history",
      "Identify officers, directors and persons with significant control",
      "Validate registered addresses against authoritative sources",
      "Monitor monitored entities for status changes and risk signals",
      "Support AML and KYC compliance workflows with structured registry data",
      "Build auditable verification records for regulatory reporting",
    ],
    workflowSteps: [
      {
        step: 1,
        title: "Define the verification requirement",
        description:
          "Clarify whether the verification is for customer due diligence, supplier onboarding, credit assessment or another defined business purpose.",
      },
      {
        step: 2,
        title: "Identify required registry data points",
        description:
          "Determine which data fields — registration status, officers, PSC, address, filings, risk indicators — are necessary for your verification workflow.",
      },
      {
        step: 3,
        title: "Review provenance and access conditions",
        description:
          "Confirm that the selected data product's provenance status, permitted uses and access level align with your compliance obligations and internal policies.",
      },
      {
        step: 4,
        title: "Integrate verification data into your workflow",
        description:
          "Complete access requirements, integrate API or feed data into your onboarding or monitoring systems, and establish automated or manual review thresholds.",
      },
      {
        step: 5,
        title: "Maintain records and monitor for changes",
        description:
          "Retain verification records in line with regulatory retention requirements, monitor monitored entities for changes and refresh data at the product\u2019s defined frequency.",
      },
    ],
    typicalUsers: [
      "Compliance officers",
      "AML analysts",
      "Procurement teams",
      "Credit-risk analysts",
      "Supplier-management teams",
      "Legal and company-secretarial teams",
    ],
    relevantCategories: [
      "Business and Public Records",
      "Financial and Risk Intelligence",
      "Verification Products",
    ],
    featuredPackageSlugs: [
      "uk-business-registry-enrichment-api",
      "sme-commercial-risk-signals",
      "address-validation-premises-classification-api",
    ],
    useCases: [
      {
        organisationType: "A financial-services firm onboarding corporate clients",
        businessQuestion:
          "How can we automate initial company-verification checks while ensuring our AML compliance process remains auditable and proportionate?",
        dataCategories: "Companies House registry data, PSC records, officer appointments, registered-address validation",
        exampleWorkflow:
          "The compliance team integrates a registry-enrichment API into their client-onboarding platform. Each new corporate client triggers an automated lookup returning registration status, officer and PSC records, registered-address validation and a filing-history summary. Results are logged to the client record for audit purposes.",
        operationalOutput:
          "An automated verification workflow that reduces manual data entry, provides consistent registry data for every corporate client and generates an auditable verification trail.",
        complianceCheckpoint:
          "Confirms that the registry API is permitted for AML customer due diligence, verifies that PSC data is used only for the declared purpose and ensures verification records are retained for the regulatory minimum period.",
        limitation:
          "Automated registry checks are one component of customer due diligence. Enhanced due diligence, sanctions screening and ongoing transaction monitoring remain separate obligations.",
      },
    ],
    complianceConsiderations: [
      "Confirm that registry data is used only for declared business purposes and not retained beyond regulatory or contractual retention periods",
      "Ensure that PSC and officer data is not used for unauthorised profiling or direct marketing to individuals",
      "Verify that automated verification decisions include meaningful human review where required by regulation",
      "Check that data products used for AML compliance carry appropriate permitted-use terms and provenance documentation",
    ],
    limitations: [
      "Does not guarantee that a company is trading, solvent or creditworthy",
      "Does not replace enhanced due diligence for high-risk relationships",
      "Does not provide real-time monitoring of all possible risk events",
      "Does not confirm the accuracy of self-reported PSC or filing data",
      "Does not constitute legal advice on regulatory compliance obligations",
    ],
    faqs: [
      {
        question: "Can I use business-verification data for AML customer due diligence?",
        answer:
          "Registry data from Companies House is publicly available and may support customer due diligence, but you should confirm that the specific data product\u2019s permitted-use terms include AML and KYC applications and that your use complies with your regulatory obligations.",
      },
      {
        question: "Does DataHarbour verify the accuracy of Companies House data?",
        answer:
          "DataHarbour products present registry data as filed. Provenance documentation indicates the source, refresh frequency and any known limitations. DataHarbour does not independently verify the accuracy of company filings, which are the responsibility of the filing company.",
      },
    ],
    relatedSolutionSlugs: ["fraud-prevention", "commercial-risk-intelligence"],
    seoTitle: "Business Verification Solutions — DataHarbour",
    seoDescription:
      "Support customer due diligence, supplier onboarding and counterparty verification with governed registry data. Structured Companies House data, PSC records and risk indicators for UK organisations.",
  },
  {
    id: "sol-003",
    slug: "customer-data-enrichment",
    name: "Customer Data Enrichment",
    eyebrow: "Enrich customer records responsibly",
    shortDescription:
      "Add value to existing customer records with validated address data, business-classification signals, demographic context and premises-type information under clear permitted-use conditions.",
    heroDescription:
      "Customer data enrichment at DataHarbour helps organisations improve the quality, completeness and analytical value of their existing customer records through governed data products — not by selling personal data but by providing address validation, premises classification, business-registry matching and aggregate demographic context. Every enrichment product includes documented provenance and explicit permitted-use terms so you can enhance records responsibly.",
    businessChallenges: [
      {
        title: "Incomplete or inaccurate address data in customer records",
        explanation:
          "Customer databases often contain partial, outdated or incorrectly formatted addresses, reducing deliverability, compromising location-based analysis and increasing operational costs.",
        dataContribution:
          "Address-validation APIs can match, correct and standardise UK addresses against multiple authoritative sources, returning UPRNs, geocoding and deliverability scores.",
        limitation:
          "Address validation confirms that an address exists and is deliverable but does not confirm that the named individual resides there or that the address is the customer\u2019s current location.",
      },
      {
        title: "Limited understanding of customer location context",
        explanation:
          "Knowing a customer\u2019s address is useful; understanding the demographic, economic and commercial context of that location can significantly improve segmentation, service planning and risk assessment.",
        dataContribution:
          "Premises-classification data, local-area demographic trends, transport-accessibility scores and council-tax banding can provide contextual information at the output-area or postcode level.",
        limitation:
          "Area-level data describes statistical averages and may not reflect the circumstances of any specific household. Using area data to make decisions about individuals requires careful judgement and, where appropriate, a lawful basis.",
      },
      {
        title: "Difficulty matching B2B customer records to verified business entities",
        explanation:
          "B2B customer databases often contain trading names, incomplete legal-entity names or outdated company information, making it difficult to link records to a verified business entity.",
        dataContribution:
          "Business-registry enrichment can match trading names to registered companies, providing company numbers, SIC codes, registered addresses and filing-status information.",
        limitation:
          "Not all businesses are registered at Companies House and not all trading names map cleanly to a single registered entity. Match confidence should be reviewed, particularly for sole traders, partnerships and overseas entities.",
      },
    ],
    supportedOutcomes: [
      "Validate and standardise customer addresses against authoritative sources",
      "Enrich B2B records with verified company-registry data",
      "Add premises-type classification to customer records",
      "Provide demographic and economic context at the local-area level",
      "Improve data quality for analytics, segmentation and service planning",
      "Reduce failed deliveries and operational costs from incorrect addresses",
    ],
    workflowSteps: [
      {
        step: 1,
        title: "Define the enrichment purpose and lawful basis",
        description:
          "Clarify why you are enriching customer records, confirm you have a valid lawful basis for any personal-data processing involved and document the intended use.",
      },
      {
        step: 2,
        title: "Select appropriate enrichment products",
        description:
          "Choose data products whose permitted-use terms align with your declared purpose and whose coverage, refresh frequency and delivery format meet your operational needs.",
      },
      {
        step: 3,
        title: "Review provenance and data-quality indicators",
        description:
          "Examine provenance documentation, quality scores, known limitations and sample data to ensure the enrichment product is fit for your intended application.",
      },
      {
        step: 4,
        title: "Integrate and validate enrichment results",
        description:
          "Implement API or batch enrichment, review match-confidence scores, establish validation thresholds and integrate enriched data into your CRM or analytics platform.",
      },
      {
        step: 5,
        title: "Monitor quality and respect retention terms",
        description:
          "Regularly review enrichment quality metrics, refresh data at the product\u2019s defined interval and delete enriched attributes when the lawful basis or retention period expires.",
      },
    ],
    typicalUsers: [
      "Data-quality teams",
      "CRM managers",
      "Marketing-operations teams",
      "Customer-analytics teams",
      "B2B sales-operations teams",
      "Risk and compliance analysts",
    ],
    relevantCategories: [
      "Verification Products",
      "Business and Public Records",
      "Demographic Intelligence",
      "Location Intelligence",
    ],
    featuredPackageSlugs: [
      "address-validation-premises-classification-api",
      "uk-business-registry-enrichment-api",
      "local-area-demographic-trends",
      "transport-accessibility-catchment-dataset",
    ],
    useCases: [
      {
        organisationType: "An insurance provider with a legacy customer database",
        businessQuestion:
          "How can we improve address data quality and add property-level context to support more accurate risk-location assessment?",
        dataCategories: "Address validation, premises classification, UPRN matching, council-tax banding",
        exampleWorkflow:
          "The data team runs the customer address file through an address-validation API, standardising formats and appending UPRNs, premises-type classifications and council-tax bands where available. Records with low match confidence are flagged for manual review.",
        operationalOutput:
          "A cleaned customer-address database with appended property attributes, improving risk-location accuracy and reducing manual address-correction work.",
        complianceCheckpoint:
          "Confirms that enrichment uses only address-level and property-level data, not individual financial or sensitive data, and that the lawful basis for processing is documented.",
        limitation:
          "Property attributes provide context but do not directly predict claim likelihood. Underwriting decisions should still consider the full range of risk factors.",
      },
    ],
    complianceConsiderations: [
      "Confirm that you have a valid lawful basis for enriching personal data under UK GDPR",
      "Ensure enriched attributes are not retained beyond the period for which the lawful basis applies",
      "Verify that data products used for enrichment have permitted-use terms that cover your intended application",
      "Check that area-level demographic data is not used to make automated decisions about individuals without human review",
      "Document the enrichment process, data sources and retention policy for accountability",
    ],
    limitations: [
      "Does not provide individual-level financial, health or sensitive personal data",
      "Does not guarantee that enriched records are complete or error-free",
      "Does not replace the need for customers to update their own records",
      "Does not authorise the use of enriched data for purposes outside the product\u2019s permitted-use terms",
      "Address validation confirms address existence, not residency or occupancy",
    ],
    faqs: [
      {
        question: "Do I need a specific lawful basis to enrich customer data?",
        answer:
          "Yes. If the enrichment involves personal data, you must have a valid lawful basis under UK GDPR. The appropriate basis depends on your relationship with the data subject, the purpose of enrichment and whether the enriched attributes could be considered intrusive. You should document your lawful basis before beginning enrichment.",
      },
      {
        question: "Can I use enriched data for direct marketing?",
        answer:
          "That depends on the data product\u2019s permitted-use terms and your lawful basis. Many enrichment products explicitly prohibit use for unsolicited direct marketing. Always check the product\u2019s restriction summary and, where personal data is involved, ensure your marketing complies with PECR and UK GDPR.",
      },
    ],
    relatedSolutionSlugs: ["business-verification", "marketing-intelligence", "location-intelligence"],
    seoTitle: "Customer Data Enrichment Solutions — DataHarbour",
    seoDescription:
      "Enrich customer records responsibly with governed address validation, business-classification data and demographic context. Provenance-reviewed enrichment products for UK organisations.",
  },
  {
    id: "sol-004",
    slug: "fraud-prevention",
    name: "Fraud Prevention Support",
    eyebrow: "Identify fraud signals and verify identities",
    shortDescription:
      "Support fraud-prevention workflows with identity-verification signals, mortality screening, address-link validation, known-fraud-flag checking and registry-data cross-referencing.",
    heroDescription:
      "Fraud prevention support at DataHarbour provides governed identity-verification and risk-signal products that organisations may integrate into their fraud-detection and customer-onboarding workflows — from electoral-register matching and mortality screening to address-link verification and known-fraud-flag databases. These products are designed to inform, not replace, professional fraud investigation and must be used within declared, lawful purposes.",
    businessChallenges: [
      {
        title: "Verifying that a customer identity is genuine during onboarding",
        explanation:
          "Synthetic identities, impersonation attempts and reused identity elements present a growing challenge for organisations onboarding customers remotely.",
        dataContribution:
          "Multi-source identity-verification services can check submitted identities against electoral registers, mortality databases, known-fraud-flag registers and address-link records, returning structured pass-or-refer results.",
        limitation:
          "A pass result confirms that the submitted identity elements are consistent with source data at the time of the check, not that the person presenting the identity is its legitimate holder. Strong customer authentication and document verification may also be required.",
      },
      {
        title: "Detecting application fraud through inconsistent data patterns",
        explanation:
          "Fraudulent applications often contain internally inconsistent information — mismatched addresses, improbable timelines or combinations of attributes that deviate from normal patterns.",
        dataContribution:
          "Address-validation, property-transaction data and registry-enrichment APIs can help identify inconsistencies between declared information and authoritative sources.",
        limitation:
          "Inconsistency is an indicator, not proof of fraud. Legitimate applications may contain errors, and fraudulent applications may be internally consistent. Human review of flagged cases remains essential.",
      },
      {
        title: "Monitoring for post-onboarding fraud indicators",
        explanation:
          "A customer that passed onboarding checks may subsequently be linked to fraud events, impersonation reports or registry changes that indicate elevated risk.",
        dataContribution:
          "Scheduled monitoring feeds and change-notification services can alert organisations to relevant registry changes, new fraud-flag registrations or mortality events affecting monitored entities.",
        limitation:
          "Monitoring services depend on the timeliness of source data. Delays in fraud-flag registration, death registration and registry filing can create a window between an event and its availability for screening.",
      },
    ],
    supportedOutcomes: [
      "Verify identity elements against multiple authoritative sources",
      "Screen applications against known-fraud-flag registers",
      "Identify inconsistencies between declared and authoritative data",
      "Monitor monitored entities for post-onboarding risk indicators",
      "Support fraud-investigation workflows with auditable data records",
      "Reduce reliance on single-source verification",
    ],
    workflowSteps: [
      {
        step: 1,
        title: "Define the fraud-prevention purpose",
        description:
          "Specify the types of fraud you are seeking to prevent, the stage of the customer journey where checks will be applied and the lawful basis for processing personal data.",
      },
      {
        step: 2,
        title: "Select verification and signal products",
        description:
          "Choose identity-verification, address-validation and risk-signal products whose data coverage, response time and permitted-use terms align with your fraud-prevention requirements.",
      },
      {
        step: 3,
        title: "Design review thresholds and escalation rules",
        description:
          "Define pass, refer and fail thresholds for each verification check, establish rules for combining multiple signals and design the human-review process for referred cases.",
      },
      {
        step: 4,
        title: "Integrate checks into your onboarding or monitoring platform",
        description:
          "Implement API calls at the appropriate point in your customer journey, handle timeouts and errors gracefully and log all verification results for audit purposes.",
      },
      {
        step: 5,
        title: "Review, audit and refine",
        description:
          "Regularly review false-positive and false-negative rates, audit verification decisions for fairness and consistency and refine thresholds based on operational experience.",
      },
    ],
    typicalUsers: [
      "Fraud-prevention teams",
      "Financial-crime analysts",
      "Customer-onboarding teams",
      "Compliance officers",
      "Risk-management teams",
      "Identity-verification specialists",
    ],
    relevantCategories: [
      "Verification Products",
      "Financial and Risk Intelligence",
      "Business and Public Records",
    ],
    featuredPackageSlugs: [
      "consumer-identity-verification-signals",
      "address-validation-premises-classification-api",
      "sme-commercial-risk-signals",
      "uk-business-registry-enrichment-api",
    ],
    useCases: [
      {
        organisationType: "A digital-banking platform onboarding remote customers",
        businessQuestion:
          "How can we strengthen our remote-identity-verification process with multi-source data checks while maintaining a smooth customer experience?",
        dataCategories: "Electoral-register matching, mortality screening, address-link verification, known-fraud-flag registers",
        exampleWorkflow:
          "During digital onboarding, the platform submits the customer\u2019s name, date of birth and address to an identity-verification API. The service returns pass or refer results for electoral-register match, mortality screening, address-link check and fraud-flag register. Referrals are routed to a manual review queue with the specific signal that triggered the referral.",
        operationalOutput:
          "A multi-source identity-verification checkpoint integrated into the digital-onboarding flow, with clearly defined referral criteria and an auditable decision record.",
        complianceCheckpoint:
          "Confirms that identity-verification processing has a documented lawful basis, that automated decisions with significant effects include human review and that verification records are retained in line with regulatory requirements.",
        limitation:
          "Multi-source verification improves confidence but cannot eliminate identity fraud entirely. Document verification, device intelligence and ongoing transaction monitoring remain important complementary controls.",
      },
    ],
    complianceConsiderations: [
      "Ensure identity-verification processing has a documented lawful basis under UK GDPR",
      "Establish clear human-review procedures for cases where automated verification returns a refer result",
      "Confirm that fraud-flag data is not used for purposes beyond fraud prevention without a separate lawful basis",
      "Retain verification records for the regulatory minimum period and delete when retention is no longer required",
      "Regularly audit verification decisions for fairness, accuracy and disproportionate impact",
    ],
    limitations: [
      "Does not eliminate fraud risk or guarantee detection of all fraudulent applications",
      "Does not replace document verification, device intelligence or transaction monitoring",
      "Verification results are based on data available at the time of the check and may not reflect subsequent events",
      "Does not constitute a legal determination of identity for purposes such as right-to-work checks",
      "False positives and false negatives are inherent to any verification system and require human review processes",
    ],
    faqs: [
      {
        question: "Does using DataHarbour verification products guarantee fraud detection?",
        answer:
          "No. Verification products provide data signals that may support fraud detection, but no product can guarantee that all fraudulent applications will be identified. Fraud prevention requires a layered approach including document verification, device intelligence, transaction monitoring and human investigation.",
      },
      {
        question: "Can I use fraud-prevention data to decline a customer application automatically?",
        answer:
          "Under UK GDPR, solely automated decisions that produce legal effects or similarly significant effects on individuals are restricted. If your fraud-prevention process includes automated declines, you should ensure that meaningful human review is available, that the logic is transparent and fair and that you have a lawful basis for the processing.",
      },
    ],
    relatedSolutionSlugs: ["business-verification", "commercial-risk-intelligence", "customer-data-enrichment"],
    seoTitle: "Fraud Prevention Support Solutions — DataHarbour",
    seoDescription:
      "Support fraud-prevention workflows with governed identity-verification signals, mortality screening, address-link validation and known-fraud-flag checking. Responsible, auditable verification products.",
  },
  {
    id: "sol-005",
    slug: "location-intelligence",
    name: "Location Intelligence",
    eyebrow: "Evaluate locations with governed data",
    shortDescription:
      "Assess retail centres, high streets, transport catchments and property markets using footfall indices, planning-activity feeds, vacancy data and demographic trends.",
    heroDescription:
      "Location intelligence at DataHarbour brings together footfall indices, planning-application feeds, high-street vacancy tracking, transport-accessibility scores, demographic trends and property-transaction data to help organisations evaluate locations for investment, expansion and service planning. Every product includes geographic-coverage documentation, refresh-frequency details and permitted-use conditions so location decisions are supported by transparent, governed data.",
    businessChallenges: [
      {
        title: "Evaluating new-site viability with limited local data",
        explanation:
          "Expansion decisions based on intuition, limited site visits or anecdotal evidence carry significant investment risk, particularly for multi-site organisations.",
        dataContribution:
          "Combined footfall indices, catchment demographics, competitor-density analysis, transport-accessibility scores and commercial-property data can provide structured evidence for site-selection decisions.",
        limitation:
          "Data products describe past and current conditions. They cannot predict future footfall, local planning decisions, competitor entry or changes in consumer behaviour.",
      },
      {
        title: "Understanding high-street and retail-centre dynamics",
        explanation:
          "National retail trends often mask significant local variation. Town centres with similar demographic profiles can have very different vacancy rates, footfall patterns and business-mix compositions.",
        dataContribution:
          "High-street vacancy-intelligence products, retail-centre footfall indices and planning-activity feeds can provide town-level and centre-level comparisons.",
        limitation:
          "Town-centre data reflects measured and observed conditions at a point in time. Local regeneration initiatives, upcoming infrastructure projects and seasonal variation should be factored into interpretation.",
      },
      {
        title: "Assessing transport accessibility for service planning",
        explanation:
          "Whether planning a new healthcare facility, a distribution centre or a retail location, understanding how easily the target population can reach the site is a critical planning input.",
        dataContribution:
          "Transport-accessibility datasets provide multimodal travel-time isochrones, Public Transport Accessibility Level scores and population-within-catchment estimates.",
        limitation:
          "Travel-time calculations are modelled estimates using scheduled timetables and road-network data. They may not reflect real-world conditions on any specific day or at peak times.",
      },
    ],
    supportedOutcomes: [
      "Compare retail centres and high streets with standardised metrics",
      "Evaluate site viability using footfall, demographics and accessibility data",
      "Track planning-application activity and development pipelines",
      "Understand property-market trends at local-authority and regional level",
      "Assess transport catchments for service-planning decisions",
      "Monitor high-street vacancy and business-mix changes over time",
    ],
    workflowSteps: [
      {
        step: 1,
        title: "Define the location question",
        description:
          "Clarify whether you are evaluating a specific site, comparing candidate locations, monitoring an existing portfolio or researching a regional market.",
      },
      {
        step: 2,
        title: "Select relevant location-intelligence products",
        description:
          "Choose products covering the required geography, metrics and refresh frequency. A site-selection exercise may combine footfall, demographics, accessibility and property data.",
      },
      {
        step: 3,
        title: "Review data provenance and limitations",
        description:
          "Examine how each dataset is sourced, modelled and refreshed. Understand confidence intervals, minimum sample sizes and known limitations before drawing conclusions.",
      },
      {
        step: 4,
        title: "Analyse and interpret in context",
        description:
          "Combine data products into a location assessment, cross-reference findings with local knowledge and identify areas where data signals conflict or are ambiguous.",
      },
      {
        step: 5,
        title: "Document and refresh",
        description:
          "Document the data sources, refresh dates and assumptions underlying your location assessment. Schedule refreshes at the product\u2019s defined interval to keep analysis current.",
      },
    ],
    typicalUsers: [
      "Location-planning teams",
      "Property and estates teams",
      "Retail-strategy analysts",
      "Local-authority planning teams",
      "Property-investment analysts",
      "Market-research and insight teams",
    ],
    relevantCategories: [
      "Location Intelligence",
      "Demographic Intelligence",
      "Business and Public Records",
    ],
    featuredPackageSlugs: [
      "regional-retail-footfall-index",
      "uk-planning-development-activity-feed",
      "uk-high-street-vacancy-intelligence",
      "transport-accessibility-catchment-dataset",
      "uk-property-transaction-intelligence",
      "local-area-demographic-trends",
    ],
    useCases: [
      {
        organisationType: "A quick-service restaurant group evaluating 15 candidate towns",
        businessQuestion:
          "Which towns in our target region offer the strongest combination of footfall, catchment demographics, accessibility and limited direct-competitor density?",
        dataCategories: "Footfall indices, demographic trends, transport accessibility, competitor density, planning-activity data",
        exampleWorkflow:
          "The location-planning team requests footfall data, demographic profiles and accessibility scores for each candidate town. They overlay competitor locations, review recent planning applications indicating competitor interest and produce a ranked shortlist with supporting evidence.",
        operationalOutput:
          "A site-selection shortlist document with quantified comparisons across five data dimensions, supporting property-team negotiations and investment-committee decisions.",
        complianceCheckpoint:
          "Confirms that footfall data is aggregated and anonymised, that demographic data is used at area level only and that no individually identifiable data is accessed.",
        limitation:
          "The shortlist is based on modelled and reported data at a point in time. Physical site inspections, lease negotiations, planning-permission feasibility and local-market visits remain necessary.",
      },
    ],
    complianceConsiderations: [
      "Confirm that footfall and location data is sufficiently aggregated to prevent singling-out of individuals",
      "Ensure demographic data is used at appropriate geographic levels and not applied to individual-level decisions without a valid basis",
      "Check that planning-application data is used only for market analysis and not for direct marketing to applicants",
      "Review data-retention terms and ensure location assessments are refreshed or retired when underlying data becomes outdated",
    ],
    limitations: [
      "Does not predict future footfall, market conditions or competitor behaviour",
      "Does not replace physical site visits, local market knowledge or planning-permission due diligence",
      "Travel-time and accessibility scores are modelled estimates, not real-world measurements",
      "Location data reflects conditions at the time of collection or modelling and may not capture recent changes",
    ],
    faqs: [
      {
        question: "How granular is the location data?",
        answer:
          "Granularity varies by product. Footfall indices are typically provided at retail-centre or town level. Demographic trends are available at output-area, ward and local-authority level. Transport-accessibility data is modelled at postcode level. Check each product\u2019s detail page for specific geographic resolution.",
      },
      {
        question: "Can I use location-intelligence data to identify or track individuals?",
        answer:
          "No. DataHarbour location-intelligence products are aggregated and anonymised. Footfall data uses privacy-safe statistical thresholds. Demographic data is provided at area level. Attempting to re-identify individuals from aggregated data is a breach of permitted-use terms.",
      },
    ],
    relatedSolutionSlugs: ["market-research", "marketing-intelligence", "commercial-risk-intelligence"],
    seoTitle: "Location Intelligence Solutions — DataHarbour",
    seoDescription:
      "Evaluate retail centres, high streets, transport catchments and property markets using governed footfall, demographic and planning data. Transparent, provenance-reviewed location intelligence.",
  },
  {
    id: "sol-006",
    slug: "market-research",
    name: "Market Research",
    eyebrow: "Access research, sentiment and trend data",
    shortDescription:
      "Understand markets, track consumer sentiment, analyse demographic trends and commission bespoke research reports using governed data products designed for research workflows.",
    heroDescription:
      "Market research at DataHarbour provides access to consumer-sentiment tracking dashboards, demographic-trend datasets, hospitality and retail-opportunity reports, aggregated survey data and custom research products — all accompanied by provenance documentation, methodology disclosures and permitted-use conditions so research findings are transparent and defensible.",
    businessChallenges: [
      {
        title: "Tracking consumer sentiment and confidence at scale",
        explanation:
          "Commissioning proprietary consumer research is expensive and slow. Without continuous tracking, organisations may miss shifts in consumer confidence, purchase intention or brand perception.",
        dataContribution:
          "Continuous consumer-sentiment tracking dashboards provide weekly data on economic confidence, purchase intentions, category sentiment and brand perception from nationally representative panels.",
        limitation:
          "Sentiment data reflects stated intentions, not actual behaviour. Panel responses are subject to sampling variation and may not capture the views of niche or hard-to-reach populations.",
      },
      {
        title: "Understanding demographic and socio-economic trends",
        explanation:
          "Market strategies based on outdated demographic assumptions risk misallocating resources and missing emerging opportunities driven by population change.",
        dataContribution:
          "Census-aligned demographic estimates, household projections and socio-economic classifications at small-area level can provide an up-to-date evidence base for market sizing and segmentation.",
        limitation:
          "Mid-year population estimates and small-area projections carry confidence intervals that widen between census years. They are best used for strategic planning, not precise micro-targeting.",
      },
      {
        title: "Accessing reliable market data for investment cases",
        explanation:
          "Investment committees, boards and funders increasingly expect market analysis to be supported by independent, citable data rather than internal assumptions.",
        dataContribution:
          "Aggregated market-research products, property-transaction data, high-street-vacancy tracking and bespoke opportunity reports can provide independent evidence for investment cases.",
        limitation:
          "Data products provide evidence, not conclusions. The analysis, interpretation and recommendations remain the responsibility of the research team or analyst.",
      },
    ],
    supportedOutcomes: [
      "Track consumer sentiment and purchase intentions with weekly panel data",
      "Understand demographic trends at national, regional and local levels",
      "Commission bespoke market-opportunity reports with multi-source data",
      "Support investment cases with independent, citable market evidence",
      "Monitor category trends and brand-perception metrics over time",
      "Identify emerging market opportunities using structured data analysis",
    ],
    workflowSteps: [
      {
        step: 1,
        title: "Define the research question",
        description:
          "Clarify the specific market question, target geography, required evidence standard and intended use of the research output.",
      },
      {
        step: 2,
        title: "Identify suitable data products",
        description:
          "Select products whose coverage, methodology, refresh frequency and permitted-use terms align with your research requirements.",
      },
      {
        step: 3,
        title: "Review methodology and limitations",
        description:
          "Examine each product\u2019s methodology, sample sizes, confidence intervals and known limitations to ensure the evidence is fit for the intended purpose.",
      },
      {
        step: 4,
        title: "Analyse, interpret and cite",
        description:
          "Integrate data into your research analysis, acknowledge limitations transparently and cite data sources and refresh dates in your output.",
      },
      {
        step: 5,
        title: "Refresh and archive",
        description:
          "Schedule data refreshes for ongoing research, archive completed research with source-data references and respect retention terms for downloaded datasets.",
      },
    ],
    typicalUsers: [
      "Market-research analysts",
      "Consumer-insight teams",
      "Strategy consultants",
      "Investment analysts",
      "Corporate-strategy teams",
      "Brand and marketing teams",
    ],
    relevantCategories: [
      "Market Research",
      "Demographic Intelligence",
      "Location Intelligence",
      "Aggregated Reports",
    ],
    featuredPackageSlugs: [
      "market-sentiment-research-dashboard",
      "local-area-demographic-trends",
      "hospitality-location-opportunity-report",
      "uk-property-transaction-intelligence",
    ],
    useCases: [
      {
        organisationType: "A strategy consultancy preparing a market-entry assessment",
        businessQuestion:
          "What is the current size, growth trajectory and consumer-sentiment profile of the UK market for our client\u2019s proposed product category?",
        dataCategories: "Consumer sentiment tracking, demographic trends, market-research reports, category purchase-intention data",
        exampleWorkflow:
          "The consultancy accesses sentiment-tracking data for the relevant category, downloads demographic-trend data for the target regions, reviews quarterly market-research summaries and produces a market-sizing model with supporting evidence.",
        operationalOutput:
          "A market-entry assessment document with quantified market-sizing, trend analysis and consumer-sentiment benchmarking, cited to independent data sources.",
        complianceCheckpoint:
          "Confirms that all data products used carry permitted-use terms covering commercial research and consultancy, and that underlying individual-level data is not accessed or redistributed.",
        limitation:
          "Market-sizing estimates are projections based on current data and stated consumer intentions. Actual market conditions, competitor actions and macroeconomic factors may cause outcomes to differ.",
      },
    ],
    complianceConsiderations: [
      "Cite data sources, refresh dates and methodology limitations in all research outputs",
      "Confirm that data products used for published research carry permitted-use terms covering publication or redistribution",
      "Do not present modelled estimates as measured facts without clearly communicating the modelling methodology and confidence intervals",
      "Respect data-retention and deletion terms when research projects conclude",
    ],
    limitations: [
      "Does not provide individual-level survey responses or consumer-contact data",
      "Does not guarantee that research findings will be accepted by regulators, investors or other stakeholders",
      "Sentiment and intention data reflect stated preferences, not actual behaviour",
      "Market-sizing estimates are projections, not guarantees of market performance",
    ],
    faqs: [
      {
        question: "Can I publish market-research data in a public report?",
        answer:
          "It depends on the data product\u2019s permitted-use terms. Some products permit publication with appropriate citation; others restrict redistribution. Always check the product\u2019s restriction summary and, if in doubt, contact the supplier or DataHarbour for clarification.",
      },
      {
        question: "How reliable is consumer-sentiment data for predicting behaviour?",
        answer:
          "Sentiment data measures stated attitudes and intentions, which are correlated with but not identical to actual behaviour. It is most valuable as a directional indicator and for trend analysis over time, rather than as a precise predictor of individual purchasing decisions.",
      },
    ],
    relatedSolutionSlugs: ["marketing-intelligence", "audience-planning", "location-intelligence"],
    seoTitle: "Market Research Solutions — DataHarbour",
    seoDescription:
      "Access governed consumer-sentiment tracking, demographic trends and market-research reports. Transparent methodology, documented provenance and responsible-use conditions for UK research teams.",
  },
  {
    id: "sol-007",
    slug: "audience-planning",
    name: "Audience Planning",
    eyebrow: "Plan audiences for responsible campaigns",
    shortDescription:
      "Build audience strategies using pre-built consumer segments, demographic profiles, lifestyle classifications and modelled household characteristics under governed access conditions.",
    heroDescription:
      "Audience planning at DataHarbour provides marketing, media and insight teams with pre-built consumer-lifestyle segments, demographic profiles and modelled household-level characteristics — all aggregated and anonymised — to support responsible campaign planning, media-buying strategy and market-sizing exercises. Every audience product includes clear provenance documentation and permitted-use conditions.",
    businessChallenges: [
      {
        title: "Defining target audiences without reliable consumer data",
        explanation:
          "Audience definitions based on internal assumptions or limited customer data may miss important segments, misallocate media spend or fail to identify growth opportunities.",
        dataContribution:
          "Pre-built consumer-lifestyle segments provide statistically representative audience profiles with estimated UK reach, demographic summaries, category affinities and confidence scores.",
        limitation:
          "Segments are statistical models and represent groups, not specific individuals. They should inform, not dictate, audience-strategy decisions.",
      },
      {
        title: "Understanding audience size and composition for media planning",
        explanation:
          "Media buyers need reliable audience-size estimates to negotiate effectively, allocate budget across channels and set realistic campaign-performance expectations.",
        dataContribution:
          "Audience-intelligence products provide estimated reach figures, demographic-profile summaries and suggested category affinities for each pre-built segment.",
        limitation:
          "Segment-reach estimates are derived from survey panels and modelled data. Actual campaign reach will vary based on media-channel availability, creative execution and market conditions.",
      },
      {
        title: "Identifying complementary audience segments for campaign expansion",
        explanation:
          "Campaigns targeting a single well-defined segment may miss adjacent audiences with similar characteristics who could respond to the same messaging.",
        dataContribution:
          "Audience-segment dashboards allow exploration of related segments, demographic overlaps and category-affinity patterns to identify campaign-expansion opportunities.",
        limitation:
          "Adjacent-segment analysis suggests similarity, not guaranteed campaign responsiveness. Testing and measurement remain essential to validate audience hypotheses.",
      },
    ],
    supportedOutcomes: [
      "Define target audiences using pre-built, statistically representative segments",
      "Estimate audience reach and demographic composition for media planning",
      "Identify complementary segments for campaign expansion",
      "Benchmark audience strategies against category-level consumer data",
      "Support media-buying negotiations with independent audience estimates",
      "Plan responsible campaigns with clear data-provenance documentation",
    ],
    workflowSteps: [
      {
        step: 1,
        title: "Define the campaign and audience objectives",
        description:
          "Clarify the campaign goals, target geography, budget parameters and the role audience data will play in planning and execution.",
      },
      {
        step: 2,
        title: "Explore and select audience segments",
        description:
          "Use the audience-planning dashboard to browse pre-built segments, review demographic profiles and estimated reach and shortlist segments aligned with campaign objectives.",
      },
      {
        step: 3,
        title: "Validate segments against internal data",
        description:
          "Where available, compare segment profiles against your existing customer data to validate relevance and identify gaps or opportunities.",
      },
      {
        step: 4,
        title: "Integrate audience insights into media planning",
        description:
          "Use segment-reach estimates, demographic profiles and category affinities to inform media-channel selection, budget allocation and creative development.",
      },
      {
        step: 5,
        title: "Measure, learn and refresh",
        description:
          "Post-campaign, compare actual against planned reach, update audience hypotheses based on performance data and refresh segment data at the product\u2019s defined interval.",
      },
    ],
    typicalUsers: [
      "Media planners",
      "Audience-strategy teams",
      "Campaign managers",
      "Marketing analysts",
      "Brand managers",
      "Consumer-insight teams",
    ],
    relevantCategories: [
      "Audience Intelligence",
      "Demographic Intelligence",
      "Consumer and Purchasing Signals",
    ],
    featuredPackageSlugs: [
      "consumer-lifestyle-audience-segments",
      "local-area-demographic-trends",
      "market-sentiment-research-dashboard",
    ],
    useCases: [
      {
        organisationType: "A media agency planning a national campaign for a retail client",
        businessQuestion:
          "Which audience segments offer the strongest alignment with our client\u2019s target customer profile, and what is the estimated addressable reach across our planned media channels?",
        dataCategories: "Audience segments, demographic profiles, category affinities, estimated reach",
        exampleWorkflow:
          "The media-planning team explores pre-built lifestyle segments, identifies three segments with strong category affinities and demographic profiles matching the client\u2019s customer base, estimates addressable reach and builds a media plan with audience-backed rationale.",
        operationalOutput:
          "A media-planning deck with audience segment profiles, reach estimates and channel-allocation recommendations supported by independent audience data.",
        complianceCheckpoint:
          "Confirms that audience segments are statistical aggregates, that no individual-level data is used in media planning and that the campaign\u2019s targeting complies with PECR and UK GDPR.",
        limitation:
          "Estimated reach is based on modelled audience data. Actual campaign delivery depends on media-channel availability, creative performance and market conditions during the campaign period.",
      },
    ],
    complianceConsiderations: [
      "Confirm that audience segments are statistical aggregates and do not contain individual-level identifiers",
      "Ensure that any individual-level campaign targeting has a valid lawful basis under UK GDPR and complies with PECR",
      "Do not use audience-segment data to infer sensitive characteristics about individuals",
      "Review data-refresh frequency and ensure audience strategies are updated when underlying segment data changes",
    ],
    limitations: [
      "Does not provide individual-level consumer profiles or contact data",
      "Does not guarantee campaign performance or return on advertising spend",
      "Segment definitions are updated quarterly and may not reflect short-term consumer-behaviour shifts",
      "Does not replace creative strategy, media-channel expertise or campaign measurement",
    ],
    faqs: [
      {
        question: "Can I use audience-segment data to target individuals on social media?",
        answer:
          "Audience segments are aggregated statistical profiles and do not contain individual identifiers. If you wish to target individuals, you must have a valid lawful basis under UK GDPR and ensure your campaign complies with the relevant platform\u2019s targeting policies and PECR.",
      },
      {
        question: "How are audience segments built?",
        answer:
          "Segments are constructed from nationally representative survey panels, anonymised purchase-panel data and modelled household-level characteristics. All underlying personal data is removed during the modelling process. Each segment includes a confidence score and demographic-profile summary.",
      },
    ],
    relatedSolutionSlugs: ["marketing-intelligence", "market-research", "customer-data-enrichment"],
    seoTitle: "Audience Planning Solutions — DataHarbour",
    seoDescription:
      "Build audience strategies using governed consumer segments, demographic profiles and lifestyle classifications. Responsible, provenance-reviewed audience intelligence for UK campaign planning.",
  },
  {
    id: "sol-008",
    slug: "commercial-risk-intelligence",
    name: "Commercial Risk Intelligence",
    eyebrow: "Assess commercial and credit risk",
    shortDescription:
      "Evaluate SME credit risk, monitor commercial-risk signals, assess counterparty financial health and support procurement due diligence using governed risk-intelligence products.",
    heroDescription:
      "Commercial risk intelligence at DataHarbour provides structured risk indicators, credit-signal data and registry-derived financial information to support B2B credit assessment, supplier-risk monitoring, trade-credit underwriting and procurement due diligence. Products combine public-registry data, gazette notices, court judgments and modelled risk signals with clear provenance documentation and permitted-use conditions.",
    businessChallenges: [
      {
        title: "Assessing the creditworthiness of SMEs with limited public financial data",
        explanation:
          "Most UK SMEs file abbreviated or unaudited accounts, providing limited visibility into financial health. Credit teams need alternative risk indicators to supplement thin financial data.",
        dataContribution:
          "SME risk-signal products aggregate publicly available indicators — dissolution warnings, strike-off notices, CCJ records, charge satisfactions and late-filing flags — into structured risk profiles.",
        limitation:
          "Risk signals are indicators, not credit scores. They are derived from public data and may not reflect the most current financial position of a business. Professional credit judgement remains essential.",
      },
      {
        title: "Monitoring supplier and counterparty risk across a portfolio",
        explanation:
          "Procurement and supply-chain teams often lack systematic processes for monitoring the financial health and registry status of existing suppliers.",
        dataContribution:
          "Scheduled monitoring feeds and change-notification services can alert organisations to registry changes, insolvency events and adverse risk signals affecting monitored suppliers.",
        limitation:
          "Monitoring covers publicly available events. Private financial difficulties, informal creditor arrangements and early-stage distress may not appear in public registers until later stages.",
      },
      {
        title: "Supporting trade-credit decisions with independent data",
        explanation:
          "Trade-credit decisions based solely on customer-provided information or payment history create concentration risk and may miss emerging financial stress in counterparties.",
        dataContribution:
          "Multi-source risk-intelligence products combining registry data, court judgments, gazette notices and modelled risk signals can provide independent evidence for trade-credit decisions.",
        limitation:
          "Risk-intelligence products provide data to inform, not replace, credit decision-making. Credit limits, payment terms and security requirements should reflect the full commercial relationship, not data signals alone.",
      },
    ],
    supportedOutcomes: [
      "Evaluate SME credit risk using multi-source risk indicators",
      "Monitor supplier and counterparty portfolios for adverse registry events",
      "Support trade-credit underwriting with independent risk data",
      "Identify early-warning signals of financial distress",
      "Build auditable credit-assessment records for governance",
      "Reduce reliance on single-source credit information",
    ],
    workflowSteps: [
      {
        step: 1,
        title: "Define the risk-assessment purpose",
        description:
          "Clarify whether the assessment is for credit underwriting, supplier onboarding, portfolio monitoring or another defined commercial-risk purpose.",
      },
      {
        step: 2,
        title: "Select risk-intelligence products",
        description:
          "Choose products whose signal coverage, refresh frequency and risk-indicator types align with your risk-assessment requirements and sector focus.",
      },
      {
        step: 3,
        title: "Review provenance and risk-signal methodology",
        description:
          "Understand how each risk signal is sourced, weighted and refreshed. Review known limitations and confidence indicators before integrating signals into decision workflows.",
      },
      {
        step: 4,
        title: "Integrate signals into risk-assessment processes",
        description:
          "Define risk thresholds, establish escalation rules and integrate risk-signal data into credit-decision or supplier-management platforms.",
      },
      {
        step: 5,
        title: "Monitor, review and audit",
        description:
          "Monitor portfolios for new risk signals, review the accuracy of risk assessments against actual outcomes and maintain auditable records of risk decisions.",
      },
    ],
    typicalUsers: [
      "Credit-risk analysts",
      "Trade-credit underwriters",
      "Procurement and supply-chain teams",
      "Supplier-management teams",
      "Commercial-risk managers",
      "Finance directors and CFOs",
    ],
    relevantCategories: [
      "Financial and Risk Intelligence",
      "Business and Public Records",
      "Verification Products",
    ],
    featuredPackageSlugs: [
      "sme-commercial-risk-signals",
      "uk-business-registry-enrichment-api",
      "b2b-company-technology-signals",
    ],
    useCases: [
      {
        organisationType: "A trade-credit insurer assessing a portfolio of SME policies",
        businessQuestion:
          "Which policyholders in our portfolio are showing early-warning risk signals that warrant a pre-renewal review?",
        dataCategories: "SME risk signals, Companies House registry data, CCJ records, gazette notices, insolvency-register data",
        exampleWorkflow:
          "The underwriting team runs their portfolio through a risk-signal API, flags entities with recent adverse signals above a defined threshold, reviews flagged cases individually and adjusts renewal terms where supported by the evidence.",
        operationalOutput:
          "A portfolio-risk report identifying policyholders with elevated risk signals, supporting proactive renewal management and reducing exposure to deteriorating credit quality.",
        complianceCheckpoint:
          "Confirms that risk-signal data is used only for the declared commercial-risk purpose, that automated flagging includes human review of material decisions and that data is retained only for the underwriting period.",
        limitation:
          "Risk-signal data provides indicators, not predictions. The absence of adverse signals does not guarantee creditworthiness, and the presence of signals does not mean a default is inevitable.",
      },
    ],
    complianceConsiderations: [
      "Confirm that risk-intelligence data is used only for declared commercial-risk purposes and not for consumer-credit scoring",
      "Ensure that automated risk-flagging includes meaningful human review for decisions with significant commercial impact",
      "Do not use risk-signal data to make automated decisions about sole traders without appropriate safeguards",
      "Retain risk-assessment records for the period required by your internal governance and any applicable regulation",
    ],
    limitations: [
      "Does not provide consumer-credit scores or individual-person credit data",
      "Does not guarantee the creditworthiness or financial stability of any entity",
      "Risk signals are based on publicly available data and may not reflect the most current financial position",
      "Does not replace professional credit judgement, financial analysis or legal due diligence",
    ],
    faqs: [
      {
        question: "Is this a credit-reference-agency service?",
        answer:
          "No. DataHarbour provides governed data products that include publicly available risk indicators, registry data and modelled risk signals. It does not operate as a credit reference agency under the Consumer Credit Act and does not provide consumer-credit scores or regulated credit information.",
      },
      {
        question: "Can I use commercial-risk data to assess individual sole traders?",
        answer:
          "Sole traders are individuals for data-protection purposes. Using commercial-risk data to assess sole traders may constitute processing of personal data and requires a valid lawful basis. Automated decisions about sole traders that produce legal or significant effects are restricted under UK GDPR. Exercise particular caution and seek advice if unsure.",
      },
    ],
    relatedSolutionSlugs: ["business-verification", "fraud-prevention", "customer-data-enrichment"],
    seoTitle: "Commercial Risk Intelligence Solutions — DataHarbour",
    seoDescription:
      "Evaluate SME credit risk, monitor commercial-risk signals and support procurement due diligence with governed risk-intelligence products. Transparent, provenance-reviewed data for UK organisations.",
  },
];

export const solutionFinderMapping: Record<string, string> = {
  "understand-a-market": "marketing-intelligence",
  "verify-a-business": "business-verification",
  "enrich-business-or-customer-records": "customer-data-enrichment",
  "identify-fraud-signals": "fraud-prevention",
  "evaluate-a-location": "location-intelligence",
  "access-research-and-trends": "market-research",
  "plan-an-audience": "audience-planning",
  "assess-commercial-risk": "commercial-risk-intelligence",
};