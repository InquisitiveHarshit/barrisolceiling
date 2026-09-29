export const metadata = {
  title: "Blog & Insights | Borocelling",
  description: "Read the latest news and insights on premium stretch ceilings.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
