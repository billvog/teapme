import React from "react";

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-full flex-col items-center justify-center space-y-14">
      {children}
    </section>
  );
}

Section.Title = function ({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-center text-7xl font-extrabold leading-normal">
      {children}
    </h1>
  );
};

export default Section;
