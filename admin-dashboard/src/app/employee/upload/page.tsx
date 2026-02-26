"use client";

import { useState } from "react";
import { Upload, FileText, Image as Img } from "lucide-react";

import { getApiErrorMessage, uploadEmployeeReceipt } from "@/utils/api";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!file) return setError("Select a file first");
    setLoading(true), setError(""), setResult(null);

    try {
      const data = await uploadEmployeeReceipt(file);
      setResult(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Upload Receipt</h1>

      <div className="bg-white dark:bg-gray-800 p-6 shadow rounded">
        <label className="border-2 border-dashed rounded p-10 flex flex-col items-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition">
          <Upload size={40} className="text-gray-500 dark:text-gray-300 mb-3" />
          <p>Select PDF or Image</p>
          <input type="file" accept=".pdf,image/*" className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>

        {file && (
          <div className="mt-4 flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded">
            {file.type.includes("pdf") ? <FileText size={20} /> : <Img size={20} />}
            <span>{file.name}</span>
          </div>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {result && (
          <pre className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded text-sm max-h-64 overflow-auto">
            {result.extracted_text}
          </pre>
        )}
      </div>
    </div>
  );
}