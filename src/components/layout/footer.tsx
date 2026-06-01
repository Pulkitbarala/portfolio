import React from "react";

export function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-muted-foreground mt-auto">
      <small className="mb-2 block text-xs">
        &copy; {new Date().getFullYear()} DevFolio. All rights reserved.
      </small>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js (App Router), Tailwind CSS v4, Framer Motion, and deployed on Vercel.
      </p>
    </footer>
  );
}
