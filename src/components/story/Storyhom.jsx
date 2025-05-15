// import React, { useEffect, useState } from 'react';

// const Story = ({ content, onClose, onNext }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onNext();
//     }, 5000); // Pindah otomatis setelah 5 detik

//     return () => clearTimeout(timer); // Bersihkan timer saat komponen di-unmount
//   }, [onNext]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//       <div className="relative w-full h-full flex flex-col items-center justify-center">
//         <div className="absolute top-4 left-4 text-white text-lg">
//           <span>{content.title}</span>
//         </div>
//         {content.type === 'text' && (
//           <p className="text-white text-4xl text-center">{content.text}</p>
//         )}
//         {content.type === 'image' && (
//           <img
//             src={content.src}
//             alt="story"
//             className="max-w-full max-h-full object-contain"
//           />
//         )}
//         {content.type === 'video' && (
//           <video
//             src={content.src}
//             controls
//             className="max-w-full max-h-full object-contain"
//           />
//         )}
//       </div>
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-white text-2xl"
//       >
//         &times;
//       </button>
//     </div>
//   );
// };

// const StoryContainer = () => {
//   const [stories, setStories] = useState([]);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [showStories, setShowStories] = useState(false);

//   const handleShowStories = () => {
//     const exampleStories = [
//       { type: 'text', text: 'Hello, this is a story!', title: 'User 1' },
//       { type: 'image', src: 'path/to/image.jpg', title: 'User 2' },
//       { type: 'video', src: 'path/to/video.mp4', title: 'User 3' },
//     ];
//     setStories(exampleStories);
//     setCurrentStoryIndex(0);
//     setShowStories(true);
//   };

//   const handleNextStory = () => {
//     if (currentStoryIndex < stories.length - 1) {
//       setCurrentStoryIndex(currentStoryIndex + 1);
//     } else {
//       setShowStories(false); // Close if it's the last story
//     }
//   };

//   const handleClose = () => {
//     setShowStories(false);
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={handleShowStories}
//         className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
//       >
//         Show Stories
//       </button>
//       {showStories && (
//         <div onClick={handleNextStory} className="relative">
//           <Story
//             content={stories[currentStoryIndex]}
//             onClose={handleClose}
//             onNext={handleNextStory}
//           />
//           <div className="absolute top-0 left-0 w-full h-1 bg-pink-300">
//             <div
//               className={`h-full bg-white transition-all duration-500 ease-in-out`}
//               style={{
//                 width: `${((currentStoryIndex + 1) / stories.length) * 100}%`,
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StoryContainer;

// import React, { useState, useEffect } from 'react';
// import { LoaderIcon } from 'react-hot-toast';
// import Stories from 'react-insta-stories';

// const StoryContainer = ({ onClose }) => {
//   const exampleStories = [
//     {
//       url: 'https://via.placeholder.com/400x600.png?text=Story+1',
//       header: {
//         heading: 'User 1',
//         subheading: 'This is the first story!',
//         profileImage: 'https://via.placeholder.com/50',
//       },
//     },
//     {
//       url: 'https://via.placeholder.com/400x600.png?text=Story+2',
//       header: {
//         heading: 'User 2',
//         subheading: 'This is the second story!',
//         profileImage: 'https://via.placeholder.com/50',
//       },
//     },
//     {
//       url: 'https://via.placeholder.com/400x600.png?text=Story+3',
//       header: {
//         heading: 'User 3',
//         subheading: 'This is the third story!',
//         profileImage: 'https://via.placeholder.com/50',
//       },
//     },
//   ];

//   return (
//     <div className="p-4">
//       <Stories
//         isPaused={true}
//         loader={true}
//         progressContainerStyles={LoaderIcon}
//         stories={exampleStories}
//         width={1040} // Lebar story
//         height={1111} // Tinggi story
//         onStoryEnd={onClose}
//       />
//     </div>
//   );
// };

// export default StoryContainer;


import React, { Suspense } from "react";
// import "./App.css";
const StoriesLazy = React.lazy(() => import("react-insta-stories"));
const WithSeeMore = React.lazy(() =>
  import("react-insta-stories").then((module) => ({
    default: module.WithSeeMore,
  }))
);

