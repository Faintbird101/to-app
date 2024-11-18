import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { Appearance } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure this package is installed

// Enable animations on Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [isModalVisible, setIsModalVisible] = useState(false);
  

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const saveTask = () => {
    if (task.trim().length === 0) return;

    if (editMode) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTasks(
        tasks.map((t) => (t.id === editTaskId ? { ...t, title: task } : t))
      );
      setEditMode(false);
      setEditTaskId(null);
    } else {
      const newTask = { id: Math.random().toString(), title: task, completed: false };
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTasks([...tasks, newTask]);
    }

    setTask('');
    setIsModalVisible(false);
  };

  const editTask = (id, title) => {
    setEditMode(true);
    setEditTaskId(id);
    setTask(title);
    setIsModalVisible(true);
  };

  const deleteTask = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const markTaskComplete = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: true } : t))
    );
  };

  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    if (filter === 'completed') {
      filteredTasks = tasks.filter((t) => t.completed);
    } else if (filter === 'pending') {
      filteredTasks = tasks.filter((t) => !t.completed);
    }

    if (searchQuery.trim().length > 0) {
      filteredTasks = filteredTasks.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredTasks;
  };

  const styles = createStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Icon
          name={isDarkMode ? 'light-mode' : 'dark-mode'}
          size={24}
          color={isDarkMode ? '#ffffff' : '#000000'}
        />
      </TouchableOpacity>

      <Text style={styles.title}>My To-Do List</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks"
        placeholderTextColor={isDarkMode ? '#cccccc' : '#666666'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
          onPress={() => setFilter('completed')}
        >
          <Text style={styles.filterText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}
          onPress={() => setFilter('pending')}
        >
          <Text style={styles.filterText}>Pending</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getFilteredTasks()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={item.completed ? styles.completedTask : styles.task}>
              {item.title}
            </Text>
            <View style={styles.actionButtons}>
              {!item.completed && (
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => markTaskComplete(item.id)}
                >
                  <Icon name="check" size={24} color="green" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editTask(item.id, item.title)}
              >
                <Icon name="edit" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(item.id)}
              >
                <Icon name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
      >
        <Icon name="add" size={24} color="#ffffff" />
        <Text style={styles.fabLabel}>Add Task</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editMode ? 'Edit Task' : 'Add Task'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task"
              placeholderTextColor={isDarkMode ? '#cccccc' : '#666666'}
              value={task}
              onChangeText={setTask}
            />
            <TouchableOpacity style={styles.modalButton} onPress={saveTask}>
              <Text style={styles.modalButtonText}>
                {editMode ? 'Update Task' : 'Add Task'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      textAlign: 'center',
      marginBottom: 16,
    },
    searchInput: {
      backgroundColor: isDarkMode ? '#333333' : '#f0f0f0',
      color: isDarkMode ? '#ffffff' : '#000000',
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
    },
    filterButton: {
      padding: 10,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#333333' : '#f0f0f0',
    },
    activeFilter: {
      backgroundColor: isDarkMode ? '#555555' : '#d0d0d0',
    },
    filterText: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    taskContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 12,
      marginBottom: 8,
      backgroundColor: isDarkMode ? '#333333' : '#f9f9f9',
      borderRadius: 8,
    },
    task: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    completedTask: {
      color: isDarkMode ? '#888888' : '#888888',
      textDecorationLine: 'line-through',
    },
    actionButtons: {
      flexDirection: 'row',
    },
    fab: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: '#6200ee',
      borderRadius: 50,
    },
    fabLabel: {
      color: '#ffffff',
      marginLeft: 8,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: '80%',
      padding: 16,
      backgroundColor: isDarkMode ? '#333333' : '#ffffff',
      borderRadius: 8,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      backgroundColor: isDarkMode ? '#555555' : '#f0f0f0',
      color: isDarkMode ? '#ffffff' : '#000000',
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
    },
    modalButton: {
      backgroundColor: '#6200ee',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    modalButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
    modalCloseButton: {
      marginTop: 16,
      alignItems: 'center',
    },
    modalCloseButtonText: {
      color: isDarkMode ? '#cccccc' : '#666666',
    },
  });

export default App;
