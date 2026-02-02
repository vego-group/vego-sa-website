function LoginFooter() {
  return (
    <div className="space-y-3 border-t border-white/10 pt-6 text-center text-[11px] uppercase tracking-[0.2em] text-white/45">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <span className="rounded-full border border-white/10 px-3 py-1">
          Encrypted session
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1">
          V2.0 admin hub
        </span>
      </div>
      <p className="text-[10px] normal-case tracking-normal text-white/40">
        Authorized personnel only. All activities are monitored.
      </p>
    </div>
  )
}

export { LoginFooter }
