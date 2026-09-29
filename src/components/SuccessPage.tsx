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
    <div className="w-full min-h-[calc(100vh-64px)] pb-20 relative z-10 page-enter select-none bg-[#F8F5EF]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex flex-col gap-6">
        {/* Stage Progress Pill: Manrope 700 11-12px */}
        <div className="glass-panel p-2.5 px-4 rounded-full flex items-center justify-between shadow-xs bg-white/90 border border-[#C9A96E]/35">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1B7340] animate-status-dot" />
            <span className="text-[11px] sm:text-[12px] text-[#625B58] font-bold tracking-wider uppercase">
              Stage 5 of 5 Complete
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#1B7340]/10 text-[#1B7340] border border-[#1B7340]/25 px-3 py-0.5 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wider uppercase">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Dossier Received</span>
          </div>
        </div>

        {/* Centered Premium Glass Success Card */}
        <div className="glass-panel p-6 sm:p-8 flex flex-col items-center text-center shadow-lg rounded-[22px] relative overflow-hidden bg-white/90 border border-[#C9A96E]/40">
          {/* Subtle burgundy accent stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#6B1F2A]" />

          {/* Success Icon with Soft Emerald Pop */}
          <div className="relative mb-4 mt-2">
            <div className="w-20 h-20 rounded-full bg-[#1B7340]/10 border border-[#1B7340]/25 flex items-center justify-center shadow-xs animate-success-pop">
              <div className="w-14 h-14 rounded-full bg-[#1B7340] text-white flex items-center justify-center shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8F5EF] text-[#6B1F2A] border border-[#C9A96E]/40 rounded-full mb-3 shadow-2xs">
            <FileCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider">
              Office of Academic Appointments & Faculty Affairs
            </span>
          </div>

          {/* Heading: DM Serif Display, Font weight 400 */}
          <h1 className="font-serif-tnu font-normal text-2xl sm:text-3xl text-[#241F20] mb-2 tracking-tight">
            Application Submitted Successfully
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#625B58] max-w-md leading-[1.6] mb-6 font-normal">
            Thank you for submitting your faculty candidature. Your comprehensive academic portfolio is registered with the University Selection Secretariat.
          </p>

          {/* Official ID Block */}
          <div className="w-full bg-[#F8F5EF] border border-[#C9A96E]/40 p-4 rounded-xl flex items-center justify-between shadow-2xs mb-5">
            <div className="flex flex-col text-left">
              <span className="text-[11px] text-[#8A817C] font-bold uppercase tracking-wider">
                Official Application ID
              </span>
              {/* ID: DM Serif Display, Font weight 400 */}
              <span className="font-serif-tnu font-normal text-xl sm:text-2xl text-[#6B1F2A]">
                {applicationId}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyId}
              className="btn-secondary-tnu flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-bold cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#1B7340]" />
                  <span className="text-[#1B7340]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#625B58]" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Dossier Confirmation Details Grid: Manrope 500 / 600 */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs mb-5">
            <div className="bg-[#F8F5EF] border border-[#EEE9DF] p-3 rounded-xl shadow-2xs flex flex-col">
              <span className="text-[11px] text-[#8A817C] uppercase tracking-wider font-semibold">
                Position
              </span>
              <span className="font-semibold text-[#241F20] text-[14px] mt-0.5">
                Assistant / Associate Professor
              </span>
            </div>

            <div className="bg-[#F8F5EF] border border-[#EEE9DF] p-3 rounded-xl shadow-2xs flex flex-col">
              <span className="text-[11px] text-[#8A817C] uppercase tracking-wider font-semibold">
                School
              </span>
              <span className="font-semibold text-[#241F20] text-[14px] mt-0.5">
                School of Technology
              </span>
            </div>

            <div className="bg-[#F8F5EF] border border-[#EEE9DF] p-3 rounded-xl shadow-2xs flex flex-col">
              <span className="text-[11px] text-[#8A817C] uppercase tracking-wider font-semibold">
                Discipline Area
              </span>
              <span className="font-medium text-[#241F20] text-[13px] mt-0.5">
                Artificial Intelligence & Machine Learning
              </span>
            </div>

            <div className="bg-[#F8F5EF] border border-[#EEE9DF] p-3 rounded-xl shadow-2xs flex flex-col">
              <span className="text-[11px] text-[#8A817C] uppercase tracking-wider font-semibold">
                Submission Verification
              </span>
              <div className="flex items-center gap-1.5 font-medium text-[#241F20] text-[13px] mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>March 2026 • Dossier Verified</span>
              </div>
            </div>
          </div>

          {/* Current Dossier Status */}
          <div className="w-full bg-white border border-[#C9A96E]/40 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs text-left mb-6">
            <FileCheck className="w-4 h-4 text-[#6B1F2A] shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-[#8A817C] uppercase tracking-wider">
                Current Dossier Status
              </span>
              <span className="text-[13px] font-bold text-[#6B1F2A]">
                Under Initial Academic Screening by Selection Secretariat
              </span>
              <span className="text-[12px] text-[#625B58] mt-0.5 font-medium">
                Candidate registered: {formData.firstName} {formData.lastName} ({formData.email})
              </span>
            </div>
          </div>

          {/* Action Buttons: Manrope 700 14-15px */}
          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="btn-secondary-tnu w-full h-11 text-[14px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4 text-[#C9A96E]" />
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
              className="btn-primary-tnu w-full h-12 text-[14px] sm:text-[15px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md uppercase tracking-wider group"
            >
              <Compass className="w-4 h-4" />
              <span>Back to Career Opportunities</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Confirmation Dispatch Notice */}
          <div className="flex items-center justify-center gap-2 text-center text-[13px] text-[#625B58] mt-5 font-normal">
            <Mail className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Formal acknowledgment has been dispatched to applicant's registered email address.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
