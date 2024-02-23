DROP TABLE IF EXISTS vinyl;

CREATE TABLE vinyl (
  id INT AUTO_INCREMENT PRIMARY KEY,
  artist VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL
);

INSERT INTO vinyl VALUES (
  null, 
  "Prince",
  "Purple Rain"
), (
	null, 
    "Tom Petty",
    "Wildflowers"
);