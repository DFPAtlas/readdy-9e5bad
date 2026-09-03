import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { MarketplacePackage, SupplierStatus, DeliveryFormat } from '@/data/marketplacePackages';

interface DbPackage {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  long_description: string;
  full_description: string;
  category: string;
  tags: string[];
  geographic_coverage: string;
  refresh_frequency: string;
  access_level: string;
  pricing_model: string;
  price_display: string;
  provenance_status: string;
  listing_status: string;
  featured: boolean;
  is_demo: boolean;
  view_count: number;
  version: string;
  created_at: string;
  updated_at: string;
}

const supplierDetails: Record<string, { supplier: string; supplierStatus: SupplierStatus; deliveryFormats: DeliveryFormat[] }> = {
  'uk-business-registry-enrichment-api': {
    supplier: 'Axiom Registry Intelligence',
    supplierStatus: 'Verified Supplier',
    deliveryFormats: ['API', 'JSON'],
  },
  'regional-retail-footfall-index': {
    supplier: 'PlaceMetrics Labs',
    supplierStatus: 'Verified Supplier',
    deliveryFormats: ['Dashboard', 'CSV', 'API'],
  },
  'sme-commercial-risk-signals': {
    supplier: 'Axiom Registry Intelligence',
    supplierStatus: 'Verified Supplier',
    deliveryFormats: ['API', 'CSV', 'Scheduled Feed'],
  },
  'uk-planning-development-activity-feed': {
    supplier: 'LandSight Analytics',
    supplierStatus: 'Provenance Reviewed',
    deliveryFormats: ['API', 'CSV', 'Scheduled Feed'],
  },
  'consumer-lifestyle-audience-segments': {
    supplier: 'Clarus Consumer Analytics',
    supplierStatus: 'Verified Supplier',
    deliveryFormats: ['Dashboard', 'API', 'CSV'],
  },
  'local-area-demographic-trends': {
    supplier: 'CensusPlus Analytics',
    supplierStatus: 'Provenance Reviewed',
    deliveryFormats: ['CSV', 'Secure Download'],
  },
  'hospitality-location-opportunity-report': {
    supplier: 'PlaceMetrics Labs',
    supplierStatus: 'Verified Supplier',
    deliveryFormats: ['Report', 'Secure Download'],
  },
  'b2b-company-technology-signals': {
    supplier: 'TechGraph Intelligence',
    supplierStatus: 'Provenance Reviewed',
    deliveryFormats: ['CSV', 'API'],
  },
  'address-validation-premises-classification-api': {
    supplier: 'GeoRef Data Services',
    supplierStatus: 'Verified Supplier',
    deliveryFormats: ['API', 'JSON'],
  },
  'uk-high-street-vacancy-intelligence': {
    supplier: 'PlaceMetrics Labs',
    supplierStatus: 'Verified Supplier',
    deliveryFormats: ['Dashboard', 'CSV', 'Report'],
  },
  'market-sentiment-research-dashboard': {
    supplier: 'Clarus Consumer Analytics',
    supplierStatus: 'Verified Supplier',
    deliveryFormats: ['Dashboard', 'CSV'],
  },
  'transport-accessibility-catchment-dataset': {
    supplier: 'GeoRef Data Services',
    supplierStatus: 'Provenance Reviewed',
    deliveryFormats: ['CSV', 'Secure Download'],
  },
  'consumer-identity-verification-signals': {
    supplier: 'TrustCheck Data Services',
    supplierStatus: 'Verified Supplier',
    deliveryFormats: ['API'],
  },
  'uk-property-transaction-intelligence': {
    supplier: 'LandSight Analytics',
    supplierStatus: 'Provenance Reviewed',
    deliveryFormats: ['CSV', 'API', 'Secure Download'],
  },
};

function mapDbToPackage(row: DbPackage): MarketplacePackage {
  const details = supplierDetails[row.slug] || {
    supplier: 'Unknown Supplier',
    supplierStatus: 'New Supplier' as SupplierStatus,
    deliveryFormats: ['Secure Download'] as DeliveryFormat[],
  };

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    supplier: details.supplier,
    supplierStatus: details.supplierStatus,
    isDemo: row.is_demo || false,
    shortDescription: row.short_description || '',
    longDescription: row.long_description || '',
    fullDescription: row.full_description || '',
    overviewPoints: [],
    intendedUsers: '',
    exampleApplications: [],
    whatItDoesNotProvide: '',
    category: row.category as MarketplacePackage['category'],
    tags: Array.isArray(row.tags) ? row.tags : [],
    geographicCoverage: row.geographic_coverage as MarketplacePackage['geographicCoverage'],
    refreshFrequency: row.refresh_frequency as MarketplacePackage['refreshFrequency'],
    deliveryFormats: details.deliveryFormats,
    accessLevel: row.access_level as MarketplacePackage['accessLevel'],
    pricingModel: row.pricing_model as MarketplacePackage['pricingModel'],
    priceDisplay: row.price_display || 'Contact Sales',
    provenanceStatus: row.provenance_status as MarketplacePackage['provenanceStatus'],
    updatedAt: row.updated_at ? row.updated_at.split('T')[0] : '',
    createdAt: row.created_at ? row.created_at.split('T')[0] : '',
    featured: row.featured || false,
    viewCountDemo: row.view_count || 0,
    permittedUseSummary: '',
    restrictionSummary: '',
    sampleAvailable: false,
    schemaAvailable: false,
    dataFields: [],
    recordCoverage: '',
    coverageNotes: '',
    historicalDepth: '',
    qualityChecks: [],
    sourceTypes: [],
    collectionMethodSummary: '',
    provenanceDetails: {
      sourceTypes: [],
      collectionMethod: '',
      transformationSummary: '',
      reviewStatus: '',
      reviewDate: '',
      limitations: '',
    },
    permittedUses: [],
    prohibitedUses: [],
    retentionGuidance: '',
    sharingRestrictions: '',
    securityRequirements: '',
    licenceType: '',
    minimumTerm: '',
    billingFrequency: '',
    usageAllowanceDisplay: '',
    overageDisplay: '',
    sampleSchema: [],
    sampleResponse: [],
    version: row.version || '1.0.0',
    versionHistory: [],
    supportLevel: '',
    onboardingTimeDisplay: '',
    supplierDescription: '',
    supplierJoinedDate: '',
    relatedPackageSlugs: [],
    deliveryMethodDetails: [],
  };
}

export function useSupabasePackages() {
  const [packages, setPackages] = useState<MarketplacePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPackages() {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from('data_packages')
          .select('*')
          .eq('listing_status', 'published')
          .order('updated_at', { ascending: false });

        if (fetchError) {
          if (!cancelled) {
            setError(fetchError.message);
            setLoading(false);
          }
          return;
        }

        if (!cancelled) {
          const mapped = (data || []).map((row: DbPackage) => mapDbToPackage(row));
          setPackages(mapped);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load packages');
          setLoading(false);
        }
      }
    }

    fetchPackages();

    return () => {
      cancelled = true;
    };
  }, []);

  return { packages, loading, error };
}