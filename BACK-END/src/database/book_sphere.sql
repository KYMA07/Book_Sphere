USE book_sphere;

INSERT IGNORE INTO users (username, password_hash, email, role)
VALUES 
('admin1', 'hashedpass123', 'admin@mail.com', 'Admin'),
('lib1', 'hashedpass456', 'librarian@mail.com', 'Librarian');

-- ======================
-- INSERT 20 SAMPLE STUDENTS (you can expand to 100)
-- ======================
INSERT IGNORE INTO students (student_number, full_name, course, year_level, email)
VALUES
('2025-001', 'Aaron Dela Cruz', 'BSIT', '11', 'aaron001@mail.com'),
('2025-002', 'Bea Santos', 'BSCS', '11', 'bea002@mail.com'),
('2025-003', 'Carlo Ramirez', 'BSIT', '11', 'carlo003@mail.com'),
('2025-004', 'Diana Lopez', 'BSIT', '12', 'diana004@mail.com'),
('2025-005', 'Ethan Garcia', 'BSCS', '11', 'ethan005@mail.com'),
('2025-006', 'Faith Mendoza', 'BSIT', '12', 'faith006@mail.com'),
('2025-007', 'Gabriel Rivera', 'BSIT', '11', 'gabriel007@mail.com'),
('2025-008', 'Hannah Castillo', 'BSCS', '12', 'hannah008@mail.com'),
('2025-009', 'Ivan Reyes', 'BSIT', '11', 'ivan009@mail.com'),
('2025-010', 'Jasmine Cruz', 'BSCS', '11', 'jasmine010@mail.com'),
('2025-011', 'Kevin Flores', 'BSIT', '11', 'kevin011@mail.com'),
('2025-012', 'Lara Gutierrez', 'BSIT', '12', 'lara012@mail.com'),
('2025-013', 'Marco Herrera', 'BSCS', '11', 'marco013@mail.com'),
('2025-014', 'Nina Alvarez', 'BSIT', '12', 'nina014@mail.com'),
('2025-015', 'Oscar Villanueva', 'BSIT', '11', 'oscar015@mail.com'),
('2025-016', 'Patricia Ramos', 'BSCS', '11', 'patricia016@mail.com'),
('2025-017', 'Quinn Bautista', 'BSIT', '12', 'quinn017@mail.com'),
('2025-018', 'Rafael Santos', 'BSIT', '11', 'rafael018@mail.com'),
('2025-019', 'Sophia Jimenez', 'BSCS', '12', 'sophia019@mail.com'),
('2025-020', 'Tyler Navarro', 'BSIT', '11', 'tyler020@mail.com'),
('2025-021', 'Uma Villarin', 'BSIT', '12', 'uma021@mail.com'),
('2025-022', 'Victor Lim', 'BSCS', '11', 'victor022@mail.com'),
('2025-023', 'Wendy Perez', 'BSIT', '12', 'wendy023@mail.com'),
('2025-024', 'Xander Ramos', 'BSIT', '11', 'xander024@mail.com'),
('2025-025', 'Yara Cruz', 'BSCS', '11', 'yara025@mail.com'),
('2025-026', 'Zachary Mendoza', 'BSIT', '12', 'zach026@mail.com'),
('2025-027', 'Allan Castillo', 'BSIT', '11', 'allan027@mail.com'),
('2025-028', 'Bella Santiago', 'BSCS', '12', 'bella028@mail.com'),
('2025-029', 'Calvin Robles', 'BSIT', '11', 'calvin029@mail.com'),
('2025-030', 'Denise Villanueva', 'BSIT', '12', 'denise030@mail.com'),
('2025-031', 'Eli Cruz', 'BSCS', '11', 'eli031@mail.com'),
('2025-032', 'Fiona Gonzales', 'BSIT', '12', 'fiona032@mail.com'),
('2025-033', 'Gabe Santos', 'BSIT', '11', 'gabe033@mail.com'),
('2025-034', 'Hazel Torres', 'BSCS', '11', 'hazel034@mail.com'),
('2025-035', 'Ian Gutierrez', 'BSIT', '12', 'ian035@mail.com'),
('2025-036', 'Jade Bautista', 'BSIT', '11', 'jade036@mail.com'),
('2025-037', 'Kurt Navarro', 'BSCS', '12', 'kurt037@mail.com'),
('2025-038', 'Lina Rivera', 'BSIT', '11', 'lina038@mail.com'),
('2025-039', 'Miko Santos', 'BSIT', '12', 'miko039@mail.com'),
('2025-040', 'Nora Jimenez', 'BSCS', '11', 'nora040@mail.com'),
('2025-041', 'Owen Lopez', 'BSIT', '11', 'owen041@mail.com'),
('2025-042', 'Pia Cruz', 'BSIT', '12', 'pia042@mail.com'),
('2025-043', 'Rico Castillo', 'BSCS', '11', 'rico043@mail.com'),
('2025-044', 'Sofia Mendoza', 'BSIT', '12', 'sofia044@mail.com'),
('2025-045', 'Troy Villanueva', 'BSIT', '11', 'troy045@mail.com'),
('2025-046', 'Una Perez', 'BSCS', '12', 'una046@mail.com'),
('2025-047', 'Vince Ramos', 'BSIT', '11', 'vince047@mail.com'),
('2025-048', 'Wena Cruz', 'BSIT', '12', 'wena048@mail.com'),
('2025-049', 'Xena Garcia', 'BSCS', '11', 'xena049@mail.com'),
('2025-050', 'Yves Lim', 'BSIT', '12', 'yves050@mail.com'),
('2025-051', 'Zara Navarro', 'BSIT', '11', 'zara051@mail.com'),
('2025-052', 'Alex Ramos', 'BSCS', '12', 'alex052@mail.com'),
('2025-053', 'Brianna Santos', 'BSIT', '11', 'brianna053@mail.com'),
('2025-054', 'Clyde Mendoza', 'BSIT', '12', 'clyde054@mail.com'),
('2025-055', 'Daisy Villarin', 'BSCS', '11', 'daisy055@mail.com'),
('2025-056', 'Edward Robles', 'BSIT', '12', 'edward056@mail.com'),
('2025-057', 'Faith Lopez', 'BSIT', '11', 'faith057@mail.com'),
('2025-058', 'Gino Cruz', 'BSCS', '12', 'gino058@mail.com'),
('2025-059', 'Hera Bautista', 'BSIT', '11', 'hera059@mail.com'),
('2025-060', 'Ivan Torres', 'BSIT', '12', 'ivan060@mail.com'),
('2025-061', 'Jessa Mendoza', 'BSCS', '11', 'jessa061@mail.com'),
('2025-062', 'Kyle Gutierrez', 'BSIT', '11', 'kyle062@mail.com'),
('2025-063', 'Lara Villanueva', 'BSCS', '12', 'lara063@mail.com'),
('2025-064', 'Mitch Santos', 'BSIT', '11', 'mitch064@mail.com'),
('2025-065', 'Nate Lopez', 'BSIT', '12', 'nate065@mail.com'),
('2025-066', 'Olive Perez', 'BSCS', '11', 'olive066@mail.com'),
('2025-067', 'Paul Rivera', 'BSIT', '12', 'paul067@mail.com'),
('2025-068', 'Queen Cruz', 'BSIT', '11', 'queen068@mail.com'),
('2025-069', 'Ralph Castillo', 'BSCS', '12', 'ralph069@mail.com'),
('2025-070', 'Sandy Villarin', 'BSIT', '11', 'sandy070@mail.com'),
('2025-071', 'Tim Mendoza', 'BSIT', '12', 'tim071@mail.com'),
('2025-072', 'Ulyssa Ramos', 'BSCS', '11', 'ulyssa072@mail.com'),
('2025-073', 'Vince Navarro', 'BSIT', '12', 'vince073@mail.com'),
('2025-074', 'Wendy Cruz', 'BSIT', '11', 'wendy074@mail.com'),
('2025-075', 'Xyra Lopez', 'BSCS', '12', 'xyra075@mail.com'),
('2025-076', 'Yohan Santos', 'BSIT', '11', 'yohan076@mail.com'),
('2025-077', 'Zelda Rivera', 'BSIT', '12', 'zelda077@mail.com'),
('2025-078', 'Alvin Cruz', 'BSCS', '11', 'alvin078@mail.com'),
('2025-079', 'Bella Villanueva', 'BSIT', '12', 'bella079@mail.com'),
('2025-080', 'Cyril Mendoza', 'BSIT', '11', 'cyril080@mail.com'),
('2025-081', 'Diane Gutierrez', 'BSCS', '12', 'diane081@mail.com'),
('2025-082', 'Earl Santos', 'BSIT', '11', 'earl082@mail.com'),
('2025-083', 'Faye Lopez', 'BSIT', '12', 'faye083@mail.com'),
('2025-084', 'Glen Ramos', 'BSCS', '11', 'glen084@mail.com'),
('2025-085', 'Hana Cruz', 'BSIT', '12', 'hana085@mail.com'),
('2025-086', 'Ira Castillo', 'BSIT', '11', 'ira086@mail.com'),
('2025-087', 'Jake Villarin', 'BSCS', '12', 'jake087@mail.com'),
('2025-088', 'Kyla Rivera', 'BSIT', '11', 'kyla088@mail.com'),
('2025-089', 'Leo Jimenez', 'BSIT', '12', 'leo089@mail.com'),
('2025-090', 'Mona Santos', 'BSCS', '11', 'mona090@mail.com'),
('2025-091', 'Noah Cruz', 'BSIT', '12', 'noah091@mail.com'),
('2025-092', 'Opal Villanueva', 'BSIT', '11', 'opal092@mail.com'),
('2025-093', 'Pio Mendoza', 'BSCS', '12', 'pio093@mail.com'),
('2025-094', 'Quincy Ramos', 'BSIT', '11', 'quincy094@mail.com'),
('2025-095', 'Rina Lopez', 'BSIT', '12', 'rina095@mail.com'),
('2025-096', 'Sean Gutierrez', 'BSCS', '11', 'sean096@mail.com'),
('2025-097', 'Tina Cruz', 'BSIT', '12', 'tina097@mail.com'),
('2025-098', 'Uriel Santos', 'BSIT', '11', 'uriel098@mail.com'),
('2025-099', 'Vina Mendoza', 'BSCS', '12', 'vina099@mail.com'),
('2025-100', 'Wade Jimenez', 'BSIT', '11', 'wade100@mail.com');


