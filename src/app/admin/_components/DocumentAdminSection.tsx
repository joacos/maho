"use client";

import React, { useState } from "react";
import {
  FileText,
  Printer,
  Copy,
  CheckCircle2,
  Sparkles,
  Download,
  FileCheck,
  Receipt,
  FileSignature,
  BookOpen,
  User,
  Calendar,
  DollarSign,
  ShieldCheck,
  Scale
} from "lucide-react";

type DocumentType = "CONSENT" | "CONTRACT" | "RECEIPT" | "REPORT";

interface DocumentForm {
  docType: DocumentType;
  clientName: string;
  clientRut: string;
  clientEmail: string;
  serviceName: string;
  date: string;
  amount: string;
  paymentMethod: string;
  sessionNotes: string;
  professionalName: string;
  professionalTitle: string;
}

export default function DocumentAdminSection() {
  const todayStr = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState<DocumentForm>({
    docType: "CONSENT",
    clientName: "María Josefa Pérez",
    clientRut: "18.456.789-0",
    clientEmail: "maria.perez@example.com",
    serviceName: "Sesión Individual de Aprendizaje Emocional",
    date: todayStr,
    amount: "45.000",
    paymentMethod: "Transferencia Electrónica",
    sessionNotes: "El paciente/cliente asiste a sesión de acompañamiento. Se abordan herramientas de autorregulación emocional y atención plena.",
    professionalName: "Marjorie Cayún",
    professionalTitle: "Psicopedagoga & Educadora - Bosque Aprendiz",
  });

  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    let textToCopy = "";
    if (form.docType === "CONSENT") {
      textToCopy = `CONSENTIMIENTO INFORMADO DE ATENCIÓN\nBosque Aprendiz\n\nFecha: ${form.date}\nCliente/Paciente: ${form.clientName}\nRUT: ${form.clientRut}\nServicio: ${form.serviceName}\nProfesional: ${form.professionalName} (${form.professionalTitle})\n\nPor medio del presente documento, el/la paciente declara haber recibido la información clara y oportuna referente a las condiciones del servicio de acompañamiento profesional.`;
    } else if (form.docType === "CONTRACT") {
      textToCopy = `CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES\nBosque Aprendiz\n\nCon fecha ${form.date}, se celebra el contrato entre ${form.professionalName} (${form.professionalTitle}) y el/la cliente ${form.clientName} (RUT: ${form.clientRut}) para el servicio "${form.serviceName}".\n\nCláusulas acordadas según normas profesionales y de confidencialidad de Bosque Aprendiz.`;
    } else if (form.docType === "RECEIPT") {
      textToCopy = `COMPROBANTE DE PAGO DE HONORARIOS\nBosque Aprendiz\n\nRecibido de: ${form.clientName} (RUT: ${form.clientRut})\nConcepto: ${form.serviceName}\nFecha: ${form.date}\nMonto Total: $${form.amount} CLP\nMedio de Pago: ${form.paymentMethod}`;
    } else {
      textToCopy = `INFORME DE RESUMEN DE SESIÓN\nBosque Aprendiz\n\nFecha: ${form.date}\nCliente: ${form.clientName} (RUT: ${form.clientRut})\nServicio: ${form.serviceName}\n\nObservaciones y Evolución:\n${form.sessionNotes}\n\nProfesional: ${form.professionalName}`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Print Stylesheet overlay */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          html, body {
            background: #ffffff !important;
            background-color: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            min-height: 100vh !important;
          }
          body * {
            visibility: hidden;
          }
          #printable-document, #printable-document * {
            visibility: visible;
          }
          #printable-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            min-height: 100vh;
            padding: 40px;
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-sans font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generador Administrativo</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-800">
            Generación de Documentos y Contratos
          </h2>
          <p className="font-sans text-sm text-slate-500 mt-1">
            Genera e imprime consentimientos, contratos de prestación de servicios, recibos y resúmenes clínicos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-sans font-bold text-xs shadow-2xs transition-all"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copiar Texto</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-sans font-bold text-xs shadow-xs transition-all hover:-translate-y-0.5"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Selector & Form / Document Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Selector & Form */}
        <div className="lg:col-span-5 flex flex-col gap-6 no-print">
          {/* Document Type Cards */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <h3 className="font-display font-bold text-base text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileCheck className="w-4.5 h-4.5 text-primary" />
              <span>1. Seleccionar Tipo de Documento</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, docType: "CONSENT" })}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-2 transition-all ${form.docType === "CONSENT"
                  ? "border-primary bg-primary/5 text-primary shadow-2xs font-bold"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold"
                  }`}
              >
                <FileSignature className="w-5 h-5 text-primary shrink-0" />
                <span className="font-sans text-xs">Consentimiento Informado</span>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, docType: "CONTRACT" })}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-2 transition-all ${form.docType === "CONTRACT"
                  ? "border-primary bg-primary/5 text-primary shadow-2xs font-bold"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold"
                  }`}
              >
                <Scale className="w-5 h-5 text-primary shrink-0" />
                <span className="font-sans text-xs">Contrato de Servicios</span>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, docType: "RECEIPT" })}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-2 transition-all ${form.docType === "RECEIPT"
                  ? "border-primary bg-primary/5 text-primary shadow-2xs font-bold"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold"
                  }`}
              >
                <Receipt className="w-5 h-5 text-primary shrink-0" />
                <span className="font-sans text-xs">Comprobante de Pago</span>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, docType: "REPORT" })}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-2 transition-all ${form.docType === "REPORT"
                  ? "border-primary bg-primary/5 text-primary shadow-2xs font-bold"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold"
                  }`}
              >
                <BookOpen className="w-5 h-5 text-primary shrink-0" />
                <span className="font-sans text-xs">Informe de Sesión</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <h3 className="font-display font-bold text-base text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <User className="w-4.5 h-4.5 text-primary" />
              <span>2. Datos del Documento</span>
            </h3>

            <div className="flex flex-col gap-4 font-sans text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre Cliente / Paciente
                </label>
                <input
                  type="text"
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  placeholder="Nombre completo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    RUT / Identificación
                  </label>
                  <input
                    type="text"
                    value={form.clientRut}
                    onChange={(e) => setForm({ ...form, clientRut: e.target.value })}
                    placeholder="12.345.678-K"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Fecha del Documento
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Servicio / Atención
                </label>
                <input
                  type="text"
                  value={form.serviceName}
                  onChange={(e) => setForm({ ...form, serviceName: e.target.value })}
                  placeholder="Nombre del servicio"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-slate-800 font-medium"
                />
              </div>

              {form.docType === "RECEIPT" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Monto ($ CLP)
                    </label>
                    <input
                      type="text"
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: e.target.value })}
                      placeholder="45.000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-slate-800 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Medio de Pago
                    </label>
                    <input
                      type="text"
                      value={form.paymentMethod}
                      onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                      placeholder="Transferencia / Efectivo"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-slate-800 font-medium"
                    />
                  </div>
                </div>
              )}

              {form.docType === "REPORT" && (
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Observaciones y Avances
                  </label>
                  <textarea
                    rows={4}
                    value={form.sessionNotes}
                    onChange={(e) => setForm({ ...form, sessionNotes: e.target.value })}
                    placeholder="Detalles de la sesión..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-slate-800 font-medium resize-none"
                  />
                </div>
              )}

              <div className="border-t border-slate-100 pt-3">
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre del Profesional
                </label>
                <input
                  type="text"
                  value={form.professionalName}
                  onChange={(e) => setForm({ ...form, professionalName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary text-slate-800 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Printable Document Preview */}
        <div className="lg:col-span-7">
          <div
            id="printable-document"
            className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm flex flex-col justify-between min-h-[650px] relative overflow-hidden"
          >
            {/* Background subtle watermark */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none font-display text-8xl font-bold uppercase tracking-tighter">
              Bosque
            </div>

            <div>
              {/* Document Header */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-6 mb-8">
                <div className="flex flex-col gap-1">
                  <span className="font-display font-bold text-2xl text-slate-900 tracking-tight">
                    Marjorie Cayún
                  </span>
                  <span className="font-sans text-xs text-slate-500 font-semibold">
                    Acompañamiento Educativo & Psicopedagógico
                  </span>
                  <span className="font-sans text-3xs text-slate-400">
                    Bosque Aprendiz
                  </span>
                </div>

                <div className="text-right flex flex-col items-end">
                  <span className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 font-sans font-bold text-xs uppercase tracking-wider">
                    {form.docType === "CONSENT" && "Consentimiento Informado"}
                    {form.docType === "CONTRACT" && "Contrato de Servicios"}
                    {form.docType === "RECEIPT" && "Comprobante de Pago"}
                    {form.docType === "REPORT" && "Informe de Sesión"}
                  </span>
                  <span className="font-mono text-xs text-slate-400 mt-2">
                    Fecha: {form.date}
                  </span>
                </div>
              </div>

              {/* Document Body depending on DocType */}
              {form.docType === "CONSENT" && (
                <div className="flex flex-col gap-6 font-sans text-slate-700 text-sm leading-relaxed">
                  <h4 className="font-display font-bold text-lg text-slate-900 text-center uppercase tracking-wide">
                    Documento de Consentimiento Informado
                  </h4>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 grid grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <span className="text-slate-400 uppercase font-bold block text-3xs">Paciente / Cliente</span>
                      <span className="font-bold text-slate-800">{form.clientName || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase font-bold block text-3xs">RUT / Pasaporte</span>
                      <span className="font-bold text-slate-800">{form.clientRut || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase font-bold block text-3xs">Servicio Acordado</span>
                      <span className="font-bold text-slate-800">{form.serviceName || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase font-bold block text-3xs">Profesional</span>
                      <span className="font-bold text-slate-800">{form.professionalName}</span>
                    </div>
                  </div>

                  <p>
                    Por medio del presente documento, declaro formalmente aceptar la participación en las sesiones de acompañamiento profesional dictadas por <strong>{form.professionalName}</strong> siguiendo los lineamientos profesionales, éticos y legales de la psicopedagogía.
                  </p>

                  <ul className="list-disc pl-5 space-y-2 text-xs text-slate-650">
                    <li>Se me ha informado detalladamente el objetivo, metodologías y frecuencia de las atenciones.</li>
                    <li>Entiendo el compromiso de puntualidad y aviso previo de 48 horas ante cancelaciones o reprogramaciones.</li>
                    <li>Toda la información compartida durante el proceso mantendrá estricta confidencialidad profesional.</li>
                  </ul>
                </div>
              )}

              {form.docType === "CONTRACT" && (
                <div className="flex flex-col gap-5 font-sans text-slate-700 text-xs leading-relaxed">
                  <h4 className="font-display font-bold text-base text-slate-900 text-center uppercase tracking-wide">
                    Contrato por Prestación de Servicios Profesionales
                  </h4>

                  <p>
                    Con fecha <strong>{form.date}</strong>, entre <strong>{form.professionalName}</strong> ({form.professionalTitle}), en adelante el <em>&quot;Prestador&quot;</em>, y don/doña <strong>{form.clientName || "[Nombre Cliente]"}</strong>, RUT <strong>{form.clientRut || "[RUT]"}</strong>, en adelante el <em>&quot;Cliente&quot;</em>, se acuerda el siguiente contrato:
                  </p>

                  <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <strong className="block text-slate-900">PRIMERA (Objeto):</strong>
                      <span>El Prestador se compromete a brindar servicios profesionales de <strong>{form.serviceName}</strong>.</span>
                    </div>
                    <div>
                      <strong className="block text-slate-900">SEGUNDA (Modalidad y Agenda):</strong>
                      <span>Las sesiones se realizarán en las fechas y horarios coordinados formalmente a través de la plataforma <strong>Bosque Aprendiz</strong>.</span>
                    </div>
                    <div>
                      <strong className="block text-slate-900">TERCERA (Confidencialidad):</strong>
                      <span>Ambas partes garantizan el resguardo de la información compartida y la privacidad de las sesiones.</span>
                    </div>
                  </div>
                </div>
              )}

              {form.docType === "RECEIPT" && (
                <div className="flex flex-col gap-6 font-sans text-slate-700 text-sm leading-relaxed">
                  <h4 className="font-display font-bold text-lg text-slate-900 text-center uppercase tracking-wide">
                    Comprobante de Pago de Honorarios
                  </h4>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3 text-xs">
                      <span className="font-bold text-slate-500 uppercase">Recibido De:</span>
                      <span className="font-bold text-slate-900 text-sm">{form.clientName} ({form.clientRut})</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-slate-200 pb-3 text-xs">
                      <span className="font-bold text-slate-500 uppercase">Por Concepto De:</span>
                      <span className="font-semibold text-slate-800">{form.serviceName}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-slate-200 pb-3 text-xs">
                      <span className="font-bold text-slate-500 uppercase">Medio de Pago:</span>
                      <span className="font-semibold text-slate-800">{form.paymentMethod}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-slate-700 uppercase text-xs">Monto Total Pagado:</span>
                      <span className="font-display font-bold text-2xl text-primary">${form.amount} CLP</span>
                    </div>
                  </div>
                </div>
              )}

              {form.docType === "REPORT" && (
                <div className="flex flex-col gap-6 font-sans text-slate-700 text-sm leading-relaxed">
                  <h4 className="font-display font-bold text-lg text-slate-900 text-center uppercase tracking-wide">
                    Informe de Resumen de Sesión
                  </h4>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 grid grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <span className="text-slate-400 uppercase font-bold block text-3xs">Paciente / Cliente</span>
                      <span className="font-bold text-slate-800">{form.clientName} ({form.clientRut})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase font-bold block text-3xs">Fecha de Sesión</span>
                      <span className="font-bold text-slate-800">{form.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
                    <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                      Observaciones, Evolución y Recomendaciones:
                    </span>
                    <p className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-sans leading-relaxed whitespace-pre-wrap">
                      {form.sessionNotes || "Sin observaciones registradas."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Document Signatures & Footer */}
            <div className="pt-12 border-t border-slate-200 mt-12 grid grid-cols-2 gap-8 text-center font-sans text-xs">
              <div className="flex flex-col items-center gap-2">
                <div className="w-48 border-b border-slate-400 h-12" />
                <span className="font-bold text-slate-800">{form.clientName || "Firma Cliente / Paciente"}</span>
                <span className="text-3xs text-slate-400">{form.clientRut}</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-48 border-b border-slate-400 h-12 flex items-end justify-center pb-1 font-serif italic text-slate-400 text-xs">
                  Marjorie Cayún
                </div>
                <span className="font-bold text-slate-800">{form.professionalName}</span>
                <span className="text-3xs text-slate-500">{form.professionalTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
