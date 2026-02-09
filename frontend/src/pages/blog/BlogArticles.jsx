import React from "react";
import "./BlogArticles.css";

const articles = [
  {
    id: 1,
    title: "Enlarged Prostate Causing Lower Urinary Tract Symptoms",
    desc: "Enlarged prostate also known as BPH is common in aging men...",
    date: "Dec 9, 2025",
    readTime: "2 min read",
    image: "public/blog/vet-1.jpg"
  },
  {
    id: 2,
    title: "Gonadil F Capsule Uses for Male: Complete Guide",
    desc: "Gonadil F is a trusted supplement for men sexual health...",
    date: "Dec 4, 2025",
    readTime: "4 min read",
    image: "public/blog/vet-2.jpg"
  },
  {
    id: 3,
    title: "Amoxil Capsule Uses in Urdu",
    desc: "Amoxil capsule bacterial infections ke liye use hoti hai...",
    date: "Dec 3, 2025",
    readTime: "1 min read",
    image: "public/blog/vet-3.jpg"
  },
  {
    id: 4,
    title: "Pet Vaccination Schedule",
    desc: "Pets ke liye vaccination bohat zaroori hoti hai...",
    date: "Dec 1, 2025",
    readTime: "3 min read",
    image: "public/blog/vet-5.avif"
  
  },
  {
    id: 5,
    title: "Common Animal Diseases",
    desc: "Janwaron mein hone wali common bemaariyan...",
    date: "Nov 29, 2025",
    readTime: "2 min read",
    image: "public/blog/vet-6.webp"
  },
  {
    id: 6,
    title: "Pet Nutrition Guide",
    desc: "Pets ki sehat ke liye balanced diet zaroori hai...",
    date: "Nov 27, 2025",
    readTime: "5 min read",
    image: "public/blog/vet-7.jpg"
    
  },
  {
    id: 7,
    title: "Dog Skin Problems",
    desc: "Dogs mein skin allergy ka masla aam hai...",
    date: "Nov 25, 2025",
    readTime: "3 min read",
    image: "public/blog/vet-8.webp"
    
  },
  {
    id: 8,
    title: "Cat Health Care Tips",
    desc: "Cats ki daily care aur health tips...",
    date: "Nov 23, 2025",
    readTime: "2 min read",
    image: "public/blog/vet-9.jpg"
  },
  {
    id: 9,
    title: "Animal First Aid Guide",
    desc: "Emergency mein animals ke liye first aid...",
    date: "Nov 20, 2025",
    readTime: "4 min read",
    image: "public/blog/vet-10.jpg"
  }
];

const BlogArticles = () => {
  return (
    <div className="blog-container">
      <h2 className="blog-title">All Articles</h2>

      <div className="blog-grid">
        {articles.map((item) => (
          <div className="blog-card" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="blog-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <div className="blog-meta">
                <span>{item.date}</span>
                <span>{item.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogArticles;
