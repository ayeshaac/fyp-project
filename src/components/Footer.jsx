import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="vc-footer">
      <div className="vc-container">
        {/* Top Grid */}
        <div className="vc-grid">
          {/* Brand / About */}
          <div className="vc-col">
            <div className="vc-brand">vetocare</div>
            <p className="vc-about">
              Vetocare par apne pet ke liye best vets, clinics, grooming aur
              diagnostics asani se find karein. Appointments book karein,
              online consultation lein aur services compare karein — fast &
              reliable.
            </p>

            <div className="vc-linksTitle">Company</div>
            <ul className="vc-links">
              <li><a href="/about">About Vetocare</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/terms">Terms of Use</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/refund">Refund Policy</a></li>
            </ul>
          </div>

          {/* Cities / Coverage */}
          <div className="vc-col">
            <div className="vc-linksTitle">Service Cities</div>
            <ul className="vc-links">
              <li><a href="/cities/karachi">Karachi</a></li>
              <li><a href="/cities/lahore">Lahore</a></li>
              <li><a href="/cities/islamabad">Islamabad</a></li>
              <li><a href="/cities/rawalpindi">Rawalpindi</a></li>
              <li><a href="/cities/faisalabad">Faisalabad</a></li>
              <li><a href="/cities/multan">Multan</a></li>
              <li><a href="/cities/peshawar">Peshawar</a></li>
              <li><a href="/cities/quetta">Quetta</a></li>
            </ul>

            <div className="vc-linksTitle vc-mt">Popular Services</div>
            <ul className="vc-links">
              <li><a href="/services/online-vet">Online Vet Consultation</a></li>
              <li><a href="/services/vaccination">Vaccination</a></li>
              <li><a href="/services/grooming">Grooming</a></li>
              <li><a href="/services/pet-pharmacy">Pet Pharmacy</a></li>
              <li><a href="/services/lab-tests">Lab Tests</a></li>
            </ul>
          </div>

          {/* Clinics / Partners */}
          <div className="vc-col">
            <div className="vc-linksTitle">Top Clinics & Hospitals</div>
            <ul className="vc-links">
              <li><a href="/clinics">Find Clinics Near You</a></li>
              <li><a href="/hospitals">24/7 Pet Hospitals</a></li>
              <li><a href="/emergency">Emergency Care</a></li>
              <li><a href="/specialists">Pet Specialists</a></li>
              <li><a href="/groomers">Groomers</a></li>
            </ul>

            <div className="vc-linksTitle vc-mt">For Professionals</div>
            <ul className="vc-links">
              <li><a href="/for-vets">For Vets</a></li>
              <li><a href="/list-your-clinic">List Your Clinic</a></li>
              <li><a href="/partner">Partner with Vetocare</a></li>
              <li><a href="/support">Help & Support</a></li>
            </ul>
          </div>

          {/* App / More */}
          <div className="vc-col">
            <div className="vc-linksTitle">Diagnostics</div>
            <ul className="vc-links">
              <li><a href="/diagnostics/blood-test">Blood Test</a></li>
              <li><a href="/diagnostics/xray">X-Ray</a></li>
              <li><a href="/diagnostics/ultrasound">Ultrasound</a></li>
              <li><a href="/diagnostics/stool-test">Stool Test</a></li>
            </ul>

            <div className="vc-linksTitle vc-mt">More</div>
            <ul className="vc-links">
              <li><a href="/blog">Health Blog</a></li>
              <li><a href="/faq">FAQs</a></li>
              <li><a href="/community">Community</a></li>
              <li><a href="/pet-guides">Pet Guides</a></li>
            </ul>

            <div className="vc-linksTitle vc-mt">Get the Vetocare App</div>
            <div className="vc-appBtns">
              <a className="vc-appBtn" href="#" aria-label="Download on App Store">
                Download on the <b>App Store</b>
              </a>
              <a className="vc-appBtn" href="#" aria-label="Get it on Google Play">
                GET IT ON <b>Google Play</b>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Trust Row */}
        <div className="vc-bottom">
          <div className="vc-badges">
            <div className="vc-badge">
              <span className="vc-dot" />
              <div>
                <div className="vc-badgeTitle">Verified Vets</div>
                <div className="vc-badgeText">Authentic & updated profiles</div>
              </div>
            </div>

            <div className="vc-badge">
              <span className="vc-dot" />
              <div>
                <div className="vc-badgeTitle">Reliable Support</div>
                <div className="vc-badgeText">7 days a week</div>
              </div>
            </div>

            <div className="vc-badge">
              <span className="vc-dot" />
              <div>
                <div className="vc-badgeTitle">Secure Payments</div>
                <div className="vc-badgeText">SSL protected checkout</div>
              </div>
            </div>
          </div>

          <div className="vc-copy">
            © {new Date().getFullYear()} Vetocare. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
