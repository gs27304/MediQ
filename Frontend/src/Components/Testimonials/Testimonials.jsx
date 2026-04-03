import React from "react";
import Slider from "react-slick";
import { HiStar } from "react-icons/hi";

// Updated Data: Indian Doctors & Specialists
const testimonials = [
  {
    name: "Dr. Ananya Sharma",
    title: "Senior AI Oncologist, AIIMS",
    image: "/img/image Dr. Floyd Miles.png", 
    text: "MediQ is a game-changer for Indian healthcare. The MRI AI assistance allows us to process scans with 40% more efficiency, which is vital given the patient load we handle daily. It’s the digital backbone we’ve been waiting for.",
  },
  {
    name: "Dr. Rajesh Iyer",
    title: "Chief of Cardiology, Apollo",
    image: "/img/author1.png",
    text: "The 'Specialist Hub' makes remote consultations feel incredibly personal. I can now reach patients in Tier-2 and Tier-3 cities with full access to their digital medical ledger, ensuring continuity of care regardless of distance.",
  },
  {
    name: "Dr. Vikram Malhotra",
    title: "Neurology Research Fellow",
    image: "/img/author2.png",
    text: "As a researcher, the data integrity within MediQ is impressive. The seamless integration of Stripe for secure ticket payments and Cloudinary for report storage makes the entire clinical workflow foolproof.",
  },
  {
    name: "Dr. Sunita Reddy",
    title: "Telemedicine Consultant",
    image: "/img/author3.png",
    text: "Managing a busy practice in Bangalore requires tools that are as fast as the city. MediQ's sync capabilities and the neural chatbot for preliminary screening have significantly reduced our administrative friction."
  },
];

const TestimonialComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-[#0b1120] py-20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em]">Indian Specialist Registry</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
            Specialist <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Insights</span>
          </h2>
        </div>

        <div className="mt-12 max-w-screen-xl mx-auto overflow-visible relative">
          <style jsx global>{`
            .slick-dots li button:before { color: #22d3ee !important; }
            .slick-dots li.slick-active button:before { color: #22d3ee !important; opacity: 1; }
          `}</style>

          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4 pb-10 h-full">
                <div className="group relative p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md transition-all duration-500 hover:border-cyan-500/40 hover:bg-white/10 hover:-translate-y-2 h-[420px] flex flex-col justify-between">
                  
                  <div className="absolute top-6 right-8 text-6xl text-cyan-500 opacity-10 pointer-events-none group-hover:opacity-30 transition-opacity">
                    ”
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <HiStar key={i} className="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                      ))}
                    </div>

                    <blockquote className="text-gray-300 text-sm lg:text-base italic leading-relaxed mb-6">
                      “{testimonial.text}”
                    </blockquote>
                  </div>

                  <div className="flex items-center pt-6 border-t border-white/5">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-cyan-500/30 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="w-14 h-14 rounded-full border-2 border-white/10 group-hover:border-cyan-400 overflow-hidden">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-white font-bold tracking-wide group-hover:text-cyan-400 transition-colors">
                        {testimonial.name}
                      </p>
                      <p className="text-cyan-500/60 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialComponent;