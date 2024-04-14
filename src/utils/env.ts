const getEnvVar = (varName: string): string => {
  const value = import.meta.env[varName] ?? undefined;

  if (value === undefined) {
    throw new Error(`Environment variable ${varName} doesn't exist or is not set`);
  }

  return value;
};

export const Tokens = {
  GeocodeToken: getEnvVar('VITE_GEOCODE_TOKEN'),
} as const;
