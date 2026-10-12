import React from "react";

function SectionHeader({ title, subtitle }) {
  return (
    <div>
      <h1 className="lg:text-2xl">{title}</h1>
      <p className="lg:text-md">{subtitle}</p>
    </div>
  );
}

export default SectionHeader;
