import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
export const Route = createFileRoute("/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-16">
          <p className="uppercase tracking-[0.25em] text-sm text-[var(--text-muted)] mb-4">
            Contact
          </p>

          <h1 className="text-5xl md:text-7xl leading-tight mb-6">
            Let&apos;s Work
            <br />
            Together
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-main)]/80">
            Whether you have a project idea, collaboration opportunity, or just
            want to connect, feel free to send a message.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Section */}
          <div className="space-y-8">
            <div
              className="rounded-3xl p-8 border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow)",
              }}
            >
              <h2 className="text-3xl mb-6">Contact Info</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-sm mb-1 text-[var(--text-muted)]">Email</p>

                  <p className="text-lg font-medium">hello@example.com</p>
                </div>

                <div>
                  <p className="text-sm mb-1 text-[var(--text-muted)]">Phone</p>

                  <p className="text-lg font-medium">+91 9876543210</p>
                </div>

                <div>
                  <p className="text-sm mb-1 text-[var(--text-muted)]">
                    Location
                  </p>

                  <p className="text-lg font-medium">West Bengal, India</p>
                </div>
              </div>
            </div>

            <div
              className="rounded-3xl p-8 border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow)",
              }}
            >
              <h2 className="text-3xl mb-4">Availability</h2>

              <p className="leading-relaxed text-[var(--text-main)]/80">
                Currently open for freelance work, frontend development, UI
                design, and creative tech collaborations.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div
            className="rounded-3xl p-8 border"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow)",
            }}
          >
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-sm text-[var(--text-muted)]">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-4 rounded-2xl border outline-none transition"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderColor: "var(--border)",
                  }}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-[var(--text-muted)]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-4 rounded-2xl border outline-none transition"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderColor: "var(--border)",
                  }}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-[var(--text-muted)]">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Project Discussion"
                  className="w-full px-4 py-4 rounded-2xl border outline-none transition"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderColor: "var(--border)",
                  }}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-[var(--text-muted)]">
                  Message
                </label>

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full px-4 py-4 rounded-2xl border outline-none resize-none transition"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.4)",
                    borderColor: "var(--border)",
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.01]"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#ffffff",
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
