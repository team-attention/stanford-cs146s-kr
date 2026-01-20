const teamMembers = [
  {
    name: 'Mihail Eric',
    role: 'Instructor',
    imageUrl: 'https://themodernsoftware.dev/me.jpg',
    link: 'https://www.mihaileric.com/',
  },
  {
    name: 'Febie Lin',
    role: 'TA',
    imageUrl: 'https://themodernsoftware.dev/febie.jpeg',
    link: 'https://www.linkedin.com/in/febielin/',
  },
  {
    name: 'Brent Ju',
    role: 'TA',
    imageUrl: 'https://themodernsoftware.dev/brent_ju.jpeg',
    link: 'https://www.linkedin.com/in/brentju/',
  },
]

export default function TeamGrid() {
  return (
    <section className="mb-12">
      <h2 className="text-[32px] font-semibold text-text-primary mb-6 pb-2 border-b-2 border-stanford-red">
        Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <a
            key={member.name}
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border-2 border-gray-200 bg-white py-8 px-6 text-center transition-colors duration-200 hover:border-stanford-red"
          >
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-transparent group-hover:border-stanford-red transition-colors duration-200"
            />
            <h3 className="text-[20px] font-semibold text-text-primary mb-1">
              {member.name}
            </h3>
            <p className="text-[14px] font-semibold text-stanford-red uppercase tracking-wide">
              {member.role}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}
