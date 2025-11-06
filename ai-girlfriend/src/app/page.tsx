import ChatExperience from "@/components/chat-experience";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center px-4 py-16 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-12 mx-auto h-64 w-[min(90vw,720px)] rounded-[40px] bg-gradient-to-br from-fuchsia-400/20 via-sky-400/10 to-emerald-300/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-y-0 left-4 hidden w-48 rounded-full bg-gradient-to-b from-purple-500/10 via-transparent to-sky-400/10 blur-3xl lg:block" />
      <main className="relative w-full max-w-6xl">
        <ChatExperience />
      </main>
    </div>
  );
}
