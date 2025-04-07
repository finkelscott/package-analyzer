import { FileUpload } from './components/FileUpload';
import { PackageTable } from './components/PackageTable';
import { PackageInfo } from './components/PackageInfo';
import { usePackageData } from './hooks/usePackageData';
import { Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function App() {
  const { packages, mainPackage, loading, error, fetchPackageData, getLicenseBreakdown } = usePackageData();

  const handleFileLoad = (packageJson: any) => {
    fetchPackageData(packageJson);
  };

  return (
    <div className="min-h-screen bg-background mb-8">
      <div className="space-y-8">        
        <div className="fixed top-0 w-full z-10">
          <a href="/" className="bg-violet-700 p-3 flex gap-2 text-violet-50 text-2xl font-bold">
            <Icon icon="lucide:package-search" className="text-3xl" />Package Analyzer
          </a>
        </div>
        
        {!packages.length && (
          <div className="p-10 w-1/2 mx-auto">
            <FileUpload onFileLoad={handleFileLoad} />
          </div>
        )}

        {loading && (
          <div className="flex justify-center p-8">
            <Spinner size="lg" />
          </div>
        )}

        {error && (
          <div className="text-danger text-center p-4">
            {error}
          </div>
        )}

        {packages.length > 0 && mainPackage && (
          <div className="mx-auto max-w-7xl">
            <div className="p-8 pt-16">
              <PackageInfo 
                packageJson={mainPackage} 
              licenseData={getLicenseBreakdown()} 
            />
            </div>
          <div className="p-12 pt-0">
            <PackageTable packages={packages} />
          </div>
          </div>
        )}
      </div>

        <footer className="text-center text-sm text-default-500 border-2 border-t-indigo-500 p-4 bg-violet-100 fixed bottom-0 w-full">
          <p> Sample app built by <a href="https://scott.finkels.net" target="_blank" rel="noopener noreferrer" className="text-violet-500">Scott Finkel</a> with&nbsp;
            <a href="https://heroui.chat/" target="_blank" rel="noopener noreferrer" className="text-violet-500">
              HeroUI
            </a>,&nbsp;
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="text-violet-500">
            React
            </a>, and&nbsp;
            <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-violet-500">
            Tailwind
            </a>. Chart by <a href="https://recharts.org/" target="_blank" rel="noopener noreferrer" className="text-violet-500">Recharts</a>. Icons by <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className="text-violet-500">Lucide</a>.
          </p>
        </footer> 
      </div>
  );
}
