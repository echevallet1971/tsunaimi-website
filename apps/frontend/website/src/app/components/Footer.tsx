import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center md:justify-start">
          <div className="flex flex-col items-center md:items-start justify-center">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-brand-primary text-base text-center md:text-left">
              The project that led to Ask My Envoy.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-brand-primary-light text-center text-brand-primary">
          <p>&copy; {new Date().getFullYear()} TsunAImi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
