import Logo from './Logo';

export default function Header() {
  return (
    <nav className="bg-white backdrop-blur-sm shadow-lg fixed w-full z-[997] border-b border-tsunaimi-gray-light">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Logo />
        </div>
      </div>
    </nav>
  );
}
