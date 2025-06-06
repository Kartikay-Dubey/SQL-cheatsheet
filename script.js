document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("outputModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalOutput = document.getElementById("modalOutput");
    const closeModal = document.getElementById("closeModal");

    // SQL Commands and Sample Outputs
    const commandOutputs = {

          // CREATE TABLE Command
          "CREATE TABLE students (id INT, name VARCHAR(50), age INT)": `
          <h3>Before Execution</h3>
          <p>No table exists</p>
          
          <h3>After Execution</h3>
          <table>
              <tr><th>Column</th><th>Type</th></tr>
              <tr><td>id</td><td>INT</td></tr>
              <tr><td>name</td><td>VARCHAR(50)</td></tr>
              <tr><td>age</td><td>INT</td></tr>
          </table>
      `,

      // ALTER TABLE Command
      "ALTER TABLE students ADD email VARCHAR(100)": `
          <h3>Before Execution</h3>
          <table>
              <tr><th>Column</th><th>Type</th></tr>
              <tr><td>id</td><td>INT</td></tr>
              <tr><td>name</td><td>VARCHAR(50)</td></tr>
              <tr><td>age</td><td>INT</td></tr>
          </table>

          <h3>After Execution</h3>
          <table>
              <tr><th>Column</th><th>Type</th></tr>
              <tr><td>id</td><td>INT</td></tr>
              <tr><td>name</td><td>VARCHAR(50)</td></tr>
              <tr><td>age</td><td>INT</td></tr>
              <tr><td>email</td><td>VARCHAR(100)</td></tr>
          </table>
      `,

      // DROP TABLE Command
      "DROP TABLE students": `
          <h3>Before Execution</h3>
          <table>
              <tr><th>Column</th><th>Type</th></tr>
              <tr><td>id</td><td>INT</td></tr>
              <tr><td>name</td><td>VARCHAR(50)</td></tr>
              <tr><td>age</td><td>INT</td></tr>
          </table>

          <h3>After Execution</h3>
          <p>Table 'students' has been dropped</p>
      `,

      // TRUNCATE TABLE Command
      "TRUNCATE TABLE students": `
          <h3>Before Execution</h3>
          <table>
              <tr><th>ID</th><th>Name</th><th>Age</th></tr>
              <tr><td>1</td><td>Rahul</td><td>20</td></tr>
              <tr><td>2</td><td>Sneha</td><td>21</td></tr>
              <tr><td>3</td><td>Amit</td><td>22</td></tr>
          </table>

          <h3>After Execution</h3>
          <table>
              <tr><th>ID</th><th>Name</th><th>Age</th></tr>
          </table>
          <p>All rows deleted, table structure preserved</p>
      `,

      // RENAME TABLE Command
      "RENAME TABLE students TO student_info": `
          <h3>Before Execution</h3>
          <p>Table Name: students</p>
          <table>
              <tr><th>ID</th><th>Name</th><th>Age</th></tr>
              <tr><td>1</td><td>Rahul</td><td>20</td></tr>
              <tr><td>2</td><td>Sneha</td><td>21</td></tr>
          </table>

          <h3>After Execution</h3>
          <p>Table Name: student_info</p>
          <table>
              <tr><th>ID</th><th>Name</th><th>Age</th></tr>
              <tr><td>1</td><td>Rahul</td><td>20</td></tr>
              <tr><td>2</td><td>Sneha</td><td>21</td></tr>
          </table>
      `,

      
        // Fix INSERT command key
        "INSERT INTO students (id, name) VALUES (1, 'John')": `
            <h3>Before Execution</h3>
            <table>
                <tr><th>ID</th><th>Name</th></tr>
                <tr><td>1</td><td>Rahul</td></tr>
                <tr><td>2</td><td>Sneha</td></tr>
            </table>
            <h3>After Execution</h3>
            <table>
                <tr><th>ID</th><th>Name</th></tr>
                <tr><td>1</td><td>Rahul</td></tr>
                <tr><td>2</td><td>Sneha</td></tr>
                <tr><td>1</td><td>John</td></tr>
            </table>
        `,
      // Fix UPDATE command to match exactly
      "UPDATE students SET name = 'Jane' WHERE id = 1": `
      <h3>Before Execution</h3>
      <table>
          <tr><th>ID</th><th>Name</th><th>Age</th></tr>
          <tr><td>1</td><td>John</td><td>20</td></tr>
          <tr><td>2</td><td>Sneha</td><td>21</td></tr>
          <tr><td>3</td><td>Amit</td><td>22</td></tr>
      </table>
      <h3>After Execution</h3>
      <table>
          <tr><th>ID</th><th>Name</th><th>Age</th></tr>
          <tr><td>1</td><td>Jane</td><td>20</td></tr>
          <tr><td>2</td><td>Sneha</td><td>21</td></tr>
          <tr><td>3</td><td>Amit</td><td>22</td></tr>
      </table>
  `,

  // Fix DELETE command to match exactly
  "DELETE FROM students WHERE id = 1": `
      <h3>Before Execution</h3>
      <table>
          <tr><th>ID</th><th>Name</th><th>Age</th></tr>
          <tr><td>1</td><td>Jane</td><td>20</td></tr>
          <tr><td>2</td><td>Sneha</td><td>21</td></tr>
          <tr><td>3</td><td>Amit</td><td>22</td></tr>
      </table>
      <h3>After Execution</h3>
      <table>
          <tr><th>ID</th><th>Name</th><th>Age</th></tr>
          <tr><td>2</td><td>Sneha</td><td>21</td></tr>
          <tr><td>3</td><td>Amit</td><td>22</td></tr>
      </table>
  `,
    

        "SELECT * FROM students": `
            <table>
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th></tr>
                <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td></tr>
                <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td></tr>
                <tr><td>3</td><td>Amit</td><td>amit@example.com</td><td>22</td></tr>
            </table>
        `,
        "SELECT DISTINCT name FROM students": `
            <table>
                <tr><th>Name</th></tr>
                <tr><td>Rahul</td></tr>
                <tr><td>Sneha</td></tr>
                <tr><td>Amit</td></tr>
            </table>
        `,
        "SELECT name FROM students ORDER BY name ASC": `
            <table>
                <tr><th>Name</th></tr>
                <tr><td>Amit</td></tr>
                <tr><td>Rahul</td></tr>
                <tr><td>Sneha</td></tr>
            </table>
        `,
        "SELECT dept, COUNT(*) FROM students GROUP BY dept": `
            <table>
                <tr><th>Department</th><th>Count</th></tr>
                <tr><td>Science</td><td>2</td></tr>
                <tr><td>Arts</td><td>1</td></tr>
            </table>
        `,
        "SELECT dept, COUNT(*) FROM students GROUP BY dept HAVING COUNT(*) > 2": `
            <table>
                <tr><th>Department</th><th>Count</th></tr>
                <tr><td>Science</td><td>3</td></tr>
            </table>
        `,
        "SELECT name, email FROM students WHERE id = 1": `
            <table>
                <tr><th>Name</th><th>Email</th></tr>
                <tr><td>Rahul</td><td>rahul@example.com</td></tr>
            </table>
        `,
        "SELECT COUNT(*) FROM students": `
            <table>
                <tr><th>COUNT</th></tr>
                <tr><td>3</td></tr>
            </table>
        `,
        "SELECT email FROM students WHERE age > 20": `
            <table>
                <tr><th>Email</th></tr>
                <tr><td>sneha@example.com</td></tr>
                <tr><td>amit@example.com</td></tr>
            </table>
        `,
        "SELECT NOW()": `
            <table>
                <tr><th>NOW</th></tr>
                <tr><td>2025-04-11 11:04:00</td></tr>
            </table>
        `,
        // Base tables for joins
        "BASE TABLES": `
            <h3>Students Table</h3>
            <table>
                <tr><th>Student_ID</th><th>Name</th><th>Dept_ID</th></tr>
                <tr><td>1</td><td>Rahul</td><td>101</td></tr>
                <tr><td>2</td><td>Sneha</td><td>102</td></tr>
                <tr><td>3</td><td>Amit</td><td>103</td></tr>
                <tr><td>4</td><td>Priya</td><td>NULL</td></tr>
            </table>
            <h3>Departments Table</h3>
            <table>
                <tr><th>Dept_ID</th><th>Dept_Name</th><th>Location</th></tr>
                <tr><td>101</td><td>Computer Science</td><td>Block A</td></tr>
                <tr><td>102</td><td>Electronics</td><td>Block B</td></tr>
                <tr><td>104</td><td>Mechanical</td><td>Block C</td></tr>
            </table>
        `,

        // INNER JOIN
        // INNER JOIN - Fixed command key
        "SELECT s.name, d.dept_name FROM students s INNER JOIN departments d ON s.dept_id = d.id": `
            <h3>Description</h3>
            <p>INNER JOIN: Returns only the matching records from both tables</p>
            <h3>Output Table</h3>
            <table>
                <tr><th>Name</th><th>Dept_Name</th></tr>
                <tr><td>Rahul</td><td>Computer Science</td></tr>
                <tr><td>Sneha</td><td>Electronics</td></tr>
            </table>
            <p class="note">Note: Only shows students who have matching department IDs</p>
        `,

        // LEFT JOIN - Fixed command key
        "SELECT s.name, d.dept_name FROM students s LEFT JOIN departments d ON s.dept_id = d.id": `
            <h3>Description</h3>
            <p>LEFT JOIN: Returns all records from left table (Students) and matching records from right table (Departments)</p>
            <h3>Output Table</h3>
            <table>
                <tr><th>Name</th><th>Dept_Name</th></tr>
                <tr><td>Rahul</td><td>Computer Science</td></tr>
                <tr><td>Sneha</td><td>Electronics</td></tr>
                <tr><td>Amit</td><td>NULL</td></tr>
                <tr><td>Priya</td><td>NULL</td></tr>
            </table>
            <p class="note">Note: Shows all students, even those without departments</p>
        `,

        // RIGHT JOIN - Fixed command key
        "SELECT s.name, d.dept_name FROM students s RIGHT JOIN departments d ON s.dept_id = d.id": `
            <h3>Description</h3>
            <p>RIGHT JOIN: Returns all records from right table (Departments) and matching records from left table (Students)</p>
            <h3>Output Table</h3>
            <table>
                <tr><th>Name</th><th>Dept_Name</th></tr>
                <tr><td>Rahul</td><td>Computer Science</td></tr>
                <tr><td>Sneha</td><td>Electronics</td></tr>
                <tr><td>NULL</td><td>Mechanical</td></tr>
            </table>
            <p class="note">Note: Shows all departments, even those without students</p>
        `,

        // FULL JOIN - Fixed command key
        "SELECT s.name, d.dept_name FROM students s FULL JOIN departments d ON s.dept_id = d.id": `
            <h3>Description</h3>
            <p>FULL JOIN: Returns all records from both tables, matching where possible</p>
            <h3>Output Table</h3>
            <table>
                <tr><th>Name</th><th>Dept_Name</th></tr>
                <tr><td>Rahul</td><td>Computer Science</td></tr>
                <tr><td>Sneha</td><td>Electronics</td></tr>
                <tr><td>Amit</td><td>NULL</td></tr>
                <tr><td>Priya</td><td>NULL</td></tr>
                <tr><td>NULL</td><td>Mechanical</td></tr>
            </table>
            <p class="note">Note: Shows all records from both tables, with NULL for non-matching records</p>
        `,

            // ... existing code ...

    // UNION operation
    "SELECT name FROM students UNION SELECT name FROM teachers": `
    <h3>Description</h3>
    <p>UNION: Combines results from both tables and removes duplicates</p>
    
    <h3>Input Tables</h3>
    <h4>Students Table</h4>
    <table>
        <tr><th>ID</th><th>Name</th></tr>
        <tr><td>1</td><td>Rahul</td></tr>
        <tr><td>2</td><td>Sneha</td></tr>
        <tr><td>3</td><td>Amit</td></tr>
    </table>
    
    <h4>Teachers Table</h4>
    <table>
        <tr><th>ID</th><th>Name</th></tr>
        <tr><td>1</td><td>Amit</td></tr>
        <tr><td>2</td><td>Priya</td></tr>
        <tr><td>3</td><td>Rahul</td></tr>
    </table>

    <h3>Output Table</h3>
    <table>
        <tr><th>Name</th></tr>
        <tr><td>Amit</td></tr>
        <tr><td>Priya</td></tr>
        <tr><td>Rahul</td></tr>
        <tr><td>Sneha</td></tr>
    </table>
    <p class="note">Note: Duplicate names (Amit, Rahul) appear only once, and results are sorted</p>
`,

// UNION ALL operation
"SELECT name FROM students UNION ALL SELECT name FROM teachers": `
    <h3>Description</h3>
    <p>UNION ALL: Combines results from both tables including duplicates</p>
    
    <h3>Input Tables</h3>
    <h4>Students Table</h4>
    <table>
        <tr><th>ID</th><th>Name</th></tr>
        <tr><td>1</td><td>Rahul</td></tr>
        <tr><td>2</td><td>Sneha</td></tr>
        <tr><td>3</td><td>Amit</td></tr>
    </table>
    
    <h4>Teachers Table</h4>
    <table>
        <tr><th>ID</th><th>Name</th></tr>
        <tr><td>1</td><td>Amit</td></tr>
        <tr><td>2</td><td>Priya</td></tr>
        <tr><td>3</td><td>Rahul</td></tr>
    </table>

    <h3>Output Table</h3>
    <table>
        <tr><th>Name</th></tr>
        <tr><td>Rahul</td></tr>
        <tr><td>Sneha</td></tr>
        <tr><td>Amit</td></tr>
        <tr><td>Amit</td></tr>
        <tr><td>Priya</td></tr>
        <tr><td>Rahul</td></tr>
    </table>
    <p class="note">Note: All names appear, including duplicates (Amit and Rahul appear twice)</p>
`,

// ... rest of your code ...


        // Base table for inbuilt functions
        // Change this key from "BASE TABLES" to "INBUILT_FUNCTIONS_TABLE"
        "INBUILT_FUNCTIONS_TABLE": `
            <h3>Students Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th></tr>
                <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td></tr>
                <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td></tr>
                <tr><td>3</td><td>Amit</td><td>amit@example.com</td><td>22</td></tr>
            </table>
        `,

        // CONCAT Function
        "SELECT CONCAT(name, ' ', email) AS full_info FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Email</th></tr>
                <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td></tr>
                <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td></tr>
                <tr><td>3</td><td>Amit</td><td>amit@example.com</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>Full_Info</th></tr>
                <tr><td>Rahul rahul@example.com</td></tr>
                <tr><td>Sneha sneha@example.com</td></tr>
                <tr><td>Amit amit@example.com</td></tr>
            </table>
        `,

        // UPPER Function
        "SELECT UPPER(name) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>amit@example.com</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>UPPER(name)</th></tr>
                <tr><td>RAHUL</td></tr>
                <tr><td>SNEHA</td></tr>
                <tr><td>AMIT</td></tr>
            </table>
        `,

        // LENGTH Function
        "SELECT LENGTH(name) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>amit@example.com</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>LENGTH(name)</th></tr>
                <tr><td>5</td></tr>
                <tr><td>5</td></tr>
                <tr><td>4</td></tr>
            </table>
        `,
        
        // CHAR_LENGTH Function
        "SELECT CHAR_LENGTH(name) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>amit@example.com</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>CHAR_LENGTH(name)</th></tr>
                <tr><td>5</td></tr>
                <tr><td>5</td></tr>
                <tr><td>4</td></tr>
            </table>
        `,
        
        // CHARACTER_LENGTH Function (same as CHAR_LENGTH)
        "SELECT CHARACTER_LENGTH(name) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>amit@example.com</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>CHARACTER_LENGTH(name)</th></tr>
                <tr><td>5</td></tr>
                <tr><td>5</td></tr>
                <tr><td>4</td></tr>
            </table>
        `,
        
        // BIT_LENGTH Function
        "SELECT BIT_LENGTH(name) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>amit@example.com</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>BIT_LENGTH(name)</th></tr>
                <tr><td>40</td></tr>
                <tr><td>40</td></tr>
                <tr><td>32</td></tr>
            </table>
        `,
        
        // SUBSTRING Function
        "SELECT SUBSTRING(name, 1, 3) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>amit@example.com</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>SUBSTRING(name, 1, 3)</th></tr>
                <tr><td>Rah</td></tr>
                <tr><td>Sne</td></tr>
                <tr><td>Ami</td></tr>
            </table>
        `,
        
        // Aggregate Functions
        "SELECT COUNT(*) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>amit@example.com</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>COUNT(*)</th></tr>
                <tr><td>3</td></tr>
            </table>
        `,
        
        "SELECT AVG(marks) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>amit@example.com</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>AVG(marks)</th></tr>
                <tr><td>85</td></tr>
            </table>
        `,
        
        "SELECT AVG(age) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>AVG(age)</th></tr>
                <tr><td>21</td></tr>
            </table>
        `,
        
        "SELECT SUM(age) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>SUM(age)</th></tr>
                <tr><td>63</td></tr>
            </table>
        `,
        
        "SELECT SUM(marks) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>SUM(marks)</th></tr>
                <tr><td>255</td></tr>
            </table>
        `,
        
        "SELECT MIN(age) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>MIN(age)</th></tr>
                <tr><td>20</td></tr>
            </table>
        `,
        
        "SELECT MIN(marks) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>MIN(marks)</th></tr>
                <tr><td>78</td></tr>
            </table>
        `,
        
        "SELECT MAX(age) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>MAX(age)</th></tr>
                <tr><td>22</td></tr>
            </table>
        `,
        
        "SELECT MAX(marks) FROM students": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>MAX(marks)</th></tr>
                <tr><td>92</td></tr>
            </table>
        `,
        
        "SELECT dept, AVG(age) FROM students GROUP BY dept": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Dept</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>Science</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>Arts</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>Science</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>Dept</th><th>AVG(age)</th></tr>
                <tr><td>Science</td><td>21</td></tr>
                <tr><td>Arts</td><td>21</td></tr>
            </table>
        `,

        "SELECT dept, AVG(marks) FROM students GROUP BY dept": `
            <h3>Input Table</h3>
            <table>
                <tr><th>ID</th><th>Name</th><th>Dept</th><th>Age</th><th>Marks</th></tr>
                <tr><td>1</td><td>Rahul</td><td>Science</td><td>20</td><td>85</td></tr>
                <tr><td>2</td><td>Sneha</td><td>Arts</td><td>21</td><td>92</td></tr>
                <tr><td>3</td><td>Amit</td><td>Science</td><td>22</td><td>78</td></tr>
            </table>
            <h3>Output Table</h3>
            <table>
                <tr><th>Dept</th><th>AVG(marks)</th></tr>
                <tr><td>Science</td><td>81.5</td></tr>
                <tr><td>Arts</td><td>92</td></tr>
            </table>
        `,

                // IF Function
                "SELECT IF(marks > 80, 'Pass', 'Fail') AS result FROM students": `
                <h3>Input Table</h3>
                <table>
                    <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Marks</th></tr>
                    <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td><td>85</td></tr>
                    <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td><td>92</td></tr>
                    <tr><td>3</td><td>Amit</td><td>amit@example.com</td><td>22</td><td>78</td></tr>
                </table>
                <h3>Output Table</h3>
                <table>
                    <tr><th>result</th></tr>
                    <tr><td>Pass</td></tr>
                    <tr><td>Pass</td></tr>
                    <tr><td>Fail</td></tr>
                </table>
            `,
            
            // IFNULL Function
            "SELECT name, IFNULL(email, 'No Email') AS contact FROM students": `
                <h3>Input Table</h3>
                <table>
                    <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Marks</th></tr>
                    <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td><td>85</td></tr>
                    <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td><td>92</td></tr>
                    <tr><td>3</td><td>Amit</td><td>NULL</td><td>22</td><td>78</td></tr>
                </table>
                <h3>Output Table</h3>
                <table>
                    <tr><th>Name</th><th>contact</th></tr>
                    <tr><td>Rahul</td><td>rahul@example.com</td></tr>
                    <tr><td>Sneha</td><td>sneha@example.com</td></tr>
                    <tr><td>Amit</td><td>No Email</td></tr>
                </table>
            `,
            
            // COALESCE Function
            "SELECT name, COALESCE(email, phone, 'No Contact') as contact FROM students": `
                <h3>Input Table</h3>
                <table>
                    <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Age</th><th>Marks</th></tr>
                    <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>NULL</td><td>20</td><td>85</td></tr>
                    <tr><td>2</td><td>Sneha</td><td>NULL</td><td>9876543210</td><td>21</td><td>92</td></tr>
                    <tr><td>3</td><td>Amit</td><td>NULL</td><td>NULL</td><td>22</td><td>78</td></tr>
                </table>
                <h3>Output Table</h3>
                <table>
                    <tr><th>Name</th><th>contact</th></tr>
                    <tr><td>Rahul</td><td>rahul@example.com</td></tr>
                    <tr><td>Sneha</td><td>9876543210</td></tr>
                    <tr><td>Amit</td><td>No Contact</td></tr>
                </table>
            `,
            
            // CASE Function
            "SELECT name, marks, CASE WHEN marks >= 90 THEN 'A' WHEN marks >= 80 THEN 'B' ELSE 'C' END AS grade FROM students": `
                <h3>Input Table</h3>
                <table>
                    <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Marks</th></tr>
                    <tr><td>1</td><td>Rahul</td><td>rahul@example.com</td><td>20</td><td>85</td></tr>
                    <tr><td>2</td><td>Sneha</td><td>sneha@example.com</td><td>21</td><td>92</td></tr>
                    <tr><td>3</td><td>Amit</td><td>amit@example.com</td><td>22</td><td>78</td></tr>
                </table>
                <h3>Output Table</h3>
                <table>
                    <tr><th>Name</th><th>Marks</th><th>grade</th></tr>
                    <tr><td>Rahul</td><td>85</td><td>B</td></tr>
                    <tr><td>Sneha</td><td>92</td><td>A</td></tr>
                    <tr><td>Amit</td><td>78</td><td>C</td></tr>
                </table>
            `,
            
    };

    // Utility: Normalize command by removing `;` and trimming
    const normalizeCommand = (cmd) => cmd.replace(/;$/, "").trim();

    // Add click listeners to all <code> tags
    document.querySelectorAll("code").forEach(code => {
        code.style.cursor = "pointer";
        code.addEventListener("click", () => {
            const rawCommand = code.innerText;
            const normalizedCommand = normalizeCommand(rawCommand);
            modalTitle.innerText = rawCommand;
            
            // Only show the specific command output without the BASE TABLES
            modalOutput.innerHTML = commandOutputs[normalizedCommand] || `<p>No output available for this command.</p>`;
            modal.style.display = "flex";
        });
    });

    // Modal Close
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});









document.addEventListener('DOMContentLoaded', function () {
    const examples = document.querySelectorAll('.example');
  
    examples.forEach(example => {
      example.addEventListener('click', function () {
        const id = this.getAttribute('data-command-id');
  
        // Remove existing result tables if any
        const oldTables = this.parentElement.querySelectorAll('.result-table, .syntax-table');
        oldTables.forEach(t => t.remove());
  
        // Create syntax table
        const syntaxTable = document.createElement('table');
        syntaxTable.className = 'syntax-table';
        syntaxTable.innerHTML = getSyntaxHTML(id);
  
        // Create result table
        const resultTable = document.createElement('table');
        resultTable.className = 'result-table';
        resultTable.innerHTML = getResultHTML(id);
  
        // Insert after the clicked row
        this.parentElement.insertAdjacentElement('afterend', resultTable);
        this.parentElement.insertAdjacentElement('afterend', syntaxTable);
      });
    });
  });
  
  // Function returning syntax table HTML
  function getSyntaxHTML(id) {
    switch (id) {
      case 'select-1':
        return `
          <tr><th>Command</th><th>Description</th></tr>
          <tr><td>SELECT * FROM Students;</td><td>Fetches all data from Students table.</td></tr>
        `;
      // Add more cases here
      default:
        return `<tr><td colspan="2">No syntax info available.</td></tr>`;
    }
  }
  
  // Function returning result table HTML
  function getResultHTML(id) {
    switch (id) {
      case 'select-1':
        return `
          <tr><th>ID</th><th>Name</th><th>Age</th></tr>
          <tr><td>1</td><td>John</td><td>21</td></tr>
          <tr><td>2</td><td>Jane</td><td>22</td></tr>
        `;
      // Add more cases here
      default:
        return `<tr><td colspan="3">No result available.</td></tr>`;
    }
  }
