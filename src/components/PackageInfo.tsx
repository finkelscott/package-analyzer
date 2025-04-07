import React from 'react';
import { Card, CardBody, Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PackageJson, LicenseBreakdown } from '../types/package';

interface PackageInfoProps {
  packageJson: PackageJson;
  licenseData: LicenseBreakdown[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const PackageInfo: React.FC<PackageInfoProps> = ({ packageJson, licenseData }) => {
  const getGithubUrl = (repoUrl: string = '') => {
    return repoUrl
      .replace('git+', '')
      .replace('git:', '')
      .replace('.git', '')
      .replace('git@github.com:', 'https://github.com/');
  };

  return (
    <Card>
      <CardBody className="space-y-4 p-5 pt-3">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-semibold text-slate-400">
            {packageJson.name || 'N/A'}
          </h2>

          <p className="font-medium">
                {packageJson.repository?.url && (
            <Link 
              href={getGithubUrl(packageJson.repository.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <Icon icon="lucide:github" className="text-2xl" />
              Repo
            </Link>
          )}
                </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-default-500">Version</p>
                <p className="font-medium">{packageJson.version || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-default-500">License</p>
                <p className="font-medium">{packageJson.license || 'N/A'}</p>
              </div>
              
              <div className="col-span-1 md:col-span-3">
                <p className="text-sm text-default-500">Author</p>
                <p className="font-medium">{packageJson.author || 'N/A'}</p>
              </div>    
              <div className="col-span-1 md:col-span-3">
                <p className="text-sm text-default-500">Description</p>
                <p className="font-medium">{packageJson.description || 'No description available'}</p>
              </div>
              
            </div>
          </div>

          <div>
            <div className="mb-2">
              <p className="text-lg font-semibold text-center">License Composition</p>
            </div>
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={licenseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {licenseData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="vertical" align="right" verticalAlign="middle"/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
