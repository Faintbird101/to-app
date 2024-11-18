To-Do App - README

Overview
---------
This is a simple To-Do app built using React Native. The app allows users to perform CRUD operations on tasks, with the added functionality of filtering and searching tasks. It also supports theme switching between light and dark modes, and stores data locally using AsyncStorage for persistent storage.

Features
--------
- Create Task: Add a new task with a title.
- Read Task: View a list of tasks.
- Update Task: Edit an existing task.
- Delete Task: Remove a task from the list.
- Filter Tasks: Filter tasks by "All", "Completed", or "Pending".
- Search Tasks: Search for tasks by title.
- Dark/Light Mode: Toggle between dark and light themes.
- Persistence: Tasks are saved locally using AsyncStorage to persist data between app restarts.

Requirements
------------
- React Native (version 0.63 or higher)
- Node.js (version 12 or higher)
- Yarn or npm (for package management)
- Android Studio or Xcode (for testing on Android/iOS)

Installation
------------
1. Clone the repository:
   git clone https://github.com/your-username/todo-app.git
   cd todo-app

2. Install dependencies:
   - Using npm:
     npm install
   - Or using yarn:
     yarn install

3. Install React Native AsyncStorage:
   If you don't have AsyncStorage installed, run:
   npm install @react-native-async-storage/async-storage
   or
   yarn add @react-native-async-storage/async-storage

4. Run the app:
   - For Android:
     npx react-native run-android
   - For iOS:
     npx react-native run-ios

Usage
-----
1. Add a Task
   - Tap the floating action button (FAB) to add a new task.
   - Enter the task title and save.

2. Edit a Task
   - Tap the "edit" icon next to a task to edit it.
   - Update the task title and save.

3. Delete a Task
   - Tap the "delete" icon next to a task to remove it.

4. Mark a Task as Completed
   - Tap the "check" icon to mark a task as completed. Completed tasks will be visually crossed out.

5. Filter Tasks
   - Use the filter options at the top to view tasks by:
     - All tasks
     - Completed tasks
     - Pending tasks

6. Search Tasks
   - Use the search bar to filter tasks by their title.

7. Toggle Theme
   - Tap the theme toggle icon to switch between light and dark modes.

Data Persistence
----------------
- Tasks are stored using AsyncStorage. The app will persist the tasks across app restarts.

License
-------
This project is licensed under the MIT License.
