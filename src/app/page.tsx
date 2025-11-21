import StatsCounter from '@/components/StatsCounter';
import RegistrationForm from '@/components/RegistrationForm';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative w-24 h-24">
              <Image
                src="/logo.png"
                alt="swapWallet Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            swapWallet
          </h1>
          <p className="text-textSecondary text-lg md:text-xl max-w-lg mx-auto">
            Secure crypto wallet management. Join the waitlist for early access.
          </p>
        </div>

        {/* Stats */}
        <StatsCounter />

        {/* Form */}
        <RegistrationForm />
      </div>
    </main>
  );
}
