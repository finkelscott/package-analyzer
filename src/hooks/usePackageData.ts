import React from 'react';
import { PackageData, PackageJson, LicenseBreakdown } from '../types/package';

export const usePackageData = () => {
  const [packages, setPackages] = React.useState<PackageData[]>([]);
  const [mainPackage, setMainPackage] = React.useState<PackageJson | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchPackageData = async (packageJson: PackageJson) => {
    setLoading(true);
    setError(null);
    setMainPackage(packageJson);
    
    try {
      const allDependencies = {
        ...packageJson.dependencies
      };
      
      const packagePromises = Object.entries(allDependencies).map(async ([name]) => {
        const response = await fetch(`https://registry.npmjs.org/${name}`);
        if (!response.ok) throw new Error(`Failed to fetch ${name}`);
        const data = await response.json();
        
        return {
          name,
          version: allDependencies[name],
          description: data.description || '',
          author: typeof data.author === 'string' ? data.author : data.author?.name || '',
          license: data.license || 'Unknown',
          homepage: data.homepage,
          repository: data.repository
        };
      });

      const results = await Promise.all(packagePromises);
      setPackages(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch package data');
    } finally {
      setLoading(false);
    }
  };

  const getLicenseBreakdown = (): LicenseBreakdown[] => {
    const licenseCounts = packages.reduce((acc, pkg) => {
      acc[pkg.license] = (acc[pkg.license] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(licenseCounts).map(([name, value]) => ({
      name,
      value
    }));
  };

  return {
    packages,
    mainPackage,
    loading,
    error,
    fetchPackageData,
    getLicenseBreakdown
  };
};
