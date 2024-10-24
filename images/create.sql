CREATE TABLE USER (
	ID varchar(20) PRIMARY KEY,
	PASSWORD varchar(20),
	ISADMIN boolean
);
CREATE TABLE LOG (
	ID varchar(20),
	ORDER int PRIMARY KEY,
	FOREIGN KEY (ID) REFERENCES USER(ID)
);
CREATE TABLE LOGINFO (
    ORDER varchar(20),
    LOG_COUNT int,
    FOREIGN KEY (ORDER) REFERENCES LOG(ORDER)
);