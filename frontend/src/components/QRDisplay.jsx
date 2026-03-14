import QRCode from "qrcode.react";

export default function QRDisplay({ link }) {
  return (
    <div className="flex flex-col items-center gap-5 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 w-fit mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
        <h3 className="text-lg font-semibold tracking-wide text-gray-700 uppercase text-sm">
          Scan to Review
        </h3>
      </div>

      {/* QR Code frame */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-teal-50 to-white border border-teal-100 shadow-inner">
        <QRCode value={link} size={200} />
      </div>

      {/* Link pill */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full max-w-xs w-full">
        <svg className="w-4 h-4 text-teal-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <p className="text-xs text-gray-500 truncate">{link}</p>
      </div>

    </div>
  );
}