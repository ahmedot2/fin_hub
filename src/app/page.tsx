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

export default function Home() {
  const categories = getCategories();

  const categoryGrid = [
    { id: 'stocks', className: 'md:col-span-2' },
    { id: 'crypto', className: '' },
    { id: 'investing', className: '' },
    { id: 'pe-vc', className: 'md:col-span-2' },
    { id: 'fintech', className: 'md:col-span-2' },
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
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <div className="p-2 bg-primary rounded-lg">
            <Flame className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="ml-3 text-2xl font-bold">FINHUB</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/directory" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Directory
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            FAQ
          </Link>
          <Button asChild variant="secondary">
            <Link href="/submit">
              Add Resource
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center text-center">
          <video
            src="/hero-background.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="relative z-20 container px-4 md:px-6 text-white space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl">
              Navigate the World of Finance
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-white/80 md:text-xl text-balance">
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
        
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-[80%] px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Our Categories</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-balance">
                Discover resources across stocks, crypto, investing, and more.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categoryGrid.map(({ id, className }) => {
                const category = categories.find((c) => c.id === id);
                if (!category) return null;
                return (
                  <Link
                    href={`/directory?category=${category.id}`}
                    key={category.id}
                    className={cn(
                      "group relative flex min-h-[320px] w-full flex-col justify-end overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                      className
                    )}
                  >
                    <Image
                      src={category.image.url}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={category.image.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <div className="relative z-20 text-white">
                      <category.icon className="mb-3 h-8 w-8" />
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                      <p className="mt-1 max-w-xs text-sm text-white/80 text-balance">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-16 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl text-balance">
                Find answers to common questions about FINHUB.
              </p>
            </div>
            <div className="mt-12">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem value={`item-${index + 1}`} key={index}>
                    <AccordionTrigger className="text-lg font-medium text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground text-left">
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
