import React, { useState } from "react";
import Features from "./Features";
import CallToAction from "./CallToAction";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="overflow-hidden pb-24">
      <div className="hidden navbar-menu fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80" />
      </div>
      <div className="container px-4 mx-auto relative">
        <div className="relative z-20">
          <h1 className="text-center text-5xl lg:text-7xl font-bold font-heading mb-6 mt-14 max-w-2xl mx-auto">
            <span>Criar sua comunidade</span>
            <span className="block text-blue-600">é + conhecimento</span>
          </h1>
          <p className="text-center text-lg mb-10 max-w-lg mx-auto">
            Crie conexões, faça networking, compartilhe e ganhe conhecimento, troque experiências e muito mais.
            Independente da área de atuação, a comunidade é o melhor lugar para se conectar com pessoas que compartilham dos mesmos interesses.
          </p>
          <div className="flex justify-center lg:pb-56">
            <Link
              to="/user-register"
              className="w-full sm:w-auto h-16 inline-flex items-center justify-center text-center py-4 px-6 rounded-full bg-blue-600 border border-blue-700 shadow font-bold font-heading text-white hover:bg-blue-800 focus:ring focus:ring-blue-200 transition duration-200"
            >
              Iniciar minha jornada
            </Link>
          </div>
        </div>
      </div>
      <Features />
      <Link
              to="/user-register"
              className="w-full sm:w-auto h-16 inline-flex items-center justify-center text-center py-4 px-6 rounded-full bg-blue-600 border border-blue-700 shadow font-bold font-heading text-white hover:bg-blue-800 focus:ring focus:ring-blue-200 transition duration-200"
            >
              Iniciar minha jornada
      </Link>   
    </section>
  );
};

export default Home;