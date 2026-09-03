export interface CompliancePrinciple {
  title: string;
  description: string;
  detailSlug: string;
}

export interface ComplianceProcessStep {
  step: number;
  title: string;
  whatIsReviewed: string;
  whoIsResponsible: string;
  possibleOutcomes: string;
  limitation: string;
}

export interface ComplianceRequirement {
  title: string;
  description: string;
}

export interface ComplianceFaq {
  question: string;
  answer: string;
}

export interface ComplianceSection {
  title: string;
  anchor: string;
  content: string;
}

export interface ComplianceChecklistItem {
  label: string;
}

export interface ProhibitedUseGroup {
  category: string;
  items: string[];
}

export interface CompliancePage {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  intro: string;
  status: string;
  lastReviewedDisplay: string;
  legalNotice: boolean;
  principles?: CompliancePrinciple[];
  sections?: ComplianceSection[];
  processSteps?: ComplianceProcessStep[];
  requirements?: ComplianceRequirement[];
  faqs?: ComplianceFaq[];
  checklist?: ComplianceChecklistItem[];
  prohibitedUseGroups?: ProhibitedUseGroup[];
  relatedPageSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  nextStepText?: string;
  nextStepLink?: string;
}

export const compliancePages: CompliancePage[] = [
  {
    slug: "responsible-use",
    title: "Responsible Use",
    eyebrow: "Purpose, proportionality and accountability",
    summary:
      "Every data product on DataHarbour must be used for a declared, lawful and proportionate purpose. This page explains the responsible-use expectations that apply to everyone accessing governed data through the DataHarbour marketplace.",
    intro:
      "Responsible use is the foundation of DataHarbour's governance model. It means that access to data is always tied to a specific purpose, that the data requested is proportionate to that purpose, and that each buyer remains accountable for how data is handled throughout its lifecycle. These expectations are not optional — they form part of every access agreement and licence.",
    status: "Public guidance",
    lastReviewedDisplay: "July 2026",
    legalNotice: true,
    sections: [
      {
        title: "Declared business purpose",
        anchor: "purpose",
        content:
          "Every access request must include a clearly stated, specific and lawful business purpose. Vague descriptions such as 'marketing' or 'analysis' are not sufficient. The declared purpose determines which data products may be appropriate and informs the proportionality, retention and compliance review stages. If the purpose changes materially, the buyer must notify DataHarbour and the supplier, and a new review may be required. A purpose that is lawful at the time of access may become problematic if the data is later repurposed without appropriate authorisation.",
      },
      {
        title: "Proportionality",
        anchor: "proportionality",
        content:
          "The data requested should be proportionate to the declared purpose. This means that the scope, volume and sensitivity of data requested should be no more than is reasonably necessary to achieve the stated objective. Requesting a full national dataset when a regional subset would suffice, or requesting personally identifiable data when aggregate statistics would meet the need, may result in the request being declined or conditioned. Proportionality is assessed case by case and is informed by the product's data fields, coverage and access-level requirements.",
      },
      {
        title: "Data minimisation",
        anchor: "minimisation",
        content:
          "Buyers must only access and process the data fields they genuinely require for the declared purpose. Accessing all available fields 'just in case' is inconsistent with data-minimisation principles. Many data products offer configurable field selection, allowing buyers to limit their access to the specific attributes needed. Where configurable access is not available, the buyer should document why each accessed field is necessary and delete any data that is subsequently determined to be surplus to requirements.",
      },
      {
        title: "Accuracy checks",
        anchor: "accuracy",
        content:
          "Buyers should make reasonable efforts to verify that the data they rely on for significant decisions is sufficiently accurate, up to date and fit for the intended use. DataHarbour suppliers are expected to document their quality-control processes, but ultimate responsibility for assessing data fitness rests with the buyer. Where data is used to inform decisions about individuals or organisations, the buyer should have a process for identifying and correcting errors and for considering challenges to data accuracy.",
      },
      {
        title: "Human oversight",
        anchor: "oversight",
        content:
          "Data products are designed to inform human decision-making, not to replace it. Where data is used to support decisions that could significantly affect individuals or organisations, meaningful human review must be part of the decision process. Solely automated decision-making that produces legal or similarly significant effects is restricted under UK data-protection law, and buyers must ensure that their use of DataHarbour products complies with those restrictions. Even where automation is permitted, buyers are encouraged to maintain human oversight as good practice.",
      },
      {
        title: "Fair treatment",
        anchor: "fairness",
        content:
          "Data must not be used in ways that are unfair to individuals, that result in unlawful discrimination or that produce outcomes that a reasonable person would consider unjust. Buyers must consider whether their intended use could have discriminatory effects, even if unintentional, and must take steps to mitigate those risks. This includes reviewing whether the data product itself may contain biases or limitations that could affect the fairness of downstream decisions.",
      },
      {
        title: "Security",
        anchor: "security",
        content:
          "Buyers must protect accessed data with security measures appropriate to its sensitivity, volume and format. This includes controlling who within the buyer's organisation can access the data, securing storage and transfer, limiting copying and export, and reporting security incidents that may affect the data. Security expectations are set out in the buyer's access agreement and may be supplemented by product-specific requirements. Failure to maintain adequate security may result in suspension of access.",
      },
      {
        title: "Retention",
        anchor: "retention",
        content:
          "Data must only be retained for as long as is necessary for the declared purpose and in line with the product licence terms. When the purpose has been fulfilled or the licence period expires, data should be securely deleted unless retention is required by law. Buyers should maintain a retention schedule that records what data is held, for what purpose and when it is due for deletion. Archived copies for audit or legal purposes must be limited in scope and access.",
      },
      {
        title: "Audit records",
        anchor: "audit",
        content:
          "Buyers should maintain records that demonstrate their compliance with these responsible-use expectations. This includes records of access requests and approvals, declared purposes, data-processing activities, security measures, retention decisions and any changes to use. These records support accountability and may be requested as part of a compliance review or dispute resolution process. Good record-keeping is itself an indicator of responsible data stewardship.",
      },
      {
        title: "Supplier restrictions",
        anchor: "supplier-restrictions",
        content:
          "Many data products carry supplier-imposed restrictions that go beyond the general responsible-use expectations. Buyers must review and comply with the specific permitted-use and prohibited-use conditions attached to each product. A use that is generally lawful may still breach a supplier's licence terms if it falls outside the product's permitted-use summary. Ignorance of a product's restrictions is not an acceptable defence.",
      },
      {
        title: "Reviewing purpose changes",
        anchor: "review",
        content:
          "If a buyer's use of a data product changes — for example, from internal analysis to client-facing reporting, or from one business unit to another — the buyer must review whether the new use remains within the declared purpose, the product's permitted-use terms and applicable legal requirements. A new access request or compliance review may be required. Buyers should build purpose-review checkpoints into their data-governance processes, particularly when data is reused across projects or teams.",
      },
    ],
    checklist: [
      { label: "Have we clearly defined and documented the specific business purpose?" },
      { label: "Is the data requested proportionate to that purpose?" },
      { label: "Are we accessing only the fields we genuinely need?" },
      { label: "Have we reviewed the product's permitted-use and prohibited-use conditions?" },
      { label: "Do we have a process for verifying data accuracy where it informs significant decisions?" },
      { label: "Is meaningful human review built into high-impact decision processes?" },
      { label: "Have we assessed whether the intended use could result in unfair or discriminatory outcomes?" },
      { label: "Do we have appropriate security controls in place for this data?" },
      { label: "Have we defined a retention period and a deletion process?" },
      { label: "Are we maintaining adequate records to demonstrate compliance?" },
      { label: "Do we have a process for reviewing whether our use has changed over time?" },
    ],
    relatedPageSlugs: ["provenance", "buyer-standards", "data-retention", "prohibited-uses"],
    seoTitle: "Responsible Use — DataHarbour Compliance Centre",
    seoDescription:
      "Understand DataHarbour's responsible-use expectations: declared purpose, proportionality, data minimisation, human oversight and accountability for governed data products.",
  },
  {
    slug: "provenance",
    title: "Data Provenance",
    eyebrow: "Where data comes from and how it has been handled",
    summary:
      "Provenance is the documented history of a data product — its original sources, how it was collected or acquired, what transformations have been applied and who has handled it. Every data product listed on DataHarbour must include provenance documentation.",
    intro:
      "Data provenance answers the question every responsible data buyer should ask: 'Where does this data come from, and can I trust it for my intended purpose?' At DataHarbour, suppliers are required to document the origin, collection method, transformation history and known limitations of their data products. This documentation is available to verified buyers and is reviewed as part of the supplier-standards process. Provenance does not guarantee that data is suitable for every purpose, but it provides the transparency needed to make informed assessment decisions.",
    status: "Public guidance",
    lastReviewedDisplay: "July 2026",
    legalNotice: true,
    sections: [
      {
        title: "Original source types",
        anchor: "sources",
        content:
          "Suppliers must identify the original source or sources from which their data product is derived. Common source types include public registries (such as Companies House, the Land Registry or the Electoral Register), commercial data partnerships, survey panels, transactional records, sensor networks, web-collected data and modelled or derived datasets. Each source type carries different strengths and limitations. A product derived from a statutory register benefits from the register's authority and update cycle but may be limited by the register's scope and accuracy. A product derived from survey panels may offer richer insights but is subject to sampling variation. Suppliers must be transparent about these trade-offs.",
      },
      {
        title: "Collection or acquisition method",
        anchor: "collection",
        content:
          "Suppliers must explain how the underlying data was collected or acquired. For registry-derived data, this includes the method of extraction (API, bulk download, scheduled pull) and the frequency of synchronisation. For survey-derived data, it includes the panel size, recruitment method, weighting approach and fieldwork period. For commercially acquired data, it includes the nature of the acquisition agreement and any restrictions passed through from the original data owner. The collection method directly affects data quality, coverage and refresh expectations.",
      },
      {
        title: "Contractual and licensing rights",
        anchor: "rights",
        content:
          "Suppliers must declare the basis on which they hold the right to offer the data product through the marketplace. This includes confirming that they own the data, hold a licence to distribute it or have otherwise obtained the necessary permissions from the data owner. Where rights are limited — for example, by geography, industry or use — those limitations must be clearly documented. DataHarbour does not independently verify all contractual arrangements, but suppliers are required to warrant their rights and may be asked to provide evidence during the supplier-review process.",
      },
      {
        title: "Transformation and aggregation",
        anchor: "transformation",
        content:
          "Most data products undergo some degree of transformation between raw collection and finished product. Suppliers must document significant transformations, including cleaning (removal of duplicates, correction of formatting), standardisation (mapping to common schemas or classifications), aggregation (combining individual records into statistical summaries), modelling (creating inferred attributes from observed data) and enrichment (adding data from other sources). Understanding these transformations is essential for assessing whether the product is fit for a specific analytical purpose.",
      },
      {
        title: "Refresh process",
        anchor: "refresh",
        content:
          "Suppliers must describe how and how often the data product is refreshed. This includes the frequency (real-time, daily, weekly, monthly, quarterly, annually), the method (automated API pull, manual upload, scheduled batch), the typical lag between source update and product update, and the versioning approach. Buyers relying on data for time-sensitive decisions must understand refresh timing and the implications of data that may be several weeks old at the point of use.",
      },
      {
        title: "Quality controls",
        anchor: "quality",
        content:
          "Suppliers are expected to document the quality-control processes applied to their data products. This may include validation rules, consistency checks, outlier detection, duplicate handling, completeness monitoring and cross-reference verification. Quality-control documentation helps buyers understand the reliability of the data and the supplier's commitment to maintaining standards. It does not guarantee that every record is accurate, but it provides transparency about the rigour applied.",
      },
      {
        title: "Geographic scope",
        anchor: "geography",
        content:
          "Suppliers must clearly state the geographic coverage of their data product, including which regions, countries or administrative areas are included and, where relevant, which areas are excluded or poorly covered. Geographic scope should be specific enough for a buyer to determine whether the product covers their area of interest. Partial coverage or known geographic gaps must be disclosed, not hidden.",
      },
      {
        title: "Known limitations",
        anchor: "limitations",
        content:
          "Every data product has limitations. Suppliers must document known limitations that could materially affect the product's fitness for typical use cases. This includes coverage gaps, accuracy caveats, refresh lag, model assumptions, known biases, minimum sample sizes, suppressed values and any other factors that a reasonable buyer would want to know before relying on the data. Concealing or downplaying known limitations undermines the trust that provenance documentation is designed to build.",
      },
      {
        title: "Sub-suppliers and third-party data",
        anchor: "sub-suppliers",
        content:
          "Where a supplier's data product incorporates data from sub-suppliers or third-party sources, those relationships must be disclosed to the extent that they materially affect the product's provenance. Buyers have a right to understand the full supply chain behind the data they are evaluating. Where sub-supplier arrangements change, the product's provenance documentation should be updated. DataHarbour may require additional evidence where sub-supplier relationships are complex or where rights depend on a chain of agreements.",
      },
      {
        title: "Documentation history",
        anchor: "history",
        content:
          "Provenance documentation is not static. Suppliers are expected to maintain a version history of their provenance documentation, recording when information was added, updated or corrected. This provides an audit trail for buyers who need to demonstrate that they relied on the documentation available at the time of their access request. Significant changes to provenance — such as a new data source or a change in refresh frequency — should be flagged to existing buyers.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Source identified",
        whatIsReviewed:
          "The supplier identifies and documents the original data sources, including their nature, authority and any known scope limitations.",
        whoIsResponsible: "Supplier, with review by DataHarbour supplier-assessment team",
        possibleOutcomes:
          "Sources are accepted as documented, further evidence is requested or the product is not listed if source documentation is insufficient.",
        limitation:
          "DataHarbour reviews the documentation provided but does not independently visit or audit every original data source.",
      },
      {
        step: 2,
        title: "Rights evidenced",
        whatIsReviewed:
          "The supplier provides evidence of the legal and contractual basis on which they are entitled to offer the data product.",
        whoIsResponsible: "Supplier, supported by their legal or compliance function",
        possibleOutcomes:
          "Rights are accepted, conditions are applied, further documentation is requested or the product is declined.",
        limitation:
          "DataHarbour does not provide legal advice on rights or conduct independent title verification. Suppliers warrant their own rights.",
      },
      {
        step: 3,
        title: "Method documented",
        whatIsReviewed:
          "The supplier documents the collection, acquisition, transformation and aggregation methods applied to the data.",
        whoIsResponsible: "Supplier's data and product teams",
        possibleOutcomes:
          "Methods are accepted as transparent and proportionate or further detail is requested before the product can be listed.",
        limitation:
          "Documentation reflects the supplier's own description. DataHarbour does not independently verify every processing step.",
      },
      {
        step: 4,
        title: "Quality reviewed",
        whatIsReviewed:
          "The supplier documents quality-control processes and known limitations. DataHarbour reviews quality indicators for consistency with the documented provenance.",
        whoIsResponsible: "Supplier with DataHarbour quality-review team",
        possibleOutcomes:
          "Quality documentation is accepted, improvement actions are recommended or the product is listed with noted quality caveats.",
        limitation:
          "Quality review is based on documentation and sample data. It does not guarantee that every record in a live product is accurate.",
      },
      {
        step: 5,
        title: "Restrictions recorded",
        whatIsReviewed:
          "The supplier specifies permitted uses, prohibited uses, retention limits and any other access conditions that buyers must accept.",
        whoIsResponsible: "Supplier, reviewed by DataHarbour compliance team",
        possibleOutcomes:
          "Restrictions are recorded on the product detail page and form part of the access agreement.",
        limitation:
          "Restrictions are set by the supplier. DataHarbour may decline to list a product whose restrictions are unreasonable, but it does not dictate supplier terms.",
      },
      {
        step: 6,
        title: "Version monitored",
        whatIsReviewed:
          "Ongoing monitoring of provenance documentation for material changes, and notification to existing buyers when significant changes occur.",
        whoIsResponsible: "Supplier, with oversight from DataHarbour",
        possibleOutcomes:
          "Changes are recorded, buyers are notified and provenance documentation is updated on the product page.",
        limitation:
          "Monitoring depends on suppliers notifying DataHarbour of changes. There may be a lag between a change and its publication.",
      },
    ],
    relatedPageSlugs: ["supplier-standards", "responsible-use", "buyer-standards", "security"],
    seoTitle: "Data Provenance — DataHarbour Compliance Centre",
    seoDescription:
      "Understand how DataHarbour documents data provenance — sources, collection methods, rights, transformations and quality controls for every governed data product.",
  },
  {
    slug: "buyer-standards",
    title: "Buyer Standards",
    eyebrow: "Expectations for organisations accessing governed data",
    summary:
      "Organisations seeking access to data products through DataHarbour must meet buyer standards covering identity, purpose, security and ongoing accountability. These standards are designed to build a trustworthy marketplace where every participant is known, verified and responsible.",
    intro:
      "DataHarbour is not an open data supermarket. Every organisation that wishes to access governed data products must complete a buyer-verification process and agree to ongoing standards of conduct. These standards exist to protect data suppliers, data subjects and the integrity of the marketplace. They apply regardless of the access level of the product being requested and are supplemented by product-specific conditions.",
    status: "Public guidance",
    lastReviewedDisplay: "July 2026",
    legalNotice: true,
    requirements: [
      {
        title: "Genuine organisation",
        description:
          "Buyers must be genuine organisations — registered companies, partnerships, public bodies, charities or other recognised legal entities. Individuals acting in a purely personal capacity are not eligible for buyer accounts. The organisation must be verifiable through public registries or equivalent documentation. Shelf companies, dissolved entities and organisations with no verifiable trading presence will not be approved.",
      },
      {
        title: "Authorised account holder",
        description:
          "Every buyer account must be held by an individual who is authorised to act on behalf of the organisation. This person is responsible for the accuracy of the information provided during verification, for managing who within the organisation can access data and for ensuring that the organisation complies with its access agreements. A single organisation may have multiple authorised users, but each must be individually verified.",
      },
      {
        title: "Clear intended purpose",
        description:
          "The buyer must declare a clear, specific and lawful business purpose for the data they wish to access. This purpose is recorded, reviewed and, where required, assessed for compliance. A buyer who cannot articulate a credible business purpose will not be granted access, regardless of their organisational status. The declared purpose forms part of the access agreement and may be referenced in compliance reviews.",
      },
      {
        title: "Relevant internal controls",
        description:
          "The buyer must have appropriate internal controls for handling the type of data they are requesting. This includes data-governance policies, staff training, access controls and, where relevant, a data-protection officer or equivalent function. The level of internal control expected is proportionate to the sensitivity and volume of data requested. Buyers accessing higher-sensitivity or higher-volume products may be asked to demonstrate more robust controls.",
      },
      {
        title: "Appropriate user access",
        description:
          "Access to data within the buyer's organisation must be limited to individuals who need it for the declared purpose. Sharing access credentials, allowing unauthorised staff to view data or failing to remove access when someone changes role or leaves the organisation are breaches of the buyer's obligations.",
      },
      {
        title: "Secure storage and transfer",
        description:
          "Data must be stored and transferred using security measures appropriate to its classification. Buyers must protect data at rest and in transit, encrypt where required, control physical and logical access and avoid storing data on unsecured devices or in personal accounts. Cloud storage and processing environments must meet the buyer's own security standards and any product-specific requirements.",
      },
      {
        title: "Retention plan",
        description:
          "Buyers must have a plan for how long accessed data will be retained, linked to the declared purpose and licence terms. Data must not be retained indefinitely or 'just in case'. When the purpose is fulfilled or the licence expires, data must be securely deleted unless a legal obligation requires retention. The retention plan should be documented and available for review.",
      },
      {
        title: "No unauthorised onward sharing",
        description:
          "Data accessed through DataHarbour must not be shared, resold, sublicensed or otherwise provided to third parties outside the terms of the access agreement. Sharing with affiliates, contractors or service providers may be permitted in limited circumstances, but only where it is within the product's permitted-use terms and the buyer remains responsible for the third party's compliance.",
      },
      {
        title: "Incident notification",
        description:
          "Buyers must notify DataHarbour promptly if they become aware of a security incident, data breach or unauthorised access that may affect data obtained through the marketplace. Notification should include the nature of the incident, the data affected and the steps taken to contain and resolve it. Timely notification supports the integrity of the marketplace and the interests of suppliers and data subjects.",
      },
      {
        title: "Cooperation with reviews",
        description:
          "Buyers must cooperate with any compliance review initiated by DataHarbour or by a supplier. This may include providing evidence of compliance with access terms, confirming that data is being used for the declared purpose or demonstrating that retention and deletion obligations have been met. Failure to cooperate may result in suspension or termination of access.",
      },
      {
        title: "Updated information when use changes",
        description:
          "If the buyer's use of data changes materially — for example, a new business purpose, a different team or a new processing activity — the buyer must update their declared purpose and, where necessary, submit a new access request. Continuing to use data for an undeclared purpose is a breach of the buyer's obligations and may result in access being suspended or terminated.",
      },
    ],
    sections: [
      {
        title: "Possible review outcomes",
        anchor: "outcomes",
        content:
          "When a buyer submits an access request, the outcome is determined by the product's access level, the completeness and credibility of the buyer's application and any compliance or supplier-approval requirements. Possible outcomes include: Approved (the buyer meets all requirements and access is granted), Approved with conditions (access is granted subject to specific limitations or additional obligations), More information required (the application is paused pending further documentation), Declined (the application does not meet the required standard), Suspended (access is temporarily halted, typically due to a compliance concern), and Expired (access has reached the end of its agreed term and requires renewal). These are planned statuses and are not yet fully operational in the demonstration platform.",
      },
    ],
    relatedPageSlugs: ["supplier-standards", "responsible-use", "prohibited-uses", "security"],
    seoTitle: "Buyer Standards — DataHarbour Compliance Centre",
    seoDescription:
      "Understand the standards expected of organisations accessing governed data through DataHarbour — identity verification, purpose declaration, security and accountability.",
  },
  {
    slug: "supplier-standards",
    title: "Supplier Standards",
    eyebrow: "Expectations for organisations listing data products",
    summary:
      "Organisations wishing to list data products on DataHarbour must meet supplier standards covering identity, rights, provenance, quality, security and ongoing obligations. These standards protect buyers, data subjects and the reputation of the marketplace.",
    intro:
      "Becoming a DataHarbour supplier is a commitment to transparency, quality and responsible data stewardship. Suppliers are not merely listing products — they are joining a governed marketplace where every listing is accompanied by documented provenance, declared restrictions and verifiable supplier information. The standards on this page describe what DataHarbour expects from suppliers and what buyers can expect from the suppliers they engage with.",
    status: "Public guidance",
    lastReviewedDisplay: "July 2026",
    legalNotice: true,
    requirements: [
      {
        title: "Organisation identity",
        description:
          "Suppliers must be verifiable organisations. DataHarbour will confirm the supplier's legal name, registration number (where applicable), registered address and the identity of the individual authorised to represent the organisation. Suppliers that cannot be verified through public registries or equivalent documentation will not be permitted to list products.",
      },
      {
        title: "Rights to provide the product",
        description:
          "Suppliers must hold the necessary rights to offer the data product through the marketplace. This means they must own the data, hold a valid licence to distribute it or have otherwise lawfully obtained the right to make it available. Suppliers warrant these rights as part of their listing agreement. Where rights are limited by geography, industry or use, those limitations must be clearly disclosed.",
      },
      {
        title: "Provenance documentation",
        description:
          "Every listed product must include complete provenance documentation as described in the Provenance standards. This covers original sources, collection or acquisition methods, transformation and aggregation processes, refresh procedures and known limitations. Incomplete or misleading provenance documentation is grounds for delisting.",
      },
      {
        title: "Product description accuracy",
        description:
          "Product listings must be accurate, current and not misleading. This includes the product name, category, description, data fields, coverage claims, refresh frequency, delivery methods, pricing information and any quality indicators. Overstating coverage, understating limitations or making claims that cannot be substantiated is a breach of supplier standards.",
      },
      {
        title: "Quality and refresh processes",
        description:
          "Suppliers must have documented processes for maintaining data quality and for refreshing data at the advertised frequency. Quality-control documentation should be available to buyers on request or as part of the product listing. Suppliers must notify DataHarbour and affected buyers if quality drops below documented thresholds or if a refresh is delayed beyond the normal schedule.",
      },
      {
        title: "Usage restrictions",
        description:
          "Suppliers must clearly state the permitted and prohibited uses for each product. Restrictions must be reasonable, clearly communicated and consistently applied. A supplier may not impose restrictions that are disproportionate, discriminatory or designed to circumvent the marketplace's governance model. Buyers are entitled to understand restrictions before requesting access.",
      },
      {
        title: "Security controls",
        description:
          "Suppliers must maintain security controls appropriate to the data they hold and distribute. This includes access controls, encryption, vulnerability management, incident-response procedures and secure delivery mechanisms. Suppliers must notify DataHarbour of any security incident that may affect the confidentiality, integrity or availability of data products listed on the marketplace.",
      },
      {
        title: "Incident response",
        description:
          "Suppliers must have a documented incident-response plan and must notify DataHarbour without undue delay if a security incident, data breach or significant service disruption occurs. The notification should include the nature of the incident, the products and buyers affected, the steps being taken to contain and resolve the issue and the expected timeline for resolution.",
      },
      {
        title: "Change notification",
        description:
          "Suppliers must notify DataHarbour of material changes to a listed product before those changes take effect. Material changes include changes to data sources, coverage, refresh frequency, pricing, permitted uses, restrictions, delivery methods or the supplier's own organisational status. Buyers must be given reasonable notice of changes that may affect their use of the product.",
      },
      {
        title: "Version control",
        description:
          "Suppliers must maintain clear version control for their data products. Each version should be identifiable, and the differences between versions should be documented. Buyers should be able to determine which version of a product they are accessing and what has changed since the previous version. Version history should be available on the product detail page.",
      },
      {
        title: "Data-subject support",
        description:
          "Where a data product contains or is derived from personal data, the supplier must have arrangements in place to support data-subject rights requests. This may include responding to access, correction, deletion or objection requests that relate to the supplier's data. The allocation of responsibility between supplier and buyer for handling such requests should be clearly documented.",
      },
      {
        title: "Cooperation with audits and complaints",
        description:
          "Suppliers must cooperate with any audit or review initiated by DataHarbour and must respond constructively to complaints raised by buyers or data subjects. Failure to cooperate — or a pattern of unresolved complaints — may result in suspension or delisting. Cooperation includes providing evidence, responding to questions within a reasonable timeframe and implementing agreed remedial actions.",
      },
    ],
    nextStepText: "Interested in becoming a supplier?",
    nextStepLink: "/suppliers",
    relatedPageSlugs: ["buyer-standards", "provenance", "security", "responsible-use"],
    seoTitle: "Supplier Standards — DataHarbour Compliance Centre",
    seoDescription:
      "Understand the standards expected of organisations listing data products on DataHarbour — identity, rights, provenance, quality, security and ongoing obligations.",
  },
  {
    slug: "security",
    title: "Security",
    eyebrow: "How DataHarbour plans to protect data",
    summary:
      "DataHarbour's planned security model covers account security, encryption, access controls, monitoring, incident response and supplier security expectations. This page describes the controls that DataHarbour intends to implement and maintain.",
    intro:
      "Security is a cornerstone of the DataHarbour trust model. This page describes the security measures that DataHarbour plans to implement to protect the marketplace platform, buyer and supplier accounts, data in transit and at rest, and the delivery mechanisms through which data products are accessed. It also describes the security responsibilities that buyers and suppliers each carry. Controls marked as 'Planned' are part of DataHarbour's design and will be implemented before the service becomes operational.",
    status: "Planned control",
    lastReviewedDisplay: "July 2026",
    legalNotice: true,
    sections: [
      {
        title: "Account security",
        anchor: "accounts",
        content:
          "All buyer and supplier accounts will be protected by multi-factor authentication. Account creation will require email verification and, for organisation accounts, verification of the individual's authority to act on behalf of the organisation. Password policies will enforce minimum complexity and regular rotation where appropriate. Session management will include automatic timeouts, suspicious-activity detection and the ability for account holders to view and terminate active sessions. Account-recovery processes will be designed to resist social-engineering attacks.",
      },
      {
        title: "Role-based access",
        anchor: "rbac",
        content:
          "Access to platform functions and data will be controlled through role-based access controls. Buyers will be able to define which individuals within their organisation can browse the marketplace, request access, download data or manage account settings. Suppliers will be able to control who can manage listings, view buyer enquiries or access analytics. DataHarbour's own staff access will be strictly limited to roles that require it, with privileged access logged and reviewed.",
      },
      {
        title: "Encryption in transit and at rest",
        anchor: "encryption",
        content:
          "All communications between buyers, suppliers and the DataHarbour platform will be encrypted in transit using TLS 1.2 or higher. Data at rest within the DataHarbour platform will be encrypted using industry-standard encryption. Data products delivered through the platform will be protected during delivery, and buyers will be expected to maintain encryption for data they store locally. Encryption key management will follow the principle of least privilege.",
      },
      {
        title: "Secret and key management",
        anchor: "secrets",
        content:
          "API keys, authentication tokens and other secrets will be managed through a dedicated secrets-management system. Keys will be rotatable, scopeable and revocable. Access to production secrets will be limited to authorised personnel and automated deployment processes. Secrets will never be stored in source code, configuration files or unstructured documentation.",
      },
      {
        title: "Secure file delivery",
        anchor: "delivery",
        content:
          "Data products delivered as files (CSV, JSON, reports) will be delivered through secure, authenticated channels. Download links will be time-limited and tied to the authorised buyer's session. File integrity will be verifiable through checksums where appropriate. Bulk or repeated downloads may be rate-limited to prevent abuse.",
      },
      {
        title: "Logging and monitoring",
        anchor: "logging",
        content:
          "DataHarbour will maintain logs of platform activity, including access requests, data deliveries, account changes and administrative actions. Logs will be protected from tampering and retained for a period appropriate to their purpose. Monitoring systems will detect anomalous activity patterns and alert the operations team. Log data will be available to support compliance reviews, incident investigations and audit requests.",
      },
      {
        title: "Vulnerability management",
        anchor: "vulnerabilities",
        content:
          "DataHarbour will operate a vulnerability-management process that includes regular dependency scanning, patch management and a defined window for applying security updates. Third-party penetration testing is planned as part of the pre-launch security assurance process. Vulnerability disclosures from external researchers will be welcomed through a published security contact.",
      },
      {
        title: "Backup and recovery",
        anchor: "backup",
        content:
          "Platform data, including marketplace listings, account information and compliance records, will be backed up regularly. Backups will be encrypted, stored separately from production systems and tested for recoverability. Recovery-time and recovery-point objectives will be defined and reviewed. Buyers and suppliers remain responsible for backing up data they have downloaded or exported from the platform.",
      },
      {
        title: "Incident response",
        anchor: "incident",
        content:
          "DataHarbour will maintain an incident-response plan covering security breaches, service disruptions and data incidents. The plan will define roles, escalation paths, communication procedures and post-incident review requirements. Buyers and suppliers will be notified of incidents that may affect them in line with regulatory requirements and contractual commitments.",
      },
      {
        title: "Supplier security evidence",
        anchor: "supplier-security",
        content:
          "Suppliers will be asked to provide summary information about their security practices as part of the listing process. This may include their approach to access control, encryption, vulnerability management and incident response. DataHarbour does not independently certify supplier security, but may require additional evidence for products classified at higher sensitivity levels.",
      },
      {
        title: "Buyer security responsibilities",
        anchor: "buyer-security",
        content:
          "Buyers are responsible for securing data after it has been delivered. This includes protecting stored data, controlling access within their organisation, securing data in transit within their own systems and deleting data when retention is no longer required. DataHarbour's security controls protect the platform; the buyer's controls protect the data after delivery.",
      },
      {
        title: "Staff access controls",
        anchor: "staff",
        content:
          "DataHarbour staff will have access to platform data only where necessary for their role. Access will be authenticated, logged and periodically reviewed. Privileged access will require additional approval and will be time-limited. Staff will receive security training and will be subject to confidentiality obligations. Access to buyer or supplier data for support purposes will require the account holder's consent where practicable.",
      },
    ],
    relatedPageSlugs: ["buyer-standards", "supplier-standards", "data-retention", "responsible-use"],
    seoTitle: "Security — DataHarbour Compliance Centre",
    seoDescription:
      "Understand DataHarbour's planned security model — account security, encryption, access controls, monitoring, incident response and shared security responsibilities.",
  },
  {
    slug: "data-retention",
    title: "Data Retention",
    eyebrow: "How long data may be kept and when it must be deleted",
    summary:
      "Data accessed through DataHarbour must only be retained for as long as is necessary for the declared purpose and in line with licence terms. This page explains retention expectations, deletion practices and the buyer's responsibilities.",
    intro:
      "Retention is not an afterthought — it is a core element of responsible data use. Every access agreement includes retention terms that define how long data may be kept and what must happen when the retention period ends. Buyers must plan for retention before they access data and must be able to demonstrate that data has been deleted when it is no longer required. This page explains the principles and provides a practical checklist for buyers.",
    status: "Public guidance",
    lastReviewedDisplay: "July 2026",
    legalNotice: true,
    sections: [
      {
        title: "Purpose-linked retention",
        anchor: "purpose-linked",
        content:
          "The permitted retention period is linked to the declared business purpose. Data accessed for a specific project should be deleted when that project concludes. Data accessed for ongoing monitoring may be retained for the duration of the monitoring arrangement, subject to periodic review. Data accessed 'just in case' or for undefined future use does not have a valid retention basis and should not be retained.",
      },
      {
        title: "Supplier licence limits",
        anchor: "licence-limits",
        content:
          "Many data products carry supplier-imposed retention limits. A product might be licensed for a twelve-month term, with data to be deleted or returned at the end of that term unless the licence is renewed. Buyers must check the product's retention terms before access and must not retain data beyond the licensed period without renewal. Licence-expiry dates should be tracked as part of the buyer's data-governance process.",
      },
      {
        title: "Buyer-declared retention",
        anchor: "buyer-declared",
        content:
          "As part of the access-request process, buyers may be asked to declare their intended retention period. This declaration forms part of the access agreement and may be reviewed during compliance checks. The declared retention period should be realistic, linked to the business purpose and no longer than necessary. Overly long retention periods without a credible justification may result in the request being conditioned or declined.",
      },
      {
        title: "Renewal and expiry",
        anchor: "renewal",
        content:
          "If the buyer needs to retain data beyond the original retention period, they must renew their access or request an extension before the period expires. Continued use after expiry without renewal is a breach of the access agreement. Renewal may require reconfirmation of the business purpose, updated compliance information or a new access request. The renewal process is designed to be proportionate but ensures that retention does not become indefinite by default.",
      },
      {
        title: "Secure deletion",
        anchor: "deletion",
        content:
          "When the retention period ends, data must be securely deleted. Secure deletion means that the data is rendered irrecoverable using methods appropriate to the storage medium — overwriting, cryptographic erasure or physical destruction. Simply moving files to a recycle bin or marking records as inactive is not sufficient. Buyers must be able to confirm, if asked, that deletion has been completed.",
      },
      {
        title: "Archived records",
        anchor: "archives",
        content:
          "In limited circumstances, a buyer may need to retain a minimal copy of data for audit, legal or regulatory purposes after the primary retention period has ended. This archived copy must be strictly limited in scope, access-restricted and retained only for as long as the legal or regulatory requirement applies. Archived data must not be used for operational or analytical purposes.",
      },
      {
        title: "Legal hold",
        anchor: "legal-hold",
        content:
          "Where a legal obligation, litigation or regulatory investigation requires the preservation of data that would otherwise be deleted, a legal hold may suspend normal retention timelines. The hold must be documented, the affected data must be identified and normal deletion must resume once the hold is lifted. Legal holds should be the exception, not a routine way to extend retention.",
      },
      {
        title: "Audit-log retention",
        anchor: "audit-logs",
        content:
          "DataHarbour will retain audit logs of access requests, approvals, deliveries and other platform events for a defined period. These logs support compliance reviews, dispute resolution and security investigations. Log-retention periods are set to balance accountability with data-minimisation principles. Detailed log-retention periods will be published in the platform's operational documentation.",
      },
      {
        title: "Account closure",
        anchor: "closure",
        content:
          "If a buyer closes their DataHarbour account, all data accessed through the platform must be deleted or returned in line with the terms of each active access agreement. The buyer should confirm completion of deletion as part of the account-closure process. DataHarbour will retain account and transaction records for a defined period after closure for audit and legal purposes.",
      },
      {
        title: "Data-subject requests and retention",
        anchor: "dsr",
        content:
          "Data that is subject to a data-subject request (for example, a request for deletion) must be handled in line with the applicable data-protection law, regardless of the standard retention period. If a valid deletion request is received, the buyer must assess whether they are the data controller for that data and, if so, respond in line with their legal obligations. Retention terms do not override data-subject rights.",
      },
      {
        title: "Backup deletion limitations",
        anchor: "backups",
        content:
          "Data that has been deleted from live systems may persist in backups for a limited period until those backups are rotated or overwritten. Buyers should be aware of this limitation and should not rely on backup rotation as a substitute for timely deletion. Backup-retention periods should be factored into the buyer's overall data-governance plan. DataHarbour will apply the same principle to its own platform backups.",
      },
    ],
    checklist: [
      { label: "Have we defined the retention period linked to our declared business purpose?" },
      { label: "Have we checked the product licence for supplier-imposed retention limits?" },
      { label: "Have we recorded the retention period in our data-governance documentation?" },
      { label: "Do we have a process for tracking licence-expiry dates?" },
      { label: "Have we defined what 'secure deletion' means for each storage environment we use?" },
      { label: "Do we have a process for confirming that deletion has been completed?" },
      { label: "Do we know which data must be archived for legal or audit reasons?" },
      { label: "Are archived copies access-restricted and not used for operational purposes?" },
      { label: "Do we have a legal-hold procedure?" },
      { label: "Have we planned for deletion on account closure?" },
      { label: "Have we considered how data-subject deletion requests interact with our retention commitments?" },
    ],
    relatedPageSlugs: ["responsible-use", "buyer-standards", "security", "data-subject-rights"],
    seoTitle: "Data Retention — DataHarbour Compliance Centre",
    seoDescription:
      "Understand DataHarbour's data-retention expectations — purpose-linked retention, licence limits, secure deletion, archiving and buyer responsibilities.",
  },
  {
    slug: "data-subject-rights",
    title: "Data-Subject Rights",
    eyebrow: "How data-subject requests will be handled",
    summary:
      "DataHarbour is committed to supporting the rights of individuals whose personal data may be processed through the marketplace. This page explains the planned pathway for data-subject requests and the responsibilities of buyers, suppliers and DataHarbour.",
    intro:
      "Under UK data-protection law, individuals have rights over their personal data — including the right to access, correct, delete, restrict and object to processing. DataHarbour's marketplace will handle data products that may contain or be derived from personal data. This page explains how DataHarbour intends to support data-subject rights and clarifies the respective responsibilities of buyers, suppliers and the platform.",
    status: "Planned control",
    lastReviewedDisplay: "July 2026",
    legalNotice: true,
    sections: [
      {
        title: "Right of access",
        anchor: "access",
        content:
          "Individuals may request confirmation of whether their personal data is processed through the DataHarbour marketplace and, if so, access to that data. The responsibility for responding depends on who is the data controller for the relevant processing. Where DataHarbour is the controller, it will respond directly. Where a supplier or buyer is the controller, DataHarbour will facilitate the request by forwarding it to the responsible party and tracking the response.",
      },
      {
        title: "Right to correction",
        anchor: "correction",
        content:
          "Individuals may request that inaccurate personal data be corrected. DataHarbour encourages suppliers to maintain processes for handling correction requests related to their data products. Buyers who identify potentially inaccurate data should notify DataHarbour, which will liaise with the relevant supplier. Correction requests should be acknowledged promptly and resolved within the statutory timeframe.",
      },
      {
        title: "Right to deletion",
        anchor: "deletion",
        content:
          "Individuals may request deletion of their personal data in certain circumstances. Where DataHarbour, a supplier or a buyer is the data controller and the request meets the legal criteria, the data must be deleted. Where the data has been shared with other parties through the marketplace, DataHarbour will take reasonable steps to notify those parties of the deletion request.",
      },
      {
        title: "Right to restriction",
        anchor: "restriction",
        content:
          "Individuals may request that processing of their personal data be restricted in certain circumstances — for example, while the accuracy of the data is being verified or while an objection to processing is being assessed. Restricted data may be stored but not otherwise processed. DataHarbour will communicate restriction requests to relevant suppliers and buyers.",
      },
      {
        title: "Right to object",
        anchor: "objection",
        content:
          "Individuals may object to the processing of their personal data in certain circumstances, including where the processing is based on legitimate interests or is for direct-marketing purposes. If a valid objection is received, the controller must stop processing unless there are compelling legitimate grounds that override the individual's interests. DataHarbour will facilitate objections received through its data-subject-request process.",
      },
      {
        title: "Right to data portability",
        anchor: "portability",
        content:
          "Where personal data is processed by automated means and the processing is based on consent or a contract, individuals may have the right to receive their data in a structured, commonly used and machine-readable format. This right applies to data the individual has provided to the controller. Its applicability in the DataHarbour context will depend on the nature of the data product and the controller's relationship with the data subject.",
      },
      {
        title: "Questions about source",
        anchor: "source",
        content:
          "Individuals may ask where their personal data came from if it was not collected directly from them. Suppliers listing products that contain personal data must be prepared to identify the source of that data. This information forms part of the product's provenance documentation and should be available to buyers and, where appropriate, to data subjects.",
      },
      {
        title: "Complaints",
        anchor: "complaints",
        content:
          "Individuals who are dissatisfied with how their data-subject request has been handled may raise a complaint with DataHarbour. DataHarbour will review the complaint, liaise with the relevant buyer or supplier and respond within a reasonable timeframe. Individuals also have the right to complain to the Information Commissioner's Office (ICO), the UK's data-protection regulator.",
      },
      {
        title: "Identity verification",
        anchor: "identity",
        content:
          "Before responding to a data-subject request, the controller must verify the identity of the requester. This is to prevent unauthorised access to personal data. DataHarbour will verify the identity of individuals submitting requests through its platform using proportionate methods. Where a request relates to data held by a supplier or buyer, that party is responsible for its own identity-verification process.",
      },
      {
        title: "Supplier coordination",
        anchor: "coordination",
        content:
          "Where a data-subject request relates to a supplier's data product, DataHarbour will coordinate with the supplier to ensure the request is handled appropriately. The supplier's obligations will be set out in their supplier agreement. Suppliers who repeatedly fail to handle data-subject requests adequately may face suspension or delisting.",
      },
      {
        title: "Response tracking",
        anchor: "tracking",
        content:
          "DataHarbour will maintain a record of data-subject requests received through its platform, including the request type, date of receipt, responsible party, status and resolution date. This record supports accountability and enables DataHarbour to monitor response times and identify recurring issues. Tracking data will be retained in line with the platform's data-retention policy.",
      },
    ],
    nextStepText: "Submit a data-subject request",
    nextStepLink: "/data-subject-request",
    relatedPageSlugs: ["data-retention", "responsible-use", "security", "prohibited-uses"],
    seoTitle: "Data-Subject Rights — DataHarbour Compliance Centre",
    seoDescription:
      "Understand how DataHarbour plans to support data-subject rights — access, correction, deletion, objection and the responsibilities of buyers, suppliers and the platform.",
  },
  {
    slug: "prohibited-uses",
    title: "Prohibited Uses",
    eyebrow: "What cannot be done with DataHarbour data",
    summary:
      "Certain uses of data are prohibited on DataHarbour regardless of the product, the buyer or the declared purpose. This page lists prohibited uses, explains why they are prohibited and outlines the consequences of non-compliance.",
    intro:
      "DataHarbour exists to support legitimate, responsible and lawful use of governed data. Some uses are fundamentally incompatible with that mission — either because they are unlawful, because they violate the rights and expectations of individuals or because they undermine the trust on which the marketplace depends. The prohibited uses listed on this page apply across all DataHarbour products and are enforced through access agreements, compliance review and, where necessary, suspension or termination of access.",
    status: "Public guidance",
    lastReviewedDisplay: "July 2026",
    legalNotice: true,
    prohibitedUseGroups: [
      {
        category: "Harassment and harm",
        items: [
          "Harassment, stalking or intimidation of any person.",
          "Doxxing — publishing private or identifying information about an individual with intent to harass, intimidate or cause harm.",
          "Creating or distributing deceptive, defamatory or harmful profiles of individuals or organisations.",
          "Any use that enables, encourages or facilitates violence, abuse or exploitation.",
        ],
      },
      {
        category: "Discrimination and unfair treatment",
        items: [
          "Unlawful discrimination based on protected characteristics under the Equality Act 2010.",
          "Using data to make decisions about individuals for employment, housing, credit or insurance purposes in a way that violates applicable law.",
          "Profiling that produces unfair or disproportionate outcomes for individuals or groups.",
          "Using data to target vulnerable individuals or groups for exploitative purposes.",
        ],
      },
      {
        category: "Unauthorised people searching and re-identification",
        items: [
          "Unauthorised people searching — using DataHarbour products to search for, identify or profile specific individuals without a lawful purpose.",
          "Re-identification — attempting to re-identify individuals from aggregated, anonymised or pseudonymised data.",
          "Combining multiple DataHarbour products or external datasets to circumvent de-identification measures.",
          "Using data to infer sensitive characteristics about individuals without a lawful basis.",
        ],
      },
      {
        category: "Surveillance and monitoring",
        items: [
          "Unlawful surveillance of individuals or groups.",
          "Monitoring of individuals without a lawful basis, transparency or appropriate safeguards.",
          "Using location-intelligence products to track the movements of specific individuals.",
          "Deploying data for state-surveillance purposes outside lawful, transparent and proportionate frameworks.",
        ],
      },
      {
        category: "Fraud and deception",
        items: [
          "Credential theft, identity fraud or impersonation supported by data obtained through the marketplace.",
          "Creating synthetic identities for fraudulent purposes.",
          "Misrepresenting the source, accuracy or permitted use of data to third parties.",
          "Using data to facilitate phishing, social engineering or other deceptive practices.",
        ],
      },
      {
        category: "Unauthorised redistribution and commercial exploitation",
        items: [
          "Onward sale, resale or sublicensing of data outside the terms of the access agreement.",
          "Incorporating DataHarbour data into a competing product or service without authorisation.",
          "Unauthorised marketing — using data for direct marketing where the product's permitted-use terms or applicable law do not allow it.",
          "Publishing data in a form that allows others to circumvent access controls.",
        ],
      },
      {
        category: "Automated high-impact decisions",
        items: [
          "Solely automated decision-making that produces legal or similarly significant effects on individuals, without meaningful human review and appropriate safeguards.",
          "Using data to make automated decisions about eligibility for essential services, employment or credit without the transparency and review required by law.",
          "Deploying automated decision systems that are not adequately tested for fairness, accuracy and bias.",
        ],
      },
      {
        category: "Children and vulnerable people",
        items: [
          "Using data to target, profile or make decisions about children without an approved lawful purpose and appropriate safeguards.",
          "Exploitation of vulnerable individuals through data-driven targeting or decision-making.",
          "Processing data relating to children or vulnerable people in a way that disregards their heightened protection under data-protection law.",
        ],
      },
      {
        category: "Circumvention and evasion",
        items: [
          "Bypassing access controls, rate limits or authentication mechanisms.",
          "Combining data from multiple products or sources to evade usage restrictions.",
          "Using DataHarbour data to train or improve a competing marketplace, data-broker service or ungoverned data exchange.",
          "Any attempt to obscure or misrepresent the true purpose of data access.",
        ],
      },
      {
        category: "Unlawful purposes",
        items: [
          "Any use that violates applicable law in the United Kingdom or in the jurisdiction where the buyer operates.",
          "Any use that contravenes UK data-protection law, including the UK GDPR and the Data Protection Act 2018.",
          "Any use that DataHarbour reasonably determines is inconsistent with the trust, integrity or reputation of the marketplace.",
        ],
      },
    ],
    sections: [
      {
        title: "Consequences of prohibited use",
        anchor: "consequences",
        content:
          "If DataHarbour determines that a buyer has engaged in prohibited use, the following consequences may apply, depending on the severity and circumstances: immediate suspension of access to the relevant data product, suspension or termination of the buyer's DataHarbour account, notification to the affected supplier, notification to relevant regulatory authorities where required by law, and permanent exclusion from the DataHarbour marketplace. DataHarbour reserves the right to investigate suspected prohibited use through review of platform logs, buyer records and other available information. Buyers are expected to cooperate fully with any such investigation. This list is not exhaustive, and DataHarbour may take additional action as appropriate to the circumstances.",
      },
    ],
    relatedPageSlugs: ["responsible-use", "buyer-standards", "data-subject-rights", "faqs"],
    seoTitle: "Prohibited Uses — DataHarbour Compliance Centre",
    seoDescription:
      "Review the uses that are prohibited on DataHarbour — harassment, discrimination, re-identification, unauthorised surveillance, fraud and other unlawful or harmful activities.",
  },
  {
    slug: "faqs",
    title: "Compliance FAQs",
    eyebrow: "Frequently asked questions about DataHarbour governance",
    summary:
      "Answers to common questions about DataHarbour's compliance model, buyer and supplier expectations, provenance, data-subject rights and the status of the platform.",
    intro:
      "This page answers the questions most frequently raised about DataHarbour's governance and compliance framework. If your question is not answered here, please contact DataHarbour through the Contact page. These FAQs are updated periodically as the platform develops and as new questions arise.",
    status: "Public guidance",
    lastReviewedDisplay: "July 2026",
    legalNotice: true,
    faqs: [
      {
        question: "Does DataHarbour guarantee that a listed data product is compliant with all applicable laws?",
        answer:
          "No. DataHarbour provides a governance framework — supplier review, provenance documentation, buyer verification and usage controls — but legal compliance depends on how the data is used, by whom and for what purpose. A product that is lawful for one buyer's declared purpose may not be lawful for another buyer's different purpose. DataHarbour does not provide legal advice, and a listing does not constitute a legal-compliance guarantee. Buyers remain responsible for ensuring that their use of data is lawful.",
      },
      {
        question: "Does a product listing on DataHarbour mean I can access and use the data immediately?",
        answer:
          "No. A listing in the marketplace catalogue is an invitation to evaluate — it is not an offer of immediate access. Depending on the product's access level, you may need to complete organisation verification, declare a business purpose, accept licence terms, undergo compliance review or obtain supplier approval before access is granted. The access level is displayed on the product detail page so you can understand what will be required.",
      },
      {
        question: "How are buyers reviewed?",
        answer:
          "Buyer review is designed to confirm that the organisation is genuine, that the individual requesting access is authorised to act on its behalf and that the declared business purpose is credible, specific and lawful. The depth of review increases with the access level of the product being requested. For products requiring compliance review or supplier approval, additional checks may include the buyer's internal controls, data-protection arrangements and intended data-handling practices.",
      },
      {
        question: "How are suppliers reviewed?",
        answer:
          "Supplier review covers organisation identity, rights to offer the data product, provenance documentation, product-description accuracy and security arrangements. DataHarbour does not independently audit every supplier, but it requires suppliers to provide evidence of their claims and to warrant their compliance with supplier standards. Suppliers who cannot meet these standards will not be permitted to list products.",
      },
      {
        question: "What does 'provenance' mean in practice?",
        answer:
          "Provenance is the documented history of a data product — where the data came from, how it was collected or acquired, what transformations have been applied, how it is refreshed and what limitations are known. It is the answer to the question 'Can I trust this data for my purpose?' Provenance documentation is required for every DataHarbour listing and is available to verified buyers. It is not a guarantee of accuracy, but it provides the transparency needed for informed assessment.",
      },
      {
        question: "Can I use a data product for marketing?",
        answer:
          "It depends on the product. Some products explicitly permit use for marketing planning, audience segmentation and campaign analysis — provided the marketing is lawful and the data is used in aggregate or anonymised form. Other products explicitly prohibit marketing use. You must check the product's permitted-use and prohibited-use summaries before requesting access. Even where marketing use is permitted, it must comply with PECR and UK GDPR.",
      },
      {
        question: "What happens if my business purpose changes after I have been granted access?",
        answer:
          "If your use of the data changes materially, you must update your declared purpose and, where necessary, submit a new access request or notify DataHarbour. Continuing to use data for an undeclared purpose is a breach of your access agreement. Changes that may trigger review include using the data for a different business function, for a different product or service, for client-facing rather than internal use or for a purpose that requires a different lawful basis.",
      },
      {
        question: "Are high-risk purposes such as identity verification or fraud detection allowed?",
        answer:
          "Some high-risk purposes are permitted, but they are subject to additional scrutiny. Products designed for identity verification, fraud detection or credit-risk assessment carry specific permitted-use terms, and buyers must demonstrate that their use is lawful, proportionate and accompanied by appropriate safeguards, including meaningful human review where required. DataHarbour may require enhanced compliance review for high-risk purposes and may decline requests that cannot be adequately justified.",
      },
      {
        question: "How are data-subject requests handled?",
        answer:
          "DataHarbour will provide a data-subject-request process through which individuals can submit requests relating to personal data. Where DataHarbour is the data controller, it will respond directly. Where a supplier or buyer is the controller, DataHarbour will facilitate the request by forwarding it to the responsible party. The platform will track requests to ensure they are acknowledged and resolved. This process is planned and will be operational before the platform launches.",
      },
      {
        question: "Can access to a data product be suspended or terminated?",
        answer:
          "Yes. Access may be suspended or terminated if the buyer breaches their access agreement, engages in prohibited use, fails to cooperate with a compliance review or no longer meets buyer standards. Access may also end when the licence term expires without renewal, when the supplier withdraws the product or when DataHarbour determines that continued access poses an unacceptable risk. Suspension is a protective measure, not a penalty, and is applied to safeguard the interests of suppliers, data subjects and the marketplace.",
      },
      {
        question: "Are all the controls described on this page operational now?",
        answer:
          "No. DataHarbour is currently a demonstration platform. The governance model, buyer and supplier standards, provenance requirements, security controls and compliance processes described in the Compliance Centre represent DataHarbour's planned approach. Some controls are operational in demonstration form; others are designed and will be implemented before the platform accepts live buyers, suppliers and access requests. The status of each page is indicated at the top of the page.",
      },
      {
        question: "Where can I report a concern about data misuse or a compliance issue?",
        answer:
          "Concerns can be reported through the Contact page. Please provide as much detail as you can, including the product or organisation involved, the nature of your concern and any supporting information. DataHarbour will review reported concerns and take appropriate action. For security-specific concerns, please use the security-reporting contact. For data-subject requests, please use the dedicated data-subject-request process.",
      },
    ],
    relatedPageSlugs: ["responsible-use", "provenance", "buyer-standards", "data-subject-rights"],
    seoTitle: "Compliance FAQs — DataHarbour Compliance Centre",
    seoDescription:
      "Frequently asked questions about DataHarbour's governance model — buyer and supplier review, provenance, data-subject rights, prohibited uses and platform status.",
  },
];

