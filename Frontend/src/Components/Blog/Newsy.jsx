import React, { useState, useEffect } from 'react';
import Newsitem from './Newsitem';
import InfiniteScroll from "react-infinite-scroll-component";
import { BASE_URL } from '../../config';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const fetchNews = async (page = 1) => {
        const url = `${BASE_URL}/news/get?page=${page}`;
        
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
        const nextPage = page + 1;
        setPage(nextPage);
        fetchNews(nextPage);
    };

    return (
        <section className="bg-[#0b1120] min-h-screen py-12 px-4 transition-colors duration-500">
            {/* Header Content Section */}
            <div className="container mx-auto mb-16 text-center">
                <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Medical Intelligence</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                    Digital Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ledger</span>
                </h1>

                <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
                    <p className="text-gray-300 font-serif italic text-lg lg:text-xl leading-relaxed">
                        "The doctor of the future will give no medicine, but will instruct his patients in care of the human frame, 
                        in diet, and in the cause and prevention of disease."
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <div className="h-[1px] w-8 bg-cyan-500"></div>
                        <span className="text-cyan-400 font-bold uppercase text-xs tracking-widest">Thomas Edison</span>
                        <div className="h-[1px] w-8 bg-cyan-500"></div>
                    </div>
                </div>
            </div>

            {/* Infinite Scroll Interface */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={
                    <div className="flex justify-center py-10">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                            <span className="text-cyan-400 text-sm font-medium ml-2">Syncing Reports...</span>
                        </div>
                    </div>
                }
            >
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article, index) => (
                            <div 
                                key={`${article.url}-${index}`}
                                className="transform transition-all duration-300 hover:-translate-y-2"
                            >
                                <Newsitem
                                    title={article.title || "Intelligence Report Pending"} 
                                    description={article.description || "Detailed analysis for this medical breakthrough is being compiled by our clinical team."} 
                                    imageUrl={article.urlToImage} 
                                    newsUrl={article.url} 
                                    author={article.author} 
                                    date={article.publishedAt} 
                                    source={article.source.name} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </section>
    );
};

export default News;