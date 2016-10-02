
INSERT INTO Users (UserName, IsSuperUser)
VALUES ('ebarsalou', 1)

INSERT INTO Passwords ([Description], UserName, PasswordText)
VALUES ('Test Description', '#someaccount', '$3cr37')

INSERT INTO UserPassword (UserName, PasswordId)
VALUES ('ebarsalou', SCOPE_IDENTITY());

SELECT *
FROM Passwords

SELECT *
FROM Users

