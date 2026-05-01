export interface LicenseEntry {
  name: string;
  version: string;
  license: string;
  homepage?: string;
  copyright?: string;
}

export const LICENSES: LicenseEntry[] = [
  {
    name: "React",
    version: "18.3.1",
    license: "MIT",
    homepage: "https://react.dev",
    copyright: "Copyright (c) Meta Platforms, Inc. and affiliates.",
  },
  {
    name: "React Native",
    version: "0.74.5",
    license: "MIT",
    homepage: "https://reactnative.dev",
    copyright: "Copyright (c) Meta Platforms, Inc. and affiliates.",
  },
  {
    name: "React Navigation",
    version: "6.1.18",
    license: "MIT",
    homepage: "https://reactnavigation.org",
  },
  {
    name: "Axios",
    version: "1.7.7",
    license: "MIT",
    homepage: "https://axios-http.com",
  },
  {
    name: "TanStack Query",
    version: "5.59.0",
    license: "MIT",
    homepage: "https://tanstack.com/query",
  },
  {
    name: "React Hook Form",
    version: "7.53.0",
    license: "MIT",
    homepage: "https://react-hook-form.com",
  },
  {
    name: "Zod",
    version: "3.23.8",
    license: "MIT",
    homepage: "https://zod.dev",
  },
  {
    name: "Lucide Icons",
    version: "0.462.0",
    license: "ISC",
    homepage: "https://lucide.dev",
  },
  {
    name: "date-fns",
    version: "3.6.0",
    license: "MIT",
    homepage: "https://date-fns.org",
  },
  {
    name: "Firebase JavaScript SDK",
    version: "10.13.2",
    license: "Apache-2.0",
    homepage: "https://firebase.google.com",
    copyright: "Copyright (c) Google LLC",
  },
  {
    name: "Sentry SDK",
    version: "8.30.0",
    license: "MIT",
    homepage: "https://sentry.io",
  },
  {
    name: "Day.js",
    version: "1.11.13",
    license: "MIT",
    homepage: "https://day.js.org",
  },
];
