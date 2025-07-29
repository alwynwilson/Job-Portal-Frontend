import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Header/>
      <section className="bg-indigo-50 min-h-[90vh] flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6">
          Find Your Dream Job Today
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          Discover job opportunities that match your skills, passion, and career goals.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Link to="/jobs">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm md:text-base hover:bg-indigo-700 transition">
              Browse Jobs
            </button>
          </Link>
          <Link to="/register">
            <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg text-sm md:text-base hover:bg-indigo-600 hover:text-white transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
      <Footer/>
    </div>
  )
}

export default Home
