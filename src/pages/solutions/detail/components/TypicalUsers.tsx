interface TypicalUsersProps {
  users: string[];
}

export default function TypicalUsers({ users }: TypicalUsersProps) {
  return (
    <section className="bg-background-50" id="users" aria-labelledby="users-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="users-heading"
          className="mb-2 text-2xl text-foreground-50 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Typical users
        </h2>
        <p className="mb-6 text-sm text-foreground-400">
          Roles that may find this solution area relevant. Availability and suitability of specific products varies by role and use case.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {users.map((user) => (
            <span key={user} className="inline-flex items-center gap-1.5 rounded-full border border-foreground-200/20 bg-background-100/60 px-3.5 py-1.5 text-xs text-foreground-300">
              <i className="ri-user-line text-[11px] text-foreground-400" aria-hidden="true" />
              {user}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}