function StoryContainer({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center gap-3 justify-center z-50 max-md:flex-col">
      <div className="left">
        <h1 className="text-3xl text-white">FriendZ Stories</h1>
      </div>
      <div className="stories">
        <Suspense>
          <StoriesLazy
            preloadCount={3}
            keyboardNavigation
            defaultInterval={8000}
            stories={stories2}
            onStoryEnd={onClose}
            onAllStoriesEnd={(s, st) => console.log("all stories ended", s, st)}
            onStoryStart={(s, st) => console.log("story started", s, st)}
            onNext={() => console.log("next button pressed")}
            onPrevious={() => console.log("previous button pressed")}
            storyContainerStyles={{ borderRadius: 8, overflow: "hidden" }}
          />
        </Suspense>
      </div>
    </div>
  );
}

const Story2 = ({ action, isPaused }) => {
  return (
    <div style={{ ...contentStyle, background: "Aquamarine", color: "#333" }}>
      <h1>You get the control of the story.</h1>
      <p>
        Render your custom JSX by passing just a{" "}
        <code style={{ fontStyle: "italic" }}>content</code> property inside
        your story object.
      </p>
      <p>
        You get a <code style={{ fontStyle: "italic" }}>action</code> prop as an
        input to your content function, that can be used to play or pause the
        story.
      </p>
      <h1>{isPaused ? "Paused" : "Playing"}</h1>
      <h4>v2 is out 🎉</h4>
      <p>React Native version coming soon.</p>
    </div>
  );
};

const stories2 = [
  {
    content: ({ action, isPaused }) => {
      return (
        <div style={contentStyle}>
          <h1>The new version is here.</h1>
          <p>This is the new story.</p>
          <p>Now render React components right into your stories.</p>
          <p>Possibilities are endless, like here - here's a code block!</p>
          <pre>
            <code style={code}>console.log('Hello, world!')</code>
          </pre>
          <p>Or here, an image!</p>
          <br />
          <img
            style={image}
            src="https://images.unsplash.com/photo-1565506737357-af89222625ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          ></img>
          <h3>Perfect. But there's more! →</h3>
        </div>
      );
    },
  },
  {
    content: ({ action, story }) => {
      return (
        <Suspense>
          <WithSeeMore story={story} action={action}>
            <div style={{ background: "snow", padding: 20, height: "100%" }}>
              <h1 style={{ marginTop: "100%", marginBottom: 0 }}>🌝</h1>
              <h1 style={{ marginTop: 5 }}>
                We have our good old image and video stories, just the same.
              </h1>
            </div>
          </WithSeeMore>
        </Suspense>
      );
    },
    seeMoreCollapsed: ({ toggleMore, action }) => (
      <p style={customSeeMore} onClick={() => toggleMore(true)}>
        A custom See More message →
      </p>
    ),
    seeMore: ({ close }) => (
      <div
        style={{
          maxWidth: "100%",
          height: "100%",
          padding: 40,
          background: "white",
        }}
      >
        <h2>Just checking the see more feature.</h2>
        <p style={{ textDecoration: "underline" }} onClick={close}>
          Go on, close this popup.
        </p>
      </div>
    ),
    duration: 5000,
  },
  {
    url: "https://picsum.photos/1080/1920",
    seeMore: ({ close }) => (
      <div
        style={{
          maxWidth: "100%",
          height: "100%",
          padding: 40,
          background: "white",
        }}
      >
        <h2>Just checking the see more feature.</h2>
        <p style={{ textDecoration: "underline" }} onClick={close}>
          Go on, close this popup.
        </p>
      </div>
    ),
  },
  {
    url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    type: "video",
  },
  {
    content: Story2,
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1676231417481-5eae894e7f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1676321626679-2513969695d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1676359912443-1bf438548584?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1676316698468-a907099ad5bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    preloadResource: false,
  },
  {
    url: "https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2920&q=80",
    preloadResource: false,
  },
  {
    url: "https://images.unsplash.com/photo-1676321685222-0b527e61d5c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    preloadResource: false,
  },
];

const image = {
  display: "block",
  maxWidth: "100%",
  borderRadius: 4,
};

const code = {
  background: "#eee",
  padding: "5px 10px",
  borderRadius: "4px",
  color: "#333",
};

const contentStyle = {
  background: "#333",
  width: "100%",
  padding: 20,
  color: "white",
  height: "100%",
};

const customSeeMore = {
  textAlign: "center",
  fontSize: 14,
  bottom: 20,
  position: "relative",
};

export default StoryContainer;