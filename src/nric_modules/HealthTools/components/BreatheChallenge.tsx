import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Types
interface BreathRecord {
  count: number;
  time: string;
  duration: number;
}

interface SessionInfo {
  time: string;
  duration: number;
  date: string;
}

interface BreathDataMap {
  [date: string]: BreathRecord;
}

const LEVELS = [
  { label: 'Weak', max: 30, color: '#EF4444' },
  { label: 'Normal', max: 60, color: '#F59E0B' },
  { label: 'Strong', max: 120, color: '#10B981' },
  { label: 'Super', max: Infinity, color: '#3B82F6' },
];

const getLevel = (duration: number) => {
  return LEVELS.find(level => duration <= level.max)!;
};

const BreatheChallenge = () => {
  const [breathData, setBreathData] = useState<BreathDataMap>({});
  const [todayCount, setTodayCount] = useState(0);
  const [totalTodayDuration, setTotalTodayDuration] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<SessionInfo[]>([]);
  const [isBreathing, setIsBreathing] = useState(false);
  const [duration, setDuration] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('breatheTracker');
      const parsed: BreathDataMap = data ? JSON.parse(data) : {};
      setBreathData(parsed);

      const todayVal = parsed[today]?.count || 0;
      const todayDur = parsed[today]?.duration || 0;

      setTodayCount(todayVal);
      setTotalTodayDuration(todayDur);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const saveData = async (durationSeconds: number) => {
    const updatedDuration =
      (breathData[today]?.duration || 0) + durationSeconds;

    const updated: BreathDataMap = {
      ...breathData,
      [today]: {
        count: (breathData[today]?.count || 0) + 1,
        time: new Date().toLocaleTimeString(),
        duration: updatedDuration,
      },
    };

    await AsyncStorage.setItem('breatheTracker', JSON.stringify(updated));
    setBreathData(updated);
    setTodayCount(updated[today].count);
    setTotalTodayDuration(updatedDuration);

    setSessionHistory(prev => [
      {
        date: today,
        time: new Date().toLocaleTimeString(),
        duration: durationSeconds,
      },
      ...prev,
    ]);
  };

  const startBreathing = () => {
    setIsBreathing(true);
    setDuration(0);

    intervalRef.current = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    saveData(duration);
  };

  const currentLevel = getLevel(duration);

  const getBarWidth = (dur: number) => {
    const maxWidth = Dimensions.get('window').width - 60;
    return (Math.min(dur, 120) / 120) * maxWidth;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lung Strength Test</Text>
      <Text style={styles.subtitle}>
        Hold as long as you can and track progress
      </Text>

      <View style={styles.levelLegend}>
        {LEVELS.map((level, i) => (
          <View key={i} style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: level.color }]}
            />
            <Text style={styles.legendText}>
              {level.label} (
              {level.max === Infinity ? '120s+' : `≤ ${level.max}s`})
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            {
              width: getBarWidth(duration),
              backgroundColor: currentLevel.color,
            },
          ]}
        />
        <Text style={styles.barLabel}>
          {duration}s ({currentLevel.label})
        </Text>
      </View>

      {!isBreathing ? (
        <TouchableOpacity
          style={styles.startButton}
          onPressIn={startBreathing}
          onPressOut={stopBreathing}
        >
          <Icon name="play" size={24} color="#fff" />
          <Text style={styles.startButtonText}>Press & Hold to Breathe</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.stopButton} onPress={stopBreathing}>
          <Icon name="stop" size={24} color="#fff" />
          <Text style={styles.stopButtonText}>Stop</Text>
        </TouchableOpacity>
      )}

      {sessionHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.tipsTitle}>Recent Sessions</Text>
          {sessionHistory.slice(0, 5).map((s, i) => (
            <View key={i} style={styles.historyItem}>
              <Icon name="clock" size={20} color="#3B82F6" />
              <Text style={styles.historyText}>
                {s.date} {s.time} — {s.duration}s ({getLevel(s.duration).label})
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  levelLegend: {
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#374151',
  },
  barContainer: {
    height: 40,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  bar: {
    height: 40,
    borderRadius: 20,
  },
  barLabel: {
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#111827',
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    borderRadius: 10,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  stopButton: {
    flexDirection: 'row',
    backgroundColor: '#EF4444',
    borderRadius: 10,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  historyContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#374151',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
});

export default BreatheChallenge;
