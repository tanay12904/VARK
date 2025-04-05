import React, { useState } from 'react';

const TeacherDashboard = () => {
  // Sample student data based on the image
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alex Smith",
      learningStyles: {
        visual: 65,
        auditory: 15,
        kinesthetic: 20,
        readingWriting: 0
      },
      color: "#6a5acd" // Purple
    },
    {
      id: 2,
      name: "Taylor Williams",
      learningStyles: {
        visual: 25,
        auditory: 55,
        kinesthetic: 20,
        readingWriting: 0
      },
      color: "#ffa500" // Orange
    },
    {
      id: 3,
      name: "Jordan Brown",
      learningStyles: {
        visual: 10,
        auditory: 30,
        kinesthetic: 60,
        readingWriting: 0
      },
      color: "#ff69b4" // Pink
    },
    {
      id: 4,
      name: "Casey Davis",
      learningStyles: {
        visual: 20,
        auditory: 30,
        kinesthetic: 15,
        readingWriting: 35
      },
      color: "#ff4a4a" // Red
    },
    {
      id: 5,
      name: "Morgan Wilson",
      learningStyles: {
        visual: 40,
        auditory: 35,
        kinesthetic: 25,
        readingWriting: 0
      },
      color: "#20b2aa" // Teal
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get dominant learning style for a student
  const getDominantStyle = (styles) => {
    const entries = Object.entries(styles);
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  };

  // Get icon based on learning style
  const getLearningStyleIcon = (style) => {
    switch(style) {
      case 'visual':
        return '👁️';
      case 'auditory':
        return '👂';
      case 'kinesthetic':
        return '🏃';
      case 'readingWriting':
        return '📝';
      default:
        return '📊';
    }
  };

  // Format style name for display
  const formatStyleName = (style) => {
    switch(style) {
      case 'visual':
        return 'Visual';
      case 'auditory':
        return 'Auditory';
      case 'kinesthetic':
        return 'Kinesthetic';
      case 'readingWriting':
        return 'Reading/Writing';
      default:
        return style;
    }
  };

  // Calculate class averages
  const calculateClassAverages = () => {
    const averages = {
      visual: 0,
      auditory: 0,
      kinesthetic: 0,
      readingWriting: 0
    };
    
    students.forEach(student => {
      averages.visual += student.learningStyles.visual;
      averages.auditory += student.learningStyles.auditory;
      averages.kinesthetic += student.learningStyles.kinesthetic;
      averages.readingWriting += student.learningStyles.readingWriting;
    });
    
    const count = students.length;
    return {
      visual: (averages.visual / count).toFixed(1),
      auditory: (averages.auditory / count).toFixed(1),
      kinesthetic: (averages.kinesthetic / count).toFixed(1),
      readingWriting: (averages.readingWriting / count).toFixed(1)
    };
  };

  const classAverages = calculateClassAverages();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="rounded-lg mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <h1 className="text-3xl font-bold">Ms. Sarah Johnson's Dashboard</h1>
        <p className="text-xl">Learning Style Analysis for {students.length} students</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {filteredStudents.map(student => {
          const dominantStyle = getDominantStyle(student.learningStyles);
          const icon = getLearningStyleIcon(dominantStyle);
          
          return (
            <div 
              key={student.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border-t-4" 
              style={{ borderTopColor: student.color }}
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-1">{student.name}</h2>
                <p className="text-gray-600 mb-4">ID: {student.id}</p>
                
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">{icon}</span>
                  <span className="font-medium">{formatStyleName(dominantStyle)}</span>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(student.learningStyles).map(([style, value]) => (
                    value > 0 && (
                      <div key={style} className="flex justify-between items-center">
                        <span>{formatStyleName(style)}:</span>
                        <span className="font-medium">{value}%</span>
                      </div>
                    )
                  ))}
                </div>
                
                <button
                  className="w-full mt-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: student.color }}
                  onClick={() => setSelectedStudent(student)}
                >
                  Learning Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Class Average Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Class Learning Style Average</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(classAverages).map(([style, value]) => (
            parseFloat(value) > 0 && (
              <div key={style} className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{getLearningStyleIcon(style)}</span>
                  <span className="font-medium">{formatStyleName(style)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="h-4 rounded-full" 
                    style={{ 
                      width: `${value}%`, 
                      backgroundColor: style === 'visual' ? '#6a5acd' : 
                                       style === 'auditory' ? '#ffa500' : 
                                       style === 'kinesthetic' ? '#ff69b4' : '#ff4a4a'
                    }}
                  ></div>
                </div>
                <p className="mt-1 text-right font-medium">{value}%</p>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedStudent.name}'s Profile</h2>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Learning Style Breakdown</h3>
                {Object.entries(selectedStudent.learningStyles).map(([style, value]) => (
                  value > 0 && (
                    <div key={style} className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{formatStyleName(style)}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${value}%`, 
                            backgroundColor: selectedStudent.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                ))}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Recommended Teaching Approaches</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {getDominantStyle(selectedStudent.learningStyles) === 'visual' && (
                    <>
                      <li>Use diagrams, charts, and visual aids</li>
                      <li>Implement color-coding in materials</li>
                      <li>Provide graphic organizers</li>
                      <li>Use video content when possible</li>
                    </>
                  )}
                  
                  {getDominantStyle(selectedStudent.learningStyles) === 'auditory' && (
                    <>
                      <li>Incorporate discussions and verbal explanations</li>
                      <li>Use audio recordings for instructions</li>
                      <li>Encourage participation in group discussions</li>
                      <li>Provide verbal feedback frequently</li>
                    </>
                  )}
                  
                  {getDominantStyle(selectedStudent.learningStyles) === 'kinesthetic' && (
                    <>
                      <li>Incorporate hands-on activities</li>
                      <li>Use movement during learning</li>
                      <li>Allow for frequent breaks</li>
                      <li>Implement role-playing exercises</li>
                    </>
                  )}
                  
                  {getDominantStyle(selectedStudent.learningStyles) === 'readingWriting' && (
                    <>
                      <li>Provide written instructions and materials</li>
                      <li>Encourage note-taking and journaling</li>
                      <li>Assign reading and writing tasks</li>
                      <li>Use text-based learning materials</li>
                    </>
                  )}
                </ul>
              </div>
              
              <button
                className="w-full mt-6 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: selectedStudent.color }}
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;