export function getCompliancePage(slug: string): CompliancePage | undefined {
  return compliancePages.find((p) => p.slug === slug);
}

export const complianceHubPrinciples: CompliancePrinciple[] = [
  {
    title: "Purpose before access",
    description: "Every data request must be linked to a declared, specific and lawful business purpose. Access is never granted without a clear understanding of why the data is needed.",
    detailSlug: "responsible-use",
  },
  {
    title: "Provenance must be documented",
    description: "Every data product must be accompanied by verifiable provenance documentation — sources, collection methods, transformations, refresh processes and known limitations.",
    detailSlug: "provenance",
  },
  {
    title: "Access should be proportionate",
    description: "The scope, volume and sensitivity of data accessed should be no more than is reasonably necessary for the declared purpose. Proportionality is assessed case by case.",
    detailSlug: "responsible-use",
  },
  {
    title: "Data minimisation matters",
    description: "Buyers should only access the specific data fields they need. Accessing all available fields without justification is inconsistent with responsible data stewardship.",
    detailSlug: "responsible-use",
  },
  {
    title: "Human oversight remains essential",
    description: "Data products inform human decision-making — they do not replace it. High-impact decisions must include meaningful human review, not solely automated processing.",
    detailSlug: "responsible-use",
  },
  {
    title: "Accountability must be recorded",
    description: "Every participant — buyer, supplier and DataHarbour — must maintain records that demonstrate compliance. Audit trails support trust, review and dispute resolution.",
    detailSlug: "responsible-use",
  },
];

