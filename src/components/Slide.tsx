import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles } from 'lucide-react';

interface SlideProps {
  index: number;
  imageUrl?: string;
  heading: string;
  content: string;
  bgColor: string;
  textColor: string;
  sticker?: string;
  isIntro?: boolean;
  isClosing?: boolean;
  layout?:
    | 'split'
    | 'grid'
    | 'focal'
    | 'asymmetric'
    | 'fullscreen'
    | 'minimal'
    | 'radial'
    | 'zigzag';
  images?: string[];
}

const Slide: React.FC<SlideProps> = ({
  index,
  imageUrl,
  heading,
  content,
  bgColor,
  textColor,
  sticker,
  isIntro,
  isClosing,
  layout = 'fullscreen',
  images = [],
}) => {
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          } else {
            entry.target.classList.remove('animate-fade-in');
          }
        });
      },
      { threshold: 0.4 }
    );

    if (slideRef.current) {
      observer.observe(slideRef.current);
    }

    return () => {
      if (slideRef.current) {
        observer.unobserve(slideRef.current);
      }
    };
  }, []);

  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stickerVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  const renderLayout = () => {
    if (isIntro || isClosing) {
      return renderSpecialSlide();
    }

    switch (layout) {
      case 'split':
        return (
          <motion.div
            className="flex flex-col w-full h-full md:flex-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideVariants}
          >
            <div className="relative w-full h-full md:w-1/2">
              {imageUrl && (
                <motion.img
                  src={imageUrl}
                  alt=""
                  className="object-cover w-full h-full"
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                />
              )}
            </div>
            <div className="flex justify-center items-center p-8 w-full md:w-1/2 md:p-12">
              <div className="max-w-lg">
                <h2
                  className={`mb-6 font-serif text-3xl font-bold md:text-5xl ${textColor}`}
                >
                  {heading}
                </h2>
                <p className={`text-lg md:text-xl ${textColor}`}>{content}</p>
              </div>
            </div>
          </motion.div>
        );

      case 'grid':
        return (
          <motion.div
            className="grid grid-cols-1 gap-8 p-8 h-full md:grid-cols-2 md:p-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideVariants}
          >
            {images && images.length > 0 ? (
              images.map((img, i) => (
                <motion.div
                  key={i}
                  className="overflow-hidden relative rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={img}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              ))
            ) : (
              <div className="text-center md:col-span-2">
                <h2
                  className={`mb-6 font-serif text-3xl font-bold md:text-5xl ${textColor}`}
                >
                  {heading}
                </h2>
                <p className={`text-lg md:text-xl ${textColor}`}>{content}</p>
              </div>
            )}
          </motion.div>
        );

      case 'focal':
        return (
          <motion.div
            className="flex relative justify-center items-center h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideVariants}
          >
            {imageUrl && (
              <div className="absolute inset-0">
                <motion.img
                  src={imageUrl}
                  alt=""
                  className="object-cover w-full h-full opacity-50"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  viewport={{ once: true }}
                />
              </div>
            )}
            <div className="relative z-10 p-8 mx-auto max-w-2xl text-center">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h2
                  className={`mb-6 font-serif text-4xl font-bold md:text-6xl ${textColor}`}
                >
                  {heading}
                </h2>
                <p className={`text-xl md:text-2xl ${textColor}`}>{content}</p>
              </motion.div>
            </div>
          </motion.div>
        );

      case 'minimal':
        return (
          <motion.div
            className="flex justify-center items-center p-8 h-full md:p-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideVariants}
          >
            <div className="mx-auto max-w-3xl text-center">
              <motion.h2
                className={`mb-8 font-serif text-4xl font-bold md:text-7xl ${textColor}`}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                {heading}
              </motion.h2>
              <motion.p
                className={`text-xl md:text-2xl ${textColor}`}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                {content}
              </motion.p>
            </div>
          </motion.div>
        );

      default:
        // Default layout if none specified
        return (
          <motion.div
            className="flex justify-center items-center p-8 h-full md:p-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideVariants}
          >
            <div className="mx-auto max-w-3xl text-center">
              <motion.h2
                className={`mb-8 font-serif text-4xl font-bold md:text-7xl ${textColor}`}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                {heading}
              </motion.h2>
              <motion.p
                className={`text-xl md:text-2xl ${textColor}`}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                {content}
              </motion.p>
            </div>
          </motion.div>
        );
    }
  };

  const renderSpecialSlide = () => {
    if (isIntro) {
      return (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="relative px-6 mx-auto w-full max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12 text-center"
          >
            <Heart className="mx-auto mb-6 w-16 h-16 text-pink-500" />
            <h2
              className={`mb-8 font-serif text-5xl font-bold md:text-7xl ${textColor}`}
            >
              {heading}
            </h2>
            <p
              className={`mx-auto max-w-2xl text-xl font-light leading-relaxed md:text-2xl ${textColor}`}
            >
              {content}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-12 left-1/2 text-center transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Stars className="mb-4 w-8 h-8 text-pink-500" />
            </motion.div>
            <p className={`text-lg font-medium ${textColor}`}>
              Scroll to begin the journey
            </p>
          </motion.div>
        </motion.div>
      );
    }

    if (isClosing) {
      return (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="px-6 mx-auto w-full max-w-4xl text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Sparkles className="mx-auto mb-6 w-16 h-16 text-pink-500" />
            <h2
              className={`mb-8 font-serif text-5xl font-bold md:text-7xl ${textColor}`}
            >
              {heading}
            </h2>
            <p
              className={`mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed md:text-2xl ${textColor}`}
            >
              {content}
            </p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
              className="inline-block"
            >
              <Heart className="w-12 h-12 text-pink-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      );
    }

    return null;
  };

  return (
    <div
      ref={slideRef}
      data-index={index}
      className={`overflow-hidden relative w-full h-screen opacity-0 transition-opacity duration-1000 slide snap-start ${bgColor}`}
    >
      {renderLayout()}
      {sticker && (
        <motion.img
          src={sticker}
          alt="Decorative sticker"
          className="object-cover absolute top-4 right-4 z-50 w-24 h-24 rounded-full shadow-xl"
          variants={stickerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
      )}
    </div>
  );
};

export default Slide;
