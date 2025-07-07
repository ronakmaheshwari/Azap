export default function Center({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${className}`}>
      {children}
    </div>
  );
}