export const trustModelSteps: ComplianceProcessStep[] = [
  {
    step: 1,
    title: "Supplier evidence",
    whatIsReviewed: "Supplier identity, rights to offer data, provenance documentation, quality controls and security arrangements.",
    whoIsResponsible: "Supplier, with DataHarbour supplier-assessment team",
    possibleOutcomes: "Approved to list, further evidence requested, or listing declined.",
    limitation: "DataHarbour reviews documentation provided by the supplier but does not conduct independent on-site audits of every supplier.",
  },
  {
    step: 2,
    title: "Provenance review",
    whatIsReviewed: "Original data sources, collection or acquisition methods, transformation and aggregation processes, refresh frequency and known limitations.",
    whoIsResponsible: "Supplier documents; DataHarbour reviews for completeness, consistency and credibility.",
    possibleOutcomes: "Provenance accepted, additional detail requested, or product not listed if documentation is insufficient.",
    limitation: "Provenance review assesses documentation quality — it cannot independently verify every source or processing step.",
  },
  {
    step: 3,
    title: "Buyer verification",
    whatIsReviewed: "Buyer organisation identity, authorised representative, declared business purpose and relevant internal controls.",
    whoIsResponsible: "Buyer provides; DataHarbour verifies against public registries and assesses the credibility of the declared purpose.",
    possibleOutcomes: "Verified, further information requested, or application declined.",
    limitation: "Verification confirms organisational identity and declared purpose. It does not guarantee future compliance or assess every aspect of the buyer's operations.",
  },
  {
    step: 4,
    title: "Purpose review",
    whatIsReviewed: "Whether the declared business purpose is specific, lawful, proportionate to the data requested and compatible with the product's permitted-use terms.",
    whoIsResponsible: "DataHarbour compliance team, with input from the supplier where supplier approval is required.",
    possibleOutcomes: "Approved, approved with conditions, more information required, or declined.",
    limitation: "Purpose review assesses the declared purpose against the information available. It cannot predict all possible downstream uses of the data.",
  },
  {
    step: 5,
    title: "Controlled access",
    whatIsReviewed: "Licence terms accepted, delivery method configured, access credentials issued, and usage monitoring established.",
    whoIsResponsible: "DataHarbour operations team with buyer and supplier coordination.",
    possibleOutcomes: "Access granted, access granted with monitoring conditions, or access deferred pending resolution of outstanding requirements.",
    limitation: "Controlled access establishes the technical and contractual framework. Ongoing compliance depends on the buyer's continued adherence to access terms.",
  },
  {
    step: 6,
    title: "Ongoing oversight",
    whatIsReviewed: "Continued compliance with access terms, changes to buyer or supplier status, quality and refresh adherence, incident reports and renewal requirements.",
    whoIsResponsible: "DataHarbour with ongoing obligations on both buyer and supplier.",
    possibleOutcomes: "Continued access, conditional renewal, suspension or termination.",
    limitation: "Ongoing oversight is designed to be proportionate and risk-based. It does not monitor every data transaction in real time.",
  },
];

