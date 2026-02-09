import React, { useRef } from "react";
import "../styles/Testimonials.css";

const testimonials = [
  {
    name: "Umer Fayyaz",
    text:
      "Great platform, very efficient and works really well on both phone and web. Booking vet appointments is super easy.",
    avatar:
      "https://images.unsplash.com/photo-1520975958225-39f9fda7f3c5?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Aneeb Ryan",
    text:
      "A very helpful app for booking appointments and finding the right vets. It has made my life a lot easier.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Zainab Tariq",
    text:
      "Literally the best website to book vet appointments online. Support team is very cooperative.",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Hassan Ali",
    text:
      "Booking vaccinations for my cat has never been this easy. Highly recommended for pet parents.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60",
  },
];

export default function Testimonials() {
  const trackRef = useRef(null);

  const scrollCards = (direction) => {
    const cardWidth = 350;
    trackRef.current.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2>Our Customers love us</h2>
        <p>Check out the reviews from our satisfied customers</p>
      </div>

      <div className="testimonials-wrapper">
        {/* LEFT ARROW */}
        <button
          className="arrow-btn arrow-left"
          onClick={() => scrollCards(-1)}
        >
          ‹
        </button>

        {/* CARDS */}
        <div className="testimonials-track" ref={trackRef}>
          {testimonials.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="stars">★★★★★</div>

              <p className="testimonial-text">“{item.text}”</p>

              <div className="testimonial-user">
                <div className="avatar-ring">
                  <img src={item.avatar} alt={item.name} />
                </div>
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          className="arrow-btn arrow-right"
          onClick={() => scrollCards(1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}
