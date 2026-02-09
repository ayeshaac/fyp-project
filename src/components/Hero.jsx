import "../styles/Hero.css";
import doctorImg from "../assets/doctor.png";
import SearchBox from "./SearchBox";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>
          Find the <span>Best Veterinary Doctors</span> Near You
        </h1>
        <p>Trusted care for your pets 🐶🐱</p>
        <SearchBox />
      </div>

      <div className="hero-img">
        <img src={doctorImg} alt="Dr Ahmed Vet" />
      </div>
    </section>
  );
}

export default Hero;
