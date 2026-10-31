const sampleStories = [
  '“Praying with others helped me find courage for a new season.” · SAMPLE TESTIMONY',
  '“Learning Scripture one day at a time gave me a fresh start.” · SAMPLE TESTIMONY',
  '“Joining a fellowship made a new city feel like home.” · SAMPLE TESTIMONY',
];

export default function TestimonyRibbon() {
  return <div className="testimony-ribbon" aria-label="Sample testimonies for the website prototype. These are fictional examples"><span className="testimony-ribbon-label">TESTIMONIES <span>✦</span> DEMO STORIES</span><div className="testimony-ribbon-window"><div className="testimony-ribbon-track">{[0, 1].map((copy) => <div className="testimony-ribbon-set" key={copy} aria-hidden={copy === 1}>{sampleStories.map((story) => <span key={story}>{story}<b>✦</b></span>)}</div>)}</div></div></div>;
}
