import React, { useState } from "react";

export default function HeroSurgery() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <section className="hero-surgery">
      <div className="hero-surgery__inner">
        {/* Left Content */}
        <div className="hero-surgery__content">
          <h1 className="hero-surgery__title">
            Discounted booking with{" "}
            <span className="accent">Leading</span>{" "}
            <span className="accent2">Surgeons</span>{" "}
            <span className="muted">Anytime, Anywhere</span>
          </h1>

          <form className="hero-surgery__search" onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for surgeries or procedures"
              aria-label="Search for surgeries or procedures"
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {/* Right Image */}
        <div className="hero-surgery__imageWrap" aria-hidden="true">
          <img
            src="/surgery/hero.png"
            alt="Surgery hero"
            className="hero-surgery__image"
          />
        </div>
      </div>

      {/* Inline Styles */}
      <style>{`
        .hero-surgery{
          width: 100%;
          padding: 14px 0;
        }

        .hero-surgery__inner{
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          border-radius: 18px;
          overflow: hidden;
          padding: 28px 80px;      /* height reduced */
          min-height: 180px;       /* compact hero */
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 26px;

          background: linear-gradient(
            90deg,
            #7b4a3f 0%,
            #2f1f5c 55%,
            #0b0f6f 100%
          );
          position: relative;
        }

        .hero-surgery__content{
          flex: 1;
          min-width: 260px;
          z-index: 2;
        }

        .hero-surgery__title{
          margin: 0 0 16px 0;
          font-weight: 700;
          line-height: 1.2;
          color: #eaeaf1;
          font-size: 36px;       /* reduced font size */
          letter-spacing: 0.2px;
        }

        .hero-surgery__title .accent,
        .hero-surgery__title .accent2{
          color: #f59e0b;
        }

        .hero-surgery__title .muted{
          color: #d6d6e6;
          font-weight: 500;
        }

        .hero-surgery__search{
          width: 100%;
          max-width: 480px;
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          align-items: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.18);
        }

        .hero-surgery__search input{
          flex: 1;
          border: 0;
          outline: none;
          padding: 13px 15px;
          font-size: 14px;
          color: #222;
        }

        .hero-surgery__search button{
          border: 0;
          outline: none;
          cursor: pointer;
          padding: 13px 20px;
          font-size: 14px;
          font-weight: 700;
          color: #111;
          background: #f59e0b;
          border-left: 1px solid rgba(0,0,0,0.08);
        }

        .hero-surgery__search button:hover{
          filter: brightness(0.95);
        }

        .hero-surgery__imageWrap{
          width: 260px;
          max-width: 38%;
          display: flex;
          align-items: center;      /* image cut nahi hogi */
          justify-content: flex-end;
          z-index: 2;
            margin-left: -20px;
             padding-right: 50px;  
        }

        .hero-surgery__image{
          width: 100%;
          max-height: 350px;        /* fit inside hero */
          height: auto;
          object-fit: contain;
          
          filter: drop-shadow(0 12px 22px rgba(0,0,0,0.25));
        }

        @media (max-width: 900px){
          .hero-surgery__title{
            font-size: 30px;
          }
          .hero-surgery__imageWrap{
            width: 220px;
          }
        }

        @media (max-width: 700px){
          .hero-surgery__inner{
            flex-direction: column;
            align-items: flex-start;
          }

          .hero-surgery__imageWrap{
            width: 240px;
            max-width: 100%;
            align-self: flex-end;
          }

          .hero-surgery__search{
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
