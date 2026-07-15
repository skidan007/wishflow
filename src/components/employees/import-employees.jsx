"use client";
import { useRef, useState, useTransition } from "react";
import { Download, FileUp, X } from "lucide-react";
import * as XLSX from "xlsx";
import { importEmployees } from "@/app/dashboard/employees/actions";
import { validateEmployee } from "@/lib/employee-validation";

const template =
  "employee_id,first_name,last_name,department,position,email,phone_number,birthday_month,birthday_day\nEMP-001,Amara,Okafor,Design,Product Designer,amara@example.com,+2348000000000,7,14";

export function ImportEmployees() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const input = useRef(null);
  const invalid = rows.filter((row) => validateEmployee(row).length).length;

  function downloadTemplate() {
    const blob = new Blob([template], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wishflow-employee-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function fileSelected(file) {
    if (!file) return;
    setError("");
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const source = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: "" });
      const parsed = source.map((row) => ({
        employee_id: String(row.employee_id || ""),
        first_name: String(row.first_name || "").trim(),
        last_name: String(row.last_name || "").trim(),
        department: String(row.department || ""),
        position: String(row.position || ""),
        email: String(row.email || ""),
        phone_number: String(row.phone_number || ""),
        birthday_month: Number(row.birthday_month),
        birthday_day: Number(row.birthday_day),
      }));
      if (!parsed.length) throw new Error("This file has no employee rows.");
      setRows(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "We couldn’t read that file.");
    }
  }

  function submit() {
    startTransition(async () => {
      const result = await importEmployees(rows);
      if (result.error) return setError(result.error);
      setOpen(false);
      setRows([]);
    });
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 text-sm font-semibold">
        <FileUp size={17} />
        Import
      </button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/30 p-4">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <button onClick={() => setOpen(false)} className="absolute right-5 top-5 rounded-lg p-1 text-slate-500">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold">Import employees</h2>
            <p className="mt-1 text-sm text-slate-500">Upload a CSV or Excel file with up to 500 employees.</p>
            <button onClick={downloadTemplate} className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#6B5CE7]">
              <Download size={16} />
              Download CSV template
            </button>
            <input ref={input} onChange={(e) => fileSelected(e.target.files?.[0])} accept=".csv,.xlsx,.xls" type="file" className="hidden" />
            <button onClick={() => input.current?.click()} className="mt-5 flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50 px-6 py-8 text-sm font-semibold text-[#6B5CE7]">
              <FileUp size={24} className="mb-2" />
              Choose CSV or Excel file
            </button>
            {rows.length > 0 && (
              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm">
                <p className="font-semibold">{rows.length} employees ready to import</p>
                <p className={invalid ? "mt-1 text-rose-600" : "mt-1 text-emerald-600"}>
                  {invalid ? `${invalid} rows need fixing` : "All rows passed validation"}
                </p>
                <div className="mt-3 max-h-28 overflow-auto text-slate-500">
                  {rows.slice(0, 5).map((row, i) => (
                    <p key={i}>
                      {row.first_name} {row.last_name} · {row.department || "No department"}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {error && <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold">
                Cancel
              </button>
              <button disabled={!rows.length || invalid > 0 || pending} onClick={submit} className="rounded-xl bg-[#6B5CE7] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
                {pending ? "Importing…" : `Import ${rows.length || ""} employees`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
