import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-CarpeDiemOffWhite font-proxima">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-CarpeDiemGreyDark tracking-tight">
          CARPE <span className="text-CarpeDiemGreen">DIEM</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-CarpeDiemGrey">
          <a href="#" className="hover:text-CarpeDiemGreen transition-colors">Vision</a>
          <a href="#" className="hover:text-CarpeDiemGreen transition-colors">Essentials</a>
          <a href="#" className="hover:text-CarpeDiemGreen transition-colors">Journal</a>
        </div>
        <button className="px-6 py-2 bg-CarpeDiemGreyDark text-CarpeDiemOffWhite text-sm font-semibold rounded-full hover:bg-CarpeDiemSlate transition-all shadow-lg shadow-CarpeDiemGrey/20">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-block px-3 py-1 bg-CarpeDiemBlueLight text-CarpeDiemSlate text-xs font-bold uppercase tracking-widest rounded-md">
            Seize the moment
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-CarpeDiemGreyDark leading-tight">
            Design your <br />
            <span className="text-CarpeDiemGreen italic">Legacy.</span>
          </h1>
          <p className="text-lg text-CarpeDiemMutedBlue max-w-md leading-relaxed">
            Premium tools and curated experiences designed for those who value time as their most precious asset. Elevate every second.
          </p>
          <div className="flex space-x-4">
            <button className="px-8 py-4 bg-CarpeDiemGreen text-CarpeDiemOffWhite font-bold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-CarpeDiemGreen/30">
              Explore Collection
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-CarpeDiemBorder text-CarpeDiemGreyDark font-bold rounded-xl hover:bg-CarpeDiemWhiteSoft transition-all">
              Watch Film
            </button>
          </div>
        </div>
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group">
          <Image
            src="/hero.png"
            alt="Carpe Diem Hero"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-CarpeDiemGreyDark/40 to-transparent"></div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="bg-CarpeDiemWhiteSoft py-24 px-8 border-y border-CarpeDiemBorder">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <div className="text-4xl font-bold text-CarpeDiemGreen">01</div>
            <h3 className="text-xl font-bold text-CarpeDiemGreyDark">Mindful Precision</h3>
            <p className="text-CarpeDiemGrey text-sm leading-relaxed">
              Every detail is engineered with intention, ensuring your tools work as hard as you do.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-4xl font-bold text-CarpeDiemGreen">02</div>
            <h3 className="text-xl font-bold text-CarpeDiemGreyDark">Timeless Aesthetic</h3>
            <p className="text-CarpeDiemGrey text-sm leading-relaxed">
              Design that transcends trends, focusing on the essential elements of luxury and functionality.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-4xl font-bold text-CarpeDiemGreen">03</div>
            <h3 className="text-xl font-bold text-CarpeDiemGreyDark">Daily Mastery</h3>
            <p className="text-CarpeDiemGrey text-sm leading-relaxed">
              Equipping you with the clarity and efficiency needed to conquer your most ambitious goals.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold text-CarpeDiemGreyDark">Ready to make every second count?</h2>
        <p className="text-CarpeDiemMutedBlue text-lg">Join the inner circle of the most intentional minds globally.</p>
        <div className="flex justify-center items-center gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-6 py-4 bg-CarpeDiemWhiteSoft border border-CarpeDiemBorder rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-CarpeDiemGreen/20 transition-all"
          />
          <button className="px-8 py-4 bg-CarpeDiemGreyDark text-CarpeDiemOffWhite font-bold rounded-xl hover:bg-CarpeDiemSlate transition-all">
            Join Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-CarpeDiemBorder text-center text-CarpeDiemGrey text-xs tracking-widest uppercase">
        &copy; 2026 Carpe Diem. All rights reserved.
      </footer>
    </main>
  );
}
