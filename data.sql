CREATE TABLE players (
    id serial PRIMARY KEY,
    username varchar
);

CREATE TABLE score (
    id serial PRIMARY KEY,
    players_id INTEGER UNIQUE NOT NULL REFERENCES players (id) ON DELETE CASCADE,
    score int,
    gamemode varchar
    
);

-- Bellow this is test code

INSERT INTO players (username) VALUES
('jeff'),
('ron'),
('ryan'),
('bradley'),
('ayden'),
('nate'),
('nathan');

INSERT INTO score (players_id, score, gamemode) VALUES
(7, 34, 'easy'),
(6, 55, 'hard'),
(5, 53, 'medium'),
(4, 74, 'easy'),
(3, 91, 'medium'),
(2, 12, 'hard'),
(1, 66, 'hard');

