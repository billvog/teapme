import React from "react";

export default function Footer() {
  return (
    <div className="flex w-screen flex-col items-center gap-2 bg-gray-100 p-10">
      <span>
        <span className="font-extrabold">🍃 Teapme</span>, tipping for folks who
        ain't fancy coffee.
      </span>
      <span>
        Created with ❤️ by{" "}
        <a target="_blank" className="link" href="https://teapme.com/@ceo">
          Vasilis
        </a>
      </span>
    </div>
  );
}
