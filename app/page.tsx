import About from "./components/About";
import { Hero } from "./components/Hero";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Services from "./components/Services";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | TopGrid EcoSolution</title>
        <meta name="description" content="TopGrid EcoSolution provides sustainable solutions for water scarcity, environmental degradation, and sustainable agriculture." />
        <link rel="icon" type="image/png" href="/eco_logo.png" />
      </Head>
      <main>
        <section id="home" aria-label="Home">
          <Hero />
        </section>
        <section id="about" aria-label="About Us">
          <About />
        </section>
        <section id="services" aria-label="Our Services">
          <Services />
        </section>
        <section id="projects" aria-label="Our Projects">
          <Projects />
        </section>
        <section id="contact" aria-label="Contact Us">
          <Contact />
        </section>
      </main>
    </>
  );
}