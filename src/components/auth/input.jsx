export function Input({ label, name, type = 'text' }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        required
        name={name}
        type={type}
        className="mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 outline-none focus:border-[#6B5CE7]"
      />
    </label>
  );
}
