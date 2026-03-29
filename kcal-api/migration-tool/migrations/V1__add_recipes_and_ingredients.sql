SET FOREIGN_KEY_CHECKS = 0;

-- 1. Drop and recreate foreign keys to match new lowercase table names

-- Consumed_Foods
ALTER TABLE Consumed_Foods
  DROP FOREIGN KEY Consumed_Foods_ibfk_1,
  DROP FOREIGN KEY fk_user_id_Consumed_Foods;

ALTER TABLE Consumed_Foods
  ADD CONSTRAINT Consumed_Foods_ibfk_1
    FOREIGN KEY (food_id) REFERENCES Foods(id),
  ADD CONSTRAINT fk_user_id_Consumed_Foods
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Foods
ALTER TABLE Foods
  DROP FOREIGN KEY fk_user_id_Foods;

ALTER TABLE Foods
  ADD CONSTRAINT fk_user_id_Foods
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Kcal_Logs
ALTER TABLE Kcal_Logs
  DROP FOREIGN KEY fk_user_id_Kcal_Logs;

ALTER TABLE Kcal_Logs
  ADD CONSTRAINT fk_user_id_Kcal_Logs
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- 2. Create new tables

CREATE TABLE Recipes (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name TINYTEXT NOT NULL,
  instructions TEXT,
  measure_quantity INT UNSIGNED DEFAULT NULL,
  units TINYTEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  makes_quantity INT UNSIGNED DEFAULT NULL,
  PRIMARY KEY (id),
  KEY recipes_userId (user_id),
  CONSTRAINT recipes_userId
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Ingredients (
  id INT NOT NULL AUTO_INCREMENT,
  recipe_id INT NOT NULL,
  food_id INT UNSIGNED DEFAULT NULL,
  name TINYTEXT NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  units TINYTEXT,
  sort_order TINYINT UNSIGNED DEFAULT NULL,
  ingredient_group TINYTEXT,
  PRIMARY KEY (id),
  KEY food_id (food_id),
  KEY ingredients_recipeId (recipe_id),
  CONSTRAINT ingredients_recipeId
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
