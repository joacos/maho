import React from "react";
import { MessageSquare, Search, ClipboardList, Activity, HeartHandshake } from "lucide-react";

interface Step {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    icon: MessageSquare,
    title: "Entrevista Inicial",
    description: "Espacio de escucha con la familia para comprender el contexto, historia de aprendizaje, inquietudes principales y definir metas claras."
  },
  {
    number: 2,
    icon: Search,
    title: "Evaluación Diagnóstica",
    description: "Aplicación de instrumentos cualitativos y estandarizados para identificar el perfil cognitivo, funciones ejecutivas y estilo de aprendizaje."
  },
  {
    number: 3,
    icon: ClipboardList,
    title: "Informe y Plan Personalizado",
    description: "Elaboración de un informe clínico detallado y diseño de un plan de acompañamiento único con estrategias adaptadas a las necesidades."
  },
  {
    number: 4,
    icon: Activity,
    title: "Sesiones de Intervención",
    description: "Desarrollo de las sesiones (individuales o grupales) mediante actividades lúdicas, psicomotrices y de estimulación cognitiva avanzada."
  },
  {
    number: 5,
    icon: HeartHandshake,
    title: "Seguimiento y Apoyo continuo",
    description: "Evaluación constante de avances, entrega de recomendaciones para el hogar y coordinación estrecha con la comunidad educativa."
  }
];

export default function WorkProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-surface-muted/50 border-y border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-sans font-semibold text-xs uppercase tracking-wider mb-4">
            Metodología Clara y Respetuosa
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-dark tracking-tight">
            ¿Cómo Trabajamos Paso a Paso?
          </h2>
          <p className="font-sans text-base sm:text-lg text-muted mt-3 leading-relaxed">
            Un proceso estructurado y transparente diseñado para brindar acompañamiento efectivo desde la primera consulta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative bg-surface rounded-2xl p-6 border border-border/40 flex flex-col items-start gap-4 shadow-xs hover:shadow-md transition-all group"
              >
                {/* Step badge number */}
                <div className="flex items-center justify-between w-full">
                  <div className="w-10 h-10 rounded-full bg-primary text-surface font-display font-bold text-base flex items-center justify-center shadow-xs">
                    {step.number}
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-primary-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
