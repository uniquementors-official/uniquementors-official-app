import type { NextAuthConfig } from "next-auth";

const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

export const authConfig = {
  secret: authSecret,
  pages: {
    signIn: "/admin/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    authorized({ auth: session, request }) {
      const pathname = request.nextUrl.pathname;
      if (pathname.startsWith("/admin/login")) return true;
      if (pathname.startsWith("/admin")) return Boolean(session?.user && session.user.role === "ADMIN");
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "ADMIN";
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = String(token.role ?? "ADMIN");
      }
      return session;
    }
  },
  trustHost: true,
  providers: []
} satisfies NextAuthConfig;