export const governanceTopics = [
  {
    title: "Responsible Use",
    description: "Purpose, proportionality, data minimisation, human oversight and accountability for every data product accessed through the marketplace.",
    slug: "responsible-use",
    status: "Public guidance",
  },
  {
    title: "Data Provenance",
    description: "Documented history of every data product — original sources, collection methods, transformations, refresh processes and known limitations.",
    slug: "provenance",
    status: "Public guidance",
  },
  {
    title: "Buyer Standards",
    description: "Organisation verification, authorised representatives, intended-use declaration, security expectations and ongoing accountability.",
    slug: "buyer-standards",
    status: "Public guidance",
  },
  {
    title: "Supplier Standards",
    description: "Identity, rights, provenance documentation, quality processes, security controls and ongoing obligations for data suppliers.",
    slug: "supplier-standards",
    status: "Public guidance",
  },
  {
    title: "Security",
    description: "Account protection, encryption, access controls, monitoring, incident response and the shared security responsibilities of all participants.",
    slug: "security",
    status: "Planned control",
  },
  {
    title: "Data Retention",
    description: "Purpose-linked retention periods, licence limits, secure deletion, archiving and the buyer's responsibility to delete data when it is no longer needed.",
    slug: "data-retention",
    status: "Public guidance",
  },
  {
    title: "Data-Subject Rights",
    description: "Access, correction, deletion, restriction and objection rights — how DataHarbour plans to support individuals' data-protection rights.",
    slug: "data-subject-rights",
    status: "Planned control",
  },
  {
    title: "Prohibited Uses",
    description: "The uses that are never permitted on DataHarbour — harassment, discrimination, re-identification, unauthorised surveillance and other harmful activities.",
    slug: "prohibited-uses",
    status: "Public guidance",
  },
  {
    title: "Compliance FAQs",
    description: "Answers to frequently asked questions about governance, buyer and supplier review, provenance, data-subject rights and platform status.",
    slug: "faqs",
    status: "Public guidance",
  },
];