-- INSERT SAMPLE BOOKS

INSERT IGNORE INTO books (title, author, category, publication_year, isbn)
VALUES
('Database Systems', 'Silberschatz', 'Computer Science', 2019, '978-0132149181'),
('Clean Code', 'Robert C. Martin', 'Programming', 2008, '978-0132350884'),
('Intro to Psychology', 'David Myers', 'Psychology', 2020, '978-1319050627'),
('Architectural Design', 'Francis D.K. Ching', 'Architecture', 2015, '978-1118745083');


-- SAMPLE BORROW RECORD

INSERT IGNORE INTO borrow_records (student_id, book_id, librarian_id, due_date)
VALUES (1, 1, 2, DATE_ADD(NOW(), INTERVAL 7 DAY));

-- Update book status to borrowed
UPDATE books SET status = 'borrowed' WHERE book_id = 1;


-- TEST OUTPUT QUERIES


-- Show all users
SELECT * FROM users;

-- Show all students
SELECT * FROM students;

-- Show all books
SELECT * FROM books;

-- Show borrow records with details
SELECT 
  br.record_id,
  s.full_name AS student,
  b.title AS book,
  u.username AS librarian,
  br.borrow_date,
  br.due_date,
  br.return_date,
  br.returned
FROM borrow_records br
JOIN students s ON br.student_id = s.student_id
JOIN books b ON br.book_id = b.book_id
LEFT JOIN users u ON br.librarian_id = u.user_id;
