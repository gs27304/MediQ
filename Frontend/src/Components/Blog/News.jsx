import React, { useState, useEffect, useRef } from 'react';
import Newsitem from './Newsitem';
import InfiniteScroll from "react-infinite-scroll-component";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import { BASE_URL } from '../../config';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const scrollContainerRef = useRef(null);

    const fetchNews = async () => {
        const url = `${BASE_URL}/news/get`;
        const response = await fetch(url);
        const result = await response.json();
        const data = result.data;
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        setTotalResults(data.totalResults);
    };

    useEffect(() => {
        fetchNews();
    }, []);  

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
        fetchNews(page + 1);
    };

    const scroll = (offset) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: offset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="bg-[#0b1120] py-12 px-4 lg:px-20 overflow-hidden">
            <div className="container mx-auto relative">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
                            <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em]">Live Updates</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
                            Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Frontiers</span>
                        </h2>
                        <p className="text-gray-400 mt-2 max-w-xl">
                            Stay informed with real-time global breakthroughs in medical technology, AI diagnostics, and healthcare innovation.
                        </p>
                    </div>

                    {/* Custom Glassmorphism Navigation Controls */}
                    <div className="flex gap-3">
                        <button 
                            onClick={() => scroll(-450)}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all shadow-xl backdrop-blur-sm"
                        >
                            <FaChevronLeft size={18} />
                        </button>
                        <button 
                            onClick={() => scroll(450)}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all shadow-xl backdrop-blur-sm"
                        >
                            <FaChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Infinite Scroll Container */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<h4 className="text-cyan-500 text-center py-10">Syncing Data...</h4>}
                    style={{ overflow: 'visible' }} 
                >
                    <div 
                        className="flex gap-6 pb-10 hide-scrollbar" 
                        style={{ 
                            overflowX: 'auto', 
                            scrollSnapType: 'x mandatory',
                            scrollbarWidth: 'none', 
                            msOverflowStyle: 'none'
                        }}
                        ref={scrollContainerRef}
                    >
                        {articles.map((article, index) => (
                            <div 
                                className="flex-shrink-0 scroll-snap-align-start group" 
                                key={`${article.url}-${index}`}
                                style={{ width: '380px' }}
                            >
                                <div className="h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                                    <Newsitem 
                                        title={article.title || "Untitled Research"} 
                                        description={article.description || "No summary available for this insight."} 
                                        imageUrl={article.urlToImage} 
                                        newsUrl={article.url} 
                                        author={article.author} 
                                        date={article.publishedAt} 
                                        source={article.source.name} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>

            {/* Custom CSS for hiding scrollbars while keeping functionality */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default News;