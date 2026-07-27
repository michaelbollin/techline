export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-[100dvh] overflow-hidden bg-white">{children}</div>;
}
