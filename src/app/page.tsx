import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export default function Home() {
  const categories = getCategories();

  const categoryGrid = [
    { id: 'stocks', className: 'col-span-2 md:col-span-2' },
    { id: 'crypto', className: 'col-span-2 md:col-span-1' },
    { id: 'investing', className: 'col-span-2 md:col-span-1' },
    { id: 'pe-vc', className: 'col-span-2 md:col-span-2' },
    { id: 'fintech', className: 'col-span-2' },
  ];

  const faqItems = [
    {
      question: "What is FINHUB?",
      answer: "FINHUB is a modern, curated directory of financial resources. We provide high-quality, verified links to websites, tools, and communities across stocks, crypto, investing, private equity, and fintech."
    },
    {
      question: "Who is FINHUB for?",
      answer: "FINHUB is for everyone, from beginners looking to learn about personal finance to seasoned investors seeking advanced tools and data sources. Our categorized directory makes it easy to find the resources you need."
    },
    {
      question: "How do you ensure the quality of resources?",
      answer: "Every resource in our directory is reviewed by our team. We use a link health checker to periodically verify that links are active and the content is still relevant, ensuring our directory remains up-to-date and reliable."
    },
    {
      question: "Can I contribute to FINHUB?",
      answer: "Yes! We encourage community contributions to help us grow and improve our directory. You can suggest new resources through our 'Add Resource' page."
    },
     {
      question: "Is FINHUB free to use?",
      answer: "Yes, FINHUB is completely free to use. Our mission is to make financial information and resources accessible to everyone."
    }
  ];

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/95 backdrop-blur-sm fixed top-0 w-full z-50">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Flame className="h-6 w-6 text-primary" />
          <span className="sr-only">FINHUB</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/directory" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Directory
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            FAQ
          </Link>
          <Link href="/submit" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Add Resource
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <video
            src="https://videos.pexels.com/video-files/8068944/8068944-hd_1920_1080_25fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="relative z-20 container px-4 md:px-6 text-center text-primary-foreground space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Navigate the World of Finance
            </h1>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl">
              FINHUB provides a curated directory of the best financial resources, tools, and communities.
            </p>
            <div>
              <Button asChild size="lg">
                <Link href="/directory">
                  Explore Directory
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Our Categories</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover resources across stocks, crypto, investing, and more.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoryGrid.map(({id, className}) => {
                const category = categories.find(c => c.id === id);
                if (!category) return null;
                return (
                  <Link href={`/directory?category=${category.id}`} key={category.id} className={cn("group", className)}>
                    <Card className="relative overflow-hidden rounded-lg h-full transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                       <Image
                        src={category.image.url}
                        alt={category.name}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={category.image.hint}
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                       <div className="p-6 flex flex-col justify-end h-full z-20 relative text-primary-foreground">
                         <category.icon className="w-10 h-10 mb-4 text-primary-foreground/80" />
                         <h3 className="text-2xl font-bold">{category.name}</h3>
                         <p className="text-sm opacity-80">{category.description}</p>
                       </div>
                     </Card>
                   </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Find answers to common questions about FINHUB.
              </p>
            </div>
            <div className="mx-auto max-w-3xl mt-12">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem value={`item-${index + 1}`} key={index}>
                    <AccordionTrigger className="text-lg font-medium">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} FINHUB. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
