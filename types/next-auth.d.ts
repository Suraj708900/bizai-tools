declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      plan: string;
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    plan?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    plan?: string;
  }
}
