import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import {RouteProp} from '@react-navigation/native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

let db: SQLiteDatabase;

const initializeDatabase = async () => {
  db = await openDatabase({name: 'LoginData.db'});
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS table_user (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name VARCHAR(20),
        user_email VARCHAR(50),
        user_password VARCHAR(20)
      )`,
      [],
      () => console.log('Table created successfully'),
      error => console.error('Error creating table: ', error),
    );
  });
};

const surveyDatabase = async () => {
  db = await openDatabase({name: 'LoginData.db'});
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS survey_data (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name VARCHAR(20),
        user_email VARCHAR(50),
        college VARCHAR(20) DEFAULT 'pending',
        hostel VARCHAR(20) DEFAULT 'pending'
      )`,
      [],
      () => console.log('Table created successfully'),
      error => console.error('Error creating table: ', error),
    );
  });
};

const complainDatabase = async () => {
  db = await openDatabase({name: 'LoginData.db'});
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS complain_data (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name VARCHAR(20),
        user_email VARCHAR(50),
        complain VARCHAR(2000) DEFAULT 'pending',
        status VARCHAR(20) DEFAULT 'pending'
      )`,
      [],
      () => console.log('Table created successfully'),
      error => console.error('Error creating table: ', error),
    );
  });
};

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Student: {
    user: {user_name: string; user_email: string; user_password: string};
  };
  Survey: {
    user: {user_name: string; user_email: string; user_password: string};
  };
  Signup: undefined;
  HostelSurvey: {
    user: {user_name: string; user_email: string; user_password: string};
  };
  Admin: undefined;
  Approval: undefined;
  StudentList: undefined;
  Complaint: { user: { user_name: string; user_email: string; user_password: string } };
  ViewComplaint: undefined;
  StudentDetails:undefined;
  ApprovedSurveysScreen:undefined;
  CollegeSurveyDetails:undefined;
  HostelSurveyDetails:undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
type StudentScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Student'
>;
type AdminScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Admin'
>;

type StudentScreenRouteProp = RouteProp<RootStackParamList, 'Student'>;

type ApprovalScreenRouteProp = RouteProp<RootStackParamList, 'Approval'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    initializeDatabase();
  }, []);
  useEffect(() => {
    surveyDatabase();
  }, []);
  useEffect(() => {
    complainDatabase();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Student" component={Student} />
        <Stack.Screen name="Survey" component={Survey} />
        <Stack.Screen name="HostelSurvey" component={HostelSurvey} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Approval" component={Approval} />
        <Stack.Screen name="Complaint" component={Complaint} />
        <Stack.Screen name="ViewComplaint" component={ViewComplaint} />
        <Stack.Screen name="StudentDetails" component={StudentDetails} />
        <Stack.Screen name="ApprovedSurveysScreen" component={ApprovedSurveysScreen} />
        <Stack.Screen name="CollegeSurveyDetails" component={CollegeSurveyDetails} />
        <Stack.Screen name="HostelSurveyDetails" component={HostelSurveyDetails} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Home = ({navigation}: {navigation: HomeScreenNavigationProp}) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'flex-start', // Align items at the top
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#ffffff',
       // Light background
    }}>
    <Header />
    
    {/* Spacing between the Header and the Welcome text */}
    
    <Text
      style={{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1E88E5', // Matching color with Login/Signup
        marginTop: 60, // Added margin between Header and the welcome text
        marginBottom: 40, // Space between the title and buttons
        textTransform: 'uppercase',
        textAlign: 'center',
      }}>
      Welcome to Grievance App
    </Text>

    <TouchableOpacity
      style={{
        backgroundColor: '#FF5722', // Matching button color (aggressive orange)
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
      }}
      onPress={() => navigation.navigate('Login')}>
      <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
        Login
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        backgroundColor: '#2196F3', // Blue button for Signup
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
      }}
      onPress={() => navigation.navigate('Signup')}>
      <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
        Signup
      </Text>
    </TouchableOpacity>
  </View>
);

const Signup = ({navigation}: {navigation: LoginScreenNavigationProp}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Password Strength',
        'Password must be at least 8 characters long and contain at least one letter, one number, and one special symbol (!@#$%^&*()_+).',
      );
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user WHERE user_email = ?',
        [email],
        (tx, results) => {
          if (results.rows.length > 0) {
            Alert.alert(
              'Email Already Exists',
              'Please use a different email.',
            );
          } else {
            tx.executeSql(
              'INSERT INTO table_user (user_name, user_email, user_password) VALUES (?, ?, ?)',
              [username, email, password],
              (tx, results) => {
                Alert.alert(
                  'Signup Successful',
                  'You can now log in with your credentials.',
                );
                navigation.navigate('Login');
              },
              (tx, error) => {
                console.log('Error: ' + error.message);
              },
            );
          }
        },
        (tx, error) => {
          console.log('Error checking email:', error.message);
        },
      );
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#ffffff'}}>
      <Header />
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1E88E5',
        marginBottom: 20,
        textTransform: 'uppercase'
      }}>
        Signup
      </Text>

      <TextInput
        style={{
          height: 45,
          borderColor: 'rgba(0, 0, 0, 0.3)', // Reduced opacity (0.3)
          borderWidth: 2,
          borderRadius: 5,
          marginBottom: 10,
          paddingLeft: 10,
          color: '#000',
          fontSize: 16,
        }}
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{
          height: 45,
          borderColor: 'rgba(0, 0, 0, 0.3)', // Reduced opacity (0.3)
          borderWidth: 2,
          borderRadius: 5,
          marginBottom: 10,
          paddingLeft: 10,
          color: '#000',
          fontSize: 16,
        }}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{
          height: 45,
          borderColor: 'rgba(0, 0, 0, 0.3)', // Reduced opacity (0.3)
          borderWidth: 2,
          borderRadius: 5,
          marginBottom: 20,
          paddingLeft: 10,
          color: '#000',
          fontSize: 16,
        }}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#FF5722',
          paddingVertical: 15,
          paddingHorizontal: 40,
          borderRadius: 10,
          marginBottom: 20,
          width: '100%',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 6,
          elevation: 5,
        }}
        onPress={handleSignup}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const Login = ({navigation}: {navigation: LoginScreenNavigationProp}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }

    // Check for admin credentials
    if (email === 'admin@gmail.com' && password === 'BIT-STUDENT-26') {
      setMessage('Admin login successful!');
      Alert.alert('Welcome Admin', 'Login successful!');
      navigation.navigate('Admin');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user WHERE user_email = ? AND user_password = ?',
        [email, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0); // Get the first matching user
            setMessage('Login successful!');
            Alert.alert('Welcome', 'Login successful!');
            navigation.navigate('Student', {user}); // Pass the user details
          } else {
            setMessage('Invalid email or password.');
          }
        },
        (tx, error) => {
          console.log('Error: ' + error.message);
          setMessage('An error occurred while logging in.');
        },
      );
    });
  };

  const handleForgotPassword = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT user_password FROM table_user WHERE user_email = ?',
        [email],
        (tx, results) => {
          if (results.rows.length > 0) {
            const password = results.rows.item(0).user_password;
            Alert.alert('Password Retrieved', `Your password is: ${password}`);
            setShowPassword(true); // Show the password after it's retrieved
            setShowForgotPassword(false); // Hide the forgot password form
          } else {
            Alert.alert('Error', 'Email not found.');
          }
        },
        (tx, error) => {
          console.log('Error: ' + error.message);
        },
      );
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#ffffff'}}>
      <Header />
      <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: '#1E88E5', marginBottom: 20, textTransform: 'uppercase'}}>
        Login
      </Text>
      <TextInput
        style={{
          height: 45,
          borderColor: 'rgba(0, 0, 0, 0.3)', // Reduced opacity (0.3)
          borderWidth: 2,
          borderRadius: 5,
          marginBottom: 10,
          paddingLeft: 10,
          color: '#000',
          fontSize: 16,
        }}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{
          height: 45,
          borderColor: 'rgba(0, 0, 0, 0.3)', // Reduced opacity (0.3)
          borderWidth: 2,
          borderRadius: 5,
          marginBottom: 20,
          paddingLeft: 10,
          color: '#000',
          fontSize: 16,
        }}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#FF5722',
          paddingVertical: 15,
          paddingHorizontal: 40,
          borderRadius: 10,
          marginBottom: 20,
          width: '100%',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 6,
          elevation: 5,
        }}
        onPress={handleLogin}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Login</Text>
      </TouchableOpacity>

      {message && (
        <Text style={{
          color: message === 'Login successful!' ? 'green' : 'red', 
          marginTop: 20, 
          fontSize: 16, 
          textAlign: 'center'
        }}>
          {message}
        </Text>
      )}

      <TouchableOpacity
        style={{marginTop: 10, alignItems: 'center'}}
        onPress={() => setShowForgotPassword(!showForgotPassword)}>
        <Text style={{color: '#1E88E5', fontSize: 18, fontWeight: 'bold'}}>Forgot Password?</Text>
      </TouchableOpacity>

      {showForgotPassword && !showPassword && (
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <TextInput
            style={{
              height: 45,
              borderColor: 'rgba(0, 0, 0, 0.3)', // Reduced opacity (0.3)
              borderWidth: 2,
              borderRadius: 5,
              marginBottom: 10,
              paddingLeft: 10,
              color: '#000',
              fontSize: 16,
            }}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#4CAF50',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 6,
              elevation: 5,
            }}
            onPress={handleForgotPassword}>
            <Text style={{color: '#fff', fontSize: 16}}>Get Password</Text>
          </TouchableOpacity>
        </View>
      )}

      {showPassword && (
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: '#000', textAlign: 'center'}}>
            Your password has been retrieved. Please check your email.
          </Text>
        </View>
      )}
    </View>
  );
};

const Admin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [studentCount, setStudentCount] = useState(0);
  const [collegeSurveyCount, setCollegeSurveyCount] = useState(0);
  const [hostelSurveyCount, setHostelSurveyCount] = useState(0);
  const [approvedSurveyCount, setApprovedSurveyCount] = useState(0);
  const [pendingSurveyCount, setPendingSurveyCount] = useState(0);
  const [pendingComplaintsCount, setPendingComplaintsCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const db = await openDatabase({ name: 'LoginData.db' });
        db.transaction(tx => {
          // Fetch total students
          tx.executeSql(
            'SELECT COUNT(*) AS total_students FROM table_user',
            [],
            (tx, results) => {
              const count = results.rows.item(0).total_students;
              setStudentCount(count);
            }
          );

          // Fetch college survey count
          tx.executeSql(
            'SELECT COUNT(*) AS college_survey_count FROM survey_data WHERE college IN (?, ?)',
            ['Submitted', 'Approved'],
            (tx, results) => {
              const count = results.rows.item(0).college_survey_count;
              setCollegeSurveyCount(count);
            }
          );

          // Fetch pending approval count
          tx.executeSql(
            'SELECT COUNT(*) AS pending_survey_count FROM survey_data WHERE college = ? and hostel = ?',
            ['Submitted', 'Submitted'],
            (tx, results) => {
              const count = results.rows.item(0).pending_survey_count;
              setPendingSurveyCount(count);
            }
          );

          // Fetch approved survey count
          tx.executeSql(
            'SELECT COUNT(*) AS approved_survey_count FROM survey_data WHERE college = ? and hostel = ?',
            ['Approved', 'Approved'],
            (tx, results) => {
              const count = results.rows.item(0).approved_survey_count;
              setApprovedSurveyCount(count);
            }
          );

          // Fetch hostel survey count
          tx.executeSql(
            'SELECT COUNT(*) AS hostel_survey_count FROM survey_data WHERE hostel IN (?, ?)',
            ['Submitted', 'Approved'],
            (tx, results) => {
              const count = results.rows.item(0).hostel_survey_count;
              setHostelSurveyCount(count);
            }
          );

          // Fetch pending complaints count
          tx.executeSql(
            'SELECT COUNT(*) AS pending_complaints_count FROM complain_data WHERE status = "pending"',
            [],
            (tx, results) => {
              const count = results.rows.item(0).pending_complaints_count;
              setPendingComplaintsCount(count);
            },
            error => {
              console.error('Error fetching pending complaints count:', error);
            }
          );
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16, backgroundColor: '#f8f9fa'}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            textAlign: 'center',
          }}>
          Admin Panel
        </Text>
        <Text style={{fontSize: 16, marginBottom: 20, textAlign: 'center'}}>
          Welcome, Admin! Here you can manage grievances and surveys.
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={{
              width: '95%',
              backgroundColor: '#e9ecef',
              borderRadius: 8,
              padding: 20,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }} onPress={() => navigation.navigate('StudentDetails')}>
            <Text
              style={{fontSize: 16, fontWeight: '600', textAlign: 'center'}}>
              Total Students Registered
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#007bff',
                marginTop: 8,
              }}>
              {studentCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '95%',
              backgroundColor: '#e9ecef',
              borderRadius: 8,
              padding: 20,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }} onPress={() => navigation.navigate('ApprovedSurveysScreen')}>
            <Text
              style={{fontSize: 16, fontWeight: '600', textAlign: 'center'}}>
              No. of Approved Surveys
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#007bff',
                marginTop: 8,
              }}>
              {approvedSurveyCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '95%',
              backgroundColor: '#e9ecef',
              borderRadius: 8,
              padding: 20,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }} onPress={() => navigation.navigate('CollegeSurveyDetails')}>
            <Text
              style={{fontSize: 16, fontWeight: '600', textAlign: 'center'}}>
              No. of Students Filled College Survey
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#007bff',
                marginTop: 8,
              }}>
              {collegeSurveyCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '95%',
              backgroundColor: '#e9ecef',
              borderRadius: 8,
              padding: 20,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }} onPress={() => navigation.navigate('HostelSurveyDetails')}>
            <Text
              style={{fontSize: 16, fontWeight: '600', textAlign: 'center'}}>
              No. of Students Filled Hostel Survey
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#007bff',
                marginTop: 8,
              }}>
              {hostelSurveyCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '95%',
              backgroundColor: '#e9ecef',
              borderRadius: 8,
              padding: 20,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('Approval')}>
            <Text
              style={{fontSize: 16, fontWeight: '600', textAlign: 'center'}}>
              Approval
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#007bff',
                marginTop: 8,
              }}>
              Pending : {pendingSurveyCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '95%',
              backgroundColor: '#e9ecef',
              borderRadius: 8,
              padding: 20,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('ViewComplaint')}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
              View Complaints
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#007bff',
                marginTop: 8,
              }}
            >
              Pending: {pendingComplaintsCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '95%',
              backgroundColor: '#e9ecef',
              borderRadius: 8,
              padding: 20,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }} onPress={() => navigation.navigate('Survey',{user :{ user_name:'Admin', user_email:'admin@gmail.com', user_password:'1234'}})}>
            <Text
              style={{fontSize: 16, fontWeight: '600', textAlign: 'center'}}>
              View College Survey Form
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '95%',
              backgroundColor: '#e9ecef',
              borderRadius: 8,
              padding: 20,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }} onPress={() => navigation.navigate('HostelSurvey',{user :{ user_name:'Admin', user_email:'admin@gmail.com', user_password:'1234'}})}>
            <Text
              style={{fontSize: 16, fontWeight: '600', textAlign: 'center'}}>
              View Hostel Survey Form
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const StudentDetails = ({ route }: { route: any }) => {
  const [students, setStudents] = useState<any[]>([]);

  const removeStudent = async (userEmail: string) => {
    const updatedStudents = students.filter(student => student.user_email !== userEmail);
    setStudents(updatedStudents);

    // Remove student from the database
    const db = await openDatabase({ name: 'LoginData.db' });
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM table_user WHERE user_email = ?`,
        [userEmail],
        () => console.log('Student removed successfully'),
        (tx, error) => console.log('Error removing student:', error)
      );
    });
  };

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const db = await openDatabase({ name: 'LoginData.db' });
        db.transaction(tx => {
          tx.executeSql(
            `SELECT u.user_name, u.user_email, s.college, s.hostel, c.complain, c.status AS complain_status 
             FROM table_user u
             LEFT JOIN survey_data s ON u.user_email = s.user_email
             LEFT JOIN complain_data c ON u.user_email = c.user_email`,
            [],
            (tx, results) => {
              let studentsData = [];
              for (let i = 0; i < results.rows.length; i++) {
                studentsData.push(results.rows.item(i));
              }
              setStudents(studentsData);
            },
            (tx, error) => {
              console.log('Error fetching student data:', error);
            }
          );
        });
      } catch (error) {
        console.log('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#ffffff' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}>
        Student Details
      </Text>

      <ScrollView>
        {students.map((student, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#f8f9fa',
              padding: 15,
              marginBottom: 10,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#ddd',
              flexDirection: 'row', // To align items horizontally
              justifyContent: 'space-between', // To space the content
            }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>{student.user_name}</Text>
              <Text style={{ fontSize: 14, color: '#555' }}>{student.user_email}</Text>
              <Text style={{ fontSize: 14, color: '#007bff', marginTop: 8 }}>
                College Survey Status: {student.college || 'Not Submitted'}
              </Text>
              <Text style={{ fontSize: 14, color: '#007bff', marginTop: 8 }}>
                Hostel Survey Status: {student.hostel || 'Not Submitted'}
              </Text>

              {/* Display Complaint Data */}
              <Text style={{ fontSize: 14, color: '#007bff', marginTop: 8 }}>
                Complaint: {student.complain || 'No complaint registered'}
              </Text>
              <Text style={{ fontSize: 14, color: '#007bff', marginTop: 8 }}>
                Complaint Status: {student.complain_status || 'Pending'}
              </Text>
            </View>
            
            {/* Remove Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#abdbe3',
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => removeStudent(student.user_email)}>
              <Text style={{ color: 'black', fontSize: 14 }}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ApprovedSurveysScreen = () => {
  
  const [loading, setLoading] = useState(true);
  interface Student {
    user_id: number;
    user_name: string;
    user_email: string;
    college: string;
    hostel: string;
  }
  const [approvedStudents, setApprovedStudents] = useState<Student[]>([]);
  useEffect(() => {
    const fetchApprovedStudents = async () => {
      try {
        const db = await openDatabase({ name: 'LoginData.db' });
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM survey_data WHERE college = ? AND hostel = ?',
            ['Approved', 'Approved'],
            (tx, results) => {
              const rows = results.rows.raw(); // raw to get an array of rows
              setApprovedStudents(rows);
              setLoading(false);
            },
            error => {
              console.error('Error fetching approved students:', error);
              setLoading(false);
            }
          );
        });
      } catch (error) {
        console.error('Error fetching approved students:', error);
        setLoading(false);
      }
    };

    fetchApprovedStudents();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
        Approved Students
      </Text>
      <FlatList
        data={approvedStudents}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#f8f9fa', padding: 15, borderRadius: 8, marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.user_name}</Text>
            <Text style={{ fontSize: 16, marginVertical: 5 }}>{item.user_email}</Text>
            <Text style={{ fontSize: 14, color: '#007bff' }}>College: {item.college}</Text>
            <Text style={{ fontSize: 14, color: '#007bff' }}>Hostel: {item.hostel}</Text>
          </View>
        )}
      />
    </View>
  );
};

const CollegeSurveyDetails = () => {
  type SurveyData = {
    user_id: number;
    user_name: string;
    user_email: string;
    college: string;
    hostel: string;
  };
  const [students, setStudents] = useState<SurveyData[]>([]);
  
  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        const db = await openDatabase({name: 'LoginData.db'});
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM survey_data WHERE college IN (?, ?)',
            ['Submitted', 'Approved'],
            (tx, results) => {
              const rows = results.rows.raw();
              setStudents(rows);
            },
            error => {
              console.error('Error fetching survey data:', error);
            }
          );
        });
      } catch (error) {
        console.error('Error fetching survey details:', error);
      }
    };
    fetchSurveyDetails();
  }, []);

  return (
    <ScrollView style={{flex: 1, padding: 16, backgroundColor: '#f8f9fa'}}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 16,
          textAlign: 'center',
        }}>
        Students Who Filled College Survey
      </Text>
      
      {students.length > 0 ? (
        students.map((student, index) => (
          <View key={index} style={{marginBottom: 16, backgroundColor: '#e9ecef', padding: 16, borderRadius: 8}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{student.user_name}</Text>
            <Text style={{fontSize: 14, color: '#555'}}>{student.user_email}</Text>
            <Text style={{fontSize: 14, marginTop: 8}}>College Survey Status: {student.college}</Text>
          </View>
        ))
      ) : (
        <Text style={{fontSize: 16, textAlign: 'center'}}>No students have filled the college survey yet.</Text>
      )}
    </ScrollView>
  );
};

const HostelSurveyDetails = () => {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchHostelSurveyDetails = async () => {
      try {
        const db = await openDatabase({ name: 'LoginData.db' });
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM survey_data WHERE hostel IN (?, ?)',
            ['Submitted', 'Approved'],
            (tx, results) => {
              const studentsList = [];
              for (let i = 0; i < results.rows.length; i++) {
                studentsList.push(results.rows.item(i));
              }
              setStudents(studentsList);
            },
            error => {
              console.error('Error fetching students:', error);
            }
          );
        });
      } catch (error) {
        console.error('Error fetching hostel survey details:', error);
      }
    };

    fetchHostelSurveyDetails();
  }, []);

  const renderStudentItem = ({ item }: { item: any }) => {
    return (
      <View style={{
        backgroundColor: '#e9ecef',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
      }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Name: {item.user_name}</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Email: {item.user_email}</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Hostel Status: {item.hostel}</Text>
      </View>
    );
  };

  return (
    <View style={{
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f9fa',
    }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      }}>Hostel Survey Details</Text>
      {students.length > 0 ? (
        <FlatList
          data={students}
          renderItem={renderStudentItem}
          keyExtractor={(item) => item.user_id.toString()}
        />
      ) : (
        <Text style={{
          fontSize: 18,
          textAlign: 'center',
          color: 'gray',
        }}>No students found</Text>
      )}
    </View>
  );
};

const ViewComplaint = ({ route, navigation }: { route: any; navigation: any }) => {
  // Use the defined Complaint type
  interface Complaint {
    user_id: number;
    user_name: string;
    complain: string;
  }
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    // Fetch complaints from the database
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM complain_data WHERE status = "pending"',
        [],
        (tx, results) => {
          const rows: Complaint[] = [];  // Specify type here
          for (let i = 0; i < results.rows.length; i++) {
            rows.push(results.rows.item(i) as Complaint);
          }
          setComplaints(rows);
        },
        error => console.error('Error fetching complaints: ', error)
      );
    });
  }, []);

  const closeComplaint = (id: number) => {
    // Update complaint status to "solved" in the database
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE complain_data SET status = "solved" WHERE user_id = ?',
        [id],
        () => {
          Alert.alert('Success', 'Complaint closed successfully.');
          setComplaints(complaints.filter(c => c.user_id !== id));
        },
        error => console.error('Error updating complaint: ', error)
      );
    });
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      {complaints.map((complaint) => (
        <View key={complaint.user_id} style={{ padding: 16, borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{complaint.user_name}</Text>
          <Text style={{ marginBottom: 10 }}>{complaint.complain}</Text>
          <Button title="Close" onPress={() => closeComplaint(complaint.user_id)} />
        </View>
      ))}
    </ScrollView>
  );
};

const Approval = () => {
  type StudentData = {
    user_id: number;
    user_name: string;
    user_email: string;
    college: string;
    hostel: string;
  };

  const [students, setStudents] = useState<StudentData[]>([]);

  useEffect(() => {
    fetchSubmittedStudents();
  }, []);

  const fetchSubmittedStudents = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM survey_data WHERE college = ? AND hostel = ?`,
        ['Submitted', 'Submitted'],
        (tx, results) => {
          const fetchedStudents: StudentData[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            fetchedStudents.push(results.rows.item(i));
          }
          console.log('Fetched students needing approval:', fetchedStudents);
          setStudents(fetchedStudents);
        },
        error => {
          console.error('Error fetching submitted students:', error);
          Alert.alert('Error', 'Could not fetch students for approval');
        },
      );
    });
  };

  const approveStudent = (userId: number) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE survey_data SET college = ?, hostel = ? WHERE user_id = ?`,
        ['Approved', 'Approved', userId],
        () => {
          Alert.alert('Approval successful', 'Student approved successfully');
          fetchSubmittedStudents(); // Refresh list after approval
        },
        error => {
          console.error('Error updating approval status:', error);
          Alert.alert('Error', 'Could not update student approval status');
        },
      );
    });
  };

  return (
    <ScrollView style={{padding: 16}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
        Approve Students
      </Text>
      {students.map((student, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            marginVertical: 8,
            backgroundColor: '#e9ecef',
            borderRadius: 8,
          }}>
          <View>
            <Text style={{fontSize: 16, fontWeight: '600'}}>
              {student.user_name}
            </Text>
            <Text style={{fontSize: 14, color: '#6c757d'}}>
              {student.user_email}
            </Text>
          </View>
          <Button
            title="Approve"
            onPress={() => approveStudent(student.user_id)}
            color="#007bff"
          />
        </View>
      ))}
    </ScrollView>
  );
};

const Header = () => (
  <View>
    <Text style={styles.header}>Grievance App</Text>
  </View>
);

const Student = ({
  route,
  navigation,
}: {
  route: StudentScreenRouteProp;
  navigation: StudentScreenNavigationProp;
}) => {
  const {user} = route.params; // Retrieve user data
  const [surveyStatus, setSurveyStatus] = useState({
    collegeStatus: 'Not Filled',
    hostelStatus: 'Not Filled',
  });

  useEffect(() => {
    const fetchSurveyStatus = async () => {
      try {
        // Open the database
        const db = await openDatabase({name: 'LoginData.db'});

        // Fetch the user's survey data based on email
        db.transaction(txn => {
          txn.executeSql(
            `SELECT * FROM survey_data WHERE user_email = ?`,
            [user.user_email],
            (txn, result) => {
              if (result.rows.length > 0) {
                const userData = result.rows.item(0);
                // Update status based on the fields in the database
                setSurveyStatus({
                  collegeStatus: userData.college,

                  hostelStatus: userData.hostel,
                });
              }
            },
            error => console.error('Error fetching data: ', error),
          );
        });
      } catch (error) {
        console.error('Error in fetchSurveyStatus: ', error);
      }
    };

    fetchSurveyStatus();
  }, [user.user_email]); // Run only when the user email changes

  return (
    <View style={{flex: 1, padding: 20, backgroundColor: '#f8f9fa'}}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 20,
        }}>
        My Grievance
      </Text>

      <Text style={{fontSize: 16, color: '#555', marginBottom: 5}}>
        Username:{' '}
        <Text style={{fontWeight: '600', color: '#000'}}>{user.user_name}</Text>
      </Text>
      <Text style={{fontSize: 16, color: '#555', marginBottom: 20}}>
        Email:{' '}
        <Text style={{fontWeight: '600', color: '#000'}}>
          {user.user_email}
        </Text>
      </Text>

      <TextInput
        style={{
          backgroundColor: '#ffffff',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 8,
          borderColor: '#ddd',
          borderWidth: 1,
          marginBottom: 20,
          fontSize: 16,
          color: '#333',
        }}
        placeholder="Search"
        placeholderTextColor="#aaa"
      />

      <View
        style={{
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.2,
          shadowRadius: 6,
          marginBottom: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
            marginBottom: 8,
          }}>
          Grievance ID: <Text style={{color: '#007BFF'}}>MCA-13</Text>
        </Text>
        <Text style={{fontSize: 16, color: '#333', marginBottom: 8}}>
          College Survey Status:{' '}
          <Text style={{color: '#FF6347'}}>{surveyStatus.collegeStatus}</Text>
        </Text>
        <Text style={{fontSize: 16, color: '#333', marginBottom: 8}}>
          Hostel Survey Status:{' '}
          <Text style={{color: '#FF6347'}}>{surveyStatus.hostelStatus}</Text>
        </Text>
        <Text style={{fontSize: 16, color: '#333', marginBottom: 8}}>
          Date: <Text style={{fontWeight: '600'}}>2024-11-03</Text>
        </Text>
        <Text style={{fontSize: 16, color: '#333', marginBottom: 8}}>
          Category: <Text style={{fontWeight: '600'}}>College / Hostel</Text>
        </Text>
        <Text style={{fontSize: 16, color: '#333', marginBottom: 8}}>
          Grievance:{' '}
          <Text style={{fontStyle: 'italic', color: '#555'}}>
            To be filled By Student
          </Text>
        </Text>
        {/* <Text style={{fontSize: 16, color: '#333', marginBottom: 20}}>
          Deadline:{' '}
          <Text style={{color: '#FF6347', fontWeight: '600'}}>2024-11-13</Text>
        </Text> */}

        <TouchableOpacity
          style={{
            backgroundColor: '#007BFF',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Survey', {user})}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
            Fill College Feedback
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#007BFF',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => navigation.navigate('HostelSurvey', {user})}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
            Fill Hostel Feedback
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#007BFF',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => navigation.navigate('Complaint', { user })}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Submit a Complaint</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Complaint = ({ route, navigation }: { route: any; navigation: any }) => {
  const { user } = route.params;
  const [complainText, setComplainText] = useState('');

  const submitComplaint = () => {
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO complain_data (user_name, user_email, complain) VALUES (?, ?, ?)`,
        [user.user_name, user.user_email, complainText],
        () => {
          Alert.alert('Success', 'Complaint submitted successfully.');
          navigation.goBack();
        },
        error => console.error('Error submitting complaint: ', error)
      );
    });
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f8f9fa' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 20 }}>
        Submit a Complaint
      </Text>
      
      <TextInput
        style={{
          height: 150,
          backgroundColor: '#ffffff',
          padding: 15,
          borderRadius: 8,
          borderColor: '#ddd',
          borderWidth: 1,
          fontSize: 16,
          color: '#333',
          textAlignVertical: 'top',
          marginBottom: 20,
        }}
        placeholder="Enter your complaint"
        placeholderTextColor="#aaa"
        multiline
        value={complainText}
        onChangeText={text => setComplainText(text)}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#007BFF',
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: 'center',
        }}
        onPress={submitComplaint}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
          Submit Complaint
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Survey = ({route}: {route: RouteProp<RootStackParamList, 'Survey'>}) => {
  const navigation = useNavigation();
  const {user} = route.params; // Retrieve the user data from navigation params

  const collegeQuestions = [
    '1. Projector: How would you rate the functionality of the projector in your room/common area?',
    '2. Garbage Collection: How satisfied are you with the frequency and timeliness of garbage collection from your room/floor?',
    '3. Air Conditioner: How would you rate the performance of the air conditioner in your room?',
    '4. Fan: How would you rate the functionality of the fan in your room?',
    '5. Water Supply: How satisfied are you with the consistency and quality of the water supply in your room/common area?',
    '6. Bed Condition: How would you rate the condition and comfort of your bed?',
    '7. Lighting: How would you rate the adequacy of the lighting in your room and common areas?',
    '8. Are the college events and activities engaging?',
    '9. How responsive is the college in addressing student concerns?',
    '10. Improvement Measures', // Last question with input
  ];

  const options = ['Excellent', 'Very Good', 'Good', 'Poor', 'Very Poor'];
  const [responses, setResponses] = useState(
    Array(collegeQuestions.length - 1).fill(null),
  );
  const [improvementMeasures, setImprovementMeasures] = useState(''); // State for text input

  const handleOptionSelect = (questionIndex: number, option: string) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = option;
    setResponses(newResponses);
  };

  const handleSubmit = async () => {
    try {
      // Open the database
      const db = await openDatabase({name: 'LoginData.db'});

      // Check if the student already exists by email and whether the survey is already submitted
      db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM survey_data WHERE user_email = ?`,
          [user.user_email],
          (txn, result) => {
            if (result.rows.length > 0) {
              // Check if the college field is already 'Submitted'
              const existingUser = result.rows.item(0); // Get the first (and only) row

              if (
                existingUser.college === 'Submitted' ||
                existingUser.college === 'Approved'
              ) {
                // If the survey is already submitted, show the message
                Alert.alert(
                  'Survey Already Submitted',
                  'You have already submitted the survey.',
                );
                navigation.goBack();
                
              } else {
                // If the survey is not yet submitted, update the college field to 'Submitted'
                txn.executeSql(
                  `UPDATE survey_data SET college = ? WHERE user_email = ?`,
                  ['Submitted', user.user_email],
                  () => {
                    Alert.alert(
                      'Survey Submitted',
                      'Thank you for completing the survey!',
                    );
                    console.log('Updated college field to Submitted');
                    navigation.goBack();
                  },
                  error =>
                    console.error('Error updating the database: ', error),
                );
              }
            } else {
              // If student does not exist, insert a new record with 'Submitted' as college
              txn.executeSql(
                `INSERT INTO survey_data (user_name, user_email, college, hostel) VALUES (?, ?, ?, ?)`,
                [user.user_name, user.user_email, 'Submitted', 'Pending'], // Assume 'Pending' for hostel as an example
                () => {
                  Alert.alert(
                    'Survey Submitted',
                    'Thank you for completing the survey!',
                  );
                  console.log('Inserted new record with Submitted college');
                  navigation.goBack();
                },
                error =>
                  console.error('Error inserting into the database: ', error),
              );
            }
          },
          error => console.error('Error selecting from the database: ', error),
        );
      });
    } catch (error) {
      console.error('Error in handleSubmit: ', error);
    }

  };

  return (
    <ScrollView style={{flex: 1, padding: 20, backgroundColor: '#f8f9fa'}}>
      {/* Display student details at the top */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 8,
        }}>
        Student Name: {user.user_name}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 20,
        }}>
        Email: {user.user_email}
      </Text>

      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 20,
        }}>
        College Survey
      </Text>

      {collegeQuestions.slice(0, -1).map((question, index) => (
        <View key={index} style={{marginBottom: 20}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#333',
              marginBottom: 8,
            }}>
            {question}
          </Text>
          {options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ddd',
                marginBottom: 8,
                backgroundColor:
                  responses[index] === option ? '#007BFF' : '#fff',
              }}
              onPress={() => handleOptionSelect(index, option)}>
              <Text
                style={{color: responses[index] === option ? '#fff' : '#333'}}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Last question with text input */}
      <View style={{marginBottom: 20}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
            marginBottom: 8,
          }}>
          {collegeQuestions[collegeQuestions.length - 1]}
        </Text>
        <TextInput
          style={{
            backgroundColor: '#ffffff',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 8,
            borderColor: '#ddd',
            borderWidth: 1,
            fontSize: 16,
            color: '#333',
          }}
          placeholder="Please provide your suggestions for improvement"
          value={improvementMeasures}
          onChangeText={setImprovementMeasures}
          multiline
        />
      </View>

      <Button title="Submit College Survey" onPress={handleSubmit} />
      <View>
        <Text style={{marginTop: 20}}></Text>
      </View>
    </ScrollView>
  );
};

