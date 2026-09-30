import React, { useState } from 'react';
import {
  FolderArchive,
  UploadCloud,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Trash2,
  Eye,
  RefreshCw,
  Plus,
  ShieldCheck,
  FileCheck,
  X,
  Sparkles,
} from 'lucide-react';
import { CandidateDocument } from '../../types';

interface CandidateDocumentsViewProps {
  documents: CandidateDocument[];
  onUploadDocument: (newDoc: CandidateDocument) => void;
  onReplaceDocument: (docId: string, fileName: string, fileSize: string) => void;
  onDeleteDocument: (docId: string) => void;
}

export const CandidateDocumentsView: React.FC<CandidateDocumentsViewProps> = ({
  documents,
  onUploadDocument,
  onReplaceDocument,
  onDeleteDocument,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadDocName, setUploadDocName] = useState('');
  const [uploadDocType, setUploadDocType] = useState<'cv' | 'degree' | 'experience' | 'id_proof' | 'other'>('degree');
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadFileSize, setUploadFileSize] = useState('');
  const [previewDoc, setPreviewDoc] = useState<CandidateDocument | null>(null);

  const masterCv = documents.find((d) => d.type === 'cv');

  const filteredDocs = documents.filter((doc) => {
    if (selectedCategory === 'all') return true;
    return doc.type === selectedCategory;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadDocName) return;

    const doc: CandidateDocument = {
      id: `doc-${Date.now().toString().slice(-4)}`,
      name: uploadDocName,
      type: uploadDocType,
      required: true,
      fileName: uploadFileName || `${uploadDocName.replace(/\s+/g, '_')}.pdf`,
      fileSize: uploadFileSize || '2.1 MB',
      status: 'under_review',
      uploadedDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      version: 'v1.0',
    };

    onUploadDocument(doc);
    setShowUploadModal(false);
    setUploadDocName('');
    setUploadFileName('');
    setUploadFileSize('');
  };

  const simulateFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadFileName(file.name);
      setUploadFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (!uploadDocName) {
        setUploadDocName(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ========================================================= */}
      {/* 1. HEADER & VAULT SUMMARY                                */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-[#0057B8]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0057B8]">
              Institutional Document Vault
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#003B68]">
            Academic Credentials & CV Repository
          </h1>
          <p className="text-xs text-[#52708A] mt-0.5">
            Encrypted institutional repository for UGC/AICTE statutory verification, selection committee scrutiny, and automated dossiers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 2. MASTER ACADEMIC CV CARD (HIGHLIGHTED)                  */}
      {/* ========================================================= */}
      {masterCv && (
        <div className="rounded-2xl bg-[#F0F7FF] border-2 border-[#BFDDF5] p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0057B8] text-white flex items-center justify-center shrink-0 shadow-md">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase bg-[#EAF4FF] text-[#0057B8] px-2 py-0.5 rounded-full border border-[#BFDDF5]">
                    Primary Academic CV
                  </span>
                  <span className="text-xs text-[#71869A]">Version {masterCv.version}</span>
                  <span className="text-xs font-bold text-[#059669] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#003B68]">
                  {masterCv.name}
                </h3>
                <p className="text-xs text-[#52708A] mt-0.5">
                  File: <span className="font-mono text-[#003B68]">{masterCv.fileName}</span> ({masterCv.fileSize}) • Uploaded on {masterCv.uploadedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setPreviewDoc(masterCv)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EAF4FF] text-[#0057B8] text-xs font-semibold border border-[#D9E2EC] transition-all cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#0057B8]" />
                <span>Preview</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const newVer = `v${(parseFloat(masterCv.version.slice(1)) + 0.1).toFixed(1)}`;
                  onReplaceDocument(masterCv.id, `Prof_D_Chatterjee_CV_${newVer}.pdf`, '2.6 MB');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EAF4FF] text-[#0057B8] text-xs font-bold border border-[#D9E2EC] transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#0057B8]" />
                <span>Update Version</span>
              </button>
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading ${masterCv.fileName}`);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. CATEGORY FILTERS                                      */}
      {/* ========================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Documents' },
          { id: 'cv', label: 'Curriculum Vitae' },
          { id: 'degree', label: 'Degrees & Transcripts' },
          { id: 'experience', label: 'Experience & Relieving' },
          { id: 'id_proof', label: 'Government ID' },
          { id: 'other', label: 'Other Credentials' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#0057B8] text-white shadow-xs'
                : 'bg-white text-[#52708A] hover:text-[#003B68] border border-[#D9E2EC]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 4. DOCUMENTS GRID                                        */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl p-5 border border-[#D9E2EC] hover:border-[#0057B8] hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                    doc.type === 'degree'
                      ? 'bg-[#F0F7FF] text-[#0057B8] border border-[#BFDDF5]'
                      : doc.type === 'experience'
                      ? 'bg-[#EAF4FF] text-[#003B68]'
                      : 'bg-[#F7F9FC] text-[#52708A]'
                  }`}
                >
                  {doc.type.replace('_', ' ')}
                </span>

                <span
                  className={`text-[11px] font-bold flex items-center gap-1 ${
                    doc.status === 'verified'
                      ? 'text-[#059669]'
                      : doc.status === 'under_review'
                      ? 'text-[#D97706]'
                      : 'text-[#71869A]'
                  }`}
                >
                  {doc.status === 'verified' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </>
                  ) : doc.status === 'under_review' ? (
                    <>
                      <Clock className="w-3.5 h-3.5" />
                      <span>Under Review</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Pending</span>
                    </>
                  )}
                </span>
              </div>

              <h4 className="text-sm font-bold text-[#003B68] leading-snug line-clamp-2">
                {doc.name}
              </h4>
              <p className="text-xs font-mono text-[#71869A] mt-1 truncate">
                {doc.fileName}
              </p>
              <div className="text-[11px] text-[#52708A] mt-1 flex items-center gap-2">
                <span>{doc.fileSize}</span>
                <span>•</span>
                <span>Uploaded {doc.uploadedDate}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#D9E2EC] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPreviewDoc(doc)}
                className="text-xs font-bold text-[#0057B8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => alert(`Downloading ${doc.fileName}`)}
                  className="p-1.5 rounded-lg text-[#52708A] hover:text-[#0057B8] hover:bg-[#EAF4FF] transition-colors"
                  title="Download Document"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteDocument(doc.id)}
                  className="p-1.5 rounded-lg text-[#71869A] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                  title="Delete Document"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 5. MODAL: UPLOAD NEW DOCUMENT                             */}
      {/* ========================================================= */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleUploadSubmit}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#D9E2EC] space-y-4 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-3">
              <h3 className="text-base font-serif font-bold text-[#003B68] flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-[#0057B8]" />
                Upload Institutional Document
              </h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="p-1 text-[#71869A] hover:text-[#003B68] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">
                Document Classification
              </label>
              <select
                value={uploadDocType}
                onChange={(e) => setUploadDocType(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none bg-white"
              >
                <option value="degree">Academic Degree Certificate / Transcript</option>
                <option value="cv">Updated Academic Curriculum Vitae (CV)</option>
                <option value="experience">Teaching / Research Relieving & Experience Letter</option>
                <option value="id_proof">Government ID (Aadhaar / Passport / Voter ID)</option>
                <option value="other">Publications / Patent Grant / Award Certificate</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">
                Document Title
              </label>
              <input
                type="text"
                placeholder="e.g. Ph.D. Degree Certificate, Q1 Journal Acceptance"
                value={uploadDocName}
                onChange={(e) => setUploadDocName(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#0057B8] focus:outline-none"
              />
            </div>

            {/* Dropzone / File Picker */}
            <div>
              <label className="text-[11px] font-bold text-[#003B68] block mb-1">
                File Attachment (PDF / DOCX up to 15MB)
              </label>
              <label className="border-2 border-dashed border-[#D9E2EC] hover:border-[#0057B8] rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer bg-[#F0F7FF]/60 hover:bg-[#F0F7FF] transition-all">
                <UploadCloud className="w-7 h-7 text-[#0057B8]" />
                <span className="text-xs font-semibold text-[#003B68]">
                  {uploadFileName ? uploadFileName : 'Choose file or drag & drop here'}
                </span>
                <span className="text-[11px] text-[#71869A]">
                  {uploadFileSize ? `Size: ${uploadFileSize}` : 'Supported formats: .pdf, .docx, .jpeg'}
                </span>
                <input
                  type="file"
                  onChange={simulateFilePick}
                  className="hidden"
                  accept=".pdf,.docx,.doc,.jpg,.png"
                />
              </label>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white hover:bg-[#F7F9FC] text-[#52708A] text-xs font-bold border border-[#D9E2EC] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Save to Vault
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. MODAL: PREVIEW DOCUMENT                                */}
      {/* ========================================================= */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-[#003B68]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#D9E2EC] space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-3">
              <div>
                <h3 className="text-base font-serif font-bold text-[#003B68]">
                  {previewDoc.name}
                </h3>
                <span className="text-xs font-mono text-[#71869A]">{previewDoc.fileName}</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-1 text-[#71869A] hover:text-[#003B68] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated PDF document viewport */}
            <div className="h-72 rounded-xl bg-[#F0F7FF] border border-[#D9E2EC] flex flex-col items-center justify-center p-6 text-center space-y-3">
              <FileCheck className="w-12 h-12 text-[#0057B8]" />
              <div>
                <h4 className="text-sm font-bold text-[#003B68]">{previewDoc.name}</h4>
                <p className="text-xs text-[#52708A] mt-1 max-w-md">
                  Digitally authenticated by The Neotia University Central Document Scrutiny Cell under reference cycle 2026-27.
                </p>
              </div>
              <div className="text-[11px] text-[#71869A] font-mono">
                Status: {previewDoc.status.toUpperCase()} • Version {previewDoc.version} • {previewDoc.fileSize}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#F7F9FC] text-[#52708A] text-xs font-bold border border-[#D9E2EC] cursor-pointer"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => alert(`Downloading ${previewDoc.fileName}`)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0057B8] hover:bg-[#003B68] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Download Original</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
