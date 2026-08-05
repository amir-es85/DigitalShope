// components/BannerSlider.jsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import {MonitorSmartphone} from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";


const banners = [
  "https://st4.depositphotos.com/1484771/37835/i/1600/depositphotos_378355986-stock-photo-modern-header-hero-image-banner.jpg",
  "https://cbx-prod.b-cdn.net/COLOURBOX39692062.jpg?height=800&quality=70&width=800",
  "https://images.openai.com/static-rsc-1/z5bLkZVVgnRgsarCW8TtqCx4GJYv4SsvOtZvNdZZ24hKAO8APw088Qsh2tkNbGAa3UlXAVUZzIRupiJWijj0ketmDH9lcDzkgPTOLRF_sWsQFy2Wz1UoK6pzMb8P1rkb8hf51WFAnMzjo0kXt463Ig",
  // ... عکس‌های دیگر
];

export default function Banner() {
  return (
    <div className="w-full h-[82vh] flex items-center justify-center flex-col">
  <div className="w-full max-w-[1300px] px-4">
    <Carousel className="relative">
      <CarouselContent>
        {banners.map((src, idx) => (
          <CarouselItem key={idx}>
            <div className="relative w-full h-[28vh] md:h-[50vh] overflow-hidden rounded-2xl">
              <Image
                src={src}
                alt={`banner-${idx}`}
                fill
                className="object-contain md:object-cover"
                unoptimized
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-md rounded-full w-10 h-10 z-20" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-md rounded-full w-10 h-10 z-20" />
    </Carousel>
  </div>
  <div className="flex flex-col justify-center items-center mt-0 md:mt-6">
    <span>Welcome to</span>
    <div className="flex items-center gap-1.5">
        <MonitorSmartphone />
        <h1 className="font-bold text-2xl text-primary/95">Digital Shope</h1>
    </div>
    <Button asChild className="mt-5"><Link href="/products">Go to product</Link></Button>
  </div>
</div>

  );
}