const HostelSurvey = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'HostelSurvey'>;
}) => {
  const {user} = route.params; // Retrieve the user data from navigation params
  const navigation = useNavigation();

  const hostelQuestions = [
    '1. Projector: How would you rate the functionality of the projector in your room/common area?',
    '2. Garbage Collection: How satisfied are you with the frequency and timeliness of garbage collection from your room/floor?',
    '3. Air Conditioner: How would you rate the performance of the air conditioner in your room?',
    '4. Fan: How would you rate the functionality of the fan in your room?',
    '5. Water Supply: How satisfied are you with the consistency and quality of the water supply in your room/common area?',
    '6. Bed Condition: How would you rate the condition and comfort of your bed?',
    '7. Lighting: How would you rate the adequacy of the lighting in your room and common areas?',
    '8. How would you rate the response time of hostel staff to issues?',
    '9. How comfortable is the common area for students?',
    '10. Improvement Measures', // Last question with input
  ];

  const options = ['Excellent', 'Very Good', 'Good', 'Poor', 'Very Poor'];
  const [responses, setResponses] = useState(
    Array(hostelQuestions.length - 1).fill(null),
  );
  const [improvementMeasures, setImprovementMeasures] = useState(''); // State for text input

  const handleOptionSelect = (questionIndex: number, option: string) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = option;
    setResponses(newResponses);
  };

  const handleSubmit = async () => {
    try {
      // Open the database
      const db = await openDatabase({name: 'LoginData.db'});

      // Check if the student already exists by email
      db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM survey_data WHERE user_email = ?`,
          [user.user_email],
          (txn, result) => {
            if (result.rows.length > 0) {
              // Check if the hostel field is already 'Submitted'
              const existingUser = result.rows.item(0); // Get the first (and only) row

              if (existingUser.hostel === 'Submitted') {
                // If the hostel survey is already submitted, show the message
                Alert.alert(
                  'Survey Already Submitted',
                  'You have already submitted the hostel survey.',
                  
                );
                navigation.goBack()
              } else {
                // If the hostel survey is not yet submitted, update the hostel field to 'Submitted'
                txn.executeSql(
                  `UPDATE survey_data SET hostel = ? WHERE user_email = ?`,
                  ['Submitted', user.user_email],
                  () => {
                    Alert.alert(
                      'Survey Submitted',
                      'Thank you for completing the hostel survey!',
                    );
                    console.log('Updated hostel field to Submitted');
                    navigation.goBack()
                  },
                  error =>
                    console.error('Error updating the database: ', error),
                );
              }
            } else {
              // If student does not exist, insert a new record with 'Submitted' as hostel
              txn.executeSql(
                `INSERT INTO survey_data (user_name, user_email, college, hostel) VALUES (?, ?, ?, ?)`,
                [user.user_name, user.user_email, 'pending', 'Submitted'], // Set 'pending' for college as default
                () => {
                  Alert.alert(
                    'Survey Submitted',
                    'Thank you for completing the hostel survey!',
                  );
                  console.log('Inserted new record with Submitted hostel');
                  navigation.goBack()
                },
                error =>
                  console.error('Error inserting into the database: ', error),
              );
            }
          },
          error => console.error('Error selecting from the database: ', error),
        );
      });
    } catch (error) {
      console.error('Error in handleSubmit: ', error);
    }
  };

  return (
    <ScrollView style={{flex: 1, padding: 20, backgroundColor: '#f8f9fa'}}>
      {/* Display student details at the top */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 8,
        }}>
        Student Name: {user.user_name}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 20,
        }}>
        Email: {user.user_email}
      </Text>

      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 20,
        }}>
        Hostel Survey
      </Text>

      {hostelQuestions.slice(0, -1).map((question, index) => (
        <View key={index} style={{marginBottom: 20}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#333',
              marginBottom: 8,
            }}>
            {question}
          </Text>
          {options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ddd',
                marginBottom: 8,
                backgroundColor:
                  responses[index] === option ? '#007BFF' : '#fff',
              }}
              onPress={() => handleOptionSelect(index, option)}>
              <Text
                style={{color: responses[index] === option ? '#fff' : '#333'}}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Last question with text input */}
      <View style={{marginBottom: 20}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
            marginBottom: 8,
          }}>
          {hostelQuestions[hostelQuestions.length - 1]}
        </Text>
        <TextInput
          style={{
            backgroundColor: '#ffffff',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 8,
            borderColor: '#ddd',
            borderWidth: 1,
            fontSize: 16,
            color: '#333',
          }}
          placeholder="Please provide your suggestions for improvement"
          value={improvementMeasures}
          onChangeText={setImprovementMeasures}
          multiline
        />
      </View>

      <Button title="Submit Hostel Survey" onPress={handleSubmit} />
      <View>
        <Text style={{marginTop: 20}}></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    marginTop:60
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 4,
  },
  selectedOption: {
    backgroundColor: '#d3f0d3',
  },
  title: {
    marginTop: 120,
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  grievanceCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  grievanceText: {
    fontSize: 16,
    marginBottom: 4,
  },
  ratingButton: {
    marginTop: 12,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
