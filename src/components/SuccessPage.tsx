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
    <div className="w-full min-h-[calc(100vh-64px)] pb-20 relative z-10 page-enter select-none bg-[#F7F9FC]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex flex-col gap-6">
        {/* Stage Progress Pill */}
        <div className="bg-white p-2.5 px-4 rounded-full flex items-center justify-between shadow-xs border border-[#D9E2EC]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#19B87A] animate-pulse" />
            <span className="text-[11px] sm:text-[12px] text-[#52708A] font-semibold tracking-wider uppercase">
              Stage 5 of 5 Complete
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#E8F8F2] text-[#16865F] border border-emerald-200 px-3 py-0.5 rounded-full text-[11px] sm:text-[12px] font-semibold tracking-wider uppercase">
            <CheckCircle className="w-3.5 h-3.5 text-[#19B87A]" />
            <span>Dossier Lodged</span>
          </div>
        </div>

        {/* Centered Success Card */}
        <div className="bg-white p-6 sm:p-8 flex flex-col items-center text-center shadow-md rounded-[18px] relative overflow-hidden border border-[#D9E2EC]">
          {/* Top Blue Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0057B8]" />

          {/* Success Icon with Soft Green Pop (Rule 10) */}
          <div className="relative mb-4 mt-2">
            <div className="w-20 h-20 rounded-full bg-[#E8F8F2] border border-emerald-200 flex items-center justify-center shadow-xs">
              <div className="w-14 h-14 rounded-full bg-[#19B87A] text-white flex items-center justify-center shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF4FF] text-[#0057B8] border border-[#BFDDF5] rounded-full mb-3 shadow-2xs">
            <FileCheck className="w-3.5 h-3.5 text-[#0057B8]" />
            <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider">
              Office of Academic Appointments & Faculty Affairs
            </span>
          </div>

          {/* Heading (Rule 3: Dark navy #003B68) */}
          <h1 className="text-2xl sm:text-3xl text-[#003B68] font-bold mb-2 tracking-tight">
            Application Submitted Successfully
          </h1>
          <p className="text-[15px] text-[#52708A] max-w-md leading-relaxed mb-6 font-normal">
            Thank you for submitting your faculty candidature. Your comprehensive academic portfolio is registered with the University Selection Secretariat.
          </p>

          {/* Official ID Block */}
          <div className="w-full bg-[#F5F9FD] border border-[#D9E2EC] p-4 rounded-xl flex items-center justify-between shadow-2xs mb-5">
            <div className="flex flex-col text-left">
              <span className="text-[11px] text-[#71869A] font-semibold uppercase tracking-wider">
                Official Application Tracking ID
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#0057B8]">
                {applicationId}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyId}
              className="btn-secondary-portal flex items-center gap-1.5 px-3.5 py-2 text-[13px] cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#16865F]" />
                  <span className="text-[#16865F]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#0057B8]" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          {/* Dossier Confirmation Details Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs mb-5">
            <div className="bg-[#F7F9FC] border border-[#D9E2EC] p-3 rounded-xl shadow-2xs flex flex-col">
              <span className="text-[11px] text-[#71869A] uppercase tracking-wider font-semibold">
                Position
              </span>
              <span className="font-semibold text-[#123B5D] text-[14px] mt-0.5">
                Assistant / Associate Professor
              </span>
            </div>

            <div className="bg-[#F7F9FC] border border-[#D9E2EC] p-3 rounded-xl shadow-2xs flex flex-col">
              <span className="text-[11px] text-[#71869A] uppercase tracking-wider font-semibold">
                School
              </span>
              <span className="font-semibold text-[#123B5D] text-[14px] mt-0.5">
                School of Technology
              </span>
            </div>

            <div className="bg-[#F7F9FC] border border-[#D9E2EC] p-3 rounded-xl shadow-2xs flex flex-col">
              <span className="text-[11px] text-[#71869A] uppercase tracking-wider font-semibold">
                Discipline Area
              </span>
              <span className="font-medium text-[#123B5D] text-[13px] mt-0.5">
                Artificial Intelligence & Machine Learning
              </span>
            </div>

            <div className="bg-[#F7F9FC] border border-[#D9E2EC] p-3 rounded-xl shadow-2xs flex flex-col">
              <span className="text-[11px] text-[#71869A] uppercase tracking-wider font-semibold">
                Submission Verification
              </span>
              <div className="flex items-center gap-1.5 font-medium text-[#123B5D] text-[13px] mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#0057B8]" />
                <span>March 2026 • Dossier Verified</span>
              </div>
            </div>
          </div>

          {/* Current Dossier Status */}
          <div className="w-full bg-[#EAF4FF] border border-[#BFDDF5] rounded-xl p-3.5 flex items-start gap-3 shadow-2xs text-left mb-6">
            <FileCheck className="w-4 h-4 text-[#0057B8] shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-[#0057B8] uppercase tracking-wider">
                Current Dossier Status
              </span>
              <span className="text-[13px] font-bold text-[#003B68]">
                Under Initial Academic Screening by Selection Secretariat
              </span>
              <span className="text-[12px] text-[#52708A] mt-0.5 font-medium">
                Candidate registered: {formData.firstName} {formData.lastName} ({formData.email})
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="btn-secondary-portal w-full h-11 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4 text-[#0057B8]" />
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
              className="btn-primary-portal w-full h-12 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <Compass className="w-4 h-4" />
              <span>Back to Career Opportunities</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Confirmation Notice */}
          <div className="flex items-center justify-center gap-2 text-center text-[13px] text-[#52708A] mt-5 font-normal">
            <Mail className="w-3.5 h-3.5 text-[#0057B8]" />
            <span>Formal acknowledgment has been dispatched to applicant's registered email address.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
