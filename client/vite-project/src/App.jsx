// // // import { useEffect, useState } from 'react'
// // // import './App.css'
// // // import io from 'socket.io-client'

// // // const socket = io('http://localhost:4000')

// // // function App() {
// // //   const [notification, setNotification] = useState([])
// // //   useEffect(() => {
// // //     socket.on('pushNotification', (data) => {
// // //       console.log('Received', data)
// // //       setNotification((prev) => {
// // //         [...prev, data]
// // //       })
// // //     })
// // //     return() => {
// // //       socket.off('pushNotification')
// // //     }
// // //   }, [])
// // //   return (
// // //       <div className="App">
// // //         <h1>Push Notifications</h1>
// // //         <ul>
// // //   {notification.map((notifi, index) => (
// // //     <li key={index}>{notifi.message}</li>  // This is a more concise version
// // //   ))}
// // // </ul>

// // //       </div>
// // //   )
// // // }

// // // export default App


// // import React, { useState, useEffect } from 'react';
// // import io from 'socket.io-client';

// // // Define the Socket.IO server URL (replace with your actual server URL if needed)
// // const SOCKET_SERVER_URL = 'http://localhost:4000'; // Change this if necessary

// // const NotificationComponent = () => {
// //   // State to store incoming notifications
// //   const [notifications, setNotifications] = useState([]);

// //   useEffect(() => {
// //     // Connect to the Socket.IO server
// //     const socket = io(SOCKET_SERVER_URL);

// //     // Listen for incoming notifications from the server
// //     socket.on('pushNotification', (data) => {
// //       // Update the notifications state with the new message
// //       setNotifications((prevNotifications) => [
// //         ...prevNotifications,
// //         data.message,
// //       ]);
// //     });

// //     // Cleanup the socket connection when the component is unmounted
// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, []);

// //   return (
// //     <div>
// //       <h3>Notifications</h3>
// //       <ul>
// //         {notifications.length > 0 ? (
// //           notifications.map((notification, index) => (
// //             <li key={index}>{notification}</li>
// //           ))
// //         ) : (
// //           <li>No new notifications</li>
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default NotificationComponent;


// import { useEffect } from 'react';
// import io from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://localhost:4000'; // Replace with your server URL

// const App = () => {
//   useEffect(() => {
//     const socket = io(SOCKET_SERVER_URL);

//     // Send the userId when the socket connects
//     const userId = 'user123'; // Replace with the actual user ID
//     socket.emit('register', userId);

//     // Listen for push notifications
//     socket.on('pushNotification', (data) => {
//       console.log('Received notification:', data.message);
//       // Handle notification (e.g., display it to the user)
//     });

//     return () => {
//       socket.disconnect(); // Cleanup on component unmount
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to the Notification System</h1>
//     </div>
//   );
// };

// export default App;


// import { useEffect } from 'react';
// import io from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://localhost:3000'; // Replace with your server URL

// const App = () => {
//   useEffect(() => {
//     const socket = io(SOCKET_SERVER_URL);

//     // Send the userId when the socket connects
//     const userId = 'areegbedavid@gmail.com'; // Replace with the actual user ID
//     socket.emit('register', userId);

//     // Listen for push notifications
//     socket.on('pushNotification', (data) => {
//       console.log('Received notification:', data.message);
//       // Handle notification (e.g., display it to the user)
//     });

//     return () => {
//       socket.disconnect(); // Cleanup on component unmount
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to the Notification System</h1>
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://localhost:3000'; // Replace with your server URL

