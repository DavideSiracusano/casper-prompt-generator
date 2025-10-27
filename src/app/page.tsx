"use client";

import { useState, useEffect } from "react";
import { Sparkles, Zap, Users, Palette, Monitor, Layout } from "lucide-react";
import { LucideIcon } from "lucide-react"; // tipo fornito dalla libreria

interface Field {
  id: string;
  icon: LucideIcon;
  label: string;
  placeholder: string;
  value: string;
  setter: (value: string) => void;
}

interface MethodItem {
  letter: string;
  word: string;
  desc: string;
}

export default function Home() {
  const [context, setContext] = useState<string>("");
  const [audience, setAudience] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [platforms, setPlatforms] = useState<string>("");
  const [elements, setElements] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [isDark, setIsDark] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleGenerate = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch("/api/generatePrompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, audience, style, platforms, elements }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.result);
      } else {
        setResult(`Errore API: ${data.error}`);
      }
    } catch (err) {
      setResult(
        `Errore di rete: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      setLoading(false);
    }
  };

  const fields: Field[] = [
    {
      id: "context",
      icon: Layout,
      label: "Context",
      placeholder:
        "Descrivi il contesto del tuo progetto (es. e-commerce moda, piattaforma educativa, portfolio personale)",
      value: context,
      setter: setContext,
    },
    {
      id: "audience",
      icon: Users,
      label: "Audience",
      placeholder:
        "Definisci il pubblico target (es. aziende, studenti, professionisti)",
      value: audience,
      setter: setAudience,
    },
    {
      id: "style",
      icon: Palette,
      label: "Style",
      placeholder:
        "Specifica lo stile comunicativo (es. minimal elegante, bold e dinamico, corporate professionale)",
      value: style,
      setter: setStyle,
    },
    {
      id: "platforms",
      icon: Monitor,
      label: "Platforms",
      placeholder:
        "Indica le piattaforme target (es. responsive web, mobile-first, desktop application)",
      value: platforms,
      setter: setPlatforms,
    },
    {
      id: "elements",
      icon: Zap,
      label: "Elements",
      placeholder:
        "Elenca gli elementi chiave (es. hero section, buttons, card grid, navigation menu)",
      value: elements,
      setter: setElements,
    },
  ];

  const methodItems: MethodItem[] = [
    { letter: "C", word: "Context", desc: "Contesto progetto" },
    { letter: "A", word: "Audience", desc: "Pubblico target" },
    { letter: "S", word: "Style", desc: "Stile comunicativo" },
    { letter: "P", word: "Platforms", desc: "Piattaforme" },
    { letter: "E", word: "Elements", desc: "Elementi chiave" },
    { letter: "R", word: "Response", desc: "Prompt ottimizzato" },
  ];

  return (
    <div
      className={`${
        isDark
          ? "bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-linear-to-br from-slate-50 via-white to-slate-100"
      } min-h-screen transition-all duration-700`}
    >
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 -left-20 w-96 h-96 ${
            isDark ? "bg-indigo-500/10" : "bg-indigo-200/30"
          } rounded-full blur-3xl animate-pulse`}
          style={{ animationDuration: "4s" }}
        />
        <div
          className={`absolute bottom-1/4 -right-20 w-96 h-96 ${
            isDark ? "bg-purple-500/10" : "bg-purple-200/30"
          } rounded-full blur-3xl animate-pulse`}
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`mb-8 px-9 py-2 rounded-full ${
            isDark
              ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
              : "bg-white text-slate-700 hover:bg-slate-50"
          } border ${
            isDark ? "border-slate-700" : "border-slate-200"
          } transition-all duration-300 hover:scale-105 shadow-lg`}
          aria-label={
            isDark ? "Passa alla modalità chiara" : "Passa alla modalità scura"
          }
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-6">
            <Sparkles
              className={`w-10 h-10 ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              } animate-pulse`}
            />
            <h1
              className={`text-5xl font-bold bg-linear-to-r ${
                isDark
                  ? "from-indigo-400 to-purple-400"
                  : "from-indigo-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              C.A.S.P.E.R.
            </h1>
          </div>

          <p
            className={`text-lg ${
              isDark ? "text-slate-400" : "text-slate-600"
            } max-w-2xl mx-auto mb-8`}
          >
            AI-Powered Prompt Builder per sviluppatori e creativi. Genera prompt
            frontend di alta qualità in pochi secondi.
          </p>

          {/* Methodology cards */}
          <div
            className={`inline-block ${
              isDark ? "bg-slate-800/50" : "bg-white/80"
            } backdrop-blur-sm rounded-2xl p-6 border ${
              isDark ? "border-slate-700" : "border-slate-200"
            } shadow-xl`}
          >
            <h3
              className={`font-semibold ${
                isDark ? "text-slate-200" : "text-slate-800"
              } mb-4 text-sm uppercase text-left`}
            >
              Il Metodo:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
              {methodItems.map((item, idx) => (
                <div
                  key={item.letter}
                  className="flex items-start gap-2 transition-all duration-300 hover:scale-105 cursor-default"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span
                    className={`font-bold text-xl ${
                      isDark ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    {item.letter}
                  </span>
                  <div>
                    <div
                      className={`font-medium text-sm ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      {item.word}
                    </div>
                    <div
                      className={`text-xs ${
                        isDark ? "text-slate-500" : "text-slate-500"
                      }`}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Input fields */}
        <div className="space-y-6 mb-8">
          {fields.map((field, idx) => {
            const Icon = field.icon;
            const isFocused = focusedField === field.id;

            return (
              <div
                key={field.id}
                className={`transform transition-all duration-500 ${
                  isFocused ? "scale-[1.02]" : "scale-100"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div
                  className={`relative ${
                    isDark ? "bg-slate-800/50" : "bg-white/80"
                  } backdrop-blur-sm rounded-xl border ${
                    isFocused
                      ? isDark
                        ? "border-indigo-500 shadow-lg shadow-indigo-500/20"
                        : "border-indigo-400 shadow-lg shadow-indigo-400/20"
                      : isDark
                      ? "border-slate-700"
                      : "border-slate-200"
                  } transition-all duration-300`}
                >
                  <div
                    className={`flex items-center gap-3 px-4 pt-4 pb-2 ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isFocused
                          ? isDark
                            ? "text-indigo-400"
                            : "text-indigo-600"
                          : ""
                      } transition-colors duration-300`}
                    />
                    <label
                      htmlFor={field.id}
                      className="font-medium text-sm uppercase tracking-wider"
                    >
                      {field.label}
                    </label>
                  </div>
                  <textarea
                    id={field.id}
                    className={`w-full px-4 pb-4 bg-transparent ${
                      isDark
                        ? "text-slate-200 placeholder:text-slate-600"
                        : "text-slate-800 placeholder:text-slate-400"
                    } focus:outline-none resize-none transition-all duration-300`}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    onFocus={() => setFocusedField(field.id)}
                    onBlur={() => setFocusedField(null)}
                    rows={3}
                    aria-label={field.label}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Generate button */}
        <div className="text-center mb-8">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 hover:shadow-2xl"
            } ${
              isDark
                ? "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                : "bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            }`}
            aria-label="Genera prompt AI"
          >
            <span className="relative z-10 flex items-center gap-2 justify-center">
              <Sparkles
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "Generazione in corso..." : "Genera Prompt"}
            </span>
            {!loading && (
              <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div
            className={`${
              isDark ? "bg-slate-800/50" : "bg-white/80"
            } backdrop-blur-sm rounded-xl p-6 border ${
              isDark ? "border-slate-700" : "border-slate-200"
            } shadow-xl animate-fade-in`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap
                className={`w-5 h-5 ${
                  isDark ? "text-indigo-400" : "text-indigo-600"
                }`}
              />
              <h3
                className={`font-semibold ${
                  isDark ? "text-slate-200" : "text-slate-800"
                } uppercase tracking-wider text-sm`}
              >
                Prompt Generato
              </h3>
            </div>
            <div
              className={`${
                isDark ? "text-slate-300" : "text-slate-700"
              } whitespace-pre-wrap font-mono text-sm leading-relaxed`}
            >
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
