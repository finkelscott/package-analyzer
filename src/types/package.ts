export interface PackageData {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  homepage?: string;
  repository?: {
    url: string;
  };
}

export interface PackageJson {
  name?: string;
  version?: string;
  description?: string;
  author?: string;
  license?: string;
  homepage?: string;
  repository?: {
    url: string;
  };
  dependencies?: Record<string, string>;
}

export interface LicenseBreakdown {
  name: string;
  value: number;
}
