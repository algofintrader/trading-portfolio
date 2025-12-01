import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
title: "Artem Samundzhyan — Trading Technology",
description:
"Trading technology: execution, risk controls, and pro trader UX. Remote-first, open to relocate to Europe / Netherlands.",
icons: {
icon: [
{ url: "/favicon.ico" },
{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
],
shortcut: ["/favicon.ico"],
apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
},
manifest: "/site.webmanifest",
openGraph: {
title: "Artem Samundzhyan — Trading Technology",
description: "Execution · Risk · Delivery. Remote-first. Open to relocate: Europe / Netherlands.",
images: [{ url: "/og-1200x630.png", width: 1200, height: 630 }],
type: "website",
},
twitter: {
card: "summary_large_image",
title: "Artem Samundzhyan — Trading Technology",
description: "Execution · Risk · Delivery. Remote-first. Open to relocate: EU / NL.",
images: ["/twitter-1200x600.png"],
},
};


export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html lang="en">
<body>{children}</body>
</html>
);
}