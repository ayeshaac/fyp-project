import "../styles/NewsSection.css";

const newsData = [
  {
    title: "propakistani",
    desc: "Mobilink Bank partners with oladoc, bringing premium healthcare to customers’ doorstep.",
  },
  {
    title: "THE NATION",
    desc: "SIMOSA has partnered with oladoc to provide healthcare content to SIMOSA users and enhance their digital experience.",
  },
  {
    title: "IR",
    desc: "Jubilee Life partners to bring healthcare benefits for customers through digital experience and app.",
  },
];

const NewsSection = () => {
  return (
    <section className="news-section">
      <h2 className="news-heading">As seen in news</h2>

      <div className="news-grid">
        {newsData.map((item, index) => (
          <div className="news-card" key={index}>
            <h3 className="news-title">{item.title}</h3>
            <p className="news-desc">{item.desc}</p>
            <span className="news-link">READ MORE</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
