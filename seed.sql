INSERT INTO users (name, email, password) VALUES (
'Rapha',
'rapha@mail.com',
'123'
);

INSERT INTO tasks (tittle, status, date, user_email) VALUES (
'estudar',
FALSE,
CURRENT_DATE,
'rapha@mail.com'
);

INSERT INTO tasks (tittle, status, date, user_email) VALUES (
'jogar',
FALSE,
CURRENT_DATE,
'rapha@mail.com'
);