export const higherRiskUses = [
  "Identity verification or authentication of individuals",
  "Fraud detection, prevention or investigation involving individuals",
  "Credit-risk assessment or credit scoring of individuals or sole traders",
  "Location intelligence that could identify or single out individuals",
  "Large-scale profiling of individuals or groups",
  "Inference of sensitive characteristics or protected attributes",
  "Solely automated high-impact decisions about individuals",
  "Processing relating to children or vulnerable people",
  "Combining multiple datasets in a way that increases re-identification risk",
  "Monitoring or surveillance of individuals or groups",
  "Use in employment, housing, credit or insurance eligibility decisions",
];

export const policyStatuses = [
  { name: "Buyer Terms", status: "Planned", route: null },
  { name: "Supplier Terms", status: "Planned", route: null },
  { name: "Acceptable Use Policy", status: "Available", route: "/acceptable-use" },
  { name: "Privacy Policy", status: "Available", route: "/privacy" },
  { name: "Data Retention Policy", status: "Planned", route: null },
  { name: "Security Statement", status: "Planned", route: null },
  { name: "Data Processing Terms", status: "Planned", route: null },
  { name: "Complaints Procedure", status: "Planned", route: null },
  { name: "Data-Subject Request Procedure", status: "Planned", route: null },
  { name: "Cookie Policy", status: "Available", route: "/cookies" },
];

