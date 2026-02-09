import React from "react";
import "../styles/vetocare-hero.css";

import googlePlayIcon from "../assets/google play.png";
import googlePlayBadge from "../assets/app-store-badge..png";
import appStoreIcon from "../assets/app-store.png";


export default function VetocareDownloadHero() {
  return (
    <section className="vc-hero">
      <div className="vc-hero__container">
        {/* LEFT */}
        <div className="vc-hero__left">
          <h1 className="vc-hero__title">
            Download the <span className="vc-hero__brand">Vetocare</span>  <span className="vc-hero-app">App</span>
           
          </h1>

          <p className="vc-hero__subtitle">
            Download Vetocare app today and avail exclusive veterinary care discounts.
          </p>

          <div className="vc-hero__stores">
            <a className="vc-store" href="#">
              <img src={googlePlayIcon} alt="Google Play" />
            </a>

            <a className="vc-store" href="#">
              <img src={appStoreIcon} alt="App Store" />
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="vc-hero__right">
          <div className="vc-shape vc-shape--circle" />
          <div className="vc-shape vc-shape--triangle" />

          {/* FLOATING PHONE */}
          <div className="vc-phone vc-phone--floating">
            <img
              src={googlePlayBadge}
              alt="Vetocare app preview"
              className="vc-phone__img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