// const App = () => {
//   const [socket, setSocket] = useState(null);
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [activeUsers, setActiveUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState('');

//   useEffect(() => {
//     const socketConnection = io(SOCKET_SERVER_URL);
//     setSocket(socketConnection);

//     // Listener for push notifications
//     socketConnection.on('pushNotification', (data) => {
//       console.log('Received notification:', data.message);
//     });

//     // Listener for chat messages
//     socketConnection.on('chatIndividual', (data) => {
//       console.log('Received chat:', data.message);
//     });

//     return () => {
//       socketConnection.disconnect(); // Cleanup on component unmount
//     };
//   }, []);

//   useEffect(() => {
//     const fetchActiveUsers = async () => {
//       try {
//         const response = await fetch(`${SOCKET_SERVER_URL}/active-users`);
//         const users = await response.json();
  
//         // Ensure users is an array before setting state
//         if (Array.isArray(users)) {
//           setActiveUsers(users);
//         } else {
//           console.error('Invalid data format:', users);
//           setActiveUsers([]);
//         }
//       } catch (error) {
//         console.error('Error fetching active users:', error);
//         setActiveUsers([]); // Fallback to empty array
//       }
//     };
  
//     fetchActiveUsers();
//   }, []);
  

//   const handleRegister = () => {
//     if (socket && email) {
//       socket.emit('register', email);
//       console.log(`Registered with email: ${email}`);
//     } else {
//       console.log('Socket or email not initialized');
//     }
//   };

//   const handleSendMessage = async () => {
//     if (message) {
//       try {
//         const response = await fetch(`${SOCKET_SERVER_URL}/chat/user`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: 'areegbedavid@gmail.com', message, senderId: email }),
//         });
//         const result = await response.json();
//         console.log(result.message);
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//     } else {
//       console.log('Message or selected user cannot be empty');
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome to the Notification System</h1>
//       <div>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button onClick={handleRegister}>Register</button>
//       </div>
//       <div>
//         <h3>Active Users</h3>
//         <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
//           <option value="">Select a user</option>
//           {activeUsers.map((user, index) => (
//             <option key={index} value={user}>
//               {user}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <textarea
//           placeholder="Type your message here"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={handleSendMessage}>Send Message</button>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'https://david-node-server.onrender.com'; // Replace with your server URL

const App = () => {
  const [socket, setSocket] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [media, setMedia] = useState(null); // State for media file

  useEffect(() => {
    const socketConnection = io(SOCKET_SERVER_URL);
    setSocket(socketConnection);

    // Listener for push notifications
    socketConnection.on('pushNotification', (data) => {
      console.log('Received notification:', data.message);
    });

    // Listener for chat messages
    socketConnection.on('chatIndividual', (data) => {
      console.log('Received chat:', data.message);
    });

    return () => {
      socketConnection.disconnect(); // Cleanup on component unmount
    };
  }, []);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await fetch(`${SOCKET_SERVER_URL}/active-users`);
        const users = await response.json();

        // Ensure users is an array before setting state
        if (Array.isArray(users)) {
          setActiveUsers(users);
        } else {
          console.error('Invalid data format:', users);
          setActiveUsers([]);
        }
      } catch (error) {
        console.error('Error fetching active users:', error);
        setActiveUsers([]); // Fallback to empty array
      }
    };

    fetchActiveUsers();
  }, []);

  const handleRegister = () => {
    if (socket && email) {
      socket.emit('register', email);
      console.log(`Registered with email: ${email}`);
    } else {
      console.log('Socket or email not initialized');
    }
  };

  const handleSendMessage = async () => {
    if (!message && !media) {
      console.log('Message or media must be provided.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', 'areegbedavid@gmail.com'); // Receiver's email
    formData.append('message', message); // Message content
    formData.append('senderId', email); // Sender's email
    if (media) {
      formData.append('media', media); // Media file
    }

    try {
      const response = await fetch(`${SOCKET_SERVER_URL}/chat/user`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFileChange = (e) => {
    setMedia(e.target.files[0]); // Set the selected file
  };

  return (
    <div>
      <h1>Welcome to the Notification System</h1>
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
      <div>
        <h3>Active Users</h3>
        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
          <option value="">Select a user</option>
          {activeUsers.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
      </div>
      <div>
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default App;
