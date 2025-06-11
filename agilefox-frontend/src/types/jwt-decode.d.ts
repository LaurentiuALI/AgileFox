// Import original declarations
// import { JwtPayload } from 'jwt-decode';

// Declare module augmentation
declare module 'jwt-decode' {
  // Extend the existing JwtPayload interface
  export interface JwtPayload {
    preferred_username: string;
    realm_access?: {
      roles: string[];
    }
    resource_access?: {
      [key: string]: {
        roles: string[];
      };
    };
    // Add other custom claims here
  }

  // Re-export the original jwtDecode function
  export function jwtDecode<T = JwtPayload>(
    token: string,
    options?: JwtDecodeOptions,

  ): T;
}

// Export the original module's exports
export * from 'jwt-decode';