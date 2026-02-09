import React from "react";
import "./VetExploreCategories.css";

const categories = [
  "Pet Nutrition",
  "Pet Vaccination",
  "Dog Health",
  "Cat Health",
  "Animal Diseases",
  "Skin Problems",
  "Animal First Aid",
  "Pet Care Tips",
  "Livestock Health",
  "Poultry Care",
  "Parasite Control",
  "Pet Surgery",
  "Dental Care",
  "Emergency Care",
  "Healthy Lifestyle"
];

const VetExploreCategories = () => {
  return (
    <section className="vet-explore">
      <div className="vet-overlay">
        <div className="vet-content">
          <h2>
            Explore <span>→</span>
          </h2>

          <div className="vet-tags">
            {categories.map((item, index) => (
              <a
                key={index}
                href={`/blog/category/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="vet-tag"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VetExploreCategories;
