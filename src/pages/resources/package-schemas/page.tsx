import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import CodeBlock from "@/pages/resources/components/CodeBlock";

const jsonSchemaExample = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "UK Demographics Baseline 2026",
  "description": "Annual demographic estimates for UK postcode areas. Fictional demonstration schema.",
  "type": "object",
  "properties": {
    "postcode_area": {
      "type": "string",
      "description": "UK postcode area code",
      "examples": ["SW", "EH", "BT"],
      "sensitivity": "public"
    },
    "estimated_population": {
      "type": "integer",
      "description": "Estimated resident population",
      "nullable": true,
      "sensitivity": "public"
    },
    "household_estimate": {
      "type": "integer",
      "description": "Estimated number of households",
      "nullable": true,
      "sensitivity": "public"
    },
    "data_year": {
      "type": "integer",
      "description": "Reference year for this record",
      "sensitivity": "public"
    }
  },
  "required": ["postcode_area", "data_year"]
}`;

const csvExample = `postcode_area,estimated_population,household_estimate,data_year
SW,245000,102000,2026
EH,128000,56000,2026
BT,92000,41000,2026
M,195000,84000,2026
B,162000,71000,2026`;

export default function PackageSchemas() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"json" | "csv">("json");

  return (
    <>
      <PublicHeader />

      <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li><button type="button" onClick={() => navigate("/resources")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Resources</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li className="text-foreground-300">Package Schemas</li>
          </ol>
        </div>
      </nav>

      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-6 md:pb-14 md:pt-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">Package Schemas</p>
            <h1 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Understanding package data structures
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-foreground-400">
              How DataHarbour packages use data dictionaries, field-level metadata, sensitivity classification and versioned schemas. All examples are fictional demonstration content.
            </p>
            <div className="mt-6 rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3">
              <p className="text-xs text-foreground-400">Schema examples are fictional and use demonstration data only. No real data or schemas are exposed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-100">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-3xl space-y-12">
            {/* Data dictionary section */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>The data dictionary</h2>
              <p className="text-sm text-foreground-400 mb-4">
                Each DataHarbour package would include a data dictionary describing every field. This allows buyers to evaluate suitability before requesting access.
              </p>

              <div className="overflow-x-auto rounded-lg border border-foreground-200/10">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-foreground-200/10 bg-foreground-200/5">
                      <th className="px-3 py-2.5 text-left text-foreground-300">Element</th>
                      <th className="px-3 py-2.5 text-left text-foreground-300">Description</th>
                      <th className="px-3 py-2.5 text-left text-foreground-300">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Field name", "Machine-readable identifier for the field", "postcode_area"],
                      ["Type", "Data type — string, integer, float, boolean, date, datetime, array, object", "string"],
                      ["Nullability", "Whether the field can be null and under what conditions", "Not nullable"],
                      ["Description", "Human-readable explanation of the field's meaning", "UK postcode area code"],
                      ["Example", "One or more representative example values", "SW, EH"],
                      ["Sensitivity", "Classification: public, internal, restricted, sensitive", "public"],
                      ["Allowed values", "Enum or constraint on accepted values (if any)", "null (no constraint)"],
                      ["Primary identifier", "Whether this field is part of the primary identifier", "Yes (with data_year)"],
                      ["Derived field", "Whether the field is computed from other fields and, if so, how", "No"],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-foreground-200/10 last:border-0">
                        <td className="px-3 py-2 font-medium text-foreground-200">{row[0]}</td>
                        <td className="px-3 py-2 text-foreground-500">{row[1]}</td>
                        <td className="px-3 py-2 font-mono text-foreground-400">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Schema version */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Schema versioning</h2>
              <p className="text-sm text-foreground-400 mb-4">
                Every package schema is versioned using semantic versioning (MAJOR.MINOR.PATCH). Version changes indicate the nature of schema modifications.
              </p>
              <div className="space-y-3">
                {[
                  { term: "MAJOR (e.g. 2.0.0 → 3.0.0)", desc: "Breaking changes — field removal, field-type change, identifier change or required-field addition. Clients must update before the sunset date." },
                  { term: "MINOR (e.g. 2.0.0 → 2.1.0)", desc: "Non-breaking additions — new optional fields, new enum values. Clients may update at their convenience." },
                  { term: "PATCH (e.g. 2.1.0 → 2.1.1)", desc: "Documentation corrections, description updates, example changes. No functional impact on data consumers." },
                ].map((item, i) => (
                  <div key={i} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
                    <p className="text-sm font-semibold text-foreground-200">{item.term}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deprecation */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Deprecation</h2>
              <p className="text-sm text-foreground-400 mb-4">
                When a field or schema version is deprecated, a sunset date is published. Clients must migrate before the sunset date. After sunset, the deprecated field or version may return null, return an error or be removed entirely.
              </p>
            </div>

            {/* Example schema */}
            <div>
              <h2 className="text-xl text-foreground-100 mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Fictional schema example</h2>
              <div className="flex gap-1.5 mb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("json")}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition cursor-pointer ${activeTab === "json" ? "bg-primary-500 text-background-950" : "border border-foreground-200/20 text-foreground-400 hover:border-foreground-200/40"}`}
                >
                  JSON Schema
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("csv")}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition cursor-pointer ${activeTab === "csv" ? "bg-primary-500 text-background-950" : "border border-foreground-200/20 text-foreground-400 hover:border-foreground-200/40"}`}
                >
                  CSV Preview
                </button>
              </div>
              {activeTab === "json" ? (
                <CodeBlock language="json" label="Fictional JSON Schema" code={jsonSchemaExample} />
              ) : (
                <CodeBlock language="csv" label="Fictional CSV preview" code={csvExample} />
              )}
            </div>

            <div className="pt-8 border-t border-foreground-200/10">
              <h3 className="text-sm font-semibold text-foreground-300 mb-4">Related resources</h3>
              <div className="flex flex-wrap gap-3">
                {["data-feeds", "api-reference", "getting-started"].map((slug) => (
                  <button key={slug} type="button" onClick={() => navigate(`/resources/${slug}`)} className="rounded-lg border border-foreground-200/10 bg-background-50 px-4 py-2.5 text-sm text-foreground-300 transition hover:border-primary-400/30 hover:text-foreground-100 cursor-pointer">
                    {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    <i className="ri-arrow-right-line ml-1.5 text-xs text-foreground-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}