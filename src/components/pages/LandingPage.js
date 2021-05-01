import React from "react";
import MetaTags from "react-meta-tags";
import { NavLink } from "react-router-dom";
import variables from "../../styles/variables.module.scss";
import ScrollAnimation from "react-animate-on-scroll";
import LandingPageEntry from "../landingPage/landingPageEntry";
import "animate.css/animate.min.css";
import Divider from "../timeline/divider";
import { animateScroll as scroll, scrollSpy, scroller } from "react-scroll";
import arrow from "../../images/happyChildren.jpg";

const LandingPage = () => {
  const entries = [
    {
      title: (
        <>
          my <br />
          <span style={{ position: "relative", top: "-5px" }}> year</span>
          <br />
          <span style={{ position: "relative", top: "4px" }}>in</span>
          <br />
          <span style={{ position: "relative", top: "-5px" }}>quarantine</span>
        </>
      ),
      content: (
        <>
          <p>
            My Year in Quarantine is a project that helps you document your
            pandemic journey using beautiful interactive timelines. Timelines
            take only minutes to create and can be shared anywhere.
            <br />
            <br />
            Everyone has a story worth telling. Share yours today.
          </p>
          <div>
            <NavLink className="getStarted" to={"/create"}>
              Get started
            </NavLink>
            <button
              className="learnMore"
              onClick={() => {
                scroller.scrollTo("learnMore", {
                  duration: 600,
                  delay: 0,
                  smooth: true,
                  offset: -70,
                });
              }}
            >
              Learn more
            </button>
          </div>
        </>
      ),
    },
    {
      title: <>1. Create</>,
      content: (
        <>
          Transforming your year into an interactive timeline is as easy as
          answering a few simple questions. Our code automatically handles the
          rest.
          <img
            src={arrow}
            alt="arrow"
            style={{ height: "200px", marginTop: "20px" }}
          />
        </>
      ),
    },
    {
      title: <>2. Share</>,
      content: (
        <>
          Share your timeline as a link or download as an image (or several!)
          <br /> <br />
          We offer multiple export options for sharing on your favorite social
          media platforms.
          <img
            src={arrow}
            alt="arrow"
            style={{ height: "200px", marginTop: "20px" }}
          />
        </>
      ),
    },
    {
      title: <>3. Explore</>,
      content: (
        <>
          See how other people around the world spent their year with upcoming
          features like regional search and timeline maps.
          <img
            src={arrow}
            alt="arrow"
            style={{ height: "200px", marginTop: "20px" }}
          />
        </>
      ),
    },
    {
      title: <>But why timelines?</>,
      content: (
        <>
          It’s been a year like no other. We’ve all been stuck inside away from
          our friends and loved ones for longer than we’d like. By documenting
          your journey in a timeline, you help kickstart the reconnection
          process and spark conversation over shared experiences. <br /> <br />
          We share moments on social media all the time, but the ones that make
          us truly human often get left out. Timelines make it easier to
          recapture your authentic self. Who knows? You might find yourself
          discovering things you long forgot in the process. <br /> <br />
          Ready to begin?
          <br />
          <br />
          <br />
          <NavLink className="getStarted" to={"/create"}>
            Get started
          </NavLink>
        </>
      ),
    },
  ];

  return (
    <>
      <ScrollAnimation
        animateIn="animate__fadeIn"
        duration={1}
        animateOnce={true}
        offset={0}
        delay={200}
        initiallyVisible={false}
      >
        <div className="landing-page">
          <MetaTags>
            <title>My Year in Quarantine - Home</title>
            <meta
              name="viewport"
              content="width=device-width, user-scalable=no"
            />
          </MetaTags>

          {/* intro block */}
          {entries.map((entry, index) => {
            return (
              <>
                {index !== 0 && <Divider height={"500px"} />}
                <LandingPageEntry
                  title={entry.title}
                  content={entry.content}
                  index={index}
                />
              </>
            );
          })}
        </div>
      </ScrollAnimation>
    </>
  );
};

export default LandingPage;
