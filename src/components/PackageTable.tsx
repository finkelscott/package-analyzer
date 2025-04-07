import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link, SortDescriptor } from '@heroui/react';
import { Icon } from '@iconify/react';
import { PackageData } from '../types/package';

interface PackageTableProps {
  packages: PackageData[];
}

export const PackageTable: React.FC<PackageTableProps> = ({ packages }) => {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending"
  });

  const getGithubUrl = (repoUrl: string = '') => {
    return repoUrl
      .replace('git+', '')
      .replace('git:', '')
      .replace('.git', '')
      .replace('git@github.com:', 'https://github.com/');
  };

  const sortedPackages = React.useMemo(() => {
    if (!sortDescriptor.column) return packages;

    return [...packages].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof PackageData] as string;
      const second = b[sortDescriptor.column as keyof PackageData] as string;
      const cmp = first.localeCompare(second);

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [packages, sortDescriptor]);

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Dependencies ({sortedPackages.length})</h2>
      <Table
        aria-label="Package dependencies table"
        className="w-full"
        removeWrapper
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <TableColumn allowsSorting key="name">NAME</TableColumn>
          <TableColumn key="version">VERSION</TableColumn>
          <TableColumn allowsSorting key="license">LICENSE</TableColumn>
          <TableColumn key="description">DESCRIPTION</TableColumn>
          <TableColumn allowsSorting key="author">AUTHOR</TableColumn>
          <TableColumn key="links">LINKS</TableColumn>
        </TableHeader>
        <TableBody>
          {sortedPackages.map((pkg) => (
            <TableRow key={pkg.name}>
              <TableCell>{pkg.name}</TableCell>
              <TableCell>{pkg.version}</TableCell>
              <TableCell>{pkg.license}</TableCell>
              <TableCell>{pkg.description}</TableCell>
              <TableCell>{pkg.author}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {pkg.homepage && (
                    <Link href={pkg.homepage} target="_blank" rel="noopener noreferrer">
                      <Icon icon="lucide:home" className="text-lg" />
                    </Link>
                  )}
                  {pkg.repository?.url && (
                    <Link href={getGithubUrl(pkg.repository.url)} target="_blank" rel="noopener noreferrer">
                      <Icon icon="lucide:github" className="text-lg" />
                    </Link>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
