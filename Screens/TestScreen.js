import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const { width, height } = Dimensions.get('window');

const TestScreen = ({ route, navigation }) => {
  const { subModuleName } = route.params || { subModuleName: 'Default' };
  const TOTAL_QUESTIONS = 30;
  const TOTAL_TIMER_DURATION = 30 * 60; // 30 minutes in seconds
  const scrollRef = useRef();

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIMER_DURATION);
  const [answers, setAnswers] = useState(Array(TOTAL_QUESTIONS).fill(null));
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hint, setHint] = useState(Array(TOTAL_QUESTIONS).fill(''));
  const [timerExpired, setTimerExpired] = useState(false);

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://backend-ckite.onrender.com/api/v1/${subModuleName}`);
        const data = await response.json();

        if (!data.documents || !Array.isArray(data.documents)) {
          throw new Error('Invalid question data received.');
        }

        const formattedQuestions = data.documents.map((doc) => ({
          question: doc.question,
          options: doc.options.map((opt) => opt.text),
          correctOption: doc.options.findIndex((opt) => opt.isCorrect),
          hint: doc.hint,
        }));

        setQuestions(formattedQuestions);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subModuleName]);

  // Handle back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Confirm Navigation',
          'Are you sure you want to go back? Your progress may be lost.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Yes', style: 'destructive', onPress: () => navigation.goBack() },
          ]
        );
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimerExpired(true);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-submit when timer expires
  useEffect(() => {
    if (timerExpired) {
      handleSubmit();
    }
  }, [timerExpired]);

  // Scroll and update selected option
  useEffect(() => {
    scrollRef.current?.scrollTo({
      x: (currentQuestion - 1) * 40,
      animated: true,
    });
    setSelectedOption(answers[currentQuestion - 1] ?? null);
  }, [currentQuestion]);

  const handleOptionSelect = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion - 1] = index;
    setAnswers(updatedAnswers);
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (currentQuestion < TOTAL_QUESTIONS) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleHint = () => {
    if (questions[currentQuestion - 1]?.hint) {
      setHint((prevHint) => {
        const updatedHint = [...prevHint];
        updatedHint[currentQuestion - 1] =
          updatedHint[currentQuestion - 1] === '' ? questions[currentQuestion - 1].hint : '';
        return updatedHint;
      });
    } else {
      Alert.alert('Hint Unavailable', 'No hint available for this question.');
    }
  };

  const handleSubmit = () => {
    if (timeLeft > 0) {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to submit?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Submit', onPress: finalizeSubmission },
        ]
      );
    } else {
      finalizeSubmission();
    }
  };

  const finalizeSubmission = async () => {
    let score = 0;

    answers.forEach((answer, index) => {
      const question = questions[index];
      if (question && answer === question.correctOption) {
        score++;
      }
    });

    const percentage = (score / TOTAL_QUESTIONS) * 100;

    const submissionData = {
      subModuleName,
      score,
      maxScore: TOTAL_QUESTIONS,
      percentage: percentage.toFixed(2),
      questionsAttempted: answers.filter((ans) => ans !== null).length,
      totalQuestions: TOTAL_QUESTIONS,
      timeTaken: `${Math.floor((TOTAL_TIMER_DURATION - timeLeft) / 60)} min ${(TOTAL_TIMER_DURATION - timeLeft) % 60} sec`,
      totalTime: `${Math.floor(TOTAL_TIMER_DURATION / 60)} min`,
      startTime: new Date(Date.now() - TOTAL_TIMER_DURATION * 1000).toISOString(),
      endTime: new Date().toISOString(),
      answers: answers.map((answer, index) => {
        const question = questions[index];
        return {
          question: question?.question || 'N/A',
          selectedOption: answer,
          correctOption: question?.correctOption,
          isCorrect: answer === question?.correctOption,
        };
      }),
    };

    try {
      await submitTest(submissionData);
      navigation.replace('CandidateTestReport', submissionData);
    } catch (error) {
      Alert.alert('Submission Error', 'Failed to submit the test. Please try again.');
    }
  };

  const submitTest = async (data) => {
    try {
      const storedEmail = await AsyncStorage.getItem('user_email');
      if (!storedEmail) {
        throw new Error('User email not found in AsyncStorage.');
      }

      const response = await fetch(`https://backend-ckite.onrender.com/api/v1/result/${storedEmail}/${subModuleName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Submission error:', errorData);
        throw new Error(errorData.message || 'Submission failed');
      }

      const result = await response.json();
      console.log('Submission successful:', result);
      Alert.alert('Success', 'Test submitted successfully!');
    } catch (error) {
      console.error('Error during submission:', error.message);
      Alert.alert('Submission Error', 'Failed to submit the test. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header and Timer */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{subModuleName}</Text>
        <View style={styles.timerContainer}>
          <TouchableOpacity style={styles.hintButton} onPress={handleHint}>
            <Text style={styles.hintText}>💡</Text>
          </TouchableOpacity>
          <Text style={styles.timer}>
            Time Left: {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
            {String(timeLeft % 60).padStart(2, '0')}s
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollRef}>
          {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => {
            const isAttempted = answers[i] !== null;
            const isActive = currentQuestion === i + 1;

            return (
              <TouchableOpacity key={i} onPress={() => setCurrentQuestion(i + 1)}>
                <View
                  style={[
                    styles.circle,
                    isAttempted && styles.attemptedCircle,
                    isActive && styles.activeCircle,
                  ]}
                >
                  <Text
                    style={[
                      styles.circleText,
                      isAttempted && styles.attemptedCircleText,
                      isActive && styles.activeCircleText,
                    ]}
                  >
                    {i + 1}
                  </Text>
                </View>
              </TouchableOpacity>

            );
          })}
        </ScrollView>
      </View>

      {/* Question and Options */}
      <View style={styles.QuestionContainer}>
        {hint[currentQuestion - 1] !== '' && <Text style={styles.hintBox}>{hint[currentQuestion - 1]}</Text>}

        <View style={styles.card}>
          <Text style={styles.questionText}>
            {questions[currentQuestion - 1]?.question}
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {questions[currentQuestion - 1]?.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedOption === index && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(index)}
            >
              <Text
                style={[
                  styles.optionText,
                  answers[currentQuestion - 1] === index && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          {currentQuestion > 1 && (
            <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
              <Text style={styles.navButtonText}>PREVIOUS</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.navButton, currentQuestion === TOTAL_QUESTIONS && styles.submitButton]}
            onPress={currentQuestion === TOTAL_QUESTIONS ? handleSubmit : handleNext}
          >
            <Text style={styles.navButtonText}>
              {currentQuestion === TOTAL_QUESTIONS ? 'SUBMIT' : 'NEXT'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F9',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  headerText: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hintButton: {
    marginRight: width * 0.02,
  },
  hintText: {
    fontSize: width * 0.045,
    color: '#FF8C00',
  },
  timer: {
    fontSize: width * 0.045,
    color: '#333',
  },
  progressBar: {
    backgroundColor: '#E0E0E0',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.05,
    marginBottom: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  circle: {
    width: width * 0.08,
    height: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.02,
    backgroundColor: '#E0E0E0',
    borderRadius: width * 0.04,
  },
  activeCircle: {
    backgroundColor: '#4A90E2',
  },
  attemptedCircle: {
    backgroundColor: 'green',
  },
  circleText: {
    fontSize: width * 0.04,
    color: '#000',
    textAlign: 'center',
  },
  activeCircleText: {
    color: '#FFF',
  },
  attemptedCircleText: {
    color: '#FFF',
  },
  hintBox: {
    backgroundColor: '#FFFFE0',
    padding: width * 0.04,
    marginVertical: height * 0.01,
    borderRadius: 8,
    borderColor: '#FFD700',
    borderWidth: 1,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  QuestionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: width * 0.05,
    elevation: 2,
    marginBottom: height * 0.02,
    width: '100%',
  },
  questionText: {
    fontSize: width * 0.045,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: height * 0.02,
    width: '100%',
    alignItems: 'center',
  },
  option: {
    backgroundColor: '#FFF',
    padding: width * 0.04,
    marginVertical: height * 0.01,
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    width: '90%',
  },
  selectedOption: {
    backgroundColor: 'lightgreen',
  },
  optionText: {
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  selectedOptionText: {
    fontWeight: 'bold',
    color: '#000',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
    width: '100%',
  },
  navButton: {
    flex: 0.48,
    backgroundColor: '#4A90E2',
    paddingVertical: height * 0.015,
    borderRadius: width * 0.05,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#FF3D00',
  },
});

export default TestScreen;