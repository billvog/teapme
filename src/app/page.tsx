import Section from "@/app/_components/landing/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="space-y-60 py-10">
      <Section>
        <Section.Title>
          Tipping for folks who ain't fancy coffee.{" "}
          <span title="I guess that's a coffee emoji. Looks cool, tho.">
            ☕️
          </span>
        </Section.Title>
        <p className="max-w-xl text-center text-xl">
          Claim your handle, connect Stripe, and start sharing your page in less
          than 4 minutes.{" "}
          <span className="font-bold">No beans, just leaves!</span> 🍃
        </p>

        <Link href="/auth/login">
          <Button
            className="text-xl font-extrabold"
            variant="secondary"
            size="xl"
          >
            Claim Your Handle Now 🤩
          </Button>
        </Link>
      </Section>
    </main>
  );
}
