import { cn } from "@/lib";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Dialog,
  DialogContent,
  DialogTitle,
  type CarouselApi,
} from "@/ui/react";
import { PlayIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDotButton, DotButton } from "./carousel-dot-button";

export const ThumbnailCarousel = ({
  media,
  className,
}: {
  media: { src: string; alt?: string; isVideo?: boolean }[];
  className?: string;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalApi, setModalApi] = useState<CarouselApi>();
  const [modalSelectedIndex, setModalSelectedIndex] = useState(0);

  const {
    selectedIndex: modalCurrentIndex,
    scrollSnaps: modalScrollSnaps,
    onDotButtonClick: onModalDotButtonClick,
  } = useDotButton(modalApi);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!api || !thumbApi) return;
      api.scrollTo(index);
    },
    [api, thumbApi]
  );

  const onSelect = useCallback(() => {
    if (!api || !thumbApi) return;
    setSelectedIndex(api.selectedScrollSnap());
    thumbApi.scrollTo(api.selectedScrollSnap());
  }, [api, thumbApi]);

  useEffect(() => {
    if (!api) return;
    onSelect();

    api.on("select", onSelect).on("reInit", onSelect);
  }, [api, onSelect]);

  const onMainCarouselItemClick = useCallback((index: number) => {
    setIsModalOpen(true);
    setModalSelectedIndex(index);
  }, []);

  useEffect(() => {
    if (modalApi && isModalOpen) {
      modalApi.scrollTo(modalSelectedIndex, true);
    }
  }, [modalApi, isModalOpen, modalSelectedIndex]);

  return (
    <div className={cn("my-4", className)}>
      <Carousel setApi={setApi} className="w-full mb-4">
        <CarouselContent>
          {media.map((item, index) => (
            <CarouselItem key={index}>
              <div
                onClick={() => onMainCarouselItemClick(index)}
                className="cursor-pointer"
              >
                {item.isVideo ? (
                  <video className="w-full h-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-cover">
                    <source src={item.src} type={"video/mp4"} />
                  </video>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt!}
                    className="w-full h-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-cover"
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      <Carousel
        setApi={setThumbApi}
        className="w-full"
        opts={{
          dragFree: true,
          containScroll: "keepSnaps",
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {media.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5"
            >
              <div
                className={cn(
                  "p-1 aspect-square rounded-md relative cursor-pointer after:block after:absolute after:inset-0 hover:after:bg-black/20 after:transition-colors",
                  selectedIndex === index && "border-2 border-primary",
                  item.isVideo && "after:bg-black/40 after:z-0"
                )}
                onClick={() => onThumbClick(index)}
              >
                {item.isVideo ? (
                  <>
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                    />
                    <PlayIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white z-[1]" />
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt!}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-7xl lg:w-auto">
          <DialogTitle className="visually-hidden">
            {media[modalSelectedIndex].alt}
          </DialogTitle>
          <Carousel setApi={setModalApi} className="mb-4">
            <CarouselContent>
              {media.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-center"
                >
                  {item.isVideo ? (
                    <video
                      controls
                      playsInline
                      className="w-auto h-auto object-contain max-w-full max-h-[80vh]"
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt!}
                      className="w-auto h-auto object-contain max-w-full max-h-[80vh]"
                    />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex items-center justify-center gap-2">
              {modalScrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onModalDotButtonClick(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    modalCurrentIndex === index
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  )}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
