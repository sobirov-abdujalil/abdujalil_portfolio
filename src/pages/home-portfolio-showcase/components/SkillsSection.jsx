import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "Monitor",
      skills: [
        { name: "React", level: 95, icon: "Code" },
        { name: "JavaScript", level: 90, icon: "Code" },
        { name: "TypeScript", level: 85, icon: "Code" },
        { name: "Tailwind CSS", level: 90, icon: "Palette" },
        { name: "Next.js", level: 80, icon: "Zap" }
      ]
    },
    {
      title: "Backend Development",
      icon: "Server",
      skills: [
        { name: "Node.js", level: 88, icon: "Server" },
        { name: "Express.js", level: 85, icon: "Globe" },
        { name: "Python", level: 75, icon: "Code" },
        { name: "PostgreSQL", level: 80, icon: "Database" },
        { name: "MongoDB", level: 82, icon: "Database" }
      ]
    },
    {
      title: "Tools & Technologies",
      icon: "Settings",
      skills: [
        { name: "Git", level: 90, icon: "GitBranch" },
        { name: "Docker", level: 75, icon: "Package" },
        { name: "AWS", level: 70, icon: "Cloud" },
        { name: "Figma", level: 85, icon: "Figma" },
        { name: "Vite", level: 88, icon: "Zap" }
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proficient in modern web technologies and frameworks, 
            constantly learning and adapting to industry best practices.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories?.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-card rounded-lg border border-border p-6 shadow-card hover:shadow-modal transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                  <Icon name={category?.icon} size={20} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  {category?.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category?.skills?.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Icon 
                          name={skill?.icon} 
                          size={16} 
                          className="text-muted-foreground mr-2" 
                        />
                        <span className="text-sm font-medium text-card-foreground">
                          {skill?.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {skill?.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-accent to-primary h-2 rounded-full transition-all duration-1000 ease-out group-hover:shadow-sm"
                        style={{ width: `${skill?.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-lg border border-border p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-card-foreground mb-4">
              Always Learning
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Technology evolves rapidly, and I stay current with the latest trends and best practices. 
              Currently exploring AI integration, serverless architectures, and advanced React patterns 
              to deliver cutting-edge solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["AI/ML Integration", "Serverless", "GraphQL", "Web3", "Mobile Development"]?.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent/10 text-accent rounded-md text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;