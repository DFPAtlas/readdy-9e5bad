import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { marketplacePackages, type MarketplacePackage } from '@/data/marketplacePackages';
import { getPackageDetail as getMockDetail } from '@/data/packageDetailData';

export function usePackageDetail(slug: string | undefined) {
  const [pkg, setPkg] = useState<MarketplacePackage | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchPackage() {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from('data_packages')
          .select('*')
          .eq('slug', slug)
          .eq('listing_status', 'published')
          .maybeSingle();

        if (fetchError) {
          if (!cancelled) {
            setError(fetchError.message);
            setLoading(false);
          }
          return;
        }

        if (!cancelled) {
          if (data) {
            const fullDetail = getMockDetail(slug);
            setPkg(fullDetail);
          } else {
            setPkg(undefined);
          }
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load package');
          setLoading(false);
        }
      }
    }

    fetchPackage();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { pkg, loading, error };
}

export function usePackagesBySlugs(slugs: string[]) {
  const [packages, setPackages] = useState<MarketplacePackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slugs.length === 0) {
      setPackages([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchPackages() {
      setLoading(true);

      try {
        const { data, error: fetchError } = await supabase
          .from('data_packages')
          .select('*')
          .in('slug', slugs)
          .eq('listing_status', 'published');

        if (fetchError) {
          if (!cancelled) {
            setLoading(false);
          }
          return;
        }

        if (!cancelled) {
          const results = (data || []).map((row: { slug: string }) => {
            const detail = getMockDetail(row.slug);
            return detail;
          }).filter((p): p is MarketplacePackage => p !== undefined);

          setPackages(results);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPackages();

    return () => {
      cancelled = true;
    };
  }, [slugs]);

  return { packages, loading };
}