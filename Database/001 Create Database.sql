USE master;

/*

DROP TABLE UserPassword;
DROP TABLE Passwords;
DROP TABLE Users;
DROP PROCEDURE GetPasswordsForUser

*/

CREATE DATABASE PassStore;
CREATE LOGIN [passsrv] WITH PASSWORD=N'pa$hw0rd', DEFAULT_DATABASE=[master], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

USE [PassStore]
CREATE USER [passsrv] FOR LOGIN [pashsrv]
ALTER ROLE [db_owner] ADD MEMBER [pashsrv]

CREATE TABLE Users (
	UserName VARCHAR(200) NOT NULL PRIMARY KEY,
	IsSuperUser BIT NOT NULL DEFAULT(0)
);

CREATE TABLE Passwords (
	PasswordId INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	[Description] VARCHAR(200) NOT NULL,
	UserName VARCHAR(200) NOT NULL,
	PasswordText VARCHAR(200) NOT NULL
);

CREATE TABLE UserPassword (
	UserName VARCHAR(200) NOT NULL,
	PasswordId INT NOT NULL,
	CONSTRAINT PK_UserPassword PRIMARY KEY (UserName, PasswordId),
	CONSTRAINT FK_UserPassword_UserName FOREIGN KEY (UserName) REFERENCES Users (UserName),
	CONSTRAINT FK_UserPassword_PasswordId FOREIGN KEY (PasswordId) REFERENCES Passwords (PasswordId)
);
GO

CREATE PROCEDURE AddPassword
	@Description VARCHAR(200),
	@UserName VARCHAR(200),
	@PasswordText VARCHAR(200)
AS BEGIN
	INSERT INTO Passwords ([Description], UserName, PasswordText)
	VALUES (@Description, @UserName, @PasswordText);

	SELECT SCOPE_IDENTITY();
END
GO

CREATE PROCEDURE RemovePassword
	@PasswordId INT
AS BEGIN
	DELETE FROM Passwords WHERE PasswordId = @PasswordId

	SELECT @@ROWCOUNT;
END
GO

CREATE PROCEDURE UpdatePassword
	@PasswordId INT,
	@Description VARCHAR(200),
	@UserName VARCHAR(200),
	@PasswordText VARCHAR(200)
AS BEGIN
	UPDATE Passwords
	SET [Description] = @Description,
	    UserName = @UserName,
		PasswordText = @PasswordText
	WHERE PasswordId = @PasswordId

	SELECT @@ROWCOUNT;
END
GO

CREATE PROCEDURE GetPasswordsForUser
	@UserName VARCHAR(200)
AS BEGIN
	DECLARE @IsSuperUser BIT = (SELECT IsSuperUser FROM Users WHERE UserName = @UserName);

	IF @IsSuperUser = 0
		SELECT p.PasswordId, p.[Description], p.PasswordText, p.UserName
		FROM Passwords p
		JOIN UserPassword up ON p.PasswordId = up.PasswordId
		WHERE up.UserName = @UserName
	ELSE
		SELECT p.PasswordId, p.[Description], p.PasswordText, p.UserName
		FROM Passwords p
END
GO

CREATE PROCEDURE GetAllUsers
AS BEGIN
	SELECT UserName
	FROM Users
END
GO
