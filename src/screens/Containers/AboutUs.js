import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator , Linking, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome for icons

const AboutUs = ({navigation}) => {
  const handleLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false); // Hide the loader once the image has loaded
  };
  const handleImageError = () => {
   setLoading(false); // Hide the loader if there's an error loading the image
    // You can handle the error case here, like setting a default image
  };
  const handleArrow = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Profile Image and Name */}
        <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>About Me</Text>
            </View>
        <View style={styles.profileContainer}>
          {/* Loader displayed until the image is loaded */}
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
          <Image
            source={{ uri: 'https://drive.google.com/uc?export=view&id=1VcqP7PLanYGw_fUScF-N1EAIS8vFIXL6'}} 
            style={styles.profileImage}
            onLoad={handleImageLoad} // Called when the image has loaded
            onError={handleImageError} // Called when the image fails to load
          />
          <Text style={styles.heading}>Saakshat Tyagi</Text>
          <Text style={styles.subheading}>Passionate Developer & Technology Enthusiast</Text>
        </View>
        {/* About Me Section */}
        <View style={styles.section}>
          <Text style={styles.text}>
            Hi, I'm Saakshat Tyagi, a passionate developer with expertise in JavaScript, Node.js, MongoDB, and Java. I love to build scalable web applications and have a keen interest in exploring new technologies. I am always eager to learn, grow, and contribute to the community through open-source projects.
          </Text>
          <Text style={styles.text}>
            I believe in writing clean, maintainable code, and constantly improving my skills by building projects that challenge me and push me to think outside the box.
          </Text>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Skills</Text>
          <Text style={styles.text}>• JavaScript (ES6+), Node.js, Express.js</Text>
          <Text style={styles.text}>• MongoDB, SQL, NoSQL databases</Text>
          <Text style={styles.text}>• REST APIs, GraphQL</Text>
          <Text style={styles.text}>• React, React Native, HTML, CSS</Text>
          <Text style={styles.text}>• Git, GitHub, CI/CD, Agile methodologies</Text>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Experience</Text>
          <Text style={styles.text}>• Software Developer at Pentair - August 2023 - Present</Text>
          <Text style={styles.text}>• Built scalable APIs using Node.js and Express.</Text>
          <Text style={styles.text}>• Developed and deployed React/React Native applications.</Text>
          <Text style={styles.text}>• Collaborated with teams to implement new features and improve user experience.</Text>
        </View>

        {/* Footer with Social Media Links */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Connect with me:</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => handleLink('https://www.linkedin.com/in/saakshat-tyagi-7aab251ab/')}>
              <Icon name="linkedin" size={40} color="#0077B5" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLink('https://leetcode.com/u/Saakshat01/')}>
              <Icon name="github" size={40} color="#0E76A8" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  contentContainer: {
    marginTop: 5,
    marginBottom: 30,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // This makes the image round
    borderWidth: 4,  // Border around the image
    borderColor: '#0000FF', // You can change the color to whatever you like
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subheading: {
    fontSize: 18,
    color: '#0077B5',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0
},
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  projectTitle: {
    fontWeight: 'bold',
    color: '#0077B5',
  },
  section: {
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#000',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  icon: {
    marginHorizontal: 15,
  },
  loader: {
    position: 'absolute',
    top: '35%', // Center loader vertically
    left: '53%', // Center loader horizontally
    transform: [{ translateX: -25 }, { translateY: -25 }], // Offset the loader so it's centered on the image
  },
  backButton: {
    marginRight: 16,
},
});

export default AboutUs;
