// Generic placeholder for nav destinations that aren't built yet.
export default function ComingSoon({ title }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="page-title text-2xl text-[#1d2a25]">{title}</h1>
      <p className="text-sm text-gray-500">This section is coming soon.</p>
    </div>
  )
}
