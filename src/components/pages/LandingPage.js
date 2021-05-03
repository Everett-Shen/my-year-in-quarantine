import React from "react";
import MetaTags from "react-meta-tags";
import { NavLink } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import LandingPageEntry from "../landingPage/landingPageEntry";
import "animate.css/animate.min.css";
import Divider from "../timeline/divider";
import { animateScroll as scroll, scrollSpy, scroller } from "react-scroll";
import createPicture from "../../images/createGraphicFade.png";
import sharePicture from "../../images/instaPost.png";
import explorePicture from "../../images/phoneMockup.png";

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
          <br /> <br />
          <a href="http://myyearinquarantine.io/view/QA7o80HqxJsXfKnsp7G5">
            view a finished timeline
          </a>
        </>
      ),
      image: (
        <img
          src={createPicture}
          alt="arrow"
          style={{
            height: "500px",
            marginTop: "20px",
            marginLeft: "-10px",
            // overflowX: "visible",
            marginBottom: "-20px",
          }}
        />
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
        </>
      ),
      image: (
        <img
          src={sharePicture}
          alt="arrow"
          style={{
            height: "340px",
            marginTop: "60px",
            boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.11)",
            marginLeft: "40px",
          }}
        />
      ),
    },
    {
      title: <>3. Explore</>,
      content: (
        <>
          See how other people around the world spent their year with upcoming
          features like regional search and timeline maps.
          <br />
        </>
      ),
      image: (
        <img
          src={explorePicture}
          alt="arrow"
          style={{
            height: "500px",
            marginTop: "20px",
            marginLeft: "20px",
          }}
        />
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
          remembering things you long forgot in the process. <br /> <br />
          Ready to begin?
          <br />
          <br />
          <br />
          <NavLink className="getStarted" to={"/create"}>
            Get started
          </NavLink>
          <br />
          <br />
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
                {index !== 0 && (
                  <Divider height={index === 1 ? "400px" : "50px"} />
                )}
                <LandingPageEntry
                  title={entry.title}
                  content={entry.content}
                  image={entry.image}
                  index={index}
                />
              </>
            );
          })}
        </div>
      </ScrollAnimation>
      <div
        style={{
          position: "absolute",
          right: "50px",
          marginTop: "220px",
          marginBottom: "0px",
        }}
      >
        created by{" "}
        <a
          href="https://linktr.ee/eshen3256"
          target="_blank"
          rel="noreferrer"
          style={{ color: "blue", textDecoration: "none" }}
        >
          Everett Shen
        </a>
      </div>
    </>
  );
};

export default LandingPage;
