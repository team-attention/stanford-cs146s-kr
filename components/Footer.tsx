'use client';

export function Footer() {
  return (
    <footer className="bg-[#2C3E50] py-6 mt-auto">
      <div className="max-w-[1024px] mx-auto px-8 text-center text-white/80 text-[14px]">
        <p className="mb-1">CS146S: The Modern Software Developer - Korean Edition</p>
        <p>
          Based on{' '}
          <a
            href="https://themodernsoftware.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stanford-red hover:underline"
          >
            Stanford University CS146S
          </a>
          . This is an unofficial Korean translation.
        </p>
      </div>
    </footer>
  );
}