export const complianceHubFaqs: ComplianceFaq[] = [
  {
    question: "Does DataHarbour guarantee that a listed product is legally compliant?",
    answer: "No. DataHarbour provides a governance framework — supplier review, provenance documentation and usage controls — but legal compliance depends on how the data is used. DataHarbour does not provide legal advice, and a listing is not a compliance guarantee.",
  },
  {
    question: "What does the buyer-verification process involve?",
    answer: "Buyer verification confirms that the organisation is genuine, the individual requesting access is authorised and the declared business purpose is credible. The depth of verification increases with the product's access level.",
  },
  {
    question: "How does DataHarbour review suppliers?",
    answer: "Supplier review covers organisation identity, rights to offer the data, provenance documentation, product accuracy and security arrangements. DataHarbour reviews the evidence provided by the supplier but does not conduct independent audits of every supplier.",
  },
  {
    question: "Can I use DataHarbour data for any commercial purpose?",
    answer: "No. Every product has specific permitted-use and prohibited-use conditions. A use that is lawful in general may still breach a supplier's licence terms if it falls outside the product's permitted-use summary.",
  },
  {
    question: "What happens if I misuse data?",
    answer: "Misuse may result in suspension of access, termination of your account and, where required, notification to the supplier or relevant authorities. DataHarbour takes misuse seriously and investigates reported concerns.",
  },
  {
    question: "Are these controls operational now?",
    answer: "DataHarbour is currently a demonstration platform. The governance model described here is the planned approach. Live buyer verification, supplier onboarding and access-request processing will be available in a future phase.",
  },
];