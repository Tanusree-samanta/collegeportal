import React, { useState } from 'react';
import {
  CheckCircle,
  Copy,
  Check,
  Download,
  Compass,
  Mail,
  Clock,
  FileCheck,
  ArrowRight,
} from 'lucide-react';
import { ApplicationFormData } from '../types';

interface SuccessPageProps {
  applicationId: string;
  formData: ApplicationFormData;
  onBackToCareers: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({
  applicationId,
  formData,
  onBackToCareers,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 1200);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] pb-20 relative z-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex flex-col gap-6">
        {/* Stage Progress Pill */}
        <div className="glass-panel p-2 px-4 rounded-full flex items-center justify-between shadow-[0_4px_16px_rgba(41,39,39,0.03)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D83232] animate-status-dot" />
            <span className="text-[10px] sm:text-xs text-[#765331] font-bold tracking-wider uppercase">
              Stage 5 of 5 Complete
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow-2xs">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dossier Received</span>
          </div>
        </div>

        {/* Centered Premium Glass Success Card */}
        <div
          className="glass-panel p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_12px_40px_rgba(41,39,39,0.06)] rounded-2xl relative overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.68)',
            backdropFilter: 'blur(18px)',
          }}
        >
          {/* Subtle existing-red accent stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#D83232]" />

          {/* Success Icon with Subtle 500ms Pop Animation (Existing Success Green) */}
          <div className="relative mb-4 mt-1">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center shadow-md animate-success-pop">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-inner">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 text-[#765331] border border-[#D9CC86]/50 rounded-full mb-2.5 shadow-2xs">
            <FileCheck className="w-3.5 h-3.5 text-[#B69A62]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              Office of Academic Appointments
            </span>
          </div>

          <h1 className="font-serif-tnu text-2xl sm:text-3xl font-bold text-[#292727] mb-2">
            Application Submitted Successfully
          </h1>
          <p className="text-xs sm:text-sm text-[#5B403D] max-w-md leading-relaxed mb-5">
            Thank you for submitting your faculty candidature. Your comprehensive academic portfolio is registered with the University Selection Secretariat.
          </p>

          {/* Official ID Block */}
          <div className="w-full bg-white/85 border border-[#D9CC86]/50 p-4 rounded-xl flex items-center justify-between shadow-2xs mb-5">
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-[#765331] font-bold uppercase tracking-wider">
                Official Application ID
              </span>
              <span className="font-serif-tnu text-xl sm:text-2xl font-bold text-[#D83232]">
                {applicationId}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyId}
              className="btn-secondary-tnu flex items-center gap-1.5 px-3.5 py-2 text-xs cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#765331]" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Dossier Confirmation Details Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs mb-5">
            <div className="bg-white/70 border border-[#D9CC86]/40 p-3 rounded-xl shadow-2xs flex flex-col">
              <span className="text-[10px] text-[#765331] uppercase tracking-wider font-bold">
                Position
              </span>
              <span className="font-bold text-[#292727] text-sm mt-0.5">
                Assistant / Associate Professor
              </span>
            </div>

            <div className="bg-white/70 border border-[#D9CC86]/40 p-3 rounded-xl shadow-2xs flex flex-col">
              <span className="text-[10px] text-[#765331] uppercase tracking-wider font-bold">
                School
              </span>
              <span className="font-bold text-[#292727] text-sm mt-0.5">
                School of Technology
              </span>
            </div>

            <div className="bg-white/70 border border-[#D9CC86]/40 p-3 rounded-xl shadow-2xs flex flex-col">
              <span className="text-[10px] text-[#765331] uppercase tracking-wider font-bold">
                Area / Discipline
              </span>
              <span className="font-medium text-[#292727] mt-0.5">
                Artificial Intelligence & Machine Learning
              </span>
            </div>

            <div className="bg-white/70 border border-[#D9CC86]/40 p-3 rounded-xl shadow-2xs flex flex-col">
              <span className="text-[10px] text-[#765331] uppercase tracking-wider font-bold">
                Submission Date
              </span>
              <div className="flex items-center gap-1.5 font-medium text-[#292727] mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#B69A62]" />
                <span>March 2026 • Verified</span>
              </div>
            </div>
          </div>

          {/* Current Dossier Status */}
          <div className="w-full bg-white/75 border border-[#D9CC86]/50 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs text-left mb-6">
            <FileCheck className="w-4 h-4 text-[#D83232] shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-[#765331] uppercase tracking-wider">
                Current Dossier Status
              </span>
              <span className="text-xs font-bold text-[#D83232]">
                Under Initial Screening by Academic Selection Committee
              </span>
              <span className="text-[11px] text-[#765331] mt-0.5">
                Candidate registered: {formData.firstName} {formData.lastName} ({formData.email})
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="btn-secondary-tnu w-full h-11 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4 text-[#B69A62]" />
              <span>
                {downloading
                  ? 'Generating Dossier PDF...'
                  : downloaded
                  ? '✓ Application PDF Downloaded'
                  : 'Download Application Copy (PDF)'}
              </span>
            </button>

            <button
              type="button"
              onClick={onBackToCareers}
              className="btn-primary-tnu w-full h-12 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md uppercase tracking-wider group"
            >
              <Compass className="w-4 h-4" />
              <span>Back to Career Opportunities</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Confirmation Dispatch Notice */}
          <div className="flex items-center justify-center gap-2 text-center text-xs text-[#765331] mt-4">
            <Mail className="w-3.5 h-3.5 text-[#B69A62]" />
            <span>Confirmation dispatch sent to candidate's verified email address.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
