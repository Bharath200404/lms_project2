export type Video = {
  title: string;
  youtubeId: string;
};

export type Section = {
  title: string;
  videos: Video[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  sections: Section[];
};

export const courses: Course[] = [
  {
    id: "website-design",
    title: "Website Design",
    description: "Learn modern website design principles and techniques.",
    sections: [
      {
        title: "Website Design Basics",
        videos: [
          {
            title: "Website Design Course",
            youtubeId: "F4zr1aMevB4",
          },
        ],
      },
    ],
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    description: "Master SEO techniques to improve your website visibility.",
    sections: [
      {
        title: "SEO Fundamentals",
        videos: [
          {
            title: "SEO Tutorial",
            youtubeId: "xsVTqzratPs",
          },
        ],
      },
    ],
  },

  {
    id: "sql",
    title: "SQL Mastery",
    description: "Master SQL databases and query optimization.",
    sections: [
      {
        title: "SQL Basics",
        videos: [
          {
            title: "SQL Full Course",
            youtubeId: "HXV3zeQKqGY",
          },
        ],
      },
    ],
  },
  {
    id: "power-bi",
    title: "Power BI Analytics",
    description: "Create stunning data visualizations with Power BI.",
    sections: [
      {
        title: "Power BI Dashboard",
        videos: [
          {
            title: "Power BI Tutorial",
            youtubeId: "AGrl-H87pRU",
          },
        ],
      },
    ],
  },
  {
    id: "python-data-science",
    title: "Python Data Science",
    description: "Use Python for data analysis and visualization.",
    sections: [
      {
        title: "Python for Data Science",
        videos: [
          {
            title: "Python Data Science Course",
            youtubeId: "CMEWVn1uZpQ",
          },
        ],
      },
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Learn ML algorithms and their applications.",
    sections: [
      {
        title: "ML Basics",
        videos: [
          {
            title: "Machine Learning Explained",
            youtubeId: "GwIo3gDZCVQ",
          },
        ],
      },
    ],
  },
  {
    id: "aws",
    title: "AWS Cloud Practitioner",
    description: "Get started with AWS cloud computing services.",
    sections: [
      {
        title: "AWS Fundamentals",
        videos: [
          {
            title: "AWS Cloud Tutorial",
            youtubeId: "HK_q1lH5x5M",
          },
        ],
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps Engineering",
    description: "Master DevOps practices and tools.",
    sections: [
      {
        title: "DevOps Basics",
        videos: [
          {
            title: "DevOps Tutorial",
            youtubeId: "MzJsjDRFRgU",
          },
        ],
      },
    ],
  },
  {
    id: "math-data-science",
    title: "Maths for Data Science",
    description: "Learn essential math concepts for data science.",
    sections: [
      {
        title: "Math Fundamentals",
        videos: [
          {
            title: "Math for Data Science",
            youtubeId: "8DvywoWv6fI",
          },
        ],
      },
    ],
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    description: "Explore neural networks and deep learning.",
    sections: [
      {
        title: "Neural Networks",
        videos: [
          {
            title: "Deep Learning Introduction",
            youtubeId: "aircAruvnKk",
          },
        ],
      },
    ],
  },
  {
    id: "advanced-python",
    title: "Advanced Python",
    description: "Master advanced Python programming concepts.",
    sections: [
      {
        title: "Advanced Python Concepts",
        videos: [
          {
            title: "Advanced Python Tutorial",
            youtubeId: "HGOBQPFzWKo",
          },
        ],
      },
    ],
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    description: "Understand cloud computing fundamentals.",
    sections: [
      {
        title: "Cloud Basics",
        videos: [
          {
            title: "Cloud Computing Tutorial",
            youtubeId: "M988_fsOSWo",
          },
        ],
      },
    ],
  },
  {
    id: "docker-kubernetes",
    title: "Docker & Kubernetes",
    description: "Master containerization with Docker and Kubernetes.",
    sections: [
      {
        title: "Containerization",
        videos: [
          {
            title: "Docker & Kubernetes Tutorial",
            youtubeId: "3c-iBn73dDE",
          },
        ],
      },
    ],
  },
  {
    id: "app-development",
    title: "App Development",
    description: "Build mobile applications from scratch.",
    sections: [
      {
        title: "Mobile Development Basics",
        videos: [
          {
            title: "App Development Course",
            youtubeId: "0-S5a0eXPoc",
          },
        ],
      },
    ],
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description: "Learn data analysis techniques and tools.",
    sections: [
      {
        title: "Data Analytics Basics",
        videos: [
          {
            title: "Data Analytics Tutorial",
            youtubeId: "r-uOLxNrNk8",
          },
        ],
      },
    ],
  },
  {
    id: "ui-ux",
    title: "UI/UX Engineering",
    description: "Design beautiful and intuitive user interfaces.",
    sections: [
      {
        title: "UI/UX Design",
        videos: [
          {
            title: "UI UX Design Course",
            youtubeId: "c9Wg6Cb_YlU",
          },
        ],
      },
    ],
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((course) => course.id === id);
};
