import { ConfigurationChecker } from "@/components/molecules/configuration-checker";

export default function ConfigPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Configuration Status</h1>
        <ConfigurationChecker />
      </div>
    </div>
  );
}