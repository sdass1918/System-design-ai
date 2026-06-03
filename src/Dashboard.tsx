import { Link, useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  type Course = {
    title: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    desc: string;
  };
  
  const courses: Course[] = [
    {
      title: "Design a URL Shortener",
      level: "Beginner",
      desc: "Hashing, redirects, and basic storage.",
    },
    {
      title: "Design Pastebin",
      level: "Beginner",
      desc: "Text storage with expiry and sharing.",
    },
    {
      title: "Design Twitter",
      level: "Intermediate",
      desc: "Timelines, fan-out, and feed ranking.",
    },
    {
      title: "Design Instagram",
      level: "Intermediate",
      desc: "Media uploads, feeds, and storage tiers.",
    },
    {
      title: "Design WhatsApp",
      level: "Advanced",
      desc: "Realtime messaging, presence, end-to-end delivery.",
    },
    {
      title: "Design YouTube",
      level: "Advanced",
      desc: "Video pipelines, CDNs, and recommendations.",
    },
  ];

  const levels: Course["level"][] = ["Beginner", "Intermediate", "Advanced"];

  const handleClick = () => {
    navigate("/course")
  }
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-foreground/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-sm font-medium tracking-tight">System Design</h1>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Log out
          </Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium">Courses</h2>
          <p className="text-sm text-muted-foreground">
            Pick a topic by level and start learning.
          </p>
        </div>

        {levels.map((level) => (
          <div key={level} className="space-y-4">
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground">
              {level}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {courses
                .filter((c) => c.level === level)
                .map((c) => (
                  <article
                    key={c.title}
                    className="border border-foreground/10 rounded-md p-5 hover:border-foreground/30 transition-colors cursor-pointer"
                    onClick={handleClick}
                  >
                    <h4 className="font-medium">{c.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {c.desc}
                    </p>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
